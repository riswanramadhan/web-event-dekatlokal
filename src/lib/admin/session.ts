export const ADMIN_SESSION_COOKIE = "de_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getSessionSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET?.trim() || undefined;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );

  return toHex(signature);
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;

  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const signature = await hmacHex(secret, String(expiresAt));

  return `${expiresAt}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  const secret = getSessionSecret();

  if (!secret || !token) {
    return false;
  }

  const [expiresAtRaw, signature] = token.split(".");

  if (!expiresAtRaw || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expectedSignature = await hmacHex(secret, expiresAtRaw);

  return timingSafeEqualHex(signature, expectedSignature);
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_SECONDS;
