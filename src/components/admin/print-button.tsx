"use client";

import { Printer } from "iconoir-react";

/**
 * Unduh PDF lewat dialog cetak browser, bukan pustaka PDF.
 *
 * Pola yang sama dengan `PrintReportButton` di `src/components/reports/
 * report-actions.tsx`: satu `window.print()` plus aturan `@media print` di
 * `globals.css`. Tanpa dependensi baru yang ikut masuk bundle worker Cloudflare,
 * dan hasilnya mewarisi tata letak halaman — jadi laporan di kertas tidak bisa
 * diam-diam berbeda isinya dari laporan di layar.
 *
 * `data-report-action` menyembunyikan tombolnya sendiri saat mencetak.
 */
export function PrintPageButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-report-action
      className="print-hidden inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-brand transition hover:border-brand-200 hover:bg-brand-50"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
