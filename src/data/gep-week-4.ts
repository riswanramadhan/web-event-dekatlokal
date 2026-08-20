import {
  eventVolunteers,
  fiveFunctionalSolutions,
  fiveUmkmCoCreators,
  networkPartnerGroups,
  curatedEventDocumentation,
  studentCoCreationTeams,
} from "@/data/gep-week-3-completed";
import {
  assessmentCohort,
  featuredReflections,
} from "@/data/gep-week-4-assessment";
import { umkmStakeholders } from "@/data/problem-validation";

const progressBaseRoute = "/ai-co-creation-lab-makassar/progress";
const publicProgressBaseUrl =
  "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress";

export const WEEK_FOUR_PROGRESS_SLUGS = [
  "measure-reflect-sustain",
  "project-completion-monitoring",
  "impact-measurement",
  "leadership-reflection",
  "final-presentation",
] as const;

export type WeekFourProgressSlug = (typeof WEEK_FOUR_PROGRESS_SLUGS)[number];

type StatusTone = "green" | "amber" | "blue" | "neutral";

function progressRoute(slug: WeekFourProgressSlug) {
  return `${progressBaseRoute}/${slug}` as const;
}

function progressUrl(slug: WeekFourProgressSlug) {
  return `${publicProgressBaseUrl}/${slug}` as const;
}

const sharedUpdate = {
  updatedAt: "20 Agustus 2026",
  updatedAtIso: "2026-08-20",
} as const;

/* -------------------------------------------------------------------------- */
/* Headers                                                                    */
/* -------------------------------------------------------------------------- */

export const weekFourHeader = {
  slug: "measure-reflect-sustain",
  title: "Week 4 — Measure, Reflect & Sustain",
  metadataTitle:
    "Week 4: Measure, Reflect & Sustain — AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "The project is complete. The impact continues through adoption, stewardship, and replication.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Monthly system health and adoption monitoring",
  route: progressRoute("measure-reflect-sustain"),
  progressUrl: progressUrl("measure-reflect-sustain"),
  ...sharedUpdate,
} as const;

export const projectCompletionMonitoringHeader = {
  slug: "project-completion-monitoring",
  title: "Project Monitoring Report",
  metadataTitle: "Project Monitoring Report — AI Co-Creation Lab Makassar 2026",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle: "Implementation delivered. Operational continuity structured.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Monthly system health and adoption monitoring",
  route: progressRoute("project-completion-monitoring"),
  progressUrl: progressUrl("project-completion-monitoring"),
  ...sharedUpdate,
} as const;

export const impactMeasurementHeader = {
  slug: "impact-measurement",
  title: "Impact & Sustainability Report",
  metadataTitle:
    "Impact & Sustainability Report — AI Co-Creation Lab Makassar 2026",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "Measured through knowledge, capability, experience, reflection, and real output.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Sustainability dilanjutkan melalui stewardship dan monitoring bulanan terjadwal",
  route: progressRoute("impact-measurement"),
  progressUrl: progressUrl("impact-measurement"),
  ...sharedUpdate,
} as const;

export const leadershipReflectionHeader = {
  slug: "leadership-reflection",
  title: "Leadership Reflection",
  metadataTitle: "Leadership Reflection — Riswan Ramadhan | AI Co-Creation Lab",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "What I learned from building something that could not be built alone.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Refleksi menjadi bagian Leadership pada Final Presentation",
  route: progressRoute("leadership-reflection"),
  progressUrl: progressUrl("leadership-reflection"),
  ...sharedUpdate,
} as const;

export const finalPresentationHeader = {
  slug: "final-presentation",
  title: "Final Presentation",
  metadataTitle: "Final Presentation — AI Co-Creation Lab Makassar | GEP 2026",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "The complete journey from personal leadership to measurable impact and a repeatable co-creation model.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Deck digunakan untuk Final Presentation GEP 2026",
  route: progressRoute("final-presentation"),
  progressUrl: progressUrl("final-presentation"),
  ...sharedUpdate,
} as const;

export const weekFourHeaders = {
  "measure-reflect-sustain": weekFourHeader,
  "project-completion-monitoring": projectCompletionMonitoringHeader,
  "impact-measurement": impactMeasurementHeader,
  "leadership-reflection": leadershipReflectionHeader,
  "final-presentation": finalPresentationHeader,
} as const satisfies Record<WeekFourProgressSlug, object>;

/* -------------------------------------------------------------------------- */
/* Completion framing                                                         */
/* -------------------------------------------------------------------------- */

export const completionFraming = {
  delivery: {
    label: "GEP Delivery",
    status: "Completed",
    description:
      "Seluruh rangkaian formal mini project telah diselesaikan, dari validasi masalah sampai handover lima sistem.",
  },
  continuity: {
    label: "Post-Program Continuity",
    status: "Active follow-up",
    description:
      "Refinement dan stewardship aktif setelah program formal selesai; monitoring bulanan telah dijadwalkan sebagai bagian dari komitmen dukungan DekatLokal.",
  },
  statement: "Completion is not where the support stops. It is where structured long-term support begins.",
} as const;

export const weekFourOverview = {
  title: "Week 4 — Measure, Reflect & Sustain",
  subtitle:
    "The project is complete. Follow-up continues through monitoring, stewardship, and replication.",
  description:
    "AI Co-Creation Lab Makassar telah menyelesaikan seluruh perjalanan GEP dari validasi masalah sampai implementasi, pengukuran dampak, refleksi, dan perencanaan keberlanjutan. Lima sistem fungsional telah diserahterimakan kepada lima UMKM dan kini berjalan melalui siklus refinement dan operasionalisasi terstruktur yang didukung DekatLokal bersama student steward terpilih.",
  status: "Completed",
  statusTone: "green" as const,
} as const;

export const weekFourCompletionHighlights = [
  "Implementation event 10 Agustus 2026 terlaksana penuh.",
  "Lima functional MVP selesai dan diterima melalui initial UAT.",
  "Lima sistem telah diserahterimakan kepada pemilik usahanya.",
  "Pre-test, post-test, dan refleksi lengkap untuk 20 peserta.",
  "Domain dan hosting aktif untuk lima sistem.",
  "Refined Playbook dan Replication Kit tersedia sebagai bahan replikasi.",
] as const;

export const weekFourBigStory = {
  journey: [
    "Discover",
    "Validate",
    "Co-Create",
    "Build",
    "Test",
    "Handover",
    "Measure",
    "Sustain",
    "Replicate",
  ],
  narrative:
    "AI Co-Creation Lab Makassar tidak berakhir ketika event selesai pada 10 Agustus 2026. Event tersebut adalah implementation day dari perjalanan yang lebih panjang. Setelah lima tim menghasilkan lima functional MVP, DekatLokal melanjutkan proses melalui refinement, deployment, supported handover, monitoring, impact measurement, dan dokumentasi model agar dapat direplikasi.",
  statement: "The Lab is completed. The monitoring journey has started.",
} as const;

export interface WeekFourProgressCard {
  readonly number: string;
  readonly slug: Exclude<WeekFourProgressSlug, "measure-reflect-sustain">;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly statusTone: StatusTone;
  readonly route: string;
}

export const weekFourProgressCards = [
  {
    number: "01",
    slug: "project-completion-monitoring",
    title: "Project Monitoring Report",
    description:
      "Capaian pelaksanaan, lima sistem yang diserahterimakan, model stewardship, dan mekanisme monitoring bulanan.",
    status: "Completed",
    statusTone: "green",
    route: progressRoute("project-completion-monitoring"),
  },
  {
    number: "02",
    slug: "impact-measurement",
    title: "Impact Measurement",
    description:
      "Hasil knowledge, capability, pengalaman pasca-program, refleksi peserta, bukti terunduh, sustainability, dan replikasi.",
    status: "Completed",
    statusTone: "green",
    route: progressRoute("impact-measurement"),
  },
  {
    number: "03",
    slug: "leadership-reflection",
    title: "Leadership Reflection",
    description:
      "Refleksi personal Riswan Ramadhan tentang meminta bantuan, membangun jejaring, mendelegasikan, dan menjaga manfaat setelah event.",
    status: "Completed",
    statusTone: "green",
    route: progressRoute("leadership-reflection"),
  },
  {
    number: "04",
    slug: "final-presentation",
    title: "Final Presentation",
    description:
      "Deck 16 slide yang merangkai leadership journey, implementasi, impact measurement, sustainability, dan replikasi.",
    status: "Completed",
    statusTone: "green",
    route: progressRoute("final-presentation"),
  },
] as const satisfies readonly WeekFourProgressCard[];

export const weekFourSecondaryCard = {
  title: "Sustainability & Replication",
  description:
    "Refined Playbook, Replication Kit, model stewardship, dan monitoring bulanan yang membuat pilot pertama ini dapat dijalankan kembali.",
  status: "Completed",
  statusTone: "green" as const,
  href: "#sustainability-replication",
} as const;

export const weekFourStatusOverview = [
  {
    title: "Project Monitoring Report",
    status: "Completed",
    statusTone: "green",
    href: progressRoute("project-completion-monitoring"),
  },
  {
    title: "Impact Measurement",
    status: "Completed",
    statusTone: "green",
    href: progressRoute("impact-measurement"),
  },
  {
    title: "Leadership Reflection",
    status: "Completed",
    statusTone: "green",
    href: progressRoute("leadership-reflection"),
  },
  {
    title: "Sustainability & Replication",
    status: "Completed",
    statusTone: "green",
    href: "#sustainability-replication",
  },
  {
    title: "Final Presentation",
    status: "Completed",
    statusTone: "green",
    href: progressRoute("final-presentation"),
  },
] as const satisfies readonly {
  readonly title: string;
  readonly status: string;
  readonly statusTone: StatusTone;
  readonly href: string;
}[];

export const fourWeekProgressFlow = [
  { week: "Week 1", phase: "Discover" },
  { week: "Week 2", phase: "Validate & Refine" },
  { week: "Week 3", phase: "Lead The Action" },
  { week: "Week 4", phase: "Measure, Reflect & Sustain" },
] as const;

export const weekFourGuidingQuestions = [
  {
    number: "01",
    question: "Did the project work?",
    answer:
      "Lima MVP fungsional selesai, diterima melalui initial UAT, dan diserahterimakan kepada lima UMKM.",
  },
  {
    number: "02",
    question: "What changed?",
    answer:
      "Knowledge, self-reported capability, dan pengalaman membangun bersama pengguna nyata terukur pada 20 peserta.",
  },
  {
    number: "03",
    question: "What continues after the event?",
    answer:
      "Stabilisasi, transisi penggunaan operasional, technical stewardship, dan monitoring bulanan.",
  },
  {
    number: "04",
    question: "Can this model be repeated?",
    answer:
      "Refined Playbook dan Replication Kit mengemas pilot pertama menjadi model yang dapat dijalankan kembali.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Project monitoring report                                                  */
/* -------------------------------------------------------------------------- */

export const monitoringPurpose =
  "Merekam progres pelaksanaan, capaian target, kendala, solusi, pembelajaran, dokumentasi kegiatan, dan rencana tindak lanjut; memastikan solusi telah diterima melalui initial UAT dan handover; serta menjadi materi utama bagian Implementasi Project pada Final Presentation.";

export const monitoringExecutiveSummary = {
  paragraphs: [
    "AI Co-Creation Lab Makassar berhasil menuntaskan rencana implementasinya bersama 20 mahasiswa, 5 UMKM lokal, 5 tim co-creation campuran, 5 functional MVP, dan 5 sesi initial UAT. Setiap UMKM menguji langsung solusi yang dibangun untuk masalah usahanya dan menerima arah solusi tersebut untuk diserahterimakan serta disempurnakan lebih lanjut.",
    "Kelima sistem telah diserahterimakan. Minggu pertama setelah event sengaja digunakan sebagai periode refinement dan stabilisasi untuk menemukan celah kegunaan, memvalidasi perhitungan, memperkuat kesiapan server, memperbaiki responsiveness, dan memastikan alur kerja yang kritis bagi bisnis berjalan andal sebelum dipakai penuh.",
    "Setelah periode refinement, setiap sistem masuk ke tahap transisi penggunaan operasional. Penggunaan berulang dan manfaat berkelanjutan tidak diasumsikan selesai; keduanya diverifikasi melalui monitoring bulanan sebagai bagian dari komitmen keberlanjutan DekatLokal.",
  ],
  quote:
    "Five systems were delivered and accepted through initial UAT. The post-handover stabilization cycle protects data accuracy, usability, and production readiness before daily operational use.",
} as const;

export const monitoringReportCoverage = [
  {
    number: "01",
    title: "Progres Pelaksanaan",
    description:
      "Delapan tahap dari validasi masalah, co-creation, functional MVP, initial UAT, handover, refinement, transisi penggunaan, sampai monitoring bulanan.",
  },
  {
    number: "02",
    title: "Capaian Target",
    description:
      "Target mahasiswa, UMKM, tim, functional MVP, initial UAT, handover, infrastruktur, assessment, dan refleksi dibandingkan dengan catatan implementasi.",
  },
  {
    number: "03",
    title: "Kendala",
    description:
      "Format satu hari, kesiapan produksi, pembagian tanggung jawab pasca-event, dan kebutuhan membuktikan penggunaan berulang.",
  },
  {
    number: "04",
    title: "Solusi",
    description:
      "Refinement pasca-handover, quality control, technical stewardship, escalation support, dan monitoring berkala.",
  },
  {
    number: "05",
    title: "Pembelajaran",
    description:
      "Enam pembelajaran implementasi tentang pengguna, MVP, AI, tim campuran, deployment yang bertanggung jawab, dan dukungan setelah handover.",
  },
  {
    number: "06",
    title: "Dokumentasi Kegiatan",
    description:
      "Foto aktual workshop, diskusi mahasiswa–UMKM, hands-on build, prototype review, pitching, dan dokumentasi kelompok.",
  },
  {
    number: "07",
    title: "Rencana Tindak Lanjut",
    description:
      "Stabilisasi, pencatatan isu, validasi penggunaan operasional, review sistem bulanan, dan pembaruan model replikasi.",
  },
] as const;

export const monitoringChallengesAndResponses = [
  {
    challenge: "Format implementasi satu hari sangat intensif.",
    response:
      "Penyempurnaan tidak dipaksakan selesai di ruang acara; refinement dan quality control dilanjutkan setelah handover.",
  },
  {
    challenge:
      "Functional MVP belum otomatis sama dengan sistem yang siap dipakai secara konsisten.",
    response:
      "Stabilisasi memeriksa akurasi data, perhitungan, akses, responsiveness, server, dan alur kerja prioritas.",
  },
  {
    challenge:
      "Tanggung jawab pemeliharaan dapat terputus setelah peserta meninggalkan event.",
    response:
      "Setiap sistem memiliki steward dan jalur eskalasi ke tim teknis DekatLokal.",
  },
  {
    challenge:
      "Handover membuktikan penerimaan solusi, tetapi belum membuktikan adopsi berulang.",
    response:
      "Penggunaan, kegunaan, akurasi, isu, dan kebutuhan perbaikan dipantau secara berkala tanpa mengklaim outcome sebelum datanya tersedia.",
  },
] as const;

export const monitoringFollowUpPlan = [
  {
    action: "Refinement & stabilization",
    owner: "DekatLokal Technical Team + Technical Steward",
    timing: "Siklus awal pasca-handover",
    status: "Recorded implementation step",
    successIndicator:
      "Core workflow, akses, perhitungan, responsiveness, dan kesiapan server diperiksa.",
  },
  {
    action: "Operational-use check",
    owner: "UMKM + Technical Steward",
    timing: "Setelah stabilisasi dan saat penggunaan berlangsung",
    status: "Monitoring ongoing",
    successIndicator:
      "Pengguna dapat menjalankan alur kerja prioritas dan mencatat isu yang ditemukan.",
  },
  {
    action: "Issue & improvement log",
    owner: "Technical Steward + DekatLokal",
    timing: "Setiap ada temuan penggunaan",
    status: "Ongoing",
    successIndicator:
      "Temuan memiliki prioritas, penanggung jawab, tindak lanjut, dan status penyelesaian.",
  },
  {
    action: "Monthly system review",
    owner: "DekatLokal + UMKM",
    timing: "Bulanan",
    status: "Scheduled continuity mechanism",
    successIndicator:
      "Penggunaan, kegunaan, akurasi, kesehatan server, dan relevansi operasional ditinjau kembali.",
  },
  {
    action: "Replication learning update",
    owner: "DekatLokal",
    timing: "Setelah siklus monitoring menghasilkan temuan baru",
    status: "Playbook refined; future updates evidence-led",
    successIndicator:
      "Temuan pilot diterjemahkan menjadi perbaikan playbook, toolkit, dan desain program berikutnya.",
  },
] as const;

export const monitoringBenefitNote =
  "Initial UAT dan handover menjadi bukti implementasi bahwa solusi telah diterima oleh masing-masing UMKM. Manfaat berkelanjutan, penggunaan berulang, dan outcome operasional tetap diverifikasi melalui monitoring; laporan ini tidak menganggap adopsi jangka panjang selesai tanpa data tindak lanjut.";

const monitoringDocumentationIds = new Set([
  "event-opening",
  "student-umkm-discussion",
  "hands-on-building",
  "prototype-review",
  "team-pitching",
  "group-documentation",
]);

export const monitoringDocumentationHighlights =
  curatedEventDocumentation.filter((item) =>
    monitoringDocumentationIds.has(item.id),
  );

export type LifecycleState =
  | "Completed"
  | "Post-Program Continuity"
  | "Structured Transition"
  | "Sustainability Mechanism";

export interface LifecycleStage {
  readonly number: string;
  readonly title: string;
  readonly state: LifecycleState;
  readonly description: string;
}

export const implementationLifecycle: readonly LifecycleStage[] = [
  {
    number: "01",
    title: "Problem Validation",
    state: "Completed",
    description:
      "Lima UMKM dipilih berdasarkan masalah operasional nyata dan kebutuhannya divalidasi sebelum event melalui problem brief.",
  },
  {
    number: "02",
    title: "Co-Creation",
    state: "Completed",
    description:
      "Dua puluh mahasiswa dalam lima tim campuran bekerja langsung bersama pemilik usaha sepanjang hari pelaksanaan.",
  },
  {
    number: "03",
    title: "Functional MVP",
    state: "Completed",
    description:
      "Setiap tim menyelesaikan satu MVP fungsional yang menuntaskan core workflow utama usahanya.",
  },
  {
    number: "04",
    title: "Initial UAT",
    state: "Completed",
    description:
      "Kelima UMKM menguji sistem secara langsung dan menerima arah solusi untuk dilanjutkan.",
  },
  {
    number: "05",
    title: "Handover",
    state: "Completed",
    description:
      "Akses, panduan penggunaan, dan tanggung jawab steward diserahkan kepada masing-masing UMKM.",
  },
  {
    number: "06",
    title: "Refinement & Stabilization",
    state: "Post-Program Continuity",
    description:
      "Siklus satu minggu setelah handover untuk memastikan akurasi data, perhitungan, izin akses, responsiveness, dan kesiapan server.",
  },
  {
    number: "07",
    title: "Operational Use Transition",
    state: "Structured Transition",
    description:
      "Setelah stabilisasi, sistem diarahkan ke penggunaan operasional; penggunaan berulang dan manfaatnya diverifikasi melalui monitoring.",
  },
  {
    number: "08",
    title: "Monthly Monitoring",
    state: "Sustainability Mechanism",
    description:
      "Pemantauan penggunaan, kegunaan, akurasi, dan kebutuhan perbaikan dijadwalkan serta dicatat setiap bulan.",
  },
];

export const lifecycleFlow = [
  "Problem Validation",
  "Co-Creation",
  "Functional MVP",
  "Initial UAT",
  "Handover",
  "1-Week Refinement & Stabilization",
  "Operational Use Transition",
  "Monthly Monitoring",
] as const;

export const whyRefinement = {
  title: "Why We Did Not Stop at “It Works”",
  lead: "Prototype yang berfungsi belum sama dengan sistem bisnis yang siap produksi. Karena solusi ini menangani data pelanggan, catatan stok, aktivitas loyalitas, dan informasi keuangan yang nyata, DekatLokal menerapkan siklus stabilisasi tambahan setelah handover.",
  protects: [
    "Akurasi data",
    "Akurasi perhitungan keuangan",
    "Keandalan server",
    "Pengalaman yang responsif",
    "Akses pengguna",
    "Izin per peran",
    "Konsistensi operasional",
    "Kepercayaan pemilik usaha",
  ],
  statement: "For us, refinement is not unfinished work. It is responsible deployment.",
} as const;

export type WeekFourUmkmId =
  | "eyfa-natural-oil"
  | "sukmajahe-sarabba"
  | "markisa-bintang-jaya"
  | "kira-kira-michi"
  | "dapur-andist";

interface SystemDeliveryDefinition {
  readonly solution: string;
  readonly problemSolved: string;
  readonly status: string;
  readonly continuity: readonly string[];
  readonly steward: string;
  readonly stewardKind: "student" | "dekatlokal";
}

const systemDeliveryByUmkmId = {
  "eyfa-natural-oil": {
    solution: "POS, Stock, HPP & Reporting System",
    problemSolved:
      "Pencatatan penjualan, stok, HPP, dan laporan usaha yang sebelumnya manual.",
    status: "Handed Over · Functional · UAT Accepted",
    continuity: [
      "Refinement pasca-program ditangani DekatLokal.",
      "Pemeriksaan produksi memprioritaskan stok, HPP, alur transaksi, dan keandalan pelaporan.",
    ],
    steward: "DekatLokal Technical Team",
    stewardKind: "dekatlokal",
  },
  "sukmajahe-sarabba": {
    solution: "Outlet & Consignment Tracking System",
    problemSolved:
      "Pelacakan stok titip jual dan status pembayaran di banyak outlet.",
    status: "Handed Over · Functional · UAT Accepted",
    continuity: [
      "Alur outlet dan konsinyasi sudah berjalan.",
      "Stabilisasi termasuk dalam dukungan pasca-program.",
    ],
    steward: "Student Technical Steward",
    stewardKind: "student",
  },
  "markisa-bintang-jaya": {
    solution: "Finance & Stock Management System",
    problemSolved:
      "Pencatatan keuangan dan stok yang terpisah dan sulit ditinjau ulang.",
    status: "Handed Over · Functional · UAT Accepted",
    continuity: [
      "Sisi admin ikut dikembangkan mahasiswa.",
      "UMKM menguji langsung dan menerima core workflow.",
      "Stabilisasi server termasuk dalam dukungan pasca-program.",
    ],
    steward: "Student Technical Steward",
    stewardKind: "student",
  },
  "kira-kira-michi": {
    solution: "Digital Loyalty Card System",
    problemSolved:
      "Program loyalitas pelanggan yang sebelumnya bergantung pada kartu fisik.",
    status: "Handed Over · Functional · UAT Accepted",
    continuity: [
      "Peningkatan UI/UX dan responsiveness.",
      "Interaksi customer-facing dirapikan sebelum peluncuran loyalitas penuh.",
      "Approval admin dan perjalanan pelanggan disiapkan untuk penggunaan berkelanjutan.",
    ],
    steward: "DekatLokal Technical Team",
    stewardKind: "dekatlokal",
  },
  "dapur-andist": {
    solution: "Financial Management System",
    problemSolved:
      "Pencatatan pemasukan, pengeluaran, HPP, dan omzet yang belum terstruktur.",
    status:
      "Handed Over · Functional · Realtime Core Flow Working · UAT Accepted",
    continuity: [
      "Input dan data realtime sudah berjalan.",
      "Alur keuangan diperiksa silang sebelum dipakai penuh setiap hari.",
      "Akurasi perhitungan dan pelaporan menjadi prioritas kesiapan produksi.",
    ],
    steward: "Student Technical Steward",
    stewardKind: "student",
  },
} as const satisfies Record<WeekFourUmkmId, SystemDeliveryDefinition>;

function readSystemDelivery(id: string): SystemDeliveryDefinition {
  if (id in systemDeliveryByUmkmId) {
    return systemDeliveryByUmkmId[id as WeekFourUmkmId];
  }

  throw new Error(`Missing Week 4 system delivery record for UMKM: ${id}`);
}

function readFunctionalSolution(id: string) {
  const solution = fiveFunctionalSolutions.find((item) => item.id === id);

  if (!solution) {
    throw new Error(`Missing Week 3 functional solution for UMKM: ${id}`);
  }

  return solution;
}

function readUmkmVisual(id: string) {
  const coCreator = fiveUmkmCoCreators.find((item) => item.id === id);

  if (!coCreator) {
    throw new Error(`Missing Week 3 UMKM visual for: ${id}`);
  }

  return coCreator.visual;
}

export const fiveSystemsDelivered = umkmStakeholders.map(
  (stakeholder, index) => {
    const delivery = readSystemDelivery(stakeholder.id);
    const functional = readFunctionalSolution(stakeholder.id);
    const logo = readUmkmVisual(stakeholder.id);

    return {
      number: String(index + 1).padStart(2, "0"),
      id: stakeholder.id,
      businessName: stakeholder.businessName,
      solution: delivery.solution,
      problemSolved: delivery.problemSolved,
      status: delivery.status,
      continuity: delivery.continuity,
      steward: delivery.steward,
      stewardKind: delivery.stewardKind,
      dekatlokalRole: "Technical Mentor and Escalation Support",
      screenshot: {
        src: functional.screenshot,
        width: functional.screenshotWidth,
        height: functional.screenshotHeight,
        alt: `Tampilan sistem ${delivery.solution} untuk ${stakeholder.businessName}`,
      },
      logo,
    };
  },
);

export const fiveSystemsIntro = {
  title: "Five Systems Delivered",
  description:
    "Lima sistem yang dibangun bersama pemilik usahanya, diuji melalui initial UAT, dan telah diserahterimakan. Setiap tampilan di bawah adalah tangkapan layar sistem yang benar-benar dibangun.",
} as const;

export const stewardshipModel = {
  title: "Final Stewardship Model",
  description:
    "Tiga sistem dipegang student technical steward dan dua sistem ditangani langsung tim teknis DekatLokal. Kelimanya tetap berada dalam dukungan DekatLokal.",
  roles: [
    {
      number: "01",
      actor: "UMKM",
      role: "System User and Business Owner",
      responsibilities: [
        "Menggunakan sistem dalam operasional harian.",
        "Menentukan kebutuhan bisnis yang perlu diprioritaskan.",
        "Memberi umpan balik atas penggunaan nyata.",
      ],
    },
    {
      number: "02",
      actor: "Technical Steward",
      role: "First-Line Maintenance",
      responsibilities: [
        "Menangani bug ringan dan pemeliharaan dasar.",
        "Menjaga komunikasi dengan pemilik usaha.",
        "Mencatat improvement log.",
      ],
    },
    {
      number: "03",
      actor: "DekatLokal",
      role: "Program Owner, Technical Mentor, Quality Controller, and Escalation Support",
      responsibilities: [
        "Quality control dan arahan arsitektur.",
        "Mentoring student steward.",
        "Eskalasi isu dan penjagaan kontinuitas.",
      ],
    },
  ],
  statements: [
    "Stewardship is distributed, but accountability remains centralized through DekatLokal.",
    "The UMKM is never left alone with the system after handover.",
  ],
} as const;

export const monthlyMonitoring = {
  title: "Monthly System Health & Adoption Monitoring",
  description:
    "Pemantauan menjadi bagian dari model dukungan, bukan evaluasi sekali jalan setelah acara.",
  items: [
    "Penggunaan aktif",
    "Penggunaan berulang",
    "Isu kegunaan",
    "Akurasi perhitungan",
    "Kesehatan server",
    "Log bug dan dukungan",
    "Permintaan perbaikan",
    "Kecocokan alur kerja",
    "Umpan balik UMKM",
    "Relevansi operasional",
  ],
  statement:
    "Monitoring is embedded into the support model, not treated as a one-time evaluation.",
} as const;

export interface TargetAchievementRow {
  readonly indicator: string;
  readonly target: string;
  readonly achievement: string;
}

export const targetVsAchievement: readonly TargetAchievementRow[] = [
  { indicator: "Students", target: "20", achievement: "20" },
  { indicator: "UMKM", target: "5", achievement: "5" },
  { indicator: "Co-Creation Teams", target: "5", achievement: "5" },
  { indicator: "Functional MVPs", target: "5", achievement: "5" },
  { indicator: "Initial UAT", target: "5", achievement: "5" },
  { indicator: "System Handover", target: "5", achievement: "5" },
  { indicator: "Domain & Hosting", target: "5", achievement: "5 activated" },
  { indicator: "Pre-test", target: "20", achievement: "20" },
  { indicator: "Post-test", target: "20", achievement: "20" },
  { indicator: "Reflection", target: "20", achievement: "20" },
];

export const targetAchievementStatement =
  "Every primary delivery target of the pilot was achieved.";

export const keyImplementationLearnings = [
  {
    number: "01",
    title: "Listen Before Build",
    description:
      "Percakapan dengan pengguna nyata mengubah arah solusi yang semula sudah diyakini tim.",
  },
  {
    number: "02",
    title: "Simple Can Be More Valuable",
    description:
      "UMKM tidak selalu membutuhkan sistem kompleks. Yang dibutuhkan adalah alur yang benar-benar terpakai.",
  },
  {
    number: "03",
    title: "AI Is an Accelerator, Not the Goal",
    description:
      "Pemahaman masalah tetap menjadi fondasi. AI mempercepat, bukan menggantikan proses berpikir.",
  },
  {
    number: "04",
    title: "Mixed Teams Create Shared Learning",
    description:
      "Teknologi tidak harus dimonopoli mahasiswa Informatika agar sebuah tim dapat membangun sesuatu.",
  },
  {
    number: "05",
    title: "Responsible Deployment Matters",
    description:
      "MVP yang berfungsi tetap layak diperiksa silang untuk kesiapan produksi sebelum dipakai harian.",
  },
  {
    number: "06",
    title: "Handover Needs Support",
    description:
      "Sistem berlanjut melalui stewardship dan mentorship DekatLokal, bukan melalui penyerahan sekali jalan.",
  },
] as const;

export const implementationChallenge = {
  title: "One-Day Format Is Intensive",
  context:
    "Dalam satu hari peserta harus memahami konteks usaha, belajar, mendefinisikan masalah, membangun, menguji, dan melakukan pitching.",
  response:
    "DekatLokal melanjutkan refinement setelah event sehingga hasil hari itu berlanjut menjadi sistem yang dipakai.",
  lesson:
    "Model replikasi yang direkomendasikan menggunakan format dua hari, dengan Day 1 untuk Understand & Design dan Day 2 untuk Build, Test & Improve.",
  flow: ["Day 1 — Understand & Design", "Day 2 — Build, Test & Improve"],
} as const;

export const monitoringDocumentation = {
  title: "Project Documentation",
  description:
    "Dokumentasi kegiatan memakai arsip foto aktual AI Co-Creation Lab Makassar yang telah dikurasi pada Process Documentation Week 3. Tidak ada stock image yang digunakan.",
  categories: [
    "Workshop",
    "Hands-on co-creation",
    "Diskusi mahasiswa dan UMKM",
    "Pengembangan prototype",
    "Pitching",
    "Momen bersama stakeholder",
    "Dokumentasi kelompok",
  ],
  links: [
    {
      label: "Process Documentation Week 3",
      href: `${progressBaseRoute}/process-documentation`,
      external: false,
    },
    {
      label: "Mini Project Implementation Week 3",
      href: `${progressBaseRoute}/mini-project-implementation`,
      external: false,
    },
    {
      label: "Folder dokumentasi lengkap (Google Drive)",
      href: "https://drive.google.com/drive/folders/1whE01s1U86R6QEfs5sPHpj7wA6SrcJRN?usp=sharing",
      external: true,
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Downloadable assets                                                        */
/* -------------------------------------------------------------------------- */

export interface DownloadableAsset {
  readonly id: string;
  readonly title: string;
  readonly kind: string;
  readonly description: string;
  readonly viewHref: string | null;
  readonly downloadHref: string;
  readonly viewLabel: string;
  readonly downloadLabel: string;
  readonly meta: readonly { readonly label: string; readonly value: string }[];
}

export const monitoringReportAsset: DownloadableAsset = {
  id: "project-monitoring-report",
  title: "AI Co-Creation Lab Project Monitoring Report",
  kind: "PDF Report",
  description:
    "Versi unduh dari laporan progres pelaksanaan, capaian target, kendala, solusi, pembelajaran, dokumentasi kegiatan, dan rencana tindak lanjut.",
  viewHref: "/week-4/AI_CoCreation_Lab_Project_Monitoring_Report.pdf",
  downloadHref: "/week-4/AI_CoCreation_Lab_Project_Monitoring_Report.pdf",
  viewLabel: "View Monitoring Report",
  downloadLabel: "Download Monitoring Report",
  meta: [
    { label: "Status", value: "Completed · Updated 20 Aug 2026" },
    { label: "Use", value: "Final Presentation · Implementasi Project" },
    { label: "Format", value: "PDF · 28 pages · 7.61 MB" },
  ],
};

export const impactReportAsset: DownloadableAsset = {
  id: "impact-report",
  title: "AI Co-Creation Lab Impact Report",
  kind: "PDF Report",
  description:
    "Laporan penerima manfaat, keterlibatan ekosistem, relawan, output, outcome mahasiswa, suara peserta, dokumentasi, Sustainability Plan, dan jalur replikasi.",
  viewHref: "/week-4/AI_CoCreation_Lab_Impact_Report.pdf",
  downloadHref: "/week-4/AI_CoCreation_Lab_Impact_Report.pdf",
  viewLabel: "View Impact Report",
  downloadLabel: "Download Impact Report",
  meta: [
    { label: "Status", value: "Completed · Updated 20 Aug 2026" },
    { label: "Use", value: "Final Presentation · Dampak & Keberlanjutan" },
    { label: "Format", value: "PDF · 39 pages · 5.68 MB" },
  ],
};

export const impactEvidenceFiles: readonly DownloadableAsset[] = [
  impactReportAsset,
  {
    id: "prepost-public-evidence",
    title: "Pre-Test & Post-Test Participant Data",
    kind: "CSV",
    description:
      "Data assessment berpasangan yang dipakai menghitung perubahan knowledge objektif dan self-reported capability pada 20 peserta. Identitas peserta diganti kode P01 sampai P20 dan klasifikasi subgroup yang tidak dapat diverifikasi ulang tidak dipublikasikan.",
    viewHref: null,
    downloadHref: "/week-4/AI_CoCreation_Lab_PrePost_Public_Evidence.csv",
    viewLabel: "Download CSV",
    downloadLabel: "Download CSV",
    meta: [
      { label: "Baris", value: "20 peserta" },
      { label: "Kolom", value: "20 kolom skor" },
      { label: "Format", value: "CSV" },
    ],
  },
  {
    id: "participant-reflection",
    title: "Participant Reflection & Testimonials",
    kind: "PDF",
    description:
      "Refleksi kualitatif lengkap dari 20 peserta, mencakup perubahan cara memakai AI, pelajaran dari bekerja bersama UMKM, rencana perilaku berikutnya, dan testimoni yang telah disetujui untuk dipakai.",
    viewHref: "/week-4/AI_CoCreation_Lab_Refleksi_Peserta.pdf",
    downloadHref: "/week-4/AI_CoCreation_Lab_Refleksi_Peserta.pdf",
    viewLabel: "View PDF",
    downloadLabel: "Download PDF",
    meta: [
      { label: "Halaman", value: "21 halaman" },
      { label: "Peserta", value: "20 dari 20 mengisi" },
      { label: "Format", value: "PDF" },
    ],
  },
];

export const impactEvidenceIntro = {
  title: "Impact Evidence Files",
  description:
    "Impact Report, data assessment berpasangan yang dianonimkan, dan refleksi peserta dapat diunduh serta diperiksa ulang.",
  privacyNote:
    "Berkas CSV publik memakai kode peserta, bukan nama, dan tidak memuat kontak pribadi. Data bernama disimpan internal untuk keperluan verifikasi program.",
  reflectionCoverage: "20 of 20 participants completed the reflection.",
} as const;

export const playbookAsset = {
  id: "playbook-refined",
  title: "AI Co-Creation Lab Playbook — Refined Edition",
  subtitle: "A Replication Guide for Student × UMKM Digital Co-Creation",
  badge: "Refined · Replication Ready",
  description:
    "Panduan replikasi praktis yang disusun dari pilot pertama Makassar, mencakup pemilihan UMKM, validasi masalah, desain tim campuran, kurikulum, build berbantuan AI, UAT, supported handover, pengukuran dampak, stewardship, dan keberlanjutan.",
  version: "Refined Edition · 39 pages",
  basedOn: "Based on Pilot 1 Makassar 2026",
  preparedBy: "Prepared by DekatLokal",
  pdfHref: "/downloads/AI_Co-Creation_Lab_Playbook_Refined.pdf",
  sectionCount: 30,
} as const;

export const finalDeckAsset = {
  id: "final-presentation-deck",
  title: "Final Presentation — GEP 2026",
  kind: "PDF & PowerPoint Presentation Deck",
  description:
    "Perjalanan lengkap Week 1 sampai Week 4 yang mencakup personal leadership, identifikasi isu, partnership, validasi, implementasi, pengukuran dampak, refleksi, keberlanjutan, dan replikasi.",
  status: "Completed",
  statusTone: "green" as const,
  pdfHref: "/downloads/AI_Co-Creation_Lab_Final_Presentation_GEP_2026.pdf",
  pptxHref:
    "/downloads/AI_Co-Creation_Lab_Final_Presentation_GEP_2026.pptx",
  slideBasePath: "/downloads/final-presentation",
  slideCount: 16,
  ratio: "16:9",
} as const;

/* -------------------------------------------------------------------------- */
/* Impact & sustainability report                                             */
/* -------------------------------------------------------------------------- */

export const impactReportPurpose =
  "Menyusun penerima manfaat, mitra, relawan, output, outcome, impact kuantitatif dan kualitatif, dokumentasi, sustainability plan, serta replication pathway sebagai materi bagian Impact Measurement & Sustainability pada Final Presentation.";

export const impactHeroMetrics = {
  delivery: [
    { value: 20, label: "University Students" },
    { value: 5, label: "UMKM Co-Creators" },
    { value: 5, label: "Functional Systems" },
    { value: 5, total: 5, label: "Initial UAT Completed" },
  ],
  learning: [
    {
      before: 71.25,
      after: 100,
      decimalsBefore: 2,
      decimalsAfter: 0,
      label: "Core Knowledge Score",
      caption: "Skala 0-100",
    },
    {
      before: 3.27,
      after: 4.72,
      decimalsBefore: 2,
      decimalsAfter: 2,
      label: "Self-Reported Capability",
      caption: "Skala Likert 1-5",
    },
    {
      value: 1.56,
      prefix: "+",
      decimals: 2,
      label: "Largest Capability Gain",
      caption: "Testing, Collaboration & Confidence",
    },
    {
      value: 20,
      total: 20,
      label: "Participants Increased Overall Capability",
      caption: "Perbandingan berpasangan per peserta",
    },
  ],
} as const;

export const beneficiaries = {
  students: {
    label: "Direct Student Beneficiaries",
    value: 20,
    suffix: " university students",
    description:
      "Dua puluh mahasiswa dari enam perguruan tinggi yang mengikuti seluruh rangkaian pembelajaran, co-creation, build, dan assessment.",
  },
  umkm: {
    label: "Direct UMKM Beneficiaries",
    value: 5,
    suffix: " local UMKM",
    description:
      "Lima pelaku usaha yang membawa masalah operasional nyata, melakukan initial UAT, dan menerima handover sistem yang dibangun bersama; penggunaan berulangnya dipantau setelah program.",
    names: umkmStakeholders.map((stakeholder) => stakeholder.businessName),
  },
  separationNote:
    "Kedua kelompok penerima manfaat tidak digabungkan menjadi satu angka tanpa konteks karena bentuk manfaat yang diterima berbeda.",
} as const;

interface UniversityLogoDefinition {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

const universityLogoByName = {
  "Universitas Hasanuddin": {
    src: "/university-logo/optimized/universitas-hasanuddin.webp",
    width: 402,
    height: 480,
  },
  "Universitas Islam Negeri Alauddin Makassar": {
    src: "/university-logo/optimized/universitas-islam-negeri-alauddin-makassar.webp",
    width: 373,
    height: 480,
  },
  "Universitas Negeri Makassar": {
    src: "/university-logo/optimized/universitas-negeri-makassar.webp",
    width: 475,
    height: 480,
  },
  "Universitas Teknologi Akba Makassar": {
    src: "/university-logo/optimized/universitas-teknologi-akba-makassar.webp",
    width: 480,
    height: 480,
  },
  "Universitas Terbuka": {
    src: "/university-logo/optimized/universitas-terbuka.webp",
    width: 300,
    height: 226,
  },
  "Universitas Ciputra": {
    src: "/university-logo/optimized/universitas-ciputra.webp",
    width: 480,
    height: 479,
  },
} as const satisfies Record<string, UniversityLogoDefinition>;

function readUniversityLogo(name: string): UniversityLogoDefinition {
  if (name in universityLogoByName) {
    return universityLogoByName[name as keyof typeof universityLogoByName];
  }

  throw new Error(`Missing university logo for: ${name}`);
}

const universityCounts = studentCoCreationTeams
  .flatMap((team) => team.members)
  .reduce<Map<string, number>>((counts, member) => {
    counts.set(member.university, (counts.get(member.university) ?? 0) + 1);
    return counts;
  }, new Map());

export const studentUniversities = [...universityCounts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([name, count]) => ({
    id: name.toLowerCase().replace(/[^a-z]+/g, "-"),
    name,
    students: count,
    logo: readUniversityLogo(name),
  }));

export const studentUniversitiesIntro = {
  title: "Students Across Universities",
  description:
    "20 mahasiswa sengaja dicampur lintas disiplin dan lintas kampus untuk membentuk tim co-creation yang beragam.",
} as const;

export const umkmCoCreatorLogos = fiveUmkmCoCreators;

export const umkmCoCreatorIntro = {
  title: "5 UMKM Co-Creators",
  description:
    "Lima pelaku usaha yang menjadi mitra co-creation sekaligus pemilik sistem yang dibangun.",
} as const;

const technicalCoreNames = [
  "Muhammad Makbul N",
  "Dimas Jayakusuma Sarma",
  "Andi Alfian Rusani",
  "Fathur Rizqi S Djafar",
  "Marsha Carolince",
  "Feri Awal",
  "Chelsea Shelin Purnaria",
] as const;

const technicalCoreNameSet = new Set<string>(technicalCoreNames);

export interface TeamDesignMember {
  readonly name: string;
  readonly university: string;
  readonly isTechnicalCore: boolean;
}

export interface TeamDesignEntry {
  readonly number: string;
  readonly id: string;
  readonly title: string;
  readonly umkm: string;
  readonly members: readonly TeamDesignMember[];
}

export const weekFourTeamDesign: readonly TeamDesignEntry[] =
  studentCoCreationTeams.map((team) => ({
    number: team.number,
    id: team.id,
    title: team.title,
    umkm: team.umkm,
    members: team.members.map((member) => ({
      name: member.name,
      university: member.university,
      isTechnicalCore: technicalCoreNameSet.has(member.name),
    })),
  }));

export const technicalCoreCount = technicalCoreNames.length;
export const nonCoreCount =
  weekFourTeamDesign.reduce((total, team) => total + team.members.length, 0) -
  technicalCoreCount;

export const teamDesignNote =
  "Nama dan asal kampus mengikuti dokumentasi Week 3. Penandaan technical core telah dikoreksi: Andi Alfian Rusani adalah core Team 4 dan Achmad Alfian Saputra bukan core. Agregat lama core vs non-core tidak ditampilkan karena pemetaan data assessment bernama untuk menghitung ulang subgroup tidak tersedia di workspace; hasil full cohort tetap digunakan.";

export const impactContinuity = {
  title: "Impact Continuity",
  lead: "Model tindak lanjut berlanjut setelah event melalui transisi penggunaan dan monitoring sistem bulanan. Ini memungkinkan program bergerak dari output langsung menuju bukti penggunaan berkelanjutan tanpa menganggap adopsi selesai sebelum data monitoring tersedia.",
  items: [
    {
      title: "Operational Adoption Monitoring",
      description:
        "Arah penggunaan operasional diverifikasi bertahap setelah stabilisasi; status penggunaan berulang tetap mengikuti data monitoring.",
    },
    {
      title: "Monthly Monitoring",
      description:
        "Penggunaan, kegunaan, akurasi, dan kebutuhan perbaikan ditinjau rutin.",
    },
    {
      title: "Technical Stewardship",
      description:
        "Tanggung jawab pemeliharaan tetap aktif setelah program selesai.",
    },
    {
      title: "Case-Based Improvement",
      description:
        "Temuan monitoring menjadi bahan perbaikan sistem dan panduan replikasi berikutnya.",
    },
  ],
} as const;

export const outputVsOutcome = {
  output: [
    "20 mahasiswa mengikuti seluruh rangkaian program.",
    "5 UMKM membawa masalah operasional nyata.",
    "5 tim co-creation terbentuk dengan komposisi campuran.",
    "5 functional MVP selesai pada implementation day.",
    "5 initial UAT dilakukan bersama pemilik usaha.",
    "5 sistem diserahterimakan dengan infrastruktur digital aktif.",
    "Dokumentasi kegiatan terkurasi.",
    "Data assessment lengkap untuk 20 peserta.",
  ],
  studentOutcome: [
    "Peningkatan knowledge objektif pada core knowledge check.",
    "Peningkatan self-reported capability pada empat dimensi.",
    "Cara pandang yang lebih user-centered dalam merancang solusi.",
    "Kepercayaan diri lebih tinggi pada pengujian dan kolaborasi.",
    "Tujuh peserta menyatakan kesediaan melanjutkan sebagai technical steward.",
    "Pengalaman nyata membangun untuk pengguna sungguhan.",
  ],
  umkmOutcome: [
    "Masalah nyata diterjemahkan menjadi sistem yang berfungsi.",
    "UMKM menguji langsung sistem yang dibangun untuk usahanya.",
    "Arah solusi diterima dan sistem diserahterimakan.",
    "Lima sistem masuk ke siklus stabilisasi dan monitoring menuju penggunaan yang konsisten.",
  ],
} as const;

export const sustainabilityPlan = [
  {
    number: "01",
    title: "Technology Sustainability",
    description:
      "Lima sistem diserahterimakan dengan infrastruktur digital aktif dan stabilisasi terstruktur.",
    flow: [
      "Functional MVP",
      "Handover",
      "1-Week Stabilization",
      "Operational Use Check",
      "Maintenance",
    ],
  },
  {
    number: "02",
    title: "Human Sustainability",
    description:
      "Tiga sistem memiliki student technical steward dan dua sistem ditangani langsung DekatLokal. Kelimanya tetap didukung DekatLokal.",
    flow: ["Student Participant", "Builder", "Technical Steward"],
    supportFlow: [
      "DekatLokal",
      "Technical Mentor",
      "Quality Control",
      "Escalation Support",
    ],
  },
  {
    number: "03",
    title: "Impact Sustainability",
    description:
      "Pemeriksaan H+7 dan monitoring bulanan tertanam di dalam model dukungan.",
    flow: [
      "Initial UAT",
      "H+7 Check",
      "Improvement Log",
      "Monthly Monitoring",
      "Case Study",
    ],
  },
  {
    number: "04",
    title: "Program Sustainability",
    description:
      "Refined Playbook dan Replication Kit membuat model ini dapat dijalankan kembali.",
    flow: [
      "Pilot 1 Makassar",
      "Capture Lessons",
      "Standardize",
      "Refined Playbook",
      "Replication Kit",
      "Replicate",
    ],
  },
] as const;

export const sustainabilityStatement =
  "Sustainability is not a promise to keep five websites online. It is a system for keeping the solutions useful, the builders connected, and the model repeatable.";

export const replicationInterest = {
  title: "Replication Interest",
  label: "Replication Interest · Potential Collaboration",
  lead: "Pilot ini telah memunculkan minat di luar event aslinya. Rumah BUMN Makassar mendorong agar model ini dibuat dapat direplikasi, sementara Komdigi menunjukkan ketertarikan pada kegiatan serupa dan meminta materi terstruktur yang dapat mendukung penyusunan proposal internal untuk kemungkinan program yang lebih luas.",
  items: [
    {
      party: "Rumah BUMN Makassar",
      logo: {
        src: "/logo-ecosystem/optimized/logo-rumahbumn.webp",
        alt: "Logo Rumah BUMN Makassar",
      },
      note: "Mendorong agar model ini dibuat dapat direplikasi bersama ekosistem UMKM binaannya.",
      status: "Replication interest",
    },
    {
      party: "BBLSDM Komdigi Makassar",
      logo: {
        src: "/logo-ecosystem/optimized/logo-komdigimakassar.webp",
        alt: "Logo BBLSDM Komdigi Makassar",
      },
      note: "Menunjukkan ketertarikan pada kegiatan serupa dan meminta materi terstruktur untuk penyusunan proposal internal.",
      status: "Requested replication materials",
    },
    {
      party: "DekatLokal",
      logo: {
        src: "/logo-ecosystem/optimized/logo-dekatlokal.webp",
        alt: "Logo DekatLokal",
      },
      note: "Dapat berperan sebagai model owner, implementation partner, dan technical mentor bila replikasi berlanjut.",
      status: "Potential collaboration",
    },
  ],
  statement:
    "Five systems prove the pilot can build. The Playbook makes the model repeatable.",
  caution:
    "Belum ada dokumen kerja sama formal untuk program lanjutan. Ketertarikan di atas ditulis apa adanya sebagai sinyal replikasi.",
} as const;

export const replicationKitVersion = "AI Co-Creation Lab Replication Kit v1.0";

export interface ReplicationKitAsset {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly contents: readonly string[];
}

export const replicationKitAssets: readonly ReplicationKitAsset[] = [
  {
    id: "playbook",
    number: "01",
    title: "Playbook",
    description:
      "Panduan lengkap menjalankan model dari konsep sampai monitoring pasca-handover.",
    contents: [
      "Program concept",
      "Stakeholder roles",
      "UMKM selection",
      "Problem validation",
      "Co-creation flow",
      "Facilitation",
      "UAT",
      "Handover",
      "Monitoring",
      "Replication checklist",
    ],
  },
  {
    id: "curriculum",
    number: "02",
    title: "Curriculum",
    description:
      "Rangkaian pembelajaran dua hari yang disusun dari pembelajaran format satu hari pilot pertama.",
    contents: [
      "Responsible AI",
      "Problem discovery",
      "MVP thinking",
      "User flow",
      "AI-assisted build",
      "Testing",
      "Iteration",
    ],
  },
  {
    id: "co-creation-toolkit",
    number: "03",
    title: "Co-Creation Toolkit",
    description:
      "Perangkat kerja yang dipakai tim selama proses discovery sampai pengujian.",
    contents: [
      "UMKM Interview Guide",
      "Problem Validation Form",
      "Case Brief Template",
      "MVP Worksheet",
      "User Flow Worksheet",
      "Testing Checklist",
      "UAT Form",
    ],
  },
  {
    id: "technical-starter-kit",
    number: "04",
    title: "Technical Starter Kit",
    description:
      "Fondasi teknis agar tim tidak memulai dari nol pada hari pelaksanaan.",
    contents: [
      "Recommended stack",
      "Starter repository",
      "Auth and database template",
      "Environment checklist",
      "Security checklist",
      "Deployment checklist",
      "AI Prompt Starter",
    ],
  },
  {
    id: "measurement-kit",
    number: "05",
    title: "Measurement Kit",
    description:
      "Instrumen pengukuran hasil belajar mahasiswa dan perubahan operasional UMKM.",
    contents: [
      "Scenario knowledge test",
      "Capability assessment",
      "Post-program experience",
      "Reflection prompts",
      "Prototype rubric",
      "UMKM UAT",
      "H+7 monitoring",
      "Monthly adoption monitoring",
    ],
  },
];

export const partnerNetworkGroups = networkPartnerGroups;

export const partnerNetworkNote =
  "Peran mitra ditulis sesuai kontribusi yang benar-benar diberikan pada pelaksanaan pilot pertama.";

export const supportTeam = eventVolunteers;

export const supportTeamSummary = {
  title: "Volunteers & Support Team",
  count: eventVolunteers.length,
  description:
    "Lima relawan dan tim pendukung yang menjalankan dokumentasi, operasional, registrasi, dan liaison selama kegiatan.",
} as const;

const ecosystemContributorCount = networkPartnerGroups.reduce(
  (total, group) => total + group.partners.length,
  0,
);

export const impactAccountabilityMetrics = [
  {
    value: studentCoCreationTeams.flatMap((team) => team.members).length,
    label: "Student beneficiaries",
    caption: "Penerima manfaat langsung dari enam perguruan tinggi.",
  },
  {
    value: umkmStakeholders.length,
    label: "UMKM beneficiaries",
    caption: "Penerima manfaat bisnis dengan initial UAT dan handover tercatat.",
  },
  {
    value: ecosystemContributorCount,
    label: "Partners & ecosystem contributors",
    caption: "Entitas program, UMKM, infrastruktur, learning, venue, dan event support.",
  },
  {
    value: eventVolunteers.length,
    label: "Volunteers & support team",
    caption: "Mendukung dokumentasi, operasional, registrasi, dan liaison.",
  },
  {
    value: fiveFunctionalSolutions.length,
    label: "Functional systems",
    caption: "Output digital yang dibangun bersama lima UMKM.",
  },
  {
    value: curatedEventDocumentation.length,
    label: "Curated event photos",
    caption: "Dokumentasi aktual yang dioptimalkan untuk laporan web.",
  },
  {
    value: assessmentCohort.reflectionCompleted,
    label: "Participant reflections",
    caption: "Seluruh peserta menyelesaikan refleksi pasca-program.",
  },
  {
    value: featuredReflections.length,
    label: "Featured participant voices",
    caption: "Parafrasa refleksi yang ditampilkan dengan persetujuan penggunaan.",
  },
] as const;

export const impactChangeMetrics = [
  {
    before: 71.25,
    after: 100,
    change: 28.75,
    beforeDecimals: 2,
    afterDecimals: 0,
    label: "Core knowledge",
    scale: "Skala 0–100 · +28.75 poin",
  },
  {
    before: 3.27,
    after: 4.72,
    change: 1.45,
    beforeDecimals: 2,
    afterDecimals: 2,
    label: "Self-reported capability",
    scale: "Skala Likert 1–5 · +1.45 poin",
  },
] as const;

const impactDocumentationIds = new Set([
  "event-opening",
  "workshop-collaboration",
  "student-umkm-discussion",
  "hands-on-building",
  "team-pitching",
  "stakeholder-recognition",
  "group-documentation",
]);

export const impactDocumentationHighlights = curatedEventDocumentation.filter(
  (item) => impactDocumentationIds.has(item.id),
);

export const impactDocumentationSummary = {
  eventPhotos: curatedEventDocumentation.length,
  systemScreens: fiveFunctionalSolutions.length,
  evidenceFiles: impactEvidenceFiles.length,
  fullDocumentationHref:
    "https://drive.google.com/drive/folders/1whE01s1U86R6QEfs5sPHpj7wA6SrcJRN?usp=sharing",
  note:
    "Jumlah dokumentasi di atas menghitung aset yang benar-benar tersedia pada laporan ini; folder sumber lengkap tetap dibuka melalui Google Drive.",
} as const;

/* -------------------------------------------------------------------------- */
/* Leadership reflection essay                                                */
/* -------------------------------------------------------------------------- */

export const leadershipReflectionOwner = {
  name: "Riswan Ramadhan",
  role: "Founder DekatLokal · Project Lead AI Co-Creation Lab Makassar",
  program: "Global Experience Program — BAKTI NUSA 15",
} as const;

export interface ReflectionEssaySection {
  readonly number: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly pullQuote: string | null;
}

export const leadershipReflectionEssay = {
  title: "What I Learned From Building Something That Could Not Be Built Alone",
  lead: "Ada satu hal yang paling saya rasakan setelah semua rangkaian AI Co-Creation Lab selesai: ternyata ide yang terlihat sederhana di kepala bisa menjadi jauh lebih besar ketika mulai melibatkan banyak orang.",
  sections: [
    {
      number: "01",
      title: "The Idea Became Bigger Than Me",
      paragraphs: [
        "Awalnya saya hanya ingin membuat satu ruang kecil. Ruang di mana mahasiswa tidak hanya menggunakan AI untuk tugas, dan UMKM tidak hanya datang ke pelatihan lalu pulang tanpa membawa sesuatu yang bisa digunakan. Saya ingin keduanya duduk bersama, membawa kemampuan dan masalah masing-masing, lalu mencoba membangun sesuatu.",
        "Tapi ketika ide itu benar-benar dijalankan, saya sadar bahwa membuat program seperti ini bukan hanya soal konsep yang bagus.",
        "Saya harus menghubungi orang. Menjelaskan ide berkali-kali. Menunggu jawaban. Mengubah rencana. Mencari partner. Memastikan UMKM percaya. Memastikan mahasiswa paham kenapa kegiatan ini dibuat. Menyiapkan tim. Mengatur orang-orang yang sebelumnya bahkan belum pernah bekerja bersama. Dan pada akhirnya saya menerima bahwa saya tidak mungkin mengerjakan semuanya sendiri.",
        "Mungkin itu pembelajaran leadership terbesar saya.",
      ],
      pullQuote: null,
    },
    {
      number: "02",
      title: "Learning to Ask for Help",
      paragraphs: [
        "Ada masa ketika saya merasa bahwa karena project ini berasal dari ide saya, berarti saya juga harus memastikan semuanya sendiri. Rasanya lebih aman kalau saya pegang banyak hal.",
        "Tetapi semakin dekat dengan hari pelaksanaan, semakin jelas bahwa cara berpikir itu tidak sustainable. Saya mulai belajar mendelegasikan.",
        "Ada yang menjaga registrasi. Ada yang mendokumentasikan. Ada yang menjadi liaison officer. Ada yang membantu teknis. Ada partner yang menyediakan infrastruktur. Ada pemateri yang membawa perspektif baru. Ada mahasiswa yang akhirnya jauh lebih memahami problem UMKM daripada yang saya bayangkan.",
        "Saya mulai memahami bahwa leadership bukan tentang memastikan nama kita ada di semua pekerjaan. Kadang justru tugas kita adalah membuat orang lain punya ruang untuk mengambil bagian.",
        "Percakapan saya dengan Ibu Ayu Anisela juga menguatkan hal itu. Beliau berbicara tentang konsistensi, KPI, dan keberanian mendelegasikan tanggung jawab agar orang lain ikut berkembang. Kalimat itu terasa sangat dekat dengan apa yang sedang saya alami.",
      ],
      pullQuote: null,
    },
    {
      number: "03",
      title: "The Hardest Part Was Not Technology",
      paragraphs: [
        "Saya mahasiswa Informatika. Membicarakan website, database, AI, atau sistem digital relatif dekat dengan keseharian saya. Tetapi membangun jejaring berbeda.",
        "Kita tidak bisa men-debug manusia seperti kita memperbaiki code.",
        "Setiap organisasi punya prioritas. Setiap partner punya cara kerja. Setiap UMKM punya kesibukan. Setiap mahasiswa punya kemampuan dan kepercayaan diri yang berbeda.",
        "Saya belajar bahwa membangun jaringan membutuhkan kesabaran. Kadang jawaban tidak datang hari itu. Kadang kita harus menjelaskan kembali kenapa project ini penting. Kadang kita harus menerima bahwa ide kita belum cukup jelas bagi orang lain.",
        "Dari situ saya belajar bahwa komunikasi bukan sekadar menyampaikan apa yang saya inginkan. Komunikasi adalah membuat orang lain memahami mengapa sesuatu layak dibangun bersama.",
      ],
      pullQuote: null,
    },
    {
      number: "04",
      title: "Why I Built Mixed Teams",
      paragraphs: [
        "Salah satu keputusan terbaik saya adalah tidak membuat tim berdasarkan jurusan. Saya sengaja menyebarkan mahasiswa yang punya pengalaman teknis ke kelompok yang berbeda.",
        "Saya tidak ingin acara ini berubah menjadi lima meja kecil tempat mahasiswa Informatika coding sementara yang lain melihat. Saya ingin semua orang ikut memahami masalah.",
        "Ada yang mungkin tidak menulis code, tetapi mampu bertanya kepada UMKM. Ada yang membantu menyederhanakan workflow. Ada yang melihat UX yang tidak terpikirkan developer. Ada yang membantu menjelaskan solusi dengan bahasa yang lebih manusiawi.",
        "Setelah melihat hasil pre-test dan post-test seluruh cohort, saya semakin yakin bahwa keputusan itu punya nilai. Pengetahuan objektif dan kepercayaan diri peserta meningkat, sementara dinamika tim menunjukkan bahwa kemampuan teknis, komunikasi, riset pengguna, dan product thinking dapat saling menguatkan.",
        "Bagi saya, itu bukan bukti bahwa semua orang harus menjadi programmer. Justru sebaliknya. Teknologi akan lebih berguna ketika lebih banyak orang merasa bahwa mereka juga punya tempat dalam proses menciptakannya.",
      ],
      pullQuote: "Technical talent acted as an anchor, not a silo.",
    },
    {
      number: "05",
      title: "An Event Is Not the End of Impact",
      paragraphs: [
        "Saat lima tim selesai pitching, sangat mudah rasanya untuk mengatakan bahwa semuanya sudah selesai. Tetapi setelah melihat lima UMKM mencoba prototype, saya sadar bahwa hari itu justru baru permulaan.",
        "Sistem yang berjalan di laptop mahasiswa belum otomatis menjadi sistem yang akan dipakai UMKM bulan depan. Karena itu saya tidak ingin berhenti di lima prototype.",
        "DekatLokal melanjutkan refinement, membantu deployment, menuntaskan supported handover, dan menjaga mahasiswa tetap terlibat melalui technical stewardship.",
        "Saya ingin UMKM tidak merasa menerima aplikasi lalu ditinggalkan. Dan saya ingin mahasiswa tidak merasa bahwa pengalaman mereka selesai ketika sertifikat dibagikan.",
        "Kalau satu mahasiswa bisa tetap membantu satu UMKM, sementara DekatLokal menjadi mentor di belakangnya, maka hubungan yang dimulai dalam satu sore bisa memiliki umur yang jauh lebih panjang dari event itu sendiri.",
      ],
      pullQuote: null,
    },
    {
      number: "06",
      title: "How My Definition of Impact Changed",
      paragraphs: [
        "Dulu saya mungkin akan cukup senang melihat ruangan penuh, dokumentasi bagus, dan lima prototype berhasil didemokan.",
        "Sekarang saya lebih banyak bertanya: apakah UMKM benar-benar menggunakannya, apakah mahasiswa benar-benar berubah cara berpikirnya, apakah satu bulan lagi masih ada sesuatu yang tersisa, dan apakah orang lain bisa mengambil model ini lalu menjalankannya lagi.",
        "Pertanyaan-pertanyaan itu membuat saya melihat sustainability dengan cara yang berbeda. Sustainability bukan hanya domain dan hosting tetap aktif. Sustainability adalah ketika manfaatnya masih hidup.",
        "Dan replication bukan berarti membuat lima aplikasi yang sama untuk UMKM lain. Replication berarti proses yang kami pelajari dapat digunakan kembali untuk mempertemukan masalah baru, mahasiswa baru, dan UMKM baru.",
      ],
      pullQuote: "Sustainability adalah ketika manfaatnya masih hidup.",
    },
    {
      number: "07",
      title: "When Others Asked to Replicate It",
      paragraphs: [
        "Setelah kegiatan, Rumah BUMN Makassar dan pihak Komdigi menunjukkan ketertarikan terhadap kemungkinan model ini digunakan kembali.",
        "Bagi saya, itu terasa cukup personal. Karena beberapa minggu sebelumnya, AI Co-Creation Lab hanya berupa file, slide, chat, dan ide yang terus saya revisi.",
        "Sekarang ada orang yang bertanya bagaimana bentuk modelnya kalau kegiatan ini mau dibuat lagi.",
        "Pertanyaan itu membuat saya sadar bahwa mungkin output paling penting dari project ini bukan hanya lima sistem. Mungkin yang lebih penting adalah proses yang bisa kami dokumentasikan dan bagikan.",
        "Karena itu saya menyelesaikan Playbook dan Replication Kit ini dengan serius. Bukan untuk membuat project terlihat lebih besar, tetapi supaya apa yang kami pelajari tidak hilang ketika program ini selesai.",
      ],
      pullQuote: null,
    },
    {
      number: "08",
      title: "What I Still Need to Learn",
      paragraphs: [
        "Tentang diri saya sendiri, saya masih belajar. Saya masih sering ingin semuanya cepat. Masih sering terlalu banyak mengambil pekerjaan sendiri.",
        "Masih perlu belajar membuat sistem kerja yang lebih rapi, memberikan ruang kepada orang lain, dan tidak merasa bahwa meminta bantuan adalah tanda bahwa saya tidak mampu.",
        "Setelah project ini, saya ingin berkembang menjadi pemimpin yang lebih tenang dalam mengambil keputusan, lebih jelas ketika memberi arah, dan lebih percaya kepada orang lain ketika mendelegasikan tanggung jawab.",
      ],
      pullQuote: null,
    },
    {
      number: "09",
      title: "What Comes Next",
      paragraphs: [
        "Saya juga ingin terus berada di persimpangan antara teknologi dan impact. Bukan sekadar membuat produk digital karena saya bisa, tetapi mencoba bertanya lebih dulu: siapa yang benar-benar membutuhkan ini, masalah apa yang sedang mereka hadapi, dan apakah teknologi yang kita buat akan benar-benar membantu setelah kita pergi.",
        "AI Co-Creation Lab Makassar dimulai dari satu pilot kecil. 20 mahasiswa, 5 UMKM, 5 masalah, 5 sistem. Angkanya mungkin tidak besar.",
        "Tetapi project ini mengajarkan saya bahwa impact tidak selalu dimulai dari sesuatu yang besar. Kadang ia dimulai ketika beberapa orang mau duduk di satu meja, mau saling mendengar, dan mau mencoba membangun sesuatu bersama.",
        "Project ini mengubah cara saya mendefinisikan penyelesaian. Penyelesaian bukan ketika ruangan kosong setelah sebuah acara. Penyelesaian adalah ketika orang, sistem, dan hubungan yang terbentuk sudah punya cukup struktur untuk berlanjut melampaui satu momen.",
      ],
      pullQuote:
        "Start small. Stay consistent. Build with others. Make it useful. Make it repeatable.",
    },
  ] as const satisfies readonly ReflectionEssaySection[],
} as const;

export const leadershipReflectionQuestions = [
  "Siapa yang benar-benar membutuhkan ini?",
  "Masalah apa yang sedang mereka hadapi?",
  "Apakah teknologi yang kita buat akan benar-benar membantu setelah kita pergi?",
] as const;

/* -------------------------------------------------------------------------- */
/* Final presentation                                                         */
/* -------------------------------------------------------------------------- */

export const finalPresentationOverview = {
  title: "Final Presentation",
  subtitle:
    "Sepuluh bagian utama dalam 16 slide yang merangkum perjalanan personal leadership, implementasi, dampak terukur, dan model co-creation yang dapat direplikasi.",
  deckLength: "16 slide",
  sectionCount: 10,
} as const;

export interface FinalPresentationSection {
  readonly number: string;
  readonly title: string;
  readonly slideRange: string;
  readonly purpose: string;
}

export const finalPresentationSections: readonly FinalPresentationSection[] = [
  {
    number: "01",
    title: "Personal Leadership Profile",
    slideRange: "Slide 02",
    purpose:
      "Memperkenalkan Riswan Ramadhan, nilai kepemimpinan, dan titik berangkat project.",
  },
  {
    number: "02",
    title: "Identifikasi Isu",
    slideRange: "Slide 03",
    purpose:
      "Menjelaskan jarak antara masalah operasional UMKM dan pengalaman mahasiswa menggunakan AI untuk pengguna nyata.",
  },
  {
    number: "03",
    title: "Network Mapping & Partnership",
    slideRange: "Slide 04",
    purpose:
      "Memetakan ekosistem program, UMKM, learning, infrastruktur, venue, akademik, sponsor, dan event support.",
  },
  {
    number: "04",
    title: "Mini Project Canvas",
    slideRange: "Slide 05",
    purpose:
      "Merangkum desain lima tim campuran dan alur Listen → Define → Build → Test → Improve.",
  },
  {
    number: "05",
    title: "Validasi Permasalahan",
    slideRange: "Slide 06",
    purpose:
      "Menampilkan lima UMKM, logo resminya, dan masalah yang sudah divalidasi sebelum implementasi.",
  },
  {
    number: "06",
    title: "Implementasi Project",
    slideRange: "Slide 07–09",
    purpose:
      "Menyajikan perjalanan implementasi, lima sistem yang dibangun, initial UAT, handover, serta capaian target.",
  },
  {
    number: "07",
    title: "Impact Measurement",
    slideRange: "Slide 10–13",
    purpose:
      "Menjelaskan metode, perubahan knowledge dan capability seluruh cohort, desain tim inklusif, dan suara peserta.",
  },
  {
    number: "08",
    title: "Leadership Reflection",
    slideRange: "Slide 14",
    purpose:
      "Merangkum pembelajaran meminta bantuan, mendelegasikan, mendengar, dan membangun struktur yang berlanjut.",
  },
  {
    number: "09",
    title: "Sustainability Plan",
    slideRange: "Slide 15",
    purpose:
      "Menjelaskan kesinambungan teknologi, manusia, pengukuran dampak, serta program dan replikasi.",
  },
  {
    number: "10",
    title: "Closing & Call to Action",
    slideRange: "Slide 16",
    purpose:
      "Menutup perjalanan dengan ajakan Build With AI. Solve Real Problems.",
  },
];

export interface FinalPresentationSlide {
  readonly number: string;
  readonly title: string;
  readonly headline: string;
  readonly description: string;
  readonly points: readonly string[];
}

export const finalPresentationSlides: readonly FinalPresentationSlide[] = [
  {
    number: "01",
    title: "Cover",
    headline: "AI Co-Creation Lab Makassar",
    description:
      "From AI Users to Local Problem Solvers. Riswan Ramadhan, Founder DekatLokal, BAKTI NUSA 15 Awardee.",
    points: [],
  },
  {
    number: "02",
    title: "Personal Leadership Profile",
    headline: "Riswan Ramadhan",
    description: "Informatics Engineering dan Founder DekatLokal.",
    points: ["Integrity", "Collaboration", "Real Impact"],
  },
  {
    number: "03",
    title: "Identifikasi Isu",
    headline: "Two Sides, One Gap",
    description:
      "UMKM punya masalah operasional nyata dengan akses terbatas ke solusi digital yang sesuai. Mahasiswa akrab dengan AI tetapi jarang membangun untuk pengguna sungguhan.",
    points: [],
  },
  {
    number: "04",
    title: "Network Mapping & Partnership",
    headline: "Built Together, Backed by an Ecosystem",
    description:
      "Peta stakeholder berdasarkan peran dan kontribusi nyata pada pelaksanaan.",
    points: [],
  },
  {
    number: "05",
    title: "Mini Project Canvas",
    headline: "4 Students + 1 UMKM = 1 Co-Creation Team",
    description: "Kerangka kerja tim sepanjang hari pelaksanaan.",
    points: ["Listen", "Define", "Build", "Test", "Improve"],
  },
  {
    number: "06",
    title: "Validasi Permasalahan",
    headline: "Five Validated Problems",
    description: "Lima UMKM dan masalah nyata yang menjadi dasar arah MVP.",
    points: [],
  },
  {
    number: "07",
    title: "Implementasi Project",
    headline: "From Validation to Handover",
    description: "Alur pelaksanaan sampai serah terima sistem.",
    points: [
      "Validate",
      "Match",
      "Learn",
      "Co-Create",
      "MVP",
      "UAT",
      "Handover",
    ],
  },
  {
    number: "08",
    title: "Five Systems Delivered",
    headline: "Five Systems, Five Real Businesses",
    description: "Lima sistem yang dibangun, diuji, dan diserahterimakan.",
    points: [],
  },
  {
    number: "09",
    title: "Target Achievement",
    headline: "Every primary delivery target was achieved.",
    description: "Capaian terhadap target awal pilot.",
    points: [
      "20/20 students",
      "5/5 UMKM",
      "5/5 teams",
      "5/5 functional MVP",
      "5/5 UAT",
      "5/5 handover",
      "5/5 infrastructure",
    ],
  },
  {
    number: "10",
    title: "Impact Measurement",
    headline: "Six Layers, Not One Score",
    description:
      "Knowledge, capability, experience, reflection, dan behavioral output dibaca terpisah.",
    points: [],
  },
  {
    number: "11",
    title: "Student Impact",
    headline: "What Changed for 20 Students",
    description: "Hasil pengukuran peserta pada dua skala berbeda.",
    points: [
      "Knowledge 71.25 → 100 (skala 0-100)",
      "Capability 3.27 → 4.72 (skala 1-5)",
      "Largest gain +1.56 Testing, Collaboration & Confidence",
      "20/20 peserta meningkat pada overall capability",
    ],
  },
  {
    number: "12",
    title: "Inclusive Team Design",
    headline: "Technical talent acted as an anchor, not a silo.",
    description:
      "Tujuh technical core disebar ke lima tim sebagai feasibility anchor; koreksi roster menempatkan Andi Alfian Rusani sebagai core Team 4 dan Achmad Alfian Saputra sebagai non-core.",
    points: [
      "7 technical core",
      "13 non-core",
      "5 mixed teams",
      "Seluruh peserta tetap terlibat dalam discovery, build, testing, dan pitching",
    ],
  },
  {
    number: "13",
    title: "Participant Voice",
    headline: "Quantitative Results, Backed by Participant Voice",
    description: "Perubahan cara kerja yang paling sering muncul di refleksi.",
    points: [
      "AI untuk tugas menjadi AI untuk masalah nyata",
      "Asumsi menjadi mendengarkan",
      "Kompleksitas menjadi MVP yang berguna",
      "Sekali bangun menjadi uji dan perbaiki",
    ],
  },
  {
    number: "14",
    title: "Leadership Reflection",
    headline:
      "Leadership is creating the conditions for people to build something meaningful together.",
    description: "Empat pembelajaran utama dari esai refleksi.",
    points: [
      "Ask for help",
      "Delegate",
      "Listen before deciding",
      "Build systems that outlive the event",
    ],
  },
  {
    number: "15",
    title: "Sustainability Plan",
    headline: "Four Layers of Continuity",
    description:
      "Handover, stabilisasi, transisi penggunaan, lalu monitoring bulanan. Tiga sistem dipegang student steward dan dua sistem ditangani DekatLokal.",
    points: ["Technology", "Human", "Impact", "Program"],
  },
  {
    number: "16",
    title: "Closing & Call to Action",
    headline: "From AI Users to Local Problem Solvers",
    description:
      "We started with five real problems and delivered five working systems. What continues beyond GEP is a support model and a replication guide that can bring the same process to new students, new UMKM, and new partners.",
    points: ["Build With AI. Solve Real Problems."],
  },
];

/* -------------------------------------------------------------------------- */
/* Sustainability section & closing                                           */
/* -------------------------------------------------------------------------- */

export const sustainabilitySection = {
  id: "sustainability-replication",
  title: "From One Pilot to a Repeatable Model",
  description:
    "Keberlanjutan berjalan pada dua tingkat: menjaga setiap sistem tetap berguna bagi UMKM pemiliknya, dan mengubah lab pertama ini menjadi model yang dapat dijalankan kembali.",
  status: "Completed",
  statusTone: "green" as const,
} as const;

export const weekFourClosing = {
  question: "What remains after the project ends?",
  items: [
    {
      value: "5 Systems",
      label: "diserahterimakan dan berlanjut ke transisi penggunaan serta monitoring.",
    },
    {
      value: "5 Supported Systems",
      label:
        "tiga dipegang student steward dan dua ditangani tim teknis DekatLokal.",
    },
    {
      value: "1 Replicable Model",
      label: "didokumentasikan melalui Refined Playbook dan Replication Kit.",
    },
  ],
  statement:
    "The GEP project is complete. The impact is designed to continue.",
} as const;

export const weekFourFinalNarrative = {
  pillars: [
    {
      title: "GEP Completed",
      description: "Seluruh perjalanan program formal telah dituntaskan.",
    },
    {
      title: "Five Systems Delivered",
      description:
        "Setiap UMKM menerima sistem fungsional dan menyelesaikan initial UAT.",
    },
    {
      title: "Responsible Operationalization",
      description:
        "Minggu pertama setelah event dipakai untuk stabilisasi agar sistem yang kritis bagi usaha akurat, andal, dan siap dipakai berkelanjutan.",
    },
    {
      title: "Continuity Has an Owner",
      description:
        "Tiga sistem memiliki student technical steward, dua ditangani langsung DekatLokal, dan kelimanya tetap didukung DekatLokal.",
    },
    {
      title: "Impact Is Measured",
      description:
        "Knowledge, capability, pengalaman, refleksi, dan output perilaku mahasiswa memberi lapisan bukti yang berbeda; outcome adopsi UMKM tetap mengikuti monitoring.",
    },
    {
      title: "The Model Is Replicable",
      description:
        "Refined Playbook mengemas pilot pertama menjadi model profesional yang dapat diulang.",
    },
  ],
  tagline: "From AI Users to Local Problem Solvers",
  cta: "Build With AI. Solve Real Problems.",
} as const;

/* -------------------------------------------------------------------------- */
/* Report copy                                                                */
/* -------------------------------------------------------------------------- */

export const weekFourReportCopy = {
  hub: {
    progressDescription:
      "Week 4 telah diselesaikan. AI Co-Creation Lab Makassar menuntaskan seluruh perjalanan GEP dari validasi masalah sampai implementasi, pengukuran dampak mahasiswa, refleksi, dan perencanaan keberlanjutan. Lima sistem fungsional telah diserahterimakan kepada lima UMKM dan berlanjut melalui siklus refinement, transisi penggunaan, technical stewardship, serta monitoring bulanan yang didukung DekatLokal.",
    outputs: [
      "Project Monitoring Report dengan lima sistem yang diserahterimakan dan model stewardship.",
      "Impact Measurement berbasis assessment 20 peserta beserta tiga berkas bukti terunduh.",
      "Leadership Reflection Essay sembilan bagian dari project lead.",
      "Sustainability plan empat lapis, Refined Playbook, dan Replication Kit.",
      "Final Presentation deck 16 slide.",
    ],
    reflection: null,
  },
  monitoring: {
    progressDescription:
      "Project Monitoring Report telah diselesaikan. Laporan memuat progres pelaksanaan, capaian target, kendala dan respons, lima sistem yang telah diserahterimakan beserta tangkapan layar aslinya, pembelajaran, dokumentasi kegiatan, model stewardship, serta rencana tindak lanjut dan monitoring bulanan. Laporan ini menjadi materi bagian Implementasi Project pada Final Presentation.",
    outputs: [
      "Executive summary pelaksanaan dan kelanjutannya setelah handover.",
      "Siklus implementasi delapan tahap beserta mekanisme keberlanjutannya.",
      "Lima sistem yang diserahterimakan dengan tangkapan layar dan logo aslinya.",
      "Tabel target dan capaian yang seluruhnya terpenuhi.",
      "Model stewardship dan monitoring bulanan.",
      "Enam pembelajaran implementasi.",
      "Kendala, solusi, dan rencana tindak lanjut dengan owner serta indikator keberhasilan.",
      "Project Monitoring Report dalam format PDF.",
    ],
    reflection: null,
  },
  impact: {
    progressDescription:
      "Impact Report telah diselesaikan. Laporan memuat jumlah penerima manfaat, keterlibatan mitra dan relawan, output, outcome mahasiswa, perubahan knowledge dan self-reported capability pada skala yang terpisah, testimoni dan suara peserta, dokumentasi aktual, Sustainability Plan, dan jalur replikasi. Outcome penggunaan UMKM tetap ditandai sebagai area monitoring, bukan hasil yang diasumsikan. Laporan ini menjadi materi bagian Dampak dan Keberlanjutan pada Final Presentation.",
    outputs: [
      "Kerangka pengukuran enam lapis tanpa satu skor akhir.",
      "Hasil knowledge dan self-reported capability beserta interpretasinya.",
      "Jumlah penerima manfaat, ekosistem, relawan, dokumentasi, dan perubahan yang terukur.",
      "Testimoni peserta dan galeri dokumentasi aktual.",
      "Tiga berkas bukti impact yang dapat diunduh publik.",
      "Sustainability plan empat lapis dan Refined Playbook.",
    ],
    reflection: null,
  },
  leadershipReflection: {
    progressDescription:
      "Leadership Reflection Essay telah selesai ditulis oleh Riswan Ramadhan dan dipublikasikan dalam sembilan bagian: dari ide yang membesar, belajar meminta bantuan, tantangan membangun jejaring, alasan membentuk mixed team, kelanjutan setelah event, perubahan cara memandang impact, munculnya minat replikasi, hal yang masih perlu dipelajari, sampai arah berikutnya.",
    outputs: [
      "Esai refleksi kepemimpinan sembilan bagian.",
      "Pembelajaran tentang delegasi dan kolaborasi lintas stakeholder.",
      "Hubungan antara keputusan mixed team dan hasil assessment.",
      "Definisi baru tentang arti menyelesaikan sebuah project.",
    ],
    reflection: null,
  },
  finalPresentation: {
    progressDescription:
      "Final Presentation telah diselesaikan. Deck 16 slide berformat 16:9 tersedia untuk dilihat langsung pada halaman ini serta diunduh sebagai PDF dan PowerPoint. Sepuluh bagian wajib mencakup personal leadership, identifikasi isu, partnership, Mini Project Canvas, validasi, implementasi, impact measurement, refleksi, Sustainability Plan, serta Closing & Call to Action.",
    outputs: [
      "Deck Final Presentation 16 slide berformat 16:9.",
      "Sepuluh bagian wajib dipetakan secara eksplisit ke slide isi.",
      "Slide viewer dengan navigasi dan mode layar penuh.",
      "Berkas PDF dan PowerPoint yang dapat diunduh.",
    ],
    reflection: null,
  },
} as const;
