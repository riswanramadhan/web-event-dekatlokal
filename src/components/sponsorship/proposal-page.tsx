"use client";

import Image from "next/image";
import { forwardRef } from "react";

import {
  sponsorshipProposalMeta,
  type SponsorshipProposalPage,
} from "@/data/sponsorship-proposal-pages";

type ProposalPageProps = {
  page: SponsorshipProposalPage;
  onOpenCover: () => void;
};

function PageNumber({ pageNumber }: { pageNumber: number }) {
  return (
    <span className="absolute bottom-5 right-5 rounded-full bg-white/80 px-2 py-0.5 font-mono text-[0.65rem] font-semibold tracking-[0.16em] text-slate-500 backdrop-blur-sm">
      {String(pageNumber).padStart(2, "0")}
    </span>
  );
}

export const ProposalPage = forwardRef<HTMLDivElement, ProposalPageProps>(
  function ProposalPage({ page, onOpenCover }, ref) {
    const isCover = page.pageNumber === 1;
    const accessibleLabel = isCover
      ? `Cover proposal sponsorship, halaman 1 dari ${sponsorshipProposalMeta.totalPages}`
      : `Halaman ${page.pageNumber} dari ${sponsorshipProposalMeta.totalPages}: ${page.alt}`;

    return (
      <div
        ref={ref}
        data-density={isCover ? "hard" : "soft"}
        data-proposal-page={page.pageNumber}
        role="group"
        aria-label={accessibleLabel}
        className="relative overflow-hidden border border-slate-200 bg-white shadow-[0_12px_32px_rgba(1,34,98,0.1)]"
      >
        <Image
          src={page.imageSrc}
          alt={page.alt}
          fill
          sizes="(max-width: 639px) calc(100vw - 2rem), 440px"
          priority={isCover}
          // react-pageflip clones every page into a display:none source node
          // and paints the visible copy separately, so the browser/Next.js
          // intersection-based lazy loading can never detect these images as
          // visible. Eager-loading is the only way non-cover pages ever load.
          loading={isCover ? undefined : "eager"}
          className="pointer-events-none select-none object-cover"
          draggable={false}
        />

        {isCover ? (
          <>
            <button
              type="button"
              onClick={onOpenCover}
              aria-label="Buka proposal sponsorship"
              className="absolute inset-0 z-20 cursor-pointer rounded-none focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-white/40 bg-slate-950/55 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
            >
              Klik untuk membuka
            </span>
          </>
        ) : (
          <PageNumber pageNumber={page.pageNumber} />
        )}
      </div>
    );
  },
);

ProposalPage.displayName = "ProposalPage";
