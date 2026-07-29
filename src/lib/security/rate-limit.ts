import "server-only";

import { createHash } from "node:crypto";

import { headers } from "next/headers";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Shared rate limiter backed by Postgres.
 *
 * An in-process Map cannot work on Vercel: every serverless instance would
 * keep its own counter and a cold start would reset it, so an attacker only
 * needs to spread requests across instances. The counter therefore lives in
 * the database, incremented atomically by public.consume_rate_limit().
 */
export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const ALLOWED: RateLimitResult = { allowed: true, retryAfterSeconds: 0 };

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return ALLOWED;
  }

  try {
    const { data, error } = await supabase
      .rpc("consume_rate_limit", {
        p_key: key,
        p_limit: limit,
        p_window_seconds: windowSeconds,
      })
      .single<{ allowed: boolean; retry_after_seconds: number }>();

    if (error || !data) {
      // Fail open: a limiter outage must not lock legitimate users out of
      // registration. The honeypot, validation and auth checks still apply.
      return ALLOWED;
    }

    return {
      allowed: data.allowed,
      retryAfterSeconds: data.retry_after_seconds ?? 0,
    };
  } catch {
    return ALLOWED;
  }
}

/**
 * Clears a bucket so a successful action stops consuming quota.
 */
export async function resetRateLimit(key: string): Promise<void> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return;
  }

  try {
    await supabase.from("rate_limits").delete().eq("key", key);
  } catch {
    // Non-critical: the window will expire on its own.
  }
}

/**
 * Best-effort client IP from proxy headers. On Vercel, x-forwarded-for is set
 * by the platform edge, so the left-most entry is the real client address.
 */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");

  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();

    if (first) {
      return first;
    }
  }

  return headerList.get("x-real-ip")?.trim() || "unknown";
}

export function hashIp(ip: string): string {
  // Salted so stored hashes cannot be reversed by hashing the IPv4 space.
  // The service role key is reused as the salt because it is always present
  // wherever a registration can actually be written, which avoids adding
  // another secret that could be left unset and silently weaken the hash.
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}
