/**
 * Phase identifiers for the pre-test / post-test feature.
 *
 * The database enum is snake_case (`assessment_phase`), while participant URLs
 * are kebab-case (`/tes/pre-test`). The two spellings are mapped here and
 * nowhere else, so a route segment is never assembled by hand and can never
 * drift from the enum.
 */
export const ASSESSMENT_PHASES = ["pre_test", "post_test"] as const;

export type AssessmentPhase = (typeof ASSESSMENT_PHASES)[number];

const PHASE_SLUGS = {
  pre_test: "pre-test",
  post_test: "post-test",
} as const satisfies Record<AssessmentPhase, string>;

export type AssessmentPhaseSlug = (typeof PHASE_SLUGS)[AssessmentPhase];

export const ASSESSMENT_PHASE_LABELS = {
  pre_test: "Pre-test",
  post_test: "Post-test",
} as const satisfies Record<AssessmentPhase, string>;

export function toPhaseSlug(phase: AssessmentPhase): AssessmentPhaseSlug {
  return PHASE_SLUGS[phase];
}

/** Returns null for anything that is not a known phase slug. */
export function parsePhaseSlug(value: string): AssessmentPhase | null {
  return ASSESSMENT_PHASES.find((phase) => PHASE_SLUGS[phase] === value) ?? null;
}
