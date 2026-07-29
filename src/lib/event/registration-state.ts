import "server-only";

import { unstable_cache, updateTag } from "next/cache";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const REGISTRATION_STATE_TAG = "event-registration-state";

const DEFAULT_EVENT_SLUG = "ai-co-creation-lab-makassar";

export function getEventSlug(): string {
  return process.env.REGISTRATION_EVENT_SLUG?.trim() || DEFAULT_EVENT_SLUG;
}

export type RegistrationState = {
  isOpen: boolean;
  statusLabel: string;
  /** False when Supabase is unreachable or unconfigured. */
  resolved: boolean;
};

/**
 * Fail-closed default. Showing registration as closed when the database cannot
 * be read is safer than inviting submissions that would be rejected anyway.
 */
const CLOSED: RegistrationState = {
  isOpen: false,
  statusLabel: "Pendaftaran Belum Dibuka",
  resolved: false,
};

async function fetchRegistrationState(
  slug: string,
): Promise<RegistrationState> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return CLOSED;
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .select("registration_open, status")
      .eq("slug", slug)
      .maybeSingle<{ registration_open: boolean; status: string }>();

    if (error || !data) {
      return CLOSED;
    }

    // Both columns must agree. The server action that stores registrations
    // applies the same rule, so the UI can never advertise a state the
    // backend would refuse.
    const isOpen =
      data.registration_open && data.status === "registration_open";

    return {
      isOpen,
      statusLabel: isOpen ? "Pendaftaran Dibuka" : "Pendaftaran Belum Dibuka",
      resolved: true,
    };
  } catch {
    return CLOSED;
  }
}

/**
 * Cached read used by the public pages. The cache keeps those pages fast
 * instead of querying on every visit; the admin toggle calls
 * revalidateRegistrationState() so a change is reflected immediately.
 */
export async function getRegistrationState(): Promise<RegistrationState> {
  const slug = getEventSlug();

  const cached = unstable_cache(
    () => fetchRegistrationState(slug),
    ["registration-state", slug],
    { tags: [REGISTRATION_STATE_TAG], revalidate: 300 },
  );

  return cached();
}

/**
 * Uncached read for the admin panel, which must always show the true current
 * value rather than a cached one.
 */
export async function getRegistrationStateFresh(): Promise<RegistrationState> {
  return fetchRegistrationState(getEventSlug());
}

/**
 * Must be called from a Server Action. updateTag (rather than revalidateTag)
 * gives read-your-own-writes semantics, so the admin sees the new state on the
 * very next render instead of a stale cached one.
 */
export function revalidateRegistrationState(): void {
  updateTag(REGISTRATION_STATE_TAG);
}

export type SetRegistrationResult =
  | { ok: true; isOpen: boolean }
  | { ok: false; message: string };

/**
 * Writes both columns together so they can never drift apart. Callers are
 * responsible for authorization.
 */
export async function setRegistrationOpen(
  isOpen: boolean,
): Promise<SetRegistrationResult> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { ok: false, message: "Supabase belum dikonfigurasi." };
  }

  const { data, error } = await supabase
    .from("events")
    .update({
      registration_open: isOpen,
      status: isOpen ? "registration_open" : "registration_closed",
    })
    .eq("slug", getEventSlug())
    .select("slug")
    .maybeSingle();

  if (error) {
    return { ok: false, message: `Gagal memperbarui status: ${error.message}` };
  }

  if (!data) {
    return {
      ok: false,
      message: `Event "${getEventSlug()}" tidak ditemukan di database.`,
    };
  }

  return { ok: true, isOpen };
}
