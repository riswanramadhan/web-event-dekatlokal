# Checklist Implementasi: Pre-test & Post-test

Dokumen pendamping `spec.md` (aturan bisnis) dan `ui-flow.md` (layar dan perilaku).
Dokumen ini tidak mengulang keduanya — hanya urutan kerjanya.

**Aturan tiap blok:**
- Satu blok = satu commit = satu sesi kerja.
- Berakhir di layar yang bisa dibuka di browser dan dinilai benar atau salah.
  Tidak ada route sementara, tidak ada tombol yang belum melakukan apa-apa.
- Gerbang tetap sebelum blok dianggap selesai: `npm run lint`, `npm run typecheck`,
  `npm run build`. Ketiganya, dan tidak pernah `next build` telanjang.
- Dev server lewat konfigurasi `dekatlokal-dev` di `.claude/launch.json`, bukan
  `npm run dev` di shell.

**Selama fitur ini dikerjakan, `.env.local` menunjuk proyek Supabase demo.** Tidak ada
satu pun perintah dijalankan terhadap proyek produksi.

---

## Blok 0 — Prasyarat (pekerjaan user, bukan Claude Code)

- [ ] Dump ulang `schema.sql` di root. Migrasi `assessment_*` sudah diterapkan ke demo,
      tapi dump kanonik belum memuatnya sama sekali (`grep -c assessment schema.sql` = 0),
      jadi dump itu sekarang berbeda dari kenyataan.
- [x] Pastikan ada minimal dua baris `registrations` di database demo untuk mengisi
      dropdown peserta di blok 5. **Sudah terpenuhi** — halaman ringkasan blok 1 menghitung
      5 peserta setelah filter status §4.1.

Catatan: nama file migrasi `20260809_assessment_pretest_posttest.sql` tidak memakai
`HHMMSS` seperti konvensi repo dan seperti yang dirujuk `spec.md`. Isinya identik dengan
salinan di folder ini. Dibiarkan apa adanya — migrasi sudah final dan sudah jalan.

---

## Blok 1 — Fondasi dan ringkasan admin (baca saja)

Lapisan data tidak berdiri sendiri sebagai blok: ia tidak berakhir di layar mana pun.
`src/lib/assessment/` tumbuh per blok, tiap blok menambahkan skema Zod dan aksi yang
dipakainya sendiri.

- [x] `src/lib/assessment/phase.ts` — peta slug URL (`pre-test`/`post-test`) ↔ enum
      (`pre_test`/`post_test`) di satu tempat, tidak pernah dirakit ad hoc
- [x] `src/lib/assessment/participants.ts` — filter status §4.1 sebagai satu konstanta,
      dipakai pertama kali oleh hitungan peserta di halaman ringkasan
- [x] `src/lib/assessment/event.ts` — `getManagedEventId()` di atas `getEventSlug()` yang
      sudah ada, menggantikan lookup inline yang selama ini diulang tiap halaman admin
- [x] `src/lib/assessment/schemas.ts` — skema Zod baris `assessment_settings` dan hasil
      `assessment_problems`
- [x] `src/lib/assessment/errors.ts` — penerjemah galat Postgres → kalimat Indonesia.
      Blok 1 memakai kode yang benar-benar bisa muncul di sini (`PGRST202`, `42883`,
      `42P01`); kode freeze dan kedaluwarsa menyusul di blok yang memakainya
- [x] `ensureAssessmentSettings()` — upsert dua baris default (tertutup, 900 detik) saat
      halaman ringkasan dibuka, supaya satu langkah seed yang terlewat tidak mengunci panitia.
      **Wajib `ignoreDuplicates: true`**: upsert biasa akan menulis `is_open: false` ke atas
      tes yang sedang berjalan, jadi sekadar membuka halaman ini akan menutup tes peserta
- [x] `getAssessmentOverview()` — settings kedua phase, jumlah peserta, jumlah selesai per
      phase, hasil `assessment_problems`. Query hitungan yang gagal menolak seluruh halaman,
      bukan menampilkan nol yang terbaca sebagai fakta
- [x] Halaman `/admin/assessment`: dua kartu phase berdampingan, status tepat (belum pernah
      dibuka / sedang terbuka / sudah ditutup — tiga tampilan berbeda), durasi, hitungan
      "N dari M peserta selesai", daftar masalah kesiapan soal
- [x] Status dan durasi tampil **baca-saja**, tanpa saklar dan tanpa input.
      Menyimpang dari rencana yang menyebut "dirender nonaktif": saklar mati permanen tanpa
      penjelasan persis perancah yang dilarang aturan blok. Kontrol sungguhan masuk di blok 2
- [x] Daftarkan nav: satu entri `NAV_ITEMS` di `src/components/admin/admin-shell.tsx`
- [x] Perluas `isActivePath()` agar `/admin/assessment/*` tetap tersorot — tanpa ini sorotan
      sidebar hilang dan judul top bar mobile jatuh ke "Panel Admin"
- [x] `metadata` dengan `robots: { index: false, follow: false }`, `requireAdmin()` dipanggil
      ulang di level halaman, `getSupabaseAdminClient()` null → `EmptyState`
- Baris tab Ringkasan / Soal / Nilai **dipindahkan ke blok 3.** Dua tab lainnya memang belum
  boleh dirender, jadi di blok ini yang tersisa cuma satu tab — dan itu bukan navigasi

**Dinilai di browser — sudah dijalankan:**

- [x] `/admin/assessment` pada database yang belum punya baris `assessment_settings` → dua
      baris terbentuk sendiri, kedua kartu menampilkan "Belum pernah dibuka", durasi
      "15 menit", dan daftar masalah berbunyi "Belum ada soal sama sekali untuk event ini."
      (§8.1 terpenuhi)
- [x] Sidebar menyorot entri baru (`aria-current="page"`), dan judul top bar mobile berbunyi
      "Pre-test & Post-test", bukan "Panel Admin"
- [x] Tidak ada regresi `isActivePath`: `/admin` dan `/admin/registrations/[id]` tetap
      menyorot "Daftar Pendaftar"
- [x] Tanpa galat konsol maupun galat server; tanpa scroll horizontal di 360 px
- [x] `npm run lint`, `npm run typecheck`, `npm run build` — ketiganya lolos

Belum bisa dinilai di blok ini: bahwa `ignoreDuplicates` tidak menimpa tes yang sedang
terbuka. Tidak ada cara membuka tes sampai blok 2 ada, jadi buktinya menyusul di sana.

---

## Blok 2 — Kontrol buka/tutup dan durasi

- [x] Tambahkan sembilan action baru ke union `AdminAuditAction` di `src/lib/admin/auth.ts`
      (`open_assessment`, `close_assessment`, `update_assessment_duration`,
      `create_question`, `update_question`, `delete_question`, `reorder_questions`,
      `finalize_assessment`, `reset_assessment`). CHECK-nya sudah ada di migrasi; tanpa
      langkah ini insert audit gagal
- [x] `setAssessmentOpen()` — tolak membuka bila `assessment_problems` tidak kosong; isi
      `opened_at` **hanya bila masih null**; selalu perbarui `closed_at` saat menutup.
      Stempel `opened_at` dijalankan sebagai statement terpisah berfilter `is null`, supaya
      dua admin yang membuka bersamaan tidak sama-sama menyimpulkan kolomnya masih null
- [x] `setAssessmentDuration()` — rentang 60–14400 detik, divalidasi Zod di server
- [x] Saklar per phase mengikuti pola `src/components/admin/registration-toggle.tsx`
      (`useActionState` + Server Action, `role="switch"`, pending dari `useFormStatus`)
- [x] Input durasi dalam menit, memakai `<input type="number">` native seperti kontrol admin
      lain — bukan `SelectInput` yang khusus form publik
- [x] Saklar nonaktif menampilkan **alasan konkretnya**, bukan sekadar menolak. Hanya arah
      "buka" yang dikunci; tes yang sudah terbuka selalu bisa ditutup
- [x] Pemeriksaan kesiapan diulang di sisi server saat menulis, bukan hanya di UI. Database
      tidak menjaga aturan ini — `start_assessment_attempt()` cuma menolak saat soal kosong
      sama sekali, jadi tidak ada penjaga lain untuk soal tanpa kunci jawaban
- [x] Kedua action memakai kontrak hasil bersama `RegistrationActionState`, dengan daftar
      masalah dibawa di `formErrors`. Tidak ada tipe state baru
- [x] Catat aksi ke `admin_audit_log` lewat `recordAuditEvent()`

**Dinilai di browser — sudah dijalankan:**

- [x] Saklar kedua phase nonaktif selama belum ada soal, dengan alasan konkret di kartunya:
      "Tes belum bisa dibuka. Belum ada soal sama sekali untuk event ini."
- [x] Durasi pre-test diubah 15 → 20 menit, tersimpan, dan **bertahan setelah muat ulang**.
      Post-test tetap 15, jadi update hanya mengenai phase yang diminta
- [x] Penjagaan sisi server terbukti: atribut `disabled` dilepas dari saklar (simulasi
      halaman basi) lalu diklik → Server Action menolak dengan "Tes belum bisa dibuka karena
      soal belum siap." beserta daftar masalahnya, dan phase tetap tertutup
- [x] Tanpa scroll horizontal di 360 px; saklar 44×24 px, tombol Simpan 87×40 px
- [x] `npm run lint`, `npm run typecheck`, `npm run build` — ketiganya lolos

**Belum terverifikasi, butuh akses database:** apakah baris `admin_audit_log` benar-benar
masuk. `recordAuditEvent()` sengaja best-effort dan membuang galatnya, jadi kalau CHECK di
database demo ternyata belum memuat sembilan action baru, insert-nya gagal tanpa jejak di
layar. Query pemeriksanya ada di catatan blok ini.

Perpindahan kartu antar tiga status baru bisa dinilai setelah tes benar-benar bisa dibuka,
yaitu setelah blok 3 menyediakan soal. Dicatat di checklist blok 3.

Catatan: `admin_audit_log` tidak punya kolom untuk phase (hanya `actor_email`, `action`,
`target_email`, `created_at`), jadi log mencatat `open_assessment` tanpa keterangan pre-test
atau post-test. `target_email` sengaja dibiarkan null — mengisinya dengan `"pre_test"` akan
membuat nama kolomnya berbohong. Diterima apa adanya atas keputusan user, tanpa perubahan
skema.

---

## Blok 3 — Kelola soal: soal, opsi, dan kunci jawaban

- [ ] Halaman `/admin/assessment/soal`
- [ ] Baris tab Ringkasan / Soal di dalam halaman (dipindahkan dari blok 1: tab bar berisi
      satu item bukan navigasi). Tab Nilai menyusul di blok 9
- [ ] `listQuestions` — sertakan opsi, urut `order_index`, hasil baca diparse Zod
- [ ] `createQuestion` / `updateQuestion` / `deleteQuestion`
- [ ] `createOption` / `updateOption` / `deleteOption`
- [ ] `setCorrectOption` — satu transaksi: lepas penanda lama, pasang yang baru
- [ ] Daftar soal berbentuk kartu yang bisa dilipat: nomor, potongan pertanyaan, jumlah opsi
- [ ] Kartu terbuka berisi editor pertanyaan dan daftar opsi, kunci dipilih lewat radio di
      sisi kiri tiap opsi
- [ ] Simpan eksplisit per soal, bukan autosave — admin sedang menyusun, bukan mengerjakan tes
- [ ] Galat database diterjemahkan ke kalimat Indonesia, tidak pernah ditampilkan mentah

**Dinilai di browser:** buat 10 soal lengkap dengan opsi dan kunci jawaban, refresh, semuanya
utuh dan urutannya konsisten. `/admin/assessment` ikut berubah karena daftar masalahnya
menyusut — memenuhi §8.2.

Tertunda dari blok 2, dinilai di sini karena baru sekarang tesnya bisa dibuka:

- [ ] Saklar aktif setelah soal siap; membuka lalu menutup memindahkan kartu melewati ketiga
      status (belum pernah dibuka → sedang terbuka → sudah ditutup) dengan tampilan berbeda
- [ ] `opened_at` hanya terisi sekali: buka, tutup, buka lagi — kartu tidak pernah kembali ke
      "Belum pernah dibuka"

---

## Blok 4 — Urutan soal, penanda kesiapan, dan freeze

- [ ] `reorderQuestions` — satu transaksi berisi `UPDATE` biasa. **`ON CONFLICT` tidak bisa
      dipakai**: `assessment_questions_event_order_key` bersifat `deferrable`, dan Postgres
      menolak constraint deferrable sebagai target `ON CONFLICT`
- [ ] Tombol naik dan turun, bukan drag and drop — lebih mudah dibuat benar dan tetap
      berfungsi di layar sentuh
- [ ] Penanda visual pada soal yang belum valid (kurang dari dua opsi, atau kunci bukan tepat
      satu), supaya admin tidak perlu membuka satu per satu untuk mencari yang bermasalah
- [ ] Kesadaran freeze: begitu ada satu attempt untuk event ini, seluruh kontrol edit tampil
      **nonaktif dengan penjelasan** di atas daftar. Aplikasi mendahului trigger; trigger
      adalah jaring pengaman, bukan mekanisme UX
- [ ] Banner freeze di halaman ringkasan, dengan tautan ke aksi reset
- [ ] Server action tetap menolak lebih dulu saat freeze aktif, tidak hanya UI-nya

**Dinilai di browser:** ubah urutan soal, refresh, urutannya bertahan. Hapus kunci satu soal
→ penandanya muncul di daftar, dan saklar buka di ringkasan menyebut soal mana yang
bermasalah (§8.3). Jalur nonaktif-karena-freeze baru bisa dinilai di blok 6 — dicatat di
checklist blok itu, jangan diklaim selesai di sini.

---

## Blok 5 — Peserta: gerbang dan pilih nama

Ekstensi `SelectInput` ikut blok ini, bukan blok tersendiri: sebagai blok terpisah, prop
barunya tidak punya konsumen yang bisa dilihat di layar mana pun. Di sini satu blok menguji
dua sisinya sekaligus — combobox baru hidup di `/tes/pre-test`, dan dua form pendaftaran
produksi wajib berperilaku persis sama.

- [ ] Route `/tes/[phase]`; phase tak dikenal → `notFound()`
- [ ] `getAssessmentState` — kirim `is_open`, `duration_seconds`, `has_ever_opened`.
      `has_ever_opened` diturunkan dari `opened_at is not null`; **jangan kirim timestamp
      mentah**
- [ ] `listParticipants` — filter status §4.1 (`rejected` dan `withdrawn` dikecualikan)
      ditulis sebagai **satu konstanta di satu tempat**, bukan disebar di beberapa query.
      Payload hanya `id`, `full_name`, dan satu label pembeda
- [ ] Gerbang "belum pernah dibuka": tanpa dropdown, tanpa tombol
- [ ] Gerbang "sudah ditutup": **dropdown dan tombol Mulai tetap ditampilkan**, dengan
      bingkai berbeda dan pesan bahwa yang sudah mulai boleh melanjutkan
- [ ] Polling 15 detik di layar gerbang, **berhenti saat `document.hidden`**, jalan sekali
      lagi saat tab kembali terlihat
- [ ] Ekstend `SelectInput` di `src/components/registration/form-components.tsx` lewat prop
      baru yang defaultnya mempertahankan perilaku lama: input teks pemfilter di atas daftar,
      `role="combobox"` dengan `aria-expanded` dan `aria-controls`, pengumuman jumlah hasil
      lewat live region, state "tidak ada nama yang cocok"
- [ ] Typeahead lompat-ke-opsi dimatikan selama mode pencarian aktif — dua mekanisme itu
      tidak boleh berjalan bersamaan
- [ ] Tiap baris: nama sebagai teks utama, institusi atau nama usaha sebagai teks sekunder
      yang lebih kecil dan redup. Tidak punya keduanya → baris sekunder dihilangkan, bukan
      diisi tanda strip
- [ ] State layar pilih nama: memuat (skeleton setinggi combobox), kosong, gagal memuat
      dengan tombol coba lagi, nama terpilih, sedang memulai
- [ ] Nama terakhir disimpan di `localStorage` — kenyamanan saja, bukan penyimpan jawaban
- [ ] Cabang `/tes` di `src/components/layout/chrome-gate.tsx`: tanpa `SiteHeader`,
      `SiteFooter`, dan `MobileBottomNavigation`
- [ ] `src/app/robots.ts` + `src/app/sitemap.ts` + `noindex` diubah **bersamaan** — aturan
      route tak terdaftar di CLAUDE.md

**Dinilai di browser:** tutup pre-test dari admin pada database yang `opened_at`-nya masih
null → `/tes/pre-test` menampilkan "Pre-test belum dibuka" tanpa dropdown. Buka → dropdown
muncul dan memfilter saat diketik. Tutup lagi → dropdown **tetap ada** dengan pesan sudah
ditutup. Lalu buka `/ai-co-creation-lab-makassar/register/student` dan `/umkm`: kedua form
berperilaku persis sama seperti sebelumnya, termasuk navigasi panah, Home/End, Escape,
penempatan menu, dan nilai yang terkirim (§8.14).

---

## Blok 6 — Peserta: layar pengerjaan, autosave, dan selesai pre-test

- [ ] `startOrResumeAttempt` — seluruh pembuatan dan pelanjutan attempt lewat
      `start_assessment_attempt()`. Aplikasi **tidak pernah** `insert` langsung ke
      `assessment_attempts`
- [ ] Routing hasilnya sesuai tabel §4.2: in_progress belum lewat batas → lanjut; sudah lewat
      → submit lalu pindah; submitted → pre-test ke "sudah selesai", post-test ke hasil
- [ ] Render soal mengikuti `question_order` dari attempt; **jangan pernah mengacak ulang di
      client**
- [ ] Payload soal untuk peserta hanya `id`, `prompt`, dan opsi berisi `id` dan `body`.
      Jangan `select('*')` — `is_correct` tidak boleh sampai ke client
- [ ] `saveAnswer` sebagai Server Action yang dipanggil imperatif dari event handler, bukan
      `useActionState`. Tidak memblokir UI, punya retry, kegagalannya tampil sebagai
      indikator kecil — bukan toast
- [ ] Rate limiter **tidak** dipasang di jalur autosave; itu keputusan, bukan kelalaian
- [ ] Header lengket: nama phase, timer mundur dari `expires_at` dikurangi waktu sekarang
      (bukan hitungan lokal sejak halaman dimuat), progress bar, penomoran "Soal 6 dari 15"
- [ ] Kartu opsi selebar penuh, seluruh areanya bisa diketuk, tinggi minimal 44 px, penanda
      huruf A/B/C/D, kondisi terpilih ditandai warna **dan** ikon
- [ ] Navigasi lengket bawah: dua tombol berdampingan; di soal terakhir tombol kanan menjadi
      **Selesaikan**; tombol Sebelumnya nonaktif di soal pertama, bukan disembunyikan
- [ ] Nomor soal aktif di search param (`?soal=3`)
- [ ] Indikator penyimpanan: "Tersimpan" / "Menyimpan…" / "Belum tersimpan"
- [ ] `submitAttempt` idempoten lewat `submit_assessment_attempt()`. **Untuk pre-test, nilai
      dari RPC dibuang di server** dan tidak pernah masuk respons — penyaringan adalah
      tanggung jawab lapisan server, bukan database
- [ ] Layar selesai pre-test: ikon centang, satu kalimat, tombol sekunder ke beranda. **Tidak
      ada angka apa pun.** Layar yang sama dipakai untuk peserta yang sudah pernah selesai,
      dengan judul "Kamu sudah menyelesaikan pre-test"

**Dinilai di browser:**
- [ ] Kerjakan pre-test, tutup browser di soal ke-5, buka di perangkat atau browser lain,
      pilih nama yang sama → lanjut dari jawaban yang sama (§8.4)
- [ ] Setelah submit pre-test, tidak ada angka di layar **maupun di payload jaringan** —
      periksa tab Network (§8.6)
- [ ] Buka `/admin/assessment/soal` → seluruh kontrol edit kini nonaktif karena sudah ada
      attempt (§8.7, jalur yang tertunda dari blok 4)
- [ ] Tutup pre-test dari admin saat satu peserta ada di soal ke-7 → peserta itu membuka
      ulang halaman, masih menemukan dropdown, memilih namanya, dan melanjutkan sampai
      selesai. Peserta lain yang belum pernah memulai ditolak setelah menekan Mulai (§8.5)

---

## Blok 7 — Peserta: pengerasan state pengerjaan

- [ ] Peta soal: grid nomor yang muncul tepat di bawah header dan **mendorong konten ke
      bawah** — bukan overlay, bukan dialog, bukan bottom sheet. `AnimatePresence` +
      `motion.div` dengan animasi tinggi. Tanpa focus trap dan scroll lock; cukup
      `aria-expanded` di pemicu dan `aria-controls` ke grid
- [ ] Nomor terjawab, belum terjawab, dan aktif dibedakan dengan tiga penanda
- [ ] Dialog "Waktu habis" yang tidak bisa ditutup — satu-satunya dialog di alur peserta.
      Ikuti `src/components/layout/mobile-bottom-navigation.tsx` untuk focus trap, Escape,
      scroll lock, dan pengembalian fokus
- [ ] Konfirmasi Selesaikan saat masih ada soal kosong: sebut jumlahnya, dua pilihan
      "Periksa lagi" (utama) dan "Selesaikan sekarang"
- [ ] Konfirmasi Selesaikan saat semua terisi: jawaban tidak bisa diubah setelah dikirim
- [ ] Banner sisa 60 detik, sekali muncul, bisa ditutup
- [ ] Banner gagal menyimpan berulang di bawah header
- [ ] Galat kedaluwarsa dari trigger diperlakukan sama seperti waktu habis: submit lalu
      pindah layar. Jangan tampilkan galat mentah
- [ ] Attempt hilang karena admin melakukan reset → kembali ke pilih nama dengan "Sesi tes
      kamu sudah diatur ulang oleh panitia.", bukan "Attempt tidak ditemukan."
- [ ] Tombol Selesaikan menahan sampai jawaban terakhir tersimpan
- [ ] Navigasi antar soal dengan tombol panah keyboard di desktop
- [ ] Timer berubah warna pada dua menit terakhir dan berkedip halus pada 30 detik terakhir,
      kecuali `useReducedMotion()` aktif — di situ cukup warna saja

**Dinilai di browser:** set durasi 60 detik, mulai mengerjakan, diamkan → banner peringatan,
lalu dialog waktu habis, lalu submit otomatis dan pindah layar (§8.8). Refresh di tengah tes
tidak menambah sisa waktu.

---

## Blok 8 — Peserta: halaman hasil post-test

- [ ] Route `/tes/hasil/[attemptId]`
- [ ] `getResult` — attempt wajib phase `post_test` dan berstatus `submitted`
- [ ] Dua nilai berdampingan dalam persen sebagai elemen utama halaman
- [ ] Indikator perubahan memakai tiga bentuk: warna, ikon panah, dan kata (Naik / Turun /
      Tetap). Jangan mengandalkan warna saja
- [ ] Nada tulisan netral saat nilai turun; tidak ada pujian berlebihan saat naik
- [ ] Tanpa attempt pre-test → nilai post-test saja dengan satu baris penjelas, indikator
      perubahan disembunyikan
- [ ] Persentase dihitung saat tampil, tidak disimpan. **Jaga pembagian terhadap nol**:
      `total_points` bernilai 0 menampilkan tanda strip, bukan `NaN`
- [ ] Tanpa review per soal dan tanpa kunci jawaban — ini syarat validitas, bukan preferensi
      tampilan
- [ ] Tanpa email, WhatsApp, institusi, atau kolom `metadata` apa pun
- [ ] Peserta yang membuka hasil tanpa pernah post-test diarahkan ke halaman pengerjaan
- [ ] Di layar sempit kedua angka bertumpuk dengan panah vertikal di antaranya

**Dinilai di browser:** satu peserta dengan pre-test dan post-test melihat kedua nilai dan
arah perubahan yang benar; satu peserta tanpa pre-test melihat halaman yang tetap masuk akal
(§8.9). Periksa juga di 360 px.

---

## Blok 9 — Admin: tabel nilai dan ekspor CSV

- [ ] Halaman `/admin/assessment/nilai`, tambahkan tabnya ke baris tab
- [ ] `listScores` — join `registrations` dengan filter status §4.1 (konstanta yang sama
      dengan blok 5), plus attempt pre dan post. Hasil baca diparse Zod
- [ ] Kolom: Nama, Jenis, Pre-test, Post-test, Selisih, Status
- [ ] Kolom nilai menampilkan persentase dan nilai mentah: `80% (12/15)`
- [ ] Sel kosong untuk yang belum mengerjakan, penanda untuk attempt yang masih berjalan
- [ ] Ringkasan di atas tabel: rata-rata pre, rata-rata post, rata-rata kenaikan
- [ ] Ekspor CSV lewat Server Action yang mengembalikan string, client membuat `Blob` dan
      mengunduhnya — tidak ada route handler baru di bawah `/admin` yang gerbang
      otorisasinya harus dipasang ulang dengan tangan
- [ ] Kolom CSV sama persis dengan yang tampil. **Tanpa email dan nomor WhatsApp** — file
      nilai beredar lebih bebas daripada panel admin
- [ ] Di bawah 768 px tabel berubah menjadi daftar kartu per peserta. **Pola baru**: repo ini
      belum punya satu pun tabel yang berubah bentuk; dua tabel yang ada memakai
      `overflow-x-auto` dengan `min-w`, dan `ui-flow.md` §4.3 justru menolak idiom itu di sini

**Dinilai di browser:** angka di tabel cocok dengan data mentah di database; CSV terbuka di
spreadsheet; peserta `rejected` dan `withdrawn` tidak muncul di keduanya (§8.10). Di 375 px
tabel sudah berbentuk kartu.

---

## Blok 10 — Admin: finalisasi dan reset berjenjang

Blok ini sengaja di belakang: keduanya hanya bisa dinilai kalau sudah ada attempt sungguhan.

- [ ] `finalizeExpired` memanggil `finalize_expired_attempts()`, dengan konfirmasi biasa yang
      menyebut berapa attempt akan ditutup. Tombolnya disembunyikan bila tidak ada yang
      kedaluwarsa
- [ ] Bagian reset terpisah bergaya destruktif, perilakunya berjenjang:
  - [ ] Ada attempt berjalan → nonaktif, sebut jumlahnya, tolak
  - [ ] Ada attempt terkirim → aktif, tapi dialog **mewajibkan ekspor CSV lebih dulu**
        sebelum tombol hapus bisa ditekan
  - [ ] Tidak ada attempt terkirim → aktif dengan konfirmasi ketik ulang biasa
- [ ] Dialog selalu menyebut angka konkret: berapa attempt akan dihapus dan berapa di
      antaranya sudah terkirim
- [ ] `resetAssessment` memanggil `reset_assessment_attempts()`
- [ ] Ini dialog admin pertama di repo — bangun dari pola focus trap yang sudah ada, jangan
      tambah dependensi
- [ ] Kedua aksi tercatat di `admin_audit_log`

**Dinilai di browser:** tinggalkan satu attempt lewat batas waktu → tombol finalisasi muncul,
menutupnya, dan tabel nilai tidak lagi menyisakan baris menggantung. Reset ditolak saat ada
yang sedang mengerjakan. Setelah ada nilai, tombol hapus terkunci sampai CSV diunduh. Setelah
reset berhasil, kontrol edit soal aktif kembali (§8.11).

---

## Blok 11 — Sapuan responsif dan aksesibilitas

Jalankan daftar periksa `ui-flow.md` §6 di semua layar dan **perbaiki temuannya**, bukan
sekadar mencentang.

- [ ] Seluruh layar peserta dipakai di viewport 360 px tanpa scroll horizontal
- [ ] Header dan navigasi tetap terlihat saat keyboard virtual muncul
- [ ] Setiap kartu opsi bisa diketuk di seluruh areanya, tinggi minimal 44 px
- [ ] Kondisi terpilih dapat dikenali tanpa membedakan warna
- [ ] Fokus keyboard terlihat di semua kontrol, urutan tab masuk akal
- [ ] Soal bisa dinavigasi dengan tombol panah keyboard di desktop
- [ ] `useReducedMotion()` menghilangkan kedipan timer dan transisi antar soal
- [ ] Polling di layar gerbang berhenti saat tab tidak terlihat
- [ ] Timer tidak bertambah setelah refresh
- [ ] Tiga kondisi gerbang tampil berbeda, dan yang "sudah ditutup" tetap menampilkan dropdown
- [ ] Tidak ada lompatan tata letak antara skeleton dan konten
- [ ] Tabel nilai admin berubah menjadi kartu di bawah 768 px
- [ ] Tidak ada nilai apa pun yang muncul di layar maupun payload setelah submit pre-test
- [ ] Kontras teks memenuhi WCAG AA
- [ ] Tidak ada dependensi baru di `package.json`
- [ ] Form registrasi student dan UMKM masih berperilaku persis sama

**Dinilai di browser:** DevTools 360 px pada gerbang, pilih nama, pengerjaan, selesai, hasil,
dan ketiga halaman admin — tidak ada satu pun scroll horizontal (§8.12). Verifikasi ulang
keempat belas kriteria selesai di `spec.md` §8.

---

## Yang sengaja tidak dikerjakan

- **Refactor Zod pada `admin/(dashboard)/page.tsx` dan `registrations/[id]/page.tsx`.**
  Aturan "touch it, fix it" berlaku kalau file itu diedit untuk alasan lain. Fitur ini tidak
  mengeditnya, dan CLAUDE.md melarang memulai refactor terpisah di tengah fitur.
- **Rate limiter, honeypot, dan Turnstile** di jalur assessment — alasannya di `spec.md` §6.
- **Perubahan skema apa pun.** Migrasi sudah final dan sudah diterapkan. Claude Code tidak
  menjalankan migrasi, tidak `supabase db push`, dan tidak menjalankan perintah apa pun yang
  mengubah database.
