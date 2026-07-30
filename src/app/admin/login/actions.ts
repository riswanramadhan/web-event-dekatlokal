"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  createSupabaseServerClient,
  isAdminUser,
  recordAuditEvent,
} from "@/lib/admin/auth";
import {
  checkRateLimit,
  getClientIp,
  resetRateLimit,
} from "@/lib/security/rate-limit";

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_WINDOW_SECONDS = 15 * 60;

/**
 * One message for every failure mode (unknown email, wrong password, valid
 * account that is not an administrator). Distinct messages would let an
 * attacker enumerate which addresses have admin access.
 */
const GENERIC_FAILURE = "Email atau password salah.";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(200),
});

export type LoginActionState = {
  status: "idle" | "error";
  message: string;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      status: "error",
      message:
        "Supabase belum dikonfigurasi. Lengkapi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    };
  }

  // Throttle first so credential stuffing cannot run unbounded.
  const rateLimitKey = `admin-login:${await getClientIp()}`;
  const rateLimit = await checkRateLimit(
    rateLimitKey,
    LOGIN_ATTEMPT_LIMIT,
    LOGIN_WINDOW_SECONDS,
    // Fail closed: this limiter is the only brute-force control on login, so a
    // limiter outage must block attempts rather than silently allow unlimited
    // password guessing.
    { onError: "closed" },
  );

  if (!rateLimit.allowed) {
    const retryAfterMinutes = Math.ceil(rateLimit.retryAfterSeconds / 60);

    return {
      status: "error",
      message: `Terlalu banyak percobaan login. Coba lagi dalam ${retryAfterMinutes} menit.`,
    };
  }

  const credentials = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!credentials.success) {
    return { status: "error", message: GENERIC_FAILURE };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.data.email,
    password: credentials.data.password,
  });

  if (error || !data.user) {
    // Recorded so credential stuffing is visible in the audit trail. The
    // response to the user stays generic.
    await recordAuditEvent("login_failed", credentials.data.email);
    return { status: "error", message: GENERIC_FAILURE };
  }

  // Authenticated is not authorized. A valid Supabase account only reaches the
  // panel when it is on the admin allowlist; otherwise drop the session that
  // signInWithPassword just established.
  if (!(await isAdminUser(data.user.id))) {
    await supabase.auth.signOut();
    await recordAuditEvent("login_failed", credentials.data.email);
    return { status: "error", message: GENERIC_FAILURE };
  }

  await resetRateLimit(rateLimitKey);
  await recordAuditEvent("login", data.user.email ?? credentials.data.email);

  redirect("/admin");
}
