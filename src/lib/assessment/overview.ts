import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { getManagedEventId } from "./event";
import { PARTICIPANT_STATUS_EXCLUSION } from "./participants";
import { ASSESSMENT_PHASES, type AssessmentPhase } from "./phase";
import {
  assessmentProblemsSchema,
  assessmentSettingsRowsSchema,
} from "./schemas";

/** Matches the column default in the migration. */
const DEFAULT_DURATION_SECONDS = 900;

export type AssessmentPhaseStatus = "never_opened" | "open" | "closed";

export type AssessmentPhaseOverview = {
  phase: AssessmentPhase;
  status: AssessmentPhaseStatus;
  durationSeconds: number;
  openedAt: string | null;
  closedAt: string | null;
  submittedCount: number;
};

export type AssessmentOverview = {
  participantCount: number;
  /** Empty means the questions are ready and the test may be opened. */
  problems: string[];
  phases: AssessmentPhaseOverview[];
  /** True once any attempt exists: the questions are locked by the triggers. */
  frozen: boolean;
};

export type AssessmentOverviewResult =
  | { status: "ok"; overview: AssessmentOverview }
  | { status: "unconfigured" }
  | { status: "event_missing"; slug: string }
  | { status: "error"; message: string };

/**
 * Three states that mean three different things to a participant, so they must
 * stay distinguishable to an administrator too:
 *
 * - never opened → the gate shows no dropdown at all
 * - open         → participants may start
 * - closed       → the dropdown stays visible so anyone who already started can
 *                  finish; only new attempts are refused
 */
function derivePhaseStatus(
  isOpen: boolean,
  openedAt: string | null,
): AssessmentPhaseStatus {
  if (isOpen) {
    return "open";
  }

  return openedAt === null ? "never_opened" : "closed";
}

/**
 * Creates the two settings rows in their default (closed) state when they do
 * not exist yet.
 *
 * `ignoreDuplicates` is what makes this safe to run on every page view: a plain
 * upsert would write `is_open: false` over a test that is currently open, so
 * merely loading this page would close a running test.
 *
 * Spec §4.2 requires this rather than relying on the seed block in the
 * migration: one missed seed step would give the first participant a hard error
 * that no one could fix from the admin panel.
 */
async function ensureAssessmentSettings(
  supabase: SupabaseClient,
  eventId: string,
): Promise<{ code?: string | null } | null> {
  const { error } = await supabase.from("assessment_settings").upsert(
    ASSESSMENT_PHASES.map((phase) => ({
      event_id: eventId,
      phase,
      is_open: false,
      duration_seconds: DEFAULT_DURATION_SECONDS,
    })),
    { onConflict: "event_id,phase", ignoreDuplicates: true },
  );

  return error;
}

export async function getAssessmentOverview(): Promise<AssessmentOverviewResult> {
  const event = await getManagedEventId();

  if (event.status === "unconfigured") {
    return { status: "unconfigured" };
  }

  if (event.status === "missing") {
    return { status: "event_missing", slug: event.slug };
  }

  if (event.status === "error") {
    return { status: "error", message: translateAssessmentError(null) };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { status: "unconfigured" };
  }

  const ensureError = await ensureAssessmentSettings(supabase, event.eventId);

  if (ensureError) {
    logAssessmentFailure("ensure_settings", ensureError);
    return { status: "error", message: translateAssessmentError(ensureError) };
  }

  const [
    settingsResult,
    problemsResult,
    participantsResult,
    attemptsResult,
    submittedResults,
  ] = await Promise.all([
      supabase
        .from("assessment_settings")
        .select("phase, is_open, duration_seconds, opened_at, closed_at")
        .eq("event_id", event.eventId),
      supabase.rpc("assessment_problems", { p_event_id: event.eventId }),
      supabase
        .from("registrations")
        .select("id", { count: "exact", head: true })
        .eq("event_id", event.eventId)
        .not("status", "in", PARTICIPANT_STATUS_EXCLUSION),
      supabase
        .from("assessment_attempts")
        .select("id", { count: "exact", head: true })
        .eq("event_id", event.eventId),
      // Counted per phase with head-only queries rather than by fetching the
      // attempts and measuring the array, matching how the registrant totals
      // are counted on /admin.
      Promise.all(
        ASSESSMENT_PHASES.map((phase) =>
          supabase
            .from("assessment_attempts")
            .select("id", { count: "exact", head: true })
            .eq("event_id", event.eventId)
            .eq("phase", phase)
            .eq("status", "submitted"),
        ),
      ),
    ]);

  if (settingsResult.error) {
    logAssessmentFailure("settings", settingsResult.error);
    return {
      status: "error",
      message: translateAssessmentError(settingsResult.error),
    };
  }

  if (problemsResult.error) {
    logAssessmentFailure("problems", problemsResult.error);
    return {
      status: "error",
      message: translateAssessmentError(problemsResult.error),
    };
  }

  // A failed count query returns `count: null`, which would render as a
  // confident "0 dari 0 peserta selesai". Refusing the page is the honest
  // outcome: a wrong number here is read as fact.
  const failedCount =
    participantsResult.error ??
    attemptsResult.error ??
    submittedResults.find((result) => result.error)?.error;

  if (failedCount) {
    logAssessmentFailure("counts", failedCount);
    return { status: "error", message: translateAssessmentError(failedCount) };
  }

  const settings = assessmentSettingsRowsSchema.safeParse(settingsResult.data);
  const problems = assessmentProblemsSchema.safeParse(problemsResult.data ?? []);

  if (!settings.success || !problems.success) {
    logAssessmentFailure("overview_shape", { code: "INVALID_SHAPE" });
    return { status: "error", message: translateAssessmentError(null) };
  }

  const phases: AssessmentPhaseOverview[] = [];

  for (const [index, phase] of ASSESSMENT_PHASES.entries()) {
    const row = settings.data.find((candidate) => candidate.phase === phase);

    if (!row) {
      // ensureAssessmentSettings() just ran, so a missing row means the write
      // silently did nothing. Reporting it beats rendering an invented default
      // that the participant flow would then contradict.
      logAssessmentFailure("settings_missing_phase", { code: phase });
      return {
        status: "error",
        message:
          "Pengaturan tes belum lengkap di database. Muat ulang halaman ini, lalu hubungi pengembang bila tetap muncul.",
      };
    }

    phases.push({
      phase,
      status: derivePhaseStatus(row.is_open, row.opened_at),
      durationSeconds: row.duration_seconds,
      openedAt: row.opened_at,
      closedAt: row.closed_at,
      submittedCount: submittedResults[index]?.count ?? 0,
    });
  }

  return {
    status: "ok",
    overview: {
      participantCount: participantsResult.count ?? 0,
      problems: problems.data,
      phases,
      frozen: (attemptsResult.count ?? 0) > 0,
    },
  };
}
