# Urutan Migrasi Produksi: Pre-test & Post-test

Daftar yang dijalankan **satu kali** di SQL Editor Supabase proyek **produksi**, berurutan dari
atas ke bawah. Setiap langkah punya query verifikasi — jalankan verifikasinya sebelum lanjut ke
langkah berikutnya, karena dua di antaranya bisa "berhasil" tanpa melakukan apa pun.

Sumber kanonik tiap langkah adalah berkas di repo, bukan salinan di dokumen ini. Buka berkasnya,
salin seluruh isinya, tempel ke SQL Editor.

> Selama pengembangan, `.env.local` menunjuk proyek **demo**. Dokumen ini satu-satunya tempat
> yang membahas produksi. Claude Code tidak menjalankan satu pun perintah di sini — seluruhnya
> dijalankan manual oleh user.

---

## Sebelum mulai

### 1. Pastikan ada cadangan

Analisis boleh mengatakan aman; cadangan yang menutupi kemungkinan yang tidak terlihat. Pastikan
backup atau point-in-time recovery proyek produksi aktif sebelum langkah 1.

### 2. Periksa tiga prasyarat

Fungsi `set_updated_at()` harus ada — lima trigger baru memakainya:

```sql
select proname from pg_proc where proname = 'set_updated_at';
```

Nilai `action` yang sudah ada di audit log harus muat di CHECK yang baru. Langkah 1 menghapus lalu
memasang ulang constraint itu, dan pemasangannya memvalidasi seluruh baris lama:

```sql
select action, count(*) from public.admin_audit_log group by action order by 2 desc;
```

Semua nilai yang muncul harus ada di daftar ini: `login`, `login_failed`, `create_admin`,
`delete_admin`, `open_registration`, `close_registration`. Kalau ada nilai lain, langkah 1 akan
gagal dan rollback — hubungi dulu sebelum melanjutkan.

Slug event harus cocok. Langkah 3 memakai slug ini dan **tidak melaporkan error kalau tidak
ketemu**:

```sql
select id, slug, name from public.events;
```

Kalau slug bukan `ai-co-creation-lab-makassar`, ganti di langkah 3 dan langkah 4.

### 3. Pasang batas waktu kunci

Jalankan ini lebih dulu di sesi SQL Editor yang sama, sekali saja:

```sql
set lock_timeout = '3s';
```

Langkah 1 mengambil ACCESS EXCLUSIVE lock pada `registrations` — tabel yang sudah berisi data
pendaftar sungguhan. Untuk tabel sebesar ini prosesnya milidetik, tapi kalau ada transaksi lain
yang sedang memegang tabel itu, `ALTER` ikut mengantre dan seluruh query berikutnya menumpuk di
belakangnya. Dengan batas waktu, ia gagal cepat dan rollback; tinggal ulangi saat lebih sepi.

Idealnya seluruh rangkaian ini dijalankan saat pendaftaran sedang sepi.

---

## Langkah 1 — Skema dasar

**Berkas:** `supabase/migrations/20260809_assessment_pretest_posttest.sql`

Membuat lima tabel `assessment_*`, dua enum, trigger freeze, guard jawaban, dan lima fungsi RPC.
Menyentuh dua tabel yang sudah ada: menambah `unique (id, event_id)` pada `registrations` (tidak
mungkin gagal — `id` sudah primary key), dan mengganti CHECK `admin_audit_log.action` dengan
daftar yang memuat sembilan action baru.

Seluruhnya dalam satu `begin`/`commit`: kalau ada yang gagal, tidak ada yang tersisa setengah jadi.

**Verifikasi — harus mengembalikan 5 baris, semuanya `rowsecurity = true`:**

```sql
select tablename, rowsecurity from pg_tables
where schemaname = 'public' and tablename like 'assessment_%'
order by tablename;
```

**Verifikasi — harus mengembalikan 5 baris:**

```sql
select proname from pg_proc
where proname in ('assessment_problems', 'start_assessment_attempt',
                  'submit_assessment_attempt', 'finalize_expired_attempts',
                  'reset_assessment_attempts')
order by proname;
```

---

## Langkah 2 — Tipe soal, cakupan phase, dan tabel refleksi

**Berkas:** `supabase/migrations/20260815000000_assessment_question_types.sql`

Menambah kolom `question_type`, `phase_scope`, `category` pada soal dan `value` pada opsi; membuat
tabel `assessment_reflections`; menulis ulang `assessment_problems()`, `start_assessment_attempt()`,
dan `submit_assessment_attempt()`.

Dijalankan **sebelum** kedua seed karena seed instrumen mengisi kolom-kolom yang baru dibuat di
sini. Juga dalam satu `begin`/`commit`.

> **Jangan jalankan versi yang lebih awal.** Kalau kamu menelusuri history SQL Editor, ada draf
> sebelumnya dengan judul yang sama persis yang memakai `order by random()` penuh di
> `start_assessment_attempt()`. Versi itu mengacak pernyataan skala lepas dari kategorinya dan
> merusak instrumen tanpa pesan error apa pun. Berkas di repo adalah versi final: ia hanya menukar
> posisi soal berskor di antara slot yang memang ditempati soal berskor.

**Verifikasi — harus mengembalikan 4 baris:**

```sql
select column_name from information_schema.columns
where table_name = 'assessment_questions'
  and column_name in ('question_type', 'phase_scope', 'category')
union all
select column_name from information_schema.columns
where table_name = 'assessment_options' and column_name = 'value';
```

**Verifikasi — fungsi sudah versi baru (harus mengembalikan satu baris berisi `scored_shuffled`):**

```sql
select proname from pg_proc
where proname = 'start_assessment_attempt'
  and prosrc like '%scored_shuffled%';
```

---

## Langkah 3 — Pengaturan tes untuk event

**Berkas:** tidak ada; salin blok di bawah. Sumbernya adalah blok komentar di ekor migrasi
langkah 1.

```sql
insert into public.assessment_settings (event_id, phase, duration_seconds)
select e.id, p.phase, 900
from public.events e
cross join (values ('pre_test'::public.assessment_phase),
                   ('post_test'::public.assessment_phase)) as p(phase)
where e.slug = 'ai-co-creation-lab-makassar'
on conflict (event_id, phase) do nothing;
```

Membuat dua baris pengaturan, keduanya **tertutup** (`is_open = false`) dengan durasi 900 detik.
Panitia membukanya nanti dari `/admin/assessment`, bukan dari SQL.

> **Langkah ini bisa gagal tanpa bersuara.** Kalau slug tidak cocok, `where`-nya tidak menemukan
> apa-apa, nol baris masuk, dan tidak ada error sama sekali. Gejalanya baru muncul jauh kemudian
> sebagai "Pengaturan tes belum dibuat untuk event ini" saat peserta pertama menekan Mulai.
> Verifikasinya wajib.

**Verifikasi — harus tepat 2 baris, keduanya `is_open = false`:**

```sql
select phase, is_open, duration_seconds, opened_at
from public.assessment_settings order by phase;
```

---

## Langkah 4 — Seed instrumen 21 soal

**Berkas:** `docs/pretest-posttest/seed-instrumen.sql`

Ini **isi**, bukan skema: 21 soal dan sekitar 100 opsi. Memasukkannya satu per satu lewat panel
admin tidak masuk akal; panel tetap dipakai untuk koreksi setelahnya.

Skripnya `raise exception` kalau event tidak ketemu **dan** kalau bank soal belum kosong, jadi ia
tidak akan pernah menimpa soal yang sudah ada. Berupa satu blok `do $$ ... end $$`, artinya satu
statement — gagal berarti rollback seluruhnya.

Susunan `order_index` yang dihasilkan, dan langkah 5 bergantung padanya:

| `order_index` | Isi |
|---|---|
| 0–11 | 12 pernyataan skala, kedua phase |
| 12–15 | 4 soal pengetahuan berskor, kedua phase |
| 16–19 | 4 pernyataan skala khusus post-test |
| 20 | 1 pilihan tanpa skor, khusus post-test |

**Verifikasi — harus 12 / 4 / 4 / 1:**

```sql
select question_type, phase_scope, count(*)
from public.assessment_questions
group by question_type, phase_scope
order by question_type, phase_scope;
```

**Verifikasi — nol baris berarti soal siap dan tes bisa dibuka:**

```sql
select * from public.assessment_problems(
  (select id from public.events where slug = 'ai-co-creation-lab-makassar')
);
```

---

## Langkah 5 — Kolom dimensi dan backfill-nya

**Berkas:** `supabase/migrations/20260815120000_assessment_dimension.sql`

Menambah kolom `dimension` dan mengisinya untuk 12 pernyataan skala lintas-phase, mengikuti
pembagian empat dimensi di Panduan Scoring §3.

**Wajib dijalankan setelah langkah 4.** Backfill-nya bekerja atas `order_index` soal yang sudah
ada. Kalau dijalankan lebih dulu, ia memperbarui nol baris, tidak melaporkan apa pun, dan seluruh
soal berakhir tanpa dimensi — halaman Ringkasan lalu menampilkan tabel kapabilitas tanpa satu pun
baris dimensi.

Skrip ini menonaktifkan trigger `assessment_questions_freeze` sementara. Di produksi belum ada
satu pun attempt, jadi trigger itu tidak akan menolak apa pun dan penonaktifannya sebenarnya
mubazir — aman. **Yang berbahaya adalah menjalankannya saat acara berlangsung**, karena antara
`disable` dan `enable` trigger itu mati untuk semua sesi, bukan hanya sesimu. Jalankan sekarang,
sebelum tes pernah dibuka.

**Verifikasi — harus tepat 4 baris dengan jumlah 4 / 1 / 3 / 4:**

```sql
select dimension, count(*)
from public.assessment_questions
where question_type = 'likert' and phase_scope = 'both'
group by dimension
order by min(order_index);
```

Kalau ada baris `dimension` kosong atau jumlahnya tidak cocok, backfill meleset dan angka per
dimensi di halaman Ringkasan akan salah tanpa gejala apa pun di layar.

---

## Setelah semua langkah

### Urutan rilis kode

Kode aplikasi sudah membaca kolom `dimension`, `question_type`, `phase_scope`, dan `value`. Kalau
kode dideploy sebelum kelima langkah selesai, `/admin/assessment/*` dan `/tes/*` akan gagal —
pendaftaran dan sisa situs tidak terpengaruh. **Jalankan SQL-nya dulu, baru deploy.**

### Uji asap sebelum acara

Buka `/admin/assessment` dan pastikan kedua kartu phase berbunyi "Belum pernah dibuka", daftar
masalah berbunyi "Soal sudah siap", dan tab Kelola soal menampilkan 21 soal tanpa penanda
"Belum siap".

Gerbang peserta harus menyebut jumlah soal yang benar sebelum siapa pun mulai:
`/tes/pre-test` **16 soal**, `/tes/post-test` **21 soal**. Kalau pre-test menyebut 21, berarti
`phase_scope` tidak tersimpan dan langkah 2 tidak benar-benar jalan.

### Dua perubahan perilaku permanen pada `registrations`

Bukan ancaman terhadap data yang ada, tapi aturan baru yang berlaku setelah migrasi:

1. **Menghapus satu baris `registrations` kini ikut menghapus attempt, jawaban, dan refleksi
   peserta itu.** Arah cascade menjauh dari `registrations` — tidak ada yang bisa menghapus
   pendaftar dari sisi fitur ini, tapi sebaliknya berlaku.
2. **Mengubah `event_id` sebuah pendaftaran yang sudah punya attempt atau refleksi akan ditolak
   database.** FK-nya tanpa klausa `on update`, jadi default `NO ACTION`. Ini baru berlaku setelah
   acara berjalan.

---

## Ringkasan urutan

| # | Berkas | Jenis | Bergantung pada |
|---|---|---|---|
| 1 | `supabase/migrations/20260809_assessment_pretest_posttest.sql` | skema | — |
| 2 | `supabase/migrations/20260815000000_assessment_question_types.sql` | skema | 1 |
| 3 | blok `insert into assessment_settings` di dokumen ini | isi | 1 |
| 4 | `docs/pretest-posttest/seed-instrumen.sql` | isi | 2 |
| 5 | `supabase/migrations/20260815120000_assessment_dimension.sql` | skema + backfill | 4 |

Langkah 3 boleh ditukar posisinya dengan 2 atau 4 — ia hanya butuh langkah 1. Urutan 4 sebelum 5
dan 2 sebelum 4 **tidak boleh** ditukar.
