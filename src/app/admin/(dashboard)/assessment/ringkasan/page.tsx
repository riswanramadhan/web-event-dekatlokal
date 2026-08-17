import { ArrowRight } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PrintPageButton } from "@/components/admin/print-button";
import { Card, PageHeader, StatCard } from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import {
  formatKnowledgeGain,
  formatPercentMean,
  formatScale,
  formatScaleChange,
} from "@/lib/assessment/score-format";
import {
  getAssessmentSummary,
  type CapabilityRow,
  type PostProgramRow,
  type StewardRow,
} from "@/lib/assessment/summary";

import { AssessmentTabs } from "../assessment-tabs";
import { PrintHeader } from "../print-header";

export const metadata: Metadata = {
  title: "Ringkasan",
  robots: { index: false, follow: false },
};

/**
 * Sel kosong berarti belum ada datanya — berbeda arti dari nol, jadi strip ini
 * teks yang harus terbaca dan bukan hiasan.
 */
function Value({ text }: { text: string }) {
  return text === "" ? <span className="text-slate-500">—</span> : <>{text}</>;
}

function changeTone(value: number | null): string {
  if (value === null) return "text-slate-500";
  if (value > 0) return "text-emerald-700";
  if (value < 0) return "text-amber-700";
  return "text-slate-600";
}

function CapabilityTable({ rows }: { rows: CapabilityRow[] }) {
  return (
    <>
      <table className="hidden w-full text-left text-sm md:table">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <th className="py-2 pr-4 font-medium">Dimensi</th>
            <th className="px-4 py-2 font-medium">Pre</th>
            <th className="px-4 py-2 font-medium">Post</th>
            <th className="px-4 py-2 font-medium">Perubahan</th>
            <th className="py-2 pl-4 font-medium">Peserta</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={row.label} className={index === 0 ? "font-medium" : ""}>
              <td className="py-3 pr-4 text-ink">{row.label}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-700">
                <Value text={formatScale(row.pre)} />
              </td>
              <td className="px-4 py-3 font-mono text-xs text-slate-700">
                <Value text={formatScale(row.post)} />
              </td>
              <td
                className={`px-4 py-3 font-mono text-xs font-semibold ${changeTone(row.change)}`}
              >
                <Value text={formatScaleChange(row.change)} />
              </td>
              <td className="py-3 pl-4 text-xs text-slate-500">
                {row.pairedCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li
            key={row.label}
            className="rounded-xl border border-slate-200 px-3 py-2.5"
          >
            <p className="text-sm font-medium text-ink">{row.label}</p>
            <p className="mt-1 font-mono text-xs text-slate-700">
              <Value text={formatScale(row.pre)} /> →{" "}
              <Value text={formatScale(row.post)} />{" "}
              <span className={`font-semibold ${changeTone(row.change)}`}>
                {formatScaleChange(row.change)}
              </span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {row.pairedCount} peserta punya kedua angka
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function PostProgramList({ rows }: { rows: PostProgramRow[] }) {
  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li key={row.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
          <p className="text-sm leading-6 text-ink">{row.prompt}</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-xs">
            <span className="text-slate-500">
              Rata-rata{" "}
              <span className="font-mono text-sm font-semibold text-ink">
                <Value text={formatScale(row.mean)} />
              </span>{" "}
              dari 5
            </span>
            <span className="text-slate-500">
              Setuju + Sangat Setuju{" "}
              <span className="font-mono text-sm font-semibold text-ink">
                {row.agreeShare === null ? "—" : `${row.agreeShare}%`}
              </span>{" "}
              ({row.agreeCount} dari {row.responseCount})
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StewardList({
  rows,
  respondents,
}: {
  rows: StewardRow[];
  respondents: number;
}) {
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span className="text-sm text-ink">{row.label}</span>
            <span className="font-mono text-xs text-slate-600">
              {row.count} peserta
              {row.share === null ? "" : ` · ${row.share}%`}
            </span>
          </div>
          <div
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${row.share ?? 0}%` }}
            />
          </div>
        </li>
      ))}
      <li className="pt-1 text-xs text-slate-500">
        Persentase dihitung dari {respondents} peserta yang menjawab pertanyaan
        ini, bukan dari seluruh pendaftar.
      </li>
    </ul>
  );
}

export default async function AssessmentSummaryPage() {
  // Re-checked per page rather than relying only on the layout: client-side
  // navigation can render a page without re-executing an unchanged layout.
  await requireAdmin();

  const result = await getAssessmentSummary();

  return (
    <div className="assessment-print">
      <div className="print-hidden">
        <PageHeader
          title="Pre-test & Post-test"
          description="Ringkasan lima layer untuk laporan impact. Angka di sini berasal dari perhitungan yang sama dengan tabel Nilai."
          actions={<PrintPageButton label="Unduh PDF" />}
        />

        <AssessmentTabs active="/admin/assessment/ringkasan" />
      </div>

      <PrintHeader title="Ringkasan Pre-test & Post-test" />

      {!result.ok ? (
        <EmptyState title="Gagal memuat ringkasan" description={result.message} />
      ) : (
        <div className="space-y-6">
          {/* Catatan tetap, bukan sekali tampil: halaman inilah yang dikutip ke
              laporan, jadi peringatannya harus ikut terbaca setiap kali. */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs leading-5 text-slate-600">
            Ketiga layer angka di bawah dipakai <strong>berdampingan</strong> dan
            sengaja tidak pernah dijumlahkan menjadi satu nilai akhir. Pemahaman
            mengukur pengetahuan objektif; kapabilitas dan pengalaman setelah
            program adalah penilaian peserta terhadap dirinya sendiri, jadi
            keduanya dilaporkan pada skala 1–5 dan tidak pernah dipersenkan.
          </div>

          <section aria-labelledby="layer-pemahaman">
            <h2
              id="layer-pemahaman"
              className="mb-3 text-sm font-semibold text-ink"
            >
              1. Pemahaman{" "}
              <span className="font-normal text-slate-500">
                — soal pengetahuan, skala 0–100
              </span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Rata-rata pre"
                value={formatPercentMean(result.summary.knowledge.meanPre) || "—"}
                hint={`${result.summary.knowledge.preCount} peserta mengirim pre-test`}
              />
              <StatCard
                label="Rata-rata post"
                value={
                  formatPercentMean(result.summary.knowledge.meanPost) || "—"
                }
                hint={`${result.summary.knowledge.postCount} peserta mengirim post-test`}
                tone="brand"
              />
              <StatCard
                label="Rata-rata kenaikan"
                value={
                  formatKnowledgeGain(result.summary.knowledge.meanGain) || "—"
                }
                hint={`Poin persen, dari ${result.summary.knowledge.pairedCount} peserta yang mengerjakan keduanya`}
                tone="green"
              />
              <StatCard
                label="Peserta meningkat"
                value={
                  result.summary.knowledge.improvedShare === null
                    ? "—"
                    : `${result.summary.knowledge.improvedShare}%`
                }
                hint={`${result.summary.knowledge.improvedCount} dari ${result.summary.knowledge.pairedCount} peserta`}
              />
            </div>
          </section>

          <Card
            title="2. Kapabilitas menurut penilaian sendiri"
            description="Skala 1–5, dua desimal. Kolom perubahan hanya menghitung peserta yang punya angka pre dan post sekaligus — kalau tidak, dua kelompok berbeda yang dibandingkan."
          >
            <CapabilityTable rows={result.summary.capability} />
          </Card>

          <Card
            title="3. Pengalaman setelah program"
            description="Hanya ditanyakan di post-test, jadi tidak punya baseline pre dan tidak pernah dibandingkan pre → post."
          >
            {result.summary.postProgram.length === 0 ? (
              <p className="text-sm text-slate-500">
                Belum ada pernyataan khusus post-test di bank soal.
              </p>
            ) : (
              <PostProgramList rows={result.summary.postProgram} />
            )}
          </Card>

          <Card
            title="4. Minat jadi technical steward"
            description="Kategorikal, jadi dilaporkan sebagai distribusi. Merata-ratakan pilihan ini akan menghasilkan angka yang tidak berarti apa pun."
          >
            {result.summary.steward.length === 0 ? (
              <p className="text-sm text-slate-500">
                Belum ada pertanyaan pilihan tanpa skor di bank soal.
              </p>
            ) : (
              <StewardList
                rows={result.summary.steward}
                respondents={result.summary.stewardRespondents}
              />
            )}
          </Card>

          <Card
            title="5. Dampak kualitatif"
            description="Jawaban refleksi dibaca satu per satu, tidak diringkas otomatis — mengelompokkan tema dengan mesin akan menghasilkan kategori yang tidak pernah dikatakan pesertanya."
          >
            <Link
              href="/admin/assessment/refleksi"
              className="print-hidden inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm font-medium text-brand transition hover:border-brand-200 hover:bg-brand-50"
            >
              Buka jawaban refleksi
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {/* Tautan tidak berarti apa-apa di kertas; PDF refleksi dicetak
                terpisah dari tabnya sendiri. */}
            <p className="print-only text-sm text-slate-600">
              Jawaban refleksi lengkap ada di dokumen terpisah.
            </p>
          </Card>

          <p className="text-xs text-slate-500">
            Dihitung dari {result.summary.participantCount} pendaftar mahasiswa
            yang lolos filter status. Pendaftar UMKM, serta yang berstatus
            ditolak dan mundur, tidak ikut.
          </p>
        </div>
      )}
    </div>
  );
}
