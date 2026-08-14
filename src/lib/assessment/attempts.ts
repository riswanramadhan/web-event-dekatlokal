import "server-only";

import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
import { ASSESSMENT_PHASES, type AssessmentPhase } from "./phase";
import {
  QUESTION_TYPES,
  type AssessmentQuestionType,
} from "./question-type";

/**
 * The participant payload for one option. `is_correct` is absent by
 * construction, not by filtering: the query never selects it. A leaked answer
 * key in the pre-test would strip the score difference of its meaning, and
 * `select('*')` is exactly how that leak would happen.
 */
export type ParticipantOption = {
  id: string;
  body: string;
  /** Nilai skala 1–5 untuk opsi Likert; null untuk tipe soal lain. */
  value: number | null;
};

export type ParticipantQuestion = {
  id: string;
  prompt: string;
  questionType: AssessmentQuestionType;
  options: ParticipantOption[];
};

export type AttemptPayload = {
  attemptId: string;
  status: "in_progress" | "submitted";
  /** Snapshot from the database; the client never computes a deadline itself. */
  expiresAt: string;
  questions: ParticipantQuestion[];
  /** questionId → optionId for answers already stored. */
  answers: Record<string, string>;
};

export type AttemptResult =
  | { ok: true; attempt: AttemptPayload }
  | { ok: false; message: string };

export type SubmitResult =
  | { ok: true; phase: AssessmentPhase }
  | { ok: false; reason: "lost" | "error"; message: string };

const startRowSchema = z.object({
  attempt_id: z.string().uuid(),
  attempt_status: z.enum(["in_progress", "submitted"]),
  question_order: z.array(z.string().uuid()).min(1),
  expires_at: z.string(),
  created_new: z.boolean(),
});

const questionRowSchema = z.object({
  id: z.string().uuid(),
  prompt: z.string(),
  question_type: z.enum(QUESTION_TYPES),
  assessment_options: z.array(
    z.object({
      id: z.string().uuid(),
      body: z.string(),
      value: z.number().int().min(1).max(5).nullable(),
    }),
  ),
});

const answerRowSchema = z.object({
  question_id: z.string().uuid(),
  option_id: z.string().uuid(),
});

const attemptRowSchema = z.object({
  id: z.string().uuid(),
  phase: z.enum(ASSESSMENT_PHASES),
});

/**
 * Turns a database exception into a sentence a participant can act on.
 *
 * `start_assessment_attempt()` raises several different refusals under the same
 * SQLSTATE, so the raw text is matched here to tell them apart. It is matched,
 * never displayed — the participant sees only the sentence chosen below.
 */
function translateStartFailure(message: string | null | undefined): string {
  const raw = message ?? "";

  if (raw.includes("Tes sedang ditutup")) {
    return "Tes sudah ditutup dan kamu belum mulai mengerjakan.";
  }

  if (raw.includes("Peserta tidak ditemukan")) {
    return "Nama kamu tidak ditemukan. Pilih ulang dari daftar.";
  }

  if (raw.includes("Belum ada soal") || raw.includes("Pengaturan tes belum")) {
    return "Soal belum disiapkan panitia. Tunggu instruksi di lokasi.";
  }

  return "Tes belum bisa dimulai sekarang. Coba lagi sebentar.";
}

export async function startOrResumeAttempt(
  registrationId: string,
  phase: AssessmentPhase,
): Promise<AttemptResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  // Every attempt is created or resumed through this function. The application
  // never inserts into assessment_attempts directly, so the open/closed rule
  // and the randomised question order stay in one place.
  const { data, error } = await target.supabase.rpc(
    "start_assessment_attempt",
    { p_registration_id: registrationId, p_phase: phase },
  );

  if (error) {
    logAssessmentFailure("start_attempt", error);
    return { ok: false, message: translateStartFailure(error.message) };
  }

  const parsed = z.array(startRowSchema).min(1).safeParse(data);

  if (!parsed.success) {
    logAssessmentFailure("start_attempt_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  const started = parsed.data[0];

  if (!started) {
    return { ok: false, message: translateAssessmentError(null) };
  }

  const [questionsResult, answersResult] = await Promise.all([
    target.supabase
      .from("assessment_questions")
      .select("id, prompt, question_type, assessment_options(id, body, value)")
      .in("id", started.question_order)
      .order("order_index", {
        ascending: true,
        referencedTable: "assessment_options",
      }),
    target.supabase
      .from("assessment_answers")
      .select("question_id, option_id")
      .eq("attempt_id", started.attempt_id),
  ]);

  if (questionsResult.error) {
    logAssessmentFailure("attempt_questions", questionsResult.error);
    return {
      ok: false,
      message: translateAssessmentError(questionsResult.error),
    };
  }

  if (answersResult.error) {
    logAssessmentFailure("attempt_answers", answersResult.error);
    return { ok: false, message: translateAssessmentError(answersResult.error) };
  }

  const questions = z
    .array(questionRowSchema)
    .safeParse(questionsResult.data ?? []);
  const answers = z.array(answerRowSchema).safeParse(answersResult.data ?? []);

  if (!questions.success || !answers.success) {
    logAssessmentFailure("attempt_payload_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  // question_order is the frozen shuffle for this participant. The rows come
  // back in whatever order PostgREST chose, so they are re-sorted to match it
  // here — never reshuffled.
  const byId = new Map(questions.data.map((row) => [row.id, row]));
  const ordered: ParticipantQuestion[] = [];

  for (const questionId of started.question_order) {
    const row = byId.get(questionId);

    if (row) {
      ordered.push({
        id: row.id,
        prompt: row.prompt,
        questionType: row.question_type,
        options: row.assessment_options,
      });
    }
  }

  if (ordered.length === 0) {
    return { ok: false, message: translateAssessmentError(null) };
  }

  return {
    ok: true,
    attempt: {
      attemptId: started.attempt_id,
      status: started.attempt_status,
      expiresAt: started.expires_at,
      questions: ordered,
      answers: Object.fromEntries(
        answers.data.map((row) => [row.question_id, row.option_id]),
      ),
    },
  };
}

/**
 * Why a write was refused, because each one leads somewhere different:
 * `expired` submits and moves on, `lost` sends the participant back to the
 * name picker, `network` shows the small "belum tersimpan" indicator.
 */
export type SaveFailureReason = "expired" | "lost" | "network";

export type SaveAnswerResult =
  | { ok: true }
  | { ok: false; reason: SaveFailureReason; message: string };

/**
 * Stores one answer, overwriting the previous choice for the same question.
 *
 * The primary key is (attempt_id, question_id), so changing an answer updates
 * the same row rather than adding one. `assessment_answers_guard` refuses the
 * write when the attempt is submitted, when the question is not part of this
 * attempt, or when the deadline passed more than five seconds ago — the caller
 * turns that last case into a submit instead of an error message.
 */
export async function saveAnswer(
  attemptId: string,
  questionId: string,
  optionId: string,
): Promise<SaveAnswerResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return { ok: false, reason: "network", message: target.message };
  }

  const { error } = await target.supabase
    .from("assessment_answers")
    .upsert(
      { attempt_id: attemptId, question_id: questionId, option_id: optionId },
      { onConflict: "attempt_id,question_id" },
    );

  if (error) {
    const raw = error.message ?? "";

    // The attempt row is gone: an administrator reset the event while this
    // participant still had the screen open.
    if (
      raw.includes("Attempt tidak ditemukan") ||
      error.code === "23503" ||
      error.code === "P0002"
    ) {
      return {
        ok: false,
        reason: "lost",
        message: "Sesi tes kamu sudah diatur ulang oleh panitia.",
      };
    }

    if (
      raw.includes("Waktu pengerjaan sudah habis") ||
      raw.includes("Attempt sudah dikirim")
    ) {
      return {
        ok: false,
        reason: "expired",
        message: "Waktu pengerjaan sudah habis. Jawaban kamu dikirim.",
      };
    }

    logAssessmentFailure("save_answer", error);

    return {
      ok: false,
      reason: "network",
      message: "Jawaban belum tersimpan. Periksa koneksi kamu.",
    };
  }

  return { ok: true };
}

/**
 * Scores and closes the attempt in one database transaction. Idempotent: a
 * second call returns the stored values without changing anything.
 *
 * The score itself is deliberately not returned to the caller. Nothing in the
 * participant flow needs it yet, and the surest way to keep a pre-test score
 * out of a network response is never to put it in one.
 */
export async function submitAttempt(attemptId: string): Promise<SubmitResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return { ok: false, reason: "error", message: target.message };
  }

  const attemptResult = await target.supabase
    .from("assessment_attempts")
    .select("id, phase")
    .eq("id", attemptId)
    .eq("event_id", target.eventId)
    .maybeSingle();

  if (attemptResult.error) {
    logAssessmentFailure("submit_lookup", attemptResult.error);
    return {
      ok: false,
      reason: "error",
      message: translateAssessmentError(attemptResult.error),
    };
  }

  const attempt = attemptRowSchema.safeParse(attemptResult.data);

  if (!attempt.success) {
    return {
      ok: false,
      reason: "lost",
      message: "Sesi tes kamu sudah diatur ulang oleh panitia.",
    };
  }

  const { error } = await target.supabase.rpc("submit_assessment_attempt", {
    p_attempt_id: attemptId,
  });

  if (error) {
    logAssessmentFailure("submit_attempt", error);
    return {
      ok: false,
      reason: "error",
      message: translateAssessmentError(error),
    };
  }

  return { ok: true, phase: attempt.data.phase };
}

const scoredAttemptSchema = z.object({
  registration_id: z.string().uuid(),
  status: z.enum(["in_progress", "submitted"]),
  phase: z.enum(ASSESSMENT_PHASES),
  score: z.number().int().nullable(),
  total_points: z.number().int().nullable(),
});

export type AssessmentResult = {
  /** Rounded percentage, or null when total_points is 0. */
  postPercent: number | null;
  postScore: number;
  postTotal: number;
  /** Null when this participant never took the pre-test. */
  prePercent: number | null;
};

export type GetResultOutcome =
  | { ok: true; result: AssessmentResult }
  /** Not a post-test attempt, not submitted, or gone: send them to the test. */
  | { ok: false; redirect: true }
  | { ok: false; redirect: false; message: string };

/**
 * Percentages are computed at display time and never stored. `total_points` of
 * zero should be impossible — an attempt cannot exist without questions — but
 * the display must not depend on that assumption, so it yields null and the
 * page renders a dash instead of NaN.
 */
export function toPercent(
  score: number | null,
  total: number | null,
): number | null {
  if (score === null || total === null || total <= 0) {
    return null;
  }

  return Math.round((score / total) * 100);
}

export async function getResult(attemptId: string): Promise<GetResultOutcome> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return { ok: false, redirect: false, message: target.message };
  }

  const postResult = await target.supabase
    .from("assessment_attempts")
    .select("registration_id, status, phase, score, total_points")
    .eq("id", attemptId)
    .eq("event_id", target.eventId)
    .maybeSingle();

  if (postResult.error) {
    logAssessmentFailure("get_result", postResult.error);
    return {
      ok: false,
      redirect: false,
      message: translateAssessmentError(postResult.error),
    };
  }

  const post = scoredAttemptSchema.safeParse(postResult.data);

  // A missing attempt, the wrong phase, or one still in progress all mean the
  // same thing for the participant: there is no result to look at yet.
  if (
    !post.success ||
    post.data.phase !== "post_test" ||
    post.data.status !== "submitted"
  ) {
    return { ok: false, redirect: true };
  }

  const preResult = await target.supabase
    .from("assessment_attempts")
    .select("registration_id, status, phase, score, total_points")
    .eq("registration_id", post.data.registration_id)
    .eq("phase", "pre_test")
    .maybeSingle();

  if (preResult.error) {
    logAssessmentFailure("get_result_pre", preResult.error);
    return {
      ok: false,
      redirect: false,
      message: translateAssessmentError(preResult.error),
    };
  }

  const pre = scoredAttemptSchema.safeParse(preResult.data);
  const preSubmitted = pre.success && pre.data.status === "submitted";

  return {
    ok: true,
    result: {
      postPercent: toPercent(post.data.score, post.data.total_points),
      postScore: post.data.score ?? 0,
      postTotal: post.data.total_points ?? 0,
      prePercent: preSubmitted
        ? toPercent(pre.data.score, pre.data.total_points)
        : null,
    },
  };
}
