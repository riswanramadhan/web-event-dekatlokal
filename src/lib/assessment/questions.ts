import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
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

export type QuestionsReadResult =
  | { ok: true; questions: AssessmentQuestionRow[] }
  | { ok: false; message: string };

export type QuestionsWriteResult =
  | { ok: true }
  | { ok: false; message: string };

const idSchema = z.string().uuid();

export async function listQuestions(): Promise<QuestionsReadResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const { data, error } = await target.supabase
    .from("assessment_questions")
    .select(
      "id, prompt, order_index, points, assessment_options(id, body, order_index, is_correct)",
    )
    .eq("event_id", target.eventId)
    .order("order_index", { ascending: true })
    .order("order_index", {
      ascending: true,
      referencedTable: "assessment_options",
    });

  if (error) {
    logAssessmentFailure("list_questions", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  const parsed = assessmentQuestionRowsSchema.safeParse(data ?? []);

  if (!parsed.success) {
    logAssessmentFailure("list_questions_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return { ok: true, questions: parsed.data };
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

  const parsed = z.object({ order_index: z.number().int().min(0) }).safeParse(data);

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
): Promise<QuestionsWriteResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
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

  const { error } = await target.supabase.from("assessment_questions").insert({
    event_id: target.eventId,
    prompt,
    order_index: orderIndex,
  });

  if (error) {
    logAssessmentFailure("create_question", error);
    return { ok: false, message: translateAssessmentError(error) };
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
 * Confirms the question belongs to the managed event before any option write.
 * `assessment_options` has no `event_id` of its own, so without this an option
 * id from another event would be reachable.
 */
async function assertQuestionInEvent(
  supabase: SupabaseClient,
  eventId: string,
  questionId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("assessment_questions")
    .select("id")
    .eq("id", questionId)
    .eq("event_id", eventId)
    .maybeSingle();

  if (error) {
    logAssessmentFailure("assert_question_in_event", error);
    return false;
  }

  return idSchema.safeParse((data as { id?: unknown } | null)?.id).success;
}

export async function createOption(
  questionId: string,
  body: string,
): Promise<QuestionsWriteResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  if (
    !(await assertQuestionInEvent(target.supabase, target.eventId, questionId))
  ) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  const orderIndex = await nextOrderIndex(
    target.supabase,
    "assessment_options",
    "question_id",
    questionId,
  );

  if (orderIndex === null) {
    return { ok: false, message: translateAssessmentError(null) };
  }

  const { error } = await target.supabase.from("assessment_options").insert({
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
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  if (
    !(await assertQuestionInEvent(target.supabase, target.eventId, questionId))
  ) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  const { data, error } = await target.supabase
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
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  if (
    !(await assertQuestionInEvent(target.supabase, target.eventId, questionId))
  ) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  const { data, error } = await target.supabase
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
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  if (
    !(await assertQuestionInEvent(target.supabase, target.eventId, questionId))
  ) {
    return { ok: false, message: "Soal tidak ditemukan." };
  }

  const cleared = await target.supabase
    .from("assessment_options")
    .update({ is_correct: false })
    .eq("question_id", questionId)
    .eq("is_correct", true);

  if (cleared.error) {
    logAssessmentFailure("clear_correct_option", cleared.error);
    return { ok: false, message: translateAssessmentError(cleared.error) };
  }

  const { data, error } = await target.supabase
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
