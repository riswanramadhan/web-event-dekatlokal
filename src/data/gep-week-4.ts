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
  updatedAt: "13 Agustus 2026",
  updatedAtIso: "2026-08-13",
} as const;

export const weekFourHeader = {
  slug: "measure-reflect-sustain",
  title: "Week 4 — Measure, Reflect & Sustain",
  metadataTitle:
    "Week 4 — Measure, Reflect & Sustain | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "Completing the project, measuring real impact, reflecting on the leadership journey, and preparing the next chapter.",
  status: "In Progress",
  statusTone: "amber" as const,
  nextStep: "Project Completion & Monitoring",
  route: progressRoute("measure-reflect-sustain"),
  progressUrl: progressUrl("measure-reflect-sustain"),
  ...sharedUpdate,
} as const;

export const projectCompletionMonitoringHeader = {
  slug: "project-completion-monitoring",
  title: "Project Completion & Monitoring",
  metadataTitle:
    "Project Completion & Monitoring | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "Menyelesaikan seluruh rangkaian mini project dan memastikan manfaat yang dikembangkan benar-benar diterima oleh penerima manfaat.",
  status: "In Progress",
  statusTone: "amber" as const,
  nextStep: "Final UAT, improvement, handover, dan adoption monitoring",
  route: progressRoute("project-completion-monitoring"),
  progressUrl: progressUrl("project-completion-monitoring"),
  ...sharedUpdate,
} as const;

export const impactMeasurementHeader = {
  slug: "impact-measurement",
  title: "Impact Measurement",
  metadataTitle: "Impact Measurement | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "Mengukur perubahan yang dihasilkan mini project, tidak hanya berdasarkan jumlah peserta atau prototype.",
  status: "In Progress",
  statusTone: "amber" as const,
  nextStep:
    "Melanjutkan monitoring tanpa menyimpulkan impact sebelum data tersedia",
  route: progressRoute("impact-measurement"),
  progressUrl: progressUrl("impact-measurement"),
  ...sharedUpdate,
} as const;

export const leadershipReflectionHeader = {
  slug: "leadership-reflection",
  title: "Leadership Reflection",
  metadataTitle: "Leadership Reflection | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle:
    "What I learned from building, leading, listening, and collaborating.",
  status: "To Be Completed",
  statusTone: "neutral" as const,
  nextStep: "Menulis refleksi setelah project monitoring selesai",
  route: progressRoute("leadership-reflection"),
  progressUrl: progressUrl("leadership-reflection"),
  ...sharedUpdate,
} as const;

export const finalPresentationHeader = {
  slug: "final-presentation",
  title: "Final Presentation",
  metadataTitle: "Final Presentation | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 4",
  phase: "MEASURE, REFLECT & SUSTAIN",
  subtitle: "The complete journey of AI Co-Creation Lab Makassar.",
  status: "Preparation",
  statusTone: "blue" as const,
  nextStep: "Melengkapi impact, reflection, sustainability, dan final deck",
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

export const weekFourOverview = {
  title: "Week 4 — Measure, Reflect & Sustain",
  subtitle:
    "Completing the project, measuring real impact, reflecting on the leadership journey, and preparing the next chapter.",
  description:
    "Week 4 focuses on ensuring that the mini project does not stop at implementation. This phase captures project completion, beneficiary adoption, measurable impact, leadership learning, and the sustainability plan of AI Co-Creation Lab Makassar.",
  status: "In Progress",
  statusTone: "amber" as const,
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
    title: "Project Completion & Monitoring",
    description:
      "Melanjutkan solusi dari review prototype menuju UAT, improvement, deployment, handover, dan adoption monitoring.",
    status: "In Progress",
    statusTone: "amber",
    route: progressRoute("project-completion-monitoring"),
  },
  {
    number: "02",
    slug: "impact-measurement",
    title: "Impact Measurement",
    description:
      "Menyiapkan pengukuran perubahan mahasiswa dan UMKM tanpa mengubah target menjadi hasil aktual.",
    status: "In Progress",
    statusTone: "amber",
    route: progressRoute("impact-measurement"),
  },
  {
    number: "03",
    slug: "leadership-reflection",
    title: "Leadership Reflection",
    description:
      "Menyiapkan struktur refleksi personal yang baru akan ditulis setelah monitoring project.",
    status: "To Be Completed",
    statusTone: "neutral",
    route: progressRoute("leadership-reflection"),
  },
  {
    number: "04",
    slug: "final-presentation",
    title: "Final Presentation",
    description:
      "Menata struktur final deck sambil menunggu impact, reflection, dan evidence selesai diverifikasi.",
    status: "Preparation",
    statusTone: "blue",
    route: progressRoute("final-presentation"),
  },
] as const satisfies readonly WeekFourProgressCard[];

export const weekFourStatusOverview = [
  {
    title: "Project Completion & Monitoring",
    status: "In Progress",
    statusTone: "amber",
    href: progressRoute("project-completion-monitoring"),
  },
  {
    title: "Impact Measurement",
    status: "Data Collection / In Progress",
    statusTone: "amber",
    href: progressRoute("impact-measurement"),
  },
  {
    title: "Leadership Reflection",
    status: "To Be Completed",
    statusTone: "neutral",
    href: progressRoute("leadership-reflection"),
  },
  {
    title: "Final Presentation",
    status: "Preparation",
    statusTone: "blue",
    href: progressRoute("final-presentation"),
  },
  {
    title: "Sustainability & Replication",
    status: "Framework Development",
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

export const weekFourFinalJourney = [
  "COMPLETE",
  "MEASURE",
  "REFLECT",
  "SUSTAIN",
  "REPLICATE",
] as const;

export const weekFourFinalJourneySubtitle =
  "From Project Completion to a Repeatable Model";

export const completeProgramJourney = [
  "Discover",
  "Validate",
  "Co-Create",
  "Implement",
  "Measure",
  "Sustain",
  "Replicate",
] as const;

export const monitoringPurpose =
  "Menyelesaikan seluruh rangkaian mini project dan memastikan manfaat yang dikembangkan benar-benar diterima oleh penerima manfaat.";

export const monitoringCompletedContextFlow = [
  "Problem Validation",
  "Partnership",
  "Student Matching",
  "Co-Creation Lab",
  "Prototype Development",
] as const;

export const monitoringNextContextFlow = [
  "UAT",
  "Improvement",
  "Deployment",
  "Handover",
  "Adoption Monitoring",
] as const;

export const monitoringContextQuote =
  "The event was only the build moment. The project continues until the solutions are tested, improved, handed over, and actually used.";

export const monitoringFramework = [
  {
    number: "01",
    title: "Prototype Review",
    description: "Mengecek kondisi akhir setiap prototype setelah kegiatan.",
  },
  {
    number: "02",
    title: "Improvement",
    description: "Memperbaiki bug, workflow, dan feedback utama dari UMKM.",
  },
  {
    number: "03",
    title: "User Acceptance Testing",
    description: "UMKM mencoba core workflow sistem.",
  },
  {
    number: "04",
    title: "Deployment",
    description:
      "Prototype yang siap digunakan dipublikasikan ke environment atau domain yang sesuai.",
  },
  {
    number: "05",
    title: "Handover",
    description: "UMKM menerima sistem dan panduan penggunaan.",
  },
  {
    number: "06",
    title: "Adoption Monitoring",
    description:
      "Memantau apakah sistem mulai digunakan dan menemukan kendala penggunaan.",
  },
] as const;

export const monitoringPendingMessage =
  "Monitoring data will be updated after final UAT.";

export const solutionMonitoringFieldDefinitions = [
  { key: "prototypeStatus", label: "Prototype Status" },
  { key: "uatStatus", label: "UAT Status" },
  { key: "deploymentStatus", label: "Deployment Status" },
  { key: "handoverStatus", label: "Handover Status" },
  { key: "adoptionStatus", label: "Adoption Status" },
  { key: "mainIssue", label: "Main Issue" },
  { key: "improvement", label: "Improvement" },
  { key: "notes", label: "Notes" },
] as const;

export type SolutionMonitoringFieldKey =
  (typeof solutionMonitoringFieldDefinitions)[number]["key"];
export type SolutionMonitoringFieldState =
  "pending" | "in_progress" | "verified";

export interface SolutionMonitoringField {
  readonly key: SolutionMonitoringFieldKey;
  readonly label: string;
  readonly value: string | null;
  readonly state: SolutionMonitoringFieldState;
  readonly placeholder: string;
}

export interface SolutionMonitoringCase {
  readonly id: string;
  readonly businessName: string;
  readonly focus: string;
  readonly fields: readonly SolutionMonitoringField[];
}

type UmkmId = (typeof umkmStakeholders)[number]["id"];

const monitoringFocusByUmkmId = {
  "eyfa-natural-oil": "POS, stok, HPP, dan laporan.",
  "sukmajahe-sarabba": "Outlet dan consignment stock tracking.",
  "markisa-bintang-jaya": "Finance dan stock dashboard.",
  "kira-kira-michi": "Digital loyalty card.",
  "dapur-andist":
    "Finance tracking dan AI-assisted features jika hasil pengujian mendukung implementasinya.",
} as const satisfies Record<UmkmId, string>;

function readMonitoringFocus(id: string): string {
  if (id in monitoringFocusByUmkmId) {
    return monitoringFocusByUmkmId[id as keyof typeof monitoringFocusByUmkmId];
  }

  throw new Error(`Missing Week 4 monitoring focus for UMKM: ${id}`);
}

export const fiveSolutionMonitoring: readonly SolutionMonitoringCase[] =
  umkmStakeholders.map((stakeholder) => ({
    id: stakeholder.id,
    businessName: stakeholder.businessName,
    focus: readMonitoringFocus(stakeholder.id),
    fields: solutionMonitoringFieldDefinitions.map((field) => ({
      ...field,
      value: null,
      state: "pending" as const,
      placeholder: monitoringPendingMessage,
    })),
  }));

export interface EvidenceActionData {
  readonly label: string;
  readonly href: string | null;
  readonly enabled: boolean;
  readonly download?: boolean;
}

export interface EvidenceFileData {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly fileName: string | null;
  readonly fileType: string | null;
  readonly date: string | null;
  readonly fileSize: string | null;
  readonly previewHref: string | null;
  readonly slideCount: number | null;
  readonly lastUpdated: string | null;
  readonly status: string;
  readonly statusTone: StatusTone;
  readonly emptyTitle: string;
  readonly emptyDescription: string;
  readonly viewAction: EvidenceActionData;
  readonly downloadAction: EvidenceActionData;
}

function createPendingEvidenceFile({
  id,
  title,
  description,
  status,
  emptyTitle,
  emptyDescription,
  viewLabel,
  downloadLabel,
}: {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly emptyTitle: string;
  readonly emptyDescription: string;
  readonly viewLabel: string;
  readonly downloadLabel: string;
}): EvidenceFileData {
  return {
    id,
    title,
    description,
    fileName: null,
    fileType: null,
    date: null,
    fileSize: null,
    previewHref: null,
    slideCount: null,
    lastUpdated: null,
    status,
    statusTone: "neutral",
    emptyTitle,
    emptyDescription,
    viewAction: {
      label: viewLabel,
      href: null,
      enabled: false,
    },
    downloadAction: {
      label: downloadLabel,
      href: null,
      enabled: false,
      download: true,
    },
  };
}

export const projectMonitoringReportEvidence = createPendingEvidenceFile({
  id: "project-monitoring-report",
  title: "Project Monitoring Report",
  description:
    "Laporan akan memuat progress implementasi, capaian target, kendala, solusi, pembelajaran, dokumentasi, dan follow-up plan setelah datanya selesai diverifikasi.",
  status: "Report Being Prepared",
  emptyTitle: "Currently being prepared",
  emptyDescription:
    "Monitoring report akan ditambahkan setelah final UAT dan konsolidasi evidence selesai.",
  viewLabel: "View Report",
  downloadLabel: "Download Report",
});

export const impactReportEvidence = createPendingEvidenceFile({
  id: "impact-report",
  title: "AI Co-Creation Lab Impact Report",
  description:
    "Impact report akan memisahkan output, outcome, dan data stakeholder yang telah diverifikasi.",
  status: "Being Prepared",
  emptyTitle: "Data collection in progress",
  emptyDescription:
    "Impact report belum tersedia selama monitoring dan verifikasi data masih berjalan.",
  viewLabel: "View Impact Report",
  downloadLabel: "Download Impact Report",
});

export const leadershipReflectionEvidence = createPendingEvidenceFile({
  id: "leadership-reflection-essay",
  title: "Leadership Reflection Essay",
  description:
    "Essay akan ditambahkan setelah Riswan Ramadhan menyelesaikan project monitoring dan menulis refleksi personalnya.",
  status: "To Be Uploaded",
  emptyTitle: "Reflection will be added after project monitoring",
  emptyDescription: "Belum ada essay atau refleksi final yang dipublikasikan.",
  viewLabel: "Read Reflection",
  downloadLabel: "Download Essay",
});

export const finalPresentationEvidence = createPendingEvidenceFile({
  id: "final-presentation",
  title: "Final Presentation",
  description:
    "Component ini disiapkan untuk metadata, PDF preview, dan tindakan file setelah final deck tersedia.",
  status: "Final Deck in Preparation",
  emptyTitle: "Final deck is being prepared",
  emptyDescription:
    "Tidak ada file, slide count, atau tanggal file yang ditampilkan sebelum final presentation tersedia.",
  viewLabel: "View Presentation",
  downloadLabel: "Download Presentation",
});

export const weekFourPendingEvidence = [
  projectMonitoringReportEvidence,
  impactReportEvidence,
  leadershipReflectionEvidence,
  finalPresentationEvidence,
] as const;

export const monitoringReportOutline = [
  {
    title: "Progress Implementation",
    description: "Apa yang sudah dilakukan setelah event.",
  },
  {
    title: "Target Achievement",
    description: "Capaian dibanding target awal.",
  },
  {
    title: "Challenges",
    description: "Kendala implementasi.",
  },
  {
    title: "Solutions",
    description: "Bagaimana kendala ditangani.",
  },
  {
    title: "Key Learnings",
    description: "Pembelajaran utama.",
  },
  {
    title: "Documentation",
    description: "Foto, video, dan evidence yang telah diverifikasi.",
  },
  {
    title: "Follow-Up Plan",
    description: "Apa yang dilakukan setelah GEP selesai.",
  },
] as const;

export const impactPurpose =
  "Mengukur perubahan yang dihasilkan mini project, tidak hanya berdasarkan jumlah peserta atau prototype.";

export const impactMeasurementStatement =
  "We measure behavior change, adoption, and usefulness — not just attendance.";

export const studentImpactJourney = [
  "AI User",
  "AI-Assisted Problem Solver",
  "Co-Creator",
] as const;

export const studentImpactMeasurementAreas = [
  {
    title: "AI Problem-Solving Confidence",
    description:
      "Seberapa percaya diri menggunakan AI untuk real problem solving.",
  },
  {
    title: "Problem Validation",
    description: "Kemampuan memahami kebutuhan real user sebelum build.",
  },
  {
    title: "MVP Thinking",
    description: "Kemampuan membedakan core need dan unnecessary features.",
  },
  {
    title: "Real-User Experience",
    description: "Pengalaman bekerja langsung dengan beneficiary.",
  },
  {
    title: "Building Capability",
    description: "Kemampuan mengubah problem menjadi functional prototype.",
  },
  {
    title: "Collaboration",
    description: "Kemampuan bekerja dalam tim lintas background.",
  },
] as const;

export const studentMeasurementTimeline = [
  "Before",
  "Workshop",
  "After",
  "Reflection",
] as const;

export const studentMeasurementFields = [
  "Pre Score",
  "Post Score",
  "Change",
  "Student Reflection",
  "Mentor Observation",
] as const;

export const studentMeasurementPlaceholder = "Data collection in progress";

export const umkmImpactJourney = [
  "Manual Pain Point",
  "Prototype",
  "Testing",
  "Adoption",
  "Operational Benefit",
] as const;

export const umkmImpactMeasurementAreas = [
  {
    title: "Relevance",
    description: "Apakah solusi menjawab masalah utama.",
  },
  {
    title: "Usability",
    description: "Apakah sistem mudah digunakan.",
  },
  {
    title: "Intention to Use",
    description: "Apakah UMKM ingin menggunakannya.",
  },
  {
    title: "Actual Adoption",
    description: "Apakah sistem benar-benar dipakai setelah workshop.",
  },
  {
    title: "Operational Benefit",
    description: "Apakah proses menjadi lebih mudah, cepat, atau terstruktur.",
  },
] as const;

export const umkmMeasurementTimeline = [
  {
    title: "Baseline",
    description: "Bagaimana proses dilakukan sebelum solusi.",
  },
  {
    title: "Prototype Testing",
    description: "Feedback pertama terhadap sistem.",
  },
  {
    title: "H+7",
    description: "Early adoption.",
  },
  {
    title: "H+14",
    description: "Usability and improvement check.",
  },
  {
    title: "H+30",
    description: "Initial sustained adoption.",
  },
] as const;

const umkmImpactIndicatorsById = {
  "eyfa-natural-oil": [
    "Transaction recording consistency",
    "Stock visibility",
    "Time required for recording",
    "Report accessibility",
  ],
  "sukmajahe-sarabba": [
    "Number of outlets digitally recorded",
    "Ease of updating outlet stock",
    "Visibility of payment status",
    "Accessibility through mobile",
  ],
  "markisa-bintang-jaya": [
    "Consistency of income and expense recording",
    "Stock visibility",
    "Weekly and monthly report access",
    "Ease of mobile input",
  ],
  "kira-kira-michi": [
    "Registered customers",
    "Loyalty claims",
    "Successful digital stamps",
    "Usability for customer and admin",
  ],
  "dapur-andist": [
    "Financial records entered",
    "Reporting consistency",
    "Access to HPP and revenue information",
    "Usefulness of AI-assisted input if implemented",
  ],
} as const satisfies Record<UmkmId, readonly string[]>;

function readImpactIndicators(id: string): readonly string[] {
  if (id in umkmImpactIndicatorsById) {
    return umkmImpactIndicatorsById[
      id as keyof typeof umkmImpactIndicatorsById
    ];
  }

  throw new Error(`Missing Week 4 impact framework for UMKM: ${id}`);
}

export const fiveUmkmImpactFrameworks = umkmStakeholders.map((stakeholder) => ({
  id: stakeholder.id,
  businessName: stakeholder.businessName,
  label: "Potential measurement",
  frameworkOnly: true as const,
  indicators: readImpactIndicators(stakeholder.id),
  actualResult: null,
  resultStatus: "Data collection in progress",
}));

export const impactPlannedTargets = [
  "20 students engaged",
  "5 UMKM involved",
  "5 prototypes",
  "5 user testing sessions",
  "5 handovers planned",
  "Student skill improvement",
  "UMKM adoption",
] as const;

export const impactTargetResultRows = impactPlannedTargets.map(
  (plannedTarget) => ({
    plannedTarget,
    actualResult: null,
    actualResultLabel: "To be updated after monitoring",
    resultState: "pending" as const,
  }),
);

export const impactReportPlannedContents = [
  "Beneficiaries",
  "Students",
  "Partners",
  "Volunteers",
  "Outputs",
  "Outcomes",
  "Testimonials",
  "Documentation",
  "Sustainability plan",
] as const;

export const leadershipReflectionOwner = {
  name: "Riswan Ramadhan",
  role: "Founder DekatLokal and Project Lead",
  finalReflection: null,
} as const;

export const leadershipReflectionSections = [
  {
    number: "01",
    title: "What I Learned About Leadership",
    description: "Placeholder for a reflection written by Riswan Ramadhan.",
    prompts: [] as readonly string[],
  },
  {
    number: "02",
    title: "The Hardest Part",
    description: "Tantangan menjalankan project.",
    prompts: [] as readonly string[],
  },
  {
    number: "03",
    title: "Building the Network",
    description: "Pembelajaran dari kolaborasi lintas stakeholder.",
    prompts: [
      "UMKM",
      "Students",
      "Partners",
      "Sponsor",
      "Government",
      "Academic ecosystem",
    ],
  },
  {
    number: "04",
    title: "Decisions That Mattered",
    description: "Keputusan penting dalam project.",
    prompts: [] as readonly string[],
  },
  {
    number: "05",
    title: "What I Would Do Differently",
    description: "Placeholder for a future personal reflection.",
    prompts: [] as readonly string[],
  },
  {
    number: "06",
    title: "How This Project Changed Me",
    description: "Placeholder for a future personal reflection.",
    prompts: [] as readonly string[],
  },
  {
    number: "07",
    title: "What Comes Next",
    description: "Personal growth dan future leadership direction.",
    prompts: [] as readonly string[],
  },
] as const;

export const leadershipReflectionThemes = [
  "Listening before deciding",
  "Collaboration over individual execution",
  "Asking for support",
  "Handling uncertainty",
  "Balancing ambition and realistic execution",
  "Learning from real users",
  "Building trust",
  "Turning feedback into action",
] as const;

export const finalPresentationSections = [
  {
    number: "01",
    title: "Personal Leadership Profile",
    description: "Who I am, leadership journey, and personal values.",
  },
  {
    number: "02",
    title: "Identifikasi Isu",
    description: "Masalah dan gap yang ditemukan.",
  },
  {
    number: "03",
    title: "Network Mapping & Partnership",
    description: "Stakeholder, partner, dan collaboration ecosystem.",
  },
  {
    number: "04",
    title: "Mini Project Canvas",
    description: "Konsep dan design program.",
  },
  {
    number: "05",
    title: "Validasi Permasalahan",
    description: "Wawancara dan insight dari mahasiswa serta UMKM.",
  },
  {
    number: "06",
    title: "Implementasi Project",
    description: "Execution of AI Co-Creation Lab Makassar.",
  },
  {
    number: "07",
    title: "Impact Measurement",
    description: "Student impact dan UMKM impact.",
  },
  {
    number: "08",
    title: "Leadership Reflection",
    description: "Pembelajaran kepemimpinan.",
  },
  {
    number: "09",
    title: "Sustainability Plan",
    description: "Adoption dan replication model.",
  },
  {
    number: "10",
    title: "Closing & Call to Action",
    description: "From AI Users to Local Problem Solvers.",
  },
] as const;

export const finalPresentationFileCapabilities = [
  "PDF preview",
  "Slide count",
  "Last updated",
  "Download Presentation",
  "View Presentation",
] as const;

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
  {
    title: "Project Implementation",
    status: "Available / Being Finalized",
    tone: "amber",
  },
  { title: "Impact Measurement", status: "In Progress", tone: "amber" },
  { title: "Leadership Reflection", status: "Pending", tone: "neutral" },
  { title: "Sustainability Plan", status: "In Progress", tone: "amber" },
  { title: "Closing & CTA", status: "Preparation", tone: "blue" },
] as const satisfies readonly {
  readonly title: string;
  readonly status: string;
  readonly tone: StatusTone;
}[];

export const sustainabilitySection = {
  id: "sustainability-replication",
  title: "From One Pilot to a Repeatable Model",
  description:
    "Sustainability is prepared at two levels: keeping each solution useful for its UMKM and turning the first lab into a model that can be run again.",
  status: "Framework Development",
  statusTone: "blue" as const,
} as const;

export const solutionSustainabilityFlow = [
  "Prototype",
  "UAT",
  "Deploy",
  "Handover",
  "Monitor",
  "Improve",
] as const;

export const solutionSustainabilityAssets = [
  { title: "1-year digital infrastructure", status: "Planned" },
  { title: "UMKM user guide", status: "Planned" },
  { title: "Improvement log", status: "Planned" },
  { title: "Support channel", status: "Planned" },
  { title: "Adoption monitoring", status: "In Progress" },
] as const;

export const programSustainability = {
  description:
    "AI Co-Creation Lab Makassar diarahkan menjadi Pilot 1 untuk model yang bisa digunakan ulang, bukan hanya satu event.",
  flow: [
    "UMKM Selection",
    "Problem Validation",
    "Student Matching",
    "Co-Creation Lab",
    "Prototype Testing",
    "Adoption Monitoring",
  ],
} as const;

export const replicationAssets = [
  {
    id: "playbook",
    title: "Playbook",
    name: "AI Co-Creation Lab Playbook v1.0",
    description: "Complete guide to running the model.",
    status: "In Development",
    contents: [] as readonly string[],
    fileHref: null,
  },
  {
    id: "curriculum",
    title: "Curriculum",
    name: "AI Co-Creation Lab Learning Journey",
    description:
      "A learning sequence from foundational AI literacy to real-user testing.",
    status: "In Development",
    contents: [
      "AI Literacy",
      "Problem Understanding",
      "MVP",
      "AI-Assisted Build",
      "Testing",
    ],
    fileHref: null,
  },
  {
    id: "case-brief-template",
    title: "Case Brief Template",
    name: "UMKM Case Brief Template",
    description:
      "Template untuk mengubah hasil problem validation menjadi real business case.",
    status: "Available / To Be Packaged",
    availabilityNote:
      "Struktur problem validation tersedia dalam typed data existing; belum ada paket file terpisah untuk diunduh.",
    contents: [] as readonly string[],
    fileHref: null,
  },
  {
    id: "starter-kit",
    title: "Starter Kit",
    name: "AI Co-Creation Lab Technical Starter Kit",
    description: "Technical starter system untuk mempercepat build.",
    status: "In Development",
    contents: [] as readonly string[],
    fileHref: null,
  },
  {
    id: "measurement-kit",
    title: "Measurement Kit",
    name: "AI Co-Creation Lab Measurement Kit",
    description:
      "Template pengukuran pembelajaran mahasiswa dan perubahan operasional UMKM.",
    status: "In Development",
    contents: [
      "Student pre/post",
      "UMKM baseline",
      "Usability",
      "Adoption",
      "Follow-up",
    ],
    fileHref: null,
  },
] as const;

export const replicationStatements = [
  "The goal is not to replicate the same five systems.",
  "The goal is to replicate the process that connects real problems, real users, and student builders.",
] as const;

export const pilotStatements = [
  "The first lab becomes the pilot.",
  "The documentation becomes the model.",
] as const;

export const weekFourGuidingQuestions = [
  {
    number: "01",
    question: "Did the project actually work?",
    answer: "Project Completion & Monitoring.",
  },
  {
    number: "02",
    question: "Did it create meaningful change?",
    answer: "Impact Measurement.",
  },
  {
    number: "03",
    question: "What remains after the project ends?",
    answer: "Sustainability & Replication.",
  },
] as const;

export const weekFourClosingNarrative = {
  title: "AI Co-Creation Lab Makassar",
  tagline: "From AI Users to Local Problem Solvers",
  insight: "The event ends. The impact, learning, and model should continue.",
} as const;

export const weekFourReportCopy = {
  hub: {
    progressDescription:
      "Week 4 sedang disiapkan untuk menyelesaikan monitoring project, mengumpulkan data impact, menulis leadership reflection, dan merangkai final presentation. Belum ada hasil monitoring, klaim adopsi, refleksi final, atau file laporan yang dipublikasikan sebelum evidence tersedia.",
    plannedOutputs: [
      "Project completion and monitoring structure",
      "Student and UMKM impact measurement framework",
      "Leadership reflection structure",
      "Final presentation readiness structure",
      "Sustainability and replication framework",
    ],
    reflection: null,
  },
  monitoring: {
    progressDescription:
      "Project Completion & Monitoring sedang berjalan melalui review prototype, improvement, UAT, deployment readiness, handover preparation, dan adoption monitoring. Lima container UMKM telah disiapkan, tetapi status final setiap solusi belum dinyatakan sampai final UAT dan evidence tersedia.",
    plannedOutputs: [
      "Monitoring framework",
      "Five solution monitoring records",
      "Project Monitoring Report structure",
      "Follow-up report outline",
    ],
    reflection: null,
  },
  impact: {
    progressDescription:
      "Impact Measurement sedang berada pada fase data collection. Framework membedakan perubahan mahasiswa dan UMKM, memisahkan planned target dari actual result, dan tidak menampilkan angka impact sebelum monitoring selesai.",
    plannedOutputs: [
      "Student impact framework",
      "UMKM impact framework",
      "Baseline, testing, H+7, H+14, and H+30 timeline",
      "Target and result structure",
      "Impact Report structure",
    ],
    reflection: null,
  },
  leadershipReflection: {
    progressDescription:
      "Leadership Reflection belum ditulis. Halaman baru menyiapkan tujuh bagian dan subtle prompts untuk membantu Riswan Ramadhan merefleksikan proses setelah project monitoring selesai.",
    plannedOutputs: [
      "Seven-part reflection structure",
      "Reflection theme prompts",
      "Leadership Reflection Essay evidence area",
    ],
    reflection: null,
  },
  finalPresentation: {
    progressDescription:
      "Final Presentation masih dalam tahap preparation. Struktur sepuluh bagian dan readiness checklist telah disiapkan, sedangkan file, slide count, tanggal pembaruan file, dan preview baru akan ditampilkan setelah final deck tersedia.",
    plannedOutputs: [
      "Ten-part final presentation structure",
      "Final presentation readiness checklist",
      "Pending final deck evidence area",
    ],
    reflection: null,
  },
} as const;
