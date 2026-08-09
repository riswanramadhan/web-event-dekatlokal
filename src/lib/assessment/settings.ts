import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { getManagedEventId } from "./event";
import { ASSESSMENT_PHASES, type AssessmentPhase } from "./phase";
import { assessmentProblemsSchema } from "./schemas";

/** Mirrors `assessment_settings_duration_range` in the migration. */
export const MIN_DURATION_SECONDS = 60;
export const MAX_DURATION_SECONDS = 14400;

const durationSecondsSchema = z
  .number()
  .int()
  .min(MIN_DURATION_SECONDS)
  .max(MAX_DURATION_SECONDS);

/** Confirms the update landed on the phase that was asked for. */
const updatedRowSchema = z.object({
  phase: z.enum(ASSESSMENT_PHASES),
});

export type AssessmentWriteResult =
  | { ok: true }
  | { ok: false; message: string; problems?: string[] };

const SETTINGS_MISSING_MESSAGE =
  "Pengaturan tes belum ada di database. Muat ulang halaman ringkasan untuk membuatnya.";

type ResolvedTarget =
  | { ok: true; supabase: SupabaseClient; eventId: string }
  | { ok: false; message: string };

async function resolveTarget(): Promise<ResolvedTarget> {
  const event = await getManagedEventId();

  if (event.status === "unconfigured") {
    return { ok: false, message: "Supabase belum dikonfigurasi." };
  }

  if (event.status === "missing") {
    return {
      ok: false,
      message: `Event "${event.slug}" tidak ditemukan di database.`,
    };
  }

  if (event.status === "error") {
    return { ok: false, message: translateAssessmentError(null) };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { ok: false, message: "Supabase belum dikonfigurasi." };
  }

  return { ok: true, supabase, eventId: event.eventId };
}

/**
 * Readiness check for opening a test.
 *
 * This is re-run at write time rather than trusting the disabled switch: a
 * Server Action is an independently reachable endpoint, and the page that
 * rendered the control may be minutes stale. The database does not cover this
 * rule either — `start_assessment_attempt()` only refuses when there are no
 * questions at all, so nothing but this check stops a test opening with a
 * question that has no answer key.
 */
async function readProblems(
  supabase: SupabaseClient,
  eventId: string,
): Promise<{ ok: true; problems: string[] } | { ok: false; message: string }> {
  const { data, error } = await supabase.rpc("assessment_problems", {
    p_event_id: eventId,
  });

  if (error) {
    logAssessmentFailure("problems_write_path", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  const parsed = assessmentProblemsSchema.safeParse(data ?? []);

  if (!parsed.success) {
    logAssessmentFailure("problems_write_path_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return { ok: true, problems: parsed.data };
}

export async function setAssessmentOpen(
  phase: AssessmentPhase,
  shouldOpen: boolean,
): Promise<AssessmentWriteResult> {
  const target = await resolveTarget();

  if (!target.ok) {
    return target;
  }

  const { supabase, eventId } = target;

  if (shouldOpen) {
    const problems = await readProblems(supabase, eventId);

    if (!problems.ok) {
      return { ok: false, message: problems.message };
    }

    if (problems.problems.length > 0) {
      return {
        ok: false,
        message: "Tes belum bisa dibuka karena soal belum siap.",
        problems: problems.problems,
      };
    }

    // `opened_at` means "this test has been opened before", not "last opened",
    // and the participant gate reads it to decide whether the name dropdown is
    // shown at all. Stamping it in its own statement, filtered on `is null`,
    // keeps two administrators opening at once from both deciding it was null
    // and overwriting each other's timestamp.
    const stamped = await supabase
      .from("assessment_settings")
      .update({ opened_at: new Date().toISOString() })
      .eq("event_id", eventId)
      .eq("phase", phase)
      .is("opened_at", null);

    if (stamped.error) {
      logAssessmentFailure("stamp_opened_at", stamped.error);
      return { ok: false, message: translateAssessmentError(stamped.error) };
    }
  }

  const { data, error } = await supabase
    .from("assessment_settings")
    .update(
      shouldOpen
        ? { is_open: true }
        : { is_open: false, closed_at: new Date().toISOString() },
    )
    .eq("event_id", eventId)
    .eq("phase", phase)
    .select("phase")
    .maybeSingle();

  if (error) {
    logAssessmentFailure(shouldOpen ? "open_phase" : "close_phase", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  if (data === null) {
    return { ok: false, message: SETTINGS_MISSING_MESSAGE };
  }

  const parsed = updatedRowSchema.safeParse(data);

  if (!parsed.success || parsed.data.phase !== phase) {
    logAssessmentFailure("open_phase_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return { ok: true };
}

/**
 * Changing the duration never touches an attempt that is already running:
 * `expires_at` was snapshotted from `duration_seconds` when the participant
 * pressed Mulai, and nothing recomputes it afterwards.
 */
export async function setAssessmentDuration(
  phase: AssessmentPhase,
  durationSeconds: number,
): Promise<AssessmentWriteResult> {
  const validated = durationSecondsSchema.safeParse(durationSeconds);

  if (!validated.success) {
    return {
      ok: false,
      message: "Durasi harus antara 1 dan 240 menit.",
    };
  }

  const target = await resolveTarget();

  if (!target.ok) {
    return target;
  }

  const { data, error } = await target.supabase
    .from("assessment_settings")
    .update({ duration_seconds: validated.data })
    .eq("event_id", target.eventId)
    .eq("phase", phase)
    .select("phase")
    .maybeSingle();

  if (error) {
    logAssessmentFailure("set_duration", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  if (data === null) {
    return { ok: false, message: SETTINGS_MISSING_MESSAGE };
  }

  const parsed = updatedRowSchema.safeParse(data);

  if (!parsed.success || parsed.data.phase !== phase) {
    logAssessmentFailure("set_duration_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return { ok: true };
}
