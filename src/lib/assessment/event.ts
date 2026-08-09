import "server-only";

import { z } from "zod";

import { getEventSlug } from "@/lib/event/registration-state";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

import { logAssessmentFailure } from "./errors";

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
