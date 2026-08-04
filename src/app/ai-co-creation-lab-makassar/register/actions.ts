"use server";

import "server-only";

import { randomInt } from "node:crypto";

import { headers } from "next/headers";
import { z, type ZodError } from "zod";

import { getFormDataString } from "@/lib/registration/normalizers";
import {
  checkRateLimit,
  getClientIp,
  hashIp,
} from "@/lib/security/rate-limit";
import type {
  RegistrationActionState,
  RegistrationType,
} from "@/lib/registration/result";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  buildStudentRegistrationCandidate,
  studentRegistrationSchema,
  type StudentRegistrationData,
} from "@/lib/validation/student-registration";
import {
  buildUmkmRegistrationCandidate,
  umkmRegistrationSchema,
  type UmkmRegistrationData,
} from "@/lib/validation/umkm-registration";

const DEFAULT_EVENT_SLUG = "ai-co-creation-lab-makassar";
const SUBMISSION_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const SUBMISSION_CODE_LENGTH = 6;
const MAX_INSERT_ATTEMPTS = 4;
const SUBMIT_ATTEMPT_LIMIT = 5;
const SUBMIT_WINDOW_SECONDS = 10 * 60;
const USER_AGENT_MAX_LENGTH = 400;

const eventSlugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const eventRowSchema = z.object({
  id: z.string().uuid(),
  status: z.string(),
  registration_open: z.boolean(),
});

const turnstileResponseSchema = z.object({
  success: z.boolean(),
});

type DatabaseError = {
  code?: string;
  details?: string;
  message?: string;
};

type EventLookupResult =
  | { ok: true; eventId: string }
  | { ok: false; state: RegistrationActionState };

function toFieldErrors(error: ZodError): Record<string, string[]> {
  const flattened = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(flattened).filter(
      (entry): entry is [string, string[]] => Array.isArray(entry[1]),
    ),
  );
}

function validationFailure(error: ZodError): RegistrationActionState {
  const honeypotWasFilled = error.issues.some(
    (issue) => issue.path[0] === "company",
  );

  if (honeypotWasFilled) {
    return {
      status: "error",
      message:
        "Permintaan tidak dapat diproses. Muat ulang halaman lalu coba kembali.",
    };
  }

  const flattened = error.flatten();

  return {
    status: "validation_error",
    message: "Periksa kembali beberapa isian yang belum sesuai.",
    fieldErrors: toFieldErrors(error),
    formErrors: flattened.formErrors,
  };
}

function unavailableMessage(configurationMissing = false): string {
  if (configurationMissing && process.env.NODE_ENV !== "production") {
    return "Pendaftaran belum terhubung ke Supabase. Lengkapi environment server untuk menguji pengiriman.";
  }

  return "Pendaftaran sedang tidak tersedia. Silakan coba lagi nanti.";
}

function getEventSlug(): string | null {
  const configuredSlug =
    process.env.REGISTRATION_EVENT_SLUG?.trim() || DEFAULT_EVENT_SLUG;
  const parsedSlug = eventSlugSchema.safeParse(configuredSlug);

  return parsedSlug.success ? parsedSlug.data : null;
}

async function lookupOpenEvent(): Promise<EventLookupResult> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false,
      state: {
        status: "unavailable",
        message: unavailableMessage(true),
      },
    };
  }

  const eventSlug = getEventSlug();

  if (!eventSlug) {
    return {
      ok: false,
      state: {
        status: "unavailable",
        message: unavailableMessage(true),
      },
    };
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .select("id,status,registration_open")
      .eq("slug", eventSlug)
      .maybeSingle();

    if (error) {
      return {
        ok: false,
        state: {
          status: "unavailable",
          message: unavailableMessage(),
        },
      };
    }

    const event = eventRowSchema.safeParse(data);

    if (!event.success) {
      return {
        ok: false,
        state: {
          status: "unavailable",
          message: unavailableMessage(),
        },
      };
    }

    if (
      !event.data.registration_open ||
      event.data.status !== "registration_open"
    ) {
      return {
        ok: false,
        state: {
          status: "unavailable",
          message:
            "Pendaftaran untuk event ini belum dibuka atau sudah ditutup.",
        },
      };
    }

    return { ok: true, eventId: event.data.id };
  } catch {
    return {
      ok: false,
      state: {
        status: "unavailable",
        message: unavailableMessage(),
      },
    };
  }
}

function readTurnstileConfiguration():
  | { enabled: false }
  | { enabled: true; secretKey: string } {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!siteKey || !secretKey) {
    return { enabled: false };
  }

  return { enabled: true, secretKey };
}

async function validateTurnstile(
  formData: FormData,
): Promise<RegistrationActionState | null> {
  const configuration = readTurnstileConfiguration();

  if (!configuration.enabled) {
    return null;
  }

  const rawToken =
    getFormDataString(formData, "turnstileToken") ??
    getFormDataString(formData, "cf-turnstile-response");
  const token = z.string().trim().min(1).max(4_096).safeParse(rawToken);

  if (!token.success) {
    return {
      status: "validation_error",
      message: "Selesaikan verifikasi keamanan sebelum mengirim formulir.",
      formErrors: [
        "Verifikasi keamanan belum selesai. Muat ulang halaman jika diperlukan.",
      ],
    };
  }

  const body = new URLSearchParams({
    secret: configuration.secretKey,
    response: token.data,
  });

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!response.ok) {
      return {
        status: "error",
        message:
          "Verifikasi keamanan sedang bermasalah. Silakan coba kembali.",
      };
    }

    const verification = turnstileResponseSchema.safeParse(
      await response.json(),
    );

    if (!verification.success || !verification.data.success) {
      return {
        status: "validation_error",
        message:
          "Verifikasi keamanan gagal. Muat ulang halaman lalu coba kembali.",
      };
    }

    return null;
  } catch {
    return {
      status: "error",
      message: "Verifikasi keamanan sedang bermasalah. Silakan coba kembali.",
    };
  }
}

/**
 * Abuse-forensics context stored alongside each row. The IP is hashed, never
 * stored raw, so the data set stays minimal if it is ever exported.
 */
async function readRequestContext(): Promise<Record<string, unknown>> {
  try {
    const headerList = await headers();
    const userAgent = headerList.get("user-agent")?.trim();

    return {
      ip_hash: hashIp(await getClientIp()),
      user_agent: userAgent
        ? userAgent.slice(0, USER_AGENT_MAX_LENGTH)
        : null,
    };
  } catch {
    return { ip_hash: null, user_agent: null };
  }
}

async function enforceSubmissionRateLimit(
  type: RegistrationType,
): Promise<RegistrationActionState | null> {
  const rateLimit = await checkRateLimit(
    `register:${type}:${await getClientIp()}`,
    SUBMIT_ATTEMPT_LIMIT,
    SUBMIT_WINDOW_SECONDS,
  );

  if (rateLimit.allowed) {
    return null;
  }

  const retryAfterMinutes = Math.ceil(rateLimit.retryAfterSeconds / 60);

  return {
    status: "error",
    message: `Terlalu banyak percobaan pengiriman. Silakan coba lagi dalam ${retryAfterMinutes} menit.`,
  };
}

function generateSubmissionCode(type: RegistrationType): string {
  const prefix = type === "student" ? "AICL-STU" : "AICL-UMK";
  let randomPart = "";

  for (let index = 0; index < SUBMISSION_CODE_LENGTH; index += 1) {
    randomPart += SUBMISSION_ALPHABET[randomInt(SUBMISSION_ALPHABET.length)];
  }

  return `${prefix}-${randomPart}`;
}

function errorDescription(error: DatabaseError): string {
  return `${error.message ?? ""} ${error.details ?? ""}`;
}

function isConstraintError(
  error: DatabaseError,
  constraintName: string,
): boolean {
  return (
    error.code === "23505" &&
    errorDescription(error).includes(constraintName)
  );
}

function duplicateFailure(error: DatabaseError): RegistrationActionState | null {
  if (
    isConstraintError(
      error,
      "registrations_event_type_whatsapp_unique",
    )
  ) {
    return {
      status: "duplicate",
      message:
        "Data dengan nomor WhatsApp tersebut sudah pernah terdaftar untuk kategori ini.",
      fieldErrors: {
        whatsapp: [
          "Nomor WhatsApp ini sudah pernah digunakan untuk kategori yang sama.",
        ],
      },
    };
  }

  if (
    isConstraintError(error, "registrations_event_type_email_unique")
  ) {
    return {
      status: "duplicate",
      message:
        "Data dengan email tersebut sudah pernah terdaftar untuk kategori ini.",
      fieldErrors: {
        email: ["Email ini sudah pernah digunakan untuk kategori yang sama."],
      },
    };
  }

  if (error.code === "23505") {
    return {
      status: "duplicate",
      message:
        "Pendaftaran dengan email atau nomor WhatsApp tersebut sudah pernah dikirim untuk kategori ini.",
    };
  }

  return null;
}

function isSubmissionCodeCollision(error: DatabaseError): boolean {
  return isConstraintError(error, "registrations_submission_code_key");
}

async function insertRegistration(
  eventId: string,
  type: RegistrationType,
  row: Record<string, unknown>,
): Promise<RegistrationActionState> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "unavailable",
      message: unavailableMessage(true),
    };
  }

  for (let attempt = 0; attempt < MAX_INSERT_ATTEMPTS; attempt += 1) {
    const submissionCode = generateSubmissionCode(type);

    try {
      const { error } = await supabase.from("registrations").insert({
        ...row,
        event_id: eventId,
        registration_type: type,
        status: "submitted",
        submission_code: submissionCode,
      });

      if (!error) {
        return {
          status: "success",
          message:
            "Pendaftaran berhasil dikirim. Simpan kode pendaftaran Anda.",
          submissionCode,
          registrationType: type,
        };
      }

      if (isSubmissionCodeCollision(error)) {
        continue;
      }

      const duplicate = duplicateFailure(error);

      if (duplicate) {
        return duplicate;
      }

      return {
        status: "error",
        message:
          "Pendaftaran belum berhasil disimpan. Silakan coba kembali beberapa saat lagi.",
      };
    } catch {
      return {
        status: "error",
        message:
          "Koneksi pendaftaran terputus. Periksa koneksi Anda lalu coba kembali.",
      };
    }
  }

  return {
    status: "error",
    message:
      "Kode pendaftaran belum dapat dibuat. Silakan coba kembali beberapa saat lagi.",
  };
}

function studentRow(data: StudentRegistrationData): Record<string, unknown> {
  return {
    full_name: data.fullName,
    email: data.email,
    whatsapp: data.whatsapp,
    institution_name: data.university,
    business_name: null,
    metadata: {
      university: data.university,
      study_program: data.studyProgram,
      semester: data.semester,
      city: data.city,
      instagram_username: data.instagramUsername,
      ai_experience: data.aiExperience,
      skills: data.skills,
      preferred_roles: data.preferredRoles,
      has_laptop: data.hasLaptop,
      project_experience: data.projectExperience,
      motivation: data.motivation,
      attendance_commitment: data.attendanceCommitment,
      instagram_follow_confirmed: data.instagramFollowConfirmed,
      instagram_accounts_followed: ["dekatlokal", "edukasilokal"],
    },
    consent_privacy: data.consentPrivacy,
    consent_documentation: data.consentDocumentation,
    consent_monitoring: false,
  };
}

function umkmRow(data: UmkmRegistrationData): Record<string, unknown> {
  return {
    full_name: data.ownerName,
    email: data.email ?? null,
    whatsapp: data.whatsapp,
    institution_name: null,
    business_name: data.businessName,
    metadata: {
      business_category: data.businessCategory,
      business_location: data.businessLocation,
      social_media_url: data.socialMediaUrl ?? null,
      years_in_business: data.yearsInBusiness,
      available_devices: data.availableDevices,
      ai_usage: data.aiUsage,
      repetitive_problem: data.repetitiveProblem,
      desired_help: data.desiredHelp,
      available_assets: data.availableAssets,
      attendance_commitment: data.attendanceCommitment,
    },
    consent_privacy: data.consentPrivacy,
    consent_documentation: data.consentDocumentation,
    consent_monitoring: data.consentMonitoring,
  };
}

export async function submitStudentRegistration(
  _previousState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  // Validation runs before the rate limiter so that ordinary form mistakes do
  // not consume quota. A long form is easy to get wrong several times, and
  // shared NAT (campus or office) means one bucket can cover many people.
  const parsed = studentRegistrationSchema.safeParse(
    buildStudentRegistrationCandidate(formData),
  );

  if (!parsed.success) {
    return validationFailure(parsed.error);
  }

  const rateLimited = await enforceSubmissionRateLimit("student");

  if (rateLimited) {
    return rateLimited;
  }

  const turnstileFailure = await validateTurnstile(formData);

  if (turnstileFailure) {
    return turnstileFailure;
  }

  const event = await lookupOpenEvent();

  if (!event.ok) {
    return event.state;
  }

  return insertRegistration(event.eventId, "student", {
    ...studentRow(parsed.data),
    ...(await readRequestContext()),
  });
}

export async function submitUmkmRegistration(
  _previousState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  // Validation first, then quota. See the note in submitStudentRegistration.
  const parsed = umkmRegistrationSchema.safeParse(
    buildUmkmRegistrationCandidate(formData),
  );

  if (!parsed.success) {
    return validationFailure(parsed.error);
  }

  const rateLimited = await enforceSubmissionRateLimit("umkm");

  if (rateLimited) {
    return rateLimited;
  }

  const turnstileFailure = await validateTurnstile(formData);

  if (turnstileFailure) {
    return turnstileFailure;
  }

  const event = await lookupOpenEvent();

  if (!event.ok) {
    return event.state;
  }

  return insertRegistration(event.eventId, "umkm", {
    ...umkmRow(parsed.data),
    ...(await readRequestContext()),
  });
}
