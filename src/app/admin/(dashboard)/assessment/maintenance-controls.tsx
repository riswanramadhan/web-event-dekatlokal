"use client";

import { Download, Timer, Trash } from "iconoir-react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { AssessmentMaintenance } from "@/lib/assessment/overview";
import { initialRegistrationActionState } from "@/lib/registration/result";

import { exportScoresAction } from "./nilai/actions";

import { ActionMessage } from "./action-message";
import { finalizeExpiredAction, resetAssessmentAction } from "./actions";

const CONFIRMATION_WORD = "HAPUS";

function DialogSubmit({
  label,
  pendingLabel,
  disabled,
}: {
  label: string;
  pendingLabel: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-2xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      <Trash className="h-4 w-4" aria-hidden="true" />
      {pending ? pendingLabel : label}
    </button>
  );
}

function FinalizeSubmit({ count }: { count: number }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "Menutup…" : `Tutup ${count} attempt`}
    </button>
  );
}

export function AssessmentMaintenanceControls({
  maintenance,
}: {
  maintenance: AssessmentMaintenance;
}) {
  const [finalizeState, finalizeAction] = useActionState(
    finalizeExpiredAction,
    initialRegistrationActionState,
  );
  const [resetState, resetAction] = useActionState(
    resetAssessmentAction,
    initialRegistrationActionState,
  );

  const [finalizeOpen, setFinalizeOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [exported, setExported] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [typed, setTyped] = useState("");

  const hasRunning = maintenance.inProgress > 0;
  const hasScores = maintenance.submitted > 0;
  // Scores are irreplaceable once deleted, so the export has to happen first.
  const exportSatisfied = !hasScores || exported;
  const canDelete = typed === CONFIRMATION_WORD && exportSatisfied;

  async function downloadCsv() {
    setExporting(true);
    setExportError(null);

    const result = await exportScoresAction();

    setExporting(false);

    if (!result.ok) {
      setExportError(result.message);
      return;
    }

    const blob = new Blob([result.content], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = result.filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExported(true);
  }

  function closeReset() {
    setResetOpen(false);
    setTyped("");
    setExportError(null);
  }

  return (
    <div className="mt-6 space-y-4">
      {maintenance.expired > 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-2.5">
            <Timer
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-ink">
                Attempt kedaluwarsa
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {maintenance.expired} attempt lewat batas waktu tapi tidak pernah
                dibuka lagi. Menutupnya membuat tabel nilai tidak menyisakan
                baris menggantung.
              </p>
              <button
                type="button"
                onClick={() => setFinalizeOpen(true)}
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Finalisasi attempt kedaluwarsa
              </button>
            </div>
          </div>
          <ActionMessage state={finalizeState} />
        </section>
      ) : (
        <ActionMessage state={finalizeState} />
      )}

      <section className="rounded-2xl border border-red-200 bg-red-50/40 p-5">
        <h2 className="text-sm font-semibold text-red-800">
          Reset data pengerjaan
        </h2>
        <p className="mt-1 text-xs leading-5 text-red-900/80">
          Menghapus seluruh attempt dan jawaban untuk event ini. Nilai peserta
          hilang dan tidak bisa dikembalikan. Setelah itu soal bisa diedit lagi.
        </p>

        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-red-900/80">
          <div className="flex gap-1.5">
            <dt>Total attempt</dt>
            <dd className="font-mono font-semibold">{maintenance.total}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>Sudah terkirim</dt>
            <dd className="font-mono font-semibold">{maintenance.submitted}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>Sedang mengerjakan</dt>
            <dd className="font-mono font-semibold">{maintenance.inProgress}</dd>
          </div>
        </dl>

        {hasRunning ? (
          <p className="mt-3 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs leading-5 text-red-900">
            Masih ada {maintenance.inProgress} peserta yang sedang mengerjakan.
            Tunggu sampai selesai atau finalisasi dulu.
          </p>
        ) : null}

        <button
          type="button"
          disabled={hasRunning || maintenance.total === 0}
          onClick={() => setResetOpen(true)}
          className="mt-3 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        >
          <Trash className="h-4 w-4" aria-hidden="true" />
          Reset data pengerjaan
        </button>

        <ActionMessage state={resetState} />
      </section>

      {finalizeOpen ? (
        <ConfirmDialog
          title={`Tutup ${maintenance.expired} attempt kedaluwarsa?`}
          onClose={() => setFinalizeOpen(false)}
        >
          <p className="text-sm leading-6 text-slate-600">
            Jawaban yang sudah tersimpan tetap dinilai. Yang kosong dihitung
            salah. Tindakan ini tidak menghapus apa pun.
          </p>
          <form
            action={finalizeAction}
            onSubmit={() => setFinalizeOpen(false)}
            className="mt-4"
          >
            <input type="hidden" name="intent" value="finalize" />
            <FinalizeSubmit count={maintenance.expired} />
          </form>
        </ConfirmDialog>
      ) : null}

      {resetOpen ? (
        <ConfirmDialog
          title="Hapus seluruh data pengerjaan?"
          tone="danger"
          onClose={closeReset}
        >
          <p className="text-sm leading-6 text-slate-600">
            <strong className="font-semibold text-ink">
              {maintenance.total} attempt
            </strong>{" "}
            akan dihapus, {maintenance.submitted} di antaranya sudah terkirim dan
            punya nilai. Tidak ada cara mengembalikannya.
          </p>

          {hasScores ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs leading-5 text-slate-600">
                Unduh nilainya dulu. Tombol hapus terkunci sampai CSV tersimpan.
              </p>
              <button
                type="button"
                onClick={() => void downloadCsv()}
                disabled={exporting}
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {exporting
                  ? "Menyiapkan…"
                  : exported
                    ? "Unduh ulang CSV"
                    : "Ekspor CSV dulu"}
              </button>
              {exported ? (
                <p role="status" className="mt-2 text-xs font-medium text-emerald-700">
                  CSV sudah diunduh.
                </p>
              ) : null}
              {exportError ? (
                <p role="alert" className="mt-2 text-xs font-medium text-red-700">
                  {exportError}
                </p>
              ) : null}
            </div>
          ) : null}

          <form action={resetAction} onSubmit={closeReset} className="mt-4">
            <label
              htmlFor="reset-confirmation"
              className="block text-xs font-medium text-slate-600"
            >
              Ketik {CONFIRMATION_WORD} untuk mengonfirmasi
            </label>
            <input
              id="reset-confirmation"
              name="confirmation"
              type="text"
              autoComplete="off"
              value={typed}
              onChange={(event) => setTyped(event.currentTarget.value)}
              className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
            />
            <div className="mt-3">
              <DialogSubmit
                label="Hapus semua data pengerjaan"
                pendingLabel="Menghapus…"
                disabled={!canDelete}
              />
            </div>
          </form>
        </ConfirmDialog>
      ) : null}
    </div>
  );
}
