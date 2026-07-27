-- DekatLokal Event MVP
-- Run in Supabase SQL Editor.
-- Registration is written only from trusted Next.js server code using service_role.
-- Do not expose service_role to the browser.

begin;

create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'event_registration_type'
  ) then
    create type public.event_registration_type as enum (
      'student',
      'umkm',
      'general'
    );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'event_registration_status'
  ) then
    create type public.event_registration_status as enum (
      'submitted',
      'under_review',
      'shortlisted',
      'accepted',
      'rejected',
      'confirmed',
      'attended',
      'completed',
      'withdrawn'
    );
  end if;
end
$$;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  status text not null default 'draft'
    check (status in ('draft', 'registration_open', 'registration_closed', 'ongoing', 'completed', 'archived')),
  registration_open boolean not null default false,
  target_participants integer,
  metadata jsonb not null default '{}'::jsonb,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  registration_type public.event_registration_type not null,
  status public.event_registration_status not null default 'submitted',
  submission_code text not null unique,
  full_name text not null,
  email text,
  whatsapp text not null,
  institution_name text,
  business_name text,
  metadata jsonb not null default '{}'::jsonb,
  consent_privacy boolean not null,
  consent_documentation boolean not null default false,
  consent_monitoring boolean not null default false,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint registrations_full_name_length check (char_length(full_name) between 2 and 120),
  constraint registrations_email_length check (email is null or char_length(email) <= 254),
  constraint registrations_whatsapp_length check (char_length(whatsapp) between 8 and 24),
  constraint registrations_metadata_is_object check (jsonb_typeof(metadata) = 'object'),
  constraint registrations_privacy_required check (consent_privacy = true)
);

create unique index if not exists registrations_event_type_whatsapp_unique
  on public.registrations (event_id, registration_type, whatsapp);

create unique index if not exists registrations_event_type_email_unique
  on public.registrations (event_id, registration_type, lower(email))
  where email is not null and email <> '';

create index if not exists registrations_event_created_idx
  on public.registrations (event_id, created_at desc);

create index if not exists registrations_event_status_idx
  on public.registrations (event_id, status);

create index if not exists registrations_type_idx
  on public.registrations (registration_type);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists set_registrations_updated_at on public.registrations;
create trigger set_registrations_updated_at
before update on public.registrations
for each row execute function public.set_updated_at();

alter table public.events enable row level security;
alter table public.registrations enable row level security;

-- Remove public data API access.
revoke all on table public.events from anon, authenticated;
revoke all on table public.registrations from anon, authenticated;

-- Trusted server service role may manage rows.
grant all on table public.events to service_role;
grant all on table public.registrations to service_role;

-- No anon/authenticated policies are intentionally created.
-- The site reads event content from hardcoded TypeScript config.
-- Registration writes are performed by trusted Next.js server code.

insert into public.events (
  slug,
  title,
  summary,
  status,
  registration_open,
  target_participants,
  metadata
)
values (
  'ai-co-creation-lab-makassar',
  'AI Co-Creation Lab Makassar',
  'Kolaborasi 20 mahasiswa dan 5 UMKM untuk menciptakan solusi berbantuan AI bagi kebutuhan usaha yang nyata.',
  'draft',
  false,
  25,
  jsonb_build_object(
    'target_students', 20,
    'target_umkm', 5,
    'target_teams', 4,
    'target_solutions', 4
  )
)
on conflict (slug)
do update set
  title = excluded.title,
  summary = excluded.summary,
  target_participants = excluded.target_participants,
  metadata = excluded.metadata,
  updated_at = now();

commit;

-- Useful verification queries:

-- select id, slug, status, registration_open, metadata
-- from public.events;

-- select registration_type, status, count(*)
-- from public.registrations
-- group by registration_type, status
-- order by registration_type, status;
