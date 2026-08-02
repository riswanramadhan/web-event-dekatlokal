import { z, type ZodError } from "zod";

import {
  getFormDataString,
  hasUnsafeText,
  normalizeBoolean,
  normalizeMultiline,
  normalizeOptionalSingleLine,
  normalizeSingleLine,
} from "@/lib/registration/normalizers";

import { COMMUNITY_SUPPORT_DESTINATION_BANKS } from "./constants";

function normalizeAmount(value: unknown): unknown {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return value;
  }

  const withoutCurrency = value
    .trim()
    .replace(/^rp\s*/i, "")
    .replace(/\s+/g, "");

  if (/^[1-9]\d*$/.test(withoutCurrency)) {
    return Number(withoutCurrency);
  }

  if (/^[1-9]\d{0,2}(?:\.\d{3})+$/.test(withoutCurrency)) {
    return Number(withoutCurrency.replaceAll(".", ""));
  }

  return value;
}

const optionalSafeSingleLine = (label: string, maximum: number) =>
  z.preprocess(
    normalizeOptionalSingleLine,
    z
      .string()
      .max(maximum, `${label} must be ${maximum} characters or fewer.`)
      .refine((value) => !hasUnsafeText(value), `${label} is not valid.`)
      .optional(),
  );

const optionalSafeMultiline = (label: string, maximum: number) =>
  z.preprocess(
    (value) => {
      const normalized = normalizeMultiline(value);
      return normalized === "" ? undefined : normalized;
    },
    z
      .string()
      .max(maximum, `${label} must be ${maximum} characters or fewer.`)
      .refine((value) => !hasUnsafeText(value), `${label} is not valid.`)
      .optional(),
  );

const formBoolean = z.preprocess(normalizeBoolean, z.boolean());

export const communitySupportFormSchema = z
  .object({
    request_id: z.preprocess(
      normalizeSingleLine,
      z.uuid("This request could not be processed."),
    ),
    supporter_name: z.preprocess(
      normalizeOptionalSingleLine,
      z
        .string()
        .min(2, "Please enter your name or choose to stay anonymous.")
        .max(120, "Name must be 120 characters or fewer.")
        .refine((value) => !hasUnsafeText(value), "Name is not valid.")
        .optional(),
    ),
    is_anonymous: formBoolean,
    amount: z.preprocess(
      normalizeAmount,
      z
        .number({ error: "Please enter a valid support amount." })
        .int("Please enter a valid support amount.")
        .safe("Please enter a valid support amount.")
        .positive("Please enter a valid support amount."),
    ),
    destination_bank: z.preprocess(
      normalizeSingleLine,
      z.enum(COMMUNITY_SUPPORT_DESTINATION_BANKS, {
        error: "Please choose a destination bank.",
      }),
    ),
    contact: optionalSafeSingleLine("Contact", 254),
    message: optionalSafeMultiline("Message", 300),
    display_publicly: formBoolean,
    confirmation: z.preprocess(
      normalizeBoolean,
      z.literal(true, {
        error: "Please confirm that the submitted information is correct.",
      }),
    ),
    website: z.preprocess(
      (value) => normalizeSingleLine(value) || "",
      z.literal("", { error: "This request could not be processed." }),
    ),
  })
  .strict()
  .superRefine((data, context) => {
    if (!data.is_anonymous && !data.supporter_name) {
      context.addIssue({
        code: "custom",
        path: ["supporter_name"],
        message: "Please enter your name or choose to stay anonymous.",
      });
    }
  })
  .transform((data) => ({
    ...data,
    supporter_name: data.is_anonymous ? null : data.supporter_name!,
    display_publicly: data.is_anonymous ? false : data.display_publicly,
  }));

export type CommunitySupportFormData = z.output<
  typeof communitySupportFormSchema
>;

export function buildCommunitySupportCandidate(
  formData: FormData,
): Record<string, unknown> {
  return {
    request_id: getFormDataString(formData, "request_id"),
    supporter_name: getFormDataString(formData, "supporter_name"),
    is_anonymous: getFormDataString(formData, "is_anonymous"),
    amount: getFormDataString(formData, "amount"),
    destination_bank: getFormDataString(formData, "destination_bank"),
    contact: getFormDataString(formData, "contact"),
    message: getFormDataString(formData, "message"),
    display_publicly: getFormDataString(formData, "display_publicly"),
    confirmation: getFormDataString(formData, "confirmation"),
    website: getFormDataString(formData, "website"),
  };
}

export function communitySupportFieldErrors(
  error: ZodError,
): Record<string, string[]> {
  const flattened = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(flattened).filter(
      (entry): entry is [string, string[]] => Array.isArray(entry[1]),
    ),
  );
}
