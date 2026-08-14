import { TYPE_LABELS } from "@/components/admin/ui";

import type { AttemptSummary, ScoreProgress } from "./scores";

/**
 * One place for every cell in the scores table, because the CSV must carry the
 * same columns as the screen. Two formatters would eventually disagree, and the
 * export is the copy that leaves the panel.
 */

export const PROGRESS_LABELS: Record<ScoreProgress, string> = {
  not_started: "Belum mulai",
  in_progress: "Sedang mengerjakan",
  pre_only: "Baru pre-test",
  post_only: "Baru post-test",
  complete: "Selesai",
};

export function formatRegistrationType(value: string): string {
  return TYPE_LABELS[value] ?? value;
}

/**
 * `80% (12/15)` once submitted. An attempt still running is named rather than
 * scored, and a participant who never started leaves the cell empty — an empty
 * cell and a zero mean very different things here.
 */
export function formatScoreCell(summary: AttemptSummary | null): string {
  if (!summary) {
    return "";
  }

  if (summary.status === "in_progress") {
    return "Sedang mengerjakan";
  }

  if (summary.percent === null) {
    return "–";
  }

  return `${summary.percent}% (${summary.score ?? 0}/${summary.totalPoints ?? 0})`;
}

/** Signed so the direction is readable without comparing the two columns. */
export function formatDifference(difference: number | null): string {
  if (difference === null) {
    return "";
  }

  if (difference > 0) {
    return `+${difference}`;
  }

  return String(difference);
}

export function formatPercent(value: number | null): string {
  return value === null ? "–" : `${value}%`;
}
