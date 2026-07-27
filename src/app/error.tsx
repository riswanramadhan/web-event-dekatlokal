"use client";

import { Refresh } from "iconoir-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="page-container py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Terjadi kendala</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-ink">
        Halaman belum dapat ditampilkan
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-600">
        Coba muat ulang bagian ini. Data pendaftaran yang belum dikirim tidak disimpan oleh halaman ini.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mx-auto mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-600"
      >
        <Refresh className="h-4 w-4" aria-hidden="true" />
        Coba lagi
      </button>
    </section>
  );
}
