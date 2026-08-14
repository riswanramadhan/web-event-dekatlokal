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

**Utang freeze sudah lunas.** Diverifikasi saat pengujian manual blok 5: setelah peserta
pertama memulai tes, `/admin/assessment/soal` menampilkan banner "Soal terkunci…" dan seluruh
kontrol edit nonaktif — kolom teks, simpan, hapus, naik/turun, dan tambah soal (§8.7).

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

**Terverifikasi lewat pengujian manual user di Chrome:**

- [x] Mengetik di combobox memfilter daftar; kotak pencarian muncul dengan fokus langsung di
      dalamnya; ketikan yang tidak cocok menampilkan "Tidak ada nama yang cocok."
- [x] Pilih nama → Mulai mengerjakan → layar pengerjaan dengan "Soal 1 dari 2"
- [x] Pilih jawaban → "Tersimpan"; muat ulang halaman dan pilih nama yang sama → jawaban
      masih terpilih (§8.4 terpenuhi)
- [x] Maju-mundur antar soal; `?soal=N` berubah dan tombol Kembali browser bekerja wajar
- [x] Selesaikan → layar selesai, dan tidak ada angka di layar maupun di payload jaringan
      (§8.6 terpenuhi)
- [x] Tutup pre-test dari admin → dropdown tetap ada dengan bingkai amber; peserta yang belum
      pernah mulai ditolak dengan "Tes sudah ditutup dan kamu belum mulai mengerjakan."
      (§8.5 terpenuhi)
- [x] Regresi form pendaftaran: navigasi panah, Home/End, Escape, dan typeahead
      lompat-ke-opsi masih bekerja; tidak ada kotak pencarian di kedua form (§8.14 terpenuhi)

### Bug yang ditemukan dan diperbaiki saat verifikasi

Langkah "Mulai mengerjakan" memunculkan error boundary. Sebabnya `actions.ts` mengekspor
konstanta `initialStartAttemptState`, sedangkan berkas `"use server"` hanya boleh mengekspor
fungsi async — satu ekspor objek membuat seluruh modul action gagal dievaluasi, jadi setiap
POST ke route itu mati. Konstantanya dipindahkan ke `tes-flow.tsx`.

**`npm run lint`, `npm run typecheck`, dan `npm run build` ketiganya lolos dengan bug ini di
dalamnya.** Aturannya ditegakkan Next.js saat modul dievaluasi, bukan saat kompilasi. Gerbang
statis buta terhadap kelas kesalahan ini, jadi tiap blok yang menambah Server Action perlu
audit ini:

```bash
for f in $(grep -rl '"use server"' src --include=*.ts --include=*.tsx); do echo "=== $f ==="; grep -n "^export \(const\|let\|var\|class\)" "$f"; done
```

Tujuh berkas `"use server"` lain di repo — termasuk seluruh action admin blok 2-4 — bersih.

**Catatan:** submit post-test untuk sementara mendarat di layar "jawaban tersimpan" yang sama
seperti pre-test, bukan halaman hasil. Halaman hasil beserta perbandingan nilai adalah blok 8.
Tidak ada jalur rusak, hanya layar yang belum sekaya rancangan akhirnya — dan tidak ada angka
yang bocor ke mana pun.

---

## Blok 6 — Peserta: timer, submit otomatis, dan peta soal

Cakupan blok ini menyusut: inti layar pengerjaan sudah masuk blok 5 saat batas bloknya
digeser. Yang tersisa di sini adalah lapisan waktu dan navigasi soal.

- [x] Timer mundur di header, dihitung dari `expires_at` dikurangi waktu sekarang — bukan
      hitungan lokal sejak halaman dimuat, supaya refresh tidak menambah waktu
- [x] Timer berubah warna pada dua menit terakhir dan berkedip halus pada 30 detik terakhir,
      kecuali `useReducedMotion()` aktif — di situ cukup warna
- [x] Waktu habis → submit otomatis dan pindah layar. `onExpire` dipanggil dari interval,
      bukan dari badan efek, supaya mencapai nol tidak menjadwalkan setState saat render
- [x] Peta soal: grid nomor yang muncul di bawah header dan **mendorong konten ke bawah**,
      bukan overlay. `AnimatePresence` + animasi tinggi, hormati `useReducedMotion()`.
      Tanpa focus trap dan scroll lock; cukup `aria-expanded` dan `aria-controls`
- [x] Nomor terjawab, belum terjawab, dan aktif dibedakan dengan tiga penanda
- [x] Di atas 1024 px peta soal permanen sebagai kolom kanan, tombol pembukanya disembunyikan
- [x] Audit ekspor `"use server"` dijalankan — bersih

**Dinilai di browser — sudah dijalankan:**

- [x] Durasi post-test diset 1 menit dari admin; attempt baru menampilkan timer mundur yang
      berjalan (0:53 → 0:40 → 0:06) dengan warna peringatan dan ikon jam
- [x] Waktu habis memicu submit otomatis lalu berpindah sendiri ke halaman hasil, tanpa
      sentuhan apa pun (§8.8 terpenuhi)
- [x] Peta soal terbuka lewat tombol "Soal 1 dari 2", `aria-expanded` berubah, grid muncul
      **mendorong konten ke bawah**, dan tombolnya berlabel "Soal 1, belum dijawab" /
      "Soal 2, belum dijawab"

---

## Blok 7 — Peserta: pengerasan state pengerjaan

- [x] Dialog "Waktu habis" yang tidak bisa ditutup — satu-satunya dialog di alur peserta.
      Mengikuti `mobile-bottom-navigation.tsx` untuk focus trap, scroll lock, dan
      pengembalian fokus
- [x] Konfirmasi Selesaikan saat masih ada soal kosong: menyebut jumlahnya, dua pilihan
      "Periksa lagi" (utama) dan "Selesaikan sekarang"
- [x] Konfirmasi Selesaikan saat semua terisi: jawaban tidak bisa diubah setelah dikirim
- [x] Banner sisa 60 detik, bisa ditutup
- [x] Banner gagal menyimpan berulang di bawah header
- [x] Galat kedaluwarsa dari trigger diperlakukan sama seperti waktu habis: submit lalu
      pindah layar, bukan galat mentah
- [x] Attempt hilang karena reset → kembali ke pilih nama dengan "Sesi tes kamu sudah diatur
      ulang oleh panitia." Sebab kegagalan dibedakan di lapisan data
      (`expired` / `lost` / `network`) supaya tiap kasus berakhir di tempat yang benar
- [x] Tombol Selesaikan menahan selama masih ada penulisan berjalan — memakai state, bukan
      ref, supaya tampilan tombolnya ikut berubah
- [x] Navigasi antar soal dengan tombol panah keyboard di desktop
- [x] Timer menghormati `useReducedMotion()`

### Jebakan yang ditemukan dan diperbaiki saat tinjauan ulang

Dialog "Waktu habis" semula `dismissible={false}` **dan tanpa tombol apa pun**. Kalau submit
otomatisnya gagal — koneksi putus tepat saat waktu habis — `submitError` memang terisi, tapi
dirender di `<main>` di belakang overlay sehingga tak terlihat, dan peserta terkurung di
modal tanpa jalan keluar. Sekarang dialog itu menampilkan pesan galatnya sendiri beserta
tombol "Coba kirim lagi", dan `finish()` membersihkan galat lama tiap kali dijalankan.

**Dinilai di browser — sudah dijalankan:**

- [x] Banner "Sisa waktu kurang dari satu menit" muncul dengan tombol tutup
- [x] Dialog konfirmasi tampil berbunyi "Masih ada 2 soal kosong", dengan "Periksa lagi"
      sebagai aksi utama dan "Selesaikan sekarang" sebagai sekunder; menekannya mengirim
      jawaban dan berpindah ke halaman hasil
- [x] Dialog "Waktu habis" terekam lewat MutationObserver: `aria-modal="true"`, **nol
      tombol** saat tidak ada galat, dan `document.body.style.overflow = "hidden"` — scroll
      lock aktif. Setelah submit selesai, halaman berpindah sendiri

Belum diuji langsung: navigasi panah keyboard dan jalur pemulihan setelah reset admin.
Keduanya terpasang; jalur reset baru bisa dipicu setelah tombol reset ada di blok 10.

---

## Blok 8 — Peserta: halaman hasil post-test

- [x] Route `/tes/hasil/[attemptId]`
- [x] `getResult` — attempt wajib phase `post_test` dan berstatus `submitted`; selain itu
      diarahkan ke halaman pengerjaan
- [x] Dua nilai berdampingan dalam persen sebagai elemen utama halaman
- [x] Indikator perubahan memakai tiga bentuk: warna, ikon panah, dan kata
- [x] Nada tulisan netral saat nilai turun
- [x] Tanpa attempt pre-test → nilai post-test saja dengan satu baris penjelas
- [x] Persentase dihitung saat tampil, tidak disimpan; `total_points` nol menampilkan tanda
      strip, bukan `NaN`
- [x] Tanpa review per soal, tanpa kunci jawaban, tanpa kolom kontak apa pun
- [x] Di layar sempit kedua angka bertumpuk dengan panah vertikal di antaranya

**Dinilai di browser — sudah dijalankan:**

- [x] Peserta dengan pre-test dan post-test melihat "Pre-test 0% → Post-test 50%" bertumpuk
      dengan panah vertikal, dan indikator "↑ Naik 50 poin" berwarna hijau (§8.9 terpenuhi)
- [x] Peserta tanpa pre-test melihat "Post-test 0%" dengan penjelas "Kamu tidak mengerjakan
      pre-test, jadi tidak ada perbandingan yang bisa ditampilkan."
- [x] `/tes/hasil/<attempt tak dikenal>` mengarahkan ke `/tes/post-test` (§7)
- [x] `/tes/mid-test` merender "Halaman tidak ditemukan"
- [x] Halaman hasil nol kemunculan alamat email

---

## Blok 9 — Admin: tabel nilai dan ekspor CSV

- [x] Halaman `/admin/assessment/nilai`, tab Nilai ditambahkan ke baris tab
- [x] `listScores` — digerakkan oleh daftar `registrations` dengan filter status §4.1, bukan
      oleh daftar attempt, supaya peserta yang belum mulai tetap muncul sebagai baris kosong.
      Hasil baca diparse Zod
- [x] Kolom: Nama, Jenis, Pre-test, Post-test, Selisih, Status
- [x] Kolom nilai menampilkan persentase dan nilai mentah: `50% (1/2)`
- [x] Sel kosong untuk yang belum mengerjakan, dan penanda "Sedang mengerjakan" untuk attempt
      yang masih berjalan — sel kosong dan nol berarti dua hal yang sangat berbeda
- [x] Ringkasan di atas tabel: rata-rata pre, rata-rata post, rata-rata kenaikan. Rata-rata
      hanya menghitung yang benar-benar terkirim, dan kenaikan hanya dari peserta yang
      menyelesaikan keduanya — merata-ratakan selisih terhadap pre-test yang tidak ada akan
      mengarang angka yang tidak pernah diperoleh siapa pun
- [x] Ekspor CSV lewat Server Action + `Blob`, bukan route handler baru di bawah `/admin`
      yang gerbang otorisasinya harus dipasang ulang dengan tangan
- [x] Tabel dan CSV memakai **formatter yang sama** di `score-format.ts`; dua formatter
      terpisah cepat atau lambat akan berbeda, dan CSV adalah salinan yang keluar dari panel
- [x] `TYPE_LABELS` diekspor dari `components/admin/ui.tsx` agar badge dan CSV tidak
      menyimpang satu sama lain
- [x] Kutip RFC 4180 untuk nama yang mengandung koma atau tanda kutip
- [x] Tanpa email dan nomor WhatsApp — bukan disaring, tapi memang tidak pernah dipilih
      `listScores`
- [x] Di bawah 768 px tabel berubah menjadi daftar kartu per peserta

**Dinilai di browser — sudah dijalankan:**

- [x] Tabel cocok persis dengan data mentah hasil pengujian blok 6-8: Peserta 1
      `0% (0/2)` → `50% (1/2)`, selisih `+50`, status "Selesai"; Peserta 2-4 sel pre-test
      kosong dengan status "Baru post-test"; Peserta 5 kosong seluruhnya, "Belum mulai"
      (§8.10 terpenuhi)
- [x] Ringkasan menghitung benar: rata-rata pre 0%, post 13% (rerata 50/0/0/0), kenaikan
      +50 dari 1 peserta yang menyelesaikan keduanya
- [x] CSV yang diunduh identik dengan tabel, berakhiran CRLF, sel kosong tetap kosong, dan
      **nol kemunculan email maupun nomor WhatsApp**
- [x] Berkas CSV diawali BOM UTF-8 (byte `239,187,191`) supaya spreadsheet tidak menebak
      encoding. Diverifikasi di level byte — `blob.text()` membuang BOM saat membaca, jadi
      pemeriksaan lewat teks menyesatkan
- [x] Di 375 px tabel `display: none` dan daftar kartu `display: block` dengan 5 kartu, tanpa
      scroll horizontal; di 1280 px sebaliknya
- [x] Halaman nol kemunculan alamat email
- [x] `npm run lint`, `npm run typecheck`, `npm run build`, dan audit ekspor `"use server"` —
      semuanya lolos

Catatan interpretasi: `ui-flow.md` §4.3 menyebut kolom "Status" tanpa mendefinisikannya.
Diisi status pengerjaan tes — Belum mulai / Sedang mengerjakan / Baru pre-test / Baru
post-test / Selesai — bukan status pendaftaran, karena tabel ini tentang hasil tes dan
status pendaftaran sudah punya tempatnya sendiri di `/admin`.

---

## Blok 10 — Admin: finalisasi dan reset berjenjang

- [x] Tombol finalisasi attempt kedaluwarsa dengan konfirmasi yang menyebut jumlahnya,
      **disembunyikan** bila tidak ada yang kedaluwarsa
- [x] Bagian reset terpisah bergaya destruktif, menampilkan tiga angka: total attempt,
      sudah terkirim, sedang mengerjakan
- [x] Nonaktif saat ada attempt berjalan, dengan jumlahnya disebut
- [x] Dialog mewajibkan ekspor CSV lebih dulu bila ada nilai; tombol hapus terkunci sampai
      CSV tersimpan
- [x] Konfirmasi ketik ulang kata `HAPUS`, diperiksa **lagi di server** — dialog itu
      keramahan, pemeriksaan server yang jadi kontrol
- [x] Dialog menyebut angka konkret: berapa attempt dihapus dan berapa di antaranya terkirim
- [x] `resetAssessment` mengulang pemeriksaan attempt berjalan di sisi server. Database tidak
      menjaga aturan ini — `reset_assessment_attempts()` akan dengan senang hati menghapus
      attempt yang sedang dikerjakan orang
- [x] Dialog admin pertama di repo: `src/components/admin/confirm-dialog.tsx`, focus trap dan
      scroll lock mengikuti `mobile-bottom-navigation.tsx`, tanpa dependensi baru.
      Konfirmasi yang ada sebelumnya memakai `window.confirm()`, yang tidak bisa memuat form
- [x] Kedua aksi tercatat ke `admin_audit_log`
- [x] Audit ekspor `"use server"` dijalankan — bersih

**Dinilai di browser — sudah dijalankan:**

- [x] Tanpa attempt kedaluwarsa, bagian finalisasi tidak dirender sama sekali
- [x] Satu attempt dibiarkan lewat batas waktu → bagian finalisasi muncul sendiri dengan
      "1 attempt lewat batas waktu tapi tidak pernah dibuka lagi"
- [x] Finalisasi dijalankan → "1 attempt kedaluwarsa ditutup", hitungan berubah dari
      5 terkirim / 1 berjalan menjadi 6 terkirim / 0 berjalan, dan bagiannya hilang sendiri
- [x] Saat ada 1 attempt berjalan: tombol reset **nonaktif** dengan "Masih ada 1 peserta yang
      sedang mengerjakan. Tunggu sampai selesai atau finalisasi dulu." (§8.11)
- [x] Dialog reset menyebut "5 attempt akan dihapus, 5 di antaranya sudah terkirim dan punya
      nilai", `aria-modal="true"`, dan mengunci scroll
- [x] **Gerbangnya berlapis dan urutannya benar:** mengetik `HAPUS` saja tidak cukup —
      tombol hapus tetap terkunci sampai CSV diunduh, baru setelah keduanya terpenuhi aktif
      (§8.11)
- [x] Menutup dialog melepas scroll lock kembali

### Temuan tentang spec: tingkat ketiga tidak bisa dicapai

`ui-flow.md` §4.1 menetapkan tiga perilaku tombol reset. Tingkat ketiga — "Tidak ada attempt
terkirim → Aktif dengan konfirmasi ketik ulang biasa" — **tidak pernah bisa terjadi**:

- Attempt hanya punya dua status, `in_progress` atau `submitted`.
- Kalau ada attempt tapi tidak satu pun terkirim, berarti semuanya berjalan — dan tingkat
  pertama sudah menonaktifkan tombolnya.
- Kalau tidak ada attempt sama sekali, tidak ada yang perlu dihapus.

Jadi setiap kali reset benar-benar mungkin dilakukan, pasti ada nilai, dan gerbang ekspor
selalu berlaku. Implementasinya tetap menangani kasus itu dengan benar (blok ekspor tidak
dirender), tapi jalur itu tidak bisa diuji karena memang tidak bisa dicapai.

**Belum dijalankan:** penghapusan yang sesungguhnya. Menunggu keputusan user — sekali
dijalankan, seluruh nilai peserta di database demo hilang dan tidak bisa dikembalikan.
Yang akan ikut terbukti bila dijalankan: soal kembali bisa diedit setelah freeze terlepas.

---

## Instrumen baru: Likert, cakupan phase, dan refleksi (blok 11–15)

Rancangan instrumen untuk laporan impact tidak seluruhnya berskor: 16 pernyataan skala
Likert, 4 soal pengetahuan, 1 pilihan minat, dan 4 pertanyaan refleksi terbuka. Lima di
antaranya khusus post-test.

`spec.md` §1 menaruh "tipe soal selain pilihan ganda" dan "bank soal berbeda antara pre-test
dan post-test" di luar ruang lingkup. Keduanya kini masuk ruang lingkup — spec ikut direvisi.

Keputusan yang dikonfirmasi user: perluas skema yang ada (bukan sistem paralel); refleksi
jadi form terpisah tanpa timer; halaman hasil peserta hanya menampilkan skor pengetahuan X/4;
sapuan responsif bergeser ke blok 15.

Konsekuensi penting: karena refleksi keluar dari tes berbatas waktu, **`assessment_answers`
tidak disentuh sama sekali** — `option_id` tetap NOT NULL, FK utuh, dan
`assessment_answers_guard` tidak berubah.

---

## Blok 11 — Skema tipe soal dan editor admin

- [x] Migrasi `20260815000000_assessment_question_types.sql`: enum
      `assessment_question_type`, kolom `question_type` / `phase_scope` / `category` di
      `assessment_questions`, kolom `value` di `assessment_options`, tabel
      `assessment_reflections`, dan tiga fungsi ditulis ulang
- [x] Default `scored_choice` + `both` menjaga soal lama tetap sah tanpa disentuh
- [x] `value` disimpan terpisah dari `order_index`: menggeser urutan opsi tidak boleh
      diam-diam mengubah arti jawaban yang sudah tersimpan
- [x] `start_assessment_attempt()` — soal non-berskor tetap urut `order_index`, soal berskor
      ditukar posisi **hanya di antara slot yang ditempati soal berskor**. Pengacakan tetap
      ada di tempat yang butuh anti-contek tanpa merusak alur kategori Likert
- [x] `submit_assessment_attempt()` — penyebut dibatasi dua kali: hanya `scored_choice`,
      **dan** hanya yang ada di `question_order` attempt itu
- [x] Berkas seed `docs/pretest-posttest/seed-instrumen.sql` (21 soal, ~100 opsi), menolak
      jalan kalau bank soal belum kosong
- [x] Migrasi dan seed **sudah dijalankan user**
- [x] `question-type.ts`: daftar tipe, cakupan, label, dan lima opsi Likert baku — dipakai
      bersama modul server dan komponen client
- [x] `schemas.ts` memparse kolom baru; `questions.ts` menulisnya
- [x] Membuat soal Likert otomatis membuat lima opsi bakunya
- [x] Opsi Likert dikunci di server, bukan hanya read-only di UI: `createOption`,
      `updateOption`, `deleteOption`, dan `setCorrectOption` menolak untuk tipe `likert`
- [x] `setCorrectOption` juga menolak `unscored_choice` — memasang kunci di sana lolos
      constraint database tapi membuat tes tidak bisa dibuka dengan alasan membingungkan
- [x] Editor: pemilih tipe dengan penjelasan, pemilih cakupan phase, isian kategori, badge
      tipe dan cakupan di ringkasan kartu, opsi Likert tampil read-only bernomor 1–5
- [x] Penanda "Belum siap" mengikuti aturan per tipe

### Cacat yang ditemukan dan diperbaiki

`getAssessmentState()` menghitung **seluruh** soal event tanpa menyaring cakupan phase, jadi
gerbang pre-test menjanjikan 21 soal padahal peserta hanya akan menemui 16. Hitungannya kini
disaring per phase.

**Dinilai di browser — sudah dijalankan:**

- [x] Gerbang `/tes/pre-test` menampilkan **16 soal**, `/tes/post-test` **21 soal** —
      membuktikan `phase_scope` benar-benar menyaring
- [x] `npm run lint`, `npm run typecheck`, `npm run build`, audit ekspor `"use server"`

- [x] Editor admin: soal 1 menampilkan badge "Skala 1–5" + kategori; soal 13 "Pilihan
      berskor"; soal 17 "Skala 1–5" + **"Khusus post-test"**; soal 21 "Pilihan tanpa skor" +
      "Khusus post-test". **Tidak ada satu pun penanda "Belum siap"** di 21 soal
- [x] Kartu skala menampilkan lima opsi read-only bernomor 1–5, **tanpa tombol tambah opsi
      dan tanpa radio kunci jawaban**
- [x] Halaman ringkasan menyatakan "Soal sudah siap" — `assessment_problems()` yang ditulis
      ulang menerima ke-21 soal dengan aturan per tipe

---

## Aturan istilah — mengikat seluruh UI dan CSV

Dari Panduan Scoring §2 dan §8. Salah label di sini merusak kredibilitas laporan:

- Soal berskor → **"Pemahaman"** / Knowledge Score, skala 0–100. Boleh disebut nilai.
- Likert Q1–Q12 → **"Kapabilitas menurut penilaian sendiri"**, skala **1–5 dua desimal**.
  Tidak pernah dipersenkan, tidak pernah disebut "kemampuan".
- Q17–Q20 → **"Pengalaman setelah program"**, tanpa baseline pre, disajikan rata-rata 1–5
  dan persentase Setuju + Sangat Setuju.
- Q21 → **"Minat jadi technical steward"**, jumlah dan persentase per kategori. Tanpa
  rata-rata.
- **Tidak ada satu pun angka gabungan** dari ketiganya, di layar maupun di CSV.

Behavioral Evidence (§7) di luar lingkup fitur ini — itu capaian acara, bukan data kuesioner.

---

## Blok 12 — Layar pengerjaan: Likert dan cakupan phase

- [x] `attempts.ts`: payload peserta membawa `question_type` dan `value` opsi, tetap tanpa
      `is_correct`
- [x] `work-screen.tsx`: `OptionCard` menerima `marker`, bukan `letter`. Soal skala memakai
      angka nilainya sendiri — angka itulah yang dilaporkan sebagai 1–5, bukan huruf urutan
- [x] Halaman hasil peserta menambahkan satu kalimat: nilai hanya dari soal pengetahuan,
      pernyataan skala tidak dinilai benar atau salah

Label ujung skala **tidak** ditambahkan seperti rencana semula: setiap opsi Likert sudah
memuat labelnya sendiri ("Sangat Tidak Setuju" … "Sangat Setuju"), jadi label ujung hanya
akan mengulang isi kartu di bawahnya.

**Dinilai di browser — sudah dijalankan:**

- [x] Attempt post-test sungguhan berisi **21 soal**; peta soal menampilkan 21 tombol
- [x] Soal 1 adalah pernyataan skala dengan penanda **1, 2, 3, 4, 5** dan label
      "Sangat Tidak Setuju" sampai "Sangat Setuju"
- [x] Soal 13 adalah soal pengetahuan dengan penanda **A–D**, dan **bukan** soal pengetahuan
      pertama menurut urutan seed — membuktikan pengacakan hanya menggeser soal berskor di
      antara slotnya sendiri
- [x] Halaman hasil menampilkan **"Benar 0 dari 4"**, bukan "0 dari 21" — penyebut benar
      dibatasi soal berskor, persis rumus panduan `(benar/4) × 100`
- [x] `npm run lint`, `npm run typecheck`, `npm run build`, audit ekspor `"use server"`

**Belum dibuktikan langsung:** attempt pre-test berisi tepat 16 soal. Panel browser tersendat
saat menekan Mulai. Buktinya sejauh ini tidak langsung: gerbang pre-test menampilkan 16 soal,
dan attempt post-test terbukti 21 — selisih lima, persis jumlah soal `post_test`.

---

## Blok 13 — Form refleksi dan testimonial

- [ ] Route `/tes/refleksi` tanpa timer: pilih nama, empat isian panjang, pilihan izin
      testimoni
- [ ] `robots.ts` + `sitemap.ts` + `noindex` diubah bersamaan
- [ ] Halaman admin membaca jawabannya dengan label izin yang jelas

**Dinilai di browser:** isi form lalu muncul di panel admin; mengisi ulang memperbarui baris
yang sama, bukan menambah.

---

## Blok 14 — Kolom dimensi, tabel nilai ringkas, dan CSV

- [ ] Migrasi `dimension` + backfill sesuai panduan §3 (0–3, 4, 5–7, 8–11). **Berhenti,
      minta user menjalankan.**
- [ ] Isian dimensi di editor soal, muncul hanya untuk tipe Likert
- [ ] `scores.ts`: pisahkan pemahaman dari kapabilitas; rata-rata per dimensi per peserta
- [ ] `nilai/page.tsx`: Nama, Jenis, Pemahaman pre/post/gain, Kapabilitas pre/post/perubahan
      — **tanpa kolom nilai gabungan**
- [ ] CSV: pemahaman + empat dimensi pre/post/perubahan

**Dinilai di browser:** angka cocok dengan data mentah; CSV terbuka di spreadsheet; tidak ada
kolom yang menjumlahkan pemahaman dengan Likert.

---

## Blok 15 — Halaman ringkasan lima layer (§9)

Halaman baru `/admin/assessment/ringkasan`:

- [ ] Pemahaman: rata-rata pre → post dari 100, gain, persentase peserta yang meningkat
- [ ] Kapabilitas: empat dimensi, pre → post dari 5 dua desimal, perubahan
- [ ] Pengalaman setelah program: rata-rata 1–5 dan persentase Setuju + Sangat Setuju
- [ ] Minat steward: jumlah dan persentase per kategori
- [ ] Dampak kualitatif: tautan ke halaman refleksi, tanpa analisis tema otomatis
- [ ] Catatan tetap: ketiga layer tidak dijumlahkan, dipakai berdampingan

**Dinilai di browser:** setiap layer cocok dengan tabel per peserta; tidak ada satu pun angka
gabungan; label memakai istilah panduan.

---

## Blok 16 — Sapuan responsif dan aksesibilitas

Jalankan daftar periksa `ui-flow.md` §6 di semua layar dan **perbaiki temuannya**, bukan
sekadar mencentang. Dijalankan terakhir supaya layar yang berubah bentuk karena instrumen
baru — soal skala dan form refleksi — ikut tersapu.

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
