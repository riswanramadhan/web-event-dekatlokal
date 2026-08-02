export const COMMUNITY_SUPPORT_EVENT_SLUG = "ai-co-creation-lab-makassar";

export const COMMUNITY_SUPPORT_PROOF_PREFIX =
  "ai-co-creation-lab-makassar-2026";

export const COMMUNITY_SUPPORT_PROOF_BUCKET =
  "community-support-proofs";

export const COMMUNITY_SUPPORT_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const COMMUNITY_SUPPORT_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export const COMMUNITY_SUPPORT_DESTINATION_BANKS = [
  "bsi",
  "mandiri",
] as const;

export type CommunitySupportDestinationBank =
  (typeof COMMUNITY_SUPPORT_DESTINATION_BANKS)[number];

export type CommunitySupportMimeType =
  (typeof COMMUNITY_SUPPORT_ALLOWED_MIME_TYPES)[number];

export const COMMUNITY_SUPPORT_FILE_EXTENSIONS: Record<
  CommunitySupportMimeType,
  "jpg" | "png" | "webp" | "pdf"
> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};
