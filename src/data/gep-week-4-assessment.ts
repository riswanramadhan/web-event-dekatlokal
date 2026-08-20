/**
 * Hasil pre-test, post-test, dan reflection AI Co-Creation Lab Makassar.
 *
 * Seluruh angka pada file ini berasal dari assessment aktual 20 peserta
 * (full cohort). Nilai knowledge memakai skala 0-100 dan nilai capability
 * memakai skala Likert 1-5. Keduanya tidak boleh saling dikonversi.
 */

export const assessmentCohort = {
  participants: 20,
  preTestCompleted: 20,
  postTestCompleted: 20,
  reflectionCompleted: 20,
  note: "n=20 adalah full cohort peserta AI Co-Creation Lab Makassar, bukan sampel representatif mahasiswa Makassar.",
} as const;

export const impactMeasurementLayers = [
  {
    number: "01",
    title: "Knowledge",
    description:
      "Empat soal objective sebagai core knowledge mastery check, dinilai 0-100.",
  },
  {
    number: "02",
    title: "Self-Reported Capability",
    description:
      "Dua belas item Likert 1-5 berpasangan pre dan post pada empat dimensi.",
  },
  {
    number: "03",
    title: "Post-Program Experience",
    description:
      "Empat item post-only untuk pengalaman yang belum terjadi sebelum program.",
  },
  {
    number: "04",
    title: "Qualitative Reflection",
    description:
      "Refleksi tertulis 20 peserta yang dianalisis secara tematik manual.",
  },
  {
    number: "05",
    title: "Behavioral Output",
    description:
      "Apa yang benar-benar dibangun peserta bersama pengguna nyata.",
  },
  {
    number: "06",
    title: "Sustainability Intention",
    description:
      "Kesediaan melanjutkan peran sebagai technical steward setelah program.",
  },
] as const;

export const impactMeasurementPrinciple =
  "Impact tidak diringkas menjadi satu angka final. Setiap layer dibaca dengan skala dan batasannya sendiri.";

/* -------------------------------------------------------------------------- */
/* Instrument design                                                          */
/* -------------------------------------------------------------------------- */

export interface InstrumentRationale {
  readonly id: string;
  readonly number: string;
  readonly question: string;
  readonly summary: string;
  readonly points: readonly string[];
  readonly note: string | null;
}

export const instrumentRationales: readonly InstrumentRationale[] = [
  {
    id: "knowledge-items",
    number: "01",
    question: "Mengapa hanya 4 soal knowledge?",
    summary:
      "Empat soal objective digunakan sebagai core knowledge mastery check, bukan ujian akademik.",
    points: [
      "Mengukur principle inti, bukan penguasaan materi menyeluruh.",
      "Menjaga durasi pre-test dan post-test tetap singkat.",
      "Mengurangi survey fatigue pada format satu hari.",
      "Memberi objective layer di luar self-assessment.",
    ],
    note: "Empat item cukup untuk pilot mastery check, tetapi belum merupakan comprehensive competency assessment.",
  },
  {
    id: "capability-items",
    number: "02",
    question: "Mengapa 12 item Likert berpasangan?",
    summary:
      "Capability tidak cukup diwakili satu pertanyaan, sehingga dipecah menjadi empat dimensi.",
    points: [
      "Problem & User Understanding — Q1-Q4.",
      "MVP & Solution Thinking — Q5.",
      "AI-Assisted Problem Solving — Q6-Q8.",
      "Testing, Collaboration & Confidence — Q9-Q12.",
    ],
    note: "Item pre dan post identik agar perubahan dapat dibaca sebagai pasangan per peserta.",
  },
  {
    id: "likert-scale",
    number: "03",
    question: "Mengapa skala 1-5?",
    summary:
      "Skala lima titik familiar, memiliki midpoint netral, dan cukup sensitif untuk short intervention.",
    points: [
      "1 — Sangat Tidak Setuju.",
      "2 — Tidak Setuju.",
      "3 — Netral.",
      "4 — Setuju.",
      "5 — Sangat Setuju.",
    ],
    note: "Likert adalah self-report, bukan skor tes objektif. Nilai 4.72/5 tidak dibaca sebagai 94.4% capability.",
  },
  {
    id: "post-only-items",
    number: "04",
    question: "Mengapa ada 4 item post-only?",
    summary:
      "Empat item ini mengukur pengalaman yang belum terjadi sebelum program berlangsung.",
    points: [
      "Penggunaan teknologi untuk masalah nyata.",
      "Interaksi langsung dengan UMKM.",
      "Kepercayaan diri setelah membangun prototype.",
      "Intensi menyelesaikan masalah nyata berikutnya.",
    ],
    note: "Hasilnya dilabeli post-program experience indicators, bukan learning gain.",
  },
  {
    id: "steward-item",
    number: "05",
    question: "Mengapa hanya 1 pertanyaan technical steward?",
    summary:
      "Satu pertanyaan cukup karena yang diukur adalah satu konstruk berorientasi keputusan: kesediaan melanjutkan.",
    points: [
      "Menjadi dasar sustainability model setelah handover.",
      "Distribusi jawaban dibaca apa adanya, tanpa digabung menjadi satu angka setuju.",
    ],
    note: null,
  },
];

export const capabilityJourney = [
  "Understand User",
  "Define Problem",
  "Scope MVP",
  "Use AI",
  "Build",
  "Test",
  "Collaborate",
  "Communicate",
] as const;

export const knowledgeScoringRule =
  "Correct = 1, Incorrect = 0, Knowledge Score = correct / 4 x 100.";

/* -------------------------------------------------------------------------- */
/* Knowledge result                                                           */
/* -------------------------------------------------------------------------- */

export const knowledgeResult = {
  scaleLabel: "Skala 0-100 · empat soal core knowledge check",
  pre: 71.25,
  post: 100,
  gainLabel: "+28.75 percentage points",
  participantsIncreased: 11,
  participantsIncreasedLabel: "11 dari 20 peserta — 55%",
  alreadyAtCeiling: 9,
  interpretation: [
    "Sembilan peserta sudah mencapai 100 pada pre-test, sehingga tidak memiliki ruang peningkatan pada instrumen ini.",
    "Sebelas peserta lainnya masih memiliki room to improve, dan seluruhnya mencapai 100 pada post-test.",
  ],
  headline:
    "11 of 11 participants with room to improve reached the maximum post-test score.",
  supporting:
    "Nine additional participants had already achieved the maximum score at baseline.",
  wordingGuard:
    "Nilai ini adalah rata-rata skor pada core knowledge check empat soal, dibaca pada skala 0-100.",
} as const;

/* -------------------------------------------------------------------------- */
/* Self-reported capability                                                   */
/* -------------------------------------------------------------------------- */

export interface CapabilityDimensionResult {
  readonly id: string;
  readonly label: string;
  readonly pre: number;
  readonly post: number;
  readonly change: string;
  readonly largestGain: boolean;
}

export const capabilityDimensions: readonly CapabilityDimensionResult[] = [
  {
    id: "overall",
    label: "Overall Capability",
    pre: 3.27,
    post: 4.72,
    change: "+1.45",
    largestGain: false,
  },
  {
    id: "problem-user-understanding",
    label: "Problem & User Understanding",
    pre: 3.21,
    post: 4.63,
    change: "+1.41",
    largestGain: false,
  },
  {
    id: "mvp-solution-thinking",
    label: "MVP & Solution Thinking",
    pre: 3.05,
    post: 4.55,
    change: "+1.50",
    largestGain: false,
  },
  {
    id: "ai-assisted-problem-solving",
    label: "AI-Assisted Problem Solving",
    pre: 3.45,
    post: 4.78,
    change: "+1.33",
    largestGain: false,
  },
  {
    id: "testing-collaboration-confidence",
    label: "Testing, Collaboration & Confidence",
    pre: 3.25,
    post: 4.81,
    change: "+1.56",
    largestGain: true,
  },
];

export const capabilityStatement =
  "Average self-reported capability increased from 3.27 to 4.72 on a five-point scale.";

export const capabilityInterpretation =
  "Pergeseran terkuat muncul pada Testing, Collaboration & Confidence. Ini sejalan dengan desain program karena peserta memang dituntut bekerja bersama UMKM nyata, menegosiasikan lingkup, menguji asumsi, membangun dalam tim campuran, dan mempresentasikan solusi kepada penggunanya langsung.";

export const capabilityHeadline =
  "The impact was not limited to learning about AI. It strengthened how participants worked with people, problems, and feedback.";

export const pairedConsistency = {
  title: "Paired Participant Consistency",
  description:
    "Perubahan dihitung per peserta dengan memasangkan jawaban pre dan post masing-masing orang.",
  rows: [
    { label: "Overall self-reported capability", value: "20/20 meningkat" },
    { label: "Problem & User Understanding", value: "20/20 meningkat" },
    { label: "Testing, Collaboration & Confidence", value: "20/20 meningkat" },
    { label: "MVP & Solution Thinking", value: "19/20 meningkat" },
    { label: "AI-Assisted Problem Solving", value: "19/20 meningkat" },
  ],
  note: "Tidak ada peserta yang menunjukkan perubahan overall negatif.",
  reading:
    "Pola ini dibaca sebagai consistent positive shift within this cohort, bukan bukti kausal.",
} as const;

export const mixedTeamPurpose = {
  title: "Mengapa tim sengaja dicampur",
  description:
    "Mahasiswa dengan pengalaman teknis sengaja disebar ke lima tim berbeda agar setiap tim memiliki technical feasibility anchor, bukan satu tim yang mengerjakan seluruh proses build.",
  participation: [
    "Problem discovery",
    "User interview",
    "Ideation",
    "MVP",
    "Testing",
    "Communication",
    "Pitching",
    "Product thinking",
  ],
  statements: [
    "The objective was not to turn every student into a developer. It was to help every student participate in technology-enabled problem solving.",
    "Technical talent acted as an anchor, not a silo.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Post-program experience                                                    */
/* -------------------------------------------------------------------------- */

export const postProgramExperience = {
  label: "Post-program experience indicators",
  note: "Empat item ini bersifat post-only sehingga mengukur pengalaman yang belum terjadi sebelum program berlangsung.",
  headline:
    "All 20 participants selected Agree or Strongly Agree across all four post-program experience indicators.",
  agreementLabel: "Agree + Strongly Agree",
  items: [
    {
      id: "technology-for-real-problems",
      label: "Teknologi untuk menyelesaikan masalah nyata",
      mean: 4.95,
      agreement: "100%",
    },
    {
      id: "umkm-interaction",
      label: "Interaksi dengan UMKM meningkatkan pemahaman pengguna",
      mean: 5,
      agreement: "100%",
    },
    {
      id: "prototype-confidence",
      label: "Pengalaman membangun prototype meningkatkan kepercayaan diri",
      mean: 4.8,
      agreement: "100%",
    },
    {
      id: "future-intention",
      label: "Intensi menyelesaikan masalah nyata lainnya",
      mean: 5,
      agreement: "100%",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Technical steward intention                                                */
/* -------------------------------------------------------------------------- */

export const stewardIntention = {
  title: "Technical Steward Intention",
  question:
    "Kesediaan melanjutkan peran sebagai technical steward untuk sistem UMKM setelah program selesai.",
  distribution: [
    { id: "sangat-bersedia", label: "Sangat Bersedia", count: 3, share: "15%" },
    { id: "bersedia", label: "Bersedia", count: 4, share: "20%" },
    { id: "mungkin", label: "Mungkin", count: 10, share: "50%" },
    { id: "tidak-bersedia", label: "Tidak Bersedia", count: 3, share: "15%" },
  ],
  headline:
    "Seven participants expressed clear willingness to continue as technical stewards, creating a sufficient talent pool for the five-system support model.",
  interpretation: [
    "Tujuh peserta menyatakan kesediaan yang jelas untuk melanjutkan.",
    "Sepuluh peserta lain masih terbuka terhadap keterlibatan berikutnya.",
  ],
  wordingGuard:
    "Jawaban Sangat Bersedia dan Bersedia tidak digabungkan dengan Mungkin.",
  sustainabilityNote:
    "Tiga sistem berjalan dengan student technical steward dan dua sistem ditangani langsung tim teknis DekatLokal.",
} as const;

/* -------------------------------------------------------------------------- */
/* Qualitative reflection                                                     */
/* -------------------------------------------------------------------------- */

export const reflectionCoverage = {
  completed: 20,
  total: 20,
  method:
    "Manual thematic analysis atas 20 refleksi tertulis peserta. Tema disusun dari jawaban aktual, bukan dari kategori yang ditetapkan sebelumnya.",
} as const;

export interface ReflectionTheme {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly before?: readonly string[];
  readonly after?: readonly string[];
}

export const reflectionThemes: readonly ReflectionTheme[] = [
  {
    number: "01",
    title: "AI Usage Shift",
    description:
      "Cara peserta menggunakan AI bergeser dari pemakaian cepat dan situasional menjadi pemakaian yang lebih terstruktur.",
    before: [
      "Quick answer",
      "Mengerjakan tugas",
      "Mencari inspirasi",
      "Merangkum",
      "Produktivitas acak",
    ],
    after: [
      "Penggunaan terstruktur",
      "Problem solving",
      "Refinement",
      "Pemeriksaan relevansi",
      "Penerapan pada konteks bisnis",
    ],
  },
  {
    number: "02",
    title: "Listen Before Build",
    description:
      "Peserta menyadari bahwa pembangun solusi tidak boleh merasa paling tahu kebutuhan UMKM.",
  },
  {
    number: "03",
    title: "Simplicity & MVP",
    description:
      "Solusi sederhana yang benar-benar terpakai dinilai lebih berharga daripada sistem kompleks yang tidak selesai.",
  },
  {
    number: "04",
    title: "Testing & Iteration",
    description:
      "Feedback, pengujian, revisi, dan validasi awal mulai dipandang sebagai bagian dari cara kerja, bukan tahap tambahan.",
  },
  {
    number: "05",
    title: "Human-Centered Technology",
    description:
      "Empati, pengalaman pengguna, komunikasi, aksesibilitas, dan kenyamanan pengguna menjadi pertimbangan penting.",
  },
];

export interface FeaturedReflection {
  readonly id: string;
  readonly name: string;
  readonly team: string;
  readonly insight: string;
}

/**
 * Ringkasan tema dari refleksi peserta. Ditulis sebagai parafrase karena
 * naskah verbatim tidak dipublikasikan pada halaman ini.
 */
export const featuredReflections: readonly FeaturedReflection[] = [
  {
    id: "syalwah",
    name: "Syalwah",
    team: "Team 4 — Kira Kira Michi",
    insight:
      "Solusi perlu dirancang dari sudut pandang pengguna dan diuji lebih dahulu. Pembangun tidak boleh merasa paling memahami kebutuhan UMKM.",
  },
  {
    id: "muhammad-makbul-n",
    name: "Muhammad Makbul N",
    team: "Team 1 — Eyfa Natural Oil",
    insight:
      "Feedback kecil dari pengguna dapat mengubah arah solusi yang sudah terlanjur diyakini benar.",
  },
  {
    id: "muh-raihan-ahmad",
    name: "Muh. Raihan Ahmad",
    team: "Team 5 — Dapur Andist",
    insight:
      "Masalah perlu divalidasi lebih dahulu sebelum tim masuk ke tahap pengembangan.",
  },
  {
    id: "feri-awal",
    name: "Feri Awal",
    team: "Team 5 — Dapur Andist",
    insight:
      "Teknologi yang baik adalah teknologi yang bisa dipakai dan dimengerti oleh penggunanya.",
  },
  {
    id: "chelsea-shelin-purnaria",
    name: "Chelsea Shelin Purnaria",
    team: "Team 5 — Dapur Andist",
    insight:
      "Solusi yang dianggap tepat oleh pembangun belum tentu solusi yang dibutuhkan UMKM.",
  },
  {
    id: "luciana-lintiara-tiiwan-weridity",
    name: "Luciana Lintiara Tiiwan Weridity",
    team: "Team 1 — Eyfa Natural Oil",
    insight:
      "Validasi di awal mencegah tim membangun fitur yang sebenarnya tidak penting.",
  },
];

export const featuredReflectionsNote =
  "Enam catatan berikut adalah parafrase dari refleksi peserta yang telah memberi persetujuan, bukan kutipan verbatim.";

/* -------------------------------------------------------------------------- */
/* Behavioral output & limitations                                            */
/* -------------------------------------------------------------------------- */

export const behavioralOutcomeFlow = [
  "20 Students",
  "5 Mixed Teams",
  "5 Real UMKM Problems",
  "5 Functional MVPs",
  "5/5 Initial UAT",
  "5 Systems Enter Refinement",
  "Supported Handover",
] as const;

export const behavioralOutcomeStatement =
  "We measured what students understood, how capable they felt, what they experienced, and what they actually managed to build with real users.";

/**
 * Satu catatan metodologi ringkas untuk seluruh halaman impact. Catatan ini
 * sengaja tidak diulang pada setiap bagian hasil.
 */
export const methodologyNote = {
  title: "Methodology note",
  text: "Seluruh angka berasal dari full cohort 20 peserta dengan perbandingan pre dan post berpasangan per orang. Knowledge diukur pada skala 0-100 melalui empat soal objektif, sedangkan capability dan pengalaman pasca-program adalah penilaian peserta terhadap dirinya sendiri pada skala 1-5 dan tidak pernah dipersentasekan.",
  statement:
    "This is pilot-level paired cohort evidence and is not a randomized causal comparison.",
} as const;

export const participantVoice = {
  title: "Quantitative Results, Backed by Participant Voice",
  description:
    "Tema yang paling sering muncul pada refleksi tertulis peserta, dirangkum dari 20 jawaban.",
  transformations: [
    { from: "AI untuk tugas", to: "AI untuk masalah nyata" },
    { from: "Asumsi", to: "Mendengarkan pengguna" },
    { from: "Kompleksitas", to: "MVP yang berguna" },
    { from: "Sekali bangun", to: "Uji dan perbaiki" },
  ],
} as const;

export const measurementKitImprovements = [
  {
    title: "8 scenario-based knowledge questions",
    description:
      "Menggantikan empat soal singkat untuk menaikkan sensitivitas dan menurunkan ceiling effect.",
  },
  {
    title: "12 balanced capability items",
    description:
      "Tiga item untuk masing-masing dimensi: Problem & User Understanding, MVP & Solution Thinking, AI-Assisted Problem Solving, serta Testing, Collaboration & Confidence.",
  },
  {
    title: "4 post-program experience items",
    description:
      "Dipertahankan sebagai indikator pengalaman, bukan sebagai learning gain.",
  },
  {
    title: "1 steward intention item",
    description: "Dipertahankan sebagai konstruk keputusan tunggal.",
  },
  {
    title: "3 reflection prompts",
    description:
      "Menjaga refleksi tetap terarah dan dapat dianalisis secara tematik.",
  },
  {
    title: "Prototype Rubric & UMKM UAT",
    description:
      "Menilai hasil build dan penerimaan pengguna dengan kriteria yang sama antar tim.",
  },
  {
    title: "H+7 dan H+30 Adoption Form",
    description: "Melengkapi pengukuran adopsi setelah handover.",
  },
] as const;

export const statisticalLanguageGuide = {
  use: [
    "increased from",
    "average score",
    "self-reported capability",
    "paired participants",
    "positive shift",
    "pilot-level evidence",
    "consistent with",
    "suggests",
  ],
  avoid: ["proved", "caused", "all students mastered AI", "94.4% capability"],
} as const;
