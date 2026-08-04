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

const OUTAGE_RETRY_SECONDS = 60;

export type RateLimitOptions = {
  /**
   * What to do when the limiter itself cannot be reached.
   *
   * "open" suits the public registration form, where validation, the honeypot
   * and the duplicate constraints still apply, and locking real applicants out
   * would be worse than letting a burst through.
   *
   * "closed" is required wherever the limiter is the ONLY control, notably
   * admin login, where failing open would silently remove all brute-force
   * protection (for example if the consume_rate_limit migration was never
   * applied).
   */
  onError?: "open" | "closed";
};

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
  options: RateLimitOptions = {},
): Promise<RateLimitResult> {
  const failClosed = options.onError === "closed";

  const onOutage = (reason: string): RateLimitResult => {
    // Surfaced in server logs so a silent limiter outage is noticeable.
    console.error(`[rate-limit] unavailable for "${key}": ${reason}`);

    return failClosed
      ? { allowed: false, retryAfterSeconds: OUTAGE_RETRY_SECONDS }
      : ALLOWED;
  };

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return onOutage("Supabase not configured");
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
      return onOutage(error?.message ?? "empty response");
    }

    return {
      allowed: data.allowed,
      retryAfterSeconds: data.retry_after_seconds ?? 0,
    };
  } catch (cause) {
    return onOutage(cause instanceof Error ? cause.message : "unknown error");
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
 * Name of the header to trust for the client IP, or null when the platform is
 * unknown.
 *
 * A header is only trustworthy if the infrastructure in front of the app
 * always overwrites it. `cf-connecting-ip` qualifies ONLY when Cloudflare
 * actually fronts the request: on a Vercel-only deployment nothing sets or
 * strips it, so a client could send it and choose its own rate-limit bucket.
 * It therefore has to be opted into explicitly rather than always preferred.
 */
function getTrustedIpHeader(): string | null {
  const configured = process.env.TRUSTED_IP_HEADER?.trim().toLowerCase();

  if (configured) {
    return configured;
  }

  // Set automatically on Vercel. x-vercel-forwarded-for is injected by their
  // proxy and cannot be forged by the client.
  if (process.env.VERCEL) {
    return "x-vercel-forwarded-for";
  }

  return null;
}

/**
 * Client IP used to bucket rate limits.
 *
 * Never uses the LEFT-most `x-forwarded-for` entry: proxies append to that
 * header, so the left-most value is whatever the client sent. An attacker
 * rotating it would get a fresh bucket per request and bypass the limiter
 * completely. The right-most entry is the one added by the nearest trusted
 * proxy, so client-supplied values are ignored.
 */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const trustedHeader = getTrustedIpHeader();

  if (trustedHeader) {
    const value = headerList.get(trustedHeader)?.trim();

    if (value) {
      // Platform headers may themselves be a list; the first entry is the
      // client as seen by the platform.
      return value.split(",")[0]?.trim() || "unknown";
    }
  }

  const forwardedFor = headerList.get("x-forwarded-for");

  if (forwardedFor) {
    const hops = forwardedFor
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);
    const nearest = hops.at(-1);

    if (nearest) {
      return nearest;
    }
  }

  const realIp = headerList.get("x-real-ip")?.trim();

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export function hashIp(ip: string): string {
  // Salted so stored hashes cannot be reversed by hashing the IPv4 space.
  // The service role key is reused as the salt because it is always present
  // wherever a registration can actually be written, which avoids adding
  // another secret that could be left unset and silently weaken the hash.
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}
