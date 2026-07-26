export type ChallengeStatus =
  | "validation"
  | "confirmed"
  | "in_progress"
  | "completed";

export type ChallengeAssignmentStatus = "example" | "assigned";
export type ChallengeSolutionStatus =
  | "not_started"
  | "in_progress"
  | "tested"
  | "handed_over";

export interface Challenge {
  readonly id: string;
  readonly slot: number;
  readonly title: string;
  readonly description: string;
  readonly status: ChallengeStatus;
  readonly statusLabel: string;
  readonly assignmentStatus: ChallengeAssignmentStatus;
  readonly assignmentLabel: string;
  readonly partnerName: string | null;
  readonly partnerDisplayName: string;
  readonly problemIndicators: readonly string[];
  readonly possibleOutputs: readonly string[];
  readonly solutionStatus: ChallengeSolutionStatus;
  readonly solutionStatusLabel: string;
  readonly solution: string | null;
}

export const challenges = [
  {
    id: "challenge-01-content-planning",
    slot: 1,
    title: "AI Content Planning System",
    description:
      "Contoh area challenge untuk membantu perencanaan konten yang lebih konsisten. Penetapan kebutuhan akhir menunggu validasi dengan UMKM terpilih.",
    status: "validation",
    statusLabel: "Dalam Proses Validasi",
    assignmentStatus: "example",
    assignmentLabel: "Contoh, belum menjadi penugasan final",
    partnerName: null,
    partnerDisplayName: "Challenge partner belum dikonfirmasi",
    problemIndicators: [
      "Sulit konsisten membuat konten.",
      "Ide caption berulang.",
      "Promosi dibuat mendadak.",
    ],
    possibleOutputs: [
      "Business context prompt.",
      "Content calendar.",
      "Caption templates.",
      "CTA library.",
      "Panduan penggunaan melalui perangkat mobile.",
    ],
    solutionStatus: "not_started",
    solutionStatusLabel: "Belum Dimulai",
    solution: null,
  },
  {
    id: "challenge-02-product-catalog",
    slot: 2,
    title: "AI Product Catalog Assistant",
    description:
      "Contoh area challenge untuk merapikan proses penyusunan katalog. Penetapan kebutuhan akhir menunggu validasi dengan UMKM terpilih.",
    status: "validation",
    statusLabel: "Dalam Proses Validasi",
    assignmentStatus: "example",
    assignmentLabel: "Contoh, belum menjadi penugasan final",
    partnerName: null,
    partnerDisplayName: "Challenge partner belum dikonfirmasi",
    problemIndicators: [
      "Deskripsi produk tidak konsisten.",
      "Produk memiliki banyak varian.",
      "Katalog sulit diperbarui.",
    ],
    possibleOutputs: [
      "Template input data.",
      "Workflow penyusunan deskripsi produk.",
      "Template sales copy.",
      "Template respons WhatsApp.",
      "Panduan penggunaan.",
    ],
    solutionStatus: "not_started",
    solutionStatusLabel: "Belum Dimulai",
    solution: null,
  },
  {
    id: "challenge-03-customer-service",
    slot: 3,
    title: "AI Customer Service Assistant",
    description:
      "Contoh area challenge untuk membantu penyusunan respons berulang yang tetap dapat diverifikasi pemilik usaha.",
    status: "validation",
    statusLabel: "Dalam Proses Validasi",
    assignmentStatus: "example",
    assignmentLabel: "Contoh, belum menjadi penugasan final",
    partnerName: null,
    partnerDisplayName: "Challenge partner belum dikonfirmasi",
    problemIndicators: [
      "Pertanyaan pelanggan berulang.",
      "Jawaban belum konsisten.",
      "Pemilik harus membalas secara manual.",
    ],
    possibleOutputs: [
      "Basis pengetahuan FAQ yang disetujui UMKM.",
      "Template balasan.",
      "Aturan eskalasi.",
      "Checklist verifikasi.",
    ],
    solutionStatus: "not_started",
    solutionStatusLabel: "Belum Dimulai",
    solution: null,
  },
  {
    id: "challenge-04-customer-insight",
    slot: 4,
    title: "AI Customer Insight System",
    description:
      "Contoh area challenge untuk mengelompokkan masukan anonim tanpa memasukkan identitas atau data sensitif pelanggan.",
    status: "validation",
    statusLabel: "Dalam Proses Validasi",
    assignmentStatus: "example",
    assignmentLabel: "Contoh, belum menjadi penugasan final",
    partnerName: null,
    partnerDisplayName: "Challenge partner belum dikonfirmasi",
    problemIndicators: [
      "Masukan belum dianalisis.",
      "Keluhan berulang belum terpetakan.",
      "Promosi masih berdasarkan perkiraan.",
    ],
    possibleOutputs: [
      "Template masukan yang dianonimkan.",
      "Prompt pengelompokan.",
      "Ringkasan insight.",
      "Daftar prioritas perbaikan.",
    ],
    solutionStatus: "not_started",
    solutionStatusLabel: "Belum Dimulai",
    solution: null,
  },
] as const satisfies readonly Challenge[];

export const challengeSlots = challenges;

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find((challenge) => challenge.id === id);
}

