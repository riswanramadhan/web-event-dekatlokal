import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Circle,
  Download,
  EmptyPage,
  Link as LinkIcon,
  NavArrowRight,
  Quote,
} from "iconoir-react";
import Link from "next/link";
import { Fragment } from "react";

import type {
  GepWeekOneReport,
  ReportBlock,
  ReportSection as ReportSectionData,
} from "@/data/gep-week-1-reports";
import type { ProgressReportSlug } from "@/data/progress-reports";

import {
  CopyProgressDescriptionButton,
  CopyReportLinkButton,
  PrintReportButton,
} from "./report-actions";
import { ProjectTimeline } from "./project-timeline";
import {
  AdjacentProgressNavigation,
  ProgressReportNavigation,
} from "./progress-navigation";

const eventRoute = "/ai-co-creation-lab-makassar";
const evidenceEmptyMessage =
  "Dokumentasi akan ditambahkan setelah proses terkait diselesaikan.";

type TableAlignment = "left" | "center" | "right";

const tableAlignmentClasses: Record<TableAlignment, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function InlineText({ text }: { text: string }) {
  const segments = text.split(/(`[^`]+`)/g);

  return (
    <>
      {segments.map((segment, index) => {
        const isInlineCode =
          segment.length >= 2 &&
          segment.startsWith("`") &&
          segment.endsWith("`");

        return isInlineCode ? (
          <code
            key={`${segment}-${index}`}
            className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-brand-800"
          >
            {segment.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={`text-${index}`}>{segment}</Fragment>
        );
      })}
    </>
  );
}

export function ReportPrintStyles() {
  return (
    <style>{`
      @media print {
        @page {
          size: A4;
          margin: 13mm;
        }

        html,
        body {
          background: #ffffff !important;
          color: #111827 !important;
        }

        body {
          padding-bottom: 0 !important;
        }

        body > header,
        body > footer,
        body > nav,
        .report-actions,
        .report-action,
        .report-no-print,
        [data-report-action] {
          display: none !important;
        }

        main#main-content {
          display: block !important;
        }

        .progress-report {
          overflow: visible !important;
          background: #ffffff !important;
        }

        .progress-report [data-aos] {
          opacity: 1 !important;
          transform: none !important;
        }

        .progress-report .page-container {
          max-width: none !important;
          padding-inline: 0 !important;
        }

        .progress-report-header {
          border-bottom: 1px solid #dbe3ef !important;
          padding-block: 0 8mm !important;
          background: #ffffff !important;
        }

        .progress-report-content {
          padding-block: 8mm 0 !important;
        }

        .progress-report-decoration {
          display: none !important;
        }

        .report-card,
        .report-section {
          border-color: #dbe3ef !important;
          background: #ffffff !important;
          box-shadow: none !important;
        }

        .report-card,
        .report-section,
        .project-timeline-overview,
        .project-timeline-item,
        .report-section h2,
        .report-section h3,
        .report-section blockquote,
        .report-output-item,
        .report-definition-item,
        tr {
          break-inside: avoid-page;
        }

        .report-table-wrap {
          overflow: visible !important;
          border: 1px solid #dbe3ef !important;
        }

        .report-table {
          width: 100% !important;
          min-width: 100% !important;
          table-layout: fixed;
          font-size: 8.5pt !important;
        }

        .report-table th,
        .report-table td {
          padding: 5pt !important;
          overflow-wrap: anywhere;
        }

        .print-only {
          display: block !important;
        }

        .progress-report a {
          color: inherit !important;
          text-decoration: none !important;
        }
      }
    `}</style>
  );
}

export function ProgressReportBreadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb laporan" className="report-no-print">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-slate-500 sm:gap-2">
        <li>
          <Link
            href="/events"
            className="rounded-sm transition-colors hover:text-brand"
          >
            Event
          </Link>
        </li>
        <li aria-hidden="true">
          <NavArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </li>
        <li>
          <Link
            href={eventRoute}
            className="rounded-sm transition-colors hover:text-brand"
          >
            AI Co-Creation Lab
          </Link>
        </li>
        <li aria-hidden="true">
          <NavArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </li>
        <li className="text-brand" aria-current="page">
          <span className="normal-case tracking-normal">
            <InlineText text={title} />
          </span>
        </li>
      </ol>
    </nav>
  );
}

type ReportStatusTone = "green" | "amber" | "blue" | "neutral";

const reportStatusToneClasses: Record<ReportStatusTone, string> = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
  blue: "border-brand-200 bg-brand-50 text-brand-800",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function StatusBadge({
  status,
  tone,
}: {
  status: string;
  tone?: ReportStatusTone;
}) {
  const isCompleted = status.toLowerCase().includes("completed");
  const Icon = isCompleted ? CheckCircle : Circle;
  const inferredTone: ReportStatusTone = isCompleted ? "green" : "blue";

  return (
    <span
      className={`inline-flex min-h-9 max-w-full flex-wrap items-center gap-2 rounded-2xl border px-3.5 py-1.5 text-xs font-semibold sm:rounded-full ${reportStatusToneClasses[tone ?? inferredTone]}`}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.9} aria-hidden="true" />
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] opacity-75">
        Status
      </span>
      <span>
        <InlineText text={status} />
      </span>
    </span>
  );
}

export function NextStepCard({ nextStep }: { nextStep: string }) {
  return (
    <div className="report-card rounded-2xl border border-brand-100 bg-white p-4 shadow-[0_12px_32px_rgba(1,34,98,0.06)] sm:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <ArrowRight className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Tahap selanjutnya
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-6 text-ink sm:text-base">
            <InlineText text={nextStep} />
          </p>
        </div>
      </div>
    </div>
  );
}

function UpdatedAtCard({
  updatedAt,
  updatedAtIso,
}: {
  updatedAt: string;
  updatedAtIso: string;
}) {
  return (
    <div className="report-card rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(1,34,98,0.05)] sm:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Calendar className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
        </span>
        <div>
          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Terakhir diperbarui
          </p>
          <time
            dateTime={updatedAtIso}
            className="mt-1.5 block text-sm font-semibold leading-6 text-ink sm:text-base"
          >
            {updatedAt}
          </time>
        </div>
      </div>
    </div>
  );
}

export interface ProgressReportHeaderData {
  readonly slug: ProgressReportSlug;
  readonly title: string;
  readonly weekLabel: string;
  readonly phase: string;
  readonly subtitle: string;
  readonly status: string;
  readonly statusTone?: ReportStatusTone;
  readonly nextStep: string;
  readonly updatedAt: string;
  readonly updatedAtIso: string;
  readonly progressUrl: string;
  readonly download?: {
    readonly href: string;
    readonly label: string;
  };
}

export function ProgressReportHeader({
  report,
}: {
  report: ProgressReportHeaderData;
}) {
  return (
    <header className="progress-report-header relative overflow-hidden border-b border-brand-100 bg-white py-10 sm:py-14 lg:py-16">
      <div
        className="progress-report-decoration dot-grid absolute inset-y-0 right-0 w-[55%] opacity-35"
        aria-hidden="true"
      />
      <div
        className="progress-report-decoration absolute inset-x-0 top-0 h-px bg-brand"
        aria-hidden="true"
      />

      <div className="page-container relative">
        <div className="mx-auto max-w-5xl">
          <ProgressReportBreadcrumb title={report.title} />

          <Link
            href={eventRoute}
            className="report-no-print mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_8px_22px_rgba(1,34,98,0.05)] transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand sm:mt-9"
          >
            <ArrowLeft
              className="h-4 w-4 shrink-0"
              strokeWidth={1.9}
              aria-hidden="true"
            />
            Kembali ke event
          </Link>

          <div className="mt-8 max-w-4xl sm:mt-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex min-h-8 items-center rounded-full bg-brand px-3 py-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white">
                {report.weekLabel}
              </span>
              <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-brand-700">
                {report.phase}
              </span>
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.052em] text-ink sm:text-5xl lg:text-[3.65rem]">
              <InlineText text={report.title} />
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:mt-6 sm:text-lg">
              <InlineText text={report.subtitle} />
            </p>

            <div className="mt-6">
              <StatusBadge status={report.status} tone={report.statusTone} />
            </div>
          </div>

          <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4">
            <NextStepCard nextStep={report.nextStep} />
            <UpdatedAtCard
              updatedAt={report.updatedAt}
              updatedAtIso={report.updatedAtIso}
            />
          </div>

          <div className="report-actions report-no-print mt-8 flex max-w-5xl flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-start">
            <CopyReportLinkButton url={report.progressUrl} />
            {report.download ? (
              <ReportDownloadLink
                href={report.download.href}
                label={report.download.label}
              />
            ) : null}
            <PrintReportButton />
          </div>

          <ProgressReportNavigation currentSlug={report.slug} />
        </div>
      </div>
    </header>
  );
}

export function ReportDownloadLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      download
      aria-label={label}
      className="report-action inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand shadow-[0_8px_22px_rgba(1,34,98,0.06)] transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 hover:shadow-[0_12px_26px_rgba(1,34,98,0.1)] active:translate-y-0 sm:w-auto"
      data-report-action
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

export function ResponsiveReportTable({
  headers,
  rows,
  align,
  label = "Tabel laporan",
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  align?: readonly TableAlignment[];
  label?: string;
}) {
  const minimumWidth = `${Math.max(36, headers.length * 13)}rem`;

  return (
    <div>
      <p className="report-no-print mb-2 font-mono text-[0.65rem] text-slate-500 sm:hidden">
        Geser tabel secara horizontal untuk melihat seluruh kolom.
      </p>
      <div
        className="report-table-wrap max-w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <table
          className="report-table w-full border-separate border-spacing-0 text-sm leading-6"
          style={{ minWidth: minimumWidth }}
        >
          <thead>
            <tr>
              {headers.map((header, index) => {
                const alignment = align?.[index] ?? "left";

                return (
                  <th
                    key={`${header}-${index}`}
                    scope="col"
                    className={`border-b border-brand-100 bg-brand-50 px-4 py-3.5 font-semibold text-brand-900 first:rounded-tl-[0.9rem] last:rounded-tr-[0.9rem] sm:px-5 ${
                      tableAlignmentClasses[alignment]
                    }`}
                  >
                    <InlineText text={header} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className="odd:bg-white even:bg-slate-50/65"
              >
                {row.map((cell, cellIndex) => {
                  const alignment = align?.[cellIndex] ?? "left";

                  return (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={`border-b border-slate-100 px-4 py-3.5 align-top text-slate-700 last:border-r-0 sm:px-5 ${
                        tableAlignmentClasses[alignment]
                      }`}
                    >
                      <InlineText text={cell} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportBlockView({
  block,
  sectionTitle,
}: {
  block: ReportBlock;
  sectionTitle: string;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="whitespace-pre-line text-[0.94rem] leading-7 text-slate-700 sm:text-base sm:leading-8">
          <InlineText text={block.text} />
        </p>
      );

    case "bullet-list":
      return (
        <ul className="ml-5 list-disc space-y-2.5 text-[0.94rem] leading-7 text-slate-700 marker:text-brand sm:text-base">
          {block.items.map((item, index) => (
            <li key={`${item}-${index}`} className="pl-1.5">
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );

    case "numbered-list":
      return (
        <ol className="ml-6 list-decimal space-y-2.5 text-[0.94rem] leading-7 text-slate-700 marker:font-mono marker:font-semibold marker:text-brand sm:text-base">
          {block.items.map((item, index) => (
            <li key={`${item}-${index}`} className="pl-1.5">
              <InlineText text={item} />
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <ResponsiveReportTable
          headers={block.headers}
          rows={block.rows}
          align={block.align}
          label={`Tabel ${sectionTitle}`}
        />
      );

    case "quote":
      return (
        <blockquote className="relative overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/70 px-5 py-5 text-base font-medium leading-8 text-brand-900 sm:px-6 sm:py-6 sm:text-lg">
          <Quote
            className="absolute right-4 top-3 h-9 w-9 text-brand-200"
            strokeWidth={1.4}
            aria-hidden="true"
          />
          <p className="relative pr-6">
            <InlineText text={block.text} />
          </p>
        </blockquote>
      );

    case "subheading":
      return (
        <h3 className="pt-2 text-xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-2xl">
          <InlineText text={block.text} />
        </h3>
      );

    case "featured-heading":
      return (
        <h3 className="rounded-2xl border border-brand-100 bg-brand-50 px-5 py-5 text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-brand-900 sm:px-6 sm:text-3xl">
          <InlineText text={block.text} />
        </h3>
      );

    case "definition-list":
      return (
        <dl className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/45">
          {block.items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="report-definition-item grid gap-1.5 border-b border-slate-200 px-4 py-4 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-5 sm:px-5"
            >
              <dt className="text-sm font-semibold leading-6 text-ink">
                <InlineText text={item.label} />
              </dt>
              <dd className="text-sm leading-6 text-slate-700 sm:text-base">
                <InlineText text={item.value} />
              </dd>
            </div>
          ))}
        </dl>
      );

    case "project-timeline":
      return <ProjectTimeline items={block.items} />;
  }
}

export function ReportSection({
  section,
}: {
  section: ReportSectionData;
}) {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      className="report-section scroll-mt-28 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_16px_42px_rgba(1,34,98,0.055)] sm:px-7 sm:py-8 lg:px-9"
      aria-labelledby={headingId}
    >
      <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5 sm:mb-7">
        <span
          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand shadow-[0_0_0_5px_rgba(2,85,245,0.09)]"
          aria-hidden="true"
        />
        <h2
          id={headingId}
          className="text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl"
        >
          <InlineText text={section.title} />
        </h2>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {section.blocks.map((block, index) => (
          <ReportBlockView
            key={`${section.id}-${block.type}-${index}`}
            block={block}
            sectionTitle={section.title}
          />
        ))}
      </div>
    </section>
  );
}

export function LeadershipReflectionCard({
  reflection,
}: {
  reflection: GepWeekOneReport["leadershipReflection"];
}) {
  return (
    <section
      className="report-section report-card rounded-[1.5rem] border border-brand-200 bg-brand-50/65 px-5 py-6 shadow-[0_16px_42px_rgba(1,34,98,0.055)] sm:px-7 sm:py-8 lg:px-9"
      aria-labelledby="leadership-reflection-heading"
    >
      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
        Leadership insight
      </p>
      <h2
        id="leadership-reflection-heading"
        className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl"
      >
        Refleksi kepemimpinan
      </h2>

      <blockquote className="mt-6 border-l-[3px] border-brand pl-4 text-base font-medium leading-8 text-brand-900 sm:pl-6 sm:text-lg">
        <InlineText text={reflection.quote} />
      </blockquote>

      {reflection.paragraphs.length > 0 ? (
        <div className="mt-6 space-y-4">
          {reflection.paragraphs.map((paragraph, index) => (
            <p
              key={`${paragraph}-${index}`}
              className="text-[0.94rem] leading-7 text-slate-700 sm:text-base sm:leading-8"
            >
              <InlineText text={paragraph} />
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function ReportOutputList({ outputs }: { outputs: readonly string[] }) {
  return (
    <section
      className="report-section report-card rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_16px_42px_rgba(1,34,98,0.055)] sm:px-7 sm:py-8 lg:px-9"
      aria-labelledby="report-output-heading"
    >
      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
        Deliverables
      </p>
      <h2
        id="report-output-heading"
        className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl"
      >
        Output yang telah dihasilkan
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {outputs.map((output, index) => (
          <li
            key={`${output}-${index}`}
            className="report-output-item flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm leading-6 text-slate-700 sm:text-base"
          >
            <CheckCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-brand"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>
              <InlineText text={output} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProgressDescriptionCard({
  description,
}: {
  description: string;
}) {
  return (
    <section
      className="report-section report-card rounded-[1.5rem] border border-brand-200 bg-white px-5 py-6 shadow-[0_18px_48px_rgba(2,85,245,0.08)] sm:px-7 sm:py-8 lg:px-9"
      aria-labelledby="progress-description-heading"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
            Siap disalin
          </p>
          <h2
            id="progress-description-heading"
            className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl"
          >
            Deskripsi Progress Awardee
          </h2>
        </div>
        <div className="report-no-print shrink-0">
          <CopyProgressDescriptionButton text={description} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
        <p className="whitespace-pre-line text-[0.94rem] leading-7 text-slate-700 sm:text-base sm:leading-8">
          <InlineText text={description} />
        </p>
      </div>
    </section>
  );
}

export function EvidenceEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/65 px-5 py-8 text-center sm:px-8 sm:py-10">
      <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand shadow-[0_8px_24px_rgba(1,34,98,0.07)]">
        <EmptyPage className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
        {evidenceEmptyMessage}
      </p>
    </div>
  );
}

export function ProgressUrlCard({ url }: { url: string }) {
  return (
    <section
      className="report-section report-card rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_16px_42px_rgba(1,34,98,0.055)] sm:px-7 sm:py-8 lg:px-9"
      aria-labelledby="progress-url-heading"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <LinkIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2
            id="progress-url-heading"
            className="text-xl font-semibold tracking-[-0.025em] text-ink sm:text-2xl"
          >
            Pranala/Link Progres
          </h2>
          <a
            href={url}
            className="mt-3 block break-all rounded-lg font-mono text-xs leading-6 text-brand underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-700 sm:text-sm"
          >
            {url}
          </a>
        </div>
      </div>
    </section>
  );
}

function EvidenceSection({
  evidence,
}: {
  evidence: GepWeekOneReport["evidence"];
}) {
  return (
    <section
      className="report-section report-card rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_16px_42px_rgba(1,34,98,0.055)] sm:px-7 sm:py-8 lg:px-9"
      aria-labelledby="evidence-heading"
    >
      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
        Bukti proses
      </p>
      <h2
        id="evidence-heading"
        className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl"
      >
        Evidence
      </h2>
      <div className="mt-6">
        {evidence.length === 0 ? (
          <EvidenceEmptyState />
        ) : (
          <ul className="grid gap-3">
            {evidence.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm font-semibold leading-6 text-brand transition hover:border-brand-200 hover:bg-brand-50 sm:text-base"
                >
                  <LinkIcon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-words">
                    <InlineText text={item.label} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function PrintReportFooter({
  progressUrl,
  updatedAt,
  updatedAtIso,
}: {
  progressUrl: string;
  updatedAt: string;
  updatedAtIso: string;
}) {
  return (
    <footer className="print-only mt-8 hidden border-t border-slate-300 pt-4 font-mono text-[9pt] leading-5 text-slate-600">
      <p>
        URL laporan: <span>{progressUrl}</span>
      </p>
      <p>
        Terakhir diperbarui:{" "}
        <time dateTime={updatedAtIso}>{updatedAt}</time>
      </p>
    </footer>
  );
}

export function ProgressReportPage({
  report,
}: {
  report: GepWeekOneReport;
}) {
  return (
    <article className="progress-report relative isolate overflow-hidden bg-[#f8fbff]">
      <ReportPrintStyles />
      <ProgressReportHeader report={report} />

      <div className="progress-report-content page-container relative py-10 sm:py-14 lg:py-16">
        <div
          className="progress-report-decoration dot-grid pointer-events-none absolute inset-y-0 left-0 w-40 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl space-y-5 sm:space-y-6">
          {report.sections.map((section) => (
            <ReportSection key={section.id} section={section} />
          ))}

          <LeadershipReflectionCard
            reflection={report.leadershipReflection}
          />
          <ReportOutputList outputs={report.outputs} />
          <ProgressDescriptionCard description={report.progressDescription} />
          <ProgressUrlCard url={report.progressUrl} />
          <EvidenceSection evidence={report.evidence} />

          <AdjacentProgressNavigation currentSlug={report.slug} />

          <PrintReportFooter
            progressUrl={report.progressUrl}
            updatedAt={report.updatedAt}
            updatedAtIso={report.updatedAtIso}
          />
        </div>
      </div>
    </article>
  );
}

export type { GepWeekOneReport, ReportBlock, ReportSectionData };
