-- Upgrade path for environments that applied the community-support ledger
-- before request idempotency was added to the initial migration.

begin;

alter table public.community_supports
  add column if not exists request_id uuid;

-- Legacy QA rows cannot be hashed without reading each private object. They
-- may remain null; every submission written by the upgraded API supplies a
-- 64-character SHA-256 value. Fresh installs enforce NOT NULL in migration 1.
alter table public.community_supports
  add column if not exists proof_sha256 text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.community_supports'::regclass
      and conname = 'community_supports_proof_sha256'
  ) then
    alter table public.community_supports
      add constraint community_supports_proof_sha256
      check (proof_sha256 is null or proof_sha256 ~ '^[0-9a-f]{64}$');
  end if;
end;
$$;

update public.community_supports
set request_id = gen_random_uuid()
where request_id is null;

alter table public.community_supports
  alter column request_id set not null;

create unique index if not exists community_supports_request_id_key
  on public.community_supports (request_id);

comment on column public.community_supports.request_id is
  'Private client-generated idempotency key; never expose in public responses.';

commit;
