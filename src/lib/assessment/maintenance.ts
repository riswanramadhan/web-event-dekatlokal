import "server-only";

import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";

export type MaintenanceResult =
  | { ok: true; affected: number }
  | { ok: false; message: string };

const countSchema = z.number().int().min(0);

/**
 * Closes attempts whose deadline passed while nobody was looking — a phone that
 * died, a tab that was closed. Run at the end of the event so the scores table
 * has no rows left hanging in "sedang mengerjakan".
 *
 * Idempotent by way of `submit_assessment_attempt()`, which returns the stored
 * values when an attempt is already submitted.
 */
export async function finalizeExpiredAttempts(): Promise<MaintenanceResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const { data, error } = await target.supabase.rpc(
    "finalize_expired_attempts",
    { p_event_id: target.eventId },
  );

  if (error) {
    logAssessmentFailure("finalize_expired", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  const parsed = countSchema.safeParse(data);

  if (!parsed.success) {
    logAssessmentFailure("finalize_expired_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return { ok: true, affected: parsed.data };
}

/**
 * Deletes every attempt and answer for the event, which is what unlocks the
 * questions again.
 *
 * Refuses while anyone is still working: `reset_assessment_attempts()` would
 * happily delete a running attempt out from under a participant mid-question,
 * and the database does not guard that — this check is the only one. It is
 * re-run here rather than trusting the disabled button, because a Server Action
 * is reachable on its own and the page may be minutes stale.
 */
export async function resetAssessment(): Promise<MaintenanceResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const running = await target.supabase
    .from("assessment_attempts")
    .select("id", { count: "exact", head: true })
    .eq("event_id", target.eventId)
    .eq("status", "in_progress");

  if (running.error) {
    logAssessmentFailure("reset_running_check", running.error);
    return { ok: false, message: translateAssessmentError(running.error) };
  }

  const stillWorking = running.count ?? 0;

  if (stillWorking > 0) {
    return {
      ok: false,
      message: `Masih ada ${stillWorking} peserta yang sedang mengerjakan. Tunggu sampai selesai atau finalisasi dulu.`,
    };
  }

  const { data, error } = await target.supabase.rpc(
    "reset_assessment_attempts",
    { p_event_id: target.eventId },
  );

  if (error) {
    logAssessmentFailure("reset_assessment", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  const parsed = countSchema.safeParse(data);

  if (!parsed.success) {
    logAssessmentFailure("reset_assessment_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return { ok: true, affected: parsed.data };
}
