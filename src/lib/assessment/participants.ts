import "server-only";

import { z } from "zod";

import { logAssessmentFailure, translateAssessmentError } from "./errors";
import { resolveAssessmentTarget } from "./event";

/**
 * Registration statuses hidden from every participant-facing surface: the name
 * dropdown, the scores table, and the counts derived from either.
 *
 * Spec §4.1 requires this filter to exist in exactly one place. Listing a
 * rejected applicant on a screen anyone in the room can open would leak the
 * selection result, and that person is not attending anyway. Narrowing the pool
 * later means editing this array, not hunting through queries.
 */
export const HIDDEN_PARTICIPANT_STATUSES = ["rejected", "withdrawn"] as const;

/**
 * Pre-formatted for PostgREST's `in` operator:
 * `query.not("status", "in", PARTICIPANT_STATUS_EXCLUSION)`.
 */
export const PARTICIPANT_STATUS_EXCLUSION = `(${HIDDEN_PARTICIPANT_STATUSES.join(
  ",",
)})`;

const participantRowSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  institution_name: z.string().nullable(),
  business_name: z.string().nullable(),
});

/**
 * Everything the participant screens are allowed to know about a person.
 *
 * Spec §4.9: the payload carries an id, a name, and one distinguishing label —
 * never the whole registration row. `email`, `whatsapp` and `metadata` are not
 * selected at all, so they cannot leak by accident later.
 */
export type Participant = {
  id: string;
  fullName: string;
  /** Institution or business name; null when the person has neither. */
  label: string | null;
};

export type ParticipantsResult =
  | { ok: true; participants: Participant[] }
  | { ok: false; message: string };

export async function listParticipants(): Promise<ParticipantsResult> {
  const target = await resolveAssessmentTarget();

  if (!target.ok) {
    return target;
  }

  const { data, error } = await target.supabase
    .from("registrations")
    .select("id, full_name, institution_name, business_name")
    .eq("event_id", target.eventId)
    .not("status", "in", PARTICIPANT_STATUS_EXCLUSION)
    .order("full_name", { ascending: true });

  if (error) {
    logAssessmentFailure("list_participants", error);
    return { ok: false, message: translateAssessmentError(error) };
  }

  const parsed = z.array(participantRowSchema).safeParse(data ?? []);

  if (!parsed.success) {
    logAssessmentFailure("list_participants_shape", { code: "INVALID_SHAPE" });
    return { ok: false, message: translateAssessmentError(null) };
  }

  return {
    ok: true,
    participants: parsed.data.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      // For registration_type 'general' both can be empty. That leaves the row
      // without a distinguishing line, which spec §4.1 accepts rather than
      // padding it with a dash.
      label: row.institution_name ?? row.business_name ?? null,
    })),
  };
}
