/**
 * Single source of truth for the AI Co-Creation Lab Playbook v1.0.
 * Rendered to both Markdown and PDF so the two cannot drift.
 */

const meta = {
  title: "AI Co-Creation Lab Playbook v1.0",
  subtitle: "A Replication Guide for Student × UMKM Digital Co-Creation",
  basedOn: "Pilot 1 — Makassar 2026",
  organizedBy: "DekatLokal",
  tagline: "From AI Users to Local Problem Solvers",
  version: "Version 1.0",
  date: "Agustus 2026",
};

const sections = [
  {
    n: 1,
    title: "Executive Summary",
    blocks: [
      {
        t: "p",
        v: "AI Co-Creation Lab mempertemukan mahasiswa yang sudah akrab dengan AI dengan pelaku UMKM yang memiliki masalah operasional nyata. Model ini dibuat karena dua kelompok tersebut jarang bertemu dalam format yang menghasilkan sesuatu yang benar-benar dipakai. Pelatihan biasanya berhenti pada materi, sementara hackathon biasanya berhenti pada demo.",
      },
      {
        t: "p",
        v: "Pilot pertama dijalankan di Makassar pada 10 Agustus 2026. Dua puluh mahasiswa dari enam kampus dibagi ke dalam lima tim campuran, masing-masing bekerja bersama satu UMKM untuk membangun satu sistem yang menyelesaikan satu alur kerja inti.",
      },
      { t: "h", v: "Apa yang dicapai Pilot 1" },
      {
        t: "table",
        headers: ["Indikator", "Target", "Capaian"],
        rows: [
          ["Mahasiswa", "20", "20"],
          ["UMKM", "5", "5"],
          ["Tim co-creation", "5", "5"],
          ["Functional MVP", "5", "5"],
          ["Initial UAT", "5", "5"],
          ["Serah terima sistem", "5", "5"],
          ["Domain dan hosting", "5", "5 aktif"],
          ["Pre-test, post-test, refleksi", "20", "20"],
        ],
      },
      {
        t: "p",
        v: "Pengukuran pembelajaran menunjukkan knowledge objektif naik dari 71.25 menjadi 100 pada skala 0-100, dan self-reported capability naik dari 3.27 menjadi 4.72 pada skala 1-5. Setelah program, tiga sistem dipegang student technical steward dan dua sistem ditangani langsung tim teknis DekatLokal, dengan kelimanya tetap berada dalam dukungan DekatLokal.",
      },
      { t: "h", v: "Apa yang dapat direplikasi institusi lain" },
      {
        t: "ul",
        v: [
          "Proses memilih UMKM dan memvalidasi masalahnya sebelum hari pelaksanaan.",
          "Struktur tim campuran yang menempatkan kemampuan teknis sebagai penopang bersama.",
          "Kurikulum dan alur fasilitasi dari pemahaman masalah sampai pengujian bersama pengguna.",
          "Instrumen pengukuran yang memisahkan pengetahuan, kapabilitas, pengalaman, dan output nyata.",
          "Model supported handover beserta mekanisme monitoring setelah program.",
        ],
      },
    ],
  },
  {
    n: 2,
    title: "Problem the Model Addresses",
    blocks: [
      { t: "h", v: "Sisi UMKM" },
      {
        t: "ul",
        v: [
          "Masalah operasional yang berulang setiap hari dan memakan waktu.",
          "Alur kerja yang masih manual dan tersebar di banyak catatan.",
          "Akses terbatas ke sistem digital yang benar-benar sesuai kebutuhannya.",
          "Perangkat yang tersedia sering terlalu kompleks atau tidak relevan dengan skala usahanya.",
        ],
      },
      { t: "h", v: "Sisi mahasiswa" },
      {
        t: "ul",
        v: [
          "Sudah akrab menggunakan AI dalam keseharian.",
          "Pemakaian AI sebagian besar untuk tugas kuliah dan produktivitas pribadi.",
          "Pengalaman membangun produk untuk pengguna nyata masih terbatas.",
        ],
      },
      {
        t: "quote",
        v: "UMKM have real problems. Students have the tools. The Lab creates the space to build together.",
      },
    ],
  },
  {
    n: 3,
    title: "Program Principles",
    blocks: [
      {
        t: "p",
        v: "Sembilan prinsip berikut dipakai untuk mengambil keputusan ketika waktu terbatas dan permintaan bertambah di tengah jalan.",
      },
      {
        t: "ol",
        v: [
          "Listen Before Build. Dengarkan pemilik usaha sebelum menentukan solusi.",
          "Real Problems Before Features. Masalah nyata lebih dahulu daripada daftar fitur.",
          "MVP Before Complexity. Selesaikan satu alur inti sebelum menambah cakupan.",
          "Build With Users. Bangun bersama pengguna, bukan untuk pengguna yang dibayangkan.",
          "AI as Accelerator, Not the Goal. AI mempercepat, pemahaman masalah tetap fondasi.",
          "Simple and Useful Over Impressive. Sederhana dan terpakai mengalahkan tampak canggih.",
          "Test Before Handover. Uji bersama pemilik usaha sebelum serah terima.",
          "Support After Handover. Dampingi setelah sistem diserahkan.",
          "Document So It Can Be Repeated. Dokumentasikan agar dapat diulang.",
        ],
      },
    ],
  },
  {
    n: 4,
    title: "Pilot 1 — Makassar 2026",
    blocks: [
      { t: "h", v: "What We Actually Ran" },
      {
        t: "kv",
        v: [
          ["Tanggal", "10 Agustus 2026, satu hari penuh"],
          ["Peserta", "20 mahasiswa dari enam perguruan tinggi"],
          ["Mitra usaha", "5 UMKM dengan masalah operasional tervalidasi"],
          ["Struktur tim", "4 mahasiswa dan 1 UMKM per tim, lima tim campuran"],
          ["Alur belajar", "Responsible AI, pemahaman masalah, MVP, user flow, build berbantuan AI"],
          ["Model kerja", "Hands-on sepanjang hari bersama pemilik usaha di ruangan yang sama"],
          ["Keluaran", "5 functional MVP, masing-masing menuntaskan satu alur kerja inti"],
          ["Pengujian", "Initial UAT oleh kelima pemilik usaha pada hari yang sama"],
          ["Serah terima", "Lima sistem diserahterimakan setelah refinement pasca-event"],
          ["Assessment", "Pre-test, post-test, dan refleksi tertulis dari 20 peserta"],
        ],
      },
      {
        t: "note",
        v: "Pilot 1 dijalankan dalam format satu hari. Format dua hari pada Bab 7 adalah rekomendasi perbaikan yang lahir dari pilot ini, bukan gambaran pelaksanaan Pilot 1.",
      },
    ],
  },
  {
    n: 5,
    title: "Pilot Outcomes",
    blocks: [
      { t: "h", v: "Pembelajaran peserta" },
      {
        t: "table",
        headers: ["Ukuran", "Sebelum", "Sesudah", "Perubahan"],
        rows: [
          ["Core knowledge check, skala 0-100", "71.25", "100", "+28.75"],
          ["Overall capability, skala 1-5", "3.27", "4.72", "+1.45"],
          ["Problem & User Understanding", "3.21", "4.63", "+1.41"],
          ["MVP & Solution Thinking", "3.05", "4.55", "+1.50"],
          ["AI-Assisted Problem Solving", "3.45", "4.78", "+1.33"],
          ["Testing, Collaboration & Confidence", "3.25", "4.81", "+1.56"],
        ],
      },
      {
        t: "p",
        v: "Perubahan terbesar berada pada Testing, Collaboration & Confidence. Ini sejalan dengan desain program karena peserta memang dituntut bekerja bersama pengguna nyata, menegosiasikan lingkup, menguji asumsi, dan mempresentasikan solusi kepada pemiliknya.",
      },
      { t: "h", v: "Keluaran nyata" },
      {
        t: "ul",
        v: [
          "5 functional MVP yang menyelesaikan alur kerja inti masing-masing usaha.",
          "5 initial UAT bersama pemilik usaha.",
          "5 serah terima sistem dengan infrastruktur digital aktif.",
          "Model stewardship dengan tiga student steward dan dua sistem yang ditangani DekatLokal.",
        ],
      },
      {
        t: "note",
        v: "Angka di atas berasal dari full cohort 20 peserta dengan perbandingan berpasangan per orang. Ini adalah bukti tingkat pilot, bukan perbandingan kausal dengan kelompok kontrol.",
      },
    ],
  },
  {
    n: 6,
    title: "Lessons Learned",
    blocks: [
      {
        t: "ol",
        v: [
          "Format satu hari sangat padat. Peserta harus memahami, belajar, mendefinisikan, membangun, menguji, dan mempresentasikan dalam waktu yang sama.",
          "Tim campuran mendorong pembelajaran bersama. Peserta non-teknis tetap berkontribusi pada pemahaman pengguna, penyederhanaan alur, dan komunikasi solusi.",
          "Diskusi langsung dengan UMKM mengubah arah produk. Beberapa tim mengganti asumsi awalnya setelah percakapan pertama.",
          "Disiplin MVP menentukan keberhasilan. Tim yang membatasi lingkup menyelesaikan alur yang berfungsi.",
          "Kesiapan produksi membutuhkan stabilisasi setelah acara. Prototype yang berjalan belum tentu andal untuk dipakai harian.",
          "Serah terima membutuhkan pendampingan. Sistem tanpa penanggung jawab akan berhenti dipakai.",
          "Dampak perlu bukti kuantitatif dan kualitatif. Angka menjelaskan besaran, refleksi menjelaskan maknanya.",
        ],
      },
    ],
  },
  {
    n: 7,
    title: "Recommended Replication Model",
    blocks: [
      {
        t: "p",
        v: "Format dua hari berikut adalah model perbaikan yang direkomendasikan berdasarkan pembelajaran Pilot 1. Pemisahan hari memberi jeda bagi tim untuk mengendapkan pemahaman masalah sebelum mulai membangun.",
      },
      { t: "h", v: "Day 1 — Understand & Design" },
      {
        t: "ol",
        v: [
          "Pembukaan dan konteks program.",
          "Responsible AI.",
          "Perkenalan masalah UMKM.",
          "Problem discovery langsung dengan pemilik usaha.",
          "Pemetaan alur kerja.",
          "Membedakan masalah dan fitur.",
          "Penentuan MVP.",
          "Penyusunan user flow.",
          "Pemeriksaan kelayakan teknis.",
          "Rencana build.",
        ],
      },
      { t: "h", v: "Day 2 — Build, Test & Improve" },
      {
        t: "ol",
        v: [
          "Build sprint.",
          "Pemeriksaan mentor.",
          "Pengujian oleh UMKM.",
          "Pengumpulan umpan balik.",
          "Revisi.",
          "Demo akhir.",
          "Rencana serah terima.",
          "Penetapan steward.",
          "Refleksi peserta.",
        ],
      },
    ],
  },
  {
    n: 8,
    title: "UMKM Selection Criteria",
    blocks: [
      {
        t: "p",
        v: "Pemilihan mitra usaha menentukan hampir seluruh hasil. Kriteria berikut dipakai untuk menyaring calon.",
      },
      {
        t: "check",
        v: [
          "Memiliki satu masalah operasional yang spesifik dan berulang.",
          "Lingkup masalah dapat dikendalikan dalam satu siklus pembangunan.",
          "Pemilik usaha bersedia hadir dan terlibat langsung.",
          "Bersedia menguji sistem dan memberi umpan balik jujur.",
          "Ada kemungkinan nyata solusi akan dipakai setelah program.",
          "Tidak mengharapkan platform berskala perusahaan dalam satu sprint.",
        ],
      },
    ],
  },
  {
    n: 9,
    title: "Problem Validation Guide",
    blocks: [
      {
        t: "p",
        v: "Pertanyaan berikut dipakai pada wawancara sebelum hari pelaksanaan dan dapat diulang oleh tim mahasiswa pada hari pertama.",
      },
      {
        t: "ol",
        v: [
          "Bagaimana proses ini dikerjakan sekarang, langkah demi langkah?",
          "Bagian mana yang paling sering menimbulkan hambatan?",
          "Seberapa sering hambatan itu terjadi?",
          "Apa akibatnya bagi usaha ketika hambatan itu muncul?",
          "Alat apa yang dipakai saat ini?",
          "Siapa saja yang akan memakai sistem ini?",
          "Apa yang wajib ada agar sistem ini berguna?",
          "Apa yang sebenarnya hanya tambahan?",
          "Apa batasan usaha yang harus dihormati?",
          "Data apa yang sudah tersedia hari ini?",
          "Di lingkungan seperti apa sistem ini akan dipakai?",
        ],
      },
    ],
  },
  {
    n: 10,
    title: "Case Brief Template",
    blocks: [
      {
        t: "p",
        v: "Case brief menerjemahkan hasil validasi menjadi konteks kerja tim. Brief sengaja berhenti sebelum menjadi spesifikasi fitur agar tim tetap harus bertanya kepada pemilik usaha.",
      },
      {
        t: "kv",
        v: [
          ["UMKM", "Nama usaha dan bidangnya"],
          ["Konteks usaha", "Skala, pelanggan, dan cara usaha berjalan"],
          ["Apa yang sedang terjadi", "Situasi yang membuat masalah ini muncul"],
          ["Hambatan nyata", "Titik gesekan yang paling terasa"],
          ["Alur kerja saat ini", "Langkah yang dijalankan hari ini"],
          ["Batasan", "Waktu, perangkat, kemampuan, dan kebiasaan kerja"],
          ["Misi tim", "Satu kalimat tentang apa yang perlu diselesaikan"],
          ["Pertanyaan yang masih harus ditanyakan", "Daftar hal yang belum boleh diasumsikan"],
        ],
      },
    ],
  },
  {
    n: 11,
    title: "Student Recruitment",
    blocks: [
      {
        t: "p",
        v: "Seleksi peserta menilai kesiapan berkolaborasi, bukan hanya kemampuan teknis.",
      },
      {
        t: "ul",
        v: [
          "Rasa ingin tahu terhadap masalah orang lain.",
          "Komitmen mengikuti seluruh rangkaian.",
          "Kemampuan bekerja dalam tim yang baru dibentuk.",
          "Kemampuan berkomunikasi dengan pemilik usaha.",
          "Keakraban dengan AI dalam pekerjaan sehari-hari.",
          "Pengalaman teknis untuk sebagian peserta yang akan menjadi anchor.",
        ],
      },
      {
        t: "note",
        v: "Tidak semua peserta perlu bisa menulis code. Yang perlu dijaga adalah setiap tim memiliki cukup kemampuan teknis untuk menilai kelayakan solusinya.",
      },
    ],
  },
  {
    n: 12,
    title: "Mixed-Team Matching Model",
    blocks: [
      { t: "h", v: "4 Students + 1 UMKM = 1 Co-Creation Team" },
      {
        t: "ul",
        v: [
          "Sebarkan peserta dengan pengalaman teknis ke tim yang berbeda.",
          "Campurkan latar belakang studi dalam setiap tim.",
          "Bagikan tanggung jawab memahami pengguna kepada seluruh anggota.",
          "Pastikan setiap tim memiliki penopang kelayakan teknis sejauh komposisi peserta memungkinkan.",
        ],
      },
      { t: "quote", v: "Technical talent acts as an anchor, not a silo." },
      {
        t: "p",
        v: "Pada Pilot 1 sebaran ini tidak sepenuhnya merata. Satu tim berjalan tanpa anggota berlatar teknis kuat, dan sistemnya kemudian ditangani langsung tim teknis penyelenggara setelah program. Pemetaan komposisi tim sebaiknya diperiksa ulang sebelum hari pelaksanaan.",
      },
    ],
  },
  {
    n: 13,
    title: "Team Roles",
    blocks: [
      {
        t: "table",
        headers: ["Peran", "Fokus"],
        rows: [
          ["Technical Core", "Menilai kelayakan teknis dan memimpin pembangunan alur inti"],
          ["Problem and User Lead", "Menjaga percakapan dengan pemilik usaha tetap berjalan"],
          ["Product and UX Lead", "Menjaga alur tetap sederhana dan dapat dipakai"],
          ["Documentation and Pitch Lead", "Merekam keputusan dan menyusun presentasi akhir"],
        ],
      },
      {
        t: "note",
        v: "Peran bersifat lentur. Satu hal yang tidak bisa ditawar adalah setiap anggota ikut dalam percakapan dengan pengguna.",
      },
    ],
  },
  {
    n: 14,
    title: "Curriculum Matrix",
    blocks: [
      {
        t: "table",
        headers: ["Modul", "Tujuan", "Metode", "Keluaran"],
        rows: [
          ["Responsible AI", "Memakai AI secara kritis", "Sesi singkat", "Prinsip pemakaian AI"],
          ["Problem Discovery", "Memahami pengguna nyata", "Diskusi langsung", "Masalah tervalidasi"],
          ["MVP Thinking", "Mengecilkan lingkup", "Lembar kerja", "Definisi MVP"],
          ["User Flow", "Memetakan interaksi", "Workshop", "User flow"],
          ["AI-Assisted Build", "Mempercepat pembangunan", "Build sprint", "Prototype"],
          ["Testing", "Memvalidasi bersama UMKM", "UAT", "Umpan balik"],
          ["Iteration", "Memperbaiki hasil", "Revisi", "MVP yang disempurnakan"],
        ],
      },
    ],
  },
  {
    n: 15,
    title: "Facilitation Guide",
    blocks: [
      {
        t: "p",
        v: "Fasilitator menjaga agar hari pelaksanaan tetap berpusat pada masalah dan tidak berubah menjadi lomba fitur.",
      },
      {
        t: "check",
        v: [
          "Menjaga masalah tetap menjadi pusat pembicaraan.",
          "Mencegah ledakan fitur di tengah sesi.",
          "Memastikan pemilik usaha mendapat ruang bicara.",
          "Memastikan peserta non-teknis ikut mengambil keputusan.",
          "Mengendalikan waktu setiap sesi.",
          "Memunculkan hambatan lebih awal.",
          "Mencegah satu orang mengerjakan seluruh pembangunan sendirian.",
        ],
      },
    ],
  },
  {
    n: 16,
    title: "Technical Starter Kit",
    blocks: [
      { t: "h", v: "Stack yang direkomendasikan" },
      {
        t: "ul",
        v: [
          "Next.js dan React untuk antarmuka.",
          "TypeScript untuk keamanan tipe.",
          "Tailwind untuk penataan cepat.",
          "Supabase untuk basis data dan autentikasi.",
        ],
      },
      {
        t: "note",
        v: "Perangkat low-code atau no-code boleh dipakai bila lebih sesuai dengan kemampuan tim dan kebutuhan usaha. Yang dinilai adalah alur kerja yang berfungsi, bukan pilihan teknologinya.",
      },
      { t: "h", v: "Daftar periksa teknis" },
      {
        t: "check",
        v: [
          "Starter repository siap dipakai sebelum hari pelaksanaan.",
          "Daftar variabel environment lengkap dan terdokumentasi.",
          "Template autentikasi dan basis data tersedia.",
          "Daftar periksa keamanan dasar sudah ditinjau.",
          "Daftar periksa deployment sudah dicoba minimal sekali.",
          "Rencana cadangan bila layanan pihak ketiga gagal.",
        ],
      },
    ],
  },
  {
    n: 17,
    title: "AI Prompt Starter",
    blocks: [
      {
        t: "table",
        headers: ["Kebutuhan", "Pola prompt"],
        rows: [
          ["Memahami kebutuhan", "Ringkas alur kerja berikut menjadi langkah, pelaku, dan data yang berpindah"],
          ["User flow", "Susun alur layar untuk satu tujuan pengguna berikut beserta kondisi gagalnya"],
          ["Kerangka antarmuka", "Buat kerangka halaman untuk alur ini dengan komponen yang paling sederhana"],
          ["Pembuatan kode", "Tulis fungsi untuk kebutuhan ini beserta penanganan kesalahannya"],
          ["Penelusuran bug", "Jelaskan kemungkinan penyebab galat berikut dan cara memastikannya"],
          ["Kasus tepi", "Sebutkan kondisi tidak biasa yang mungkin merusak alur ini"],
          ["Tinjauan kode", "Tinjau kode ini untuk kejelasan, keamanan, dan penanganan kesalahan"],
        ],
      },
      { t: "h", v: "Peringatan" },
      {
        t: "ul",
        v: [
          "Jangan memasukkan data pelanggan atau data usaha yang sensitif ke dalam prompt.",
          "Selalu periksa kode yang dihasilkan AI sebelum dipakai.",
          "Periksa ulang seluruh logika keuangan secara manual.",
          "AI tidak menggantikan validasi kepada pengguna.",
        ],
      },
    ],
  },
  {
    n: 18,
    title: "MVP Worksheet",
    blocks: [
      {
        t: "kv",
        v: [
          ["Pengguna utama", "Siapa yang akan memakai ini setiap hari"],
          ["Masalah utama", "Satu masalah yang diselesaikan"],
          ["Satu hasil inti", "Perubahan yang terjadi bila sistem berhasil"],
          ["Alur wajib", "Langkah yang harus berfungsi penuh"],
          ["Fitur opsional", "Yang boleh ditunda"],
          ["Di luar lingkup", "Yang disepakati tidak dikerjakan"],
          ["Kriteria keberhasilan", "Cara menilai alur ini berhasil"],
        ],
      },
      { t: "quote", v: "Don't build everything. Build one core flow that works." },
    ],
  },
  {
    n: 19,
    title: "User Testing and UAT",
    blocks: [
      {
        t: "p",
        v: "Pengujian dilakukan berbasis tugas. Pemilik usaha diminta menyelesaikan pekerjaan nyata, bukan sekadar melihat demo.",
      },
      {
        t: "table",
        headers: ["Bagian", "Isi"],
        rows: [
          ["Tugas", "Pekerjaan nyata yang harus diselesaikan pengguna"],
          ["Kriteria berhasil", "Kondisi yang menandakan tugas selesai"],
          ["Observasi", "Apa yang terlihat saat pengguna mencoba"],
          ["Tingkat keparahan isu", "Ringan, mengganggu, atau menghambat"],
          ["Umpan balik pengguna", "Kalimat langsung dari pemilik usaha"],
          ["Keputusan penerimaan", "Diterima, diterima dengan catatan, atau perlu perbaikan"],
        ],
      },
    ],
  },
  {
    n: 20,
    title: "Supported Handover",
    blocks: [
      {
        t: "table",
        headers: ["Pihak", "Peran"],
        rows: [
          ["UMKM", "System User and Business Owner"],
          ["Technical Steward", "First-Line Maintenance"],
          ["Penyelenggara", "Program Owner, Technical Mentor, Quality Controller, Escalation Support"],
        ],
      },
      { t: "h", v: "Daftar periksa serah terima" },
      {
        t: "check",
        v: [
          "Akun dan kredensial masuk telah diserahkan.",
          "Domain aktif dan tercatat atas nama yang disepakati.",
          "Panduan penggunaan tersedia.",
          "Panduan admin tersedia.",
          "Batasan sistem yang diketahui telah dijelaskan.",
          "Saluran dukungan disepakati.",
          "Steward ditetapkan.",
          "Jadwal monitoring disepakati.",
        ],
      },
    ],
  },
  {
    n: 21,
    title: "Post-Handover Stabilization",
    blocks: [
      {
        t: "p",
        v: "Prototype yang berfungsi belum sama dengan sistem bisnis yang siap dipakai harian. Siklus berikut memisahkan keduanya secara sengaja.",
      },
      { t: "h", v: "Minggu 1 — Refinement dan stabilisasi" },
      {
        t: "ul",
        v: [
          "Perbaikan bug.",
          "Perbaikan antarmuka.",
          "Penyesuaian responsiveness.",
          "Pemeriksaan akurasi data.",
          "Pemeriksaan izin per peran.",
          "Pemeriksaan logika keuangan dan pelaporan.",
          "Pemeriksaan kesiapan server.",
        ],
      },
      { t: "h", v: "Minggu 2 — Transisi operasional penuh" },
      {
        t: "p",
        v: "Sistem mulai dipakai dalam pekerjaan harian dengan pendampingan yang masih tersedia.",
      },
      { t: "h", v: "Bulanan — Monitoring" },
      {
        t: "p",
        v: "Penggunaan, kegunaan, akurasi, dan kebutuhan perbaikan ditinjau secara rutin.",
      },
      {
        t: "quote",
        v: "For us, refinement is not unfinished work. It is responsible deployment.",
      },
    ],
  },
  {
    n: 22,
    title: "Impact Measurement Framework",
    blocks: [
      {
        t: "table",
        headers: ["Lapis", "Yang diukur"],
        rows: [
          ["Knowledge", "Pengetahuan objektif pada skala 0-100"],
          ["Self-Reported Capability", "Penilaian diri peserta pada skala 1-5"],
          ["Post-Program Experience", "Pengalaman yang belum terjadi sebelum program"],
          ["Qualitative Reflection", "Refleksi tertulis yang dianalisis secara tematik"],
          ["Behavioral Output", "Apa yang benar-benar dibangun bersama pengguna"],
          ["Sustainability Intention", "Kesediaan melanjutkan peran setelah program"],
        ],
      },
      {
        t: "p",
        v: "Keenam lapis tidak digabungkan menjadi satu skor akhir karena skalanya berbeda dan maknanya berbeda. Menggabungkan pengetahuan objektif dengan penilaian diri akan menyembunyikan informasi yang justru paling berguna, yaitu di bagian mana perubahan benar-benar terjadi.",
      },
    ],
  },
  {
    n: 23,
    title: "Improved Measurement Kit",
    blocks: [
      {
        t: "table",
        headers: ["Instrumen", "Jumlah", "Catatan"],
        rows: [
          ["Scenario-based knowledge questions", "8", "Menurunkan efek langit-langit pada instrumen empat soal"],
          ["Capability items", "12", "Tiga item untuk masing-masing dimensi"],
          ["Post-program experience items", "4", "Dipertahankan sebagai indikator pengalaman"],
          ["Technical steward intention", "1", "Konstruk keputusan tunggal"],
          ["Reflection prompts", "3", "Menjaga refleksi tetap dapat dianalisis"],
          ["Prototype rubric", "1", "Menilai hasil build antar tim dengan kriteria sama"],
          ["UMKM UAT form", "1", "Menilai penerimaan pengguna"],
          ["H+7 monitoring form", "1", "Pemeriksaan awal setelah serah terima"],
          ["Monthly adoption monitoring", "1", "Pemantauan berkelanjutan"],
        ],
      },
    ],
  },
  {
    n: 24,
    title: "Sustainability Model",
    blocks: [
      { t: "diagram", v: "sustainability" },
      {
        t: "table",
        headers: ["Lapis", "Isi"],
        rows: [
          ["Technology Sustainability", "Serah terima, infrastruktur aktif, stabilisasi, pemeliharaan"],
          ["Human Sustainability", "Peserta menjadi builder lalu technical steward dengan mentor di belakangnya"],
          ["Impact Sustainability", "Pemeriksaan H+7, improvement log, monitoring bulanan, studi kasus"],
          ["Program Sustainability", "Pembelajaran pilot menjadi playbook dan replication kit"],
        ],
      },
      {
        t: "quote",
        v: "Sustainability is not a promise to keep five websites online. It is a system for keeping the solutions useful, the builders connected, and the model repeatable.",
      },
    ],
  },
  {
    n: 25,
    title: "Partnership Model",
    blocks: [
      {
        t: "table",
        headers: ["Peran mitra", "Kontribusi"],
        rows: [
          ["Program ecosystem", "Dukungan program dan pembinaan kepemimpinan"],
          ["UMKM ecosystem", "Akses dan kepercayaan pelaku usaha"],
          ["Venue dan pemerintah", "Ruang kegiatan dan dukungan kebijakan"],
          ["Digital infrastructure", "Domain, hosting, dan kesiapan teknis"],
          ["Digital learning", "Akses materi belajar bagi peserta"],
          ["Academic partner", "Talenta teknis, mentor, dan pemateri"],
          ["Event support", "Operasional acara"],
          ["Documentation and media", "Perekaman proses dan hasil"],
        ],
      },
      {
        t: "note",
        v: "Replikasi berikutnya tidak harus memakai mitra yang sama. Yang perlu dipenuhi adalah fungsinya, bukan namanya.",
      },
    ],
  },
  {
    n: 26,
    title: "Replication Readiness Checklist",
    blocks: [
      {
        t: "check",
        v: [
          "UMKM sudah dipilih.",
          "Masalah sudah divalidasi dan dituangkan menjadi case brief.",
          "Mahasiswa sudah diseleksi.",
          "Penopang teknis tersedia untuk setiap tim.",
          "Fasilitator sudah disiapkan.",
          "Tempat kegiatan siap.",
          "Koneksi internet diuji sebelum hari pelaksanaan.",
          "Starter kit teknis siap dipakai.",
          "Formulir UAT siap.",
          "Penanggung jawab monitoring ditetapkan.",
          "Infrastruktur domain dan hosting siap.",
          "Dukungan pasca serah terima sudah didefinisikan.",
        ],
      },
    ],
  },
  {
    n: 27,
    title: "Risk Register",
    blocks: [
      {
        t: "table",
        headers: ["Risiko", "Mitigasi", "Rencana cadangan"],
        rows: [
          ["UMKM tidak hadir", "Konfirmasi berulang dan pengingat sehari sebelumnya", "Siapkan satu UMKM cadangan dengan brief siap pakai"],
          ["Peserta membatalkan", "Rekrut melebihi kuota dan konfirmasi ulang", "Susun ulang komposisi tim pada pagi hari"],
          ["Lingkup membesar", "Tegakkan disiplin MVP sejak sesi awal", "Fasilitator memotong lingkup bersama pemilik usaha"],
          ["Internet gagal", "Uji koneksi sebelum hari pelaksanaan", "Sediakan tethering dan mode kerja luring"],
          ["Keterbatasan AI", "Ajarkan pemeriksaan hasil sejak awal", "Kembali ke pendekatan manual untuk bagian kritis"],
          ["Kegagalan API pihak ketiga", "Pilih layanan yang stabil dan sederhana", "Gunakan data contoh untuk menyelesaikan alur"],
          ["Isu privasi", "Larang pemakaian data pelanggan nyata saat membangun", "Gunakan data buatan sampai serah terima"],
          ["Bug pada sistem", "Sediakan waktu pengujian di dalam jadwal", "Masukkan ke siklus stabilisasi pasca serah terima"],
          ["Serah terima tidak tuntas", "Gunakan daftar periksa serah terima", "Jadwalkan sesi susulan"],
          ["Tidak ada steward", "Tawarkan peran sejak awal program", "Penyelenggara mengambil alih pemeliharaan"],
          ["Adopsi rendah", "Bangun satu alur yang benar-benar dipakai", "Tinjau ulang kebutuhan pada monitoring bulanan"],
        ],
      },
    ],
  },
  {
    n: 28,
    title: "Suggested Timeline",
    blocks: [
      {
        t: "table",
        headers: ["Waktu", "Pekerjaan"],
        rows: [
          ["T-4 minggu", "Pemetaan mitra, penjajakan UMKM, penetapan tanggal dan tempat"],
          ["T-3 minggu", "Wawancara validasi masalah dan penyusunan case brief"],
          ["T-2 minggu", "Pembukaan pendaftaran mahasiswa dan seleksi"],
          ["T-1 minggu", "Pembagian tim, penyiapan starter kit, uji tempat dan koneksi"],
          ["Day 1", "Understand and design"],
          ["Day 2", "Build, test, and improve"],
          ["H+7", "Pemeriksaan awal setelah serah terima"],
          ["Bulanan", "Monitoring kesehatan sistem dan adopsi"],
        ],
      },
    ],
  },
  {
    n: 29,
    title: "Documentation Standard",
    blocks: [
      {
        t: "p",
        v: "Dokumentasi dikumpulkan sejak awal agar laporan akhir tidak perlu direkonstruksi dari ingatan.",
      },
      {
        t: "ul",
        v: [
          "Catatan validasi masalah.",
          "Bukti keterlibatan mitra.",
          "Daftar peserta.",
          "Dokumentasi sesi workshop.",
          "Dokumentasi proses co-creation.",
          "Tangkapan layar prototype.",
          "Catatan dan hasil UAT.",
          "Testimoni yang telah disetujui untuk dipakai.",
          "Bukti serah terima.",
          "Catatan monitoring.",
        ],
      },
      {
        t: "note",
        v: "Minta persetujuan tertulis sebelum memakai nama, foto, atau kutipan peserta di materi publik.",
      },
    ],
  },
  {
    n: 30,
    title: "Templates Appendix",
    blocks: [
      {
        t: "p",
        v: "Lima belas template berikut dapat langsung disalin dan dipakai. Setiap template ditulis sebagai daftar isian, bukan dokumen yang perlu ditafsirkan ulang.",
      },
      {
        t: "table",
        headers: ["Kode", "Template", "Isi utama"],
        rows: [
          ["A", "UMKM Selection Form", "Profil usaha, masalah, kesediaan, kelayakan lingkup"],
          ["B", "Problem Validation Questions", "Sebelas pertanyaan pada Bab 9"],
          ["C", "Case Brief", "Delapan bagian pada Bab 10"],
          ["D", "Team Matching Sheet", "Nama, latar belakang, kemampuan teknis, penempatan tim"],
          ["E", "MVP Worksheet", "Tujuh bagian pada Bab 18"],
          ["F", "User Flow Worksheet", "Tujuan pengguna, langkah, kondisi gagal"],
          ["G", "Build Checklist", "Lingkup, data, autentikasi, deployment"],
          ["H", "UAT Form", "Enam bagian pada Bab 19"],
          ["I", "Handover Checklist", "Delapan butir pada Bab 20"],
          ["J", "H+7 Monitoring Form", "Pemakaian pertama, hambatan, perbaikan mendesak"],
          ["K", "Monthly Monitoring Form", "Sepuluh butir pemantauan bulanan"],
          ["L", "Student Pre/Post Template", "Knowledge, capability, pengalaman pasca-program"],
          ["M", "Reflection Template", "Tiga pertanyaan refleksi terbuka"],
          ["N", "Partner Role Mapping", "Fungsi mitra dan kontribusi yang disepakati"],
          ["O", "Replication Checklist", "Dua belas butir pada Bab 26"],
        ],
      },
      { t: "h", v: "Template L — Student Pre/Post" },
      {
        t: "ol",
        v: [
          "Empat sampai delapan soal pengetahuan berbasis skenario, dinilai benar atau salah.",
          "Dua belas pernyataan kapabilitas pada skala 1 sampai 5, identik pada pre dan post.",
          "Empat pernyataan pengalaman pasca-program pada skala 1 sampai 5, hanya pada post.",
          "Satu pertanyaan kesediaan menjadi technical steward.",
        ],
      },
      { t: "h", v: "Template M — Reflection" },
      {
        t: "ol",
        v: [
          "Apa yang berubah dari cara Anda memakai AI setelah mengikuti program ini?",
          "Apa pelajaran paling penting dari bekerja langsung dengan pemilik usaha?",
          "Apa yang akan Anda lakukan berbeda pada project berikutnya?",
        ],
      },
    ],
  },
];

const closing = {
  title: "Closing",
  paragraphs: [
    "Playbook ini ditulis agar apa yang dipelajari pada pilot pertama tidak hilang ketika programnya selesai. Isinya bukan janji hasil, melainkan urutan kerja yang sudah dicoba sekali dan dicatat apa adanya, termasuk bagian yang masih perlu diperbaiki.",
    "Bila Anda menjalankan model ini di kota lain, dengan mahasiswa lain dan UMKM lain, hasil akhirnya akan berbeda. Yang seharusnya tetap sama adalah caranya: dengarkan lebih dahulu, kecilkan lingkup, bangun bersama pengguna, uji sebelum diserahkan, dan dampingi setelahnya.",
  ],
  statement: "From AI Users to Local Problem Solvers",
  cta: "Build With AI. Solve Real Problems.",
};

module.exports = { meta, sections, closing };
