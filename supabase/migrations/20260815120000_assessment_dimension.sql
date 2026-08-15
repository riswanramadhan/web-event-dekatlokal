-- =====================================================================
-- Dimensi pelaporan untuk pernyataan skala
--
-- Panduan Scoring §3 meminta Q1–Q12 dibaca sebagai empat dimensi, bukan
-- satu angka besar. Dimensi hanya berarti untuk soal `likert` berlingkup
-- `both`; layer lain di §9 sudah bisa diturunkan dari question_type dan
-- phase_scope, jadi tidak perlu kolom tambahan untuk itu.
-- =====================================================================

begin;

alter table public.assessment_questions
  add column if not exists dimension text;

comment on column public.assessment_questions.dimension is
  'Pengelompokan laporan untuk pernyataan skala lintas-phase (Panduan Scoring §3). NULL untuk tipe soal lain.';

-- ---------------------------------------------------------------------
-- Backfill sesuai pembagian di panduan
--
-- Trigger freeze dimatikan sementara HANYA untuk statement ini. Trigger itu
-- ada untuk mencegah bank soal berubah di bawah kaki peserta yang sedang
-- mengerjakan — dan `dimension` tidak ikut menentukan apa pun yang dilihat
-- peserta: tidak masuk question_order, tidak masuk penilaian, tidak dirender
-- di layar pengerjaan. Ia murni label laporan. Tanpa penonaktifan ini,
-- backfill gagal dengan SQLSTATE 23001 begitu ada satu attempt saja.
-- ---------------------------------------------------------------------

alter table public.assessment_questions disable trigger assessment_questions_freeze;

update public.assessment_questions q
set dimension = case
  when q.order_index between 0 and 3  then 'Problem & User Understanding'
  when q.order_index = 4              then 'MVP & Solution Thinking'
  when q.order_index between 5 and 7  then 'AI-Assisted Problem Solving'
  when q.order_index between 8 and 11 then 'Testing, Collaboration & Confidence'
  else null
end
where q.question_type = 'likert'
  and q.phase_scope = 'both'
  and q.dimension is null;

alter table public.assessment_questions enable trigger assessment_questions_freeze;

commit;
