"use client";

import { WarningTriangle } from "iconoir-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  toggleRegistrationAction,
  type RegistrationToggleState,
} from "@/app/admin/registration-actions";

const initialState: RegistrationToggleState = { status: "idle", message: "" };

function Switch({ isOpen }: { isOpen: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      role="switch"
      aria-checked={isOpen}
      aria-label={isOpen ? "Tutup pendaftaran" : "Buka pendaftaran"}
      disabled={pending}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 disabled:cursor-wait disabled:opacity-60 ${
        isOpen ? "bg-emerald-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          isOpen ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function RegistrationToggle({
  isOpen,
  resolved,
}: {
  isOpen: boolean;
  resolved: boolean;
}) {
  const [state, formAction] = useActionState(
    toggleRegistrationAction,
    initialState,
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pendaftaran
          </p>
          <p
            className={`mt-1 text-sm font-semibold ${
              isOpen ? "text-emerald-700" : "text-slate-700"
            }`}
          >
            {isOpen ? "Dibuka" : "Ditutup"}
          </p>
        </div>

        <form action={formAction}>
          <input
            type="hidden"
            name="intent"
            value={isOpen ? "close" : "open"}
          />
          <Switch isOpen={isOpen} />
        </form>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {isOpen
          ? "Form pendaftaran aktif dan menerima data."
          : "Form pendaftaran dinonaktifkan untuk publik."}
      </p>

      {!resolved ? (
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-amber-700">
          <WarningTriangle
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          />
          Status belum terbaca dari database.
        </p>
      ) : null}

      {state.status === "error" ? (
        <p role="alert" className="mt-2 text-xs font-medium text-red-700">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
