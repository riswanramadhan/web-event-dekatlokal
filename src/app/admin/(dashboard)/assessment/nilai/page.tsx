import type { Metadata } from "next";

import { Card, PageHeader, StatCard, TypeBadge } from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import {
  formatDifference,
  formatPercent,
  formatScoreCell,
  PROGRESS_LABELS,
} from "@/lib/assessment/score-format";
import { listScores, type ParticipantScore } from "@/lib/assessment/scores";

import { AssessmentTabs } from "../assessment-tabs";

import { ExportScoresButton } from "./export-button";

export const metadata: Metadata = {
  title: "Nilai",
  robots: { index: false, follow: false },
};

function differenceTone(difference: number | null): string {
  if (difference === null) {
    return "text-slate-400";
  }

  if (difference > 0) {
    return "text-emerald-700";
  }

  if (difference < 0) {
    return "text-amber-700";
  }

  return "text-slate-600";
}

/** Empty means "never started"; a dash would read as a score of nothing. */
function ScoreCell({ value }: { value: string }) {
  return value === "" ? (
    <span className="text-slate-300">—</span>
  ) : (
    <span className={value === "Sedang mengerjakan" ? "text-amber-700" : ""}>
      {value}
    </span>
  );
}

function ScoreTable({ rows }: { rows: ParticipantScore[] }) {
  return (
    <table className="hidden w-full text-left text-sm md:table">
      <thead>
        <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
          <th className="px-5 py-3 font-medium">Nama</th>
          <th className="px-5 py-3 font-medium">Jenis</th>
          <th className="px-5 py-3 font-medium">Pre-test</th>
          <th className="px-5 py-3 font-medium">Post-test</th>
          <th className="px-5 py-3 font-medium">Selisih</th>
          <th className="px-5 py-3 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row) => (
          <tr key={row.registrationId} className="transition hover:bg-slate-50/70">
            <td className="px-5 py-3.5 font-medium text-ink">{row.fullName}</td>
            <td className="px-5 py-3.5">
              <TypeBadge type={row.registrationType} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-slate-700">
              <ScoreCell value={formatScoreCell(row.pre)} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-slate-700">
              <ScoreCell value={formatScoreCell(row.post)} />
            </td>
            <td
              className={`whitespace-nowrap px-5 py-3.5 font-mono text-xs font-semibold ${differenceTone(
                row.difference,
              )}`}
            >
              {formatDifference(row.difference) || "—"}
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-600">
              {PROGRESS_LABELS[row.progress]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Below 768 px the same rows render as cards. Six columns are unreadable on a
 * phone, and the horizontal-scroll idiom the other admin tables use would make
 * the organiser swipe sideways to compare two numbers.
 */
function ScoreCards({ rows }: { rows: ParticipantScore[] }) {
  return (
    <ul className="space-y-3 md:hidden">
      {rows.map((row) => (
        <li
          key={row.registrationId}
          className="rounded-2xl border border-slate-200 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 flex-1 font-medium text-ink">{row.fullName}</p>
            <TypeBadge type={row.registrationType} />
          </div>

          <dl className="mt-3 grid grid-cols-3 gap-3">
            <div>
              <dt className="text-xs text-slate-500">Pre-test</dt>
              <dd className="mt-0.5 font-mono text-xs text-slate-700">
                <ScoreCell value={formatScoreCell(row.pre)} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Post-test</dt>
              <dd className="mt-0.5 font-mono text-xs text-slate-700">
                <ScoreCell value={formatScoreCell(row.post)} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Selisih</dt>
              <dd
                className={`mt-0.5 font-mono text-xs font-semibold ${differenceTone(
                  row.difference,
                )}`}
              >
                {formatDifference(row.difference) || "—"}
              </dd>
            </div>
          </dl>

          <p className="mt-3 text-xs text-slate-500">
            {PROGRESS_LABELS[row.progress]}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default async function AssessmentScoresPage() {
  // Re-checked per page rather than relying only on the layout: client-side
  // navigation can render a page without re-executing an unchanged layout.
  await requireAdmin();

  const result = await listScores();

  return (
    <>
      <PageHeader
        title="Pre-test & Post-test"
        description="Nilai peserta untuk kedua tes. Pendaftar berstatus ditolak dan mundur tidak muncul di sini maupun di CSV."
      />

      <AssessmentTabs active="/admin/assessment/nilai" />

      {!result.ok ? (
        <EmptyState title="Gagal memuat nilai" description={result.message} />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Rata-rata pre-test"
              value={formatPercent(result.summary.averagePre)}
            />
            <StatCard
              label="Rata-rata post-test"
              value={formatPercent(result.summary.averagePost)}
            />
            <StatCard
              label="Rata-rata kenaikan"
              value={
                result.summary.averageGain === null
                  ? "–"
                  : formatDifference(result.summary.averageGain)
              }
              tone={
                result.summary.averageGain !== null &&
                result.summary.averageGain > 0
                  ? "green"
                  : "neutral"
              }
              hint={`Dari ${result.summary.completedBoth} peserta yang menyelesaikan keduanya`}
            />
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="max-w-md text-xs leading-5 text-slate-500">
              CSV memuat kolom yang sama persis dengan tabel ini, tanpa email dan
              nomor WhatsApp.
            </p>
            <ExportScoresButton disabled={result.rows.length === 0} />
          </div>

          {result.rows.length === 0 ? (
            <EmptyState
              title="Belum ada peserta"
              description="Nilai akan muncul di sini setelah ada pendaftar yang lolos filter status."
            />
          ) : (
            <Card>
              <div className="-mx-5 -my-5 overflow-x-auto md:overflow-visible">
                <div className="p-5 md:p-0">
                  <ScoreCards rows={result.rows} />
                </div>
                <ScoreTable rows={result.rows} />
              </div>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
