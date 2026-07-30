"use client";

import {
  NavArrowLeft,
  NavArrowRight,
  SkipNext,
  SkipPrev,
} from "iconoir-react";

type FlipbookControlsProps = {
  currentPageIndex: number;
  visibleEndIndex: number;
  totalPages: number;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
};

const controlClassName =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_7px_20px_rgba(1,34,98,0.06)] transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none";

export function FlipbookControls({
  currentPageIndex,
  visibleEndIndex,
  totalPages,
  onFirst,
  onPrevious,
  onNext,
  onLast,
}: FlipbookControlsProps) {
  const isFirst = currentPageIndex === 0;
  const isLast = currentPageIndex >= totalPages - 1;
  const firstVisiblePage = currentPageIndex + 1;
  const lastVisiblePage = visibleEndIndex + 1;
  const pageStatus =
    firstVisiblePage === lastVisiblePage
      ? `Halaman ${firstVisiblePage} dari ${totalPages}`
      : `Halaman ${firstVisiblePage}–${lastVisiblePage} dari ${totalPages}`;

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <p
        className="min-h-6 font-mono text-xs font-semibold text-slate-600"
        aria-live="polite"
        aria-atomic="true"
        data-flipbook-page-status
      >
        {pageStatus}
      </p>

      <div
        className="grid grid-cols-4 gap-2"
        role="group"
        aria-label="Kontrol halaman proposal"
      >
        <button
          type="button"
          onClick={onFirst}
          disabled={isFirst}
          aria-label="Ke halaman pertama"
          aria-controls="sponsorship-proposal-book"
          className={controlClassName}
          data-flipbook-control="first"
        >
          <SkipPrev className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          aria-label="Ke halaman sebelumnya"
          aria-controls="sponsorship-proposal-book"
          className={controlClassName}
          data-flipbook-control="previous"
        >
          <NavArrowLeft
            className="h-5 w-5"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          aria-label="Ke halaman berikutnya"
          aria-controls="sponsorship-proposal-book"
          className={controlClassName}
          data-flipbook-control="next"
        >
          <NavArrowRight
            className="h-5 w-5"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={onLast}
          disabled={isLast}
          aria-label="Ke halaman terakhir"
          aria-controls="sponsorship-proposal-book"
          className={controlClassName}
          data-flipbook-control="last"
        >
          <SkipNext className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
