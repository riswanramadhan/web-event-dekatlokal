import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const publicEnvironmentSchema = z.object({
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
  publishableKey: z.string().min(20),
});

function readPublicEnvironment() {
  return publicEnvironmentSchema.safeParse({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim(),
  });
}

/**
 * True when the browser-facing Supabase credentials needed for Auth are set.
 * Mirrors isSupabaseAdminConfigured() so pages can degrade gracefully instead
 * of throwing when the environment is incomplete.
 */
export function isSupabaseAuthConfigured(): boolean {
  return readPublicEnvironment().success;
}

/**
 * Cookie-bound Supabase client for Server Components and Server Actions.
 * Uses the publishable/anon key: auth flows must never run through the
 * service_role key, which bypasses every policy.
 */
export async function createSupabaseServerClient() {
  const environment = readPublicEnvironment();

  if (!environment.success) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    environment.data.url,
    environment.data.publishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Components cannot mutate cookies. Token refresh is
            // handled by the proxy, so ignoring this is safe.
          }
        },
      },
    },
  );
}

/**
 * Returns the verified signed-in user, or null.
 *
 * Deliberately uses getUser() rather than getSession(): getSession() trusts
 * whatever is in the cookie without contacting the auth server, so it must
 * never be used for authorization decisions.
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error ? null : user;
}

export type AdminIdentity = {
  userId: string;
  email: string;
};

/**
 * Authorization check. Authentication alone grants nothing: the user must also
 * be listed in public.admin_users, which is readable only via service_role.
 */
export async function isAdminUser(userId: string): Promise<boolean> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return false;
  }

  return Boolean(data);
}

/**
 * Combined authentication + authorization lookup. Returns null when the caller
 * is signed out, or signed in but not an administrator.
 */
export async function getCurrentAdmin(): Promise<AdminIdentity | null> {
  const user = await getAuthenticatedUser();

  if (!user?.email) {
    return null;
  }

  if (!(await isAdminUser(user.id))) {
    return null;
  }

  return { userId: user.id, email: user.email };
}

/**
 * Guard for admin pages and server actions. Redirects instead of returning so
 * callers cannot accidentally continue with an unauthorized identity.
 */
export async function requireAdmin(): Promise<AdminIdentity> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}

export type AdminAuditAction = "login" | "create_admin" | "delete_admin";

/**
 * Best-effort audit logging: a failure here must never block the action the
 * administrator was performing.
 */
export async function recordAuditEvent(
  action: AdminAuditAction,
  actorEmail: string | null,
  targetEmail?: string | null,
): Promise<void> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return;
  }

  try {
    await supabase.from("admin_audit_log").insert({
      action,
      actor_email: actorEmail,
      target_email: targetEmail ?? null,
    });
  } catch {
    // Intentionally ignored.
  }
}
