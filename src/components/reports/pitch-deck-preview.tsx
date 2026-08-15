"use client";

import { useState } from "react";

export function PitchDeckPreview({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const previewId = "pitch-deck-pdf-preview";

  if (isLoaded) {
    return (
      <div
        id={previewId}
        className="report-no-print overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
      >
        <iframe
          src={`${href}#view=FitH&toolbar=1`}
          title={title}
          className="h-[30rem] w-full bg-white sm:h-[38rem]"
        />
      </div>
    );
  }

  return (
    <div
      id={previewId}
      className="report-no-print flex min-h-72 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center sm:min-h-96"
    >
      <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-brand">
        PDF preview · 17 pages · 20 MB
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-ink">
        Pratinjau belum dimuat
      </h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
        Muat pratinjau hanya jika diperlukan agar file PDF berukuran besar tidak
        diunduh otomatis saat halaman dibuka.
      </p>
      <button
        type="button"
        aria-controls={previewId}
        aria-expanded={isLoaded}
        onClick={() => setIsLoaded(true)}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Muat Pratinjau PDF
      </button>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Tombol View dan Download tetap tersedia di samping pratinjau.
      </p>
    </div>
  );
}
