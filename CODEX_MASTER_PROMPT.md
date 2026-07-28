# CODEX MASTER PROMPT

Anda bekerja sebagai senior product engineer, frontend engineer, UX engineer, dan implementation lead untuk membangun MVP **DekatLokal Event**.

Event pertama adalah **AI Co-Creation Lab Makassar**.

Kerjakan implementasi end-to-end pada repository saat ini.

## 1. Baca sebelum mengubah kode

Wajib baca seluruh file berikut:

- `AGENTS.md`
- `PRD_DEKATLOKAL_EVENT_MVP.md`
- `CONTENT_AND_ROUTES.md`
- `SUPABASE_SCHEMA.sql`
- `.env.example`
- `ACCEPTANCE_CHECKLIST.md`

Lalu inspeksi:

- seluruh repository;
- `package.json`;
- lockfile;
- `next.config.*`;
- Tailwind config atau global CSS;
- folder `app`, `src/app`, `components`, atau `src/components`;
- folder copy UI DekatLokal;
- file environment example;
- existing lint/typecheck/build scripts.

Jangan mulai menulis UI sebelum memahami struktur repository.

## 2. Reference UI is read-only

User telah menyiapkan folder berisi copy `app` dan `components` dari `dekatlokal.com`.

Folder itu hanya visual reference.

Jika copy tersebut masih berada sebagai root production `app` dan `components`, pindahkan secara aman ke:

```text
referensi-ui-dekatlokal/app
referensi-ui-dekatlokal/components
```

Sertakan file pendukung visual yang memang diperlukan untuk memahami UI, seperti styles atau public assets, ke bawah `_reference/dekatlokal-ui` apabila tersedia dan apabila pemindahan tidak merusak source lain.

Aturan:

- jangan import runtime apa pun dari `_reference`;
- jangan menghapus folder referensi;
- jangan mengedit isi referensi kecuali perubahan path yang diperlukan;
- jangan menyalin database logic, auth, atau business logic lama secara buta;
- gunakan reference untuk meniru design language;
- production source harus bersih dan mandiri.

Buat:

```text
docs/ui-reference-audit.md
```

Isi minimal:

- typography;
- primary colors;
- neutral colors;
- spacing;
- radius;
- container width;
- button styles;
- card styles;
- navbar;
- footer;
- form patterns;
- responsive behavior;
- elemen yang digunakan;
- elemen yang sengaja tidak digunakan.

## 3. Jangan over-engineer

MVP ini:

- hanya memiliki satu event publik aktif;
- content masih hardcode dari TypeScript data files;
- Supabase hanya wajib untuk registration;
- tidak membutuhkan akun peserta;
- tidak membutuhkan dashboard organizer;
- tidak membutuhkan payment;
- tidak membutuhkan form builder;
- tidak membutuhkan QR;
- tidak membutuhkan certificate.

Buat arsitektur reusable, tetapi jangan membangun fitur masa depan yang belum diperlukan.

## 4. Technical direction

Gunakan:

- Next.js App Router;
- TypeScript strict;
- Tailwind CSS;
- React Server Components sebagai default;
- Client Components hanya untuk interaksi;
- Zod untuk validasi;
- Supabase Postgres;
- `@supabase/supabase-js`;
- existing icon library atau `lucide-react`;
- `next/font`;
- `next/image`;
- package manager berdasarkan lockfile.

Jangan menetapkan versi dependency secara sembarangan. Gunakan versi yang kompatibel dengan repository dan latest stable yang dipilih package manager.

## 5. Production directory

Pilih salah satu pola berdasarkan existing project:

```text
app/
components/
lib/
data/
```

atau:

```text
src/app/
src/components/
src/lib/
src/data/
```

Jangan mencampur kedua pola.

Gunakan alias `@/*` bila sudah tersedia atau konfigurasi secara konsisten.

## 6. Required routes

Bangun:

```text
/
 /events
 /privacy
 /terms
 /ai-co-creation-lab-makassar
 /ai-co-creation-lab-makassar/register
 /ai-co-creation-lab-makassar/register/student
 /ai-co-creation-lab-makassar/register/umkm
 /ai-co-creation-lab-makassar/register/success
 /ai-co-creation-lab-makassar/journey
 /ai-co-creation-lab-makassar/journey/[activitySlug]
 /ai-co-creation-lab-makassar/challenges
 /ai-co-creation-lab-makassar/teams
 /ai-co-creation-lab-makassar/documentation
 /ai-co-creation-lab-makassar/impact
```

Tambahkan `not-found.tsx`, `error.tsx`, dan loading state seperlunya.

## 7. Content architecture

Buat single source of truth:

```text
data/platform.ts
data/events.ts
data/gep-journey.ts
data/challenges.ts
data/teams.ts
data/impact.ts
data/faqs.ts
```

Gunakan types yang jelas.

Jangan menduplikasi copy utama di page files.

Semua informasi yang belum final harus menggunakan status jujur:

- `Dalam Proses`
- `Belum Dikonfirmasi`
- `Dalam Validasi`
- `Segera Diumumkan`

Jangan mengarang:

- tanggal event;
- venue final;
- nama UMKM;
- nama mahasiswa;
- nama partner;
- actual impact;
- testimonial.

## 8. Design execution

Target visual:

- mirip ekosistem `dekatlokal.com`;
- modern;
- clean;
- professional;
- mobile-first;
- biru utama `#0255F5`;
- white and neutral backgrounds;
- subtle blue surface;
- spacing lega;
- card hierarchy jelas;
- typography mudah dibaca;
- institutional credibility;
- youthful energy.

Hindari:

- gradient berlebihan;
- glassmorphism berlebihan;
- dekorasi generik;
- section yang terlalu padat;
- card dengan tinggi tidak konsisten;
- font terlalu kecil;
- tampilan seperti template AI;
- animasi yang mengganggu.

Buat reusable components:

- `SiteHeader`
- `SiteFooter`
- `SectionHeading`
- `PrimaryButton`
- `SecondaryButton`
- `EventStatusBadge`
- `MetricCard`
- `EventCard`
- `PartnerLogoPlaceholder`
- `TimelineWeek`
- `JourneyActivityCard`
- `EvidenceLink`
- `CopyProgressButton`
- `RegistrationRoleCard`
- `FormField`
- `FormSection`
- `ConsentField`
- `SubmissionSuccess`
- `EmptyState`
- `TargetActualMetric`

Nama dapat disesuaikan, tetapi pola reusable wajib.

## 9. Platform homepage

Buat homepage yang memperkenalkan **DekatLokal Event**.

Copy utama:

```text
DekatLokal Event
Kelola Acara, Hubungkan Peserta, Ukur Dampaknya.
```

Deskripsi:

```text
Platform event untuk komunitas, organisasi mahasiswa, UMKM, dan program sosial—mulai dari halaman acara dan pendaftaran hingga dokumentasi dan laporan dampak.
```

Event unggulan:

```text
AI Co-Creation Lab Makassar
20 mahasiswa dan 5 UMKM berkolaborasi menciptakan solusi berbantuan AI untuk kebutuhan usaha yang nyata.
```

Future features yang belum aktif harus diberi label `Segera Hadir`, bukan dibuat seolah-olah sudah bekerja.

## 10. Event landing page

Buat landing page lengkap dan polished.

Hero metrics:

- 20 Mahasiswa
- 5 UMKM
- 4 Tim
- 4 Solusi AI

Section:

1. Hero.
2. Why this matters.
3. Problem.
4. Program concept.
5. How it works.
6. Participant composition.
7. Benefits.
8. Event flow.
9. Rundown.
10. Challenge examples.
11. GEP journey.
12. Partnership.
13. FAQ.
14. Registration CTA.

Gunakan sticky mobile CTA bila registration open.

## 11. Registration implementation

### 11.1 Server boundary

Registration harus diproses di server.

Pilihan:

- Server Actions;
- Route Handler.

Pilih yang paling konsisten dengan repository.

Dilarang:

- direct insert dari browser menggunakan anon key;
- service role pada client;
- validation hanya di browser;
- menyimpan secret di `NEXT_PUBLIC_*`.

### 11.2 Supabase clients

Buat server-only admin client, misalnya:

```text
lib/supabase/admin.ts
```

Gunakan:

- `NEXT_PUBLIC_SUPABASE_URL`;
- `SUPABASE_SERVICE_ROLE_KEY`.

Tambahkan `import "server-only"` apabila sesuai.

Jangan membuat service role client dapat terbundle ke browser.

### 11.3 Validation

Buat:

```text
lib/validation/student-registration.ts
lib/validation/umkm-registration.ts
```

Gunakan Zod.

Lakukan:

- trim;
- normalize WhatsApp;
- lowercase email;
- string length limit;
- URL validation untuk social media;
- enum validation;
- array limit;
- honeypot rejection;
- consent enforcement.

### 11.4 Duplicate handling

Tolak duplikasi berdasarkan:

- event + registration type + normalized WhatsApp;
- event + registration type + normalized email jika email tersedia.

Tampilkan pesan ramah:

```text
Data dengan nomor WhatsApp tersebut sudah pernah terdaftar untuk kategori ini.
```

Jangan membocorkan data pendaftar lain.

### 11.5 Submission code

Generate code unik, contoh format:

```text
AICL-STU-7K2M9P
AICL-UMK-4B8Q1D
```

Jangan gunakan sequence yang mudah ditebak.

Tampilkan code pada success page.

Jangan meletakkan data pribadi dalam query string.

Gunakan signed/opaque result atau simpan minimal state yang aman. Jika implementasi paling sederhana memakai query string, hanya submission code yang boleh dikirim.

### 11.6 Student form

Field sesuai PRD.

Skills dan preferred roles harus berupa multi-select yang accessible.

Role options:

- Problem Facilitator
- AI Workflow Builder
- Quality & Ethics Reviewer
- Documentation & Trainer

### 11.7 UMKM form

Gunakan bahasa awam.

Jangan menanyakan data pelanggan atau data rahasia.

Tambahkan helper:

```text
Jangan masukkan nomor rekening, identitas pelanggan, data transaksi rahasia, atau informasi sensitif lainnya.
```

### 11.8 Anti-spam

Minimum:

- honeypot;
- duplicate prevention;
- submit pending state;
- field length limits.

Tambahkan optional Cloudflare Turnstile hanya jika env keys tersedia. Jika keys tidak tersedia, form tetap berjalan tanpa crash.

## 12. GEP journey implementation

Buat config lengkap Week 1–4.

Setiap activity:

```ts
type JourneyActivity = {
  slug: string
  week: 1 | 2 | 3 | 4
  title: string
  shortDescription: string
  progressDescription: string
  output: string[]
  status: "planned" | "in_progress" | "completed" | "published"
  updatedAt?: string
  evidence: {
    label: string
    href: string
    type: "document" | "photo" | "video" | "social" | "drive" | "website"
  }[]
  leadershipInsight?: string
}
```

Initial descriptions harus berdasarkan PRD dan project, tetapi evidence boleh kosong.

Activity page harus memiliki:

- breadcrumb;
- week badge;
- status;
- title;
- progress description;
- copy button;
- output list;
- evidence;
- leadership insight;
- previous and next activity navigation;
- last updated.

Copy button harus bekerja dan memberikan feedback.

## 13. Impact implementation

Buat data structure yang membedakan:

```ts
{
  label: "Mahasiswa terlibat",
  target: 16,
  actual: null,
  unit: "orang",
  status: "not_measured"
}
```

Jangan menampilkan `16/16 tercapai` sebelum ada data aktual.

Buat target cards dan measurement plan:

- pre/post assessment mahasiswa;
- product/workflow completion;
- UMKM testing;
- UMKM reuse;
- satisfaction;
- testimonials;
- monitoring H+3 atau H+7.

## 14. Supabase

Gunakan SQL dari `SUPABASE_SCHEMA.sql`.

Aplikasi harus mengasumsikan schema telah dijalankan.

Jika env belum diisi:

- site tetap render;
- registration page menampilkan pesan konfigurasi hanya dalam development;
- production menampilkan pesan umum bahwa pendaftaran belum tersedia;
- jangan crash seluruh site.

## 15. Privacy and compliance

Buat privacy page yang menjelaskan:

- data dikumpulkan untuk seleksi dan penyelenggaraan event;
- data hanya diakses penyelenggara;
- data tidak dijual;
- dokumentasi memerlukan consent;
- pengguna dapat meminta koreksi/penghapusan;
- data sensitif tidak diminta;
- kontak menggunakan placeholder config yang mudah diubah.

Jangan menulis klaim legal yang berlebihan.

## 16. Branding and partner integrity

Gunakan label:

- `Diinisiasi oleh`
- `Didukung oleh`
- `Mitra tempat`
- `Challenge partner`
- `Knowledge partner`

Jangan menampilkan logo Rumah BUMN, Komdigi, BAKTI NUSA, Dompet Dhuafa, Google, atau lembaga lain sebagai partner aktif kecuali config `approved: true`.

Boleh menampilkan placeholder `Mitra dalam proses konfirmasi`.

Jangan menyatakan event disponsori Google.

## 17. SEO

Implement:

- root metadata;
- event metadata;
- journey metadata;
- Open Graph;
- sitemap;
- robots;
- canonical URLs berbasis `NEXT_PUBLIC_SITE_URL`.

Jangan menambahkan Event JSON-LD dengan tanggal palsu. Render structured data event hanya jika date and location config valid.

## 18. Testing and verification

Sebelum selesai, jalankan script yang tersedia.

Minimum target:

```bash
npm run lint
npm run typecheck
npm run build
```

Gunakan package manager yang sesuai lockfile.

Jika `typecheck` belum ada, tambahkan script yang sesuai atau jalankan `tsc --noEmit`.

Verifikasi manual:

- platform homepage;
- event homepage;
- student form;
- UMKM form;
- duplicate form;
- journey dynamic page;
- not found page;
- mobile width;
- tablet;
- desktop;
- env missing behavior.

Jika Supabase credentials tidak tersedia, tetap selesaikan code dan dokumentasikan langkah verifikasi integration.

## 19. Documentation

Buat:

```text
README.md
docs/setup-supabase.md
docs/content-editing.md
docs/deployment.md
docs/ui-reference-audit.md
docs/implementation-plan.md
docs/implementation-summary.md
```

README harus berisi:

- overview;
- stack;
- setup;
- env;
- SQL;
- local development;
- build;
- deploy;
- content editing;
- registration data access;
- security notes.

## 20. Work sequence

Ikuti urutan ini:

1. Audit repository.
2. Buat `docs/implementation-plan.md`.
3. Amankan reference UI.
4. Audit design.
5. Set up app foundation.
6. Build platform homepage.
7. Build event landing page.
8. Build data configs.
9. Set up Supabase server client.
10. Build schemas and server mutations.
11. Build student form.
12. Build UMKM form.
13. Build success flow.
14. Build GEP journey.
15. Build challenges, teams, documentation, impact.
16. Build privacy and terms.
17. SEO and accessibility.
18. Run tests/build.
19. Fix all relevant issues.
20. Write `docs/implementation-summary.md`.

## 21. Git and safety

- Jangan menghapus user work.
- Jangan reset repository.
- Jangan overwrite `.env.local`.
- Jangan commit credential.
- Jangan memperbaiki hal tidak terkait kecuali dibutuhkan untuk build.
- Gunakan incremental commits apabila git tersedia.
- Tampilkan perubahan penting dalam final summary.
- Sebutkan test yang dijalankan dan hasilnya.
- Jujur apabila Supabase live integration tidak dapat diuji tanpa credentials.

## 22. Final response format

Selesaikan dengan:

1. Ringkasan implementasi.
2. Daftar routes.
3. Database work.
4. Security decisions.
5. Tests/build yang dijalankan.
6. File penting yang dibuat.
7. Hal yang perlu diisi user.
8. Known limitations.
