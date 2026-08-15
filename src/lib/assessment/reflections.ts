import "server-only";

import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";
import { PARTICIPANT_STATUS_EXCLUSION } from "./participants";
import { TESTIMONIAL_CONSENTS, type TestimonialConsent } from "./reflection-consent";

/** Cermin `assessment_reflections_length_check` di migrasi. */
export const reflectionTextSchema = z
  .string()
  .trim()
  .min(1, "Jawaban ini belum diisi.")
  .max(4000, "Jawaban maksimal 4000 karakter.");

export const testimonialSchema = z
  .string()
  .trim()
  .max(1000, "Testimoni maksimal 1000 karakter.");

export type ReflectionInput = {
  aiUsageChange: string;
  umkmLesson: string;
  nextTimeDifferently: string;
  testimonial: string;
  testimonialConsent: TestimonialConsent | null;
};

export type ReflectionWriteResult =
  | { ok: true; replaced: boolean }
  | { ok: false; message: string };

const existingRowSchema = z.object({
  registration_id: z.string().uuid(),
  updated_at: z.string(),
});

/**
 * Menyimpan atau mengganti refleksi satu peserta.
 *
 * `registration_id` unik, jadi mengisi ulang menimpa baris yang sama alih-alih
 * menambah baris baru — peserta yang ingin memperbaiki jawabannya tidak
 * menghasilkan dua versi yang harus dipilih panitia saat menyusun laporan.
 */
export async function saveReflection(
  registrationId: string,
  input: ReflectionInput,
): Promise<ReflectionWriteResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  // Peserta yang tidak lolos filter status tidak boleh menitipkan refleksi,
  // dengan alasan yang sama seperti dropdown nama: mereka memang tidak hadir.
  const owner = await target.supabase
    .from("registrations")
    .select("id")
    .eq("id", registrationId)
    .eq("event_id", target.eventId)
    .not("status", "in", PARTICIPANT_STATUS_EXCLUSION)
    .maybeSingle();

  if (owner.error) {
    logAssessmentFailure("reflection_owner", owner.error);
    return { ok: false, message: translateAssessmentError(owner.error) };
  }

  if (owner.data === null) {
    return { ok: false, message: "Nama kamu tidak ditemukan. Pilih ulang dari daftar." };
  }

  const existing = await getReflectionSummary(registrationId);

  const { error } = await target.supabase.from("assessment_reflections").upsert(
    {
      event_id: target.eventId,
      registration_id: registrationId,
      ai_usage_change: input.aiUsageChange,
      umkm_lesson: input.umkmLesson,
      next_time_differently: input.nextTimeDifferently,
      testimonial: input.testimonial === "" ? null : input.testimonial,
      testimonial_consent: input.testimonialConsent,
    },
    { onConflict: "registration_id" },
  );

  if (error) {
    logAssessmentFailure("save_reflection", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  return { ok: true, replaced: existing !== null };
}

/**
 * Hanya menjawab "sudah pernah mengisi atau belum", tanpa isinya.
 *
 * Sengaja tidak mengembalikan teks jawaban: siapa pun bisa memilih nama siapa
 * pun di layar ini, dan spec §4.9 hanya menerima nilai sebagai semi-publik di
 * dalam ruangan — bukan tulisan reflektif seseorang.
 */
export async function getReflectionSummary(
  registrationId: string,
): Promise<{ updatedAt: string } | null> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return null;
  }

  const { data, error } = await target.supabase
    .from("assessment_reflections")
    .select("registration_id, updated_at")
    .eq("registration_id", registrationId)
    .eq("event_id", target.eventId)
    .maybeSingle();

  if (error) {
    logAssessmentFailure("reflection_summary", error);
    return null;
  }

  const parsed = existingRowSchema.safeParse(data);

  return parsed.success ? { updatedAt: parsed.data.updated_at } : null;
}

const adminRowSchema = z.object({
  registration_id: z.string().uuid(),
  ai_usage_change: z.string().nullable(),
  umkm_lesson: z.string().nullable(),
  next_time_differently: z.string().nullable(),
  testimonial: z.string().nullable(),
  testimonial_consent: z.enum(TESTIMONIAL_CONSENTS).nullable(),
  updated_at: z.string(),
});

export type AdminReflection = {
  registrationId: string;
  fullName: string;
  aiUsageChange: string | null;
  umkmLesson: string | null;
  nextTimeDifferently: string | null;
  testimonial: string | null;
  testimonialConsent: TestimonialConsent | null;
  updatedAt: string;
};

export type ReflectionListResult =
  | { ok: true; reflections: AdminReflection[]; participantCount: number }
  | { ok: false; message: string };

export async function listReflections(): Promise<ReflectionListResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const [reflectionsResult, participantsResult] = await Promise.all([
    target.supabase
      .from("assessment_reflections")
      .select(
        "registration_id, ai_usage_change, umkm_lesson, next_time_differently, testimonial, testimonial_consent, updated_at",
      )
      .eq("event_id", target.eventId)
      .order("updated_at", { ascending: false }),
    target.supabase
      .from("registrations")
      .select("id, full_name")
      .eq("event_id", target.eventId)
      .not("status", "in", PARTICIPANT_STATUS_EXCLUSION),
  ]);

  if (reflectionsResult.error) {
    logAssessmentFailure("list_reflections", reflectionsResult.error);
    return {
      ok: false,
      message: translateAssessmentError(reflectionsResult.error),
    };
  }

  if (participantsResult.error) {
    logAssessmentFailure("list_reflections_names", participantsResult.error);
    return {
      ok: false,
      message: translateAssessmentError(participantsResult.error),
    };
  }

  const rows = z
    .array(adminRowSchema)
    .safeParse(reflectionsResult.data ?? []);
  const participants = z
    .array(z.object({ id: z.string().uuid(), full_name: z.string() }))
    .safeParse(participantsResult.data ?? []);

  if (!rows.success || !participants.success) {
    logAssessmentFailure("list_reflections_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  const nameById = new Map(
    participants.data.map((row) => [row.id, row.full_name]),
  );

  return {
    ok: true,
    participantCount: participants.data.length,
    // Refleksi dari peserta yang sudah tidak lolos filter status tidak
    // ditampilkan, sama seperti di tabel nilai.
    reflections: rows.data
      .filter((row) => nameById.has(row.registration_id))
      .map((row) => ({
        registrationId: row.registration_id,
        fullName: nameById.get(row.registration_id) ?? "",
        aiUsageChange: row.ai_usage_change,
        umkmLesson: row.umkm_lesson,
        nextTimeDifferently: row.next_time_differently,
        testimonial: row.testimonial,
        testimonialConsent: row.testimonial_consent,
        updatedAt: row.updated_at,
      })),
  };
}
