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

export type JourneyActivitySlug = (typeof JOURNEY_ACTIVITY_SLUGS)[number];
export type JourneyWeekNumber = 1 | 2 | 3 | 4;
export type JourneyStatus =
  "planned" | "in_progress" | "completed" | "published";
export type EvidenceType =
  "document" | "photo" | "video" | "social" | "drive" | "website";

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
    theme: "Measure, Reflect & Sustain",
    description:
      "Menyelesaikan project, mengukur perubahan secara jujur, merefleksikan perjalanan kepemimpinan, serta menyiapkan keberlanjutan dan replikasi.",
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
        href: "/ai-co-creation-lab-makassar/progress/leadership-network-mapping",
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
        href: "/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial",
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
        href: "/ai-co-creation-lab-makassar/progress/mini-project-canvas",
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
        href: "/ai-co-creation-lab-makassar/progress/problem-validation",
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
        href: "/ai-co-creation-lab-makassar/progress/partnership-collaboration",
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
        href: "/ai-co-creation-lab-makassar/progress/pitching-mini-project",
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
      "Belajar langsung dari Ayu Anisela tentang kepemimpinan ekosistem pemberdayaan UMKM.",
    progressDescription:
      "Meet the Leader Challenge telah diselesaikan bersama Ayu Anisela, Koordinator Utama Rumah BUMN BRI Makassar. Pertemuan menghubungkan pengalaman beliau memimpin ekosistem pemberdayaan UMKM dengan misi AI Co-Creation Lab serta menjadi sumber pembelajaran tentang konsistensi, KPI, dan delegasi.",
    output: [
      "Profil Ayu Anisela sebagai pemimpin ekosistem UMKM.",
      "Alasan pemilihan tokoh yang relevan dengan misi mini project.",
      "Pembelajaran awal tentang konsistensi, KPI, dan delegasi.",
      "Dokumentasi pertemuan yang bersumber dari evidence aktual.",
    ],
    status: "completed",
    updatedAt: "14 Agustus 2026",
    evidence: [
      {
        label: "Laporan Meet the Leader Challenge Week 3",
        href: "/ai-co-creation-lab-makassar/progress/meet-the-leader",
        type: "website",
      },
      {
        label: "Dokumentasi Meet the Leader",
        href: "https://drive.google.com/drive/folders/1IL5KLcFZ_mzEJtAV5ZWQ-8rIDLfmxj01?usp=sharing",
        type: "drive",
      },
    ],
    leadershipInsight:
      "Kepemimpinan bertumbuh melalui konsistensi, target yang jelas, dan keberanian memberi ruang kepada orang lain untuk mengambil tanggung jawab.",
  },
  {
    slug: "leadership-conversation",
    week: 3,
    title: "Leadership Conversation Report",
    shortDescription:
      "Merangkum percakapan bersama Ayu Anisela menjadi pembelajaran dan rekomendasi yang dapat diterapkan.",
    progressDescription:
      "Leadership Conversation Report telah diselesaikan dengan merangkum profil Ayu Anisela, hasil diskusi tentang kemauan belajar UMKM, relevansi AI Co-Creation Lab, tiga leadership insights, empat rekomendasi project, dan refleksi pribadi Riswan Ramadhan.",
    output: [
      "Profil ringkas Ayu Anisela dan konteks kepemimpinannya.",
      "Hasil diskusi dan relevansi AI Co-Creation Lab bagi UMKM.",
      "Tiga leadership insights: consistency, KPI, dan delegation.",
      "Empat rekomendasi untuk keberlanjutan model project.",
      "Personal reflection Riswan Ramadhan.",
    ],
    status: "completed",
    updatedAt: "14 Agustus 2026",
    evidence: [
      {
        label: "Laporan Leadership Conversation Week 3",
        href: "/ai-co-creation-lab-makassar/progress/leadership-conversation",
        type: "website",
      },
      {
        label: "Dokumentasi Percakapan bersama Ayu Anisela",
        href: "https://drive.google.com/drive/folders/1IL5KLcFZ_mzEJtAV5ZWQ-8rIDLfmxj01?usp=sharing",
        type: "drive",
      },
    ],
    leadershipInsight:
      "Percakapan menjadi bernilai ketika pembelajaran diterjemahkan menjadi keputusan untuk mendokumentasikan, mengukur, dan membuat model yang dapat direplikasi.",
  },
  {
    slug: "implementation",
    week: 3,
    title: "Mini Project Implementation",
    shortDescription:
      "Menyelenggarakan AI Co-Creation Lab Makassar bersama 20 mahasiswa dan lima UMKM.",
    progressDescription:
      "AI Co-Creation Lab Makassar 2026 telah diselesaikan pada 10 Agustus 2026 bersama 20 student co-creators, lima UMKM, dan lima co-creation teams. Rangkaian workshop, hands-on co-creation, prototype development, pitching, serta post-lab improvement menghasilkan lima functional prototypes. Status completed ini merujuk pada output Week 3; adoption dan penggunaan berulang tetap diukur terpisah pada Week 4.",
    output: [
      "Pelaksanaan kegiatan utama pada 10 Agustus 2026.",
      "Lima co-creation teams untuk lima masalah UMKM tervalidasi.",
      "Lima functional prototypes dengan bukti visual aktual.",
      "Dokumentasi workshop, hands-on, pitching, dan kolaborasi.",
      "Kerangka Listen → Define → Build → Test → Improve.",
    ],
    status: "completed",
    updatedAt: "14 Agustus 2026",
    evidence: [
      {
        label: "Laporan Mini Project Implementation Week 3",
        href: "/ai-co-creation-lab-makassar/progress/mini-project-implementation",
        type: "website",
      },
      {
        label: "Dokumentasi AI Co-Creation Lab Makassar",
        href: "https://drive.google.com/drive/folders/1whE01s1U86R6QEfs5sPHpj7wA6SrcJRN?usp=sharing",
        type: "drive",
      },
    ],
    leadershipInsight:
      "Leadership is not doing everything alone; it is creating the conditions for people to build something meaningful together.",
  },
  {
    slug: "network-mobilization",
    week: 3,
    title: "Network Mobilization",
    shortDescription:
      "Menggerakkan mahasiswa, UMKM, relawan, partner, dan stakeholder sebagai satu ekosistem kolaborasi.",
    progressDescription:
      "Network Mobilization telah diselesaikan dengan menghubungkan 20 student co-creators, lima UMKM co-creators, lima volunteers dan support team, serta berbagai partner dan stakeholder. Setiap kontribusi dipetakan menurut fungsi program, ekosistem UMKM, infrastruktur digital, pembelajaran, event support, venue, dan dukungan akademik.",
    output: [
      "Pemetaan peran stakeholder berdasarkan kategori kontribusi.",
      "Lima UMKM co-creators dengan identitas visual aktual.",
      "Dua puluh student co-creators dalam lima team.",
      "Lima volunteers dan event support team.",
      "Narasi kontribusi ekosistem yang menjelaskan peran di balik setiap logo.",
    ],
    status: "completed",
    updatedAt: "14 Agustus 2026",
    evidence: [
      {
        label: "Laporan Network Mobilization Week 3",
        href: "/ai-co-creation-lab-makassar/progress/network-mobilization",
        type: "website",
      },
      {
        label: "Dokumentasi Kolaborasi AI Co-Creation Lab",
        href: "https://drive.google.com/drive/folders/1whE01s1U86R6QEfs5sPHpj7wA6SrcJRN?usp=sharing",
        type: "drive",
      },
    ],
    leadershipInsight:
      "Mobilizing a network was not about collecting logos; setiap orang dan organisasi berkontribusi pada bagian berbeda dari pelaksanaan project.",
  },
  {
    slug: "process-documentation",
    week: 3,
    title: "Process Documentation",
    shortDescription:
      "Menyusun dokumentasi aktual Week 3 menjadi cerita proses yang runtut dan dapat ditinjau kembali.",
    progressDescription:
      "Process Documentation telah diselesaikan menggunakan foto aktual AI Co-Creation Lab Makassar. Evidence dikurasi ke dalam preparation, opening, workshop, student × UMKM co-creation, hands-on build, prototype dan pitching, partners dan stakeholders, volunteers dan event team, group documentation, serta akses menuju folder report lengkap.",
    output: [
      "Sepuluh kategori dokumentasi proses.",
      "Featured documentation dan event story gallery.",
      "Pranala menuju folder Foto Report Event dan Video Report Event di Google Drive.",
    ],
    status: "completed",
    updatedAt: "14 Agustus 2026",
    evidence: [
      {
        label: "Laporan Process Documentation Week 3",
        href: "/ai-co-creation-lab-makassar/progress/process-documentation",
        type: "website",
      },
      {
        label: "Dokumentasi Lengkap AI Co-Creation Lab Makassar",
        href: "https://drive.google.com/drive/folders/1whE01s1U86R6QEfs5sPHpj7wA6SrcJRN?usp=sharing",
        type: "drive",
      },
    ],
    leadershipInsight:
      "Dokumentasi mengubah satu pelaksanaan menjadi pengetahuan yang dapat ditinjau, dipelajari, dan dikembangkan kembali.",
  },
  {
    slug: "monitoring",
    week: 4,
    title: "Project Monitoring Report",
    shortDescription:
      "Merekam capaian implementasi, status lima MVP setelah initial UAT, dan rencana tindak lanjut sampai monitoring adopsi.",
    progressDescription:
      "Project Monitoring Report telah disusun setelah kegiatan utama 10 Agustus 2026. Laporan memuat delapan fase implementasi, status aktual lima functional MVP yang seluruhnya telah melewati initial UAT, capaian terhadap target awal, empat kendala beserta responsnya, lima pembelajaran utama, model supported handover, dan rencana tindak lanjut. Technical refinement sedang berjalan, sedangkan supported handover serta monitoring H+7 dan H+30 belum dilakukan sehingga status adopsi belum diisi.",
    output: [
      "Executive summary pelaksanaan dan kelanjutannya setelah event.",
      "Delapan fase implementasi dengan status Completed, Active, dan Next.",
      "Status aktual lima functional MVP setelah initial UAT.",
      "Tabel target dan capaian dengan baris adopsi yang dipisahkan.",
      "Model supported handover empat peran dan rencana tindak lanjut.",
    ],
    status: "in_progress",
    updatedAt: "18 Agustus 2026",
    evidence: [
      {
        label: "Project Monitoring Report Week 4",
        href: "/ai-co-creation-lab-makassar/progress/project-completion-monitoring",
        type: "website",
      },
    ],
    leadershipInsight:
      "Tanggung jawab project tidak berhenti saat acara selesai. Handover dan tindak lanjut menentukan kegunaan hasil.",
  },
  {
    slug: "impact-measurement",
    week: 4,
    title: "Impact & Sustainability Report",
    shortDescription:
      "Mengukur perubahan mahasiswa, mencatat outcome awal UMKM, dan menyiapkan jalur keberlanjutan serta replikasi.",
    progressDescription:
      "Impact & Sustainability Report telah disusun dari assessment aktual 20 peserta: knowledge check pada skala 0-100 meningkat dari 71.25 menjadi 100, self-reported capability pada skala Likert 1-5 meningkat dari 3.27 menjadi 4.72, dan seluruh peserta mengisi refleksi tertulis. Hasil dilaporkan sebagai pilot-level evidence dengan keterbatasan yang ditulis terbuka. Outcome adopsi jangka panjang UMKM belum ditandai tercapai karena penggunaan berulang dan manfaat operasional masih mengikuti data monitoring.",
    output: [
      "Kerangka pengukuran enam lapis tanpa satu skor akhir.",
      "Hasil knowledge dan self-reported capability beserta interpretasinya.",
      "Hasil full cohort dan konsistensi perubahan peserta dengan disclaimer metodologis.",
      "Analisis tematik refleksi 20 peserta.",
      "Sustainability plan empat lapis dan kerangka Replication Kit v1.0.",
    ],
    status: "in_progress",
    updatedAt: "18 Agustus 2026",
    evidence: [
      {
        label: "Impact & Sustainability Report Week 4",
        href: "/ai-co-creation-lab-makassar/progress/impact-measurement",
        type: "website",
      },
    ],
    leadershipInsight:
      "Fokus kepemimpinan: melaporkan hasil secara jujur, termasuk capaian yang belum terpenuhi dan keterbatasan data.",
  },
  {
    slug: "leadership-reflection",
    week: 4,
    title: "Leadership Reflection",
    shortDescription:
      "Menyiapkan struktur refleksi atas proses membangun, memimpin, mendengar, dan berkolaborasi.",
    progressDescription:
      "Leadership Reflection Essay telah selesai ditulis Riswan Ramadhan dan dipublikasikan dalam sembilan bagian: ide yang membesar ketika melibatkan banyak orang, belajar meminta bantuan dan mendelegasikan, tantangan membangun jejaring yang ternyata lebih sulit daripada persoalan teknis, alasan membentuk mixed team, kelanjutan setelah event, perubahan cara memandang impact, munculnya minat replikasi, hal yang masih perlu dipelajari, dan arah berikutnya.",
    output: [
      "Esai refleksi kepemimpinan sembilan bagian.",
      "Pembelajaran tentang delegasi dan kolaborasi lintas stakeholder.",
      "Hubungan antara keputusan mixed team dan hasil assessment.",
      "Komitmen kelanjutan setelah program berakhir.",
    ],
    status: "completed",
    updatedAt: "18 Agustus 2026",
    evidence: [
      {
        label: "Leadership Reflection Essay Week 4",
        href: "/ai-co-creation-lab-makassar/progress/leadership-reflection",
        type: "website",
      },
    ],
    leadershipInsight:
      "Refleksi yang berguna berangkat dari kejadian konkret dan menghasilkan komitmen perubahan yang spesifik.",
  },
  {
    slug: "final-presentation",
    week: 4,
    title: "Final Presentation",
    shortDescription:
      "Menyiapkan struktur presentasi lengkap perjalanan AI Co-Creation Lab Makassar.",
    progressDescription:
      "Final Presentation berada pada tahap penyusunan deck. Struktur 16 slide telah ditetapkan dan seluruh materi isinya sudah tersedia melalui Project Monitoring Report, Impact & Sustainability Report, dan Leadership Reflection. Readiness checklist memisahkan bagian yang materinya siap dari file deck yang masih dikerjakan; tidak ada file presentasi kosong yang diunggah sebagai pengganti.",
    output: [
      "Struktur 16 slide Final Presentation.",
      "Readiness checklist per bagian materi.",
      "Rujukan sumber data untuk setiap slide impact.",
    ],
    status: "in_progress",
    updatedAt: "18 Agustus 2026",
    evidence: [
      {
        label: "Struktur Final Presentation Week 4",
        href: "/ai-co-creation-lab-makassar/progress/final-presentation",
        type: "website",
      },
    ],
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

export const journeyWeeks: readonly JourneyWeek[] = journeyWeekDefinitions.map(
  (week) => ({
    ...week,
    activities: journeyActivities.filter(
      (activity) => activity.week === week.week,
    ),
  }),
);

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

export function getJourneyActivity(slug: string): JourneyActivity | undefined {
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
