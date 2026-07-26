const CONTROL_CHARACTER_PATTERN =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const UNSAFE_MARKUP_PATTERN =
  /<\s*\/?\s*script\b|javascript\s*:|data\s*:\s*text\/html/i;

export function normalizeSingleLine(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim().replace(/\s+/g, " ");
}

export function normalizeMultiline(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function normalizeOptionalSingleLine(value: unknown): unknown {
  const normalized = normalizeSingleLine(value);

  return normalized === "" ? undefined : normalized;
}

export function normalizeEmail(value: unknown): unknown {
  const normalized = normalizeOptionalSingleLine(value);

  return typeof normalized === "string"
    ? normalized.toLocaleLowerCase("en-US")
    : normalized;
}

/**
 * Normalizes Indonesian WhatsApp numbers to an E.164-like representation.
 *
 * Examples:
 * - 0812 3456 7890 -> +6281234567890
 * - 812-3456-7890  -> +6281234567890
 * - 6281234567890  -> +6281234567890
 * - +14155552671   -> +14155552671
 */
export function normalizeWhatsapp(value: unknown): unknown {
  const normalized = normalizeOptionalSingleLine(value);

  if (typeof normalized !== "string") {
    return normalized;
  }

  if (!/^[+\d\s().-]+$/.test(normalized)) {
    return normalized;
  }

  let digits = normalized.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = `62${digits.slice(1)}`;
  } else if (digits.startsWith("8")) {
    digits = `62${digits}`;
  }

  return digits ? `+${digits}` : "";
}

export function normalizeBoolean(value: unknown): unknown {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
    return value;
  }

  if (typeof value !== "string") {
    return value === undefined || value === null ? false : value;
  }

  const normalized = value.trim().toLocaleLowerCase("en-US");

  if (["1", "true", "on", "yes", "ya"].includes(normalized)) {
    return true;
  }

  if (
    normalized === "" ||
    ["0", "false", "off", "no", "tidak"].includes(normalized)
  ) {
    return false;
  }

  return value;
}

export function normalizeStringArray(value: unknown): unknown {
  const values = Array.isArray(value) ? value : value == null ? [] : [value];
  const normalizedValues = values
    .map(normalizeSingleLine)
    .filter((item): item is string => typeof item === "string" && item !== "");

  return [...new Set(normalizedValues)];
}

export function normalizeInteger(value: unknown): unknown {
  const normalized = normalizeOptionalSingleLine(value);

  if (typeof normalized === "number") {
    return normalized;
  }

  if (
    typeof normalized === "string" &&
    /^(0|[1-9]\d*)$/.test(normalized)
  ) {
    return Number(normalized);
  }

  return normalized;
}

export function hasUnsafeText(value: string): boolean {
  return (
    CONTROL_CHARACTER_PATTERN.test(value) || UNSAFE_MARKUP_PATTERN.test(value)
  );
}

export function getFormDataString(
  formData: FormData,
  name: string,
): FormDataEntryValue | undefined {
  return formData.get(name) ?? undefined;
}

export function getFormDataStrings(
  formData: FormData,
  name: string,
): FormDataEntryValue[] {
  return formData.getAll(name);
}
