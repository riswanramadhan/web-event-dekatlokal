import { z } from "zod";

import {
  hasUnsafeText,
  normalizeBoolean,
  normalizeEmail,
  normalizeInteger,
  normalizeMultiline,
  normalizeSingleLine,
  normalizeStringArray,
  normalizeWhatsapp,
} from "@/lib/registration/normalizers";

export const STUDENT_AI_EXPERIENCE_VALUES = [
  "never",
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const STUDENT_AI_EXPERIENCE_OPTIONS = [
  { value: "never", label: "Belum pernah menggunakan AI" },
  { value: "beginner", label: "Pemula — baru mencoba beberapa kali" },
  { value: "intermediate", label: "Menengah — cukup rutin menggunakan AI" },
  { value: "advanced", label: "Mahir — pernah membuat workflow berbantuan AI" },
] as const;

export const STUDENT_SKILL_VALUES = [
  "communication",
  "facilitation",
  "research",
  "content_creation",
  "visual_design",
  "data_analysis",
  "prompt_engineering",
  "automation",
  "documentation",
  "other",
] as const;

export const STUDENT_SKILL_OPTIONS = [
  { value: "communication", label: "Komunikasi" },
  { value: "facilitation", label: "Fasilitasi" },
  { value: "research", label: "Riset pengguna" },
  { value: "content_creation", label: "Pembuatan konten" },
  { value: "visual_design", label: "Desain visual" },
  { value: "data_analysis", label: "Analisis data" },
  { value: "prompt_engineering", label: "Prompt engineering" },
  { value: "automation", label: "Otomasi/no-code" },
  { value: "documentation", label: "Dokumentasi" },
  { value: "other", label: "Kemampuan lainnya" },
] as const;

export const STUDENT_PREFERRED_ROLE_VALUES = [
  "problem_facilitator",
  "ai_workflow_builder",
  "quality_ethics_reviewer",
  "documentation_trainer",
] as const;

export const STUDENT_PREFERRED_ROLE_OPTIONS = [
  { value: "problem_facilitator", label: "Problem Facilitator" },
  { value: "ai_workflow_builder", label: "AI Workflow Builder" },
  { value: "quality_ethics_reviewer", label: "Quality & Ethics Reviewer" },
  { value: "documentation_trainer", label: "Documentation & Trainer" },
] as const;

const safeSingleLine = (
  label: string,
  minimum: number,
  maximum: number,
) =>
  z.preprocess(
    normalizeSingleLine,
    z
      .string({ error: `${label} wajib diisi.` })
      .min(minimum, `${label} terlalu pendek.`)
      .max(maximum, `${label} maksimal ${maximum} karakter.`)
      .refine((value) => !hasUnsafeText(value), `${label} tidak valid.`),
  );

const safeMultiline = (label: string, minimum: number, maximum: number) =>
  z.preprocess(
    normalizeMultiline,
    z
      .string({ error: `${label} wajib diisi.` })
      .min(minimum, `${label} perlu dijelaskan sedikit lebih lengkap.`)
      .max(maximum, `${label} maksimal ${maximum} karakter.`)
      .refine((value) => !hasUnsafeText(value), `${label} tidak valid.`),
  );

const requiredBoolean = (message: string) =>
  z.preprocess(normalizeBoolean, z.literal(true, { error: message }));

const optionalBoolean = z.preprocess(normalizeBoolean, z.boolean());

export const studentRegistrationSchema = z
  .object({
    fullName: safeSingleLine("Nama lengkap", 2, 120),
    email: z.preprocess(
      normalizeEmail,
      z
        .string({ error: "Email wajib diisi." })
        .email("Masukkan alamat email yang valid.")
        .max(254, "Email maksimal 254 karakter."),
    ),
    whatsapp: z.preprocess(
      normalizeWhatsapp,
      z
        .string({ error: "Nomor WhatsApp wajib diisi." })
        .regex(
          /^\+[1-9]\d{7,14}$/,
          "Masukkan nomor WhatsApp aktif yang valid.",
        ),
    ),
    university: safeSingleLine("Universitas", 2, 120),
    studyProgram: safeSingleLine("Program studi", 2, 100),
    semester: z.preprocess(
      normalizeInteger,
      z
        .number({ error: "Semester wajib diisi." })
        .int("Semester harus berupa angka.")
        .min(1, "Semester minimal 1.")
        .max(14, "Semester maksimal 14."),
    ),
    city: safeSingleLine("Kota domisili", 2, 100),
    aiExperience: z.preprocess(
      normalizeSingleLine,
      z.enum(STUDENT_AI_EXPERIENCE_VALUES, {
        error: "Pilih tingkat pengalaman AI.",
      }),
    ),
    skills: z.preprocess(
      normalizeStringArray,
      z
        .array(
          z.enum(STUDENT_SKILL_VALUES, {
            error: "Terdapat pilihan kemampuan yang tidak valid.",
          }),
        )
        .min(1, "Pilih minimal satu kemampuan.")
        .max(6, "Pilih maksimal enam kemampuan."),
    ),
    preferredRoles: z.preprocess(
      normalizeStringArray,
      z
        .array(
          z.enum(STUDENT_PREFERRED_ROLE_VALUES, {
            error: "Terdapat pilihan peran yang tidak valid.",
          }),
        )
        .min(1, "Pilih minimal satu peran.")
        .max(4, "Pilih maksimal empat peran."),
    ),
    hasLaptop: optionalBoolean,
    projectExperience: safeMultiline("Pengalaman project", 2, 1_200),
    motivation: safeMultiline("Motivasi", 20, 1_500),
    attendanceCommitment: requiredBoolean(
      "Konfirmasi komitmen untuk hadir penuh.",
    ),
    consentPrivacy: requiredBoolean(
      "Persetujuan pemrosesan data wajib diberikan.",
    ),
    consentDocumentation: optionalBoolean,
    company: z.preprocess(
      (value) => normalizeSingleLine(value) || "",
      z.literal("", { error: "Permintaan tidak dapat diproses." }),
    ),
  })
  .strict();

export type StudentRegistrationInput = z.input<
  typeof studentRegistrationSchema
>;

export type StudentRegistrationData = z.output<
  typeof studentRegistrationSchema
>;
