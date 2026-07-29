"use server";

import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/admin/session";
import {
  checkRateLimit,
  getClientIp,
  resetRateLimit,
} from "@/lib/security/rate-limit";

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_WINDOW_SECONDS = 15 * 60;

export type LoginActionState = {
  status: "idle" | "error";
  message: string;
};

function safeCompare(a: string, b: string): boolean {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  const sessionSecretConfigured = Boolean(
    process.env.ADMIN_SESSION_SECRET?.trim(),
  );

  if (!adminPassword || !sessionSecretConfigured) {
    return {
      status: "error",
      message:
        "Admin belum dikonfigurasi. Set ADMIN_PASSWORD dan ADMIN_SESSION_SECRET di environment.",
    };
  }

  // Throttle before comparing so a brute-force attempt cannot run unbounded
  // against a single shared password.
  const rateLimitKey = `admin-login:${await getClientIp()}`;
  const rateLimit = checkRateLimit(
    rateLimitKey,
    LOGIN_ATTEMPT_LIMIT,
    LOGIN_WINDOW_SECONDS,
  );

  if (!rateLimit.allowed) {
    const retryAfterMinutes = Math.ceil(rateLimit.retryAfterSeconds / 60);

    return {
      status: "error",
      message: `Terlalu banyak percobaan login. Coba lagi dalam ${retryAfterMinutes} menit.`,
    };
  }

  // Not trimmed: a password may legitimately contain leading/trailing spaces.
  const password = String(formData.get("password") ?? "");

  if (!password) {
    return { status: "error", message: "Password wajib diisi." };
  }

  if (!safeCompare(password, adminPassword)) {
    return { status: "error", message: "Password salah." };
  }

  resetRateLimit(rateLimitKey);

  const token = await createSessionToken();

  if (!token) {
    return {
      status: "error",
      message: "Gagal membuat sesi. Periksa ADMIN_SESSION_SECRET.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  redirect("/admin");
}
