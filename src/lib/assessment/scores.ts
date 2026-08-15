import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { toPercent } from "./attempts";
import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
import { PARTICIPANT_STATUS_EXCLUSION } from "./participants";
import { ASSESSMENT_PHASES, type AssessmentPhase } from "./phase";
import { QUESTION_TYPES, PHASE_SCOPES } from "./question-type";

const registrationRowSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  registration_type: z.string(),
});

const scoreAttemptRowSchema = z.object({
  id: z.string().uuid(),
  registration_id: z.string().uuid(),
  phase: z.enum(ASSESSMENT_PHASES),
  status: z.enum(["in_progress", "submitted"]),
  score: z.number().int().nullable(),
  total_points: z.number().int().nullable(),
});

const scoringQuestionSchema = z.object({
  id: z.string().uuid(),
  prompt: z.string(),
  order_index: z.number().int().min(0),
  question_type: z.enum(QUESTION_TYPES),
  phase_scope: z.enum(PHASE_SCOPES),
  dimension: z.string().nullable(),
});

const answerRowSchema = z.object({
  attempt_id: z.string().uuid(),
  question_id: z.string().uuid(),
  option_id: z.string().uuid(),
});

const optionValueSchema = z.object({
  id: z.string().uuid(),
  question_id: z.string().uuid(),
  body: z.string(),
  order_index: z.number().int().min(0),
  value: z.number().int().min(1).max(5).nullable(),
});

/**
 * Pemahaman objektif. Panduan Scoring §1: `(benar / jumlah soal berskor) × 100`.
 * Persentase inilah Knowledge Score, dan hanya angka ini yang boleh disebut
 * nilai.
 */
export type KnowledgeSummary = {
  score: number;
  total: number;
  percent: number | null;
};

/**
 * Kapabilitas menurut penilaian sendiri, skala 1–5. Bukan nilai kemampuan
 * objektif — Panduan Scoring §2 melarang menyebutnya begitu, dan melarang
 * mempersenkannya.
 */
export type CapabilityMeans = {
  overall: number | null;
  byDimension: Record<string, number | null>;
};

export type ScoreProgress =
  | "not_started"
  | "in_progress"
  | "pre_only"
  | "post_only"
  | "complete";

export type ParticipantScore = {
  registrationId: string;
  fullName: string;
  registrationType: string;
  knowledgePre: KnowledgeSummary | null;
  knowledgePost: KnowledgeSummary | null;
  /** Selisih poin persen; null kecuali kedua phase sudah terkirim. */
  knowledgeGain: number | null;
  capabilityPre: CapabilityMeans | null;
  capabilityPost: CapabilityMeans | null;
  /** Selisih skala; null kecuali kedua phase punya jawaban skala. */
  capabilityChange: number | null;
  /** Rata-rata Q17–Q20, layer terpisah tanpa baseline pre. */
  postProgramMean: number | null;
  /** Nilai per item Q17–Q20, dikunci id soal. Dipakai ringkasan per pernyataan. */
  postProgramItems: Record<string, number>;
  /**
   * Jawaban Q21 sebagai **label kategorinya**, bukan id opsi. Kategorikal, jadi
   * tidak pernah dirata-rata — hanya dihitung distribusinya.
   */
  stewardChoice: string | null;
  progress: ScoreProgress;
};

export type ScoreboardResult =
  | {
      ok: true;
      rows: ParticipantScore[];
      /** Nama dimensi urut sesuai posisi item pertamanya di instrumen. */
      dimensions: string[];
      /** Q17–Q20 urut instrumen, supaya ringkasan bisa memberi label per item. */
      postProgramQuestions: { id: string; prompt: string }[];
      /**
       * Kategori Q21 urut opsi, termasuk yang belum pernah dipilih siapa pun —
       * kategori kosong adalah temuan, bukan baris yang boleh hilang.
       */
      stewardCategories: string[];
    }
  | { ok: false; message: string };

const PAGE_SIZE = 1000;

/**
 * Membaca seluruh jawaban dengan paginasi.
 *
 * PostgREST memotong select biasa di 1000 baris. Dengan 25 peserta × 21 soal ×
 * 2 phase, plafonnya menembus angka itu — dan pemotongan senyap di sini akan
 * muncul sebagai rata-rata yang terlihat masuk akal tapi salah.
 */
async function fetchAllAnswers(
  supabase: SupabaseClient,
  attemptIds: string[],
): Promise<z.infer<typeof answerRowSchema>[] | null> {
  if (attemptIds.length === 0) {
    return [];
  }

  const collected: z.infer<typeof answerRowSchema>[] = [];

  for (let page = 0; ; page += 1) {
    const { data, error } = await supabase
      .from("assessment_answers")
      .select("attempt_id, question_id, option_id")
      .in("attempt_id", attemptIds)
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    if (error) {
      logAssessmentFailure("list_answers", error);
      return null;
    }

    const parsed = z.array(answerRowSchema).safeParse(data ?? []);

    if (!parsed.success) {
      logAssessmentFailure("list_answers_shape", { code: "INVALID_SHAPE" });
      return null;
    }

    collected.push(...parsed.data);

    if (parsed.data.length < PAGE_SIZE) {
      return collected;
    }
  }
}

function mean(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  // Dua desimal, sesuai contoh penyajian di Panduan Scoring §3.
  return (
    Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100
  );
}

function toKnowledge(
  attempt: z.infer<typeof scoreAttemptRowSchema> | undefined,
): KnowledgeSummary | null {
  if (!attempt || attempt.status !== "submitted") {
    return null;
  }

  return {
    score: attempt.score ?? 0,
    total: attempt.total_points ?? 0,
    percent: toPercent(attempt.score, attempt.total_points),
  };
}

function toProgress(
  pre: z.infer<typeof scoreAttemptRowSchema> | undefined,
  post: z.infer<typeof scoreAttemptRowSchema> | undefined,
): ScoreProgress {
  if (pre?.status === "in_progress" || post?.status === "in_progress") {
    return "in_progress";
  }

  const preDone = pre?.status === "submitted";
  const postDone = post?.status === "submitted";

  if (preDone && postDone) return "complete";
  if (preDone) return "pre_only";
  if (postDone) return "post_only";
  return "not_started";
}

/**
 * Seluruh peserta beserta apa yang sudah mereka kerjakan, dipecah menjadi layer
 * yang dipisahkan Panduan Scoring §9. Ketiganya sengaja tidak pernah
 * dijumlahkan menjadi satu angka.
 */
export async function listScores(): Promise<ScoreboardResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const [registrationsResult, attemptsResult, questionsResult, optionsResult] =
    await Promise.all([
      target.supabase
        .from("registrations")
        .select("id, full_name, registration_type")
        .eq("event_id", target.eventId)
        .not("status", "in", PARTICIPANT_STATUS_EXCLUSION)
        .order("full_name", { ascending: true }),
      target.supabase
        .from("assessment_attempts")
        .select("id, registration_id, phase, status, score, total_points")
        .eq("event_id", target.eventId),
      target.supabase
        .from("assessment_questions")
        .select("id, prompt, order_index, question_type, phase_scope, dimension")
        .eq("event_id", target.eventId)
        .order("order_index", { ascending: true }),
      target.supabase
        .from("assessment_options")
        .select("id, question_id, body, order_index, value")
        .order("order_index", { ascending: true }),
    ]);

  const failure =
    registrationsResult.error ??
    attemptsResult.error ??
    questionsResult.error ??
    optionsResult.error;

  if (failure) {
    logAssessmentFailure("list_scores", failure);
    return { ok: false, message: translateAssessmentError(failure) };
  }

  const registrations = z
    .array(registrationRowSchema)
    .safeParse(registrationsResult.data ?? []);
  const attempts = z
    .array(scoreAttemptRowSchema)
    .safeParse(attemptsResult.data ?? []);
  const questions = z
    .array(scoringQuestionSchema)
    .safeParse(questionsResult.data ?? []);
  const options = z
    .array(optionValueSchema)
    .safeParse(optionsResult.data ?? []);

  if (
    !registrations.success ||
    !attempts.success ||
    !questions.success ||
    !options.success
  ) {
    logAssessmentFailure("list_scores_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  const answers = await fetchAllAnswers(
    target.supabase,
    attempts.data.map((attempt) => attempt.id),
  );

  if (answers === null) {
    return { ok: false, message: translateAssessmentError(null) };
  }

  const questionById = new Map(questions.data.map((row) => [row.id, row]));
  const optionValueById = new Map(
    options.data.map((row) => [row.id, row.value]),
  );
  const optionBodyById = new Map(options.data.map((row) => [row.id, row.body]));

  const postProgramQuestions = questions.data
    .filter(
      (question) =>
        question.question_type === "likert" &&
        question.phase_scope === "post_test",
    )
    .map((question) => ({ id: question.id, prompt: question.prompt }));

  const stewardQuestionIds = new Set(
    questions.data
      .filter((question) => question.question_type === "unscored_choice")
      .map((question) => question.id),
  );

  const stewardCategories = options.data
    .filter((option) => stewardQuestionIds.has(option.question_id))
    .map((option) => option.body);

  // Urutan dimensi mengikuti posisi item pertamanya, supaya tabel laporan
  // terbaca dengan alur yang sama seperti instrumennya.
  const dimensions: string[] = [];
  for (const question of questions.data) {
    if (
      question.question_type === "likert" &&
      question.phase_scope === "both" &&
      question.dimension &&
      !dimensions.includes(question.dimension)
    ) {
      dimensions.push(question.dimension);
    }
  }

  const attemptByKey = new Map<string, z.infer<typeof scoreAttemptRowSchema>>();
  for (const attempt of attempts.data) {
    attemptByKey.set(`${attempt.registration_id}:${attempt.phase}`, attempt);
  }

  const answersByAttempt = new Map<string, typeof answers>();
  for (const answer of answers) {
    const bucket = answersByAttempt.get(answer.attempt_id) ?? [];
    bucket.push(answer);
    answersByAttempt.set(answer.attempt_id, bucket);
  }

  function capabilityFor(attemptId: string | undefined): CapabilityMeans | null {
    if (!attemptId) return null;

    const own = answersByAttempt.get(attemptId) ?? [];
    const perDimension = new Map<string, number[]>();
    const all: number[] = [];

    for (const answer of own) {
      const question = questionById.get(answer.question_id);
      const value = optionValueById.get(answer.option_id);

      if (
        !question ||
        question.question_type !== "likert" ||
        question.phase_scope !== "both" ||
        value == null
      ) {
        continue;
      }

      all.push(value);

      const key = question.dimension ?? "Belum dikelompokkan";
      perDimension.set(key, [...(perDimension.get(key) ?? []), value]);
    }

    if (all.length === 0) {
      return null;
    }

    const byDimension: Record<string, number | null> = {};
    for (const name of dimensions) {
      byDimension[name] = mean(perDimension.get(name) ?? []);
    }

    return { overall: mean(all), byDimension };
  }

  function postProgramItemsFor(
    attemptId: string | undefined,
  ): Record<string, number> {
    if (!attemptId) return {};

    const items: Record<string, number> = {};

    for (const answer of answersByAttempt.get(attemptId) ?? []) {
      const question = questionById.get(answer.question_id);
      const value = optionValueById.get(answer.option_id);

      if (
        question?.question_type === "likert" &&
        question.phase_scope === "post_test" &&
        value != null
      ) {
        items[question.id] = value;
      }
    }

    return items;
  }

  function stewardChoiceFor(attemptId: string | undefined): string | null {
    if (!attemptId) return null;

    for (const answer of answersByAttempt.get(attemptId) ?? []) {
      const question = questionById.get(answer.question_id);

      if (question?.question_type === "unscored_choice") {
        return optionBodyById.get(answer.option_id) ?? null;
      }
    }

    return null;
  }

  const rows: ParticipantScore[] = registrations.data.map((registration) => {
    const pre = attemptByKey.get(`${registration.id}:pre_test`);
    const post = attemptByKey.get(`${registration.id}:post_test`);
    const knowledgePre = toKnowledge(pre);
    const knowledgePost = toKnowledge(post);
    const capabilityPre = capabilityFor(pre?.id);
    const capabilityPost = capabilityFor(post?.id);
    const postProgramItems = postProgramItemsFor(post?.id);

    return {
      registrationId: registration.id,
      fullName: registration.full_name,
      registrationType: registration.registration_type,
      knowledgePre,
      knowledgePost,
      knowledgeGain:
        knowledgePre?.percent != null && knowledgePost?.percent != null
          ? knowledgePost.percent - knowledgePre.percent
          : null,
      capabilityPre,
      capabilityPost,
      capabilityChange:
        capabilityPre?.overall != null && capabilityPost?.overall != null
          ? Math.round((capabilityPost.overall - capabilityPre.overall) * 100) /
            100
          : null,
      postProgramMean: mean(Object.values(postProgramItems)),
      postProgramItems,
      stewardChoice: stewardChoiceFor(post?.id),
      progress: toProgress(pre, post),
    };
  });

  return {
    ok: true,
    rows,
    dimensions,
    postProgramQuestions,
    stewardCategories,
  };
}

export type { AssessmentPhase };
