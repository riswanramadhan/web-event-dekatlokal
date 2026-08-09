"use client";

import { WarningTriangle } from "iconoir-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import type { AssessmentPhase } from "@/lib/assessment/phase";
import { initialRegistrationActionState } from "@/lib/registration/result";

import { ActionMessage } from "./action-message";
import {
  setAssessmentDurationAction,
  toggleAssessmentOpenAction,
} from "./actions";

function PhaseSwitch({
  isOpen,
  blocked,
  label,
}: {
  isOpen: boolean;
  blocked: boolean;
  label: string;
}) {
  // Pending state comes from useFormStatus, not from local state set in
  // onClick: disabling a submit button inside its own click handler makes the
  // browser cancel the submission, so the action would never run.
  const { pending } = useFormStatus();
  const disabled = pending || blocked;

  return (
    <button
      type="submit"
      role="switch"
      aria-checked={isOpen}
      aria-label={isOpen ? `Tutup ${label}` : `Buka ${label}`}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${isOpen ? "bg-emerald-500" : "bg-slate-300"}`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          isOpen ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function DurationSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-10 shrink-0 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "Menyimpan…" : "Simpan"}
    </button>
  );
}

export function AssessmentPhaseControls({
  phase,
  label,
  isOpen,
  durationSeconds,
  problems,
}: {
  phase: AssessmentPhase;
  label: string;
  isOpen: boolean;
  durationSeconds: number;
  /** Event-wide readiness problems; empty means the test may be opened. */
  problems: string[];
}) {
  const [toggleState, toggleAction] = useActionState(
    toggleAssessmentOpenAction,
    initialRegistrationActionState,
  );
  const [durationState, durationAction] = useActionState(
    setAssessmentDurationAction,
    initialRegistrationActionState,
  );

  // Only opening is blocked. A test that is already open must always be
  // closable, including in the case where a question was broken after it was
  // opened but before anyone started.
  const blockedFromOpening = !isOpen && problems.length > 0;
  const durationId = `duration-${phase}`;

  return (
    <div className="mt-5 space-y-4 border-t border-slate-100 pt-4">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink">
              {isOpen ? "Menerima peserta baru" : "Tidak menerima peserta baru"}
            </p>
            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              {isOpen
                ? "Peserta bisa memilih namanya dan mulai mengerjakan."
                : "Peserta yang sudah mulai tetap bisa melanjutkan sampai selesai."}
            </p>
          </div>

          <form action={toggleAction}>
            <input type="hidden" name="phase" value={phase} />
            <input
              type="hidden"
              name="intent"
              value={isOpen ? "close" : "open"}
            />
            <PhaseSwitch
              isOpen={isOpen}
              blocked={blockedFromOpening}
              label={label}
            />
          </form>
        </div>

        {blockedFromOpening ? (
          <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-amber-800">
            <WarningTriangle
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>
              Tes belum bisa dibuka. {problems[0]}
              {problems.length > 1
                ? ` (+${problems.length - 1} masalah lain di daftar Kesiapan soal)`
                : ""}
            </span>
          </p>
        ) : null}

        <ActionMessage state={toggleState} />
      </div>

      <form action={durationAction}>
        <input type="hidden" name="phase" value={phase} />
        <label
          htmlFor={durationId}
          className="block text-xs font-medium uppercase tracking-wide text-slate-500"
        >
          Durasi per peserta (menit)
        </label>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <input
            id={durationId}
            name="durationMinutes"
            type="number"
            inputMode="numeric"
            min={1}
            max={240}
            step={1}
            required
            defaultValue={Math.round(durationSeconds / 60)}
            className="min-h-10 w-24 rounded-xl border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-100"
          />
          <DurationSubmit />
        </div>
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          Berlaku untuk peserta yang mulai setelah ini. Yang sedang mengerjakan
          tidak berubah.
        </p>

        <ActionMessage state={durationState} />
      </form>
    </div>
  );
}
