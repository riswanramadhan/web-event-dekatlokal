"use client";

import dynamic from "next/dynamic";

const SponsorshipFlipbookClient = dynamic(
  () =>
    import("./sponsorship-flipbook-client").then(
      (module) => module.SponsorshipFlipbookClient,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto flex aspect-[210/297] w-full max-w-[27.5rem] items-center justify-center rounded-sm border border-brand-700 bg-brand px-8 text-center text-white shadow-[0_16px_38px_rgba(0,31,92,0.22)]"
        role="status"
        aria-live="polite"
      >
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
          Menyiapkan proposal interaktif
        </p>
      </div>
    ),
  },
);

export function SponsorshipFlipbookLoader() {
  return <SponsorshipFlipbookClient />;
}
