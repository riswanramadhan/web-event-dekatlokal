/**
 * Tipe soal dan cakupan phase.
 *
 * Data murni tanpa akses database, jadi komponen client dan modul server
 * memakai daftar yang sama — label di editor admin dan validasi di server tidak
 * bisa berbeda pendapat soal tipe apa saja yang sah.
 */

export const QUESTION_TYPES = [
  "scored_choice",
  "likert",
  "unscored_choice",
] as const;

export type AssessmentQuestionType = (typeof QUESTION_TYPES)[number];

export const QUESTION_TYPE_LABELS = {
  scored_choice: "Pilihan berskor",
  likert: "Skala 1–5",
  unscored_choice: "Pilihan tanpa skor",
} as const satisfies Record<AssessmentQuestionType, string>;

export const QUESTION_TYPE_HINTS = {
  scored_choice:
    "Punya satu kunci jawaban dan masuk hitungan skor pengetahuan.",
  likert:
    "Lima opsi baku Sangat Tidak Setuju sampai Sangat Setuju. Tidak masuk skor.",
  unscored_choice:
    "Pilihan tanpa jawaban benar, misalnya kesediaan atau preferensi. Tidak masuk skor.",
} as const satisfies Record<AssessmentQuestionType, string>;

export const PHASE_SCOPES = ["both", "post_test"] as const;

export type PhaseScope = (typeof PHASE_SCOPES)[number];

export const PHASE_SCOPE_LABELS = {
  both: "Pre-test & Post-test",
  post_test: "Khusus post-test",
} as const satisfies Record<PhaseScope, string>;

/**
 * Lima opsi baku untuk soal skala. Dibuat otomatis saat soal Likert dibuat dan
 * ditampilkan read-only di editor: labelnya bagian dari instrumen, bukan sesuatu
 * yang boleh berbeda antar pernyataan — kalau berbeda, rata-ratanya tidak lagi
 * bisa dibandingkan.
 */
export const LIKERT_OPTIONS = [
  { body: "Sangat Tidak Setuju", value: 1 },
  { body: "Tidak Setuju", value: 2 },
  { body: "Netral", value: 3 },
  { body: "Setuju", value: 4 },
  { body: "Sangat Setuju", value: 5 },
] as const;

/** Hanya tipe ini yang menyumbang ke `score` dan `total_points`. */
export function isScoredType(type: AssessmentQuestionType): boolean {
  return type === "scored_choice";
}
