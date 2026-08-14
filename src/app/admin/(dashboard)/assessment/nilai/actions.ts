"use server";

import { requireAdmin } from "@/lib/admin/auth";
import {
  formatDifference,
  formatRegistrationType,
  formatScoreCell,
  PROGRESS_LABELS,
} from "@/lib/assessment/score-format";
import { listScores } from "@/lib/assessment/scores";

const CSV_HEADERS = [
  "Nama",
  "Jenis",
  "Pre-test",
  "Post-test",
  "Selisih",
  "Status",
] as const;

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
 * Builds the CSV from the same rows and the same formatters the table renders,
 * so the file cannot say something different from the screen.
 *
 * Email and WhatsApp are absent by construction — `listScores` never selects
 * them. A score file travels further than the admin panel, and contact details
 * are not needed to read a result.
 */
export async function exportScoresAction(): Promise<ExportOutcome> {
  await requireAdmin();

  const result = await listScores();

  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  const lines = [
    CSV_HEADERS.join(","),
    ...result.rows.map((row) =>
      [
        row.fullName,
        formatRegistrationType(row.registrationType),
        formatScoreCell(row.pre),
        formatScoreCell(row.post),
        formatDifference(row.difference),
        PROGRESS_LABELS[row.progress],
      ]
        .map(escapeCsv)
        .join(","),
    ),
  ];

  const stamp = new Date().toISOString().slice(0, 10);

  return {
    ok: true,
    filename: `nilai-pre-post-test-${stamp}.csv`,
    // Leading BOM so spreadsheets open it as UTF-8 instead of guessing, which
    // is what turns "Ridwan" into "Ridwanï»¿" when a name carries an accent.
    content: `﻿${lines.join("\r\n")}\r\n`,
  };
}
