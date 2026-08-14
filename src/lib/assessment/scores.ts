import "server-only";

import { z } from "zod";

import { toPercent } from "./attempts";
import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
import { PARTICIPANT_STATUS_EXCLUSION } from "./participants";
import { ASSESSMENT_PHASES } from "./phase";

const registrationRowSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  registration_type: z.string(),
});

const scoreAttemptRowSchema = z.object({
  registration_id: z.string().uuid(),
  phase: z.enum(ASSESSMENT_PHASES),
  status: z.enum(["in_progress", "submitted"]),
  score: z.number().int().nullable(),
  total_points: z.number().int().nullable(),
});

export type AttemptSummary = {
  status: "in_progress" | "submitted";
  score: number | null;
  totalPoints: number | null;
  /** Null while in progress, and null when there are no points to divide by. */
  percent: number | null;
};

/** How far through the two tests this participant is. */
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
  pre: AttemptSummary | null;
  post: AttemptSummary | null;
  /** Post minus pre in percentage points; null unless both are submitted. */
  difference: number | null;
  progress: ScoreProgress;
};

export type ScoreboardSummary = {
  averagePre: number | null;
  averagePost: number | null;
  averageGain: number | null;
  completedBoth: number;
};

export type ScoreboardResult =
  | { ok: true; rows: ParticipantScore[]; summary: ScoreboardSummary }
  | { ok: false; message: string };

function average(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return Math.round(
    values.reduce((total, value) => total + value, 0) / values.length,
  );
}

function toSummary(
  row: z.infer<typeof scoreAttemptRowSchema> | undefined,
): AttemptSummary | null {
  if (!row) {
    return null;
  }

  return {
    status: row.status,
    score: row.score,
    totalPoints: row.total_points,
    percent:
      row.status === "submitted" ? toPercent(row.score, row.total_points) : null,
  };
}

function toProgress(
  pre: AttemptSummary | null,
  post: AttemptSummary | null,
): ScoreProgress {
  if (pre?.status === "in_progress" || post?.status === "in_progress") {
    return "in_progress";
  }

  const preDone = pre?.status === "submitted";
  const postDone = post?.status === "submitted";

  if (preDone && postDone) {
    return "complete";
  }

  if (preDone) {
    return "pre_only";
  }

  if (postDone) {
    return "post_only";
  }

  return "not_started";
}

/**
 * Every participant, with whatever they have done so far.
 *
 * Driven by the registration list rather than by the attempts, so someone who
 * has not started still appears as an empty row. The same status filter as the
 * name dropdown applies, which is what keeps rejected and withdrawn applicants
 * out of the report as well as off the participant screens.
 */
export async function listScores(): Promise<ScoreboardResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const [registrationsResult, attemptsResult] = await Promise.all([
    target.supabase
      .from("registrations")
      .select("id, full_name, registration_type")
      .eq("event_id", target.eventId)
      .not("status", "in", PARTICIPANT_STATUS_EXCLUSION)
      .order("full_name", { ascending: true }),
    target.supabase
      .from("assessment_attempts")
      .select("registration_id, phase, status, score, total_points")
      .eq("event_id", target.eventId),
  ]);

  if (registrationsResult.error) {
    logAssessmentFailure("list_scores_registrations", registrationsResult.error);
    return {
      ok: false,
      message: translateAssessmentError(registrationsResult.error),
    };
  }

  if (attemptsResult.error) {
    logAssessmentFailure("list_scores_attempts", attemptsResult.error);
    return {
      ok: false,
      message: translateAssessmentError(attemptsResult.error),
    };
  }

  const registrations = z
    .array(registrationRowSchema)
    .safeParse(registrationsResult.data ?? []);
  const attempts = z
    .array(scoreAttemptRowSchema)
    .safeParse(attemptsResult.data ?? []);

  if (!registrations.success || !attempts.success) {
    logAssessmentFailure("list_scores_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  const byParticipant = new Map<
    string,
    Partial<Record<"pre_test" | "post_test", z.infer<typeof scoreAttemptRowSchema>>>
  >();

  for (const attempt of attempts.data) {
    const existing = byParticipant.get(attempt.registration_id) ?? {};
    existing[attempt.phase] = attempt;
    byParticipant.set(attempt.registration_id, existing);
  }

  const rows: ParticipantScore[] = registrations.data.map((registration) => {
    const found = byParticipant.get(registration.id) ?? {};
    const pre = toSummary(found.pre_test);
    const post = toSummary(found.post_test);

    return {
      registrationId: registration.id,
      fullName: registration.full_name,
      registrationType: registration.registration_type,
      pre,
      post,
      difference:
        pre?.percent !== null &&
        pre?.percent !== undefined &&
        post?.percent !== null &&
        post?.percent !== undefined
          ? post.percent - pre.percent
          : null,
      progress: toProgress(pre, post),
    };
  });

  // Averages count only what has actually been submitted, and the gain counts
  // only participants who finished both — averaging a difference against a
  // missing pre-test would invent a number nobody earned.
  const preScores = rows
    .map((row) => row.pre?.percent)
    .filter((value): value is number => typeof value === "number");
  const postScores = rows
    .map((row) => row.post?.percent)
    .filter((value): value is number => typeof value === "number");
  const gains = rows
    .map((row) => row.difference)
    .filter((value): value is number => typeof value === "number");

  return {
    ok: true,
    rows,
    summary: {
      averagePre: average(preScores),
      averagePost: average(postScores),
      averageGain: average(gains),
      completedBoth: gains.length,
    },
  };
}
