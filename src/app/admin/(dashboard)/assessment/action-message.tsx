"use client";

import type { RegistrationActionState } from "@/lib/registration/result";

/**
 * Shared result renderer for the assessment admin forms. `formErrors` carries
 * lists such as the readiness problems, so the reasons reach the administrator
 * instead of a bare refusal.
 */
export function ActionMessage({
  state,
  className = "",
}: {
  state: RegistrationActionState;
  className?: string;
}) {
  if (state.status === "idle") {
    return null;
  }

  const isError = state.status !== "success";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`mt-2 text-xs leading-5 ${
        isError ? "text-red-700" : "text-emerald-700"
      } ${className}`}
    >
      <p className="font-medium">{state.message}</p>
      {state.formErrors && state.formErrors.length > 0 ? (
        <ul className="mt-1 list-disc space-y-0.5 pl-4">
          {state.formErrors.map((problem, index) => (
            <li key={`${index}-${problem}`}>{problem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
