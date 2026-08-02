-- Community support submission storage and private proof ledger.
-- Apply with `supabase db push` or run this file in the Supabase SQL Editor.
-- All writes and reads are performed by trusted server code using service_role.

begin;

create extension if not exists pgcrypto;

create table if not exists public.community_supports (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  submission_code text not null unique,
  event_slug text not null,
  supporter_name text,
  is_anonymous boolean not null default false,
  contact text,
  amount bigint not null,
  destination_bank text not null,
  message text,
  display_publicly boolean not null default false,
  ticker_consent_at timestamptz,
  proof_bucket text not null,
  proof_path text not null unique,
  proof_original_name text,
  proof_mime_type text not null,
  proof_sha256 text not null,
  proof_size_bytes bigint not null,
  status text not null default 'submitted',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint community_supports_submission_code_format
    check (submission_code ~ '^AICL-CS-[A-Z0-9]{10}$'),
  constraint community_supports_event_slug
    check (event_slug = 'ai-co-creation-lab-makassar'),
  constraint community_supports_name_state
    check (
      (is_anonymous and supporter_name is null)
      or (
        not is_anonymous
        and supporter_name is not null
        and char_length(supporter_name) between 2 and 120
        and supporter_name = btrim(supporter_name)
      )
    ),
  constraint community_supports_anonymous_not_public
    check (not is_anonymous or not display_publicly),
  constraint community_supports_ticker_consent_state
    check (
      (
        not display_publicly
        and ticker_consent_at is null
      )
      or (
        display_publicly
        and ticker_consent_at is not null
        and not is_anonymous
        and supporter_name is not null
      )
    ),
  constraint community_supports_contact_length
    check (
      contact is null
      or (
        char_length(contact) between 1 and 254
        and contact = btrim(contact)
      )
    ),
  constraint community_supports_amount_positive
    check (amount > 0),
  constraint community_supports_amount_json_safe
    check (amount <= 9007199254740991),
  constraint community_supports_destination_bank
    check (destination_bank in ('bsi', 'mandiri')),
  constraint community_supports_message_length
    check (
      message is null
      or (
        char_length(message) between 1 and 300
        and message = btrim(message)
      )
    ),
  constraint community_supports_proof_bucket
    check (proof_bucket = 'community-support-proofs'),
  constraint community_supports_proof_path
    check (
      proof_path ~ '^ai-co-creation-lab-makassar-2026/[0-9]{4}/[0-9]{2}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|pdf)$'
    ),
  constraint community_supports_original_name_length
    check (
      proof_original_name is null
      or char_length(proof_original_name) between 1 and 255
    ),
  constraint community_supports_proof_mime_type
    check (
      proof_mime_type in (
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf'
      )
    ),
  constraint community_supports_proof_extension_matches_mime
    check (
      (proof_mime_type = 'image/jpeg' and proof_path ~ '\.jpg$')
      or (proof_mime_type = 'image/png' and proof_path ~ '\.png$')
      or (proof_mime_type = 'image/webp' and proof_path ~ '\.webp$')
      or (proof_mime_type = 'application/pdf' and proof_path ~ '\.pdf$')
    ),
  constraint community_supports_proof_sha256
    check (proof_sha256 ~ '^[0-9a-f]{64}$'),
  constraint community_supports_proof_size
    check (proof_size_bytes between 1 and 5242880),
  constraint community_supports_status
    check (status in ('submitted', 'excluded')),
  constraint community_supports_admin_notes_length
    check (admin_notes is null or char_length(admin_notes) <= 2000)
);

create index if not exists community_supports_status_created_idx
  on public.community_supports (status, created_at desc);

create index if not exists community_supports_ticker_latest_idx
  on public.community_supports (created_at desc)
  where status = 'submitted'
    and display_publicly
    and not is_anonymous
    and ticker_consent_at is not null
    and supporter_name is not null;

create index if not exists community_supports_event_created_idx
  on public.community_supports (event_slug, created_at desc);

create or replace function public.set_community_support_updated_at()
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

drop trigger if exists set_community_support_updated_at
  on public.community_supports;
create trigger set_community_support_updated_at
before update on public.community_supports
for each row execute function public.set_community_support_updated_at();

alter table public.community_supports enable row level security;

-- No anon/authenticated policies are intentionally created. The browser has
-- no direct table access; the server returns only masked, explicitly consented
-- ticker fields.
revoke all on table public.community_supports from public, anon, authenticated;
grant all on table public.community_supports to service_role;

comment on column public.community_supports.ticker_consent_at is
  'Timestamp of explicit consent to show the masked name and self-reported amount in the public ticker.';
comment on column public.community_supports.status is
  'Internal moderation state only: submitted is eligible for consented display; excluded is hidden.';

-- This creates a private bucket with server-enforced limits. No policy on
-- storage.objects is added, so there is no anonymous upload or public read.
insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'community-support-proofs',
  'community-support-proofs',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::text[]
)
on conflict (id) do update set
  name = excluded.name,
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

commit;

-- Internal moderation example. Exclusion is a safety control, not a claim
-- about payment receipt; public responses must not expose this state.
-- update public.community_supports
-- set status = 'excluded', admin_notes = 'Reason visible only to admins.'
-- where submission_code = 'AICL-CS-XXXXXXXXXX' and status = 'submitted';
