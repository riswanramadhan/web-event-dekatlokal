"use server";

import { z } from "zod";

import { listParticipants } from "@/lib/assessment/participants";
import { TESTIMONIAL_CONSENTS } from "@/lib/assessment/reflection-consent";
import {
  getReflectionSummary,
  reflectionTextSchema,
  saveReflection,
  testimonialSchema,
} from "@/lib/assessment/reflections";
import type { RegistrationActionState } from "@/lib/registration/result";

const idSchema = z.string().uuid();

export type ReflectionCheck = { alreadyFilled: boolean; updatedAt: string | null };

/**
 * Mengabarkan apakah peserta ini sudah pernah mengisi, tanpa mengembalikan
 * isinya. Layar ini tidak punya autentikasi, jadi memuat ulang tulisan orang
 * lain hanya karena namanya dipilih bukan sesuatu yang boleh terjadi.
 */
export async function checkReflectionAction(
  registrationId: string,
): Promise<ReflectionCheck> {
  const parsed = idSchema.safeParse(registrationId);

  if (!parsed.success) {
    return { alreadyFilled: false, updatedAt: null };
  }

  const summary = await getReflectionSummary(parsed.data);

  return {
    alreadyFilled: summary !== null,
    updatedAt: summary?.updatedAt ?? null,
  };
}

export async function refreshParticipantsAction() {
  const result = await listParticipants();
  return result.ok ? result.participants : null;
}

export async function submitReflectionAction(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  const registrationId = idSchema.safeParse(formData.get("registrationId"));

  if (!registrationId.success) {
    return {
      status: "validation_error",
      message: "Pilih namamu dulu dari daftar.",
    };
  }

  const fields = z
    .object({
      aiUsageChange: reflectionTextSchema,
      umkmLesson: reflectionTextSchema,
      nextTimeDifferently: reflectionTextSchema,
      testimonial: testimonialSchema,
    })
    .safeParse({
      aiUsageChange: formData.get("aiUsageChange") ?? "",
      umkmLesson: formData.get("umkmLesson") ?? "",
      nextTimeDifferently: formData.get("nextTimeDifferently") ?? "",
      testimonial: formData.get("testimonial") ?? "",
    });

  if (!fields.success) {
    return {
      status: "validation_error",
      message:
        fields.error.issues[0]?.message ?? "Ada jawaban yang belum lengkap.",
    };
  }

  const rawConsent = formData.get("testimonialConsent");
  const consent = z
    .enum(TESTIMONIAL_CONSENTS)
    .safeParse(rawConsent === "" ? undefined : rawConsent);

  // Izin hanya wajib kalau testimoninya memang diisi. Menuntut izin untuk
  // teks yang tidak ada hanya menambah rintangan tanpa melindungi apa pun.
  if (fields.data.testimonial !== "" && !consent.success) {
    return {
      status: "validation_error",
      message:
        "Pilih dulu apakah testimoni kamu boleh dipakai di laporan atau publikasi.",
    };
  }

  const result = await saveReflection(registrationId.data, {
    ...fields.data,
    testimonialConsent: consent.success ? consent.data : null,
  });

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  return {
    status: "success",
    message: result.replaced
      ? "Jawaban kamu diperbarui. Terima kasih!"
      : "Jawaban kamu tersimpan. Terima kasih!",
  };
}
