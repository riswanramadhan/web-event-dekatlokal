import "server-only";

import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
import { ASSESSMENT_PHASES, type AssessmentPhase } from "./phase";

/**
 * The participant payload for one option. `is_correct` is absent by
 * construction, not by filtering: the query never selects it. A leaked answer
 * key in the pre-test would strip the score difference of its meaning, and
 * `select('*')` is exactly how that leak would happen.
 */
export type ParticipantOption = {
  id: string;
  body: string;
};

export type ParticipantQuestion = {
  id: string;
  prompt: string;
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
  | { ok: false; message: string };

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
  assessment_options: z.array(
    z.object({ id: z.string().uuid(), body: z.string() }),
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
      .select("id, prompt, assessment_options(id, body)")
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

export type SaveAnswerResult =
  | { ok: true }
  | { ok: false; expired: boolean; message: string };

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
    return { ok: false, expired: false, message: target.message };
  }

  const { error } = await target.supabase
    .from("assessment_answers")
    .upsert(
      { attempt_id: attemptId, question_id: questionId, option_id: optionId },
      { onConflict: "attempt_id,question_id" },
    );

  if (error) {
    const raw = error.message ?? "";
    const expired =
      raw.includes("Waktu pengerjaan sudah habis") ||
      raw.includes("Attempt sudah dikirim");

    if (!expired) {
      logAssessmentFailure("save_answer", error);
    }

    return {
      ok: false,
      expired,
      message: expired
        ? "Waktu pengerjaan sudah habis. Jawaban kamu dikirim."
        : "Jawaban belum tersimpan. Periksa koneksi kamu.",
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
    return target;
  }

  const attemptResult = await target.supabase
    .from("assessment_attempts")
    .select("id, phase")
    .eq("id", attemptId)
    .eq("event_id", target.eventId)
    .maybeSingle();

  if (attemptResult.error) {
    logAssessmentFailure("submit_lookup", attemptResult.error);
    return { ok: false, message: translateAssessmentError(attemptResult.error) };
  }

  const attempt = attemptRowSchema.safeParse(attemptResult.data);

  if (!attempt.success) {
    return {
      ok: false,
      message: "Sesi tes kamu sudah diatur ulang oleh panitia.",
    };
  }

  const { error } = await target.supabase.rpc("submit_assessment_attempt", {
    p_attempt_id: attemptId,
  });

  if (error) {
    logAssessmentFailure("submit_attempt", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  return { ok: true, phase: attempt.data.phase };
}
