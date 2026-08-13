"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
} from "iconoir-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  getAdjacentProgressReports,
  progressReports,
  type ProgressNavigationSlug,
} from "@/data/progress-reports";

type ProgressStatusKind = "completed" | "in_progress" | "planned";

function getProgressStatusKind(status: string): ProgressStatusKind {
  const normalizedStatus = status.trim().toLowerCase();

  if (
    normalizedStatus.includes("to be completed") ||
    normalizedStatus.includes("preparation") ||
    normalizedStatus.includes("planned") ||
    normalizedStatus.includes("pending")
  ) {
    return "planned";
  }

  if (
    normalizedStatus.includes("in progress") ||
    normalizedStatus.includes("data collection") ||
    normalizedStatus.includes("finalization") ||
    normalizedStatus.includes("documentation") ||
    normalizedStatus.includes("being prepared") ||
    normalizedStatus.includes("framework development")
  ) {
    return "in_progress";
  }

  return normalizedStatus.includes("completed") ? "completed" : "in_progress";
}

const progressStatusStyles = {
  completed: {
    icon: CheckCircle,
    textClassName: "text-emerald-700",
  },
  in_progress: {
    icon: Clock,
    textClassName: "text-amber-700",
  },
  planned: {
    icon: Circle,
    textClassName: "text-slate-600",
  },
} as const satisfies Record<
  ProgressStatusKind,
  {
    readonly icon: typeof Circle;
    readonly textClassName: string;
  }
>;

export function ProgressReportNavigation({
  currentSlug,
  weekHint,
  className = "report-no-print mt-8 max-w-5xl border-t border-slate-200 pt-6",
  showLabel = true,
}: {
  currentSlug?: ProgressNavigationSlug;
  weekHint?: string;
  className?: string;
  showLabel?: boolean;
}) {
  const currentReport = progressReports.find(
    (report) => report.slug === currentSlug,
  );
  const availableWeeks = useMemo(
    () =>
      Array.from(new Set(progressReports.map((report) => report.weekLabel))),
    [],
  );
  const [selectedWeek, setSelectedWeek] = useState(
    currentReport?.weekLabel ?? weekHint ?? "Semua",
  );
  const filteredReports =
    selectedWeek === "Semua"
      ? progressReports
      : progressReports.filter((report) => report.weekLabel === selectedWeek);

  return (
    <nav
      aria-label="Daftar progress AI Co-Creation Lab Makassar"
      className={className}
    >
      {showLabel ? (
        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Progress report
        </p>
      ) : null}

      <div
        role="group"
        className={`${showLabel ? "mt-3" : ""} flex flex-wrap gap-2`}
        aria-label="Filter progress berdasarkan week"
      >
        {["Semua", ...availableWeeks].map((week) => {
          const isSelected = selectedWeek === week;
          const count =
            week === "Semua"
              ? progressReports.length
              : progressReports.filter((report) => report.weekLabel === week)
                  .length;

          return (
            <button
              key={week}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedWeek(week)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition ${
                isSelected
                  ? "border-brand bg-brand text-white shadow-[0_8px_20px_rgba(2,85,245,0.16)]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
              }`}
            >
              {week}
              <span
                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-[0.58rem] ${
                  isSelected
                    ? "bg-white/15 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500" aria-live="polite">
        Menampilkan {filteredReports.length} progress pada {selectedWeek}.
      </p>

      <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => {
          const isCurrent = report.slug === currentSlug;
          const statusKind = getProgressStatusKind(report.status);
          const statusStyle = progressStatusStyles[statusKind];
          const Icon = statusStyle.icon;
          const reportIndex = progressReports.findIndex(
            (item) => item.slug === report.slug,
          );

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
                  {reportIndex + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`flex items-center gap-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] ${
                      isCurrent ? "text-white/90" : "text-slate-500"
                    }`}
                  >
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {report.weekLabel}
                  </span>
                  <span className="mt-1 block text-xs font-semibold leading-5">
                    {report.title}
                  </span>
                  <span
                    className={`mt-1.5 block text-[0.68rem] font-medium leading-4 ${
                      isCurrent ? "text-white/90" : statusStyle.textClassName
                    }`}
                  >
                    {report.status}
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
  currentSlug: ProgressNavigationSlug;
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
