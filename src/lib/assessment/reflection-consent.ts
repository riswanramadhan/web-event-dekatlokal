/**
 * Izin pemakaian testimoni.
 *
 * Data murni tanpa akses database, jadi form peserta dan panel admin memakai
 * daftar yang sama — label yang dibaca peserta saat memberi izin tidak boleh
 * berbeda dari label yang dibaca panitia saat memutuskan boleh dipakai atau
 * tidak.
 */

export const TESTIMONIAL_CONSENTS = ["named", "anonymous", "no"] as const;

export type TestimonialConsent = (typeof TESTIMONIAL_CONSENTS)[number];

/** Kalimat yang dipilih peserta. */
export const CONSENT_CHOICE_LABELS = {
  named: "Ya, boleh menggunakan nama saya.",
  anonymous: "Ya, tetapi anonim.",
  no: "Tidak.",
} as const satisfies Record<TestimonialConsent, string>;

/** Label ringkas untuk panel admin. */
export const CONSENT_BADGE_LABELS = {
  named: "Boleh dengan nama",
  anonymous: "Boleh, anonim",
  no: "Tidak boleh dipakai",
} as const satisfies Record<TestimonialConsent, string>;

export const CONSENT_BADGE_STYLES = {
  named: "border-emerald-200 bg-emerald-50 text-emerald-700",
  anonymous: "border-brand-200 bg-brand-50 text-brand",
  no: "border-red-200 bg-red-50 text-red-700",
} as const satisfies Record<TestimonialConsent, string>;

/** Pertanyaan 22–25, di luar tes berbatas waktu. */
export const REFLECTION_QUESTIONS = [
  {
    field: "aiUsageChange",
    label:
      "Sebelum mengikuti AI Co-Creation Lab, bagaimana kamu biasanya menggunakan AI? Apa yang berubah setelah mengikuti kegiatan ini?",
  },
  {
    field: "umkmLesson",
    label:
      "Apa hal paling penting yang kamu pelajari ketika bekerja langsung dengan UMKM sebagai real user?",
  },
  {
    field: "nextTimeDifferently",
    label:
      "Setelah mengikuti kegiatan ini, hal apa yang ingin kamu lakukan secara berbeda ketika membangun solusi digital berikutnya?",
  },
] as const;

export type ReflectionField = (typeof REFLECTION_QUESTIONS)[number]["field"];
