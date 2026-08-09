import { z } from "zod";

import { ASSESSMENT_PHASES } from "./phase";

/**
 * Every row this feature reads back from Supabase is parsed, whatever its
 * shape. There is no generated `Database` type in this repo, so an inline
 * generic on a query is an unverified assertion: when a column drifts the field
 * simply arrives as `undefined` and nothing raises. A silently-undefined
 * `duration_seconds` would be rendered to an administrator as fact.
 */
export const assessmentSettingsRowSchema = z.object({
  phase: z.enum(ASSESSMENT_PHASES),
  is_open: z.boolean(),
  duration_seconds: z.number().int().min(60).max(14400),
  opened_at: z.string().nullable(),
  closed_at: z.string().nullable(),
});

export type AssessmentSettingsRow = z.infer<typeof assessmentSettingsRowSchema>;

export const assessmentSettingsRowsSchema = z.array(assessmentSettingsRowSchema);

/**
 * `assessment_problems()` returns `setof text`, which PostgREST serialises as a
 * plain array of strings. An empty array means the questions are ready.
 */
export const assessmentProblemsSchema = z.array(z.string());

/**
 * Admin-side option shape. `is_correct` belongs here and only here — the
 * participant payload carries `id` and `body` alone, because a leaked answer
 * key in the pre-test would destroy the meaning of the score difference.
 */
export const assessmentOptionRowSchema = z.object({
  id: z.string().uuid(),
  body: z.string(),
  order_index: z.number().int().min(0),
  is_correct: z.boolean(),
});

export type AssessmentOptionRow = z.infer<typeof assessmentOptionRowSchema>;

export const assessmentQuestionRowSchema = z.object({
  id: z.string().uuid(),
  prompt: z.string(),
  order_index: z.number().int().min(0),
  points: z.number().int().min(1),
  assessment_options: z.array(assessmentOptionRowSchema),
});

export type AssessmentQuestionRow = z.infer<typeof assessmentQuestionRowSchema>;

export const assessmentQuestionRowsSchema = z.array(assessmentQuestionRowSchema);
