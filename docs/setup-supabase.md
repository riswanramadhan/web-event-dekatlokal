# Setup Supabase

Supabase digunakan hanya untuk data pendaftaran AI Co-Creation Lab Makassar. Konten event, journey, challenge, tim, dokumentasi, dan impact tetap berasal dari typed config di `src/data`.

## 1. Siapkan project

Gunakan project Supabase yang sesuai dengan environment. Untuk menghindari data uji bercampur dengan data peserta, gunakan project terpisah untuk development/preview dan production bila memungkinkan.

Dari pengaturan API project, siapkan:

- Project URL.
- Publishable key.
- Service-role key.

Service-role key melewati RLS dan hanya boleh tersedia pada runtime server. Jangan menaruhnya di screenshot, issue, log build, source, atau variable yang diawali `NEXT_PUBLIC_`.

Server Action saat ini menggunakan `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, dan `REGISTRATION_EVENT_SLUG`. Publishable key tetap tersedia pada template environment untuk kebutuhan client publik yang aman, tetapi bukan credential mutation dan tidak digunakan untuk direct insert pendaftaran.

## 2. Terapkan schema

1. Buka SQL Editor di Supabase Dashboard.
2. Salin seluruh isi [`../SUPABASE_SCHEMA.sql`](../SUPABASE_SCHEMA.sql).
3. Jalankan script sebagai satu transaksi.
4. Pastikan tidak ada error sebelum melanjutkan.

Script tersebut:

- mengaktifkan extension `pgcrypto`;
- membuat enum tipe dan status pendaftaran;
- membuat tabel `public.events` dan `public.registrations`;
- membuat unique index untuk WhatsApp dan email per event/tipe;
- membuat trigger `updated_at`;
- mengaktifkan RLS;
- mencabut akses tabel dari `anon` dan `authenticated`;
- memberi akses kepada `service_role`;
- membuat atau memperbarui seed event `ai-co-creation-lab-makassar`.

Seed awal sengaja memakai `status = 'draft'` dan `registration_open = false`. Menjalankan schema tidak otomatis membuka pendaftaran.

Script ini adalah baseline awal. Perubahan schema berikutnya sebaiknya dibuat sebagai migration baru; `create table if not exists` tidak mengubah tabel lama agar selalu sama dengan definisi terbaru.

## 3. Konfigurasikan environment lokal

Buat `.env.local` dari `.env.example`, lalu isi:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

REGISTRATION_EVENT_SLUG=ai-co-creation-lab-makassar
```

Nilai di atas adalah pola, bukan credential nyata. Jangan commit `.env.local`.

Turnstile bersifat opsional. Jika digunakan, isi `NEXT_PUBLIC_TURNSTILE_SITE_KEY` dan `TURNSTILE_SECRET_KEY` sebagai pasangan. Form tidak boleh menganggap satu key saja sebagai konfigurasi lengkap.

## 4. Verifikasi schema

Jalankan query berikut di SQL Editor:

```sql
select id, slug, status, registration_open, metadata
from public.events
where slug = 'ai-co-creation-lab-makassar';
```

Periksa RLS:

```sql
select
  c.relname as table_name,
  c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('events', 'registrations');
```

Kedua tabel harus memiliki RLS aktif. Tidak adanya policy publik memang disengaja. Query yang dijalankan sebagai owner melalui SQL Editor tetap dapat membaca tabel dan bukan bukti bahwa akses anonim terbuka.

## 5. Buka atau tutup pendaftaran

Sebelum membuka pendaftaran, pastikan tanggal/status publik, kapasitas operasional, privacy notice, dan kontak sudah ditinjau. Lalu ubah row event:

```sql
update public.events
set
  status = 'registration_open',
  registration_open = true
where slug = 'ai-co-creation-lab-makassar';
```

Untuk menutup:

```sql
update public.events
set
  status = 'registration_closed',
  registration_open = false
where slug = 'ai-co-creation-lab-makassar';
```

Status publik pada typed config harus diperbarui secara konsisten; lihat [`content-editing.md`](content-editing.md). Jangan menampilkan CTA “pendaftaran dibuka” jika row database masih tertutup, atau sebaliknya.

Row database adalah otoritas mutation: Server Action hanya menerima submission jika `registration_open = true` **dan** `status = 'registration_open'`. Mengaktifkan CTA atau flag pada typed config saja tidak membuka akses server.

## 6. Uji integrasi secara manual

Dengan development server aktif:

1. Kirim satu aplikasi mahasiswa yang valid.
2. Kirim satu aplikasi UMKM yang valid.
3. Pastikan masing-masing menghasilkan submission code, tanpa PII di URL.
4. Coba kirim ulang kategori yang sama dengan WhatsApp yang sama.
5. Jika email tersedia, coba duplikasi email pada kategori dan event yang sama.
6. Tutup pendaftaran di database dan pastikan mutation tidak menerima aplikasi baru.
7. Periksa record melalui Supabase Dashboard, bukan melalui halaman publik.

Jangan memakai data orang sungguhan untuk pengujian tanpa kebutuhan dan consent. Hapus atau tandai data uji secara terkendali sebelum pendaftaran resmi.

## 7. Mengakses dan mengelola pendaftaran

Pada MVP, reviewer internal menggunakan Supabase Dashboard. Batasi akses project hanya kepada penyelenggara yang memerlukan data.

Agregasi tanpa menampilkan PII:

```sql
select registration_type, status, count(*)
from public.registrations
group by registration_type, status
order by registration_type, status;
```

Perubahan status dapat dilakukan terhadap record yang sudah dipastikan benar, misalnya melalui Table Editor. Nilai status yang tersedia:

```text
submitted
under_review
shortlisted
accepted
rejected
confirmed
attended
completed
withdrawn
```

Jangan membuat public view, public select policy, atau export publik untuk tabel `registrations`. Jika data diekspor untuk review internal, simpan di lokasi terbatas dan terapkan kebijakan retensi yang sesuai.

## 8. Boundary keamanan

- Browser tidak melakukan insert langsung ke Supabase.
- Server memvalidasi input dengan Zod sebelum membentuk `metadata`.
- Service-role key hanya digunakan pada modul server.
- RLS tetap aktif walaupun service role digunakan.
- `anon` dan `authenticated` tidak diberi grant atau policy pada dua tabel.
- Payload pendaftaran tidak dicatat ke log.
- Email, WhatsApp, nama, dan metadata tidak dikirim ke analytics.
- Submission code tidak boleh berurutan atau mudah ditebak.
- Data peserta tidak dirender pada challenge, team, documentation, atau impact page.

Jika service-role key pernah terpapar, segera rotate key di Supabase, ganti environment pada seluruh hosting environment, dan redeploy.

## 9. Troubleshooting

### Situs tampil, tetapi form tidak dapat disimpan

Periksa kelengkapan `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, dan `REGISTRATION_EVENT_SLUG`. Pastikan schema sudah dijalankan dan event row tersedia.

### Pendaftaran dilaporkan tertutup

Periksa `status` dan `registration_open` pada `public.events`, lalu cocokkan dengan status di typed config.

### Semua submission dianggap duplikat

Pastikan nomor WhatsApp dinormalisasi secara konsisten dan data uji lama tidak memakai nomor yang sama. Unique index bekerja per `event_id` dan `registration_type`.

### Error izin database

Pastikan mutation memakai service-role key di server, bukan publishable key. Jangan mengatasi error dengan membuat policy insert/read anonim.

### Event tidak ditemukan

Pastikan `REGISTRATION_EVENT_SLUG` sama persis dengan row `public.events.slug` dan typed event slug.
