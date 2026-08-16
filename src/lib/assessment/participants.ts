import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
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

/**
 * Hanya pendaftar mahasiswa yang mengerjakan tes dan mengisi refleksi.
 *
 * Instrumennya memang ditulis untuk mereka: dua belas pernyataan skala berbicara
 * tentang membangun solusi *untuk* UMKM sebagai pengguna, bukan tentang menjadi
 * UMKM. Pendaftar UMKM yang ikut mengisi menghasilkan angka yang tidak berarti
 * dan mengotori penyebut setiap rata-rata di laporan.
 */
export const ELIGIBLE_REGISTRATION_TYPE = "student";

/**
 * Satu-satunya cara membaca daftar peserta yang berhak.
 *
 * Sebelumnya lima query menuliskan filter statusnya masing-masing, dan menambah
 * syarat kedua ke lima tempat dengan tangan berarti satu tempat cepat atau
 * lambat tertinggal — diam-diam, karena yang muncul cuma angka yang sedikit
 * berbeda dari halaman sebelahnya. Filter berantai lain (`.eq("id", …)`,
 * `.order(…)`, `.maybeSingle()`) tetap disambung di pemanggil.
 */
export function selectEligibleParticipants(
  supabase: SupabaseClient,
  eventId: string,
  columns: string,
  options?: { count: "exact"; head: true },
) {
  return supabase
    .from("registrations")
    .select(columns, options)
    .eq("event_id", eventId)
    .eq("registration_type", ELIGIBLE_REGISTRATION_TYPE)
    .not("status", "in", PARTICIPANT_STATUS_EXCLUSION);
}

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

  const { data, error } = await selectEligibleParticipants(
    target.supabase,
    target.eventId,
    "id, full_name, institution_name, business_name",
  ).order("full_name", { ascending: true });

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
      // Kolomnya nullable di database, jadi baris tanpa keduanya tetap mungkin.
      // Itu meninggalkan opsi tanpa baris pembeda — yang diterima spec §4.1,
      // alih-alih diisi tanda strip.
      label: row.institution_name ?? row.business_name ?? null,
    })),
  };
}
