import { ArrowLeft, ArrowRight, CheckCircle, Circle } from "iconoir-react";
import Link from "next/link";

import {
  getAdjacentProgressReports,
  progressReports,
  type ProgressReportSlug,
} from "@/data/progress-reports";

export function ProgressReportNavigation({
  currentSlug,
}: {
  currentSlug: ProgressReportSlug;
}) {
  return (
    <nav
      aria-label="Daftar progress AI Co-Creation Lab Makassar"
      className="report-no-print mt-8 max-w-5xl border-t border-slate-200 pt-6"
    >
      <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Progress report
      </p>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {progressReports.map((report, index) => {
          const isCurrent = report.slug === currentSlug;
          const Icon = isCurrent ? CheckCircle : Circle;

          return (
            <li key={report.slug}>
              <Link
                href={report.route}
                aria-current={isCurrent ? "page" : undefined}
                className={`group flex min-h-16 items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition ${
                  isCurrent
                    ? "border-brand bg-brand text-white shadow-[0_10px_24px_rgba(2,85,245,0.18)]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
                }`}
              >
                <span
                  className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[0.62rem] font-semibold ${
                    isCurrent
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-brand"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`flex items-center gap-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] ${
                      isCurrent ? "text-white/75" : "text-slate-500"
                    }`}
                  >
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {report.weekLabel}
                  </span>
                  <span className="mt-1 block text-xs font-semibold leading-5">
                    {report.title}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function AdjacentProgressNavigation({
  currentSlug,
}: {
  currentSlug: ProgressReportSlug;
}) {
  const { previous, next } = getAdjacentProgressReports(currentSlug);

  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Navigasi antar progress"
      className="report-no-print grid gap-3 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.route}
          className="group flex min-h-24 items-center gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-left shadow-[0_12px_32px_rgba(1,34,98,0.045)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 sm:p-5"
        >
          <ArrowLeft
            className="h-5 w-5 shrink-0 text-brand"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <span>
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Progress sebelumnya
            </span>
            <span className="mt-1 block text-sm font-semibold leading-6 text-ink group-hover:text-brand sm:text-base">
              {previous.title}
            </span>
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={next.route}
          className="group flex min-h-24 items-center justify-between gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-left shadow-[0_12px_32px_rgba(1,34,98,0.045)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 sm:p-5"
        >
          <span>
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Progress berikutnya
            </span>
            <span className="mt-1 block text-sm font-semibold leading-6 text-ink group-hover:text-brand sm:text-base">
              {next.title}
            </span>
          </span>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-brand"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </nav>
  );
}
