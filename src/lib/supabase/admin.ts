import "server-only";

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { z } from "zod";

const adminEnvironmentSchema = z.object({
  url: z
    .string()
    .url()
    .refine((value) => {
      try {
        const protocol = new URL(value).protocol;
        return protocol === "http:" || protocol === "https:";
      } catch {
        return false;
      }
    }),
  serviceRoleKey: z.string().min(20),
});

const SUPABASE_REQUEST_TIMEOUT_MS = 10_000;

let adminClient: SupabaseClient | undefined;

const fetchWithTimeout: typeof fetch = (input, init) => {
  const timeoutSignal = AbortSignal.timeout(SUPABASE_REQUEST_TIMEOUT_MS);
  const signal = init?.signal
    ? AbortSignal.any([init.signal, timeoutSignal])
    : timeoutSignal;

  return fetch(input, { ...init, signal });
};

function readAdminEnvironment() {
  return adminEnvironmentSchema.safeParse({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  });
}

export function isSupabaseAdminConfigured(): boolean {
  return readAdminEnvironment().success;
}

/**
 * Returns null instead of throwing when deployment credentials are absent or
 * malformed. This keeps public, static pages operational without Supabase.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (adminClient) {
    return adminClient;
  }

  const environment = readAdminEnvironment();

  if (!environment.success) {
    return null;
  }

  adminClient = createClient(
    environment.data.url,
    environment.data.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
      global: {
        fetch: fetchWithTimeout,
      },
    },
  );

  return adminClient;
}
