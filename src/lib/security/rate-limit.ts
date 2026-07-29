import "server-only";

import { createHash } from "node:crypto";

import { headers } from "next/headers";

/**
 * In-memory fixed-window rate limiter.
 *
 * Scope and limits: state lives in the process, so it protects a single
 * server instance only. Multi-instance deployments need a shared store
 * (Redis/Upstash) to be effective. It is intentionally kept dependency-free
 * because the current deployment target is a single standalone Node server.
 */
type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5_000;

function pruneExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    // Opportunistic cleanup so an attacker cycling keys cannot grow the map
    // without bound.
    if (buckets.size >= MAX_TRACKED_KEYS) {
      pruneExpired(now);
    }

    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1_000 });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((bucket.resetAt - now) / 1_000),
      ),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Clears a bucket so a successful action does not keep consuming quota.
 */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

/**
 * Best-effort client IP from proxy headers. Only the left-most entry of
 * x-forwarded-for is meaningful, and it is spoofable unless a trusted proxy
 * overwrites it, so treat this as abuse mitigation rather than identity.
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
  const salt = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}
