"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { recordAuditEvent, requireAdmin } from "@/lib/admin/auth";
import {
  ASSESSMENT_PHASES,
  ASSESSMENT_PHASE_LABELS,
} from "@/lib/assessment/phase";
import {
  setAssessmentDuration,
  setAssessmentOpen,
} from "@/lib/assessment/settings";
import type { RegistrationActionState } from "@/lib/registration/result";

/**
 * The duration is stored in seconds but entered in whole minutes: 60–14400
 * seconds is 1–240 minutes, so the bounds are the same rule expressed in the
 * unit an organiser actually thinks in.
 */
const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 240;

const phaseSchema = z.enum(ASSESSMENT_PHASES);
const intentSchema = z.enum(["open", "close"]);
const durationMinutesSchema = z.coerce
  .number()
  .int()
  .min(MIN_DURATION_MINUTES)
  .max(MAX_DURATION_MINUTES);

export async function toggleAssessmentOpenAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  // Server Actions are independently reachable endpoints, so authorization is
  // re-checked here rather than relying on the page that rendered the switch.
  const actor = await requireAdmin();

  const phase = phaseSchema.safeParse(formData.get("phase"));
  const intent = intentSchema.safeParse(formData.get("intent"));

  if (!phase.success || !intent.success) {
    return { status: "error", message: "Perintah tidak valid." };
  }

  const shouldOpen = intent.data === "open";
  const result = await setAssessmentOpen(phase.data, shouldOpen);

  if (!result.ok) {
    // The readiness failures are carried as formErrors so the reasons reach the
    // administrator instead of a bare refusal.
    return result.problems && result.problems.length > 0
      ? {
          status: "validation_error",
          message: result.message,
          formErrors: result.problems,
        }
      : { status: "error", message: result.message };
  }

  await recordAuditEvent(
    shouldOpen ? "open_assessment" : "close_assessment",
    actor.email,
  );

  revalidatePath("/admin/assessment");

  const label = ASSESSMENT_PHASE_LABELS[phase.data];

  return {
    status: "success",
    message: shouldOpen ? `${label} dibuka.` : `${label} ditutup.`,
  };
}

export async function setAssessmentDurationAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  const actor = await requireAdmin();

  const phase = phaseSchema.safeParse(formData.get("phase"));
  const minutes = durationMinutesSchema.safeParse(
    formData.get("durationMinutes"),
  );

  if (!phase.success) {
    return { status: "error", message: "Perintah tidak valid." };
  }

  if (!minutes.success) {
    return {
      status: "validation_error",
      message: `Durasi harus bilangan bulat antara ${MIN_DURATION_MINUTES} dan ${MAX_DURATION_MINUTES} menit.`,
    };
  }

  const result = await setAssessmentDuration(phase.data, minutes.data * 60);

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  await recordAuditEvent("update_assessment_duration", actor.email);

  revalidatePath("/admin/assessment");

  return {
    status: "success",
    message: `Durasi ${ASSESSMENT_PHASE_LABELS[phase.data]} disimpan: ${
      minutes.data
    } menit.`,
  };
}
