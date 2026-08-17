import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { getEventSlug } from "@/lib/event/registration-state";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

import { logAssessmentFailure, translateAssessmentError } from "./errors";

const eventRowSchema = z.object({
  id: z.string().uuid(),
});

export type ManagedEventResult =
  | { status: "ok"; eventId: string }
  | { status: "unconfigured" }
  | { status: "missing"; slug: string }
  | { status: "error" };

/**
 * Resolves the event this deployment manages, scoping every assessment query to
 * it. The three admin pages each repeat this lookup inline today; the
 * assessment feature calls it from one place instead.
 */
export async function getManagedEventId(): Promise<ManagedEventResult> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { status: "unconfigured" };
  }

  const slug = getEventSlug();

  const { data, error } = await supabase
    .from("events")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    logAssessmentFailure("event_lookup", error);
    return { status: "error" };
  }

  if (data === null) {
    return { status: "missing", slug };
  }

  const parsed = eventRowSchema.safeParse(data);

  if (!parsed.success) {
    // A row came back but its shape is not what this code assumes. That is a
    // different failure from "no such event", and conflating the two would send
    // the operator looking for a slug that is actually present.
    logAssessmentFailure("event_lookup_shape", { code: "INVALID_SHAPE" });
    return { status: "error" };
  }

  return { status: "ok", eventId: parsed.data.id };
}

export type AssessmentTarget =
  | { ok: true; supabase: SupabaseClient; eventId: string }
  | { ok: false; message: string };

/**
 * Resolves the client and event id together, collapsing the four failure modes
 * into one Indonesian sentence. Every write path in this feature starts here.
 */
export async function resolveAssessmentTarget(): Promise<AssessmentTarget> {
  const event = await getManagedEventId();

  if (event.status === "unconfigured") {
    return { ok: false, message: "Supabase belum dikonfigurasi." };
  }

  if (event.status === "missing") {
    return {
      ok: false,
      message: `Event "${event.slug}" tidak ditemukan di database.`,
    };
  }

  if (event.status === "error") {
    return { ok: false, message: translateAssessmentError(null) };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { ok: false, message: "Supabase belum dikonfigurasi." };
  }

  return { ok: true, supabase, eventId: event.eventId };
}
