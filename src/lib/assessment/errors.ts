/**
 * Translates database failures into Indonesian sentences for the UI.
 *
 * The raw text is deliberately never forwarded. Postgres messages from this
 * feature's functions happen to be Indonesian already, but they still name
 * internal concepts ("attempt", "expires_at") and a driver-level failure would
 * surface SQLSTATE noise. Callers log the code and show the sentence.
 */
type DatabaseErrorLike = {
  code?: string | null;
  message?: string | null;
};

const MESSAGE_BY_CODE: Record<string, string> = {
  // The function or table does not exist: the assessment migration has not
  // been applied to whichever project the environment points at.
  PGRST202:
    "Fungsi tes belum ada di database ini. Jalankan migrasi assessment terlebih dahulu.",
  "42883":
    "Fungsi tes belum ada di database ini. Jalankan migrasi assessment terlebih dahulu.",
  "42P01":
    "Tabel tes belum ada di database ini. Jalankan migrasi assessment terlebih dahulu.",
  // Raised by the freeze triggers on assessment_questions / assessment_options.
  // The app disables the edit controls first, so reaching this means the page
  // was stale — an attempt appeared after it was rendered.
  "23001":
    "Soal terkunci karena sudah ada peserta yang mengerjakan tes. Muat ulang halaman untuk melihat kondisi terbaru.",
  // Deferrable unique on (event_id, order_index) / (question_id, order_index):
  // two administrators added a row at the same instant.
  "23505":
    "Urutan bentrok dengan perubahan lain yang barusan tersimpan. Muat ulang halaman, lalu coba lagi.",
};

const FALLBACK_MESSAGE = "Data tes gagal dibaca dari database.";

export function translateAssessmentError(
  error: DatabaseErrorLike | null | undefined,
): string {
  const code = typeof error?.code === "string" ? error.code : "";
  return MESSAGE_BY_CODE[code] ?? FALLBACK_MESSAGE;
}

/**
 * Server-side log for a failure that was shown to the user as a translated
 * sentence. Records the code only — never the payload, never the raw message.
 */
export function logAssessmentFailure(
  stage: string,
  error: DatabaseErrorLike | null | undefined,
): void {
  console.error("[assessment] database read failed.", {
    stage,
    code: typeof error?.code === "string" ? error.code : "UNKNOWN",
  });
}
