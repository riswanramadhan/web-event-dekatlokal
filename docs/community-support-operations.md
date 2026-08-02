# Operasional Community Support

Panduan ini berlaku untuk halaman direct-link `/community-support`, endpoint
`POST /api/community-support`, endpoint ticker
`GET /api/community-support/social-proof`, tabel `public.community_supports`,
dan bucket privat `community-support-proofs`.

Submission yang berhasil langsung menerima popup terima kasih dan reference
code. Tidak ada tahap verifikasi submission di UI. Tanggal transfer tidak
diminta; `created_at` hanya mencatat waktu form diterima server. Bukti transfer
tetap privat sebagai catatan internal dan tidak menjadi aset social proof.

Ticker hanya boleh memakai data nyata dari submission bernama yang memberi
persetujuan tampil secara eksplisit. Nama disamarkan di server dan nominal
berasal dari laporan supporter. Copy memakai format
`P*** N** telah support senilai Rp150.000`; nominal tersebut bukan hasil
verifikasi bank. Jangan membuat seed nama, nominal, atau dukungan fiktif untuk
mengisi ticker. Sembunyikan ticker bila belum ada data nyata yang memenuhi
consent.

## 0. Pemulihan cepat ketika submit selalu gagal

Pesan generik pada submission biasanya berarti aplikasi dapat menjangkau
Supabase, tetapi tabel community support belum ada atau masih memakai kontrak
lama. Menjalankan `SUPABASE_SCHEMA.sql` saja tidak cukup karena file tersebut
hanya menyiapkan event dan registrasi.

1. Pastikan project ref pada Supabase SQL Editor sama dengan project ref dari
   `NEXT_PUBLIC_SUPABASE_URL` di Vercel **Production**. Jangan menyalin atau
   menampilkan service-role key ke log atau chat.
2. Jalankan file read-only
   [`../supabase/check-community-support.sql`](../supabase/check-community-support.sql).
3. Jika tabel belum ada, jalankan migration `0000`, `0100`, `0200`, lalu `0300`
   sesuai urutan di bawah.
4. Jika tabel lama sudah ada, jangan mengandalkan `CREATE TABLE IF NOT EXISTS`;
   jalankan `0100`, `0200`, lalu `0300` untuk memperbarui kolom dan constraint.
5. Jalankan `notify pgrst, 'reload schema';`, lalu periksa bahwa
   `GET /api/community-support/social-proof` memberi HTTP `200` dengan
   `{"latest_supporters":[]}` ketika belum ada data.

Vercel Production harus memiliki `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY`.
Perubahan environment Vercel memerlukan redeploy agar masuk ke runtime baru.
Kode kendala `CS-XXXXXXXX` pada UI dapat dicocokkan dengan log Vercel tanpa
mencatat isi form, nama file, proof path, atau data pribadi.

## 1. Terapkan migration

Build/deploy tidak menjalankan SQL Supabase. Terapkan file berikut sesuai urutan
timestamp:

1. [`../SUPABASE_SCHEMA.sql`](../SUPABASE_SCHEMA.sql) untuk baseline event dan
   pendaftaran.
2. [`../supabase/migrations/20260802000000_create_community_support.sql`](../supabase/migrations/20260802000000_create_community_support.sql).
3. [`../supabase/migrations/20260802010000_add_community_support_idempotency.sql`](../supabase/migrations/20260802010000_add_community_support_idempotency.sql).
4. [`../supabase/migrations/20260802020000_expand_community_support_submission.sql`](../supabase/migrations/20260802020000_expand_community_support_submission.sql).
5. [`../supabase/migrations/20260802030000_contract_community_support_submission.sql`](../supabase/migrations/20260802030000_contract_community_support_submission.sql).

Untuk project baru, jalankan seluruh rangkaian di atas. Untuk project yang
pernah memakai alur lama `pending`/`verified`, lakukan rollout kompatibel:

1. Terapkan migration `...020000_expand...` terlebih dahulu.
2. Deploy aplikasi baru yang tidak lagi mengirim `transfer_date` dan memakai
   `submitted`/`excluded`.
3. Pastikan tidak ada instance aplikasi lama yang masih melayani request.
4. Terapkan migration `...030000_contract...` untuk menghapus kontrak lama.

Jangan menjalankan contract migration sebelum aplikasi baru aktif penuh. Jalur
utama manual adalah **Supabase Dashboard > SQL Editor**; hentikan rilis bila
sebuah script melaporkan error. Jangan menyalin potongan SQL tertentu saja atau
membuka policy publik sebagai jalan pintas.

Periksa hasil akhir:

```sql
select c.relname as table_name, c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'community_supports';

select column_name, is_nullable, column_default, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'community_supports'
  and column_name in (
    'request_id',
    'transfer_date',
    'display_publicly',
    'ticker_consent_at',
    'status'
  )
order by column_name;

select conname, pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.community_supports'::regclass
order by conname;

select id, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'community-support-proofs';

select policyname, roles, cmd
from pg_policies
where schemaname = 'public'
  and tablename = 'community_supports';
```

Hasil akhir yang diharapkan:

- RLS aktif dan tidak ada policy/grant baca atau insert untuk `anon` maupun
  `authenticated`;
- `request_id` UUID/non-null memiliki unique index;
- kolom `transfer_date` sudah tidak ada setelah contract migration;
- `display_publicly` default `false` dan consent ticker dicatat melalui
  `ticker_consent_at`;
- status hanya `submitted` atau `excluded`; status bukan antrean verifikasi;
- bucket memiliki `public = false`, batas file 5 MB, dan hanya menerima tipe
  file yang diizinkan migration.

Query SQL Editor berjalan sebagai role berwenang; kemampuan membacanya bukan
bukti bahwa akses anonim terbuka.

### Caveat rate limiter prarilis

Migration fitur ini tidak membuat shared table `rate_limits` atau RPC
`consume_rate_limit`. Endpoint submission mencoba memakai infrastruktur
tersebut, tetapi helper existing bersifat fail-open bila RPC tidak tersedia.
Artinya form masih dapat menerima submission, namun distributed rate limiting
tidak boleh diklaim aktif.

```sql
select to_regclass('public.rate_limits') as rate_limits_table;

select n.nspname as schema_name,
       p.proname as function_name,
       pg_get_function_identity_arguments(p.oid) as arguments
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'consume_rate_limit';
```

Nilai null/tanpa row berarti limiter bersama belum tersedia. Catat kondisi ini
sebagai caveat prarilis. Jangan membuat function atau policy ad hoc tanpa
migration yang sudah direview.

## 2. Environment dan URL production

Salin `.env.example` menjadi `.env.local`, lalu isi nilai sesuai environment:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
REGISTRATION_EVENT_SLUG=ai-co-creation-lab-makassar
TRUSTED_IP_HEADER=
```

- `SUPABASE_SERVICE_ROLE_KEY` hanya untuk server dan tidak boleh memakai prefix
  `NEXT_PUBLIC_`.
- `TRUSTED_IP_HEADER` tetap kosong pada local development dan Vercel langsung.
  Isi `cf-connecting-ip` hanya jika Cloudflare secara langsung dan eksklusif
  berada di depan runtime serta jalur bypass origin sudah ditutup.
- Target progress dan proposal tidak dikonfigurasi melalui environment lagi.
  Section verified progress sudah dihapus.
- CTA proposal memakai URL production tetap
  `https://event.dekatlokal.com/ai-co-creation-lab-makassar/sponsorship-proposal`.
  Halaman community support production dibagikan melalui
  `https://event.dekatlokal.com/community-support`.

Untuk smoke test lokal, URL localhost hanya dipakai untuk membuka aplikasi
lokal; link proposal dan share yang terlihat pengguna tetap harus mengarah ke
domain production yang ditetapkan.

## 3. Kontrak submission dan alur pengguna

Form tidak meminta tanggal transfer. Setelah validasi, upload privat, dan
insert database selesai, response sukses hanya mengembalikan:

- `submission_code`;
- `amount`;
- `destination_bank`.

Response tidak boleh memuat status internal, bucket, path, URL bukti, hash,
kontak, atau data pribadi lain. UI langsung membuka popup sukses berisi ucapan
terima kasih dan reference code. Tidak ada copy “menunggu verifikasi”.

CTA WhatsApp pada popup bersifat opsional. Pesan otomatis hanya memuat konteks
dukungan dan reference code, tanpa nama, nominal, atau bukti. Membuka WhatsApp
dapat membagikan identitas akun kepada penyedia WhatsApp dan penerima pesan. UI
harus menjelaskan batas ini sebelum pengguna menekan CTA.

Submission bernama memiliki checkbox consent ticker yang default-nya tidak
dicentang. Submission anonim selalu tidak tampil. Server hanya memasukkan row
ke ticker jika seluruh syarat berikut terpenuhi:

- `status = 'submitted'`;
- `display_publicly = true`;
- `is_anonymous = false`;
- `supporter_name` tersedia;
- `ticker_consent_at` tersedia.

`GET /api/community-support/social-proof` mengembalikan maksimal 10 row terbaru,
masing-masing hanya berisi nama tersamarkan dan nominal. Penyamaran dilakukan
sebelum response keluar dari server. Kontak, pesan, bank, bukti, waktu,
reference code, UUID, dan catatan internal tidak boleh masuk response.

Jika belum ada row yang memenuhi syarat atau endpoint tidak tersedia, UI
menyembunyikan ticker tanpa menggantinya dengan ajakan atau data rekaan. Ticker
memiliki kontrol jeda, sticky pada mobile, dan menjadi statis saat
`prefers-reduced-motion` aktif.

## 4. Matriks uji manual

Gunakan project development/preview dan identitas/file bertanda `TEST ONLY`.
Jangan memakai data atau bukti transfer orang sungguhan tanpa kebutuhan dan
persetujuan.

| Skenario | Langkah utama | Hasil yang diharapkan |
|---|---|---|
| Bernama tanpa consent ticker | Isi field valid, biarkan checkbox ticker kosong, lalu submit. | Popup sukses langsung; tidak ada status verifikasi; row `submitted`; `display_publicly = false`; tidak masuk ticker. |
| Bernama dengan consent ticker | Isi field valid, centang consent ticker, lalu submit. | Popup sukses langsung; ticker dapat memuat nama tersamarkan dan nominal setelah refresh; data privat tidak ikut keluar. |
| Anonim | Pilih anonim dan submit file valid. | Popup sukses langsung; `supporter_name` null; consent publik false; tidak masuk ticker. |
| Tidak ada tanggal transfer | Periksa seluruh form dan request multipart. | Tidak ada input atau field `transfer_date`; waktu penerimaan hanya berasal dari `created_at` server. |
| CTA WhatsApp | Dari popup sukses, periksa link sebelum membukanya. | CTA opsional; pesan hanya membawa konteks dukungan dan reference code; tidak ada nama, nominal, atau bukti di URL aplikasi. |
| File invalid | Pilih TXT atau file yang hanya diganti nama menjadi `.jpg`. | Ditolak; tidak ada row atau object baru; MIME dan signature harus cocok. |
| Lebih dari 5 MB | Pilih file lebih besar dari `5,242,880` byte. | Ditolak dengan pesan batas ukuran; tidak ada row atau object baru. |
| Gangguan jaringan | Aktifkan Offline sebelum submit. | Pesan koneksi tampil, isi form tetap ada, dan tidak ada klaim sukses palsu. |
| Response terputus setelah submit | Kirim sekali, simulasikan response terputus, lalu retry dari form yang sama. | `request_id` yang sama merekonsiliasi submission pertama; tidak membuat row kedua. |
| Ticker kosong | Pastikan tidak ada row consented di project uji. | Ticker tidak dirender; tidak ada ajakan, nama, atau nominal dummy. |
| Reduced motion | Aktifkan preferensi reduced motion. | Ticker tidak bergerak; konten tetap terbaca dan kontrol jeda tetap dapat diakses. |
| Direct-link-only | Periksa navbar, footer, sitemap, robots, dan metadata halaman. | Tidak ada link navigasi/sitemap; robots melarang crawl; metadata `noindex`; URL langsung tetap dapat dibuka. |

Untuk memeriksa row internal:

```sql
select
  request_id,
  submission_code,
  supporter_name,
  is_anonymous,
  display_publicly,
  ticker_consent_at,
  amount,
  destination_bank,
  status,
  proof_bucket,
  proof_path,
  created_at
from public.community_supports
order by created_at desc
limit 20;
```

Validasi invalid/oversize harus diuji di client dan endpoint agar validasi
server terbukti independen. Jika shared limiter tersedia dan endpoint memberi
`429`, tunggu window berakhir; jangan melemahkan limiter.

## 5. Moderasi internal, bukan verifikasi submission

Row baru memakai status `submitted`. Status `excluded` adalah kill switch
internal untuk spam, klaim palsu, atau penyalahgunaan; status ini bukan hasil
verifikasi pembayaran dan tidak ditampilkan kepada supporter.

```sql
-- Kandidat ticker terbaru untuk audit internal.
select submission_code, supporter_name, amount, display_publicly,
       ticker_consent_at, status, created_at
from public.community_supports
where status = 'submitted'
  and display_publicly = true
  and is_anonymous = false
  and ticker_consent_at is not null
order by created_at desc
limit 20;

-- Kecualikan hanya row yang sudah dipastikan spam/abusif.
update public.community_supports
set status = 'excluded',
    admin_notes = 'Alasan moderasi internal tanpa PII berlebih.'
where submission_code = 'AICL-CS-XXXXXXXXXX'
  and status = 'submitted'
returning submission_code, status, updated_at;
```

Jangan mengubah status untuk membuat ticker terlihat ramai. Jika salah
mengecualikan row, koreksi hanya setelah memastikan submission yang tepat dan
persetujuan ticker masih berlaku. Minimalkan PII pada `admin_notes`.

## 6. Membuka bukti privat

Jalur utama:

1. Temukan row melalui Table Editor dan catat `proof_bucket` serta `proof_path`.
2. Buka **Storage > community-support-proofs** di Supabase Dashboard.
3. Telusuri folder event dan object yang sesuai.
4. Buka hanya melalui sesi Dashboard operator yang berwenang.

Jangan mengubah bucket menjadi public, membuat public read policy, memakai
`getPublicUrl`, atau menaruh path pada log, tiket, analytics, response API, atau
ticker. Jika trusted tool internal benar-benar memerlukan signed URL, batasi
masa berlaku sesingkat mungkin dan jangan pernah menerbitkannya melalui endpoint
publik.

Jika insert database memberi hasil ambigu, object bukti dapat sengaja tetap
tersimpan agar retry tidak menghapus bukti dari row yang sebenarnya sudah
commit. Audit object orphan hanya setelah koneksi pulih dan window retry selesai;
jangan menghapus object production secara massal.

## 7. Retensi dan discoverability

Belum ada kebijakan retensi otomatis. Sebelum menerima data production,
tetapkan owner, periode simpan, dasar kebutuhan, dan jadwal review untuk kontak,
bukti, row `excluded`, serta data uji. Saat masa simpan berakhir, hapus object
Storage dan row terkait secara konsisten melalui akses terbatas. Jangan
menjanjikan periode retensi sebelum kebijakannya disetujui.

Halaman `/community-support` tidak ditautkan dari navigasi/footer, tidak masuk
sitemap, memakai metadata `noindex`, dan diblokir melalui robots. Pengaturan ini
hanya mengurangi discoverability, bukan membatasi akses. Jangan menaruh data
rahasia pada halaman karena siapa pun yang memperoleh URL tetap dapat
membukanya.
