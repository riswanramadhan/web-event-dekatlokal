import type { Metadata } from "next";

import { Card, PageHeader, TypeBadge } from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import {
  formatKnowledge,
  formatKnowledgeGain,
  formatScale,
  formatScaleChange,
  PROGRESS_LABELS,
} from "@/lib/assessment/score-format";
import { listScores, type ParticipantScore } from "@/lib/assessment/scores";

import { AssessmentTabs } from "../assessment-tabs";

import { ExportScoresButton } from "./export-button";

export const metadata: Metadata = {
  title: "Nilai",
  robots: { index: false, follow: false },
};

function changeTone(value: number | null): string {
  if (value === null) return "text-slate-500";
  if (value > 0) return "text-emerald-700";
  if (value < 0) return "text-amber-700";
  return "text-slate-600";
}

/**
 * Sel kosong berarti belum mengerjakan — berbeda arti dari nol, jadi strip ini
 * teks yang harus terbaca dan bukan hiasan. slate-300 sebelumnya hanya 1,5:1.
 */
function Cell({ value }: { value: string }) {
  return value === "" ? <span className="text-slate-500">—</span> : <>{value}</>;
}

function ScoreTable({ rows }: { rows: ParticipantScore[] }) {
  return (
    <table className="hidden w-full text-left text-sm md:table">
      <thead>
        <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
          <th className="px-5 py-3 font-medium">Nama</th>
          <th className="px-5 py-3 font-medium">Jenis</th>
          <th className="px-5 py-3 font-medium" colSpan={3}>
            Pemahaman <span className="normal-case text-slate-500">(0–100)</span>
          </th>
          <th className="px-5 py-3 font-medium" colSpan={3}>
            Kapabilitas <span className="normal-case text-slate-500">(1–5)</span>
          </th>
          <th className="px-5 py-3 font-medium">Status</th>
        </tr>
        <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-500">
          <th className="px-5 pb-2" />
          <th className="px-5 pb-2" />
          <th className="px-5 pb-2 font-medium">Pre</th>
          <th className="px-5 pb-2 font-medium">Post</th>
          <th className="px-5 pb-2 font-medium">Selisih</th>
          <th className="px-5 pb-2 font-medium">Pre</th>
          <th className="px-5 pb-2 font-medium">Post</th>
          <th className="px-5 pb-2 font-medium">Ubah</th>
          <th className="px-5 pb-2" />
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row) => (
          <tr
            key={row.registrationId}
            className="transition hover:bg-slate-50/70"
          >
            <td className="px-5 py-3.5 font-medium text-ink">{row.fullName}</td>
            <td className="px-5 py-3.5">
              <TypeBadge type={row.registrationType} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-slate-700">
              <Cell value={formatKnowledge(row.knowledgePre)} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-slate-700">
              <Cell value={formatKnowledge(row.knowledgePost)} />
            </td>
            <td
              className={`whitespace-nowrap px-5 py-3.5 font-mono text-xs font-semibold ${changeTone(row.knowledgeGain)}`}
            >
              <Cell value={formatKnowledgeGain(row.knowledgeGain)} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-slate-700">
              <Cell value={formatScale(row.capabilityPre?.overall)} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-slate-700">
              <Cell value={formatScale(row.capabilityPost?.overall)} />
            </td>
            <td
              className={`whitespace-nowrap px-5 py-3.5 font-mono text-xs font-semibold ${changeTone(row.capabilityChange)}`}
            >
              <Cell value={formatScaleChange(row.capabilityChange)} />
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
 * Di bawah 768 px baris yang sama jadi kartu. Delapan kolom tidak terbaca di
 * ponsel, dan idiom scroll horizontal yang dipakai tabel admin lain memaksa
 * panitia menggeser ke samping hanya untuk membandingkan dua angka.
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

          <dl className="mt-3 space-y-2 text-xs">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-500">Pemahaman (0–100)</dt>
              <dd className="font-mono text-slate-700">
                <Cell value={formatKnowledge(row.knowledgePre)} /> →{" "}
                <Cell value={formatKnowledge(row.knowledgePost)} />{" "}
                <span className={`font-semibold ${changeTone(row.knowledgeGain)}`}>
                  {formatKnowledgeGain(row.knowledgeGain)}
                </span>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-500">Kapabilitas (1–5)</dt>
              <dd className="font-mono text-slate-700">
                <Cell value={formatScale(row.capabilityPre?.overall)} /> →{" "}
                <Cell value={formatScale(row.capabilityPost?.overall)} />{" "}
                <span
                  className={`font-semibold ${changeTone(row.capabilityChange)}`}
                >
                  {formatScaleChange(row.capabilityChange)}
                </span>
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
        description="Pendaftar berstatus ditolak dan mundur tidak muncul di sini maupun di CSV."
      />

      <AssessmentTabs active="/admin/assessment/nilai" />

      {!result.ok ? (
        <EmptyState title="Gagal memuat nilai" description={result.message} />
      ) : (
        <div className="space-y-6">
          {/* Panduan Scoring §8: ketiga layer dipakai berdampingan, tidak
              dijumlahkan jadi satu nilai akhir. */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs leading-5 text-slate-600">
            <strong className="font-semibold text-ink">Pemahaman</strong> berasal
            dari soal pengetahuan dan boleh disebut nilai.{" "}
            <strong className="font-semibold text-ink">Kapabilitas</strong>{" "}
            berasal dari pernyataan skala — itu persepsi peserta terhadap
            kemampuannya sendiri, bukan kemampuan objektif, jadi jangan
            dipersenkan. Keduanya sengaja tidak dijumlahkan.
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="max-w-md text-xs leading-5 text-slate-500">
              CSV membawa kolom yang sama plus rincian per dimensi, tanpa email
              dan nomor WhatsApp.
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
