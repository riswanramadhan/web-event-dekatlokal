-- =====================================================================
-- Tipe soal, cakupan phase, dan tabel refleksi
--
-- Instrumen yang dibutuhkan laporan impact tidak seluruhnya berskor:
-- 16 pernyataan skala Likert, 4 soal pengetahuan, 1 pilihan minat, dan
-- 4 pertanyaan refleksi terbuka. Lima di antaranya khusus post-test.
--
-- Yang TIDAK berubah: assessment_answers. Refleksi terbuka ditampung
-- tabel sendiri, jadi option_id tetap NOT NULL dengan FK utuh dan
-- assessment_answers_guard tidak tersentuh.
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 1. Tipe soal
-- ---------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'assessment_question_type') then
    create type public.assessment_question_type as enum (
      'scored_choice',   -- pilihan ganda, tepat satu kunci, masuk skor
      'likert',          -- skala 1-5, tanpa kunci, tidak masuk skor
      'unscored_choice'  -- pilihan tanpa jawaban benar, tidak masuk skor
    );
  end if;
end $$;

alter table public.assessment_questions
  add column if not exists question_type public.assessment_question_type
    default 'scored_choice' not null,
  -- Default 'scored_choice' menjaga soal yang sudah ada tetap sah tanpa
  -- disentuh: sebelum migrasi ini seluruh soal memang pilihan berskor.
  add column if not exists phase_scope text default 'both' not null,
  add column if not exists category text;

alter table public.assessment_questions
  drop constraint if exists assessment_questions_phase_scope_check;

alter table public.assessment_questions
  add constraint assessment_questions_phase_scope_check
    check (phase_scope in ('both', 'post_test'));

comment on column public.assessment_questions.phase_scope is
  'both = muncul di kedua phase; post_test = hanya muncul di post-test.';
comment on column public.assessment_questions.category is
  'Nama kategori untuk pengelompokan di laporan, misalnya "Problem Understanding".';

-- ---------------------------------------------------------------------
-- 2. Nilai opsi Likert
-- ---------------------------------------------------------------------

alter table public.assessment_options
  add column if not exists value integer;

alter table public.assessment_options
  drop constraint if exists assessment_options_value_range;

alter table public.assessment_options
  add constraint assessment_options_value_range
    check (value is null or value between 1 and 5);

-- Nilai disimpan terpisah dari order_index dengan sengaja: menggeser
-- urutan opsi tidak boleh diam-diam mengubah arti jawaban yang sudah
-- tersimpan.
comment on column public.assessment_options.value is
  'Nilai skala 1-5 untuk opsi Likert. NULL untuk tipe soal lain.';

-- ---------------------------------------------------------------------
-- 3. Kesiapan soal, per tipe
-- ---------------------------------------------------------------------

create or replace function public.assessment_problems(p_event_id uuid)
returns setof text
language sql
stable
set search_path to ''
as $$
  with q as (
    select
      qq.id,
      qq.prompt,
      qq.question_type,
      count(o.id) as option_count,
      count(o.id) filter (where o.is_correct) as correct_count,
      count(o.id) filter (where o.value between 1 and 5) as valued_count,
      count(distinct o.value) as distinct_values
    from public.assessment_questions qq
    left join public.assessment_options o on o.question_id = qq.id
    where qq.event_id = p_event_id
    group by qq.id, qq.prompt, qq.question_type
  )
  select 'Belum ada soal sama sekali untuk event ini.'
  where not exists (select 1 from q)

  union all
  select format('Soal "%s..." hanya punya %s opsi (minimal 2).',
                left(q.prompt, 40), q.option_count)
  from q where q.question_type = 'scored_choice' and q.option_count < 2
  union all
  select format('Soal "%s..." punya %s kunci jawaban (harus tepat 1).',
                left(q.prompt, 40), q.correct_count)
  from q where q.question_type = 'scored_choice' and q.correct_count <> 1

  union all
  select format('Pernyataan skala "%s..." punya %s opsi (harus tepat 5).',
                left(q.prompt, 40), q.option_count)
  from q where q.question_type = 'likert' and q.option_count <> 5
  union all
  select format('Pernyataan skala "%s..." harus punya nilai 1 sampai 5 tanpa duplikat.',
                left(q.prompt, 40))
  from q where q.question_type = 'likert'
    and (q.valued_count <> 5 or q.distinct_values <> 5)
  union all
  select format('Pernyataan skala "%s..." tidak boleh punya kunci jawaban.',
                left(q.prompt, 40))
  from q where q.question_type = 'likert' and q.correct_count > 0

  union all
  select format('Pilihan "%s..." hanya punya %s opsi (minimal 2).',
                left(q.prompt, 40), q.option_count)
  from q where q.question_type = 'unscored_choice' and q.option_count < 2
  union all
  select format('Pilihan "%s..." tidak boleh punya kunci jawaban.',
                left(q.prompt, 40))
  from q where q.question_type = 'unscored_choice' and q.correct_count > 0;
$$;

-- ---------------------------------------------------------------------
-- 4. Mulai attempt — urutan soal disaring per phase
-- ---------------------------------------------------------------------

create or replace function public.start_assessment_attempt(
  p_registration_id uuid,
  p_phase public.assessment_phase
)
returns table (
  attempt_id uuid,
  attempt_status public.assessment_attempt_status,
  question_order uuid[],
  expires_at timestamp with time zone,
  created_new boolean
)
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_event_id uuid;
  v_settings public.assessment_settings;
  v_attempt public.assessment_attempts;
  v_order uuid[];
begin
  select r.event_id into v_event_id
  from public.registrations r
  where r.id = p_registration_id;

  if v_event_id is null then
    raise exception 'Peserta tidak ditemukan.' using errcode = 'P0002';
  end if;

  -- Attempt yang sudah ada selalu menang, tanpa memeriksa is_open.
  -- Inilah yang membuat penutupan tes tidak memutus pengerjaan orang.
  select * into v_attempt
  from public.assessment_attempts a
  where a.registration_id = p_registration_id and a.phase = p_phase;

  if v_attempt.id is not null then
    return query select v_attempt.id, v_attempt.status, v_attempt.question_order,
                        v_attempt.expires_at, false;
    return;
  end if;

  select * into v_settings
  from public.assessment_settings s
  where s.event_id = v_event_id and s.phase = p_phase;

  if v_settings.id is null then
    raise exception 'Pengaturan tes belum dibuat untuk event ini.' using errcode = 'P0002';
  end if;

  if not v_settings.is_open then
    raise exception 'Tes sedang ditutup.' using errcode = '23514';
  end if;

  -- Soal berlingkup 'post_test' tidak pernah masuk ke attempt pre-test.
  --
  -- Urutannya tidak diacak seluruhnya. Pernyataan skala dikelompokkan per
  -- kategori dan harus mengalir sesuai order_index supaya tetap terbaca
  -- sebagai satu instrumen. Yang diacak hanya soal berskor, karena di
  -- situlah alasan aslinya berlaku: dua puluh orang mengerjakan di ruangan
  -- yang sama. Soal berskor ditukar-tukar hanya di antara slot yang memang
  -- ditempati soal berskor, jadi posisi soal lain tidak bergeser.
  with ranked as (
    select
      q.id,
      q.question_type,
      row_number() over (order by q.order_index) as slot
    from public.assessment_questions q
    where q.event_id = v_event_id
      and (q.phase_scope = 'both' or q.phase_scope = p_phase::text)
  ),
  scored_slots as (
    select slot, row_number() over (order by slot) as n
    from ranked
    where question_type = 'scored_choice'
  ),
  scored_shuffled as (
    select id, row_number() over (order by random()) as n
    from ranked
    where question_type = 'scored_choice'
  ),
  placed as (
    select r.slot, r.id
    from ranked r
    where r.question_type <> 'scored_choice'
    union all
    select ss.slot, sh.id
    from scored_slots ss
    join scored_shuffled sh on sh.n = ss.n
  )
  select array_agg(p.id order by p.slot) into v_order
  from placed p;

  if v_order is null or cardinality(v_order) = 0 then
    raise exception 'Belum ada soal untuk event ini.' using errcode = '23514';
  end if;

  begin
    insert into public.assessment_attempts
      (event_id, registration_id, phase, question_order, expires_at)
    values
      (v_event_id, p_registration_id, p_phase, v_order,
       now() + make_interval(secs => v_settings.duration_seconds))
    returning * into v_attempt;
  exception
    when unique_violation then
      -- Dua tab menekan Mulai bersamaan. Yang kalah membaca ulang.
      select * into v_attempt
      from public.assessment_attempts a
      where a.registration_id = p_registration_id and a.phase = p_phase;

      return query select v_attempt.id, v_attempt.status, v_attempt.question_order,
                          v_attempt.expires_at, false;
      return;
  end;

  return query select v_attempt.id, v_attempt.status, v_attempt.question_order,
                      v_attempt.expires_at, true;
end;
$$;

-- ---------------------------------------------------------------------
-- 5. Submit — hanya soal berskor yang dihitung
-- ---------------------------------------------------------------------

create or replace function public.submit_assessment_attempt(p_attempt_id uuid)
returns table (score integer, total_points integer)
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_attempt public.assessment_attempts;
  v_score integer;
  v_total integer;
begin
  select * into v_attempt
  from public.assessment_attempts
  where id = p_attempt_id
  for update;

  if v_attempt.id is null then
    raise exception 'Attempt tidak ditemukan.' using errcode = 'P0002';
  end if;

  -- Idempoten: submit ulang mengembalikan nilai yang sudah tersimpan.
  if v_attempt.status = 'submitted' then
    return query select v_attempt.score, v_attempt.total_points;
    return;
  end if;

  update public.assessment_answers ans
  set is_correct = o.is_correct
  from public.assessment_options o
  where ans.attempt_id = p_attempt_id
    and ans.option_id = o.id;

  select coalesce(sum(qq.points), 0) into v_score
  from public.assessment_answers ans
  join public.assessment_questions qq on qq.id = ans.question_id
  where ans.attempt_id = p_attempt_id
    and ans.is_correct
    and qq.question_type = 'scored_choice';

  -- Penyebut dibatasi soal berskor DI DALAM attempt ini. Tanpa batasan
  -- tipe, 17 soal Likert ikut masuk penyebut dan selalu dihitung salah;
  -- tanpa batasan question_order, soal khusus post-test ikut menghitung
  -- pada attempt pre-test.
  select coalesce(sum(qq.points), 0) into v_total
  from public.assessment_questions qq
  where qq.event_id = v_attempt.event_id
    and qq.question_type = 'scored_choice'
    and qq.id = any (v_attempt.question_order);

  update public.assessment_attempts
  set status = 'submitted',
      submitted_at = now(),
      score = v_score,
      total_points = v_total
  where id = p_attempt_id;

  return query select v_score, v_total;
end;
$$;

-- ---------------------------------------------------------------------
-- 6. Refleksi dan testimonial — di luar tes berbatas waktu
-- ---------------------------------------------------------------------

create table if not exists public.assessment_reflections (
  id uuid default gen_random_uuid() not null,
  event_id uuid not null,
  registration_id uuid not null,
  ai_usage_change text,
  umkm_lesson text,
  next_time_differently text,
  testimonial text,
  testimonial_consent text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint assessment_reflections_pkey primary key (id),
  constraint assessment_reflections_registration_key unique (registration_id),
  constraint assessment_reflections_registration_fkey
    foreign key (registration_id, event_id)
    references public.registrations(id, event_id) on delete cascade,
  constraint assessment_reflections_consent_check
    check (testimonial_consent is null
           or testimonial_consent in ('named', 'anonymous', 'no')),
  constraint assessment_reflections_length_check
    check (
      coalesce(char_length(ai_usage_change), 0) <= 4000
      and coalesce(char_length(umkm_lesson), 0) <= 4000
      and coalesce(char_length(next_time_differently), 0) <= 4000
      and coalesce(char_length(testimonial), 0) <= 1000
    )
);

comment on column public.assessment_reflections.testimonial_consent is
  'named = boleh dengan nama; anonymous = boleh tanpa nama; no = tidak boleh dipakai.';

create index if not exists assessment_reflections_event_idx
  on public.assessment_reflections using btree (event_id);

drop trigger if exists set_assessment_reflections_updated_at
  on public.assessment_reflections;
create trigger set_assessment_reflections_updated_at
  before update on public.assessment_reflections
  for each row execute function public.set_updated_at();

alter table public.assessment_reflections enable row level security;

commit;
