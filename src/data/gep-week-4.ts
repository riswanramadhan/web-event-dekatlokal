import {
  eventVolunteers,
  networkPartnerGroups,
  studentCoCreationTeams,
} from "@/data/gep-week-3-completed";
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
  updatedAt: "18 Agustus 2026",
  updatedAtIso: "2026-08-18",
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
    "Turning implementation into measurable impact, continuous adoption, and a model that can be replicated.",
  status: "In Progress — Finalization Phase",
  statusTone: "amber" as const,
  nextStep: "Supported handover dan monitoring adopsi H+7",
  route: progressRoute("measure-reflect-sustain"),
  progressUrl: progressUrl("measure-reflect-sustain"),
  ...sharedUpdate,
} as const;

export const projectCompletionMonitoringHeader = {
  slug: "project-completion-monitoring",
  title: "Project Monitoring Report",
  metadataTitle:
    "Project Monitoring Report — AI Co-Creation Lab Makassar 2026",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "Progres pelaksanaan, capaian target, kendala, solusi, pembelajaran, dan rencana tindak lanjut AI Co-Creation Lab Makassar setelah implementation day.",
  status: "Implementation Complete · Post-Event Monitoring Active",
  statusTone: "amber" as const,
  nextStep: "Supported handover, lalu monitoring adopsi H+7",
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
    "Penerima manfaat, hasil pengukuran mahasiswa, outcome awal UMKM, keterbatasan metodologi, rencana keberlanjutan, dan jalur replikasi model.",
  status: "Impact Data Available · Adoption Monitoring Continues",
  statusTone: "amber" as const,
  nextStep: "Monitoring adopsi H+7 dan follow-up H+30",
  route: progressRoute("impact-measurement"),
  progressUrl: progressUrl("impact-measurement"),
  ...sharedUpdate,
} as const;

export const leadershipReflectionHeader = {
  slug: "leadership-reflection",
  title: "Leadership Reflection",
  metadataTitle:
    "Leadership Reflection — Riswan Ramadhan | AI Co-Creation Lab",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "What I learned from building something that could not be built alone.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Refleksi menjadi bahan bagian Leadership pada Final Presentation",
  route: progressRoute("leadership-reflection"),
  progressUrl: progressUrl("leadership-reflection"),
  ...sharedUpdate,
} as const;

export const finalPresentationHeader = {
  slug: "final-presentation",
  title: "Final Presentation",
  metadataTitle:
    "Final Presentation — AI Co-Creation Lab Makassar | GEP 2026",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "The complete journey from personal leadership to measurable impact and a repeatable co-creation model.",
  status: "Final Deck Development",
  statusTone: "blue" as const,
  nextStep: "Menyusun deck 16 slide dari materi yang sudah tersedia",
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
/* Week 4 hub                                                                 */
/* -------------------------------------------------------------------------- */

export const weekFourOverview = {
  title: "Week 4 — Measure, Reflect & Sustain",
  subtitle:
    "Turning implementation into measurable impact, continuous adoption, and a model that can be replicated.",
  description:
    "Week 4 adalah fase penutup Global Experience Program. Implementation day sudah selesai, assessment sudah lengkap, dan initial UAT sudah dilakukan bersama lima UMKM. Yang berjalan sekarang adalah technical refinement, penyiapan supported handover, dan penyusunan laporan akhir.",
  status: "In Progress — Finalization Phase",
  statusTone: "amber" as const,
} as const;

export const weekFourActiveReasons = [
  "Implementation event pada 10 Agustus 2026 telah selesai.",
  "Pre-test, post-test, dan reflection 20 peserta telah lengkap.",
  "Initial UAT bersama lima UMKM telah selesai.",
  "MVP refinement sedang berlangsung.",
  "Domain dan hosting untuk lima sistem telah aktif.",
  "Supported handover dan monitoring H+7 menjadi langkah berikutnya.",
  "Final report sedang disusun.",
] as const;

export const weekFourBigStory = {
  journey: [
    "Discover",
    "Validate",
    "Co-Create",
    "Build",
    "Test",
    "Refine",
    "Measure",
    "Sustain",
    "Replicate",
  ],
  narrative:
    "AI Co-Creation Lab Makassar tidak berakhir ketika event selesai pada 10 Agustus 2026. Event tersebut adalah implementation day dari perjalanan yang lebih panjang. Setelah lima tim menghasilkan lima functional MVP, DekatLokal melanjutkan proses melalui refinement, deployment, supported handover, monitoring, impact measurement, dan dokumentasi model agar dapat direplikasi.",
  statement: "The Lab is completed. The adoption journey has started.",
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
      "Progres pelaksanaan, capaian target, kendala, solusi, pembelajaran, dokumentasi kegiatan, dan rencana tindak lanjut setelah implementation day.",
    status: "Implementation Complete · Post-Event Monitoring Active",
    statusTone: "amber",
    route: progressRoute("project-completion-monitoring"),
  },
  {
    number: "02",
    slug: "impact-measurement",
    title: "Impact & Sustainability Report",
    description:
      "Hasil pengukuran mahasiswa, outcome awal UMKM, keterbatasan metodologi, sustainability plan, dan jalur replikasi.",
    status: "Impact Data Available · Adoption Monitoring Continues",
    statusTone: "amber",
    route: progressRoute("impact-measurement"),
  },
  {
    number: "03",
    slug: "leadership-reflection",
    title: "Leadership Reflection",
    description:
      "Refleksi personal Riswan Ramadhan tentang meminta bantuan, membangun jejaring, mendelegasikan, dan menjaga manfaat setelah event selesai.",
    status: "Completed",
    statusTone: "green",
    route: progressRoute("leadership-reflection"),
  },
  {
    number: "04",
    slug: "final-presentation",
    title: "Final Presentation",
    description:
      "Struktur 16 slide yang merangkai leadership journey, implementasi, impact measurement, sustainability, dan replikasi.",
    status: "Final Deck Development",
    statusTone: "blue",
    route: progressRoute("final-presentation"),
  },
] as const satisfies readonly WeekFourProgressCard[];

export const weekFourSecondaryCard = {
  title: "Sustainability & Replication Assets",
  description:
    "Playbook, curriculum, co-creation toolkit, technical starter kit, dan measurement kit yang menjadikan pilot pertama ini dapat dijalankan kembali.",
  status: "Playbook & Replication Kit in Development",
  statusTone: "blue" as const,
  href: "#sustainability-replication",
} as const;

export const weekFourStatusOverview = [
  {
    title: "Project Monitoring Report",
    status: "Implementation Complete · Monitoring Active",
    statusTone: "amber",
    href: progressRoute("project-completion-monitoring"),
  },
  {
    title: "Impact & Sustainability Report",
    status: "Impact Data Available",
    statusTone: "amber",
    href: progressRoute("impact-measurement"),
  },
  {
    title: "Leadership Reflection",
    status: "Completed",
    statusTone: "green",
    href: progressRoute("leadership-reflection"),
  },
  {
    title: "Final Presentation",
    status: "Final Deck Development",
    statusTone: "blue",
    href: progressRoute("final-presentation"),
  },
  {
    title: "Sustainability & Replication",
    status: "Playbook & Replication Kit in Development",
    statusTone: "blue",
    href: "#sustainability-replication",
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
      "Lima MVP fungsional selesai, seluruhnya melewati initial UAT bersama pemiliknya.",
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
      "Refinement, supported handover, technical stewardship, serta monitoring H+7 dan H+30.",
  },
  {
    number: "04",
    question: "Can this model be repeated?",
    answer:
      "Playbook dan Replication Kit v1.0 sedang disusun dari pembelajaran pilot pertama.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Project monitoring report                                                  */
/* -------------------------------------------------------------------------- */

export const monitoringPurpose =
  "Merekam progres pelaksanaan, capaian terhadap target, kendala, solusi, pembelajaran, dokumentasi kegiatan, dan rencana tindak lanjut sebagai materi utama bagian Project Implementation pada Final Presentation.";

export const monitoringReportContents = [
  "Progres pelaksanaan",
  "Capaian target",
  "Kendala",
  "Solusi",
  "Pembelajaran",
  "Dokumentasi kegiatan",
  "Rencana tindak lanjut",
] as const;

export const monitoringExecutiveSummary = {
  paragraphs: [
    "AI Co-Creation Lab Makassar mempertemukan 20 mahasiswa dan 5 UMKM dalam lima tim co-creation untuk membangun solusi digital dari masalah bisnis yang telah divalidasi sebelumnya. Pada implementation day, seluruh tim menghasilkan functional MVP yang kemudian didemonstrasikan dan dicoba langsung oleh UMKM. Setelah kegiatan, DekatLokal melanjutkan technical refinement agar setiap MVP semakin stabil, responsif, dan siap digunakan secara berkelanjutan.",
    "Seluruh lima UMKM telah melakukan initial UAT dan menerima arah solusi yang dibangun untuk dilanjutkan ke tahap refinement dan supported handover.",
  ],
  quote:
    "The event was the implementation day, not the finish line. The project continues until each system is refined, handed over, and actually used.",
} as const;

export type ImplementationPhaseStatus = "Completed" | "Active" | "Next";

export interface ImplementationPhase {
  readonly number: string;
  readonly title: string;
  readonly status: ImplementationPhaseStatus;
  readonly details: readonly string[];
}

export const implementationPhases: readonly ImplementationPhase[] = [
  {
    number: "01",
    title: "Problem Validation",
    status: "Completed",
    details: [
      "Lima UMKM dipilih berdasarkan real operational problem.",
      "Kebutuhan divalidasi sebelum event dan dituangkan menjadi problem brief.",
      "Tim tetap diwajibkan mendengar UMKM secara langsung pada hari pelaksanaan.",
    ],
  },
  {
    number: "02",
    title: "Student Recruitment & Matching",
    status: "Completed",
    details: [
      "20 mahasiswa terpilih dari beberapa kampus.",
      "Lima tim dengan empat mahasiswa per tim.",
      "Mixed background, dengan minimal satu technical anchor di setiap tim.",
    ],
  },
  {
    number: "03",
    title: "Learning & Co-Creation",
    status: "Completed",
    details: [
      "Responsible AI dan problem understanding.",
      "MVP scoping dan user flow.",
      "AI-assisted development serta hands-on build bersama UMKM.",
    ],
  },
  {
    number: "04",
    title: "Prototype Development",
    status: "Completed",
    details: [
      "Lima functional MVP selesai pada hari pelaksanaan.",
      "Masing-masing menyelesaikan satu core workflow utama.",
    ],
  },
  {
    number: "05",
    title: "Initial UAT",
    status: "Completed",
    details: [
      "Seluruh UMKM mencoba sistem secara langsung.",
      "Feedback diterima dan dicatat per solusi.",
      "Seluruh arah solusi diterima untuk dilanjutkan ke refinement.",
    ],
  },
  {
    number: "06",
    title: "Technical Refinement",
    status: "Active",
    details: [
      "Stabilisasi server dan production readiness.",
      "Perbaikan UI/UX dan responsiveness.",
      "Penanganan technical stability sebelum handover.",
    ],
  },
  {
    number: "07",
    title: "Supported Handover",
    status: "Next",
    details: [
      "Final access dan user guide untuk setiap UMKM.",
      "Ownership penggunaan berada di tangan UMKM.",
      "Technical steward per sistem, dengan DekatLokal sebagai mentor dan quality support.",
    ],
  },
  {
    number: "08",
    title: "Adoption Monitoring",
    status: "Next",
    details: [
      "H+7 virtual monitoring setelah handover.",
      "H+30 follow-up sebagai sustainability commitment bila memungkinkan.",
    ],
  },
];

export type WeekFourUmkmId =
  | "eyfa-natural-oil"
  | "sukmajahe-sarabba"
  | "markisa-bintang-jaya"
  | "kira-kira-michi"
  | "dapur-andist";

interface MvpStatusDefinition {
  readonly solution: string;
  readonly status: string;
  readonly statusTone: StatusTone;
  readonly condition: readonly string[];
  readonly next: string;
}

const mvpStatusByUmkmId = {
  "eyfa-natural-oil": {
    solution: "POS, Stock, HPP & Reporting System",
    status: "Functional · UAT Accepted · Final Refinement",
    statusTone: "amber",
    condition: [
      "Functional MVP dengan alur POS, stok, HPP, dan laporan usaha.",
      "UMKM telah mencoba sistem pada initial UAT dan menerima arah solusinya.",
    ],
    next: "Final refinement sebelum supported handover.",
  },
  "sukmajahe-sarabba": {
    solution: "Outlet & Consignment Tracking System",
    status: "Functional · UAT Accepted · Final Refinement",
    statusTone: "amber",
    condition: [
      "Core direction mencakup data outlet, distribusi stok, konsinyasi, serta visibilitas status pembayaran.",
      "Akses mobile menjadi kebutuhan utama karena pemilik berpindah antar outlet.",
    ],
    next: "Final refinement dan penyiapan panduan penggunaan.",
  },
  "markisa-bintang-jaya": {
    solution: "Finance & Stock Management System",
    status: "Functional · UAT Accepted · Server Refinement",
    statusTone: "amber",
    condition: [
      "Functional MVP untuk pencatatan keuangan dan stok.",
      "Mahasiswa juga mengembangkan sisi admin sistem.",
      "UMKM sudah mencoba langsung dan menyatakan puas dengan core workflow.",
    ],
    next: "Server stabilization dan production readiness.",
  },
  "kira-kira-michi": {
    solution: "Digital Loyalty Card System",
    status: "Functional · UAT Accepted · UI/UX Refinement",
    statusTone: "amber",
    condition: [
      "Core direction mencakup registrasi, loyalitas pelanggan, digital stamps, approval admin, dan progresi reward.",
      "Sistem bersifat customer-facing sehingga tampilan menjadi faktor penentu.",
    ],
    next: "Perbaikan UI/UX dan responsiveness agar pengalaman pelanggan lebih menarik.",
  },
  "dapur-andist": {
    solution: "Financial Management System",
    status: "Functional · Realtime Core Flow Working · UAT Accepted",
    statusTone: "amber",
    condition: [
      "Core direction mencakup pemasukan, pengeluaran, HPP, omzet, dan pelaporan.",
      "Alur data realtime sudah berjalan pada core flow.",
    ],
    next: "Final polishing dan penyiapan readiness untuk handover.",
  },
} as const satisfies Record<WeekFourUmkmId, MvpStatusDefinition>;

function readMvpStatus(id: string): MvpStatusDefinition {
  if (id in mvpStatusByUmkmId) {
    return mvpStatusByUmkmId[id as WeekFourUmkmId];
  }

  throw new Error(`Missing Week 4 MVP status for UMKM: ${id}`);
}

export const fiveMvpStatus = umkmStakeholders.map((stakeholder, index) => {
  const mvp = readMvpStatus(stakeholder.id);

  return {
    number: String(index + 1).padStart(2, "0"),
    id: stakeholder.id,
    businessName: stakeholder.businessName,
    solution: mvp.solution,
    status: mvp.status,
    statusTone: mvp.statusTone,
    condition: mvp.condition,
    next: mvp.next,
  };
});

export const mvpStatusNote =
  "Seluruh solusi berstatus functional dan telah melewati initial UAT. Tidak ada sistem yang dinyatakan sudah diserahterimakan atau diadopsi karena supported handover dan monitoring H+7 belum dilakukan.";

export interface TargetAchievementRow {
  readonly indicator: string;
  readonly target: string;
  readonly actual: string;
  readonly achieved: boolean;
}

export const targetVsAchievement: readonly TargetAchievementRow[] = [
  { indicator: "Students", target: "20", actual: "20", achieved: true },
  { indicator: "UMKM", target: "5", actual: "5", achieved: true },
  {
    indicator: "Co-Creation Teams",
    target: "5",
    actual: "5",
    achieved: true,
  },
  { indicator: "Functional MVPs", target: "5", actual: "5", achieved: true },
  {
    indicator: "Initial UAT",
    target: "5 UMKM",
    actual: "5/5 completed",
    achieved: true,
  },
  { indicator: "Problem cases", target: "5", actual: "5", achieved: true },
  {
    indicator: "Domain + Hosting",
    target: "5 systems",
    actual: "5 activated",
    achieved: true,
  },
  {
    indicator: "Student Pre-test",
    target: "20",
    actual: "20",
    achieved: true,
  },
  {
    indicator: "Student Post-test",
    target: "20",
    actual: "20",
    achieved: true,
  },
  {
    indicator: "Student Reflection",
    target: "20",
    actual: "20",
    achieved: true,
  },
];

export const targetAchievementPending = [
  {
    indicator: "Supported handover",
    target: "5 systems",
    status: "Scheduled after final refinement",
  },
  {
    indicator: "H+7 adoption monitoring",
    target: "5 systems",
    status: "Monitoring H+7 scheduled",
  },
  {
    indicator: "H+30 adoption follow-up",
    target: "5 systems",
    status: "Post-handover adoption to be monitored",
  },
] as const;

export const targetAchievementNote =
  "Baris adopsi sengaja dipisahkan. Angka aktual H+7 dan H+30 tidak diisi sebelum monitoring benar-benar dilakukan.";

export interface ImplementationChallenge {
  readonly number: string;
  readonly title: string;
  readonly context: string;
  readonly response: string;
  readonly lesson: string;
  readonly lessonIsQuote: boolean;
  readonly extra?: readonly string[];
}

export const implementationChallenges: readonly ImplementationChallenge[] = [
  {
    number: "01",
    title: "One-Day Format Is Intense",
    context:
      "Dalam satu hari peserta harus memahami konteks usaha, belajar, mendefinisikan masalah, membangun, menguji, dan melakukan pitching.",
    response:
      "DekatLokal melanjutkan refinement setelah event, sehingga hasil hari itu tidak berhenti sebagai prototype sesaat.",
    lesson:
      "Replikasi berikutnya sebaiknya menggunakan format dua hari: Day 1 untuk Understand & Design, Day 2 untuk Build, Test & Improve.",
    lessonIsQuote: false,
    extra: ["Day 1 — Understand & Design", "Day 2 — Build, Test & Improve"],
  },
  {
    number: "02",
    title: "Different Technical Backgrounds",
    context:
      "Dua puluh peserta datang dengan latar belakang teknis yang berbeda-beda.",
    response:
      "Desain mixed-team menempatkan technical core sebagai anchor kelayakan teknis, bukan sebagai satu-satunya pihak yang membangun.",
    lesson: "Technical talent should act as an anchor, not a silo.",
    lessonIsQuote: true,
  },
  {
    number: "03",
    title: "Scope Creep",
    context:
      "UMKM memiliki banyak kebutuhan yang muncul bersamaan saat diskusi berlangsung.",
    response:
      "Tim diarahkan untuk fokus pada core problem, membatasi lingkup menjadi MVP, dan menyelesaikan satu core flow.",
    lesson: "Don't build everything. Build one core flow that works.",
    lessonIsQuote: true,
  },
  {
    number: "04",
    title: "Prototype Is Not Yet Production",
    context:
      "Functional prototype tidak otomatis menjadi sistem yang siap dipakai setiap hari.",
    response:
      "Ditetapkan alur lanjutan: MVP → Technical Review → Bug Fix → UI Refinement → Server/Domain → Supported Handover.",
    lesson:
      "Kesiapan produksi diperlakukan sebagai tahap tersendiri, bukan asumsi setelah demo berhasil.",
    lessonIsQuote: false,
    extra: [
      "MVP",
      "Technical Review",
      "Bug Fix",
      "UI Refinement",
      "Server/Domain",
      "Supported Handover",
    ],
  },
];

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
      "UMKM tidak selalu membutuhkan sistem kompleks; yang dibutuhkan adalah alur yang benar-benar terpakai.",
  },
  {
    number: "03",
    title: "AI Is an Accelerator, Not the Goal",
    description:
      "Pemahaman masalah tetap menjadi fondasi; AI mempercepat, bukan menggantikan proses berpikir.",
  },
  {
    number: "04",
    title: "Mixed Teams Create Shared Learning",
    description:
      "Teknologi tidak harus dimonopoli mahasiswa Informatika agar sebuah tim dapat membangun sesuatu.",
  },
  {
    number: "05",
    title: "Handover Needs Support",
    description:
      "Sistem tidak boleh diserahkan lalu ditinggalkan; pendampingan menentukan apakah sistem tetap terpakai.",
  },
] as const;

export const followUpPlan = [
  "Finalize 5 MVPs",
  "Production Deployment",
  "Supported Handover",
  "H+7 Virtual Monitoring",
  "Improvement Log",
  "H+30 Follow-Up",
  "Case Study & Playbook Update",
] as const;

export interface HandoverRole {
  readonly number: string;
  readonly actor: string;
  readonly role: string;
  readonly responsibilities: readonly string[];
}

export const supportedHandoverModel: readonly HandoverRole[] = [
  {
    number: "01",
    actor: "UMKM",
    role: "Product Owner / End User",
    responsibilities: [
      "Menggunakan sistem dalam operasional harian.",
      "Menentukan kebutuhan bisnis yang perlu diprioritaskan.",
      "Memberi feedback atas penggunaan nyata.",
    ],
  },
  {
    number: "02",
    actor: "Student Technical Steward",
    role: "First-Line Technical Maintainer",
    responsibilities: [
      "Menangani bug ringan dan basic maintenance.",
      "Menjaga komunikasi dengan pemilik usaha.",
      "Mencatat improvement log.",
    ],
  },
  {
    number: "03",
    actor: "DekatLokal",
    role: "Technical Mentor + Program Owner + Escalation Support",
    responsibilities: [
      "Quality control dan architecture guidance.",
      "Mentoring student steward.",
      "Eskalasi isu dan penjagaan kontinuitas.",
    ],
  },
  {
    number: "04",
    actor: "Infrastructure Partner",
    role: "Domain & Hosting Layer",
    responsibilities: ["Lima domain aktif.", "Lima hosting aktif."],
  },
];

export const supportedHandoverStatement =
  "UMKM owns the usage. Student Steward supports the system. DekatLokal mentors the continuity.";

export const monitoringDocumentation = {
  description:
    "Dokumentasi Week 4 memakai arsip aktual kegiatan yang sudah dikurasi pada Process Documentation Week 3, ditambah catatan refinement pasca-event. Tidak ada stock image yang digunakan.",
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
      label: "Network Mobilization Week 3",
      href: `${progressBaseRoute}/network-mobilization`,
      external: false,
    },
    {
      label: "Folder dokumentasi lengkap (Google Drive)",
      href: "https://drive.google.com/drive/folders/1whE01s1U86R6QEfs5sPHpj7wA6SrcJRN?usp=sharing",
      external: true,
    },
  ],
  coverage: [
    "Preparation",
    "Problem validation",
    "Meet the Leader",
    "Opening",
    "Workshop",
    "Hands-on build",
    "Student × UMKM co-creation",
    "Prototypes",
    "Pitching",
    "Volunteers",
    "Partners",
    "Group photos",
    "Post-event refinement",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Report availability (Report UI)                                            */
/* -------------------------------------------------------------------------- */

export interface ReportAvailability {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly statusTone: StatusTone;
  readonly lastUpdated: string;
  readonly viewLabel: string;
  readonly viewHref: string;
  readonly fileNote: string;
}

export const projectMonitoringReportAvailability: ReportAvailability = {
  id: "project-monitoring-report",
  title: "Project Monitoring Report",
  description:
    "Laporan lengkap dipublikasikan sebagai halaman web ini: executive summary, delapan fase implementasi, status lima MVP, capaian terhadap target, kendala dan solusi, pembelajaran, dokumentasi, serta rencana tindak lanjut.",
  status: "Published on this page",
  statusTone: "green",
  lastUpdated: sharedUpdate.updatedAt,
  viewLabel: "Baca ringkasan laporan",
  viewHref: "#monitoring-executive-summary",
  fileNote:
    "Belum ada versi PDF atau DOCX yang diterbitkan. Gunakan tombol cetak untuk menyimpan halaman ini sebagai PDF; tidak ada file kosong yang disediakan sebagai pengganti.",
};

export const impactReportAvailability: ReportAvailability = {
  id: "impact-sustainability-report",
  title: "Impact & Sustainability Report",
  description:
    "Laporan impact dan sustainability dipublikasikan sebagai halaman web ini: penerima manfaat, kerangka pengukuran, hasil knowledge dan capability, refleksi kualitatif, keterbatasan, sustainability plan, dan jalur replikasi.",
  status: "Published on this page",
  statusTone: "green",
  lastUpdated: sharedUpdate.updatedAt,
  viewLabel: "Baca hasil pengukuran",
  viewHref: "#impact-measurement-framework",
  fileNote:
    "Belum ada versi PDF atau DOCX yang diterbitkan. Gunakan tombol cetak untuk menyimpan halaman ini sebagai PDF; tidak ada file kosong yang disediakan sebagai pengganti.",
};

export const leadershipReflectionAvailability: ReportAvailability = {
  id: "leadership-reflection-essay",
  title: "Leadership Reflection Essay",
  description:
    "Esai refleksi kepemimpinan Riswan Ramadhan dipublikasikan penuh pada halaman ini dalam sembilan bagian.",
  status: "Published on this page",
  statusTone: "green",
  lastUpdated: sharedUpdate.updatedAt,
  viewLabel: "Baca esai lengkap",
  viewHref: "#reflection-essay",
  fileNote:
    "Belum ada versi PDF atau DOCX yang diterbitkan. Gunakan tombol cetak untuk menyimpan halaman ini sebagai PDF.",
};

/* -------------------------------------------------------------------------- */
/* Impact & sustainability report                                             */
/* -------------------------------------------------------------------------- */

export const impactReportPurpose =
  "Menyusun penerima manfaat, mitra, relawan, output, outcome, impact kuantitatif dan kualitatif, dokumentasi, sustainability plan, serta replication pathway sebagai materi bagian Impact Measurement & Sustainability pada Final Presentation.";

export const impactReportContents = [
  "Penerima manfaat",
  "Mitra",
  "Relawan",
  "Output",
  "Outcome",
  "Quantitative impact",
  "Qualitative impact",
  "Dokumentasi",
  "Sustainability plan",
  "Replication pathway",
] as const;

export const beneficiaries = {
  students: {
    label: "Direct Student Beneficiaries",
    value: "20 university students",
    description:
      "Dua puluh mahasiswa dari beberapa kampus yang mengikuti seluruh rangkaian pembelajaran, co-creation, build, dan assessment.",
  },
  umkm: {
    label: "Direct UMKM Beneficiaries",
    value: "5 local UMKM",
    description:
      "Lima pelaku usaha yang membawa masalah operasional nyata dan mencoba langsung sistem yang dibangun.",
    names: umkmStakeholders.map((stakeholder) => stakeholder.businessName),
  },
  separationNote:
    "Kedua kelompok penerima manfaat tidak digabungkan menjadi satu angka tanpa konteks, karena bentuk manfaat yang diterima berbeda.",
} as const;

const technicalCoreNames = [
  "Muhammad Makbul N",
  "Dimas Jayakusuma Sarma",
  "Fathur Rizqi S Djafar",
  "Marsha Carolince",
  "Andi Alfian Rusani",
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
  "Nama dan asal kampus mengikuti data peserta yang tersimpan pada dokumentasi Week 3, bukan penulisan panggilan sehari-hari.";

export const outputVsOutcome = {
  output: [
    "20 mahasiswa mengikuti seluruh rangkaian program.",
    "5 UMKM membawa masalah operasional nyata.",
    "5 tim co-creation terbentuk dengan komposisi campuran.",
    "5 functional MVP selesai pada implementation day.",
    "5 initial UAT dilakukan bersama pemilik usaha.",
    "Infrastruktur digital untuk lima sistem diaktifkan.",
    "Dokumentasi kegiatan terkurasi.",
    "Data assessment lengkap untuk 20 peserta.",
  ],
  studentOutcome: [
    "Peningkatan objective knowledge pada core knowledge check.",
    "Peningkatan self-reported capability pada empat dimensi.",
    "Cara pandang yang lebih user-centered dalam merancang solusi.",
    "Kepercayaan diri lebih tinggi pada testing dan kolaborasi.",
    "Kesediaan sebagian peserta melanjutkan sebagai technical steward.",
    "Pengalaman nyata membangun untuk pengguna sungguhan.",
  ],
  umkmOutcome: [
    "Masalah nyata diterjemahkan menjadi sistem yang berfungsi.",
    "UMKM mencoba langsung sistem yang dibangun untuk usahanya.",
    "Arah solusi diterima untuk dilanjutkan.",
    "Lima sistem masuk tahap refinement menuju penggunaan nyata.",
  ],
  longerTerm: [
    "Penggunaan berulang dalam operasional harian.",
    "Pengurangan waktu kerja operasional.",
    "Konsistensi pencatatan.",
    "Jumlah pengguna loyalty yang aktif.",
    "Pemakaian fitur laporan dan stok.",
    "Adopsi yang bertahan sampai H+30.",
  ],
  longerTermNote:
    "Enam indikator terakhir belum ditandai tercapai. Semuanya baru dapat dinilai setelah supported handover dan monitoring dilakukan.",
} as const;

export const sustainabilityPlan = [
  {
    number: "01",
    title: "Technology Sustainability",
    description:
      "Menjaga setiap sistem tetap hidup dan layak dipakai setelah program selesai.",
    flow: [
      "Functional MVP",
      "Refinement",
      "Production Deployment",
      "Active Domain & Hosting",
      "Handover",
      "Maintenance",
    ],
  },
  {
    number: "02",
    title: "Human Sustainability",
    description:
      "Menjaga mahasiswa tetap terlibat melalui peran yang jelas setelah event berakhir.",
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
      "Menjaga pengukuran tetap berjalan sampai adopsi benar-benar terlihat.",
    flow: [
      "Initial UAT",
      "H+7 Monitoring",
      "Improvement Log",
      "H+30 Follow-Up",
      "Case Study",
    ],
  },
  {
    number: "04",
    title: "Program Sustainability",
    description:
      "Mengubah satu pilot menjadi model yang dapat dijalankan kembali oleh pihak lain.",
    flow: [
      "Pilot 1 Makassar",
      "Capture Lessons",
      "Standardize",
      "Playbook",
      "Replication Kit",
      "Replicate",
    ],
  },
] as const;

export const replicationInterest = {
  title: "From Pilot to Replication Opportunity",
  label: "Replication Interest / Potential Collaboration",
  description:
    "Setelah program berjalan, dua pihak dalam ekosistem menyampaikan ketertarikan terhadap kemungkinan model ini dijalankan kembali. Keduanya dicatat sebagai ketertarikan replikasi, bukan sebagai kerja sama resmi baru, karena belum ada dokumen formal yang ditandatangani untuk itu.",
  items: [
    {
      party: "Rumah BUMN Makassar",
      note: "Menunjukkan ketertarikan agar model ini dapat direplikasi bersama ekosistem UMKM binaannya.",
      status: "Replication interest",
    },
    {
      party: "BBLSDM Komdigi Makassar",
      note: "Menunjukkan ketertarikan pada kegiatan serupa dan membutuhkan materi terstruktur untuk kemungkinan pengajuan program ke tingkat pusat.",
      status: "Requested replication materials",
    },
    {
      party: "DekatLokal",
      note: "Dapat diposisikan sebagai model owner, implementation partner, dan technical mentor bila replikasi berlanjut.",
      status: "Potential collaboration",
    },
  ],
  statement:
    "The strongest sustainability signal is not only that the systems continue, but that external stakeholders are asking how the model can be repeated.",
} as const;

export interface ReplicationKitAsset {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly statusTone: StatusTone;
  readonly contents: readonly string[];
}

export const replicationKitVersion = "AI Co-Creation Lab Replication Kit v1.0";

export const replicationKitAssets: readonly ReplicationKitAsset[] = [
  {
    id: "playbook",
    number: "01",
    title: "Playbook",
    name: "AI Co-Creation Lab Playbook v1.0",
    description:
      "Panduan lengkap menjalankan model dari konsep sampai monitoring pasca-handover.",
    status: "In Development",
    statusTone: "amber",
    contents: [
      "Program concept",
      "Target beneficiaries",
      "Stakeholder roles",
      "UMKM selection",
      "Student recruitment",
      "Team matching",
      "Problem validation",
      "Co-creation flow",
      "Facilitation",
      "Technical setup",
      "UAT",
      "Handover",
      "Monitoring",
      "Lessons learned",
      "Replication checklist",
    ],
  },
  {
    id: "curriculum",
    number: "02",
    title: "Curriculum",
    name: "AI Co-Creation Lab Learning Journey",
    description:
      "Rangkaian pembelajaran dua hari berdasarkan pembelajaran dari format satu hari pilot pertama.",
    status: "In Development",
    statusTone: "amber",
    contents: [
      "Day 1 — Responsible AI",
      "Day 1 — UMKM context",
      "Day 1 — Problem discovery",
      "Day 1 — Workflow",
      "Day 1 — Problem vs feature",
      "Day 1 — MVP & user flow",
      "Day 2 — AI-assisted build",
      "Day 2 — Testing & iteration",
      "Day 2 — Final demo",
      "Day 2 — Handover planning",
    ],
  },
  {
    id: "co-creation-toolkit",
    number: "03",
    title: "Co-Creation Toolkit",
    name: "Co-Creation Toolkit",
    description:
      "Perangkat kerja yang dipakai tim selama proses discovery sampai pengujian.",
    status: "In Development",
    statusTone: "amber",
    contents: [
      "UMKM Interview Guide",
      "Problem Validation Form",
      "Case Brief Template",
      "MVP Worksheet",
      "User Flow Worksheet",
      "Testing Checklist",
      "Feedback Sheet",
      "UAT Form",
    ],
  },
  {
    id: "technical-starter-kit",
    number: "04",
    title: "Technical Starter Kit",
    name: "AI Co-Creation Lab Technical Starter Kit",
    description:
      "Fondasi teknis agar tim tidak memulai dari nol pada hari pelaksanaan.",
    status: "In Development",
    statusTone: "amber",
    contents: [
      "Recommended stack",
      "Starter repository",
      "Auth/database template",
      "Deployment checklist",
      "Environment checklist",
      "Basic security checklist",
      "AI Prompt Starter",
    ],
  },
  {
    id: "measurement-kit",
    number: "05",
    title: "Measurement Kit",
    name: "AI Co-Creation Lab Measurement Kit",
    description:
      "Instrumen pengukuran hasil belajar mahasiswa dan perubahan operasional UMKM.",
    status: "In Development",
    statusTone: "amber",
    contents: [
      "Pre-test",
      "Post-test",
      "Scenario knowledge test",
      "Capability assessment",
      "Post-program experience",
      "Reflection",
      "Prototype rubric",
      "UMKM UAT",
      "H+7",
      "H+30",
      "Adoption status",
    ],
  },
];

export const playbookVersioning = [
  {
    version: "v1.0",
    description: "Disusun berdasarkan Pilot 1 Makassar 2026.",
    status: "In Development",
  },
  {
    version: "v1.1",
    description: "Diperbarui setelah temuan adopsi H+7 dan H+30 tersedia.",
    status: "Planned",
  },
  {
    version: "v2.0",
    description: "Disusun setelah model diuji melalui implementasi berikutnya.",
    status: "Planned",
  },
] as const;

export const replicationStatements = [
  "The goal is not to replicate the same five systems.",
  "The goal is to replicate the process that connects real problems, real users, and student builders.",
] as const;

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
        "Setelah melihat hasil pre-test dan post-test, saya semakin yakin bahwa keputusan itu punya nilai. Mahasiswa technical core memang datang dengan baseline yang lebih tinggi. Tetapi peserta non-core menunjukkan peningkatan yang sangat besar dan gap antar kelompok menjadi jauh lebih kecil setelah program.",
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
        "DekatLokal akan melanjutkan refinement, membantu deployment, melakukan supported handover, dan menjaga mahasiswa tetap terlibat melalui technical stewardship.",
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
        "Karena itu saya ingin menyelesaikan Playbook dan Replication Kit ini dengan serius. Bukan untuk membuat project terlihat lebih besar, tetapi supaya apa yang kami pelajari tidak hilang ketika program ini selesai.",
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
        "Dan mungkin tugas saya setelah ini bukan membuat semuanya semakin besar secepat mungkin. Tugas saya adalah menjaga agar apa yang sudah dimulai ini tetap berguna, terus belajar dari kekurangannya, dan membuat jalannya cukup jelas agar orang lain juga bisa melanjutkannya.",
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
    "The complete journey from personal leadership to measurable impact and a repeatable co-creation model.",
  deckLength: "16 slide",
  note: "Struktur berikut adalah rancangan deck final. Slide count final, file, dan tanggal berkas baru ditampilkan setelah deck benar-benar tersedia.",
} as const;

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
    description: "From AI Users to Local Problem Solvers.",
    points: [],
  },
  {
    number: "02",
    title: "Personal Leadership Profile",
    headline: "Riswan Ramadhan",
    description:
      "Informatics Engineering, Founder DekatLokal, BAKTI NUSA 15.",
    points: ["Integrity", "Collaboration", "Real Impact"],
  },
  {
    number: "03",
    title: "Identifikasi Isu",
    headline: "Two Sides, One Gap",
    description:
      "UMKM memiliki masalah operasional nyata, sementara mahasiswa terbiasa dengan AI tetapi jarang membangun untuk pengguna sungguhan.",
    points: [],
  },
  {
    number: "04",
    title: "Network Mapping & Partnership",
    headline: "Built Together, Backed by an Ecosystem",
    description:
      "Peta stakeholder berdasarkan peran dan kontribusi, bukan dinding logo.",
    points: [],
  },
  {
    number: "05",
    title: "Mini Project Canvas",
    headline: "4 Students + 1 UMKM = 1 Team",
    description: "Kerangka kerja tim sepanjang hari pelaksanaan.",
    points: ["Listen", "Define", "Build", "Test", "Improve"],
  },
  {
    number: "06",
    title: "Validasi Permasalahan",
    headline: "Five Validated Problems",
    description: "Pemetaan lima UMKM dan masalah nyata menuju arah MVP.",
    points: [],
  },
  {
    number: "07",
    title: "Implementasi Project",
    headline: "How the Lab Ran",
    description: "Alur pelaksanaan dari validasi sampai initial UAT.",
    points: [
      "Validate",
      "Recruit",
      "Match",
      "Learn",
      "Co-Create",
      "MVP",
      "UAT",
    ],
  },
  {
    number: "08",
    title: "5 Functional MVPs",
    headline: "Five Systems, Five Real Businesses",
    description: "Lima kartu solusi lengkap dengan status aktual.",
    points: [],
  },
  {
    number: "09",
    title: "Beyond Event Day",
    headline: "The Adoption Journey",
    description: "Kelanjutan setelah implementation day.",
    points: [
      "MVP",
      "Refinement",
      "Deployment",
      "Supported Handover",
      "H+7",
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
      "Largest gain +1.56 pada Testing, Collaboration & Confidence",
      "20/20 peserta meningkat pada overall capability",
    ],
  },
  {
    number: "12",
    title: "Inclusive Learning",
    headline: "Technical talent acted as an anchor, not a silo.",
    description: "Perbandingan technical core dan non-core.",
    points: [
      "Core knowledge 92.86 → 100",
      "Non-core knowledge 59.62 → 100",
      "Core capability 3.82 → 4.95",
      "Non-core capability 2.97 → 4.60",
    ],
  },
  {
    number: "13",
    title: "Leadership Reflection",
    headline: "What I Learned Leading This",
    description: "Empat pembelajaran utama dari esai refleksi.",
    points: [
      "Ask for help",
      "Delegate",
      "Listen before deciding",
      "Build systems that outlive the event",
    ],
  },
  {
    number: "14",
    title: "Sustainability Plan",
    headline: "Four Layers of Continuity",
    description: "Rencana keberlanjutan yang dipisahkan per lapisan.",
    points: ["Technology", "Human", "Impact", "Program"],
  },
  {
    number: "15",
    title: "From Pilot to Replication",
    headline: "A Model, Not Just an Event",
    description:
      "Rumah BUMN Makassar dan Komdigi menyampaikan replication interest; keduanya ditulis sebagai potential collaboration.",
    points: [
      "Pilot",
      "Learn",
      "Playbook",
      "Curriculum",
      "Toolkit",
      "Measurement Kit",
      "Replication",
    ],
  },
  {
    number: "16",
    title: "Closing & Call to Action",
    headline: "From AI Users to Local Problem Solvers",
    description:
      "We started with five problems and five systems. What we want to leave behind is a model that can keep creating useful solutions with new students, new UMKM, and new partners.",
    points: ["Build With AI. Solve Real Problems."],
  },
];

export const finalPresentationReadiness = [
  { title: "Personal Leadership Profile", status: "Available", tone: "green" },
  { title: "Issue Identification", status: "Available", tone: "green" },
  {
    title: "Network Mapping & Partnership",
    status: "Available",
    tone: "green",
  },
  { title: "Mini Project Canvas", status: "Available", tone: "green" },
  { title: "Problem Validation", status: "Available", tone: "green" },
  { title: "Project Implementation", status: "Available", tone: "green" },
  { title: "Impact Measurement", status: "Available", tone: "green" },
  { title: "Leadership Reflection", status: "Available", tone: "green" },
  {
    title: "Sustainability Plan",
    status: "Available",
    tone: "green",
  },
  {
    title: "Replication Kit",
    status: "In Development",
    tone: "amber",
  },
  { title: "Final Deck File", status: "In Development", tone: "amber" },
] as const satisfies readonly {
  readonly title: string;
  readonly status: string;
  readonly tone: StatusTone;
}[];

export const finalPresentationFileStatus = {
  title: "Final Presentation Deck",
  status: "Final Deck Development",
  statusTone: "amber" as const,
  lastUpdated: sharedUpdate.updatedAt,
  description:
    "Seluruh materi isi deck sudah tersedia pada halaman-halaman Week 4 ini. Yang sedang dikerjakan adalah penyusunan file presentasinya.",
  note: "Tidak ada file, slide count final, atau tanggal berkas yang ditampilkan sebelum deck tersedia. Tidak ada file kosong yang diunggah sebagai pengganti.",
} as const;

/* -------------------------------------------------------------------------- */
/* Sustainability section & closing                                           */
/* -------------------------------------------------------------------------- */

export const sustainabilitySection = {
  id: "sustainability-replication",
  title: "From One Pilot to a Repeatable Model",
  description:
    "Keberlanjutan disiapkan pada dua tingkat: menjaga setiap sistem tetap berguna bagi UMKM pemiliknya, dan mengubah lab pertama ini menjadi model yang dapat dijalankan kembali.",
  status: "Playbook & Replication Kit in Development",
  statusTone: "blue" as const,
} as const;

export const weekFourClosing = {
  question: "What remains after the project ends?",
  items: [
    {
      value: "5 Systems",
      label: "sedang disempurnakan untuk penggunaan berkelanjutan oleh UMKM.",
    },
    {
      value: "5 Technical Steward Opportunities",
      label: "didampingi mentorship DekatLokal.",
    },
    {
      value: "1 Replicable Model",
      label: "didokumentasikan melalui Playbook dan Replication Kit.",
    },
  ],
  statement:
    "The event ended on 10 August. The systems, relationships, learning, and model are designed to continue.",
} as const;

export const weekFourFinalNarrative = {
  paragraphs: [
    "AI Co-Creation Lab Makassar started as a one-month mini project, but it was designed not to end as a one-day event.",
    "The first layer of impact is visible in what students learned and built.",
    "The second layer is whether five UMKM continue to use and benefit from their systems.",
    "The third layer is whether the model itself can be improved, documented, and repeated.",
  ],
  closingLines: [
    "The event was the beginning.",
    "The systems continue through adoption.",
    "The students continue through stewardship.",
    "The model continues through replication.",
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
      "Week 4 memasuki fase finalisasi. Implementation event, assessment 20 peserta, dan initial UAT lima UMKM telah selesai; technical refinement sedang berjalan; supported handover dan monitoring H+7 menjadi langkah berikutnya. Project Monitoring Report, Impact & Sustainability Report, dan Leadership Reflection telah dipublikasikan pada halaman ini, sementara final deck dan Replication Kit masih dalam pengerjaan.",
    outputs: [
      "Project Monitoring Report lengkap dengan status lima MVP dan capaian terhadap target.",
      "Impact & Sustainability Report berbasis hasil pre-test, post-test, dan refleksi 20 peserta.",
      "Leadership Reflection Essay sembilan bagian dari project lead.",
      "Struktur Final Presentation 16 slide.",
      "Sustainability plan empat lapis dan kerangka Replication Kit v1.0.",
    ],
    reflection: null,
  },
  monitoring: {
    progressDescription:
      "Project Monitoring Report merekam delapan fase implementasi, status lima functional MVP setelah initial UAT, capaian terhadap target awal, empat kendala beserta responsnya, lima pembelajaran utama, model supported handover, serta rencana tindak lanjut sampai monitoring H+30. Status handover dan adopsi belum diisi karena kedua tahap tersebut belum dilakukan.",
    outputs: [
      "Executive summary pelaksanaan dan kelanjutan setelah event.",
      "Delapan fase implementasi dengan status Completed, Active, dan Next.",
      "Status aktual lima functional MVP setelah initial UAT.",
      "Tabel target dan capaian dengan baris adopsi yang dipisahkan.",
      "Empat kendala, respons, dan pembelajaran.",
      "Model supported handover empat peran.",
    ],
    reflection: null,
  },
  impact: {
    progressDescription:
      "Impact & Sustainability Report memuat penerima manfaat, kerangka pengukuran enam lapis, hasil knowledge pada skala 0-100, hasil self-reported capability pada skala 1-5, perbandingan technical core dan non-core, indikator pengalaman pasca-program, distribusi kesediaan technical steward, analisis tematik refleksi, keterbatasan metodologi, sustainability plan empat lapis, serta jalur replikasi. Outcome adopsi jangka panjang belum ditandai tercapai.",
    outputs: [
      "Kerangka pengukuran enam lapis tanpa satu skor akhir.",
      "Hasil knowledge dan capability beserta interpretasinya.",
      "Perbandingan technical core dan non-core dengan disclaimer metodologis.",
      "Analisis tematik refleksi 20 peserta.",
      "Sustainability plan empat lapis dan Replication Kit v1.0.",
      "Catatan keterbatasan sebagai pilot-level evidence.",
    ],
    reflection: null,
  },
  leadershipReflection: {
    progressDescription:
      "Leadership Reflection Essay telah selesai ditulis oleh Riswan Ramadhan dan dipublikasikan dalam sembilan bagian: dari ide yang membesar, belajar meminta bantuan, tantangan membangun jejaring, alasan membentuk mixed team, kelanjutan setelah event, perubahan cara memandang impact, munculnya minat replikasi, hal yang masih perlu dipelajari, sampai arah berikutnya.",
    outputs: [
      "Esai refleksi kepemimpinan sembilan bagian.",
      "Pembelajaran tentang delegasi dan kolaborasi.",
      "Hubungan antara keputusan mixed team dan hasil assessment.",
      "Komitmen kelanjutan setelah program berakhir.",
    ],
    reflection: null,
  },
  finalPresentation: {
    progressDescription:
      "Final Presentation berada pada tahap penyusunan deck. Struktur 16 slide telah ditetapkan dan seluruh materi isinya sudah tersedia melalui halaman monitoring, impact, dan reflection. Readiness checklist memisahkan bagian yang materinya siap dari file deck yang masih dikerjakan.",
    outputs: [
      "Struktur 16 slide Final Presentation.",
      "Readiness checklist per bagian materi.",
      "Rujukan sumber data untuk setiap slide impact.",
    ],
    reflection: null,
  },
} as const;
