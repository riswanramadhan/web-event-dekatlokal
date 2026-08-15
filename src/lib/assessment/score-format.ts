import { TYPE_LABELS } from "@/components/admin/ui";

import type {
  CapabilityMeans,
  KnowledgeSummary,
  ScoreProgress,
} from "./scores";

/**
 * Satu tempat untuk setiap sel di tabel nilai, karena CSV harus membawa kolom
 * yang sama dengan layar. Dua formatter akan berbeda cepat atau lambat, dan
 * ekspor adalah salinan yang keluar dari panel.
 *
 * Istilahnya mengikuti Panduan Scoring §2 dan §8:
 * - Pemahaman skala 0–100, boleh disebut nilai.
 * - Kapabilitas skala 1–5 dua desimal, tidak pernah dipersenkan.
 * - Keduanya tidak pernah dijumlahkan.
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

/** `75% (3/4)` — persentase untuk laporan, pecahan supaya asalnya terbaca. */
export function formatKnowledge(summary: KnowledgeSummary | null): string {
  if (!summary) {
    return "";
  }

  if (summary.percent === null) {
    return "–";
  }

  return `${summary.percent}% (${summary.score}/${summary.total})`;
}

/**
 * Rata-rata pemahaman satu kelompok. Desimal dipertahankan hanya bila ada —
 * "13%" untuk rata-rata bulat, "12.5%" kalau memang pecahan, tanpa nol ekor
 * yang menyiratkan ketelitian yang tidak dimiliki datanya.
 */
export function formatPercentMean(value: number | null): string {
  if (value === null) {
    return "";
  }

  return `${Number(value.toFixed(2))}%`;
}

/** Selisih pemahaman dalam poin persen, bertanda supaya arahnya terbaca. */
export function formatKnowledgeGain(gain: number | null): string {
  if (gain === null) {
    return "";
  }

  const rounded = Number(gain.toFixed(2));

  return rounded > 0 ? `+${rounded}` : String(rounded);
}

/** Skala 1–5 dua desimal. Tidak pernah dipersenkan. */
export function formatScale(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  return value.toFixed(2);
}

export function formatScaleChange(change: number | null): string {
  if (change === null) {
    return "";
  }

  return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
}

export function dimensionMean(
  means: CapabilityMeans | null,
  dimension: string,
): number | null {
  return means?.byDimension[dimension] ?? null;
}
