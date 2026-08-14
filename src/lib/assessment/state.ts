import "server-only";

import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
import type { AssessmentPhase } from "./phase";

const stateRowSchema = z.object({
  is_open: z.boolean(),
  duration_seconds: z.number().int().min(60).max(14400),
  opened_at: z.string().nullable(),
});

/**
 * What a participant screen is allowed to know before anyone identifies
 * themselves.
 *
 * `hasEverOpened` is derived here rather than sending `opened_at`: spec §6 asks
 * for the boolean, and a raw timestamp would tell an onlooker when the session
 * ran without adding anything the screen needs.
 */
export type AssessmentPublicState = {
  isOpen: boolean;
  durationSeconds: number;
  hasEverOpened: boolean;
  questionCount: number;
};

export type AssessmentStateResult =
  | { ok: true; state: AssessmentPublicState }
  | { ok: false; message: string };

export async function getAssessmentState(
  phase: AssessmentPhase,
): Promise<AssessmentStateResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const [settingsResult, questionsResult] = await Promise.all([
    target.supabase
      .from("assessment_settings")
      .select("is_open, duration_seconds, opened_at")
      .eq("event_id", target.eventId)
      .eq("phase", phase)
      .maybeSingle(),
    // Dihitung per phase, bukan seluruh bank soal: soal berlingkup
    // 'post_test' tidak pernah masuk attempt pre-test, jadi menghitungnya
    // akan menjanjikan jumlah soal yang tidak akan peserta temui.
    target.supabase
      .from("assessment_questions")
      .select("id", { count: "exact", head: true })
      .eq("event_id", target.eventId)
      .in("phase_scope", phase === "post_test" ? ["both", "post_test"] : ["both"]),
  ]);

  if (settingsResult.error) {
    logAssessmentFailure("participant_state", settingsResult.error);
    return {
      ok: false,
      message: translateAssessmentError(settingsResult.error),
    };
  }

  if (questionsResult.error) {
    logAssessmentFailure("participant_question_count", questionsResult.error);
    return {
      ok: false,
      message: translateAssessmentError(questionsResult.error),
    };
  }

  if (settingsResult.data === null) {
    // The rows are created when an administrator opens the summary page. Until
    // then the test has plainly never been opened, which is the same thing the
    // gate would show anyway.
    return {
      ok: true,
      state: {
        isOpen: false,
        durationSeconds: 900,
        hasEverOpened: false,
        questionCount: questionsResult.count ?? 0,
      },
    };
  }

  const parsed = stateRowSchema.safeParse(settingsResult.data);

  if (!parsed.success) {
    logAssessmentFailure("participant_state_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return {
    ok: true,
    state: {
      isOpen: parsed.data.is_open,
      durationSeconds: parsed.data.duration_seconds,
      hasEverOpened: parsed.data.opened_at !== null,
      questionCount: questionsResult.count ?? 0,
    },
  };
}
