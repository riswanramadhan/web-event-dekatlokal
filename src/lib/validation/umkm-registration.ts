import { z } from "zod";

import {
  getFormDataString,
  getFormDataStrings,
  hasUnsafeText,
  normalizeBoolean,
  normalizeEmail,
  normalizeMultiline,
  normalizeOptionalSingleLine,
  normalizeSingleLine,
  normalizeStringArray,
  normalizeWhatsapp,
} from "@/lib/registration/normalizers";

export const UMKM_BUSINESS_CATEGORY_VALUES = [
  "food_beverage",
  "fashion",
  "craft",
  "beauty",
  "retail",
  "agriculture",
  "services",
  "other",
] as const;

export const UMKM_BUSINESS_CATEGORY_OPTIONS = [
  { value: "food_beverage", label: "Makanan dan minuman" },
  { value: "fashion", label: "Fashion" },
  { value: "craft", label: "Kriya dan kerajinan" },
  { value: "beauty", label: "Kecantikan dan perawatan" },
  { value: "retail", label: "Perdagangan/retail" },
  { value: "agriculture", label: "Pertanian dan hasil bumi" },
  { value: "services", label: "Jasa" },
  { value: "other", label: "Kategori lainnya" },
] as const;

export const UMKM_YEARS_IN_BUSINESS_VALUES = [
  "less_than_1",
  "1_to_3",
  "4_to_6",
  "more_than_6",
] as const;

export const UMKM_YEARS_IN_BUSINESS_OPTIONS = [
  { value: "less_than_1", label: "Kurang dari 1 tahun" },
  { value: "1_to_3", label: "1 sampai 3 tahun" },
  { value: "4_to_6", label: "4 sampai 6 tahun" },
  { value: "more_than_6", label: "Lebih dari 6 tahun" },
] as const;

export const UMKM_DEVICE_VALUES = [
  "smartphone",
  "laptop",
  "tablet",
  "desktop",
] as const;

export const UMKM_DEVICE_OPTIONS = [
  { value: "smartphone", label: "Smartphone" },
  { value: "laptop", label: "Laptop" },
  { value: "tablet", label: "Tablet" },
  { value: "desktop", label: "Komputer desktop" },
] as const;

export const UMKM_AI_USAGE_VALUES = [
  "never",
  "tried",
  "sometimes",
  "routine",
] as const;

export const UMKM_AI_USAGE_OPTIONS = [
  { value: "never", label: "Belum pernah menggunakan AI" },
  { value: "tried", label: "Pernah mencoba satu atau dua kali" },
  { value: "sometimes", label: "Sesekali menggunakan AI" },
  { value: "routine", label: "Sudah rutin menggunakan AI" },
] as const;

export const UMKM_AVAILABLE_ASSET_VALUES = [
  "business_description",
  "product_photos",
  "product_catalog",
  "price_list",
  "faq",
  "anonymized_feedback",
  "none",
] as const;

export const UMKM_AVAILABLE_ASSET_OPTIONS = [
  { value: "business_description", label: "Deskripsi usaha" },
  { value: "product_photos", label: "Foto produk" },
  { value: "product_catalog", label: "Katalog produk" },
  { value: "price_list", label: "Daftar harga" },
  { value: "faq", label: "Daftar pertanyaan pelanggan" },
  {
    value: "anonymized_feedback",
    label: "Umpan balik pelanggan yang sudah dianonimkan",
  },
  { value: "none", label: "Belum ada aset yang siap" },
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

const optionalEmail = z.preprocess(
  normalizeEmail,
  z
    .string()
    .email("Masukkan alamat email yang valid.")
    .max(254, "Email maksimal 254 karakter.")
    .optional(),
);

const optionalHttpUrl = z.preprocess(
  normalizeOptionalSingleLine,
  z
    .string()
    .max(300, "URL kanal digital maksimal 300 karakter.")
    .url("Masukkan URL lengkap, misalnya https://instagram.com/namausaha.")
    .refine((value) => {
      try {
        const protocol = new URL(value).protocol;
        return protocol === "http:" || protocol === "https:";
      } catch {
        return false;
      }
    }, "URL kanal digital harus menggunakan http atau https.")
    .optional(),
);

export const umkmRegistrationSchema = z
  .object({
    ownerName: safeSingleLine("Nama pemilik", 2, 120),
    businessName: safeSingleLine("Nama usaha", 2, 120),
    email: optionalEmail,
    whatsapp: z.preprocess(
      normalizeWhatsapp,
      z
        .string({ error: "Nomor WhatsApp wajib diisi." })
        .regex(
          /^\+[1-9]\d{7,14}$/,
          "Masukkan nomor WhatsApp aktif yang valid.",
        ),
    ),
    businessCategory: z.preprocess(
      normalizeSingleLine,
      z.enum(UMKM_BUSINESS_CATEGORY_VALUES, {
        error: "Pilih kategori usaha.",
      }),
    ),
    businessLocation: safeSingleLine("Lokasi usaha", 3, 160),
    socialMediaUrl: optionalHttpUrl,
    yearsInBusiness: z.preprocess(
      normalizeSingleLine,
      z.enum(UMKM_YEARS_IN_BUSINESS_VALUES, {
        error: "Pilih lama usaha berjalan.",
      }),
    ),
    availableDevices: z.preprocess(
      normalizeStringArray,
      z
        .array(
          z.enum(UMKM_DEVICE_VALUES, {
            error: "Terdapat pilihan perangkat yang tidak valid.",
          }),
        )
        .min(1, "Pilih minimal satu perangkat.")
        .max(4, "Pilih maksimal empat perangkat."),
    ),
    aiUsage: z.preprocess(
      normalizeSingleLine,
      z.enum(UMKM_AI_USAGE_VALUES, {
        error: "Pilih pengalaman penggunaan AI.",
      }),
    ),
    repetitiveProblem: safeMultiline("Masalah yang berulang", 20, 1_500),
    desiredHelp: safeMultiline("Bantuan yang diharapkan", 20, 1_500),
    availableAssets: z.preprocess(
      normalizeStringArray,
      z
        .array(
          z.enum(UMKM_AVAILABLE_ASSET_VALUES, {
            error: "Terdapat pilihan aset yang tidak valid.",
          }),
        )
        .min(1, "Pilih minimal satu kondisi aset.")
        .max(6, "Pilih maksimal enam aset.")
        .refine(
          (assets) => !(assets.includes("none") && assets.length > 1),
          "Pilihan belum ada aset tidak dapat digabungkan dengan aset lain.",
        ),
    ),
    attendanceCommitment: requiredBoolean(
      "Konfirmasi kesediaan untuk hadir penuh.",
    ),
    consentPrivacy: requiredBoolean(
      "Persetujuan pemrosesan data wajib diberikan.",
    ),
    consentDocumentation: optionalBoolean,
    consentMonitoring: requiredBoolean(
      "Persetujuan untuk monitoring program wajib diberikan.",
    ),
    company: z.preprocess(
      (value) => normalizeSingleLine(value) || "",
      z.literal("", { error: "Permintaan tidak dapat diproses." }),
    ),
  })
  .strict();

export type UmkmRegistrationInput = z.input<typeof umkmRegistrationSchema>;

export type UmkmRegistrationData = z.output<typeof umkmRegistrationSchema>;

/**
 * Reads raw field values out of a FormData the same way for both the Server
 * Action and the client-side pre-submit check, so the two can never disagree
 * about what a given form actually contains.
 */
export function buildUmkmRegistrationCandidate(
  formData: FormData,
): Record<string, unknown> {
  return {
    ownerName: getFormDataString(formData, "ownerName"),
    businessName: getFormDataString(formData, "businessName"),
    email: getFormDataString(formData, "email"),
    whatsapp: getFormDataString(formData, "whatsapp"),
    businessCategory: getFormDataString(formData, "businessCategory"),
    businessLocation: getFormDataString(formData, "businessLocation"),
    socialMediaUrl: getFormDataString(formData, "socialMediaUrl"),
    yearsInBusiness: getFormDataString(formData, "yearsInBusiness"),
    availableDevices: getFormDataStrings(formData, "availableDevices"),
    aiUsage: getFormDataString(formData, "aiUsage"),
    repetitiveProblem: getFormDataString(formData, "repetitiveProblem"),
    desiredHelp: getFormDataString(formData, "desiredHelp"),
    availableAssets: getFormDataStrings(formData, "availableAssets"),
    attendanceCommitment: getFormDataString(formData, "attendanceCommitment"),
    consentPrivacy: getFormDataString(formData, "consentPrivacy"),
    consentDocumentation: getFormDataString(
      formData,
      "consentDocumentation",
    ),
    consentMonitoring: getFormDataString(formData, "consentMonitoring"),
    company: getFormDataString(formData, "company"),
  };
}
