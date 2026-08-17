"use client";

import { Download } from "iconoir-react";
import { useState } from "react";

import { exportScoresAction } from "./actions";

/**
 * Downloads via a Blob rather than a route handler: a new route under /admin
 * would need its own authorization gate wired by hand, and getting that wrong
 * would expose the scores. The Server Action already runs behind requireAdmin.
 */
export function ExportScoresButton({ disabled }: { disabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function download() {
    setBusy(true);
    setError(null);

    const result = await exportScoresAction();

    setBusy(false);

    if (!result.ok) {
      setError(result.message);
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
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={() => void download()}
        disabled={disabled || busy}
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {busy ? "Menyiapkan…" : "Ekspor CSV"}
      </button>
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
