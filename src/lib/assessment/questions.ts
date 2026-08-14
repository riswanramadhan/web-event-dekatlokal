import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
import {
  LIKERT_OPTIONS,
  QUESTION_TYPES,
  type AssessmentQuestionType,
  type PhaseScope,
} from "./question-type";
import {
  assessmentQuestionRowsSchema,
  type AssessmentQuestionRow,
} from "./schemas";

/** Mirrors `assessment_questions_prompt_length` in the migration. */
export const promptSchema = z
  .string()
  .trim()
  .min(3, "Pertanyaan minimal 3 karakter.")
  .max(2000, "Pertanyaan maksimal 2000 karakter.");

/** Mirrors `assessment_options_body_length`. */
export const optionBodySchema = z
  .string()
  .trim()
  .min(1, "Opsi jawaban tidak boleh kosong.")
  .max(500, "Opsi jawaban maksimal 500 karakter.");

export const FROZEN_MESSAGE =
  "Soal terkunci karena sudah ada peserta yang mengerjakan tes. Reset data pengerjaan dulu kalau memang perlu diubah.";

export type QuestionsReadResult =
  | { ok: true; questions: AssessmentQuestionRow[]; frozen: boolean }
  | { ok: false; message: string };

export type QuestionsWriteResult =
  | { ok: true }
  | { ok: false; message: string };


const orderableRowSchema = z.object({
  id: z.string().uuid(),
  prompt: z.string(),
  order_index: z.number().int().min(0),
});

/**
 * True as soon as one attempt exists for this event, matching the database
 * triggers that lock `assessment_questions` and `assessment_options`.
 *
 * Fails **closed**: when the count cannot be read, the answer is "frozen". The
 * app is supposed to get here before the trigger does, so a wrong guess in the
 * permissive direction would mean rendering enabled controls that blow up on
 * click — exactly what the freeze rule exists to prevent.
 */
async function isFrozen(
  supabase: SupabaseClient,
  eventId: string,
): Promise<boolean> {
  const { count, error } = await supabase
    .from("assessment_attempts")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId);

  if (error) {
    logAssessmentFailure("count_attempts", error);
    return true;
  }

  return (count ?? 0) > 0;
}

/**
 * Guard shared by every write below, so the rule holds no matter which action
 * is reached. The triggers remain the safety net; this is the UX layer that is
 * supposed to arrive first.
 */
async function refuseWhenFrozen(
  supabase: SupabaseClient,
  eventId: string,
): Promise<{ ok: false; message: string } | null> {
  return (await isFrozen(supabase, eventId))
    ? { ok: false, message: FROZEN_MESSAGE }
    : null;
}

export async function listQuestions(): Promise<QuestionsReadResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const [listResult, frozen] = await Promise.all([
    target.supabase
      .from("assessment_questions")
      .select(
        "id, prompt, order_index, points, question_type, phase_scope, category, assessment_options(id, body, order_index, is_correct, value)",
      )
      .eq("event_id", target.eventId)
      .order("order_index", { ascending: true })
      .order("order_index", {
        ascending: true,
        referencedTable: "assessment_options",
      }),
    isFrozen(target.supabase, target.eventId),
  ]);

  if (listResult.error) {
    logAssessmentFailure("list_questions", listResult.error);
    return { ok: false, message: translateAssessmentError(listResult.error) };
  }

  const parsed = assessmentQuestionRowsSchema.safeParse(listResult.data ?? []);

  if (!parsed.success) {
    logAssessmentFailure("list_questions_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return { ok: true, questions: parsed.data, frozen };
}

/**
 * Next free `order_index`. Two administrators adding at the same instant can
 * still collide, which surfaces as 23505 and is translated into "coba lagi"
 * rather than being retried silently — the second question would otherwise
 * land in an order nobody chose.
 */
async function nextOrderIndex(
  supabase: SupabaseClient,
  table: "assessment_questions" | "assessment_options",
  column: "event_id" | "question_id",
  parentId: string,
): Promise<number | null> {
  const { data, error } = await supabase
    .from(table)
    .select("order_index")
    .eq(column, parentId)
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    logAssessmentFailure(`next_order_index_${table}`, error);
    return null;
  }

  if (data === null) {
    return 0;
  }

  const parsed = z
    .object({ order_index: z.number().int().min(0) })
    .safeParse(data);

  if (!parsed.success) {
    logAssessmentFailure(`next_order_index_${table}_shape`, {
      code: "INVALID_SHAPE",
    });
    return null;
  }

  return parsed.data.order_index + 1;
}

export async function createQuestion(
  prompt: string,
  questionType: AssessmentQuestionType,
  phaseScope: PhaseScope,
  category: string | null,
): Promise<QuestionsWriteResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const frozen = await refuseWhenFrozen(target.supabase, target.eventId);

  if (frozen) {
    return frozen;
  }

  const orderIndex = await nextOrderIndex(
    target.supabase,
    "assessment_questions",
    "event_id",
    target.eventId,
  );

  if (orderIndex === null) {
    return { ok: false, message: translateAssessmentError(null) };
  }

  const { data, error } = await target.supabase
    .from("assessment_questions")
    .insert({
      event_id: target.eventId,
      prompt,
      order_index: orderIndex,
      question_type: questionType,
      phase_scope: phaseScope,
      category,
    })
    .select("id")
    .maybeSingle();

  if (error) {
    logAssessmentFailure("create_question", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  const created = z.object({ id: z.string().uuid() }).safeParse(data);

  if (!created.success) {
    logAssessmentFailure("create_question_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  if (questionType !== "likert") {
    return { ok: true };
  }

  // Soal skala langsung mendapat kelima opsi bakunya. PostgREST tidak bisa
  // mengirim dua statement dalam satu transaksi, jadi kalau insert ini gagal
  // soalnya berdiri tanpa opsi — dan itu tidak senyap: assessment_problems()
  // langsung melaporkannya di daftar kesiapan.
  const { error: optionsError } = await target.supabase
    .from("assessment_options")
    .insert(
      LIKERT_OPTIONS.map((option, index) => ({
        question_id: created.data.id,
        body: option.body,
        order_index: index,
        is_correct: false,
        value: option.value,
      })),
    );

  if (optionsError) {
    logAssessmentFailure("create_likert_options", optionsError);
    return {
      ok: false,
      message: `${translateAssessmentError(optionsError)} Soal terbuat tanpa opsi skala — hapus lalu buat ulang.`,
    };
  }

  return { ok: true };
}

export async function updateQuestion(
  questionId: string,
  prompt: string,
): Promise<QuestionsWriteResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const frozen = await refuseWhenFrozen(target.supabase, target.eventId);

  if (frozen) {
    return frozen;
  }

  // Scoped by event_id as well as id: an id from another event must not be
  // editable through this panel even if it is guessed.
  const { data, error } = await target.supabase
    .from("assessment_questions")
    .update({ prompt })
    .eq("id", questionId)
    .eq("event_id", target.eventId)
    .select("id")
    .maybeSingle();

  if (error) {
    logAssessmentFailure("update_question", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  if (data === null) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  return { ok: true };
}

export async function deleteQuestion(
  questionId: string,
): Promise<QuestionsWriteResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const frozen = await refuseWhenFrozen(target.supabase, target.eventId);

  if (frozen) {
    return frozen;
  }

  const { data, error } = await target.supabase
    .from("assessment_questions")
    .delete()
    .eq("id", questionId)
    .eq("event_id", target.eventId)
    .select("id")
    .maybeSingle();

  if (error) {
    logAssessmentFailure("delete_question", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  if (data === null) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  return { ok: true };
}

/**
 * Moves one question up or down by swapping `order_index` with its neighbour.
 *
 * `assessment_questions_event_order_key` is `deferrable initially deferred`, so
 * the two rows may hold the same index momentarily as long as the swap commits
 * together. That makes atomicity the whole point — and PostgREST cannot send
 * two different UPDATE statements in one transaction. The upsert below is one
 * request, therefore one transaction, and its conflict target is the primary
 * key rather than the deferrable constraint that Postgres would refuse.
 *
 * The cost is that `prompt` is written back with the value read a moment
 * earlier, so an administrator saving new text in that same instant would lose
 * it. `points` is left out of the payload and keeps its stored value.
 */
export async function moveQuestion(
  questionId: string,
  direction: "up" | "down",
): Promise<QuestionsWriteResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const frozen = await refuseWhenFrozen(target.supabase, target.eventId);

  if (frozen) {
    return frozen;
  }

  const { data, error } = await target.supabase
    .from("assessment_questions")
    .select("id, prompt, order_index")
    .eq("event_id", target.eventId)
    .order("order_index", { ascending: true });

  if (error) {
    logAssessmentFailure("reorder_read", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  const parsed = z.array(orderableRowSchema).safeParse(data ?? []);

  if (!parsed.success) {
    logAssessmentFailure("reorder_read_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  const questions = parsed.data;
  const position = questions.findIndex((row) => row.id === questionId);

  if (position < 0) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  const neighbourPosition = direction === "up" ? position - 1 : position + 1;
  const current = questions[position];
  const neighbour = questions[neighbourPosition];

  if (!current || !neighbour) {
    return {
      ok: false,
      message:
        direction === "up"
          ? "Soal ini sudah paling atas."
          : "Soal ini sudah paling bawah.",
    };
  }

  const { error: swapError } = await target.supabase
    .from("assessment_questions")
    .upsert(
      [
        {
          id: current.id,
          event_id: target.eventId,
          prompt: current.prompt,
          order_index: neighbour.order_index,
        },
        {
          id: neighbour.id,
          event_id: target.eventId,
          prompt: neighbour.prompt,
          order_index: current.order_index,
        },
      ],
      { onConflict: "id" },
    );

  if (swapError) {
    logAssessmentFailure("reorder_swap", swapError);
    return { ok: false, message: translateAssessmentError(swapError) };
  }

  return { ok: true };
}

const ownedQuestionSchema = z.object({
  id: z.string().uuid(),
  question_type: z.enum(QUESTION_TYPES),
});

/**
 * Confirms the question belongs to the managed event and reports its type.
 * `assessment_options` has no `event_id` of its own, so without this an option
 * id from another event would be reachable.
 */
async function findOwnedQuestion(
  supabase: SupabaseClient,
  eventId: string,
  questionId: string,
): Promise<AssessmentQuestionType | null> {
  const { data, error } = await supabase
    .from("assessment_questions")
    .select("id, question_type")
    .eq("id", questionId)
    .eq("event_id", eventId)
    .maybeSingle();

  if (error) {
    logAssessmentFailure("assert_question_in_event", error);
    return null;
  }

  const parsed = ownedQuestionSchema.safeParse(data);

  return parsed.success ? parsed.data.question_type : null;
}

/** Shared preamble for the three option writes and the answer key. */
async function prepareOptionWrite(
  questionId: string,
): Promise<
  | {
      ok: true;
      supabase: SupabaseClient;
      eventId: string;
      questionType: AssessmentQuestionType;
    }
  | { ok: false; message: string }
> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const frozen = await refuseWhenFrozen(target.supabase, target.eventId);

  if (frozen) {
    return frozen;
  }

  const questionType = await findOwnedQuestion(
    target.supabase,
    target.eventId,
    questionId,
  );

  if (questionType === null) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  return {
    ok: true,
    supabase: target.supabase,
    eventId: target.eventId,
    questionType,
  };
}

/**
 * Opsi skala tidak boleh disunting satu per satu. Kelimanya baku, dan kalau
 * satu pernyataan memakai label berbeda dari yang lain, rata-ratanya tidak lagi
 * bisa dibandingkan antar item. Editor menampilkannya read-only; ini lapis
 * keduanya, karena Server Action bisa dicapai sendiri.
 */
const LIKERT_LOCKED_MESSAGE =
  "Opsi skala 1–5 bersifat baku dan tidak bisa diubah. Ganti tipe soalnya kalau memang perlu opsi lain.";

export async function createOption(
  questionId: string,
  body: string,
): Promise<QuestionsWriteResult> {
  const prepared = await prepareOptionWrite(questionId);

  if (!prepared.ok) {
    return prepared;
  }

  if (prepared.questionType === "likert") {
    return { ok: false, message: LIKERT_LOCKED_MESSAGE };
  }

  const orderIndex = await nextOrderIndex(
    prepared.supabase,
    "assessment_options",
    "question_id",
    questionId,
  );

  if (orderIndex === null) {
    return { ok: false, message: translateAssessmentError(null) };
  }

  const { error } = await prepared.supabase.from("assessment_options").insert({
    question_id: questionId,
    body,
    order_index: orderIndex,
  });

  if (error) {
    logAssessmentFailure("create_option", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  return { ok: true };
}

export async function updateOption(
  questionId: string,
  optionId: string,
  body: string,
): Promise<QuestionsWriteResult> {
  const prepared = await prepareOptionWrite(questionId);

  if (!prepared.ok) {
    return prepared;
  }

  if (prepared.questionType === "likert") {
    return { ok: false, message: LIKERT_LOCKED_MESSAGE };
  }

  const { data, error } = await prepared.supabase
    .from("assessment_options")
    .update({ body })
    .eq("id", optionId)
    .eq("question_id", questionId)
    .select("id")
    .maybeSingle();

  if (error) {
    logAssessmentFailure("update_option", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  if (data === null) {
    return { ok: false, message: "Opsi jawaban tidak ditemukan." };
  }

  return { ok: true };
}

export async function deleteOption(
  questionId: string,
  optionId: string,
): Promise<QuestionsWriteResult> {
  const prepared = await prepareOptionWrite(questionId);

  if (!prepared.ok) {
    return prepared;
  }

  if (prepared.questionType === "likert") {
    return { ok: false, message: LIKERT_LOCKED_MESSAGE };
  }

  const { data, error } = await prepared.supabase
    .from("assessment_options")
    .delete()
    .eq("id", optionId)
    .eq("question_id", questionId)
    .select("id")
    .maybeSingle();

  if (error) {
    logAssessmentFailure("delete_option", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  if (data === null) {
    return { ok: false, message: "Opsi jawaban tidak ditemukan." };
  }

  return { ok: true };
}

/**
 * Marks one option as the answer key.
 *
 * `assessment_options_single_correct_idx` is a partial unique index over
 * (question_id) where is_correct, so the old key must be cleared before the new
 * one is set — setting first would violate it. PostgREST cannot send both
 * statements in one transaction, so a failure between them leaves the question
 * with zero keys. That state is not silent: `assessment_problems()` reports it,
 * the readiness list on the summary page shows it, and the test cannot be
 * opened until it is fixed.
 */
export async function setCorrectOption(
  questionId: string,
  optionId: string,
): Promise<QuestionsWriteResult> {
  const prepared = await prepareOptionWrite(questionId);

  if (!prepared.ok) {
    return prepared;
  }

  if (prepared.questionType === "likert") {
    return { ok: false, message: LIKERT_LOCKED_MESSAGE };
  }

  // Hanya soal berskor yang punya kunci. Memasang kunci pada pilihan tanpa
  // skor akan lolos constraint database tapi membuat assessment_problems()
  // menolak membuka tes, dengan alasan yang membingungkan.
  if (prepared.questionType === "unscored_choice") {
    return {
      ok: false,
      message:
        "Pilihan tanpa skor tidak punya jawaban benar. Ubah tipe soalnya kalau ini seharusnya dinilai.",
    };
  }

  const cleared = await prepared.supabase
    .from("assessment_options")
    .update({ is_correct: false })
    .eq("question_id", questionId)
    .eq("is_correct", true);

  if (cleared.error) {
    logAssessmentFailure("clear_correct_option", cleared.error);
    return { ok: false, message: translateAssessmentError(cleared.error) };
  }

  const { data, error } = await prepared.supabase
    .from("assessment_options")
    .update({ is_correct: true })
    .eq("id", optionId)
    .eq("question_id", questionId)
    .select("id")
    .maybeSingle();

  if (error) {
    logAssessmentFailure("set_correct_option", error);
    return {
      ok: false,
      message: `${translateAssessmentError(error)} Kunci jawaban soal ini sekarang kosong — pilih ulang.`,
    };
  }

  if (data === null) {
    return {
      ok: false,
      message:
        "Opsi jawaban tidak ditemukan. Kunci jawaban soal ini sekarang kosong — pilih ulang.",
    };
  }

  return { ok: true };
}
