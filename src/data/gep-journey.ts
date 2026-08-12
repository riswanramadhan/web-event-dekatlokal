export const JOURNEY_ACTIVITY_SLUGS = [
  "personal-leadership-profile",
  "leadership-branding",
  "network-mapping",
  "social-issue",
  "project-canvas",
  "problem-validation",
  "partnership",
  "pitching",
  "action-plan",
  "global-communication",
  "meet-the-leader",
  "leadership-conversation",
  "implementation",
  "network-mobilization",
  "process-documentation",
  "monitoring",
  "impact-measurement",
  "leadership-reflection",
  "final-presentation",
] as const;

export type JourneyActivitySlug =
  (typeof JOURNEY_ACTIVITY_SLUGS)[number];
export type JourneyWeekNumber = 1 | 2 | 3 | 4;
export type JourneyStatus =
  | "planned"
  | "in_progress"
  | "completed"
  | "published";
export type EvidenceType =
  | "document"
  | "photo"
  | "video"
  | "social"
  | "drive"
  | "website";

export interface JourneyEvidence {
  readonly label: string;
  readonly href: string;
  readonly type: EvidenceType;
}

interface JourneyActivityDefinition {
  readonly slug: JourneyActivitySlug;
  readonly week: JourneyWeekNumber;
  readonly title: string;
  readonly shortDescription: string;
  readonly progressDescription: string;
  readonly output: readonly string[];
  readonly status: JourneyStatus;
  readonly updatedAt: string | null;
  readonly evidence: readonly JourneyEvidence[];
  readonly leadershipInsight: string;
}

export interface JourneyActivity extends JourneyActivityDefinition {
  readonly route: string;
  /**
   * Alias ergonomis untuk `output`, sehingga komponen dapat memakai bentuk
   * plural tanpa membuat sumber data kedua.
   */
  readonly outputs: readonly string[];
}

export interface JourneyWeekDefinition {
  readonly week: JourneyWeekNumber;
  readonly title: string;
  readonly theme: string;
  readonly description: string;
}

export interface JourneyWeek extends JourneyWeekDefinition {
  readonly activities: readonly JourneyActivity[];
}

export const journeyStatusLabels = {
  planned: "Direncanakan",
  in_progress: "Dalam Proses",
  completed: "Selesai",
  published: "Dipublikasikan",
} as const satisfies Record<JourneyStatus, string>;

export const journeyWeekDefinitions = [
  {
    week: 1,
    title: "Week 1",
    theme: "Discover Yourself & Build Your Network",
    description:
      "Membangun fondasi identitas kepemimpinan, narasi diri, pemetaan jejaring, pemahaman isu, dan konsep mini project.",
  },
  {
    week: 2,
    title: "Week 2",
    theme: "Connect & Collaborate",
    description:
      "Memvalidasi permasalahan, membangun partnership, mematangkan pitch, dan menerjemahkan konsep menjadi rencana aksi.",
  },
  {
    week: 3,
    title: "Week 3",
    theme: "Lead The Action",
    description:
      "Belajar dari pemimpin, menggerakkan jejaring, menjalankan mini project, dan menjaga dokumentasi proses.",
  },
  {
    week: 4,
    title: "Week 4",
    theme: "Create Impact & Reflection",
    description:
      "Menyelesaikan monitoring, mengukur dampak, merefleksikan kepemimpinan, dan menyajikan pembelajaran akhir.",
  },
] as const satisfies readonly JourneyWeekDefinition[];

const journeyActivityDefinitions = [
  {
    slug: "personal-leadership-profile",
    week: 1,
    title: "Personal Leadership Profile",
    shortDescription:
      "Mengenali nilai, kekuatan, area pengembangan, dan peran kepemimpinan dalam mini project.",
    progressDescription:
      "Aktivitas ini direncanakan untuk menyusun profil kepemimpinan personal yang menjelaskan nilai utama, kekuatan, area pengembangan, dan kontribusi yang ingin dibawa dalam AI Co Creation Lab Makassar. Hasil belum ditandai selesai dan bukti belum dipublikasikan.",
    output: [
      "Ringkasan nilai dan kekuatan personal.",
      "Area pengembangan kepemimpinan.",
      "Pernyataan kontribusi untuk mini project.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: memahami diri sebelum mengarahkan kolaborasi dan mengambil keputusan project.",
  },
  {
    slug: "leadership-branding",
    week: 1,
    title: "Leadership Branding",
    shortDescription:
      "Merumuskan narasi kepemimpinan yang autentik dan relevan dengan kontribusi project.",
    progressDescription:
      "Aktivitas ini direncanakan untuk merumuskan leadership branding yang menghubungkan identitas personal, komitmen pada problem solving, dan peran sebagai penggerak kolaborasi mahasiswa dan UMKM. Narasi final dan bukti publikasi belum tersedia.",
    output: [
      "Pernyataan leadership branding.",
      "Pesan utama kontribusi sosial.",
      "Rencana kanal komunikasi yang sesuai.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: membangun kredibilitas melalui tindakan dan komunikasi yang konsisten, bukan klaim yang berlebihan.",
  },
  {
    slug: "network-mapping",
    week: 1,
    title: "Leadership Network Mapping",
    shortDescription:
      "Memetakan stakeholder, potensi kontribusi, hubungan, dan tindak lanjut partnership.",
    progressDescription:
      "Leadership Network Mapping awal telah diselesaikan sebagai fondasi untuk partnership Week 2 dan mobilisasi jejaring Week 3. Peta membedakan stakeholder potensial, bentuk kontribusi, prioritas pendekatan, dan status hubungan; penyelesaian artefak ini tidak berarti seluruh pihak otomatis menjadi mitra aktif.",
    output: [
      "Peta stakeholder awal.",
      "Hipotesis kontribusi setiap stakeholder.",
      "Prioritas pendekatan dan tindak lanjut.",
      "Catatan status konfirmasi jejaring.",
    ],
    status: "completed",
    updatedAt: "30 Juli 2026",
    evidence: [
      {
        label: "Laporan Leadership Network Mapping Week 1",
        href:
          "/ai-co-creation-lab-makassar/progress/leadership-network-mapping",
        type: "website",
      },
    ],
    leadershipInsight:
      "Pemetaan jejaring membantu melihat hubungan sebagai pertukaran nilai yang perlu dikelola secara jujur dan berkelanjutan.",
  },
  {
    slug: "social-issue",
    week: 1,
    title: "Identifikasi Masalah Sosial",
    shortDescription:
      "Mengidentifikasi kesenjangan akses, kemampuan, dan pendampingan antara mahasiswa dan UMKM.",
    progressDescription:
      "Identifikasi awal masalah sosial telah diselesaikan dengan merumuskan kesenjangan antara pengalaman mahasiswa menggunakan AI dan kebutuhan operasional nyata UMKM. Rumusan awal ini kemudian diuji melalui Problem Validation Week 2; laporan Week 1 tetap diposisikan sebagai artefak problem discovery, bukan klaim dampak.",
    output: [
      "Rumusan awal isu sosial.",
      "Hipotesis penyebab dan pihak terdampak.",
      "Daftar pertanyaan validasi stakeholder.",
    ],
    status: "completed",
    updatedAt: "30 Juli 2026",
    evidence: [
      {
        label: "Laporan Identifikasi Masalah Sosial Week 1",
        href:
          "/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial",
        type: "website",
      },
    ],
    leadershipInsight:
      "Pemimpin perlu menahan asumsi dan memberi ruang bagi pengalaman stakeholder sebelum menetapkan masalah.",
  },
  {
    slug: "project-canvas",
    week: 1,
    title: "Mini Project Canvas",
    shortDescription:
      "Menyusun konsep awal program, pengguna, nilai, aktivitas, output, dan indikator dampak.",
    progressDescription:
      "Mini Project Canvas awal telah diselesaikan untuk menyelaraskan masalah, sasaran, value proposition, aktivitas, target output, indikator, dan risiko AI Co-Creation Lab Makassar. Canvas ini menjadi baseline desain; pembaruan pasca-validasi dan reviewer dicatat terpisah dalam Final Action Plan Week 2.",
    output: [
      "Rumusan masalah dan sasaran.",
      "Value proposition program.",
      "Rangkaian aktivitas utama.",
      "Target output dan indikator awal.",
      "Asumsi serta risiko yang perlu divalidasi.",
    ],
    status: "completed",
    updatedAt: "30 Juli 2026",
    evidence: [
      {
        label: "Laporan Mini Project Canvas Week 1",
        href:
          "/ai-co-creation-lab-makassar/progress/mini-project-canvas",
        type: "website",
      },
    ],
    leadershipInsight:
      "Canvas dipakai sebagai alat menyelaraskan arah, bukan sebagai alasan untuk mengabaikan temuan baru.",
  },
  {
    slug: "problem-validation",
    week: 2,
    title: "Validasi Permasalahan",
    shortDescription:
      "Menguji asumsi masalah bersama calon challenge partner dan stakeholder relevan.",
    progressDescription:
      "Problem Validation telah dilakukan melalui wawancara dan konsultasi bersama lima UMKM penerima manfaat serta tiga mahasiswa calon co-creator. Temuan mengonfirmasi masalah operasional nyata pada workflow UMKM dan kesenjangan pengalaman mahasiswa dalam membangun solusi untuk pengguna nyata. Komitmen partisipasi telah tervalidasi. Detail prototype dan adopsi jangka panjang tetap akan diuji pada tahap berikutnya.",
    output: [
      "Profil dan kebutuhan lima UMKM penerima manfaat.",
      "Temuan penggunaan AI dari tiga mahasiswa calon co-creator.",
      "Pemetaan masalah tervalidasi dan hipotesis yang masih perlu diuji.",
      "Komitmen lima UMKM untuk memberi feedback dan menguji prototype.",
    ],
    status: "completed",
    updatedAt: "4 Agustus 2026",
    evidence: [
      {
        label: "Laporan Problem Validation Week 2",
        href:
          "/ai-co-creation-lab-makassar/progress/problem-validation",
        type: "website",
      },
    ],
    leadershipInsight:
      "Fokus kepemimpinan: mendengar dengan disiplin dan bersedia mengubah rencana ketika bukti tidak mendukung asumsi.",
  },
  {
    slug: "partnership",
    week: 2,
    title: "Membangun Partnership",
    shortDescription:
      "Membangun kolaborasi program, UMKM, pembelajaran, infrastruktur, venue, dan talenta akademik berdasarkan evidence.",
    progressDescription:
      "Output Partnership Building Week 2 telah diselesaikan melalui dua MoU yang telah diverifikasi, dokumentasi komitmen kolaborasi Rumah BUMN Makassar, supporting document venue Komdigi Makassar dan Makassar Creative Hub, serta dukungan ekosistem program dan talenta akademik. Hubungan kolaborasi dan dokumentasi lanjutan tetap berjalan setelah milestone Week 2.",
    output: [
      "Pemetaan sembilan institusi pendukung dan perannya.",
      "Dua MoU yang telah diverifikasi dari file project.",
      "Dokumentasi komitmen dan supporting document venue.",
      "Ringkasan dukungan in-kind yang memiliki nilai resmi.",
    ],
    status: "completed",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Partnership & Collaboration Week 2",
        href:
          "/ai-co-creation-lab-makassar/progress/partnership-collaboration",
        type: "website",
      },
    ],
    leadershipInsight:
      "Partnership yang sehat dibangun dari tujuan bersama, ekspektasi yang jelas, dan status evidence yang disampaikan secara proporsional.",
  },
  {
    slug: "pitching",
    week: 2,
    title: "Pitching Mini Project",
    shortDescription:
      "Mempresentasikan konsep mini project kepada reviewer untuk memvalidasi dan memperkuat rencana implementasi.",
    progressDescription:
      "Pitching Mini Project telah diselesaikan dengan mempresentasikan konsep AI Co-Creation Lab Makassar kepada reviewer. Konsep utama tetap dipertahankan, sementara masukan reviewer digunakan untuk memperkuat sustainability, impact measurement, dan replication sebelum implementasi.",
    output: [
      "Pitch deck 17 slide yang telah dipresentasikan dan direview.",
      "Ringkasan enam bagian utama pitch.",
      "Tiga arah penguatan dari reviewer.",
      "Daftar replication assets awal.",
    ],
    status: "completed",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Pitching Mini Project Week 2",
        href:
          "/ai-co-creation-lab-makassar/progress/pitching-mini-project",
        type: "website",
      },
    ],
    leadershipInsight:
      "Pitching adalah latihan mengubah kompleksitas menjadi ajakan kolaborasi yang jelas dan dapat dipertanggungjawabkan.",
  },
  {
    slug: "action-plan",
    week: 2,
    title: "Finalisasi Action Plan",
    shortDescription:
      "Menyempurnakan rencana implementasi berdasarkan masukan reviewer tanpa mengubah konsep utama project.",
    progressDescription:
      "Finalisasi Action Plan menyempurnakan AI Co-Creation Lab Makassar yang sama—bukan mengganti konsepnya. Perubahan utama adalah memperpanjang perjalanan dari prototype menuju adoption, membedakan impact mahasiswa dan UMKM, serta menyiapkan dokumentasi agar model dapat direplikasi.",
    output: [
      "Perbandingan rencana sebelum dan setelah review.",
      "Tiga perbaikan utama pasca-review.",
      "Sustainability model pada level solution, impact, dan program.",
      "Final action plan sembilan fase.",
    ],
    status: "completed",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Finalisasi Action Plan Week 2",
        href: "/ai-co-creation-lab-makassar/progress/final-action-plan",
        type: "website",
      },
    ],
    leadershipInsight:
      "Fokus kepemimpinan: menerjemahkan visi menjadi keputusan, kepemilikan tugas, dan batas waktu yang realistis.",
  },
  {
    slug: "global-communication",
    week: 2,
    title: "Global Communication",
    shortDescription:
      "Menyampaikan perjalanan kepemimpinan dan misi project melalui video singkat berbahasa asing.",
    progressDescription:
      "Global Communication telah diselesaikan melalui video berdurasi maksimal dua menit dalam bahasa asing. Video memperkenalkan perjalanan kepemimpinan Riswan Ramadhan, nilai integrity, collaboration, dan real impact, serta mengundang kolaborasi melalui AI Co-Creation Lab Makassar.",
    output: [
      "Video My Leadership Journey.",
      "Ringkasan pesan kepemimpinan dan personal mission.",
      "Publikasi Instagram yang dapat diakses publik.",
      "Transisi menuju Week 3 — Lead The Action.",
    ],
    status: "completed",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Global Communication Week 2",
        href: "/ai-co-creation-lab-makassar/progress/global-communication",
        type: "website",
      },
    ],
    leadershipInsight:
      "Komunikasi lintas konteks membutuhkan kejelasan, empati terhadap audiens, dan ketelitian menjaga makna.",
  },
  {
    slug: "meet-the-leader",
    week: 3,
    title: "Meet the Leader Challenge",
    shortDescription:
      "Mendokumentasikan audiensi pembelajaran bersama pimpinan Rumah BUMN Makassar.",
    progressDescription:
      "Audiensi Meet the Leader telah dilakukan bersama pimpinan Rumah BUMN Makassar. Identitas pimpinan, isi percakapan terperinci, refleksi, dan dokumentasi belum dipublikasikan karena masih berada dalam tahap finalisasi dan verifikasi.",
    output: [
      "Konteks audiensi bersama Rumah BUMN Makassar.",
      "Struktur leader profile.",
      "Slot leadership insights dan feedback mini project.",
      "Ruang personal reflection dan dokumentasi.",
    ],
    status: "in_progress",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Meet the Leader Challenge Week 3",
        href: "/ai-co-creation-lab-makassar/progress/meet-the-leader",
        type: "website",
      },
    ],
    leadershipInsight:
      "Fokus kepemimpinan: datang dengan rasa ingin tahu dan menghargai waktu serta pengalaman narasumber.",
  },
  {
    slug: "leadership-conversation",
    week: 3,
    title: "Leadership Conversation Report",
    shortDescription:
      "Menyusun laporan percakapan kepemimpinan setelah catatan dan evidence terverifikasi.",
    progressDescription:
      "Leadership Conversation Report masih disusun. Halaman laporan menampilkan struktur yang siap menerima leader profile, pokok diskusi, insights, feedback, reflection, supporting documentation, dan file laporan setelah seluruh materi terverifikasi.",
    output: [
      "Template struktur laporan percakapan.",
      "State file report yang jujur dan mudah diperbarui.",
      "Slot supporting documentation.",
    ],
    status: "in_progress",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Leadership Conversation Week 3",
        href:
          "/ai-co-creation-lab-makassar/progress/leadership-conversation",
        type: "website",
      },
    ],
    leadershipInsight:
      "Percakapan menjadi bernilai ketika pembelajaran diterjemahkan menjadi perubahan tindakan yang dapat diamati.",
  },
  {
    slug: "implementation",
    week: 3,
    title: "Pelaksanaan Mini Project",
    shortDescription:
      "Menjalankan AI Co-Creation Lab Makassar dan melanjutkan tindak lanjut pasca-kegiatan.",
    progressDescription:
      "AI Co-Creation Lab Makassar 2026 telah dilaksanakan pada 10 Agustus 2026 dengan 20 mahasiswa, lima UMKM, dan lima co-creation teams. Detail prototype, testing, testimonial, serta dokumentasi pelaksanaan masih dikonsolidasikan; post-project follow-up berlanjut melalui UAT, improvement, deployment, handover, dan monitoring.",
    output: [
      "Pelaksanaan kegiatan utama pada 10 Agustus 2026.",
      "Lima co-creation cases berdasarkan UMKM yang telah tervalidasi.",
      "Struktur evidence pelaksanaan dan output prototype.",
      "Post-lab journey untuk tindak lanjut solusi.",
    ],
    status: "completed",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Pelaksanaan Mini Project Week 3",
        href:
          "/ai-co-creation-lab-makassar/progress/mini-project-implementation",
        type: "website",
      },
    ],
    leadershipInsight:
      "Fokus kepemimpinan: menjaga arah dan keselamatan proses sambil memberi ruang kepada tim untuk mengambil peran.",
  },
  {
    slug: "network-mobilization",
    week: 3,
    title: "Mobilisasi Jejaring",
    shortDescription:
      "Menghubungkan kebutuhan program dengan kontribusi stakeholder dalam ekosistem kolaborasi.",
    progressDescription:
      "Mobilisasi jejaring menghubungkan kebutuhan program dengan kontribusi lembaga, ekosistem UMKM, infrastruktur digital, pembelajaran, venue, ruang kolaborasi, dan talenta teknis. Daftar pada laporan diturunkan dari sumber partnership existing agar tidak membuat klaim mitra baru; dokumentasi pendukung masih dilanjutkan.",
    output: [
      "Pemetaan peran stakeholder berdasarkan kategori kontribusi.",
      "Daftar lima UMKM co-creators dari data problem validation.",
      "Narasi kontribusi ekosistem yang tidak berhenti pada logo.",
    ],
    status: "in_progress",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Mobilisasi Jejaring Week 3",
        href: "/ai-co-creation-lab-makassar/progress/network-mobilization",
        type: "website",
      },
    ],
    leadershipInsight:
      "Mobilisasi bukan sekadar mengumpulkan kontak. Pemimpin perlu menghubungkan kontribusi dengan tujuan dan menjaga akuntabilitas.",
  },
  {
    slug: "process-documentation",
    week: 3,
    title: "Dokumentasi Proses",
    shortDescription:
      "Mengorganisasi evidence persiapan, kolaborasi, pelaksanaan, dan tindak lanjut secara runtut.",
    progressDescription:
      "Dokumentasi proses masih diorganisasi. Laporan menggunakan evidence pra-pelaksanaan yang sudah tersedia dan memberi empty state untuk kategori pelaksanaan yang belum memiliki aset publik terverifikasi. Tidak ada stock image atau dokumentasi rekaan.",
    output: [
      "Taksonomi 16 kategori dokumentasi proses.",
      "Galeri evidence problem validation yang sudah tersedia.",
      "Pranala evidence partnership yang sudah tersedia.",
      "Empty state untuk dokumentasi pelaksanaan yang belum final.",
    ],
    status: "in_progress",
    updatedAt: "12 Agustus 2026",
    evidence: [
      {
        label: "Laporan Dokumentasi Proses Week 3",
        href: "/ai-co-creation-lab-makassar/progress/process-documentation",
        type: "website",
      },
    ],
    leadershipInsight:
      "Dokumentasi yang baik membuat keputusan dan pembelajaran dapat ditinjau tanpa mengorbankan privasi.",
  },
  {
    slug: "monitoring",
    week: 4,
    title: "Penyelesaian dan Monitoring",
    shortDescription:
      "Menutup pekerjaan terbuka dan memantau penggunaan solusi setelah handover.",
    progressDescription:
      "Post-project monitoring sedang berjalan setelah kegiatan utama 10 Agustus 2026. Kerangka pengukuran memisahkan Baseline dari follow-up H+7, H+14, dan H+30 untuk memeriksa akses, penggunaan ulang, hambatan, serta kebutuhan perbaikan. Hasil per tim belum dipublikasikan karena evidence masih dikonsolidasikan.",
    output: [
      "Checklist penyelesaian output.",
      "Catatan Baseline, H+7, H+14, dan H+30.",
      "Daftar hambatan penggunaan.",
      "Tindak lanjut perbaikan.",
    ],
    status: "in_progress",
    updatedAt: "12 Agustus 2026",
    evidence: [],
    leadershipInsight:
      "Tanggung jawab project tidak berhenti saat acara selesai. Handover dan tindak lanjut menentukan kegunaan hasil.",
  },
  {
    slug: "impact-measurement",
    week: 4,
    title: "Impact Measurement",
    shortDescription:
      "Membandingkan target dengan data aktual melalui metode yang telah ditetapkan.",
    progressDescription:
      "Pengukuran dampak sedang berjalan. Data aktual kegiatan utama mencatat 20 mahasiswa, lima UMKM, dan lima co-creation teams; angka ini dilaporkan terpisah dari target. Data penyelesaian prototype, testing, pembelajaran, adopsi, kepuasan, dan testimoni masih dikonsolidasikan melalui Baseline serta follow-up H+7, H+14, dan H+30 sehingga belum dinyatakan sebagai dampak final.",
    output: [
      "Data target dan aktual partisipasi yang dipisahkan.",
      "Perbandingan tes awal dan tes akhir.",
      "Rekap testing dan penggunaan ulang pada setiap titik monitoring.",
      "Catatan keterbatasan pengukuran.",
      "Ringkasan dampak terverifikasi.",
    ],
    status: "in_progress",
    updatedAt: "12 Agustus 2026",
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: melaporkan hasil secara jujur, termasuk capaian yang belum terpenuhi dan keterbatasan data.",
  },
  {
    slug: "leadership-reflection",
    week: 4,
    title: "Leadership Reflection",
    shortDescription:
      "Merefleksikan keputusan, dinamika tim, mobilisasi jejaring, kegagalan, dan pertumbuhan personal.",
    progressDescription:
      "Refleksi akhir belum ditulis. Setelah implementasi dan monitoring, refleksi direncanakan membahas keputusan penting, asumsi yang berubah, cara menangani ketidakpastian, kualitas kolaborasi, penggunaan jejaring, kesalahan, dan praktik yang ingin dipertahankan.",
    output: [
      "Refleksi kepemimpinan tertulis.",
      "Contoh keputusan dan konsekuensinya.",
      "Pelajaran dari hambatan atau kegagalan.",
      "Komitmen pengembangan berikutnya.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Refleksi yang berguna berangkat dari kejadian konkret dan menghasilkan komitmen perubahan yang spesifik.",
  },
  {
    slug: "final-presentation",
    week: 4,
    title: "Final Presentation",
    shortDescription:
      "Menyajikan perjalanan project, kepemimpinan, partnership, output, dampak, dan keberlanjutan.",
    progressDescription:
      "Presentasi akhir belum disusun. Materi direncanakan mengikuti alur masalah, validasi, perencanaan, partnership, implementasi, mobilisasi, output, pengukuran dampak, refleksi, dan sustainability plan dengan bukti yang telah diverifikasi.",
    output: [
      "Deck presentasi akhir.",
      "Ringkasan eksekutif project.",
      "Daftar bukti terverifikasi.",
      "Sustainability plan.",
      "Catatan target yang belum tercapai.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Presentasi akhir adalah bentuk akuntabilitas: menjelaskan proses, hasil, batasan, dan langkah lanjutan secara utuh.",
  },
] as const satisfies readonly JourneyActivityDefinition[];

const journeyBaseRoute = "/ai-co-creation-lab-makassar/journey";

export const journeyActivities: readonly JourneyActivity[] =
  journeyActivityDefinitions.map((activity) => ({
    ...activity,
    route: `${journeyBaseRoute}/${activity.slug}`,
    outputs: activity.output,
  }));

export const journeyWeeks: readonly JourneyWeek[] =
  journeyWeekDefinitions.map((week) => ({
    ...week,
    activities: journeyActivities.filter(
      (activity) => activity.week === week.week,
    ),
  }));

export const journeyActivityBySlug: Readonly<
  Partial<Record<JourneyActivitySlug, JourneyActivity>>
> = Object.fromEntries(
  journeyActivities.map((activity) => [activity.slug, activity]),
);

export function isJourneyActivitySlug(
  value: string,
): value is JourneyActivitySlug {
  return (JOURNEY_ACTIVITY_SLUGS as readonly string[]).includes(value);
}

export function getJourneyActivity(
  slug: string,
): JourneyActivity | undefined {
  if (!isJourneyActivitySlug(slug)) {
    return undefined;
  }

  return journeyActivityBySlug[slug];
}

export function getJourneyNavigation(slug: string): {
  readonly previous: JourneyActivity | null;
  readonly next: JourneyActivity | null;
} {
  const index = journeyActivities.findIndex(
    (activity) => activity.slug === slug,
  );

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: journeyActivities[index - 1] ?? null,
    next: journeyActivities[index + 1] ?? null,
  };
}
