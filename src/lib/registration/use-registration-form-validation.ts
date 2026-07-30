import { useCallback, useState } from "react";
import type { z } from "zod";

export type ClientFieldErrors = Record<string, string | undefined>;

const HONEYPOT_FIELD = "company";

/**
 * Focuses and scrolls to a field by name. Works for plain inputs/textareas
 * (id === name), the custom SelectInput trigger button (its id defaults to
 * name), and checkbox groups sharing one name (falls back to the first
 * matching element).
 */
function focusAndScrollToField(form: HTMLFormElement, name: string): void {
  const byId = document.getElementById(name);
  const target =
    byId instanceof HTMLElement
      ? byId
      : form.querySelector<HTMLElement>(`[name="${name}"]`);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "center" });
  target.focus({ preventScroll: true });
}

/**
 * Client-side mirror of a registration Zod schema.
 *
 * This never replaces server validation: submitStudentRegistration and
 * submitUmkmRegistration re-check everything with the exact same schema
 * before writing to the database. Reusing that schema here (rather than a
 * hand-written parallel set of rules) means the client and server can never
 * disagree about what counts as valid — this layer only removes the latency
 * of a round trip and lets people fix mistakes before they submit.
 */
export function useRegistrationFormValidation<Shape extends z.ZodRawShape>(
  schema: z.ZodObject<Shape>,
  buildCandidate: (formData: FormData) => Record<string, unknown>,
) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [clientErrors, setClientErrors] = useState<ClientFieldErrors>({});
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  const fieldSchemas = schema.shape as unknown as Record<string, z.ZodTypeAny>;

  const validateOne = useCallback(
    (name: string, rawValue: unknown): string | undefined => {
      const fieldSchema = fieldSchemas[name];

      if (!fieldSchema) {
        return undefined;
      }

      const result = fieldSchema.safeParse(rawValue);
      return result.success ? undefined : result.error.issues[0]?.message;
    },
    [fieldSchemas],
  );

  /**
   * Marks a field touched and validates it right away. Used for blur on free
   * text, and for discrete choices (checkboxes, selects) where every change
   * is already a complete decision rather than partial typing.
   */
  const touchAndValidate = useCallback(
    (name: string, rawValue: unknown) => {
      const message = validateOne(name, rawValue);
      setTouched((previous) => ({ ...previous, [name]: true }));
      setClientErrors((previous) => ({ ...previous, [name]: message }));
    },
    [validateOne],
  );

  /**
   * Re-validates on every keystroke, but only once the field has already been
   * touched — otherwise a fresh field would flash an error on the very first
   * character typed.
   */
  const liveRevalidateIfTouched = useCallback(
    (name: string, rawValue: unknown) => {
      if (!touched[name]) {
        return;
      }

      setClientErrors((previous) => ({
        ...previous,
        [name]: validateOne(name, rawValue),
      }));
    },
    [touched, validateOne],
  );

  /**
   * Adopts field errors coming back from the server (for example a duplicate
   * WhatsApp number, which only the database can detect) so they display
   * immediately and clear as soon as the user edits that field again.
   */
  const syncServerFieldErrors = useCallback(
    (fieldErrors: Record<string, string[]> | undefined) => {
      const fields = fieldErrors ? Object.keys(fieldErrors) : [];

      if (fields.length === 0) {
        return;
      }

      setTouched((previous) => {
        const next = { ...previous };
        for (const field of fields) next[field] = true;
        return next;
      });

      setClientErrors((previous) => {
        // Deleting rather than setting undefined lets getFieldError fall
        // through to the server's message for these fields until the user
        // actually edits one.
        const next = { ...previous };
        for (const field of fields) delete next[field];
        return next;
      });
    },
    [],
  );

  /**
   * Runs the full schema before the Server Action fires. Returns true when
   * submission may proceed; false when it was blocked locally (errors are
   * shown and the first invalid field is focused).
   */
  const validateBeforeSubmit = useCallback(
    (form: HTMLFormElement): boolean => {
      const candidate = buildCandidate(new FormData(form));
      const result = schema.safeParse(candidate);

      if (result.success) {
        setBlockedMessage(null);
        return true;
      }

      const relevantIssues = result.error.issues.filter(
        (issue) => issue.path[0] !== HONEYPOT_FIELD,
      );

      if (relevantIssues.length === 0) {
        // Only the hidden honeypot tripped. A real visitor never fills it, so
        // there is nothing genuine to show — let the server's existing
        // silent handling deal with it rather than blocking with no visible
        // reason.
        setBlockedMessage(null);
        return true;
      }

      const flattened = result.error.flatten().fieldErrors as Record<
        string,
        string[] | undefined
      >;
      const nextTouched: Record<string, boolean> = {};
      const nextErrors: ClientFieldErrors = {};

      for (const field of Object.keys(fieldSchemas)) {
        if (field === HONEYPOT_FIELD) {
          continue;
        }

        nextTouched[field] = true;
        nextErrors[field] = flattened[field]?.[0];
      }

      setTouched((previous) => ({ ...previous, ...nextTouched }));
      setClientErrors((previous) => ({ ...previous, ...nextErrors }));

      const invalidFieldCount = new Set(
        relevantIssues.map((issue) => String(issue.path[0])),
      ).size;

      setBlockedMessage(
        invalidFieldCount === 1
          ? "Ada satu isian yang perlu diperbaiki sebelum dikirim."
          : `Ada ${invalidFieldCount} isian yang perlu diperbaiki sebelum dikirim.`,
      );

      const firstField = relevantIssues[0]?.path[0];

      if (typeof firstField === "string") {
        focusAndScrollToField(form, firstField);
      }

      return false;
    },
    [buildCandidate, fieldSchemas, schema],
  );

  /**
   * Error to show for a field. Once touched, the client's own verdict wins;
   * otherwise defer to whatever the server last said about it.
   */
  const getFieldError = useCallback(
    (name: string, serverError: string | undefined): string | undefined => {
      if (!touched[name]) {
        return serverError;
      }

      return name in clientErrors ? clientErrors[name] : serverError;
    },
    [clientErrors, touched],
  );

  const clearBlockedMessage = useCallback(() => {
    setBlockedMessage(null);
  }, []);

  return {
    touchAndValidate,
    liveRevalidateIfTouched,
    syncServerFieldErrors,
    validateBeforeSubmit,
    getFieldError,
    blockedMessage,
    clearBlockedMessage,
  };
}
