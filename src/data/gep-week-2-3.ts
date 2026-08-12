import { partners } from "@/data/partnership-collaboration";
import { umkmStakeholders } from "@/data/problem-validation";
import type { ProgressReportSlug } from "@/data/progress-reports";

const progressBaseRoute = "/ai-co-creation-lab-makassar/progress";
const publicProgressBaseUrl =
  "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress";

function progressRoute(slug: ProgressReportSlug) {
  return `${progressBaseRoute}/${slug}` as const;
}

function progressUrl(slug: ProgressReportSlug) {
  return `${publicProgressBaseUrl}/${slug}` as const;
}

const sharedUpdate = {
  updatedAt: "12 Agustus 2026",
  updatedAtIso: "2026-08-12",
} as const;

export const pitchingHeader = {
  slug: "pitching-mini-project" as ProgressReportSlug,
  title: "Pitching Mini Project",
  metadataTitle:
    "AI Co-Creation Lab Makassar — Mini Project Pitching | DekatLokal",
  weekLabel: "GEP WEEK 2",
  phase: "CONNECT & COLLABORATE",
  subtitle:
    "Presenting AI Co-Creation Lab Makassar to reviewers to validate the concept, strengthen the implementation plan, and identify what needs to be improved before execution.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Finalisasi Action Plan",
  route: progressRoute("pitching-mini-project"),
  progressUrl: progressUrl("pitching-mini-project"),
  download: {
    href: "/documents/pitching/AI-Co-Creation-Lab-Makassar-Pitch-Deck.pdf",
    label: "Download Pitch Deck",
  },
  ...sharedUpdate,
} as const;

export const finalActionPlanHeader = {
  slug: "final-action-plan" as ProgressReportSlug,
  title: "Finalisasi Action Plan",
  metadataTitle:
    "Finalisasi Action Plan — AI Co-Creation Lab Makassar | DekatLokal",
  weekLabel: "GEP WEEK 2",
  phase: "CONNECT & COLLABORATE",
  subtitle:
    "Menyempurnakan project berdasarkan hasil pitching dan masukan reviewer agar rencana implementasi lebih matang, terukur, dan dapat direplikasi.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Global Communication — My Leadership Journey",
  route: progressRoute("final-action-plan"),
  progressUrl: progressUrl("final-action-plan"),
  ...sharedUpdate,
} as const;

export const globalCommunicationHeader = {
  slug: "global-communication" as ProgressReportSlug,
  title: "Global Communication",
  metadataTitle:
    "My Leadership Journey — Global Communication | Riswan Ramadhan",
  weekLabel: "GEP WEEK 2",
  phase: "MY LEADERSHIP JOURNEY",
  subtitle:
    "A concise leadership story about integrity, collaboration, real impact, and the mission behind AI Co-Creation Lab Makassar.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Week 3 — Lead The Action",
  route: progressRoute("global-communication"),
  progressUrl: progressUrl("global-communication"),
  download: {
    href: "/media/global-communication/my-leadership-journey.mp4",
    label: "Download Video",
  },
  ...sharedUpdate,
} as const;

export const weekThreeHeader = {
  slug: "lead-the-action" as ProgressReportSlug,
  title: "Week 3 — Lead The Action",
  metadataTitle:
    "Lead The Action — AI Co-Creation Lab Makassar | DekatLokal",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Turning plans into action through leadership conversations, real project implementation, network mobilization, and documented impact.",
  status: "In Progress",
  statusTone: "amber" as const,
  nextStep: "Meet the Leader Challenge",
  route: progressRoute("lead-the-action"),
  progressUrl: progressUrl("lead-the-action"),
  ...sharedUpdate,
} as const;

export const meetTheLeaderHeader = {
  slug: "meet-the-leader" as ProgressReportSlug,
  title: "Meet the Leader Challenge",
  metadataTitle:
    "Meet the Leader Challenge — Rumah BUMN Makassar | DekatLokal",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Audiensi bersama pimpinan Rumah BUMN Makassar untuk memperoleh perspektif kepemimpinan, kolaborasi, dan masukan bagi mini project.",
  status: "Completed / Documentation Being Finalized",
  statusTone: "amber" as const,
  nextStep: "Leadership Conversation Report",
  route: progressRoute("meet-the-leader"),
  progressUrl: progressUrl("meet-the-leader"),
  ...sharedUpdate,
} as const;

export const leadershipConversationHeader = {
  slug: "leadership-conversation" as ProgressReportSlug,
  title: "Leadership Conversation Report",
  metadataTitle:
    "Leadership Conversation Report — AI Co-Creation Lab Makassar | DekatLokal",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Struktur laporan percakapan kepemimpinan yang siap dilengkapi setelah seluruh catatan dan evidence terverifikasi.",
  status: "In Progress",
  statusTone: "amber" as const,
  nextStep: "Pelaksanaan Mini Project Kontribusi Sosial",
  route: progressRoute("leadership-conversation"),
  progressUrl: progressUrl("leadership-conversation"),
  ...sharedUpdate,
} as const;

export const miniProjectImplementationHeader = {
  slug: "mini-project-implementation" as ProgressReportSlug,
  title: "Pelaksanaan Mini Project Kontribusi Sosial",
  metadataTitle:
    "Pelaksanaan AI Co-Creation Lab Makassar 2026 | DekatLokal",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "AI Co-Creation Lab Makassar 2026 mempertemukan mahasiswa dan UMKM untuk membangun solusi digital dari masalah usaha yang nyata.",
  status: "Completed — Post-Project Follow-Up In Progress",
  statusTone: "amber" as const,
  nextStep: "UAT, improvement, deployment, handover, dan monitoring",
  route: progressRoute("mini-project-implementation"),
  progressUrl: progressUrl("mini-project-implementation"),
  ...sharedUpdate,
} as const;

export const networkMobilizationHeader = {
  slug: "network-mobilization" as ProgressReportSlug,
  title: "Mobilisasi Jejaring",
  metadataTitle:
    "Mobilisasi Jejaring — AI Co-Creation Lab Makassar | DekatLokal",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Built Together, Backed by an Ecosystem.",
  status: "Completed / Documentation",
  statusTone: "amber" as const,
  nextStep: "Dokumentasi Proses",
  route: progressRoute("network-mobilization"),
  progressUrl: progressUrl("network-mobilization"),
  ...sharedUpdate,
} as const;

export const processDocumentationHeader = {
  slug: "process-documentation" as ProgressReportSlug,
  title: "Dokumentasi Proses",
  metadataTitle:
    "Dokumentasi Proses — AI Co-Creation Lab Makassar | DekatLokal",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Ruang dokumentasi terstruktur untuk persiapan, kolaborasi, pelaksanaan, pengujian, pitching, dan tindak lanjut program.",
  status: "In Progress",
  statusTone: "amber" as const,
  nextStep: "Penyelesaian, monitoring, dan impact measurement",
  route: progressRoute("process-documentation"),
  progressUrl: progressUrl("process-documentation"),
  ...sharedUpdate,
} as const;

export const weekTwoThreeHeaders = {
  "pitching-mini-project": pitchingHeader,
  "final-action-plan": finalActionPlanHeader,
  "global-communication": globalCommunicationHeader,
  "lead-the-action": weekThreeHeader,
  "meet-the-leader": meetTheLeaderHeader,
  "leadership-conversation": leadershipConversationHeader,
  "mini-project-implementation": miniProjectImplementationHeader,
  "network-mobilization": networkMobilizationHeader,
  "process-documentation": processDocumentationHeader,
} as const;

export type WeekTwoThreeProgressSlug = keyof typeof weekTwoThreeHeaders;

export const pitchDeckMetadata = [
  { label: "Mini Project", value: "AI Co-Creation Lab Makassar" },
  { label: "Theme", value: "From AI Users to Local Problem Solvers" },
  { label: "Format", value: "Pitch Deck" },
  { label: "Slides", value: "17 Slides" },
  { label: "Status", value: "Presented & Reviewed" },
] as const;

export const corePitchStructure = [
  {
    number: "01",
    label: "Cover",
    title: "AI Co-Creation Lab Makassar",
    description: "From AI Users to Local Problem Solvers",
    highlight: null,
  },
  {
    number: "02",
    label: "Problem",
    title: "Two Sides, One Gap.",
    description:
      "UMKM memiliki real business problems yang masih banyak dijalankan secara manual. Mahasiswa sudah familiar dengan AI, tetapi belum banyak mendapat kesempatan menyelesaikan real problems bersama real users.",
    highlight:
      "UMKM have real problems. Students have the tools. They just need a space to build together.",
  },
  {
    number: "03",
    label: "Solution",
    title: "More than a workshop",
    description:
      "4 Students + 1 UMKM = 1 Co-Creation Team",
    highlight: "Listen → Define → Build → Test → Improve",
  },
  {
    number: "04",
    label: "Stakeholder & Partnership",
    title: "A collaborative ecosystem",
    description:
      "Program menghubungkan mahasiswa, UMKM, mentor, pemateri, DekatLokal, dan partner sesuai kontribusi masing-masing.",
    highlight: null,
  },
  {
    number: "05",
    label: "Action Plan",
    title: "From discovery to follow-up",
    description: "Discover → Validate → Prepare → Co-Creation Lab → Post-Lab",
    highlight: null,
  },
  {
    number: "06",
    label: "Expected Impact",
    title: "Pilot targets",
    description:
      "20 mahasiswa · 5 UMKM · 5 functional prototypes · 1 sustainable co-creation model",
    highlight: "Target awal, bukan impact aktual.",
  },
] as const;

export const reviewerLearnings = [
  {
    number: "01",
    title: "Sustainability",
    description:
      "Prototype perlu melanjutkan perjalanan setelah workshop, bukan berhenti sebagai output satu hari.",
    flow: [
      "Prototype",
      "UAT",
      "Improvement",
      "Deployment",
      "Handover",
      "Adoption Monitoring",
    ],
    insight:
      "A solution is sustainable when it continues to be useful, used, and improved after the event.",
  },
  {
    number: "02",
    title: "Impact Measurement",
    description:
      "Perubahan mahasiswa dan manfaat bagi UMKM perlu diukur dengan indikator dan ritme yang berbeda.",
    flow: ["Students: Pre", "Workshop", "Post", "Reflection"],
    secondaryFlow: [
      "UMKM: Baseline",
      "Prototype Test",
      "H+7",
      "H+14/H+30",
    ],
    insight:
      "Students: confidence, validation, MVP, prototyping, dan real-user testing. UMKM: relevance, usability, intention, adoption, dan operational improvement.",
  },
  {
    number: "03",
    title: "Replication",
    description:
      "Yang direplikasi bukan lima aplikasi yang sama, melainkan model co-creation yang repeatable.",
    flow: [
      "UMKM Selection",
      "Problem Validation",
      "Student Matching",
      "Co-Creation Lab",
      "Prototype Testing",
      "Adoption Monitoring",
    ],
    insight:
      "The goal is not to repeat the same event. The goal is to make the model repeatable.",
  },
] as const;

export const studentImpactMeasurementIndicators = [
  "AI problem-solving confidence sebelum dan setelah kegiatan.",
  "Kemampuan memahami kebutuhan real user sebelum merancang solusi.",
  "Kemampuan memvalidasi masalah bersama UMKM.",
  "Kemampuan menentukan MVP dari kebutuhan yang sudah divalidasi.",
  "Kemampuan membangun prototype berbantuan AI.",
  "Kemampuan melakukan real-user testing dan merespons feedback.",
  "Perubahan peran dari AI user menjadi AI-assisted problem solver.",
] as const;

export const umkmImpactMeasurementIndicators = [
  "Relevansi solusi terhadap kebutuhan prioritas UMKM.",
  "Usability saat prototype diuji oleh pengguna.",
  "Intention to adopt setelah testing dan perbaikan.",
  "Actual adoption pada H+7, H+14, dan H+30.",
  "Perbaikan operasional yang dapat diverifikasi selama monitoring.",
] as const;

export const replicationAssets = [
  "Playbook",
  "Curriculum",
  "Case Brief Template",
  "Starter Kit",
  "Measurement Kit",
] as const;

export const actionPlanBefore = [
  "Problem Validation",
  "Preparation",
  "Co-Creation Lab",
  "Prototype",
  "Follow-Up",
] as const;

export const actionPlanAfter = [
  "Problem Validation",
  "Student & UMKM Matching",
  "Co-Creation Lab",
  "Prototype Testing",
  "UAT",
  "Deployment",
  "Handover",
  "Adoption Monitoring",
  "Impact Measurement",
  "Documentation",
  "Replication",
] as const;

export const actionPlanImprovements = [
  {
    number: "01",
    title: "From Prototype to Adoption",
    before: "Fokus awal: menghasilkan lima prototype.",
    after: "Test → Improve → UAT → Deploy → Handover → Monitor",
  },
  {
    number: "02",
    title: "From Attendance to Measurable Impact",
    before: "Bukan hanya menghitung 20 mahasiswa dan 5 UMKM.",
    after:
      "Students: skills + mindset + real-user experience. UMKM: relevance + usability + adoption + operational benefit.",
  },
  {
    number: "03",
    title: "From One Event to a Replicable Model",
    before: "AI Co-Creation Lab Makassar adalah pilot pertama.",
    after:
      "AI Co-Creation Lab Playbook v1.0 + AI Co-Creation Lab Replication Kit.",
  },
] as const;

export const replicationKit = [
  "Playbook",
  "Curriculum",
  "UMKM Problem Validation Template",
  "Case Brief Template",
  "MVP Worksheet",
  "AI Prompt Starter",
  "User Testing Template",
  "Impact Measurement Kit",
  "Technical Starter Kit",
] as const;

export const sustainabilityModels = [
  {
    title: "Solution Sustainability",
    steps: ["UAT", "Deploy", "Handover", "1-Year Infrastructure", "Monitoring"],
  },
  {
    title: "Impact Sustainability",
    steps: ["Baseline", "H+7", "H+14", "H+30"],
  },
  {
    title: "Program Sustainability",
    steps: ["Document", "Standardize", "Package", "Replicate"],
  },
] as const;

export const finalActionPlanPhases = [
  { number: "01", title: "Validate", description: "Problem validation bersama UMKM dan mahasiswa." },
  { number: "02", title: "Prepare", description: "Recruitment, team matching, partner, mentor, dan tools." },
  { number: "03", title: "Co-Create", description: "Workshop dan hands-on build." },
  { number: "04", title: "Validate Solution", description: "UMKM hands-on testing dan feedback." },
  { number: "05", title: "Improve", description: "Bug fixing dan MVP refinement." },
  { number: "06", title: "Deploy", description: "UAT, domain, hosting, dan deployment." },
  { number: "07", title: "Measure", description: "Student impact dan UMKM adoption." },
  { number: "08", title: "Document", description: "Case studies, lessons learned, dan impact report." },
  { number: "09", title: "Replicate", description: "Playbook, curriculum, dan toolkit." },
] as const;

export const globalCommunicationTopics = [
  "Personal introduction",
  "Introduction as BAKTI NUSA Awardee",
  "Leadership journey",
  "Leadership values",
  "Mini Project",
  "Collaboration invitation",
] as const;

export const leadershipProfile = {
  name: "Riswan Ramadhan",
  education: "Informatics Engineering Student — Hasanuddin University",
  roles: ["Web Developer", "Founder of DekatLokal", "BAKTI NUSA Batch 15 Awardee"],
  values: ["Integrity", "Collaboration", "Real Impact"],
  turningPoint:
    "Leadership tidak dimulai karena merasa siap menjadi leader. Leadership dimulai ketika melihat masalah dan berpikir, “Maybe I can do something about this.”",
  mission:
    "Move students from technology users → creators, serta membantu UMKM memperoleh solusi yang simple → useful → relevant.",
  closing: "Every meaningful impact always starts with one small step.",
} as const;

export const weekTwoCompletedOutputs = [
  "Problem Validation",
  "Partnership Building",
  "Pitching Mini Project",
  "Finalisasi Action Plan",
  "Global Communication",
] as const;

export const weekThreeProgress = [
  {
    slug: "meet-the-leader" as ProgressReportSlug,
    title: "Meet the Leader Challenge",
    description: "Audiensi telah dilakukan bersama pimpinan Rumah BUMN Makassar.",
    status: "Documentation Finalization",
  },
  {
    slug: "leadership-conversation" as ProgressReportSlug,
    title: "Leadership Conversation Report",
    description: "Laporan disusun setelah catatan dan evidence terverifikasi.",
    status: "In Progress",
  },
  {
    slug: "mini-project-implementation" as ProgressReportSlug,
    title: "Mini Project Implementation",
    description: "Kegiatan utama terlaksana; follow-up solusi masih berjalan.",
    status: "Completed",
  },
  {
    slug: "network-mobilization" as ProgressReportSlug,
    title: "Network Mobilization",
    description: "Kontribusi ekosistem telah dimobilisasi dan dokumentasi dirapikan.",
    status: "Completed / Documentation",
  },
  {
    slug: "process-documentation" as ProgressReportSlug,
    title: "Process Documentation",
    description: "Aset pelaksanaan sedang diorganisasi dan diverifikasi.",
    status: "In Progress",
  },
] as const;

export const meetTheLeaderPurposes = [
  "Leadership insight",
  "Perspective dari practitioner",
  "Masukan terhadap AI Co-Creation Lab",
  "Pembelajaran terkait kolaborasi dan implementasi program",
] as const;

export const leadershipConversationSections = [
  "Leader Profile — name, position, organization",
  "Key Discussion",
  "Leadership Insights",
  "Feedback for AI Co-Creation Lab",
  "Personal Reflection",
  "Supporting Documentation",
] as const;

export const implementationFacts = [
  { value: "10 Aug 2026", label: "Tanggal pelaksanaan", kind: "Actual" },
  { value: "20", label: "Students", kind: "Actual" },
  { value: "5", label: "UMKM", kind: "Actual" },
  { value: "5", label: "Co-Creation Teams", kind: "Actual" },
] as const;

export const coCreationProcess = ["Listen", "Define", "Build", "Test", "Improve"] as const;

export const coCreationCases = umkmStakeholders.map((stakeholder, index) => ({
  number: String(index + 1).padStart(2, "0"),
  id: stakeholder.id,
  businessName: stakeholder.businessName,
  problem: stakeholder.painPoint,
  priorityNeed: stakeholder.priorityNeed,
}));

export const implementationSections = [
  {
    id: "workshop-hands-on",
    eyebrow: "Implementation 01",
    title: "Workshop & Hands-On",
    status: "Documentation being organized",
    description:
      "Ruang ini disiapkan untuk agenda workshop, aktivitas hands-on, dan evidence pelaksanaan yang telah diverifikasi.",
  },
  {
    id: "prototype-outputs",
    eyebrow: "Implementation 02",
    title: "Prototype Outputs",
    status: "Output details being finalized",
    description:
      "Detail prototype per tim belum dipublikasikan sampai fungsi, kepemilikan, dan status testing dapat dikonfirmasi.",
  },
  {
    id: "umkm-testing",
    eyebrow: "Implementation 03",
    title: "UMKM Testing",
    status: "Testing notes being consolidated",
    description:
      "Catatan pengujian bersama UMKM akan ditempatkan di sini setelah hasil dan konteksnya selesai dirapikan.",
  },
  {
    id: "team-pitching",
    eyebrow: "Implementation 04",
    title: "Team Pitching",
    status: "Documentation being organized",
    description:
      "Ruang ini disiapkan untuk ringkasan pitching tim dan evidence yang telah mendapat persetujuan publikasi.",
  },
  {
    id: "testimonials",
    eyebrow: "Implementation 05",
    title: "Testimonials",
    status: "No approved testimonial published yet",
    description:
      "Tidak ada testimonial yang ditulis atau dipublikasikan sebelum kutipan dan persetujuan sumber tersedia.",
  },
  {
    id: "documentation-gallery",
    eyebrow: "Implementation 06",
    title: "Documentation Gallery",
    status: "Documentation being organized",
    description:
      "Galeri pelaksanaan akan menggunakan dokumentasi nyata dengan caption, konteks, dan status izin yang jelas.",
  },
] as const;

export const postLabJourney = [
  "UAT",
  "Improvement",
  "Deployment",
  "Handover",
  "Monitoring",
] as const;

function existingPartnerNames(ids: readonly string[]) {
  return ids.flatMap((id) => {
    const partner = partners.find((item) => item.id === id);
    return partner ? [partner.name] : [];
  });
}

export const networkEcosystemGroups = [
  {
    title: "Program & Leadership Ecosystem",
    members: existingPartnerNames(["bakti-nusa", "great-edunesia", "dompet-dhuafa"]),
  },
  {
    title: "UMKM Ecosystem",
    members: existingPartnerNames(["rumah-bumn-makassar"]),
  },
  {
    title: "Digital Infrastructure",
    members: existingPartnerNames(["inovasi-digital"]),
  },
  {
    title: "Digital Learning",
    members: existingPartnerNames(["dicoding-indonesia"]),
  },
  {
    title: "Venue / Collaboration Space",
    members: existingPartnerNames(["komdigi-makassar", "makassar-creative-hub"]),
  },
  {
    title: "Academic / Technical Talent",
    members: existingPartnerNames(["informatika-unhas"]),
  },
] as const;

export const eventSupportPendingEvidence = [
  "I-Team Professional MC Management",
  "Cleo Pure Water",
] as const;

export const fiveUmkmCoCreators = umkmStakeholders.map((stakeholder) => ({
  id: stakeholder.id,
  name: stakeholder.businessName,
}));

export const documentationCategories = [
  "Preparation",
  "Stakeholder meetings",
  "UMKM problem validation",
  "Partnership",
  "Participant recruitment",
  "Event opening",
  "Workshop",
  "Student–UMKM discussion",
  "Hands-on building",
  "Prototype development",
  "UMKM testing",
  "Pitching",
  "Testimonials",
  "Partner / sponsor moments",
  "Group photo",
  "Media / social publication",
] as const;

export const reportCopy = {
  pitching: {
    progressDescription:
      "Pitching Mini Project telah diselesaikan dengan mempresentasikan konsep AI Co-Creation Lab Makassar kepada reviewer. Konsep utama tetap dipertahankan, sementara masukan reviewer digunakan untuk memperkuat sustainability, impact measurement, dan replication sebelum implementasi.",
    outputs: [
      "Pitch deck 17 slide yang telah dipresentasikan dan direview.",
      "Ringkasan enam bagian utama pitch.",
      "Tiga arah penguatan dari reviewer.",
      "Daftar replication assets awal.",
    ],
    reflection: {
      quote:
        "A strong pitch does not only explain what will happen. It also makes the path after the event visible.",
      paragraphs: [
        "Masukan reviewer membantu menggeser perhatian dari sekadar output satu hari menuju adopsi, bukti perubahan, dan model yang dapat digunakan kembali.",
      ],
    },
  },
  actionPlan: {
    progressDescription:
      "Finalisasi Action Plan menyempurnakan AI Co-Creation Lab Makassar yang sama—bukan mengganti konsepnya. Perubahan utama adalah memperpanjang perjalanan dari prototype menuju adoption, membedakan impact mahasiswa dan UMKM, serta menyiapkan dokumentasi agar model dapat direplikasi.",
    outputs: [
      "Perbandingan rencana sebelum dan setelah review.",
      "Tiga perbaikan utama pasca-review.",
      "Sustainability model pada level solution, impact, dan program.",
      "Final action plan sembilan fase.",
    ],
    reflection: {
      quote:
        "AI Co-Creation Lab Makassar becomes the first pilot — not the final destination.",
      paragraphs: [
        "Rencana yang matang bukan hanya menjawab apa yang dilakukan pada hari kegiatan, tetapi juga siapa yang menggunakan hasilnya, bagaimana perubahan diukur, dan apa yang dapat dipelajari untuk pelaksanaan berikutnya.",
      ],
    },
  },
  globalCommunication: {
    progressDescription:
      "Global Communication telah diselesaikan melalui video berdurasi maksimal dua menit dalam bahasa asing. Video memperkenalkan perjalanan kepemimpinan Riswan Ramadhan, nilai integrity, collaboration, dan real impact, serta mengundang kolaborasi melalui AI Co-Creation Lab Makassar.",
    outputs: [
      "Video My Leadership Journey.",
      "Ringkasan pesan kepemimpinan dan personal mission.",
      "Publikasi Instagram yang dapat diakses publik.",
      "Transition menuju Week 3 — Lead The Action.",
    ],
    reflection: {
      quote: leadershipProfile.closing,
      paragraphs: [
        "Komunikasi global memberi latihan untuk menjelaskan masalah lokal secara sederhana tanpa kehilangan konteks, serta menghubungkan identitas personal dengan tindakan yang sedang dibangun bersama komunitas.",
      ],
    },
  },
  weekThree: {
    progressDescription:
      "Week 3 sedang berjalan. Audiensi pemimpin dan kegiatan utama telah terlaksana, sedangkan laporan percakapan, dokumentasi, post-project improvement, serta evidence pendukung masih diselesaikan dan diverifikasi sebelum dipublikasikan.",
    outputs: [
      "Audiensi Meet the Leader yang sedang difinalisasi dokumentasinya.",
      "Struktur Leadership Conversation Report.",
      "Laporan pelaksanaan mini project dan lima co-creation cases.",
      "Pemetaan kontribusi ekosistem program.",
      "Struktur dokumentasi proses yang siap diperbarui.",
    ],
    reflection: {
      quote: "Leadership becomes visible when plans turn into coordinated action.",
      paragraphs: [
        "Fokus Week 3 adalah menjaga tindakan, jejaring, dokumentasi, dan tindak lanjut tetap terhubung tanpa mengklaim evidence yang belum final.",
      ],
    },
  },
  meetTheLeader: {
    progressDescription:
      "Audiensi Meet the Leader telah dilakukan bersama pimpinan Rumah BUMN Makassar. Identitas pimpinan, isi percakapan terperinci, refleksi, dan dokumentasi belum dipublikasikan karena masih berada dalam tahap finalisasi dan verifikasi.",
    outputs: [
      "Konteks audiensi bersama Rumah BUMN Makassar.",
      "Struktur leader profile.",
      "Slot leadership insights dan feedback mini project.",
      "Ruang personal reflection dan dokumentasi.",
    ],
    reflection: null,
  },
  leadershipConversation: {
    progressDescription:
      "Leadership Conversation Report masih disusun. Halaman ini menampilkan struktur final yang siap menerima leader profile, pokok diskusi, insights, feedback, reflection, supporting documentation, dan file laporan setelah seluruh materi terverifikasi.",
    outputs: [
      "Template struktur laporan percakapan.",
      "State file report yang jujur dan mudah diperbarui.",
      "Slot supporting documentation.",
    ],
    reflection: null,
  },
  implementation: {
    progressDescription:
      "AI Co-Creation Lab Makassar 2026 telah dilaksanakan pada 10 Agustus 2026 dengan 20 mahasiswa, lima UMKM, dan lima co-creation teams. Detail prototype, testing, testimonial, serta dokumentasi pelaksanaan masih dikonsolidasikan; post-project follow-up berlanjut melalui UAT, improvement, deployment, handover, dan monitoring.",
    outputs: [
      "Pelaksanaan kegiatan utama pada 10 Agustus 2026.",
      "Lima co-creation cases berdasarkan UMKM yang telah tervalidasi.",
      "Struktur evidence pelaksanaan dan output prototype.",
      "Post-lab journey untuk tindak lanjut solusi.",
    ],
    reflection: {
      quote: "Execution is a milestone; adoption is the longer responsibility.",
      paragraphs: [
        "Pelaksanaan menandai perubahan rencana menjadi aksi. Tanggung jawab berikutnya adalah merapikan bukti, memperbaiki solusi, dan memantau kegunaannya bersama UMKM.",
      ],
    },
  },
  networkMobilization: {
    progressDescription:
      "Mobilisasi jejaring menghubungkan kebutuhan program dengan kontribusi lembaga, ekosistem UMKM, infrastruktur digital, pembelajaran, venue, ruang kolaborasi, dan talenta teknis. Daftar ini diturunkan dari sumber partnership existing agar tidak membuat klaim mitra baru.",
    outputs: [
      "Pemetaan peran stakeholder berdasarkan kategori kontribusi.",
      "Daftar lima UMKM co-creators dari data problem validation.",
      "Narasi kontribusi ekosistem yang tidak berhenti pada logo.",
    ],
    reflection: {
      quote:
        "Mobilizing a network was not only about collecting logos. Each stakeholder contributed to a different part of the project’s execution.",
      paragraphs: [
        "Collaborative leadership berarti menghubungkan kontribusi yang berbeda kepada kebutuhan yang jelas, lalu menjaga komunikasi dan dokumentasinya.",
      ],
    },
  },
  documentation: {
    progressDescription:
      "Dokumentasi proses masih diorganisasi. Halaman ini menggunakan evidence pra-pelaksanaan yang sudah tersedia dan memberi empty state untuk kategori pelaksanaan yang belum memiliki aset publik terverifikasi. Tidak ada stock image atau dokumentasi rekaan.",
    outputs: [
      "Taksonomi 16 kategori dokumentasi proses.",
      "Galeri evidence problem validation yang sudah tersedia.",
      "Pranala evidence partnership yang sudah tersedia.",
      "Empty state untuk dokumentasi pelaksanaan yang belum final.",
    ],
    reflection: {
      quote: "Documentation should preserve context, not manufacture certainty.",
      paragraphs: [
        "Dokumentasi diperlakukan sebagai evidence. Setiap aset perlu caption, konteks, izin, dan status yang jelas sebelum dipublikasikan.",
      ],
    },
  },
} as const;

export const instagramGlobalCommunicationUrl =
  "https://www.instagram.com/riswannramadhan/reel/Db558hbvGub/";
