"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { recordAuditEvent, requireAdmin } from "@/lib/admin/auth";
import {
  createOption,
  createQuestion,
  deleteOption,
  deleteQuestion,
  moveQuestion,
  optionBodySchema,
  promptSchema,
  setCorrectOption,
  updateOption,
  updateQuestion,
  type QuestionsWriteResult,
} from "@/lib/assessment/questions";
import { PHASE_SCOPES, QUESTION_TYPES } from "@/lib/assessment/question-type";
import type { RegistrationActionState } from "@/lib/registration/result";

const idSchema = z.string().uuid();

/**
 * Editing an option is recorded as `update_question`: the audit CHECK lists no
 * option-level action, and an option only exists as part of its question.
 */
type AuditedAction =
  | "create_question"
  | "update_question"
  | "delete_question"
  | "reorder_questions";

const directionSchema = z.enum(["up", "down"]);

const INVALID_COMMAND: RegistrationActionState = {
  status: "error",
  message: "Perintah tidak valid.",
};

/**
 * Every action here follows the same three steps: re-check authorization,
 * validate, then write. Authorization is repeated per action because a Server
 * Action is reachable on its own, not only through the page that rendered it.
 */
async function runWrite(
  write: () => Promise<QuestionsWriteResult>,
  audit: AuditedAction,
  successMessage: string,
): Promise<RegistrationActionState> {
  const actor = await requireAdmin();
  const result = await write();

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  await recordAuditEvent(audit, actor.email);

  // The readiness list and the open/close switches on the summary page are
  // derived from these rows, so both pages are refreshed together.
  revalidatePath("/admin/assessment/soal");
  revalidatePath("/admin/assessment");

  return { status: "success", message: successMessage };
}

const categorySchema = z
  .string()
  .trim()
  .max(120, "Kategori maksimal 120 karakter.");

export async function createQuestionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const prompt = promptSchema.safeParse(formData.get("prompt"));
  const questionType = z
    .enum(QUESTION_TYPES)
    .safeParse(formData.get("questionType"));
  const phaseScope = z
    .enum(PHASE_SCOPES)
    .safeParse(formData.get("phaseScope"));
  const category = categorySchema.safeParse(formData.get("category") ?? "");

  if (!questionType.success || !phaseScope.success) {
    return INVALID_COMMAND;
  }

  if (!prompt.success) {
    return {
      status: "validation_error",
      message: prompt.error.issues[0]?.message ?? "Pertanyaan tidak valid.",
      fieldErrors: { prompt: [prompt.error.issues[0]?.message ?? ""] },
    };
  }

  if (!category.success) {
    return {
      status: "validation_error",
      message: category.error.issues[0]?.message ?? "Kategori tidak valid.",
    };
  }

  return runWrite(
    () =>
      createQuestion(
        prompt.data,
        questionType.data,
        phaseScope.data,
        category.data === "" ? null : category.data,
      ),
    "create_question",
    questionType.data === "likert"
      ? "Soal skala ditambahkan beserta lima opsinya."
      : "Soal ditambahkan.",
  );
}

export async function updateQuestionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const questionId = idSchema.safeParse(formData.get("questionId"));
  const prompt = promptSchema.safeParse(formData.get("prompt"));

  if (!questionId.success) {
    return INVALID_COMMAND;
  }

  if (!prompt.success) {
    return {
      status: "validation_error",
      message: prompt.error.issues[0]?.message ?? "Pertanyaan tidak valid.",
    };
  }

  return runWrite(
    () => updateQuestion(questionId.data, prompt.data),
    "update_question",
    "Pertanyaan disimpan.",
  );
}

export async function deleteQuestionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const questionId = idSchema.safeParse(formData.get("questionId"));

  if (!questionId.success) {
    return INVALID_COMMAND;
  }

  return runWrite(
    () => deleteQuestion(questionId.data),
    "delete_question",
    "Soal dihapus.",
  );
}

export async function moveQuestionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const questionId = idSchema.safeParse(formData.get("questionId"));
  const direction = directionSchema.safeParse(formData.get("direction"));

  if (!questionId.success || !direction.success) {
    return INVALID_COMMAND;
  }

  return runWrite(
    () => moveQuestion(questionId.data, direction.data),
    "reorder_questions",
    direction.data === "up" ? "Soal dinaikkan." : "Soal diturunkan.",
  );
}

export async function createOptionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const questionId = idSchema.safeParse(formData.get("questionId"));
  const body = optionBodySchema.safeParse(formData.get("body"));

  if (!questionId.success) {
    return INVALID_COMMAND;
  }

  if (!body.success) {
    return {
      status: "validation_error",
      message: body.error.issues[0]?.message ?? "Opsi tidak valid.",
    };
  }

  return runWrite(
    () => createOption(questionId.data, body.data),
    "update_question",
    "Opsi ditambahkan.",
  );
}

export async function updateOptionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const questionId = idSchema.safeParse(formData.get("questionId"));
  const optionId = idSchema.safeParse(formData.get("optionId"));
  const body = optionBodySchema.safeParse(formData.get("body"));

  if (!questionId.success || !optionId.success) {
    return INVALID_COMMAND;
  }

  if (!body.success) {
    return {
      status: "validation_error",
      message: body.error.issues[0]?.message ?? "Opsi tidak valid.",
    };
  }

  return runWrite(
    () => updateOption(questionId.data, optionId.data, body.data),
    "update_question",
    "Opsi disimpan.",
  );
}

export async function deleteOptionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const questionId = idSchema.safeParse(formData.get("questionId"));
  const optionId = idSchema.safeParse(formData.get("optionId"));

  if (!questionId.success || !optionId.success) {
    return INVALID_COMMAND;
  }

  return runWrite(
    () => deleteOption(questionId.data, optionId.data),
    "update_question",
    "Opsi dihapus.",
  );
}

export async function setCorrectOptionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  await requireAdmin();

  const questionId = idSchema.safeParse(formData.get("questionId"));
  const optionId = idSchema.safeParse(formData.get("optionId"));

  if (!questionId.success || !optionId.success) {
    return INVALID_COMMAND;
  }

  return runWrite(
    () => setCorrectOption(questionId.data, optionId.data),
    "update_question",
    "Kunci jawaban disimpan.",
  );
}
