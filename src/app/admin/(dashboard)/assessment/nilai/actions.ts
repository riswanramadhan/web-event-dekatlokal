"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { ASSESSMENT_REPORT_DATE } from "@/lib/assessment/report-date";
import {
  dimensionMean,
  formatKnowledge,
  formatKnowledgeGain,
  formatRegistrationType,
  formatScale,
  formatScaleChange,
  PROGRESS_LABELS,
} from "@/lib/assessment/score-format";
import { listScores } from "@/lib/assessment/scores";

/**
 * RFC 4180 quoting: wrap anything containing a delimiter, quote or newline, and
 * double the quotes inside. Participant names are free text, so this is not
 * optional.
 */
function escapeCsv(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

export type ExportOutcome =
  | { ok: true; filename: string; content: string }
  | { ok: false; message: string };

/**
 * Satu baris per peserta, dengan layer dipisahkan sesuai Panduan Scoring §9.
 * **Tidak ada kolom yang menjumlahkan pemahaman dengan kapabilitas** — §8
 * melarang nilai akhir gabungan, dan file inilah yang paling mungkin dijadikan
 * dasar laporan.
 *
 * Email dan WhatsApp tidak ada karena `listScores` memang tidak memilihnya.
 */
export async function exportScoresAction(): Promise<ExportOutcome> {
  await requireAdmin();

  const result = await listScores();

  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  const headers = [
    "Nama",
    "Jenis",
    "Pemahaman pre (0-100)",
    "Pemahaman post (0-100)",
    "Selisih pemahaman",
    "Kapabilitas pre (1-5)",
    "Kapabilitas post (1-5)",
    "Perubahan kapabilitas",
    ...result.dimensions.flatMap((dimension) => [
      `${dimension} pre (1-5)`,
      `${dimension} post (1-5)`,
      `${dimension} perubahan`,
    ]),
    "Pengalaman setelah program (1-5)",
    "Status",
  ];

  const lines = [
    // Header dikutip dengan aturan yang sama seperti isi: nama dimensi adalah
    // teks bebas dari admin, dan satu koma di dalamnya menggeser seluruh kolom.
    headers.map(escapeCsv).join(","),
    ...result.rows.map((row) => {
      const dimensionCells = result.dimensions.flatMap((dimension) => {
        const pre = dimensionMean(row.capabilityPre, dimension);
        const post = dimensionMean(row.capabilityPost, dimension);

        return [
          formatScale(pre),
          formatScale(post),
          pre !== null && post !== null
            ? formatScaleChange(Math.round((post - pre) * 100) / 100)
            : "",
        ];
      });

      return [
        row.fullName,
        formatRegistrationType(row.registrationType),
        formatKnowledge(row.knowledgePre),
        formatKnowledge(row.knowledgePost),
        formatKnowledgeGain(row.knowledgeGain),
        formatScale(row.capabilityPre?.overall),
        formatScale(row.capabilityPost?.overall),
        formatScaleChange(row.capabilityChange),
        ...dimensionCells,
        formatScale(row.postProgramMean),
        PROGRESS_LABELS[row.progress],
      ]
        .map(escapeCsv)
        .join(",");
    }),
  ];

  return {
    ok: true,
    // Tanggal acara, bukan tanggal unduh: dua ekspor di hari berbeda tidak boleh
    // terbaca sebagai dua rentang data yang berbeda. Lihat `report-date.ts`.
    filename: `nilai-pre-post-test-${ASSESSMENT_REPORT_DATE}.csv`,
    // Leading BOM so spreadsheets open it as UTF-8 instead of guessing.
    content: `﻿${lines.join("\r\n")}\r\n`,
  };
}
