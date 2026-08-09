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
