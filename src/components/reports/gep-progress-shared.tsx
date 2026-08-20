import {
  ArrowRight,
  CheckCircle,
  Download,
  OpenNewWindow,
} from "iconoir-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { EmptyState } from "@/components/ui/empty-state";

import {
  LeadershipReflectionCard,
  PrintReportFooter,
  ProgressDescriptionCard,
  ProgressReportHeader,
  ProgressUrlCard,
  ReportOutputList,
  ReportPrintStyles,
  type ProgressReportHeaderData,
} from "./progress-report";
import { AdjacentProgressNavigation } from "./progress-navigation";

export const reportSectionClassName =
  "report-section scroll-mt-28 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_16px_42px_rgba(1,34,98,0.055)] sm:px-7 sm:py-8 lg:px-9";

export function ReportSectionCard({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${reportSectionClassName} ${className}`}
    >
      <header className="border-b border-slate-100 pb-5 sm:pb-6">
        {eyebrow ? (
          <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className={`${eyebrow ? "mt-2" : ""} text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {description}
          </p>
        ) : null}
      </header>
      <div className="mt-6 sm:mt-7">{children}</div>
    </section>
  );
}

export function ProcessFlow({
  steps,
  label,
  tone = "blue",
}: {
  steps: readonly string[];
  label: string;
  tone?: "blue" | "green" | "slate";
}) {
  const toneClassNames = {
    blue: "border-brand-100 bg-brand-50 text-brand-900",
    green: "border-emerald-100 bg-emerald-50 text-emerald-900",
    slate: "border-slate-200 bg-slate-50 text-slate-800",
  } as const;

  return (
    <ol
      aria-label={label}
      className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
    >
      {steps.map((step, index) => (
        <li
          key={`${step}-${index}`}
          className="flex min-w-0 flex-col items-center gap-2 sm:flex-row"
        >
          <span
            className={`inline-flex min-h-10 w-full min-w-0 items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-semibold leading-5 sm:w-auto sm:text-sm ${toneClassNames[tone]}`}
          >
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="font-mono text-sm text-slate-400"
            >
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function NumberedEditorialList({
  items,
}: {
  items: readonly {
    readonly number: string;
    readonly title: string;
    readonly description: string;
    readonly label?: string;
    readonly highlight?: string | null;
  }[];
}) {
  return (
    <ol className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item) => (
        <li
          key={`${item.number}-${item.title}`}
          className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr] sm:gap-5 sm:py-6"
        >
          <div>
            <span className="font-mono text-sm font-semibold text-brand">
              {item.number}
            </span>
            {item.label ? (
              <span className="mt-1 block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                {item.label}
              </span>
            ) : null}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-7 tracking-[-0.02em] text-ink sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              {item.description}
            </p>
            {item.highlight ? (
              <p className="mt-3 border-l-2 border-brand pl-4 text-sm font-semibold leading-7 text-brand-900 sm:text-base">
                {item.highlight}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function StatusChip({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "green" | "amber" | "blue" | "neutral";
}) {
  const toneClassNames = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    blue: "border-brand-200 bg-brand-50 text-brand-800",
    neutral: "border-slate-200 bg-slate-50 text-slate-700",
  } as const;

  return (
    <span
      className={`inline-flex min-h-8 max-w-full items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold leading-5 ${toneClassNames[tone]}`}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full bg-current"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

export function EvidenceActions({
  viewHref,
  viewLabel,
  downloadHref,
  downloadLabel,
  external = false,
}: {
  viewHref?: string;
  viewLabel?: string;
  downloadHref?: string;
  downloadLabel?: string;
  external?: boolean;
}) {
  return (
    <div className="report-no-print flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {viewHref && viewLabel ? (
        <a
          href={viewHref}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
        >
          <OpenNewWindow className="h-4 w-4" aria-hidden="true" />
          {viewLabel}
          {external ? (
            <span className="sr-only"> (terbuka di tab baru)</span>
          ) : null}
        </a>
      ) : null}
      {downloadHref && downloadLabel ? (
        <a
          href={downloadHref}
          download
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:w-auto"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {downloadLabel}
        </a>
      ) : null}
    </div>
  );
}

export function DisabledEvidenceActions() {
  return (
    <DisabledFileActions
      viewLabel="View Report"
      downloadLabel="Download Report"
      ariaLabel="Aksi laporan belum tersedia"
    />
  );
}

export function DisabledFileActions({
  viewLabel,
  downloadLabel,
  ariaLabel = "Aksi file belum tersedia",
}: {
  viewLabel: string;
  downloadLabel: string;
  ariaLabel?: string;
}) {
  return (
    <div
      role="group"
      className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
      aria-label={ariaLabel}
    >
      {[viewLabel, downloadLabel].map((label) => (
        <button
          key={label}
          type="button"
          disabled
          className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 sm:w-auto"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export interface EvidenceFileCardProps {
  readonly title: string;
  readonly fileName?: string | null;
  readonly type: string | null;
  readonly description: string;
  readonly status: string;
  readonly date: string | null;
  readonly fileSize: string | null;
  readonly previewHref?: string | null;
  readonly slideCount?: number | null;
  readonly lastUpdated?: string | null;
  readonly viewHref?: string | null;
  readonly downloadHref?: string | null;
  readonly viewLabel?: string;
  readonly downloadLabel?: string;
  readonly statusTone?: "green" | "amber" | "blue" | "neutral";
}

function isExternalFileHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function EvidenceFileCard({
  title,
  fileName = null,
  type,
  description,
  status,
  date,
  fileSize,
  previewHref = null,
  slideCount = null,
  lastUpdated = null,
  viewHref,
  downloadHref,
  viewLabel = "View Report",
  downloadLabel = "Download Report",
  statusTone = "amber",
}: EvidenceFileCardProps) {
  const metadata = [
    { label: "File name", value: fileName },
    { label: "File type", value: type },
    { label: "Date", value: date },
    { label: "File size", value: fileSize },
    {
      label: "Slide count",
      value: slideCount === null ? null : `${slideCount} slides`,
    },
    { label: "Last updated", value: lastUpdated },
  ] as const;
  const viewIsExternal = viewHref ? isExternalFileHref(viewHref) : false;
  const downloadIsExternal = downloadHref
    ? isExternalFileHref(downloadHref)
    : false;

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
        <div className="min-w-0">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Evidence file
          </p>
          <h3 className="mt-2 text-balance text-xl font-semibold leading-7 tracking-[-0.02em] text-ink">
            {title}
          </h3>
        </div>
        <StatusChip tone={statusTone}>{status}</StatusChip>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
        {description}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metadata.map((item) => (
          <div
            key={item.label}
            className="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
              {item.label}
            </dt>
            <dd className="mt-1.5 break-words text-sm font-semibold leading-6 text-ink [overflow-wrap:anywhere]">
              {item.value ?? "Belum tersedia"}
            </dd>
          </div>
        ))}
      </dl>

      {previewHref ? (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <iframe
            src={previewHref}
            title={`PDF preview: ${title}`}
            loading="lazy"
            className="h-[30rem] w-full sm:h-[38rem]"
          />
        </div>
      ) : null}

      <div
        role="group"
        className="report-no-print mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
        aria-label={`Aksi file ${title}`}
      >
        {viewHref ? (
          <a
            href={viewHref}
            target={viewIsExternal ? "_blank" : undefined}
            rel={viewIsExternal ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
          >
            <OpenNewWindow className="h-4 w-4" aria-hidden="true" />
            {viewLabel}
            {viewIsExternal ? (
              <span className="sr-only"> (terbuka di tab baru)</span>
            ) : null}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 sm:w-auto"
          >
            <OpenNewWindow className="h-4 w-4" aria-hidden="true" />
            {viewLabel}
          </button>
        )}

        {downloadHref ? (
          <a
            href={downloadHref}
            download={!downloadIsExternal || undefined}
            target={downloadIsExternal ? "_blank" : undefined}
            rel={downloadIsExternal ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {downloadLabel}
            {downloadIsExternal ? (
              <span className="sr-only"> (terbuka di tab baru)</span>
            ) : null}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {downloadLabel}
          </button>
        )}
      </div>
    </article>
  );
}

export function EvidenceEmptyState({
  title = "Documentation being organized",
  description = "Documentation is being organized and will be updated shortly.",
}: {
  title?: string;
  description?: string;
}) {
  return <EmptyState title={title} description={description} />;
}

export function TransitionCard({
  eyebrow,
  title,
  description,
  href,
  label,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <section className="report-section overflow-hidden rounded-[1.5rem] border border-brand bg-brand px-5 py-7 text-white shadow-[0_18px_46px_rgba(2,85,245,0.2)] sm:px-8 sm:py-9 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
      <div className="max-w-3xl">
        <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-brand-100">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
          {description}
        </p>
      </div>
      <Link
        href={href}
        className="report-no-print mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:bg-brand-50 lg:mt-0 lg:w-auto"
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm leading-6 text-slate-700"
        >
          <CheckCircle
            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PlannedList({
  items,
  label = "Planned",
}: {
  items: readonly string[];
  label?: string;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm leading-6 text-slate-700"
        >
          <span className="flex min-w-0 items-start gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
              aria-hidden="true"
            />
            <span>{item}</span>
          </span>
          <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function GepProgressReportShell({
  header,
  progressDescription,
  outputs,
  reflection,
  children,
  afterSummary,
  deliverablesState = "completed",
}: {
  header: ProgressReportHeaderData;
  progressDescription: string;
  outputs: readonly string[];
  reflection: {
    readonly quote: string;
    readonly paragraphs: readonly string[];
  } | null;
  children: ReactNode;
  afterSummary?: ReactNode;
  deliverablesState?: "completed" | "planned";
}) {
  return (
    <article className="progress-report relative isolate overflow-hidden bg-[#f8fbff]">
      <ReportPrintStyles />
      <ProgressReportHeader report={header} />
      <div className="progress-report-content page-container relative py-10 sm:py-14 lg:py-16">
        <div
          className="progress-report-decoration dot-grid pointer-events-none absolute inset-y-0 left-0 w-40 opacity-20"
          aria-hidden="true"
        />
        <div className="relative space-y-5 sm:space-y-6">
          {children}
          {reflection ? (
            <LeadershipReflectionCard reflection={reflection} />
          ) : null}
          {deliverablesState === "completed" ? (
            <ReportOutputList outputs={outputs} />
          ) : (
            <ReportSectionCard
              id="planned-deliverables"
              eyebrow="Planned Deliverables"
              title="Planned Output Structure"
              description="Daftar berikut merupakan struktur output yang sedang disiapkan, bukan hasil final yang sudah tersedia."
            >
              <PlannedList items={outputs} label="Planned" />
            </ReportSectionCard>
          )}
          <ProgressDescriptionCard description={progressDescription} />
          <ProgressUrlCard url={header.progressUrl} />
          {afterSummary}
          <AdjacentProgressNavigation currentSlug={header.slug} />
          <PrintReportFooter
            progressUrl={header.progressUrl}
            updatedAt={header.updatedAt}
            updatedAtIso={header.updatedAtIso}
          />
        </div>
      </div>
    </article>
  );
}
