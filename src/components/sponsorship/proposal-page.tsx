"use client";

import Image from "next/image";
import {
  forwardRef,
  type ReactNode,
} from "react";

import {
  sponsorshipProposalContent,
  sponsorshipProposalMeta,
  type SponsorshipProposalPage,
} from "@/data/sponsorship-proposal-pages";

type ProposalPageProps = {
  page: SponsorshipProposalPage;
  onOpenCover: () => void;
  renderCustomPage?: (page: SponsorshipProposalPage) => ReactNode;
};

function PageNumber({ pageNumber }: { pageNumber: number }) {
  return (
    <span className="absolute bottom-5 right-5 font-mono text-[0.65rem] font-semibold tracking-[0.16em] text-slate-400">
      {String(pageNumber).padStart(2, "0")}
    </span>
  );
}

export const ProposalPage = forwardRef<HTMLDivElement, ProposalPageProps>(
  function ProposalPage(
    { page, onOpenCover, renderCustomPage },
    ref,
  ) {
    const accessibleLabel =
      page.type === "cover"
        ? `Cover proposal sponsorship, halaman 1 dari ${sponsorshipProposalMeta.totalPages}`
        : `Halaman ${page.pageNumber} dari ${sponsorshipProposalMeta.totalPages}`;

    if (page.type === "cover") {
      return (
        <div
          ref={ref}
          data-density="hard"
          data-proposal-page={page.pageNumber}
          role="group"
          aria-label={accessibleLabel}
          className="relative isolate overflow-hidden border border-brand-700 bg-brand text-white shadow-[0_16px_38px_rgba(0,31,92,0.22)]"
        >
          <button
            type="button"
            onClick={onOpenCover}
            aria-label="Buka proposal sponsorship"
            className="absolute inset-0 z-20 cursor-pointer rounded-none focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white"
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "2.5rem 2.5rem",
              maskImage: "linear-gradient(to bottom, black, transparent 88%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/25"
            aria-hidden="true"
          />

          <div className="pointer-events-none relative flex h-full flex-col p-7 sm:p-9">
            <p className="text-sm font-semibold tracking-[-0.02em]">
              {sponsorshipProposalContent.cover.brand}
            </p>
            <div className="mt-auto">
              <p className="max-w-[18rem] font-mono text-[0.62rem] font-semibold uppercase leading-5 tracking-[0.17em] text-brand-100 sm:text-xs">
                {sponsorshipProposalContent.cover.documentType}
              </p>
              <h3 className="mt-5 max-w-[20rem] text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-[2.35rem]">
                {sponsorshipProposalContent.cover.eventTitle}
              </h3>
              <p className="mt-4 max-w-[19rem] text-xs font-medium leading-6 text-white/78 sm:text-sm">
                {sponsorshipProposalContent.cover.tagline}
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between gap-5 border-t border-white/25 pt-5">
              <div className="space-y-1 font-mono text-[0.58rem] leading-4 text-white/72 sm:text-[0.64rem]">
                {sponsorshipProposalContent.cover.websites.map((website) => (
                  <p key={website}>{website}</p>
                ))}
              </div>
              <span className="rounded-full border border-white/35 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/80">
                Klik untuk membuka
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (page.type === "image" && page.imageSrc && page.alt) {
      return (
        <div
          ref={ref}
          data-density="soft"
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
            className="pointer-events-none select-none object-cover"
            draggable={false}
          />
          <PageNumber pageNumber={page.pageNumber} />
        </div>
      );
    }

    if (page.type === "custom") {
      return (
        <div
          ref={ref}
          data-density="soft"
          data-proposal-page={page.pageNumber}
          data-custom-page={page.customKey ?? "unassigned"}
          role="group"
          aria-label={accessibleLabel}
          className="relative overflow-hidden border border-slate-200 bg-white shadow-[0_12px_32px_rgba(1,34,98,0.1)]"
        >
          {renderCustomPage?.(page) ?? (
            <span className="sr-only">
              {page.title ?? `Proposal Page ${page.pageNumber}`}
            </span>
          )}
          <PageNumber pageNumber={page.pageNumber} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-density="soft"
        data-proposal-page={page.pageNumber}
        data-proposal-placeholder="true"
        role="group"
        aria-label={accessibleLabel}
        className="relative overflow-hidden border border-slate-200 bg-white shadow-[0_12px_32px_rgba(1,34,98,0.1)]"
      >
        <span className="sr-only">
          {page.title ?? `Proposal Page ${page.pageNumber}`}
        </span>
        <div
          className="absolute left-5 top-5 h-1.5 w-8 rounded-full bg-brand-100"
          aria-hidden="true"
        />
        <PageNumber pageNumber={page.pageNumber} />
      </div>
    );
  },
);

ProposalPage.displayName = "ProposalPage";
