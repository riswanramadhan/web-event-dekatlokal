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

- [x] Halaman `/admin/assessment/soal`
- [x] Baris tab Ringkasan / Soal di dalam halaman (dipindahkan dari blok 1: tab bar berisi
      satu item bukan navigasi). Tab Nilai menyusul di blok 9
- [x] `listQuestions` — sertakan opsi, urut `order_index`, hasil baca diparse Zod
- [x] `createQuestion` / `updateQuestion` / `deleteQuestion`
- [x] `createOption` / `updateOption` / `deleteOption`
- [x] `setCorrectOption` — lepas penanda lama, pasang yang baru
- [x] Daftar soal berbentuk kartu yang bisa dilipat: nomor, potongan pertanyaan, jumlah opsi
- [x] Kartu terbuka berisi editor pertanyaan dan daftar opsi, kunci dipilih lewat tombol
      huruf di sisi kiri tiap opsi (`role="radio"` di dalam `role="radiogroup"`)
- [x] Simpan eksplisit per soal, bukan autosave — admin sedang menyusun, bukan mengerjakan tes
- [x] Galat database diterjemahkan ke kalimat Indonesia, tidak pernah ditampilkan mentah.
      Kode freeze `23001` dan bentrok urutan `23505` ditambahkan ke penerjemah
- [x] Setiap tulisan opsi memeriksa dulu bahwa soal induknya milik event ini.
      `assessment_options` tidak punya `event_id`, jadi tanpa pemeriksaan itu id opsi dari
      event lain bisa dijangkau

**Dinilai di browser — sudah dijalankan:**

- [x] Soal dibuat, dua opsi ditambahkan, kunci jawaban ditetapkan, lalu **dipindah** dari A
      ke B dan kembali ke A. Perpindahan itu membuktikan urutan hapus-dulu-baru-pasang tidak
      melanggar indeks unik parsial `assessment_options_single_correct_idx`
- [x] Semuanya utuh setelah muat ulang penuh: teks soal, kedua opsi, dan kunci di A
- [x] `<details>` tetap terbuka setelah Server Action dan revalidasi — tidak menutup sendiri
      di tengah penyuntingan
- [x] `/admin/assessment` ikut berubah: daftar masalah menjadi "Soal sudah siap. Tes bisa
      dibuka." dan kedua saklar phase aktif
- [x] Sorotan sidebar bertahan di sub-route `/admin/assessment/soal` — cabang `isActivePath`
      dari blok 1 akhirnya terbukti pada sub-route sungguhan
- [x] Tanpa scroll horizontal di 360 px
- [x] `npm run lint`, `npm run typecheck`, `npm run build` — ketiganya lolos

Yang **tidak** saya lakukan: membuat 10 soal. Saya membuat satu soal lengkap dengan dua opsi
dan kunci jawaban, cukup untuk membuktikan seluruh mekanismenya dan membuat daftar masalah
menjadi kosong. Membuat sisanya adalah pekerjaan isi, bukan pekerjaan kode — §8.2 baru
tercentang penuh setelah soal sungguhan dimasukkan.

Tertunda dari blok 2, dinilai di sini karena baru sekarang tesnya bisa dibuka:

- [x] Saklar aktif setelah soal siap; membuka lalu menutup memindahkan kartu melewati ketiga
      status dengan tampilan berbeda: "Belum pernah dibuka" → "Sedang terbuka" (dengan
      "Dibuka 10 Agu 2026, 03.17") → "Sudah ditutup" (dengan "Ditutup …")
- [x] `opened_at` hanya terisi sekali: setelah dibuka lagi, stempelnya **masih waktu
      pembukaan pertama**, dan kartu tidak pernah kembali ke "Belum pernah dibuka"
- [x] Hanya phase yang diminta yang berubah; Post-test tetap "Belum pernah dibuka"

**Konsekuensi yang perlu diingat untuk blok 5:** pre-test sekarang punya `opened_at`, dan
tidak ada jalan mengosongkannya kembali — `reset_assessment_attempts()` hanya menghapus
attempt, bukan settings. Jadi gerbang "belum pernah dibuka" harus diuji di `/tes/post-test`,
yang masih perawan.

---

## Blok 4 — Urutan soal, penanda kesiapan, dan freeze

- [x] Pemindahan soal lewat tombol naik dan turun, bukan drag and drop
- [x] Penanda visual pada soal yang belum valid, langsung di ringkasan kartu, supaya admin
      tidak perlu membuka satu per satu. Teksnya menyebut sebabnya: "Belum siap: perlu
      minimal 2 opsi, belum ada kunci jawaban"
- [x] Kesadaran freeze: `listQuestions` mengembalikan `frozen`, seluruh kontrol edit tampil
      nonaktif, dan banner penjelasan muncul di atas daftar
- [x] Banner freeze juga di halaman ringkasan, menegaskan bahwa buka/tutup tes tetap bisa
      dilakukan — yang terkunci hanya penyuntingan soal
- [x] Deteksi freeze **gagal-tertutup**: kalau jumlah attempt tidak terbaca, jawabannya
      "terkunci". Menebak ke arah permisif berarti merender kontrol aktif yang akan ditolak
      trigger saat diklik — persis yang ingin dicegah aturan freeze
- [x] Server action menolak lebih dulu saat freeze, lewat satu penjaga bersama di lapisan
      lib sehingga berlaku untuk semua aksi tulis
- [x] Tombol naik/turun 44×44 px, memenuhi target sentuh yang berlaku di repo ini

### Penyimpangan dari spec pada `reorderQuestions`

`spec.md` §6 menulis: "satu transaksi berisi `UPDATE` biasa. **`ON CONFLICT` tidak bisa
dipakai** — constraint urutannya `deferrable`, dan Postgres menolak constraint deferrable
sebagai target `ON CONFLICT`."

Kedua syarat itu tidak bisa dipenuhi sekaligus lewat PostgREST: **satu request PostgREST =
satu transaksi**, dan tidak ada cara mengirim dua `UPDATE` berbeda dalam satu request. Yang
tersedia hanya tiga:

1. `upsert` dengan conflict target `id` — satu request, jadi satu transaksi
2. Tiga `UPDATE` berurutan lewat nilai sementara — `UPDATE` biasa, tapi tiga transaksi
3. Fungsi RPC baru — perubahan skema, dan skema sudah dibekukan

Dipilih (1). Alasan spec melarang `ON CONFLICT` adalah karena constraint `deferrable` tidak
bisa jadi target — dan itu tidak berlaku di sini, karena targetnya primary key. Yang
sesungguhnya dijaga spec adalah keatomikan, dan hanya (1) yang memberikannya.

Harganya: `prompt` ikut ditulis ulang dengan nilai yang dibaca sesaat sebelumnya, jadi admin
lain yang menyimpan teks baru pada instan yang sama akan kehilangannya. `points` tidak ikut
dikirim sehingga nilainya tidak tersentuh. Kalau nanti panel ini dipakai lebih dari satu
orang sekaligus, pilihan ini perlu ditinjau ulang.

**Dinilai di browser — sudah dijalankan:**

- [x] Soal kedua dibuat, lalu urutan ditukar naik-turun dan **bertahan setelah muat ulang** —
      membuktikan `upsert` dengan constraint `deferrable` memang commit sebagai satu kesatuan
- [x] Tombol naik nonaktif di soal pertama, tombol turun nonaktif di soal terakhir
- [x] Penanda "Belum siap" muncul pada soal tanpa opsi, lalu **berubah isinya** saat opsi
      ditambahkan ("perlu minimal 2 opsi, belum ada kunci jawaban" → "belum ada kunci
      jawaban"), lalu hilang setelah kunci ditetapkan
- [x] Kasus tepi §4.5 terbukti hidup: saat pre-test sudah terbuka lalu ada soal jadi tidak
      valid, saklar pre-test **tetap bisa ditutup** sementara saklar post-test terkunci dari
      pembukaan
- [x] Tanpa scroll horizontal di 360 px dengan seluruh kartu terbuka
- [x] `npm run lint`, `npm run typecheck`, `npm run build` — ketiganya lolos

Cacat yang ditemukan dan diperbaiki saat verifikasi: pesan hasil pemindahan semula dirender
di dalam `<details>`, sehingga tidak pernah terbaca saat kartunya tertutup — termasuk pesan
penolakan ketika soal terkunci. Sekarang dirender di luar, sebaris dengan tombolnya.

**Belum bisa dinilai di blok ini:** tampilan freeze yang sesungguhnya. Belum ada satu pun
attempt di database, dan tidak ada cara membuatnya sampai peserta bisa memulai tes di blok 6.
Logikanya terpasang dan menolak di dua lapis; buktinya menyusul di checklist blok 6.

---

## Blok 5 — Peserta: gerbang, pilih nama, dan pengerjaan

Batas blok digeser atas keputusan user: gerbang dan pilih nama saja akan berakhir di tombol
"Mulai mengerjakan" yang tidak punya layar tujuan — persis jenis tombol mati yang dilarang
aturan blok. Jadi blok ini berjalan sampai peserta betul-betul bisa mengerjakan dan
menyelesaikan tes. Timer, peta soal, dialog, dan penanganan kedaluwarsa yang rumit tetap di
blok 6-7.

Ekstensi `SelectInput` juga ikut di sini, bukan blok tersendiri: sebagai blok terpisah, prop
barunya tidak punya konsumen yang bisa dilihat di layar mana pun.

- [x] Route `/tes/[phase]`; phase tak dikenal → `notFound()`
- [x] `getAssessmentState` — kirim `is_open`, `duration_seconds`, `has_ever_opened`, dan
      jumlah soal. `has_ever_opened` diturunkan dari `opened_at is not null`; timestamp
      mentah tidak pernah dikirim
- [x] `listParticipants` — filter status §4.1 memakai konstanta yang sama dengan hitungan
      peserta di halaman admin. Query hanya memilih empat kolom, jadi kolom lain tidak bisa
      bocor belakangan tanpa mengubah query
- [x] Gerbang "belum pernah dibuka": tanpa dropdown, tanpa tombol, **dan tanpa daftar nama
      dikirim ke client sama sekali**
- [x] Gerbang "sudah ditutup": dropdown dan tombol Mulai tetap ditampilkan, dengan bingkai
      amber dan pesan bahwa yang sudah mulai boleh melanjutkan
- [x] Polling 15 detik di layar gerbang, berhenti saat `document.hidden`, jalan sekali lagi
      saat tab kembali terlihat
- [x] Ekstend `SelectInput` lewat prop `searchable` yang defaultnya mati: kotak pemfilter di
      atas daftar, live region jumlah hasil, state "tidak ada nama yang cocok", fokus pindah
      ke kotak pemfilter saat menu terbuka
- [x] Typeahead lompat-ke-opsi dimatikan selama mode pencarian aktif
- [x] Baris opsi mendukung teks sekunder lewat `data-description` pada `<option>`; peserta
      tanpa institusi maupun nama usaha tidak mendapat baris kedua, bukan tanda strip
- [x] Nama terakhir diingat lewat `localStorage`, dibaca dengan `useSyncExternalStore`
      supaya render server punya snapshot dan tidak ada efek yang menulis state saat mount
- [x] `startOrResumeAttempt` lewat fungsi database; aplikasi tidak pernah `insert` langsung
      ke `assessment_attempts`
- [x] Payload soal peserta hanya `id`, `prompt`, serta `id` dan `body` opsi. `is_correct`
      tidak ikut karena query-nya memang tidak memilih kolom itu — bukan karena disaring
- [x] Urutan soal mengikuti `question_order` attempt; tidak pernah diacak ulang di client
- [x] `saveAnswer` dipanggil imperatif dari event handler, optimistis, dengan satu retry
      otomatis dan indikator kecil "Tersimpan / Menyimpan… / Belum tersimpan"
- [x] Penolakan karena kedaluwarsa diperlakukan sebagai submit, bukan galat yang ditampilkan
- [x] `submitAttempt` idempoten lewat RPC. **Nilai tidak pernah dikembalikan ke client di
      blok ini**, untuk kedua phase — cara paling pasti menjaga skor pre-test keluar dari
      respons jaringan adalah tidak pernah memasukkannya
- [x] Layar selesai tanpa satu angka pun
- [x] Cabang `/tes` di `chrome-gate.tsx`: tanpa `SiteHeader`, `SiteFooter`, dan
      `MobileBottomNavigation`
- [x] `robots.ts` + `sitemap.ts` + `noindex` diubah bersamaan

**Sudah terverifikasi:**

- [x] `robots.txt` memuat `Disallow: /tes`; `sitemap.xml` nol kemunculan; halaman `noindex`
- [x] `/tes/post-test` yang belum pernah dibuka menampilkan "Post-test belum dibuka" tanpa
      dropdown, dan HTML-nya mengandung **nol** opsi peserta dan nol nama
- [x] `/tes/pre-test` yang terbuka menampilkan "2 soal · 20 menit", combobox, dan tombol
      "Mulai mengerjakan" yang nonaktif sampai nama dipilih
- [x] **Privasi payload (§4.9):** HTML layar pilih nama memuat tepat 5 opsi peserta dan nol
      kemunculan email, `whatsapp`, `metadata`, `submission_code`, `ip_hash`, `is_correct`
- [x] Tanpa header, footer, dan bottom nav di seluruh `/tes/*`
- [x] Regresi struktural form pendaftaran: student merender 2 `SelectInput`, UMKM 3,
      seluruhnya masih trigger combobox + `<select>` native, dan **nol** kotak pencarian —
      prop `searchable` benar-benar default mati
- [x] `npm run lint`, `npm run typecheck`, `npm run build` — ketiganya lolos

**Belum terverifikasi — butuh interaksi di browser sungguhan.** Panel Browser di sesi ini
tidak merender (`document.visibilityState` tetap `hidden`, seluruh `getBoundingClientRect`
nol), dan Next.js menolak Server Action yang disubmit lewat JS karena `origin` bernilai null.
Jadi jalur berikut belum dibuktikan dan **tidak boleh dianggap selesai**:

- [ ] Mengetik di combobox memfilter daftar, live region mengumumkan jumlah hasil
- [ ] Pilih nama → Mulai mengerjakan → layar pengerjaan muncul dengan soal pertama
- [ ] Pilih jawaban → indikator "Tersimpan"; muat ulang halaman → jawaban masih terpilih
- [ ] Maju-mundur antar soal; `?soal=N` berubah dan tombol Kembali browser bekerja wajar
- [ ] Selesaikan → layar selesai, dan **tidak ada angka di layar maupun di payload jaringan**
- [ ] Tutup pre-test dari admin → dropdown tetap ada; peserta yang sudah mulai bisa
      melanjutkan, peserta lain ditolak dengan "Tes sudah ditutup dan kamu belum mulai
      mengerjakan."
- [ ] Regresi perilaku form pendaftaran: navigasi panah, Home/End, Escape, typeahead
      lompat-ke-opsi, penempatan menu atas/bawah, dan nilai yang terkirim (§8.14)

**Catatan:** submit post-test untuk sementara mendarat di layar "jawaban tersimpan" yang sama
seperti pre-test, bukan halaman hasil. Halaman hasil beserta perbandingan nilai adalah blok 8.
Tidak ada jalur rusak, hanya layar yang belum sekaya rancangan akhirnya — dan tidak ada angka
yang bocor ke mana pun.

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
      attempt, banner freeze muncul di halaman soal dan ringkasan (§8.7, jalur yang tertunda
      dari blok 4)
- [ ] Lepas atribut `disabled` dari salah satu kontrol edit lalu klik → Server Action
      menolak dengan pesan freeze, bukan galat mentah dari trigger (lapis kedua blok 4)
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
