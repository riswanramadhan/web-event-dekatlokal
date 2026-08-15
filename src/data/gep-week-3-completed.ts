import {
  partners,
  type Partner,
  type PartnerLogo,
} from "@/data/partnership-collaboration";
import { umkmStakeholders } from "@/data/problem-validation";

const progressBaseRoute = "/ai-co-creation-lab-makassar/progress";
const publicProgressBaseUrl =
  "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress";

export const WEEK_THREE_DETAIL_SLUGS = [
  "meet-the-leader",
  "leadership-conversation",
  "mini-project-implementation",
  "network-mobilization",
  "process-documentation",
] as const;

export type WeekThreeDetailSlug = (typeof WEEK_THREE_DETAIL_SLUGS)[number];
export type WeekThreeRouteSlug = "week-3" | WeekThreeDetailSlug;

function progressRoute(slug: WeekThreeRouteSlug) {
  return `${progressBaseRoute}/${slug}` as const;
}

function progressUrl(slug: WeekThreeRouteSlug) {
  return `${publicProgressBaseUrl}/${slug}` as const;
}

const sharedUpdate = {
  updatedAt: "14 Agustus 2026",
  updatedAtIso: "2026-08-14",
} as const;

export const weekThreeCompletedHeader = {
  slug: "week-3",
  title: "Week 3 — Lead The Action",
  metadataTitle:
    "Week 3 — Lead The Action | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Turning collaboration into action through leadership learning, project implementation, network mobilization, and real documentation.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Week 4 — Measure, Reflect & Sustain",
  route: progressRoute("week-3"),
  progressUrl: progressUrl("week-3"),
  ...sharedUpdate,
} as const;

export const meetTheLeaderCompletedHeader = {
  slug: "meet-the-leader",
  title: "Meet the Leader Challenge",
  metadataTitle:
    "Meet the Leader — Ayu Anisela | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Learning from Ayu Anisela about consistent leadership, delegation, and building an ecosystem where UMKM and students can grow.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Leadership Conversation Report",
  route: progressRoute("meet-the-leader"),
  progressUrl: progressUrl("meet-the-leader"),
  ...sharedUpdate,
} as const;

export const leadershipConversationCompletedHeader = {
  slug: "leadership-conversation",
  title: "Leadership Conversation Report",
  metadataTitle:
    "Leadership Conversation with Ayu Anisela | DekatLokal",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Leadership lessons, project feedback, and personal reflection from a conversation with Ayu Anisela.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Mini Project Implementation",
  route: progressRoute("leadership-conversation"),
  progressUrl: progressUrl("leadership-conversation"),
  ...sharedUpdate,
} as const;

export const miniProjectImplementationCompletedHeader = {
  slug: "mini-project-implementation",
  title: "Mini Project Implementation",
  metadataTitle:
    "AI Co-Creation Lab Makassar 2026 — Project Implementation",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "Twenty students and five UMKM worked in five co-creation teams to turn real business problems into functional prototypes.",
  status: "Completed",
  completionLabel: "Completed · 5 Functional Prototypes",
  statusTone: "green" as const,
  nextStep: "Network Mobilization",
  route: progressRoute("mini-project-implementation"),
  progressUrl: progressUrl("mini-project-implementation"),
  ...sharedUpdate,
} as const;

export const networkMobilizationCompletedHeader = {
  slug: "network-mobilization",
  title: "Network Mobilization",
  metadataTitle:
    "Network Mobilization — AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle: "Built Together, Backed by an Ecosystem.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Process Documentation",
  route: progressRoute("network-mobilization"),
  progressUrl: progressUrl("network-mobilization"),
  ...sharedUpdate,
} as const;

export const processDocumentationCompletedHeader = {
  slug: "process-documentation",
  title: "Process Documentation",
  metadataTitle:
    "AI Co-Creation Lab Makassar — Event Documentation",
  weekLabel: "GEP WEEK 3",
  phase: "LEAD THE ACTION",
  subtitle:
    "A curated record of the people, collaboration, building process, prototypes, and shared moments behind the lab.",
  status: "Completed",
  statusTone: "green" as const,
  nextStep: "Week 4 — Measure, Reflect & Sustain",
  route: progressRoute("process-documentation"),
  progressUrl: progressUrl("process-documentation"),
  ...sharedUpdate,
} as const;

export const weekThreeCompletedHeaders = {
  "week-3": weekThreeCompletedHeader,
  "meet-the-leader": meetTheLeaderCompletedHeader,
  "leadership-conversation": leadershipConversationCompletedHeader,
  "mini-project-implementation": miniProjectImplementationCompletedHeader,
  "network-mobilization": networkMobilizationCompletedHeader,
  "process-documentation": processDocumentationCompletedHeader,
} as const satisfies Record<WeekThreeRouteSlug, object>;

export interface WeekThreeCompletedSummaryItem {
  readonly number: string;
  readonly slug: WeekThreeDetailSlug;
  readonly title: string;
  readonly description: string;
  readonly status: "Completed";
  readonly completed: true;
  readonly route: string;
}

export const weekThreeCompletedSummary = [
  {
    number: "01",
    slug: "meet-the-leader",
    title: "Meet the Leader Challenge",
    description:
      "Percakapan kepemimpinan bersama Ayu Anisela dari Rumah BUMN BRI Makassar.",
    status: "Completed",
    completed: true,
    route: progressRoute("meet-the-leader"),
  },
  {
    number: "02",
    slug: "leadership-conversation",
    title: "Leadership Conversation Report",
    description:
      "Insight kepemimpinan, masukan project, dan refleksi personal telah dirangkum.",
    status: "Completed",
    completed: true,
    route: progressRoute("leadership-conversation"),
  },
  {
    number: "03",
    slug: "mini-project-implementation",
    title: "Mini Project Implementation",
    description:
      "AI Co-Creation Lab terlaksana bersama 20 mahasiswa, lima UMKM, dan lima tim.",
    status: "Completed",
    completed: true,
    route: progressRoute("mini-project-implementation"),
  },
  {
    number: "04",
    slug: "network-mobilization",
    title: "Network Mobilization",
    description:
      "Mahasiswa, UMKM, relawan, mentor, partner, dan sponsor bergerak dalam satu ekosistem.",
    status: "Completed",
    completed: true,
    route: progressRoute("network-mobilization"),
  },
  {
    number: "05",
    slug: "process-documentation",
    title: "Process Documentation",
    description:
      "Dokumentasi aktual kegiatan telah dikurasi menjadi cerita proses yang terstruktur.",
    status: "Completed",
    completed: true,
    route: progressRoute("process-documentation"),
  },
] as const satisfies readonly WeekThreeCompletedSummaryItem[];

export const weekThreeOverview = {
  eyebrow: "From Planning to Real Execution",
  title: "Week 3 Completed",
  narrative: "Leadership Learning → Project Implementation → Network Mobilization → Documentation → Reflection",
  status: "Completed",
  summary: weekThreeCompletedSummary,
} as const;

export interface WeekThreeImage {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width: number;
  readonly height: number;
  readonly category: string;
  readonly objectPosition?: string;
}

export const meetTheLeaderDriveUrl =
  "https://drive.google.com/drive/folders/1IL5KLcFZ_mzEJtAV5ZWQ-8rIDLfmxj01?usp=sharing";

export const eventDocumentationDriveUrl =
  "https://drive.google.com/drive/folders/1whE01s1U86R6QEfs5sPHpj7wA6SrcJRN?usp=sharing";

export const meetTheLeaderProfile = {
  name: "Ayu Anisela",
  role: "Koordinator Utama Rumah BUMN BRI Makassar",
  since: "2022",
  sectionTitle: "Meet Ayu Anisela",
  paragraphs: [
    "Ayu Anisela telah menjadi Koordinator Rumah BUMN BRI Makassar sejak 2022 dan memiliki pengalaman dalam memimpin ekosistem pemberdayaan UMKM di Makassar.",
    "Dalam perannya, beliau mengelola program pendampingan yang menjangkau puluhan ribu UMKM, mulai dari pelatihan, pengembangan kapasitas usaha, hingga program yang mendorong UMKM untuk naik kelas.",
    "Beliau juga memimpin dan mengelola SDM intern mahasiswa yang terlibat dalam berbagai aktivitas Rumah BUMN Makassar, sekaligus memberikan ruang kepada mahasiswa untuk belajar, mengambil tanggung jawab, dan mendukung program pemberdayaan UMKM.",
  ],
  conciseProfile:
    "Sejak 2022, Ayu Anisela memimpin Rumah BUMN BRI Makassar dalam menjalankan berbagai program pemberdayaan dan pendampingan UMKM. Dalam perannya, beliau terlibat dalam pengelolaan ekosistem puluhan ribu pelaku UMKM, pelatihan bisnis, program UMKM naik kelas, serta pengembangan SDM intern mahasiswa yang membantu implementasi berbagai kegiatan Rumah BUMN.",
} as const;

export const whyIChoseAyu = {
  title: "Why I Chose Her",
  quote:
    "I chose Ayu Anisela for the Meet the Leader Challenge because her leadership journey is closely connected to the mission behind my mini project.",
  paragraphs: [
    "AI Co-Creation Lab Makassar berfokus pada bagaimana teknologi, mahasiswa, dan kolaborasi dapat membantu UMKM menyelesaikan masalah nyata dan bertumbuh.",
    "Sementara itu, Rumah BUMN BRI Makassar telah lama bergerak dalam ekosistem yang sama: mendampingi UMKM agar mampu belajar, beradaptasi, dan naik kelas.",
    "Pertemuan ini menjadi kesempatan untuk belajar langsung dari seseorang yang tidak hanya memimpin sebuah program, tetapi juga membangun ekosistem yang mempertemukan UMKM, mahasiswa, pelatihan, dan berbagai stakeholder.",
  ],
} as const;

export const meetTheLeaderDocumentation: readonly WeekThreeImage[] = [
  {
    id: "ayu-anisela-01",
    src: "/week-3/meet-the-leader/ayu-anisela-01.webp",
    alt: "Ayu Anisela dan seorang peserta duduk bersama di meja pertemuan",
    caption: "Dokumentasi pertemuan Meet the Leader bersama Ayu Anisela.",
    width: 1125,
    height: 2000,
    category: "Meet the Leader",
    objectPosition: "center 32%",
  },
  {
    id: "ayu-anisela-02",
    src: "/week-3/meet-the-leader/ayu-anisela-02.webp",
    alt: "Ayu Anisela dan seorang peserta berpose di meja pertemuan",
    caption: "Dokumentasi percakapan dalam Meet the Leader Challenge.",
    width: 1125,
    height: 2000,
    category: "Meet the Leader",
    objectPosition: "center 28%",
  },
  {
    id: "ayu-anisela-03",
    src: "/week-3/meet-the-leader/ayu-anisela-03.webp",
    alt: "Ayu Anisela dan seorang peserta berpose dengan buku di meja pertemuan",
    caption: "Dokumentasi ketiga pertemuan Meet the Leader bersama Ayu Anisela.",
    width: 1125,
    height: 2000,
    category: "Meet the Leader",
    objectPosition: "center 34%",
  },
] as const;

export const meetTheLeaderDocumentationAction = {
  label: "View Documentation",
  href: meetTheLeaderDriveUrl,
} as const;

export const leadershipDiscussion = {
  title: "UMKM Have the Will to Learn",
  paragraphs: [
    "Menurut Ayu Anisela, banyak UMKM di Makassar sebenarnya memiliki inisiatif dan kemauan yang tinggi untuk belajar dan berkembang.",
    "Hal ini terlihat dari tingginya keterlibatan UMKM binaan Rumah BUMN BRI Makassar dalam berbagai aktivitas pengembangan.",
  ],
  engagementAreas: [
    "pelatihan",
    "pendampingan",
    "program pengembangan usaha",
    "digitalisasi",
    "program UMKM naik kelas",
  ],
  enablingNeeds: ["akses", "pendampingan", "tools", "mentor", "ekosistem yang tepat"],
  statement:
    "The willingness to grow already exists. What many UMKM still need is access to the right people, tools, and opportunities.",
} as const;

export const aiCoCreationLabRelevance = {
  title: "Why AI Co-Creation Lab Matters",
  paragraphs: [
    "Ayu Anisela menilai bahwa AI Co-Creation Lab Makassar memiliki relevansi yang kuat dengan kebutuhan UMKM saat ini.",
    "Pada Agustus 2026, sejumlah UMKM binaan Rumah BUMN BRI Makassar juga sedang mengikuti proses seleksi nasional BRIncubator dari BRI pusat. Dalam proses pengembangan UMKM tersebut, digitalisasi menjadi salah satu elemen penting.",
  ],
  opportunities: [
    "mengidentifikasi permasalahan konvensional mereka",
    "berdiskusi langsung dengan mahasiswa",
    "menerjemahkan masalah tersebut menjadi solusi digital",
    "mendapatkan prototype yang sesuai dengan kebutuhan usaha",
  ],
  statement:
    "Many UMKM know the problem they face, but they do not always have access to people who can translate that problem into a digital solution.",
  conclusion:
    "Inilah gap yang coba dijembatani oleh AI Co-Creation Lab Makassar.",
} as const;

export const leadershipInsights = [
  {
    number: "01",
    title: "Consistency Creates Direction",
    paragraphs: [
      "Menurut Ayu, konsistensi adalah salah satu kunci kepemimpinan.",
      "Seorang pemimpin perlu memiliki arah yang jelas dan terus menjalankan proses secara konsisten, bahkan ketika hasilnya belum langsung terlihat.",
    ],
    statement:
      "Leadership is not always about making the biggest move. Sometimes it is about consistently moving in the right direction.",
    points: [] as readonly string[],
  },
  {
    number: "02",
    title: "Leadership Needs Clear KPIs",
    paragraphs: [
      "Pemimpin perlu memiliki target dan indikator yang jelas.",
      "Banyak tanggung jawab akan muncul dalam proses memimpin. Karena itu, KPI membantu pemimpin menjaga arah kerja.",
    ],
    statement: null,
    points: [
      "apa yang harus dicapai",
      "apa yang harus diprioritaskan",
      "apa yang perlu dievaluasi",
    ],
  },
  {
    number: "03",
    title: "Delegate to Help Others Grow",
    paragraphs: [
      "Salah satu insight terpenting adalah keberanian untuk mendelegasikan tanggung jawab.",
      "Pemimpin tidak harus mengerjakan semuanya sendiri. Delegasi bukan hanya membantu pekerjaan selesai, tetapi juga memberikan kesempatan kepada orang lain untuk bertumbuh.",
      "Beliau juga menekankan untuk tidak takut, malu, atau tidak percaya diri ketika mengambil tanggung jawab dan kesempatan baru.",
    ],
    statement:
      "Delegation is not losing control. It is creating room for other people to grow.",
    points: ["belajar", "mengambil tanggung jawab", "meningkatkan kepercayaan diri", "berkembang"],
  },
] as const;

export const projectFeedbackRecommendations = [
  {
    number: "01",
    title: "Make the Model Replicable",
    paragraphs: [
      "Ayu berharap AI Co-Creation Lab tidak berhenti sebagai satu kegiatan.",
      "Model kegiatan dapat didokumentasikan sehingga suatu saat dapat direplikasi bersama Rumah BUMN Makassar atau stakeholder lainnya.",
    ],
    direction: ["Pilot", "Learn", "Document", "Replicate"],
    possibleOutput: {
      title: "AI Co-Creation Lab Curriculum / Playbook",
      contents: [
        "cara memilih UMKM",
        "problem validation",
        "student matching",
        "curriculum",
        "hands-on process",
        "prototype development",
        "testing",
        "impact measurement",
        "monitoring",
      ],
    },
    statement:
      "A good project creates impact once. A good model makes that impact repeatable.",
    dayPlans: [] as readonly { readonly title: string; readonly theme: string; readonly activities: readonly string[] }[],
  },
  {
    number: "02",
    title: "Make Sure the System Is Actually Used",
    paragraphs: [
      "Sistem yang dibangun tidak cukup hanya selesai secara teknis.",
      "Perlu ada kesepakatan dan skema penggunaan bersama UMKM.",
    ],
    direction: ["UAT", "Revision", "Handover", "Adoption", "Monitoring"],
    possibleOutput: null,
    statement:
      "Memastikan sistem tidak hanya “selesai dibuat”, tetapi benar-benar masuk ke workflow UMKM.",
    dayPlans: [] as readonly { readonly title: string; readonly theme: string; readonly activities: readonly string[] }[],
  },
  {
    number: "03",
    title: "Consider a Two-Day Format",
    paragraphs: [
      "Salah satu feedback untuk pengembangan berikutnya adalah mempertimbangkan format kegiatan selama dua hari.",
      "Dengan pembagian ini, proses co-creation memiliki waktu lebih luas dan mahasiswa tidak perlu terburu-buru melakukan understanding, learning, building, dan testing dalam satu sesi.",
    ],
    direction: [] as readonly string[],
    possibleOutput: null,
    statement: null,
    dayPlans: [
      {
        title: "Day 1",
        theme: "Understand & Learn",
        activities: [
          "problem identification",
          "UMKM discussion",
          "AI learning",
          "MVP",
          "user flow",
          "preparation",
        ],
      },
      {
        title: "Day 2",
        theme: "Build & Improve",
        activities: [
          "implementation",
          "prototype development",
          "testing",
          "feedback",
          "revision",
          "final demo",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Keep UMKM at the Center",
    paragraphs: [
      "Setiap sistem harus disepakati bersama UMKM.",
      "Mahasiswa bukan sekadar membuat apa yang menurut mereka menarik.",
    ],
    direction: [] as readonly string[],
    possibleOutput: null,
    statement: "Build with the UMKM, not only for the UMKM.",
    dayPlans: [] as readonly { readonly title: string; readonly theme: string; readonly activities: readonly string[] }[],
  },
] as const;

export const riswanLeadershipReflection = {
  title: "My Reflection",
  author: "Riswan Ramadhan",
  paragraphs: [
    "Pertemuan dengan Ibu Ayu membuat saya semakin memahami bahwa membangun impact bukan hanya tentang memiliki ide yang baik.",
    "Impact membutuhkan konsistensi, sistem, orang-orang yang tepat, dan keberanian untuk mempercayakan tanggung jawab kepada orang lain.",
    "Selama membangun AI Co-Creation Lab, saya sempat merasa bahwa sebagai project lead saya harus memastikan hampir semua hal berjalan sendiri. Namun dari percakapan ini, saya kembali belajar bahwa leadership bukan tentang menjadi orang yang mengerjakan paling banyak.",
    "Leadership juga tentang menciptakan ruang agar orang lain bisa ikut tumbuh.",
    "Mahasiswa mendapatkan ruang untuk membangun.\nUMKM mendapatkan ruang untuk menyampaikan masalahnya.\nPartner mendapatkan ruang untuk berkontribusi.\nDan saya belajar untuk menghubungkan semua ruang tersebut menjadi satu gerakan yang memiliki tujuan.",
    "Insight tentang konsistensi juga menjadi pengingat bagi saya bahwa satu event bukanlah akhir dari perjalanan.",
    "AI Co-Creation Lab Makassar mungkin dimulai sebagai mini project, tetapi jika prosesnya didokumentasikan, impact-nya diukur, sistemnya benar-benar digunakan, dan modelnya dapat direplikasi, maka sesuatu yang kecil hari ini bisa berkembang menjadi sesuatu yang jauh lebih sustainable.",
    "Saya tidak ingin AI Co-Creation Lab hanya dikenang sebagai event yang pernah diselenggarakan.",
    "Saya ingin apa yang kami pelajari dari pilot pertama ini menjadi:",
    "a model that can be improved, repeated, and shared.",
    "Karena mungkin leadership bukan tentang seberapa besar sesuatu dimulai.",
    "Tetapi tentang apakah kita cukup konsisten untuk membuatnya terus bertumbuh.",
  ],
  emphasisParagraphIndex: 9,
  closing: "Start small. Stay consistent. Build with others. Make it repeatable.",
} as const;

export const implementationOverview = {
  eventName: "AI Co-Creation Lab Makassar 2026",
  date: "10 August 2026",
  dateIso: "2026-08-10",
  completionLabel: "Completed · 5 Functional Prototypes",
  facts: [
    { value: "20", label: "Students" },
    { value: "5", label: "UMKM" },
    { value: "5", label: "Co-Creation Teams" },
    { value: "5", label: "Functional Prototypes" },
  ],
  framework: ["Listen", "Define", "Build", "Test", "Improve"],
} as const;

export const implementationSteps = [
  {
    number: "01",
    eyebrow: "Implementation 01",
    title: "Workshop & Learning",
    description:
      "Peserta membangun pemahaman bersama tentang masalah UMKM, MVP, AI-assisted building, dan responsible use sebelum masuk ke proses co-creation.",
    status: "Completed",
    mediaIds: ["workshop-facilitation", "participant-interaction"],
  },
  {
    number: "02",
    eyebrow: "Implementation 02",
    title: "Hands-On Co-Creation",
    description:
      "Lima tim berdiskusi langsung dengan UMKM, memperjelas core workflow, dan menguji keputusan build sepanjang sesi hands-on.",
    status: "Completed",
    mediaIds: ["student-umkm-discussion", "hands-on-building"],
  },
  {
    number: "03",
    eyebrow: "Implementation 03",
    title: "Prototype Development",
    description:
      "Setiap tim menerjemahkan kebutuhan UMKM menjadi satu prototype fungsional yang fokus pada proses usaha prioritas.",
    status: "Completed",
    mediaIds: ["prototype-development", "prototype-review"],
  },
  {
    number: "04",
    eyebrow: "Implementation 04",
    title: "Team Pitching",
    description:
      "Kelima tim mempresentasikan masalah, keputusan solusi, alur utama, dan hasil prototype kepada peserta serta stakeholder.",
    status: "Completed",
    mediaIds: ["team-pitching"],
  },
  {
    number: "05",
    eyebrow: "Implementation 05",
    title: "Post-Lab Improvement",
    description:
      "Hasil sesi dirapikan sebagai dasar tindak lanjut UAT, handover, dan adoption monitoring pada Week 4.",
    status: "Completed",
    mediaIds: [] as readonly string[],
  },
] as const;

export type WeekThreeUmkmId =
  | "eyfa-natural-oil"
  | "sukmajahe-sarabba"
  | "markisa-bintang-jaya"
  | "kira-kira-michi"
  | "dapur-andist";

const functionalSolutionByUmkmId = {
  "eyfa-natural-oil": {
    solution: "POS, stock, HPP, dan business reporting.",
    screenshot: "/week-3/prototypes/eyfa-natural-oil.webp",
  },
  "sukmajahe-sarabba": {
    solution: "Outlet & consignment tracking system.",
    screenshot: "/week-3/prototypes/sukmajahe-sarabba.webp",
  },
  "markisa-bintang-jaya": {
    solution: "Finance & stock dashboard.",
    screenshot: "/week-3/prototypes/markisa-bintang-jaya.webp",
  },
  "kira-kira-michi": {
    solution: "Digital loyalty system.",
    screenshot: "/week-3/prototypes/kira-kira-michi.webp",
  },
  "dapur-andist": {
    solution: "Financial management system with AI-assisted direction.",
    screenshot: "/week-3/prototypes/dapur-andist.webp",
  },
} as const satisfies Record<
  WeekThreeUmkmId,
  { readonly solution: string; readonly screenshot: string }
>;

function readFunctionalSolution(id: string) {
  if (id in functionalSolutionByUmkmId) {
    return functionalSolutionByUmkmId[id as WeekThreeUmkmId];
  }

  throw new Error(`Missing completed Week 3 solution for UMKM: ${id}`);
}

export const fiveFunctionalSolutions = umkmStakeholders.map(
  (stakeholder, index) => {
    const solution = readFunctionalSolution(stakeholder.id);

    return {
      number: String(index + 1).padStart(2, "0"),
      id: stakeholder.id,
      businessName: stakeholder.businessName,
      problemContext: stakeholder.painPoint,
      solution: solution.solution,
      status: "Completed · Functional" as const,
      screenshot: solution.screenshot,
      screenshotWidth: 1672,
      screenshotHeight: 941,
      screenshotAlt: `Tampilan prototype fungsional untuk ${stakeholder.businessName}`,
    };
  },
);

export const networkPurpose =
  "Menunjukkan bagaimana project menggerakkan mahasiswa, UMKM, partner, sponsor, relawan, mentor, dan berbagai stakeholder sebagai praktik collaborative leadership.";

export const networkSummary = [
  { value: "20", label: "Student Co-Creators" },
  { value: "5", label: "UMKM Co-Creators" },
  { value: "5", label: "Event Volunteers / Support Team" },
  { value: "Multiple", label: "Partners & Sponsors" },
] as const;

export type NetworkLogo = PartnerLogo;

export interface NetworkPartner {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly support: string;
  readonly logo: NetworkLogo;
}

export interface NetworkPartnerGroup {
  readonly id: string;
  readonly title: string;
  readonly partners: readonly NetworkPartner[];
}

function requirePartner(id: string): Partner & { readonly logo: PartnerLogo } {
  const partner = partners.find((item) => item.id === id);

  if (!partner?.logo) {
    throw new Error(`Missing verified partner or logo for Week 3: ${id}`);
  }

  return partner as Partner & { readonly logo: PartnerLogo };
}

function fromExistingPartner({
  id,
  name,
  role,
  support,
}: {
  readonly id: string;
  readonly name?: string;
  readonly role: string;
  readonly support: string;
}): NetworkPartner {
  const partner = requirePartner(id);

  return {
    id,
    name: name ?? partner.name,
    role,
    support,
    logo: partner.logo,
  };
}

export const networkPartnerGroups: readonly NetworkPartnerGroup[] = [
  {
    id: "program-leadership",
    title: "Program & Leadership Ecosystem",
    partners: [
      fromExistingPartner({
        id: "bakti-nusa",
        role: "Leadership Ecosystem",
        support: "Leadership ecosystem dan program support.",
      }),
      fromExistingPartner({
        id: "great-edunesia",
        name: "GreatEdunesia",
        role: "Program Ecosystem",
        support: "Program ecosystem support.",
      }),
      fromExistingPartner({
        id: "dompet-dhuafa",
        role: "Social Impact Ecosystem",
        support: "Program dan social impact ecosystem.",
      }),
    ],
  },
  {
    id: "umkm-ecosystem",
    title: "UMKM Ecosystem",
    partners: [
      fromExistingPartner({
        id: "rumah-bumn-makassar",
        name: "Rumah BUMN BRI Makassar",
        role: "UMKM Ecosystem Partner",
        support:
          "UMKM ecosystem, collaborative support, participant/volunteer network, serta partner dalam pengembangan UMKM naik kelas.",
      }),
    ],
  },
  {
    id: "digital-infrastructure",
    title: "Digital Infrastructure",
    partners: [
      fromExistingPartner({
        id: "inovasi-digital",
        name: "PT Konsultan Inovasi Digital",
        role: "Official Digital Infrastructure Partner",
        support:
          "Lima domain, lima hosting accounts, dan digital infrastructure untuk sistem UMKM.",
      }),
    ],
  },
  {
    id: "digital-learning",
    title: "Digital Learning",
    partners: [
      fromExistingPartner({
        id: "dicoding-indonesia",
        role: "Official Digital Learning Partner",
        support: "Akses kelas digital untuk peserta dan panitia.",
      }),
    ],
  },
  {
    id: "event-support",
    title: "Event Support",
    partners: [
      {
        id: "i-team-professional-mc-management",
        name: "I-Team Professional MC Management",
        role: "Professional MC Support",
        support: "Professional Master of Ceremony.",
        logo: {
          src: "/sponsorship-logo/optimized/logo-i-team.webp",
          alt: "Logo I-Team Professional MC Management",
          width: 421,
          height: 108,
        },
      },
      {
        id: "cleo-pure-water",
        name: "Cleo Pure Water",
        role: "Mineral Water Event Support",
        support: "Mineral Water Support for Event.",
        logo: {
          src: "/sponsorship-logo/optimized/logo-cleo.webp",
          alt: "Logo Cleo Pure Water",
          width: 446,
          height: 415,
        },
      },
    ],
  },
  {
    id: "venue-collaboration",
    title: "Venue & Collaboration",
    partners: [
      fromExistingPartner({
        id: "komdigi-makassar",
        name: "BBLSDM Komdigi Makassar",
        role: "Venue Partner",
        support: "Venue dan fasilitas kegiatan.",
      }),
      fromExistingPartner({
        id: "makassar-creative-hub",
        role: "Creative Space Partner",
        support: "Creative space dan collaboration support.",
      }),
    ],
  },
  {
    id: "academic-technical",
    title: "Academic & Technical Ecosystem",
    partners: [
      fromExistingPartner({
        id: "informatika-unhas",
        name: "Departemen Teknik Informatika Universitas Hasanuddin",
        role: "Academic & Technical Ecosystem",
        support:
          "Technical talent, academic support, mentor, dan speaker ecosystem.",
      }),
    ],
  },
];

export type UmkmVisualKind = "official-logo" | "documentation-photo";

const umkmVisualById = {
  "eyfa-natural-oil": {
    src: "/sponsorship-logo/optimized/logo-eyfa.webp",
    alt: "Logo Eyfa Natural Oil",
    width: 309,
    height: 166,
    kind: "official-logo",
    fallbackNote: null,
  },
  "sukmajahe-sarabba": {
    src: "/sponsorship-logo/optimized/logo-sukma-jahe.webp",
    alt: "Logo Sukmajahe Sarabba Makassar",
    width: 758,
    height: 329,
    kind: "official-logo",
    fallbackNote: null,
  },
  "markisa-bintang-jaya": {
    src: "/problem-validation/documentation/markisa-bintang-jaya.webp",
    alt: "Dokumentasi pemilik Markisa Bintang Jaya dalam proses validasi masalah",
    width: 1200,
    height: 1500,
    kind: "documentation-photo",
    fallbackNote:
      "Logo standalone Markisa Bintang Jaya belum tersedia; visual menggunakan dokumentasi aktual problem validation.",
  },
  "kira-kira-michi": {
    src: "/sponsorship-logo/optimized/logo-kira-kira-michi.webp",
    alt: "Logo Kira Kira Michi",
    width: 823,
    height: 303,
    kind: "official-logo",
    fallbackNote: null,
  },
  "dapur-andist": {
    src: "/sponsorship-logo/optimized/logo-dapur-andist.webp",
    alt: "Logo Dapur Andist",
    width: 327,
    height: 412,
    kind: "official-logo",
    fallbackNote: null,
  },
} as const satisfies Record<
  WeekThreeUmkmId,
  {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly kind: UmkmVisualKind;
    readonly fallbackNote: string | null;
  }
>;

function readUmkmVisual(id: string) {
  if (id in umkmVisualById) {
    return umkmVisualById[id as WeekThreeUmkmId];
  }

  throw new Error(`Missing verified Week 3 UMKM visual for: ${id}`);
}

export const fiveUmkmCoCreators = umkmStakeholders.map((stakeholder) => ({
  id: stakeholder.id,
  name: stakeholder.businessName,
  label: "UMKM Co-Creation Partner" as const,
  visual: readUmkmVisual(stakeholder.id),
}));

export interface VolunteerProfile {
  readonly id: string;
  readonly name: string;
  readonly university: string;
  readonly team: string;
  readonly role: string;
}

export const peopleBehindTheLab = {
  title: "People Behind the Lab",
  subtitle:
    "AI Co-Creation Lab was also made possible by volunteers and student contributors who supported the event operation.",
} as const;

export const eventVolunteers: readonly VolunteerProfile[] = [
  {
    id: "nur-fatya",
    name: "Nur Fatya",
    university: "Universitas Negeri Makassar",
    team: "Documentation Team",
    role: "Event Documentation Volunteer",
  },
  {
    id: "fatihah-nurislami-ramadhani",
    name: "Fatihah Nurislami Ramadhani",
    university: "Universitas Negeri Makassar",
    team: "Documentation Team",
    role: "Event Documentation Volunteer",
  },
  {
    id: "dian-nuraini",
    name: "Dian Nuraini",
    university: "Universitas Hasanuddin",
    team: "Event Operator",
    role: "Event Operator",
  },
  {
    id: "fitrisky-nur-maharani",
    name: "Fitrisky Nur Maharani",
    university: "Universitas Negeri Makassar",
    team: "Participant Registration",
    role: "Participant Registration Team",
  },
  {
    id: "andi-yehuda-george-matandung",
    name: "Andi Yehuda George Matandung",
    university: "Universitas Hasanuddin",
    team: "Liaison Officer",
    role: "Event Liaison Officer",
  },
];

export interface TechnicalMentorProfile {
  readonly id: string;
  readonly name: string;
  readonly department: "Teknik Informatika";
  readonly university: "Universitas Hasanuddin";
  readonly expertise: readonly ["Web Developer", "Software Engineer", "AI Engineer"];
  readonly role: "Technical Mentor / SDM";
}

export const technicalMentors: readonly TechnicalMentorProfile[] = [
  {
    id: "randy-kamal-husein",
    name: "Randy Kamal Husein",
    department: "Teknik Informatika",
    university: "Universitas Hasanuddin",
    expertise: ["Web Developer", "Software Engineer", "AI Engineer"],
    role: "Technical Mentor / SDM",
  },
  {
    id: "andi-roihan-aqilah-palowomgi",
    name: "Andi Roihan Aqilah Palowomgi",
    department: "Teknik Informatika",
    university: "Universitas Hasanuddin",
    expertise: ["Web Developer", "Software Engineer", "AI Engineer"],
    role: "Technical Mentor / SDM",
  },
];

export interface StudentCoCreator {
  readonly name: string;
  readonly university: string;
}

export interface StudentCoCreationTeam {
  readonly number: string;
  readonly id: WeekThreeUmkmId;
  readonly title: string;
  readonly umkm: string;
  readonly members: readonly StudentCoCreator[];
}

export const studentCoCreatorsIntro = {
  title: "20 Student Co-Creators",
  subtitle:
    "20 students from different universities collaborated in five teams to solve five real UMKM problems.",
} as const;

export const studentCoCreationTeams: readonly StudentCoCreationTeam[] = [
  {
    number: "01",
    id: "eyfa-natural-oil",
    title: "Team 1 — Eyfa Natural Oil",
    umkm: "Eyfa Natural Oil",
    members: [
      { name: "Siti Aulia Felinda Wijaya", university: "Universitas Hasanuddin" },
      { name: "Muhammad Makbul N", university: "Universitas Islam Negeri Alauddin Makassar" },
      { name: "Luciana Lintiara Tiiwan Weridity", university: "Universitas Negeri Makassar" },
      { name: "Reni Renata", university: "Universitas Hasanuddin" },
    ],
  },
  {
    number: "02",
    id: "sukmajahe-sarabba",
    title: "Team 2 — Sukmajahe Sarabba Makassar",
    umkm: "Sukmajahe Sarabba Makassar",
    members: [
      { name: "Yessy Angeline", university: "Universitas Negeri Makassar" },
      { name: "Dimas Jayakusuma Sarma", university: "Universitas Islam Negeri Alauddin Makassar" },
      { name: "Siti Husna", university: "Universitas Negeri Makassar" },
      { name: "Achmad Alfian Saputra", university: "Universitas Hasanuddin" },
    ],
  },
  {
    number: "03",
    id: "markisa-bintang-jaya",
    title: "Team 3 — Markisa Bintang Jaya",
    umkm: "Markisa Bintang Jaya",
    members: [
      { name: "Fathur Rizqi S Djafar", university: "Universitas Islam Negeri Alauddin Makassar" },
      { name: "Muthmainnah Nurul Irsyad", university: "Universitas Islam Negeri Alauddin Makassar" },
      { name: "Made Rizal Aprilian", university: "Universitas Negeri Makassar" },
      { name: "Marsha Carolince", university: "Universitas Hasanuddin" },
    ],
  },
  {
    number: "04",
    id: "kira-kira-michi",
    title: "Team 4 — Kira Kira Michi",
    umkm: "Kira Kira Michi",
    members: [
      { name: "Andi Alfian Rusani", university: "Universitas Teknologi Akba Makassar" },
      { name: "Zaky Fikri", university: "Universitas Terbuka" },
      { name: "Syalwah", university: "Universitas Ciputra" },
      { name: "Filzah Nafilah Ilmi", university: "Universitas Hasanuddin" },
    ],
  },
  {
    number: "05",
    id: "dapur-andist",
    title: "Team 5 — Dapur Andist",
    umkm: "Dapur Andist",
    members: [
      { name: "Feri Awal", university: "Universitas Negeri Makassar" },
      { name: "Chelsea Shelin Purnaria", university: "Universitas Hasanuddin" },
      { name: "Muh. Raihan Ahmad", university: "Universitas Hasanuddin" },
      { name: "A. Walimatussadiyah Mansur", university: "Universitas Hasanuddin" },
    ],
  },
];

export const studentCoCreatorCount = studentCoCreationTeams.reduce(
  (total, team) => total + team.members.length,
  0,
);

export const networkMobilizationStory = {
  title: "AI Co-Creation Lab Makassar was built through collaborative leadership.",
  nodes: [
    "students",
    "UMKM",
    "mentors",
    "volunteers",
    "universities",
    "corporate partners",
    "government ecosystem",
    "social impact organizations",
  ],
  statement:
    "Mobilizing a network was not about collecting logos. Each person and organization contributed to a different part of making the project possible.",
} as const;

export const processDocumentationCategories = [
  { number: "01", id: "preparation", title: "Preparation" },
  { number: "02", id: "event-opening", title: "Event Opening" },
  { number: "03", id: "workshop-session", title: "Workshop Session" },
  { number: "04", id: "student-umkm-co-creation", title: "Student × UMKM Co-Creation" },
  { number: "05", id: "hands-on-build", title: "Hands-On Build" },
  { number: "06", id: "prototype-pitching", title: "Prototype & Pitching" },
  { number: "07", id: "partners-stakeholders", title: "Partners & Stakeholders" },
  { number: "08", id: "volunteers-event-team", title: "Volunteers & Event Team" },
  { number: "09", id: "group-documentation", title: "Group Documentation" },
  { number: "10", id: "video-report", title: "Video Report" },
] as const;

export const curatedEventDocumentation: readonly WeekThreeImage[] = [
  {
    id: "event-opening",
    src: "/week-3/documentation/event-opening.webp",
    alt: "Peserta duduk menghadap layar presentasi DekatLokal di ruang acara",
    caption: "Peserta menyimak sesi di ruang acara dengan identitas DekatLokal di layar.",
    width: 1800,
    height: 1012,
    category: "Event Opening",
  },
  {
    id: "workshop-facilitation",
    src: "/week-3/documentation/workshop-facilitation.webp",
    alt: "Seorang fasilitator berdiri di depan layar presentasi dan peserta",
    caption: "Fasilitator menyampaikan materi di depan peserta workshop.",
    width: 1012,
    height: 1800,
    category: "Workshop Session",
  },
  {
    id: "workshop-collaboration",
    src: "/week-3/documentation/workshop-collaboration.webp",
    alt: "Deretan peserta berdiskusi dan menggunakan laptop di meja workshop",
    caption: "Peserta bekerja bersama menggunakan laptop dalam sesi workshop.",
    width: 1012,
    height: 1800,
    category: "Workshop Session",
  },
  {
    id: "participant-interaction",
    src: "/week-3/documentation/participant-interaction.webp",
    alt: "Seorang peserta berdiri memegang lembar aktivitas di samping peserta lain",
    caption: "Interaksi peserta saat menjalankan aktivitas workshop.",
    width: 1012,
    height: 1800,
    category: "Workshop Session",
  },
  {
    id: "student-umkm-discussion",
    src: "/week-3/documentation/student-umkm-discussion.webp",
    alt: "Tiga peserta berdiskusi mengelilingi meja dengan lembar kerja",
    caption: "Diskusi kelompok menggunakan lembar kerja selama proses co-creation.",
    width: 1012,
    height: 1800,
    category: "Student × UMKM Co-Creation",
  },
  {
    id: "hands-on-building",
    src: "/week-3/documentation/hands-on-building.webp",
    alt: "Seorang peserta berdiri berbicara kepada kelompok yang bekerja dengan laptop",
    caption: "Kelompok mengembangkan solusi bersama dalam sesi hands-on.",
    width: 1800,
    height: 1012,
    category: "Hands-On Build",
  },
  {
    id: "prototype-development",
    src: "/week-3/documentation/prototype-development.webp",
    alt: "Peserta mengembangkan prototype melalui laptop",
    caption: "Proses pengembangan prototipe pada laptop peserta.",
    width: 1012,
    height: 1800,
    category: "Hands-On Build",
  },
  {
    id: "prototype-review",
    src: "/week-3/documentation/prototype-review.webp",
    alt: "Seorang peserta memperlihatkan layar laptop kepada anggota kelompok",
    caption: "Peserta memperlihatkan hasil kerja digital kepada anggota tim.",
    width: 1012,
    height: 1800,
    category: "Prototype & Pitching",
  },
  {
    id: "team-pitching",
    src: "/week-3/documentation/team-pitching.webp",
    alt: "Seorang peserta berbicara kepada anggota tim yang duduk di meja kerja",
    caption: "Penyampaian progres solusi dalam sesi team pitching.",
    width: 1012,
    height: 1800,
    category: "Prototype & Pitching",
  },
  {
    id: "stakeholder-recognition",
    src: "/week-3/documentation/stakeholder-recognition.webp",
    alt: "Tiga orang berpose sambil memegang sertifikat di area acara",
    caption: "Dokumentasi penyerahan sertifikat di area acara.",
    width: 1012,
    height: 1800,
    category: "Partners & Stakeholders",
  },
  {
    id: "event-team",
    src: "/week-3/documentation/event-team.webp",
    alt: "Sekelompok peserta berpose bersama di dalam ruang kegiatan",
    caption: "Dokumentasi kebersamaan tim dan peserta kegiatan.",
    width: 900,
    height: 1600,
    category: "Volunteers & Event Team",
  },
  {
    id: "group-documentation",
    src: "/week-3/documentation/group-documentation.webp",
    alt: "Sekelompok peserta berpose bersama di depan area acara",
    caption: "Dokumentasi kelompok peserta di area acara.",
    width: 1600,
    height: 900,
    category: "Group Documentation",
  },
] as const;

export const featuredDocumentationIds = [
  "event-opening",
  "student-umkm-discussion",
  "group-documentation",
] as const;

export const weekThreeMediaManifestUrl = "/week-3/media-manifest.json";

export const eventVideoDocumentation = {
  id: "event-video-documentation",
  title: "Event Video Documentation",
  src: null,
  poster: "/week-3/documentation/group-documentation.webp",
  driveUrl: eventDocumentationDriveUrl,
  availability: "Available on Google Drive",
  caption:
    "Video report kegiatan tersedia di folder Video Report Event pada Google Drive. Tidak ada URL video lokal yang diklaim sebelum file compatible tersedia di project.",
} as const;

export const fullDocumentationAction = {
  label: "View Full Documentation on Google Drive",
  href: eventDocumentationDriveUrl,
} as const;

export const weekThreeInNumbers = [
  { value: "20", label: "Student Co-Creators" },
  { value: "5", label: "UMKM Co-Creators" },
  { value: "5", label: "Co-Creation Teams" },
  { value: "5", label: "Functional Prototypes" },
  { value: "5", label: "Event Volunteers / Support Team" },
] as const;

export const weekThreeLeadershipConnection = {
  insight:
    "Week 3 became the moment where planning turned into leadership practice.",
  actions: [
    "listening to stakeholders",
    "mobilizing people",
    "delegating responsibilities",
    "collaborating with partners",
    "solving unexpected problems",
    "delivering the project",
    "reflecting on how the model could continue",
  ],
  closingTitle: "Leadership is not doing everything alone.",
  closingSubtitle:
    "It is creating the conditions for people to build something meaningful together.",
} as const;

export const weekFourTransition = {
  eyebrow: "Next — Week 4",
  title: "Measure, Reflect & Sustain",
  description:
    "The implementation is complete. The next step is to measure what changed, understand what worked, document what we learned, and turn the first pilot into a model that can continue.",
  label: "Explore Week 4",
  href: "/ai-co-creation-lab-makassar/progress/measure-reflect-sustain",
} as const;

export const weekThreeClosingNarrative = {
  questionBefore: "Did the event happen?",
  questionNow:
    "What changed, what continues, and how can this model be replicated?",
} as const;

export const weekThreeCompletedReportCopy = {
  hub: {
    progressDescription:
      "Week 3 telah diselesaikan melalui leadership learning bersama Ayu Anisela, pelaksanaan AI Co-Creation Lab pada 10 Agustus 2026, mobilisasi ekosistem, dan dokumentasi aktual. Lima progress utama seluruhnya berstatus Completed.",
    outputs: [
      "Meet the Leader Challenge bersama Ayu Anisela.",
      "Leadership Conversation Report lengkap dengan project feedback dan personal reflection.",
      "Mini Project Implementation bersama 20 mahasiswa, lima UMKM, dan lima prototype fungsional.",
      "Network Mobilization bersama partner, sponsor, relawan, mentor, dan student co-creators.",
      "Process Documentation dengan galeri dan pranala dokumentasi penuh.",
    ],
    reflection: {
      quote: weekThreeLeadershipConnection.closingTitle,
      paragraphs: [weekThreeLeadershipConnection.closingSubtitle],
    },
  },
  meetTheLeader: {
    progressDescription:
      "Meet the Leader Challenge telah diselesaikan bersama Ayu Anisela, Koordinator Utama Rumah BUMN BRI Makassar. Pertemuan membahas konsistensi, KPI, delegasi, kemauan belajar UMKM, serta relevansi dan keberlanjutan AI Co-Creation Lab Makassar.",
    outputs: [
      "Profil Ayu Anisela dan alasan pemilihan tokoh.",
      "Tiga foto dokumentasi pertemuan.",
      "Ringkasan percakapan dan tiga leadership insights.",
      "Empat rekomendasi pengembangan AI Co-Creation Lab.",
    ],
    reflection: {
      quote: riswanLeadershipReflection.closing,
      paragraphs: [
        "Pertemuan ini menegaskan bahwa impact membutuhkan konsistensi, sistem, orang-orang yang tepat, dan keberanian untuk mendelegasikan tanggung jawab.",
      ],
    },
  },
  leadershipConversation: {
    progressDescription:
      "Leadership Conversation Report merangkum profil Ayu Anisela, hasil diskusi tentang willingness UMKM untuk belajar, tiga leadership insights, empat masukan bagi project, dan refleksi personal Riswan Ramadhan.",
    outputs: [
      "Profil tokoh dan hasil diskusi.",
      "Relevansi AI Co-Creation Lab bagi kebutuhan digitalisasi UMKM.",
      "Tiga leadership insights.",
      "Empat project feedback recommendations.",
      "Personal reflection Riswan Ramadhan.",
    ],
    reflection: {
      quote: riswanLeadershipReflection.closing,
      paragraphs: riswanLeadershipReflection.paragraphs,
    },
  },
  implementation: {
    progressDescription:
      "AI Co-Creation Lab Makassar 2026 telah dilaksanakan pada 10 Agustus 2026 bersama 20 mahasiswa dan lima UMKM dalam lima co-creation teams. Proses Listen, Define, Build, Test, dan Improve menghasilkan lima prototype berstatus Completed · Functional.",
    outputs: [
      "Workshop & Learning.",
      "Hands-On Co-Creation.",
      "Lima prototype fungsional.",
      "Team Pitching.",
      "Post-Lab Improvement sebagai penghubung menuju monitoring Week 4.",
    ],
    reflection: {
      quote:
        "Week 3 became the moment where planning turned into leadership practice.",
      paragraphs: [
        "Implementasi memperlihatkan bahwa real problems, real users, dan student builders dapat dipertemukan melalui proses co-creation yang terarah.",
      ],
    },
  },
  networkMobilization: {
    progressDescription:
      "Network Mobilization menghubungkan 20 student co-creators, lima UMKM co-creators, lima relawan, dua technical mentor/SDM, serta berbagai partner dan sponsor yang berkontribusi pada bagian berbeda dari pelaksanaan program.",
    outputs: [
      "Network summary berbasis peran.",
      "Partner dan sponsor dengan visual logo terverifikasi.",
      "Lima UMKM co-creation partners dengan logo atau visual aktual.",
      "Lima volunteer/event support profiles.",
      "Dua technical mentor/SDM profiles.",
      "Dua puluh student co-creators dalam lima team cards.",
    ],
    reflection: {
      quote: networkMobilizationStory.statement,
      paragraphs: [
        "Collaborative leadership berarti menyatukan kontribusi yang berbeda agar semua orang dapat membangun sesuatu yang bermakna bersama.",
      ],
    },
  },
  documentation: {
    progressDescription:
      "Process Documentation menyajikan dokumentasi aktual AI Co-Creation Lab Makassar melalui featured documentation, responsive event story gallery, video report, prototype outputs, dan pranala folder Google Drive.",
    outputs: [
      "Sepuluh kategori dokumentasi proses.",
      "Featured documentation.",
      "Event story gallery.",
      "Lima screenshot prototype.",
      "Event video documentation.",
      "Pranala dokumentasi penuh di Google Drive.",
    ],
    reflection: {
      quote: "The first lab becomes the pilot. The documentation becomes the model.",
      paragraphs: [
        "Dokumentasi menjaga konteks proses, kontribusi orang-orang di balik kegiatan, serta pembelajaran yang dapat dibawa menuju pengukuran dan replikasi.",
      ],
    },
  },
} as const;
