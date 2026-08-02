import {
  COMMUNITY_SUPPORT_ALLOWED_MIME_TYPES,
  COMMUNITY_SUPPORT_FILE_EXTENSIONS,
  COMMUNITY_SUPPORT_MAX_FILE_SIZE_BYTES,
  type CommunitySupportMimeType,
} from "./constants";

export type ValidatedCommunitySupportFile = {
  bytes: Uint8Array;
  extension: "jpg" | "png" | "webp" | "pdf";
  mimeType: CommunitySupportMimeType;
  originalName: string | null;
  sha256: string;
  sizeBytes: number;
};

export type CommunitySupportFileError = "missing" | "size" | "type";

export type CommunitySupportFileValidationResult =
  | { ok: true; file: ValidatedCommunitySupportFile }
  | { ok: false; error: CommunitySupportFileError };

function startsWith(bytes: Uint8Array, signature: readonly number[]): boolean {
  return signature.every((byte, index) => bytes[index] === byte);
}

function detectMimeType(
  bytes: Uint8Array,
): CommunitySupportMimeType | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  }

  if (
    startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  ) {
    return "image/png";
  }

  if (
    startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }

  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) {
    return "application/pdf";
  }

  return null;
}

function safeOriginalName(name: string): string | null {
  const basename = name.split(/[\\/]/).at(-1)?.trim() ?? "";
  const sanitized = basename
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 255)
    .trim();

  return sanitized || null;
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const input = new Uint8Array(bytes.byteLength);
  input.set(bytes);
  const digest = await crypto.subtle.digest("SHA-256", input.buffer);

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function validateCommunitySupportFile(
  entry: FormDataEntryValue | null,
): Promise<CommunitySupportFileValidationResult> {
  if (!entry || typeof entry === "string") {
    return { ok: false, error: "missing" };
  }

  if (
    entry.size <= 0 ||
    entry.size > COMMUNITY_SUPPORT_MAX_FILE_SIZE_BYTES
  ) {
    return { ok: false, error: "size" };
  }

  if (
    !COMMUNITY_SUPPORT_ALLOWED_MIME_TYPES.includes(
      entry.type as CommunitySupportMimeType,
    )
  ) {
    return { ok: false, error: "type" };
  }

  const bytes = new Uint8Array(await entry.arrayBuffer());
  const detectedMimeType = detectMimeType(bytes);

  // The browser-declared type and the content signature must agree. The
  // extension used for storage is derived from this detected type, never from
  // the user-controlled filename.
  if (!detectedMimeType || detectedMimeType !== entry.type) {
    return { ok: false, error: "type" };
  }

  return {
    ok: true,
    file: {
      bytes,
      extension: COMMUNITY_SUPPORT_FILE_EXTENSIONS[detectedMimeType],
      mimeType: detectedMimeType,
      originalName: safeOriginalName(entry.name),
      sha256: await sha256Hex(bytes),
      sizeBytes: entry.size,
    },
  };
}
