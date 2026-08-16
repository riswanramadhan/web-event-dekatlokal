# Spesifikasi Fitur: Pre-test & Post-test

Dokumen ini adalah sumber kebenaran untuk aturan bisnis fitur pre-test dan post-test.
Jika ada pertanyaan yang tidak terjawab di sini, **tanyakan dulu — jangan menebak**.

Dokumen pendamping:
- `supabase/migrations/20260809120000_assessment_pretest_posttest.sql` — migrasi skema
- `docs/pretest-posttest/ui-flow.md` — layar, state, dan perilaku antarmuka
- `docs/pretest-posttest/tasks.md` — checklist implementasi

---

## 1. Konteks

Website event yang sudah berjalan mendapat fitur baru: peserta mengerjakan tes pilihan
ganda sebelum dan sesudah acara, lalu melihat perubahan nilainya. Acara berlangsung satu
hari dengan sekitar 20 peserta.

Panel admin sudah ada. Fitur ini menambahkan bagian baru di dalamnya, bukan panel baru.

### Yang termasuk ruang lingkup

- Halaman peserta untuk mengerjakan pre-test dan post-test
- Halaman hasil yang menampilkan perbandingan nilai
- Bagian admin: kelola soal, buka/tutup tes, atur durasi, lihat nilai

### Yang tidak termasuk

- Login peserta atau autentikasi peserta dalam bentuk apa pun
- Tipe soal selain pilihan ganda
- Bank soal berbeda antara pre-test dan post-test
- Sertifikat, pengiriman email, atau notifikasi
- Analitik per soal (tingkat kesukaran, daya beda)

### Cara peserta mencapai halaman tes

Tidak ada tombol atau tautan menuju `/tes/*` dari navigasi mana pun. Peserta mendapat
URL langsung dari panitia saat acara berlangsung.

Karena itu `/tes/*` mengikuti pola route tak terdaftar yang sudah berlaku di repo:
dikecualikan dari `src/app/sitemap.ts`, diblokir di `src/app/robots.ts`, dan diberi
`noindex`. Ketiganya diubah bersamaan — itu aturan yang sudah tertulis di CLAUDE.md.

**URL yang tidak terdaftar bukan pengaman.** Siapa pun yang punya tautannya bisa
membukanya, dan itu memang diasumsikan di §4.9. Jangan pernah memperlakukan
ketidaktahuan URL sebagai lapisan keamanan — pengaman sesungguhnya ada di
`start_assessment_attempt` dan filter status peserta.

---

## 2. Istilah

| Istilah | Arti |
|---|---|
| **Phase** | `pre_test` atau `post_test` |
| **Attempt** | Satu sesi pengerjaan milik satu peserta pada satu phase |
| **Freeze** | Kondisi ketika soal terkunci karena sudah ada attempt |
| **Peserta** | Baris `registrations` yang lolos filter status di §4.1 |

---

## 3. Model data

```
events (existing)
  └── assessment_settings   (event_id, phase) — is_open, duration_seconds
  └── assessment_questions  (event_id)        — bank soal, dipakai kedua phase
        └── assessment_options                — opsi jawaban, satu is_correct
  └── assessment_attempts   (registration_id, phase) UNIQUE
        └── assessment_answers (attempt_id, question_id) PK
registrations (existing)
```

Empat hal yang perlu diingat saat menulis kode:

1. **Bank soal milik event, bukan milik phase.** Pre-test dan post-test membaca tabel
   `assessment_questions` yang sama. Tidak ada kolom `phase` di sana.
2. **`assessment_attempts.question_order` adalah snapshot urutan acak.** Selalu render
   soal mengikuti array ini, jangan pernah mengacak ulang di client.
3. **`expires_at` adalah snapshot batas waktu**, bukan sisa detik. Aplikasi tidak pernah
   menghitungnya sendiri — `start_assessment_attempt()` yang menurunkannya dari
   `duration_seconds`.
4. **Aturan yang tidak boleh dilanggar dijaga database, bukan hanya aplikasi.** Trigger
   dan fungsi menjaga freeze, keabsahan jawaban, penilaian, dan pembuatan attempt.
   Aplikasi harus mendahului mereka demi UX, tapi tidak boleh jadi satu-satunya penjaga.

---

## 4. Aturan bisnis

### 4.1 Identifikasi peserta

- Peserta memilih namanya dari dropdown, diurutkan berdasarkan `full_name` menaik.
- **Dropdown tidak menampilkan seluruh baris `registrations`.** Dua penyaringan berlaku:
  - Baris dengan status `rejected` dan `withdrawn` dikecualikan. Menampilkan pelamar yang
    ditolak di layar yang bisa dibuka siapa saja di ruangan itu membocorkan hasil seleksi,
    dan orangnya memang tidak hadir.
  - **Hanya `registration_type = 'student'`.** Instrumennya ditulis untuk mahasiswa: dua
    belas pernyataan skala berbicara tentang membangun solusi *untuk* UMKM sebagai
    pengguna, bukan tentang menjadi UMKM. Pendaftar UMKM yang ikut mengisi menghasilkan
    angka yang tidak berarti dan mengotori penyebut setiap rata-rata di laporan.
- Kedua syarat itu hidup di satu tempat, `selectEligibleParticipants()` di
  `src/lib/assessment/participants.ts`, bukan disebar di beberapa query. Setiap pembacaan
  daftar peserta lewat helper itu; menyempitkan kolamnya lagi berarti mengubah satu fungsi.
- **Dropdown bukan kontrol.** Server Action bisa dijangkau langsung dengan UUID apa pun,
  dan `start_assessment_attempt()` di database hanya memeriksa bahwa pendaftarannya ada.
  Karena itu `startOrResumeAttempt()` dan `saveReflection()` mengulang pemeriksaan
  kelayakan di server sebelum menulis apa pun.
- Tidak ada verifikasi identitas apa pun. Ini keputusan sadar: jumlah peserta kecil dan
  pengerjaan dilakukan di ruangan yang sama.
- **Konsekuensi yang diterima:** dua orang yang memilih nama sama akan berbagi attempt
  yang sama. Orang kedua melanjutkan atau melihat pekerjaan orang pertama.
- Dropdown menampilkan `full_name`, ditambah `institution_name` atau `business_name`
  sebagai baris kecil di bawahnya bila tersedia. Kolomnya nullable, jadi baris tanpa
  keduanya tetap mungkin; dalam kasus itu tidak ada label pembeda, dan itu diterima.

### 4.1.1 Tanggal tampilan

Setiap tanggal pengisian yang tampil di fitur ini dirender sebagai **10 Agustus 2026**,
tanggal acara, berapa pun tanggal sebenarnya. Jamnya tetap jam asli.

Ini **penggantian tampilan, bukan data**: `assessment_attempts.submitted_at` dan
`assessment_reflections.updated_at` tetap mencatat waktu sebenarnya, dan tidak ada migrasi
yang menyertainya. Konstanta dan fungsinya ada di `src/lib/assessment/report-date.ts`;
mencabutnya berarti mengembalikan `formatFilledAt()` ke `Intl.DateTimeFormat` biasa.

**Dikecualikan:** stempel "Dibuka …" dan "Ditutup …" di halaman Pengaturan. Itu catatan
operasional panitia tentang kapan saklar ditekan, bukan tanggal pengisian peserta.

### 4.2 Attempt dan resume

- Satu attempt per pasangan (peserta, phase), dijamin unique constraint di database.
- Seluruh pembuatan dan pelanjutan attempt lewat satu fungsi:
  `start_assessment_attempt(registration_id, phase)`. Aplikasi tidak pernah melakukan
  `insert` langsung ke `assessment_attempts`.

| Kondisi attempt | Tindakan fungsi |
|---|---|
| Belum ada, `is_open = true` | Buat attempt: acak `question_order`, `expires_at = now() + duration_seconds` |
| Belum ada, `is_open = false` | Tolak dengan galat "Tes sedang ditutup" |
| Sudah ada | Kembalikan apa adanya, **tanpa memeriksa `is_open`** |

Baris terakhir itu yang membuat penutupan tes tidak memutus pengerjaan orang.

Setelah fungsi mengembalikan attempt, aplikasi menentukan layar berikutnya:

| Status attempt | Layar |
|---|---|
| `in_progress`, belum lewat `expires_at` | Lanjut mengerjakan |
| `in_progress`, sudah lewat `expires_at` | Panggil submit, lalu ke layar hasil/selesai |
| `submitted` | Pre-test → "sudah selesai". Post-test → halaman hasil |

- Resume bekerja lintas perangkat dan lintas browser, karena kuncinya `registration_id`,
  bukan sesi browser.
- `localStorage` boleh dipakai untuk mengingat nama yang terakhir dipilih. Kenyamanan
  saja, bukan penyimpan jawaban.
- Baris `assessment_settings` untuk kedua phase **dibuat otomatis dengan nilai default**
  (tertutup, 900 detik) saat halaman ringkasan admin pertama kali dibuka. Seed di file
  migrasi tetap disediakan untuk mempercepat penyiapan, tapi tidak wajib dijalankan.
  Tanpa aturan ini, satu langkah seed yang terlewat saat naik ke produksi membuat peserta
  pertama mendapat galat keras yang tidak bisa diperbaiki panitia dari panel admin.

### 4.3 Penyimpanan jawaban

- Setiap kali peserta memilih opsi, kirim upsert ke `assessment_answers` dengan primary
  key `(attempt_id, question_id)`.
- Penyimpanan optimistis di UI: opsi langsung tampak terpilih, penyimpanan berjalan di
  belakang. Jika gagal, tampilkan indikator dan coba ulang otomatis.
- Mengganti pilihan menimpa baris yang sama, bukan menambah baris baru.
- Peserta tidak bisa mengosongkan jawaban yang sudah dipilih.
- Trigger `assessment_answers_guard` menolak penulisan bila attempt sudah `submitted`,
  bila soalnya di luar `question_order` attempt itu, atau bila `expires_at` sudah lewat
  lebih dari lima detik. Toleransi lima detik itu untuk selisih jam client dan latensi
  jaringan — jangan dihilangkan, dan jangan diperlebar.
- Kalau penulisan ditolak karena kedaluwarsa, aplikasi langsung menjalankan submit dan
  memindahkan peserta ke layar berikutnya. Jangan menampilkan galat mentah.

### 4.4 Timer

- Durasi diatur admin per phase, rentang 60 sampai 14400 detik.
- Hitungan dimulai saat peserta menekan Mulai, bukan saat admin membuka tes. Setiap
  peserta punya batas waktunya sendiri.
- Perubahan durasi oleh admin tidak memengaruhi attempt yang sudah berjalan.
- Ketika waktu habis, client memanggil submit otomatis. Kalau client tidak sempat (tab
  tertutup, perangkat mati), attempt tetap disubmit saat berikutnya diakses, atau oleh
  admin lewat `finalize_expired_attempts()` di akhir acara.
- Jawaban yang belum diisi saat waktu habis dihitung salah.

### 4.5 Buka dan tutup tes

- `is_open` diatur admin per phase, independen antara pre-test dan post-test.
- `is_open = false` **hanya** menghalangi pembuatan attempt baru, dan itu dijaga di dalam
  `start_assessment_attempt()`. Peserta yang sudah memulai tetap boleh menyelesaikan.

**`opened_at` dan `closed_at` bukan sekadar catatan waktu — keduanya menentukan layar
mana yang muncul.**

- `setAssessmentOpen(true)` mengisi `opened_at` **hanya jika masih null**. Kolom itu
  berarti "tes ini pernah dibuka", bukan "terakhir dibuka".
- `setAssessmentOpen(false)` selalu memperbarui `closed_at`.
- Layar gerbang tanpa dropdown muncul **hanya** ketika `is_open = false` dan
  `opened_at is null`. Pada kondisi itu belum mungkin ada peserta yang punya attempt.
- Ketika `is_open = false` tapi `opened_at is not null`, **dropdown nama tetap
  ditampilkan** dengan pesan bahwa tes sudah ditutup dan yang sudah memulai bisa
  melanjutkan. `start_assessment_attempt` yang memutuskan: attempt yang ada dilanjutkan,
  yang belum pernah memulai ditolak.

Tanpa aturan terakhir itu, jaminan "penutupan tidak memutus pengerjaan" batal di lapisan
UI: peserta yang ponselnya tertidur di soal ke-7 akan kembali ke layar "belum dibuka" dan
terkunci di luar, padahal database masih menyimpan attempt-nya.

- Tes tidak boleh dibuka jika `assessment_problems(event_id)` mengembalikan minimal satu
  baris. Tampilkan daftar masalahnya ke admin, jangan hanya menolak.
- Peserta boleh mengerjakan post-test walaupun tidak pernah mengerjakan pre-test.

### 4.6 Freeze soal dan reset

- Trigger database mengunci `assessment_questions` dan `assessment_options` begitu ada
  satu baris di `assessment_attempts` untuk event tersebut. Kunci mencakup insert,
  update, dan delete.
- Aplikasi harus **mendahului** trigger: begitu attempt pertama ada, kontrol edit di
  panel admin ditampilkan nonaktif dengan penjelasan, bukan aktif lalu gagal saat diklik.
  Trigger adalah jaring pengaman, bukan mekanisme UX.
- `reset_assessment_attempts(event_id)` menghapus semua attempt dan jawaban, sehingga
  soal kembali bisa diedit.

**Reset menghancurkan seluruh nilai peserta, dan tidak ada cara mengembalikannya.**
Karena itu:

- Dialog konfirmasi menyebut angka konkret: berapa attempt yang akan dihapus dan berapa
  di antaranya sudah `submitted`.
- Jika ada attempt `submitted`, dialog mewajibkan ekspor CSV lebih dulu sebelum tombol
  hapus bisa ditekan.
- Reset hanya dijalankan saat tidak ada attempt `in_progress`. Kalau ada, tampilkan
  jumlahnya dan tolak — peserta yang sedang mengerjakan akan kehilangan attempt-nya di
  tengah jalan.

### 4.7 Penilaian

- Skor dihitung di database oleh `submit_assessment_attempt(attempt_id)` dalam satu
  transaksi. Jangan menghitung skor di sisi aplikasi.
- Fungsi ini idempoten: memanggilnya pada attempt yang sudah submitted mengembalikan
  nilai tersimpan tanpa mengubah apa pun.
- `score` = total `points` soal yang dijawab benar. `total_points` = total `points`
  seluruh soal event.
- Persentase dihitung saat tampil: `round(score / total_points * 100)`. Jangan disimpan.
  **Jaga pembagian terhadap nol**: kalau `total_points` bernilai 0, tampilkan tanda strip,
  bukan `NaN`. Kondisi itu seharusnya mustahil karena attempt tidak bisa dibuat tanpa
  soal, tapi tampilan tidak boleh bergantung pada asumsi itu.
- `finalize_expired_attempts(event_id)` menutup semua attempt yang kedaluwarsa tapi tidak
  pernah dibuka lagi. Dijalankan admin di akhir acara supaya laporan tidak menyisakan
  baris menggantung.

### 4.8 Tampilan hasil ke peserta

- Setelah submit **pre-test**: hanya konfirmasi bahwa jawaban tersimpan. Tidak ada skor,
  tidak ada jumlah benar, tidak ada indikasi apa pun tentang performa.
- Setelah submit **post-test**: halaman hasil berisi
  - nilai pre-test (jika ada) dan nilai post-test, keduanya dalam persen
  - selisih beserta indikator naik, turun, atau tetap
  - jika tidak ada attempt pre-test, tampilkan nilai post-test saja tanpa indikator
- **Kunci jawaban dan review per soal tidak pernah ditampilkan ke peserta.** Ini bukan
  preferensi tampilan melainkan syarat validitas: jika kunci bocor di pre-test, selisih
  nilai kehilangan maknanya.

### 4.9 Privasi antar peserta

Karena tidak ada autentikasi, **siapa pun bisa melihat nilai peserta lain** dengan
memilih nama orang itu di dropdown post-test. Ini konsekuensi langsung dari keputusan di
§4.1 dan diterima apa adanya untuk acara ini.

Yang tetap harus dilakukan:

- Halaman hasil hanya menampilkan nama, dua nilai, dan selisih. Tidak ada `email`,
  `whatsapp`, `institution_name`, atau isi kolom `metadata` dari `registrations`.
- Payload `listParticipants` hanya membawa `id`, `full_name`, dan satu label pembeda.
  Jangan mengirim seluruh baris registrasi ke client.
- Beri tahu panitia bahwa nilai bersifat semi-publik di dalam ruangan, supaya tidak ada
  yang menganggapnya rahasia.

### 4.10 Panel admin

Kemampuan yang harus tersedia:

- **Kelola soal**: tambah, ubah, hapus soal; tambah, ubah, hapus opsi; tandai satu opsi
  sebagai kunci; ubah urutan soal. Semua nonaktif saat freeze aktif.
- **Kontrol tes**: saklar buka/tutup per phase, dan input durasi.
- **Daftar nilai**: tabel seluruh peserta dengan nama, jenis registrasi, status dan nilai
  pre-test, status dan nilai post-test, selisih.
- **Ekspor CSV** dari tabel nilai. Kolomnya sama dengan yang tampil di layar. Tidak
  menyertakan email dan nomor WhatsApp — file nilai beredar lebih bebas daripada panel
  admin, dan kontak tidak dibutuhkan untuk membaca hasil tes.
- **Finalisasi attempt kedaluwarsa** dengan konfirmasi biasa.
- **Reset data pengerjaan** sesuai syarat di §4.6.

Setiap aksi admin yang mengubah state dicatat ke `admin_audit_log` memakai action yang
sudah terdaftar di constraint: `open_assessment`, `close_assessment`,
`update_assessment_duration`, `create_question`, `update_question`, `delete_question`,
`reorder_questions`, `finalize_assessment`, `reset_assessment`.

---

## 5. Alur peserta

```
Buka /tes/[phase]
   │
   ├── is_open = false DAN opened_at null ──► layar "Belum dibuka", tanpa dropdown
   │
   ├── is_open = false TAPI opened_at ada ──► dropdown tetap tampil + pesan "sudah ditutup"
   │
   ▼
Pilih nama dari dropdown → tekan Mulai
   │
   ├── belum punya attempt & tes tertutup ─► pesan "Tes sedang ditutup"
   ├── attempt submitted ─────────────────► pre: layar "Sudah selesai"
   │                                        post: halaman hasil
   ├── attempt kedaluwarsa ───────────────► submit otomatis → sama seperti di atas
   │
   ▼
Layar pengerjaan (satu soal per halaman)
   │  • pilih opsi → tersimpan otomatis
   │  • bebas maju mundur antar soal
   │  • timer berjalan di header
   │
   ├── waktu habis ───────────────────────► submit otomatis
   │
   ▼
Tekan Selesaikan
   │
   ├── masih ada soal kosong ─────────────► konfirmasi "masih ada N soal kosong"
   │
   ▼
pre-test  → layar konfirmasi tanpa nilai
post-test → halaman hasil dengan perbandingan
```

---

## 6. Kontrak lapisan server

Seluruh akses database lewat service-role client di sisi server. Tidak ada query Supabase
dari komponen client.

**Gate admin mengikuti pola dua lapis yang sudah ada:** `src/middleware.ts` sebagai gate
sesi, `requireAdmin()` di layout dashboard sebagai otoritas. Halaman admin baru masuk ke
`src/app/admin/(dashboard)/` dan mewarisi keduanya. Jangan membuat gate sendiri.

**Bentuk pemanggilan mengikuti konvensi repo:**

- Form — pilih nama, kelola soal, saklar buka/tutup — memakai `useActionState` + Server
  Action, mereuse komponen di `src/components/registration/form-components.tsx`.
- `saveAnswer` **bukan** submit form. Dipanggil imperatif dari event handler; boleh
  Server Action yang dipanggil langsung, boleh route handler dengan `fetch`. Yang wajib:
  tidak memblokir UI, punya retry, dan kegagalannya tampil sebagai indikator kecil, bukan
  toast.
- Setiap read yang mengembalikan objek berstruktur atau array **diparse Zod**. Tidak ada
  inline generic di kode fitur ini, tanpa pengecualian.

### Aksi peserta

| Aksi | Input | Keluaran | Validasi wajib di server |
|---|---|---|---|
| `getAssessmentState` | `phase` | `is_open`, `duration_seconds`, `has_ever_opened` | `has_ever_opened` diturunkan dari `opened_at is not null`; jangan kirim timestamp mentah |
| `listParticipants` | — | `{ id, full_name, label }` | terapkan filter status §4.1; jangan kirim kolom lain |
| `startOrResumeAttempt` | `registration_id`, `phase` | hasil `start_assessment_attempt` + soal terurut + jawaban tersimpan | fungsi DB yang menjaga; aplikasi menerjemahkan galatnya ke pesan Indonesia |
| `saveAnswer` | `attempt_id`, `question_id`, `option_id` | ok | trigger DB yang menjaga; galat kedaluwarsa ditangani dengan submit |
| `submitAttempt` | `attempt_id` | pre-test: `{ ok: true }` · post-test: `score`, `total_points` | Idempoten. **Untuk pre-test, nilai dari RPC dibuang di server dan tidak pernah masuk respons.** RPC selalu mengembalikan keduanya; penyaringan adalah tanggung jawab lapisan server, bukan database |
| `getResult` | `attempt_id` post-test | nilai pre, nilai post, selisih | attempt harus phase `post_test` dan `submitted` |

### Aksi admin

| Aksi | Catatan |
|---|---|
| `ensureAssessmentSettings` | dipanggil saat halaman ringkasan dibuka; upsert dua baris default bila belum ada |
| `listQuestions` | sertakan opsi, urut `order_index` |
| `createQuestion` / `updateQuestion` / `deleteQuestion` | tolak lebih dulu jika freeze aktif |
| `createOption` / `updateOption` / `deleteOption` | idem |
| `setCorrectOption` | satu transaksi: hapus penanda lama, pasang yang baru |
| `reorderQuestions` | satu transaksi berisi `UPDATE` biasa. **`ON CONFLICT` tidak bisa dipakai** — constraint urutannya `deferrable`, dan Postgres menolak constraint deferrable sebagai target `ON CONFLICT` |
| `setAssessmentOpen` | tolak membuka jika `assessment_problems` tidak kosong; isi `opened_at` hanya bila masih null, selalu perbarui `closed_at` saat menutup |
| `setAssessmentDuration` | rentang 60–14400 |
| `listScores` | join `registrations` (dengan filter status §4.1) dan attempt pre serta post |
| `finalizeExpired` | panggil `finalize_expired_attempts` |
| `resetAssessment` | panggil `reset_assessment_attempts`, dengan syarat di §4.6 |

### Rate limiting, honeypot, dan Turnstile: tidak dipakai

Repo memakai ketiganya di jalur registrasi dan community support. Fitur ini tidak
memakainya, dan alasannya bukan kenyamanan melainkan karena **setiap jalur tulis sudah
dibatasi constraint database**:

- `assessment_attempts` dibatasi `unique (registration_id, phase)` atas daftar peserta
  yang tertutup — jumlah barisnya punya plafon tetap, selamanya.
- `assessment_answers` dibatasi primary key `(attempt_id, question_id)` — plafonnya
  jumlah attempt dikali jumlah soal, dan hanya bisa ditulis selama attempt berjalan.

Tidak ada jalur yang bisa menumbuhkan tabel tanpa batas, jadi limiter hanya akan
mematahkan autosave tanpa menambah perlindungan, dan honeypot hanya menambah field yang
tidak menahan apa pun. Kalau suatu saat peserta bisa mendaftar sendiri atau membuat
attempt berulang, alasan ini gugur dan ketiganya harus dipasang.

### Catatan keamanan

- `attempt_id` berfungsi seperti kunci akses selama attempt berjalan. UUID v4 tidak bisa
  ditebak, tapi jangan tampilkan di URL kecuali di halaman hasil setelah submit — di sana
  attempt sudah `submitted` dan trigger menolak penulisan apa pun.
- Jangan mengirim `is_correct` ke client selama attempt berjalan. Payload soal untuk
  peserta hanya `id`, `prompt`, dan opsi berisi `id` dan `body`. Ini mudah bocor kalau
  query memakai `select('*')` — jangan lakukan itu.
- Peserta tidak boleh bisa memanggil aksi admin. Tidak ada pengecualian.

---

## 7. Edge case

| Situasi | Perilaku yang diharapkan |
|---|---|
| Belum ada soal sama sekali | Admin tidak bisa membuka tes; daftar masalah ditampilkan |
| Soal punya 0 atau 2 kunci jawaban | Sama seperti di atas |
| Baris `assessment_settings` belum ada | Dibuat otomatis saat halaman ringkasan admin dibuka |
| Tes ditutup saat peserta di tengah pengerjaan | Peserta tetap bisa kembali lewat dropdown dan menyelesaikan |
| Peserta baru mencoba mulai saat tes tertutup | Ditolak setelah menekan Mulai, dengan pesan Indonesia |
| Peserta menekan Selesaikan dua kali | Idempoten, hasil yang sama |
| Dua tab menekan Mulai bersamaan | Fungsi menangkap unique violation dan mengembalikan attempt yang sama |
| Koneksi putus saat menyimpan jawaban | Indikator "belum tersimpan", retry otomatis, tombol Selesaikan menahan sampai tersimpan |
| Menyimpan jawaban setelah waktu habis | Trigger menolak; aplikasi langsung submit dan pindah layar |
| Admin mencoba edit soal setelah ada attempt | Kontrol nonaktif; jika lolos, trigger menolak dengan SQLSTATE 23001 |
| Attempt kedaluwarsa dan peserta tidak kembali | Ditutup oleh `finalize_expired_attempts` di akhir acara |
| Reset dicoba saat ada attempt berjalan | Ditolak, jumlahnya ditampilkan |
| Reset dijalankan setelah ada nilai | Wajib ekspor CSV lebih dulu; setelah dihapus, nilai tidak bisa dikembalikan |
| Peserta membuka halaman hasil tanpa pernah post-test | Arahkan ke halaman pengerjaan post-test |
| Peserta berstatus `rejected` atau `withdrawn` | Tidak muncul di dropdown maupun tabel nilai |
| Dua orang memilih nama yang sama | Diterima sebagai keterbatasan; tidak ada penanganan |

---

## 8. Kriteria selesai

Fitur dianggap selesai jika seluruh pernyataan berikut benar di database demo:

1. Admin bisa membuka halaman ringkasan pada database yang belum punya baris
   `assessment_settings`, dan barisnya terbentuk sendiri dalam keadaan tertutup.
2. Admin bisa membuat 10 soal lengkap dengan opsi dan kunci jawaban.
3. Admin tidak bisa membuka tes selama masih ada soal tanpa kunci atau kurang dari dua
   opsi, dan melihat alasannya.
4. Peserta bisa mengerjakan pre-test, menutup browser di soal ke-5, membuka kembali di
   perangkat lain, dan melanjutkan dari jawaban yang sama.
5. **Admin menutup pre-test saat seorang peserta ada di soal ke-7; peserta itu membuka
   ulang halaman, masih menemukan dropdown, memilih namanya, dan melanjutkan sampai
   selesai. Peserta lain yang belum pernah memulai ditolak.**
6. Setelah submit pre-test, tidak ada angka nilai yang muncul di layar peserta maupun di
   payload jaringan.
7. Setelah attempt pertama dibuat, seluruh kontrol edit soal di panel admin nonaktif.
8. Timer yang habis menyebabkan submit otomatis; attempt yang ditinggalkan lewat batas
   waktu tertutup oleh finalisasi admin.
9. Halaman hasil post-test menampilkan kedua nilai dan indikator naik atau turun yang
   benar, dan tetap masuk akal untuk peserta tanpa pre-test.
10. Tabel nilai di panel admin cocok dengan data mentah di database, dan CSV-nya bisa
    dibuka di spreadsheet. Peserta `rejected` dan `withdrawn` tidak muncul di keduanya.
11. Reset ditolak saat ada attempt berjalan, dan mewajibkan ekspor saat ada nilai.
12. Seluruh layar peserta nyaman dipakai pada viewport 360 px tanpa scroll horizontal.
13. Tidak ada kolom `is_correct` yang terkirim ke client selama attempt berjalan.
14. Form registrasi student dan UMKM masih berperilaku persis sama setelah `SelectInput`
    dimodifikasi.
