import "server-only";

import { listScores, type ParticipantScore } from "./scores";

/**
 * Agregat lima layer Panduan Scoring §9.
 *
 * Seluruhnya diturunkan dari `listScores()` yang sama dengan tabel per peserta —
 * bukan query kedua yang menghitung ulang dari nol. Dua jalur perhitungan untuk
 * angka yang sama cepat atau lambat akan berbeda, dan halaman inilah yang
 * dikutip ke laporan sementara tabel per peserta yang dipakai memverifikasi.
 *
 * Ketiga layer numerik **tidak pernah dijumlahkan** menjadi satu angka akhir
 * (§8), dan tidak ada satu pun fungsi di sini yang menggabungkannya.
 */

function mean(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return (
    Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100
  );
}

/** Persentase bulat; penyebut nol berarti belum ada datanya, bukan nol persen. */
function share(count: number, total: number): number | null {
  if (total === 0) {
    return null;
  }

  return Math.round((count / total) * 100);
}

export type KnowledgeLayer = {
  /** Rata-rata dari peserta yang benar-benar mengirim phase itu. */
  meanPre: number | null;
  meanPost: number | null;
  /**
   * Rata-rata kenaikan, dihitung **hanya** dari peserta yang menyelesaikan
   * keduanya. Merata-ratakan selisih terhadap pre-test yang tidak ada akan
   * mengarang angka yang tidak pernah diperoleh siapa pun.
   */
  meanGain: number | null;
  /** Jumlah peserta yang punya pre dan post — penyebut untuk gain dan improved. */
  pairedCount: number;
  improvedCount: number;
  improvedShare: number | null;
  preCount: number;
  postCount: number;
};

export type CapabilityRow = {
  label: string;
  pre: number | null;
  post: number | null;
  change: number | null;
  /** Jumlah peserta yang punya kedua angka; dasar kolom perubahan. */
  pairedCount: number;
};

export type PostProgramRow = {
  id: string;
  prompt: string;
  mean: number | null;
  /** Setuju + Sangat Setuju, yaitu nilai 4 dan 5. */
  agreeCount: number;
  agreeShare: number | null;
  responseCount: number;
};

export type StewardRow = {
  label: string;
  count: number;
  share: number | null;
};

export type AssessmentSummary = {
  participantCount: number;
  knowledge: KnowledgeLayer;
  /** Baris pertama adalah keseluruhan, sisanya per dimensi. */
  capability: CapabilityRow[];
  postProgram: PostProgramRow[];
  postProgramRespondents: number;
  steward: StewardRow[];
  stewardRespondents: number;
};

export type SummaryResult =
  | { ok: true; summary: AssessmentSummary }
  | { ok: false; message: string };

function knowledgeLayer(rows: ParticipantScore[]): KnowledgeLayer {
  const pre: number[] = [];
  const post: number[] = [];
  const gains: number[] = [];
  let improved = 0;

  for (const row of rows) {
    if (row.knowledgePre?.percent != null) pre.push(row.knowledgePre.percent);
    if (row.knowledgePost?.percent != null) post.push(row.knowledgePost.percent);

    if (row.knowledgeGain !== null) {
      gains.push(row.knowledgeGain);
      if (row.knowledgeGain > 0) improved += 1;
    }
  }

  return {
    meanPre: mean(pre),
    meanPost: mean(post),
    meanGain: mean(gains),
    pairedCount: gains.length,
    improvedCount: improved,
    improvedShare: share(improved, gains.length),
    preCount: pre.length,
    postCount: post.length,
  };
}

function capabilityRow(
  label: string,
  pairs: { pre: number | null; post: number | null }[],
): CapabilityRow {
  const pre = pairs
    .map((pair) => pair.pre)
    .filter((value): value is number => value !== null);
  const post = pairs
    .map((pair) => pair.post)
    .filter((value): value is number => value !== null);
  const paired = pairs.filter(
    (pair) => pair.pre !== null && pair.post !== null,
  );

  // Perubahan dihitung dari rata-rata peserta berpasangan, bukan selisih dua
  // rata-rata yang penyebutnya berbeda — kalau ada peserta yang hanya mengisi
  // salah satu phase, selisih itu akan membandingkan dua kelompok berbeda.
  const change = mean(
    paired.map((pair) => (pair.post as number) - (pair.pre as number)),
  );

  return {
    label,
    pre: mean(pre),
    post: mean(post),
    change,
    pairedCount: paired.length,
  };
}

export async function getAssessmentSummary(): Promise<SummaryResult> {
  const scores = await listScores();

  if (!scores.ok) {
    return scores;
  }

  const { rows, dimensions, postProgramQuestions, stewardCategories } = scores;

  const capability: CapabilityRow[] = [
    capabilityRow(
      "Seluruh pernyataan",
      rows.map((row) => ({
        pre: row.capabilityPre?.overall ?? null,
        post: row.capabilityPost?.overall ?? null,
      })),
    ),
    ...dimensions.map((dimension) =>
      capabilityRow(
        dimension,
        rows.map((row) => ({
          pre: row.capabilityPre?.byDimension[dimension] ?? null,
          post: row.capabilityPost?.byDimension[dimension] ?? null,
        })),
      ),
    ),
  ];

  const postProgram: PostProgramRow[] = postProgramQuestions.map((question) => {
    const values = rows
      .map((row) => row.postProgramItems[question.id])
      .filter((value): value is number => value !== undefined);
    const agree = values.filter((value) => value >= 4).length;

    return {
      id: question.id,
      prompt: question.prompt,
      mean: mean(values),
      agreeCount: agree,
      agreeShare: share(agree, values.length),
      responseCount: values.length,
    };
  });

  const choices = rows
    .map((row) => row.stewardChoice)
    .filter((choice): choice is string => choice !== null);

  const steward: StewardRow[] = stewardCategories.map((label) => {
    const count = choices.filter((choice) => choice === label).length;

    return { label, count, share: share(count, choices.length) };
  });

  return {
    ok: true,
    summary: {
      participantCount: rows.length,
      knowledge: knowledgeLayer(rows),
      capability,
      postProgram,
      postProgramRespondents: Math.max(
        0,
        ...postProgram.map((item) => item.responseCount),
      ),
      steward,
      stewardRespondents: choices.length,
    },
  };
}
