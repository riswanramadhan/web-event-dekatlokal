"use server";

import { z } from "zod";

import {
  saveAnswer,
  startOrResumeAttempt,
  submitAttempt,
  type AttemptPayload,
} from "@/lib/assessment/attempts";
import {
  listParticipants,
  type Participant,
} from "@/lib/assessment/participants";
import { parsePhaseSlug } from "@/lib/assessment/phase";
import {
  getAssessmentState,
  type AssessmentPublicState,
} from "@/lib/assessment/state";
import type { RegistrationActionState } from "@/lib/registration/result";

const idSchema = z.string().uuid();
const slugSchema = z.string().max(40);

/**
 * The shared action contract plus the payload the work screen needs. Extending
 * it keeps the `status` discriminant and `formErrors` behaviour the rest of the
 * repo relies on, rather than inventing a parallel shape.
 */
export type StartAttemptState = RegistrationActionState & {
  attempt?: AttemptPayload;
};

export const initialStartAttemptState: StartAttemptState = {
  status: "idle",
  message: "",
};

export type GateRefresh = {
  state: AssessmentPublicState;
  /** Only sent once the dropdown is due to appear. */
  participants: Participant[] | null;
};

/**
 * Polled by the "not opened yet" gate so participants do not have to refresh
 * when the organisers open the test.
 *
 * The participant list is withheld while the gate is locked: that screen shows
 * no dropdown, so sending a roster of names to it would be a leak with no
 * purpose.
 */
export async function refreshGateAction(
  phaseSlug: string,
): Promise<GateRefresh | null> {
  const slug = slugSchema.safeParse(phaseSlug);

  if (!slug.success) {
    return null;
  }

  const phase = parsePhaseSlug(slug.data);

  if (!phase) {
    return null;
  }

  const stateResult = await getAssessmentState(phase);

  if (!stateResult.ok) {
    return null;
  }

  const showPicker =
    stateResult.state.isOpen || stateResult.state.hasEverOpened;

  if (!showPicker) {
    return { state: stateResult.state, participants: null };
  }

  const participantsResult = await listParticipants();

  return {
    state: stateResult.state,
    participants: participantsResult.ok ? participantsResult.participants : null,
  };
}

export async function startAttemptAction(
  _prevState: StartAttemptState,
  formData: FormData,
): Promise<StartAttemptState> {
  const slug = slugSchema.safeParse(formData.get("phase"));
  const registrationId = idSchema.safeParse(formData.get("registrationId"));

  if (!slug.success) {
    return { status: "error", message: "Tes tidak dikenali." };
  }

  const phase = parsePhaseSlug(slug.data);

  if (!phase) {
    return { status: "error", message: "Tes tidak dikenali." };
  }

  if (!registrationId.success) {
    return {
      status: "validation_error",
      message: "Pilih namamu dulu dari daftar.",
    };
  }

  const result = await startOrResumeAttempt(registrationId.data, phase);

  if (!result.ok) {
    return { status: "unavailable", message: result.message };
  }

  return { status: "success", message: "", attempt: result.attempt };
}

export type SaveAnswerOutcome =
  | { ok: true }
  | { ok: false; expired: boolean; message: string };

export async function saveAnswerAction(
  attemptId: string,
  questionId: string,
  optionId: string,
): Promise<SaveAnswerOutcome> {
  const parsed = z
    .object({
      attemptId: idSchema,
      questionId: idSchema,
      optionId: idSchema,
    })
    .safeParse({ attemptId, questionId, optionId });

  if (!parsed.success) {
    return {
      ok: false,
      expired: false,
      message: "Jawaban belum tersimpan. Periksa koneksi kamu.",
    };
  }

  return saveAnswer(
    parsed.data.attemptId,
    parsed.data.questionId,
    parsed.data.optionId,
  );
}

export type SubmitOutcome = { ok: true } | { ok: false; message: string };

/**
 * Returns nothing but success. The RPC hands back a score for both phases; it
 * is dropped here so no participant screen can ever receive one — for the
 * pre-test that is a rule, and for the post-test the result page in a later
 * block reads it from the database instead.
 */
export async function submitAttemptAction(
  attemptId: string,
): Promise<SubmitOutcome> {
  const parsed = idSchema.safeParse(attemptId);

  if (!parsed.success) {
    return { ok: false, message: "Sesi tes tidak dikenali." };
  }

  const result = await submitAttempt(parsed.data);

  return result.ok ? { ok: true } : { ok: false, message: result.message };
}
