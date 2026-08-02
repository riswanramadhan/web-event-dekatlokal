-- Expand phase for deployments that previously used transfer dates and a
-- pending/verified/rejected workflow. Apply this before deploying the new app.
-- The temporary constraints accept both app versions during a rolling deploy.

begin;

alter table public.community_supports
  add column if not exists ticker_consent_at timestamptz;

alter table public.community_supports
  alter column display_publicly set default false,
  alter column status set default 'submitted';

-- The upgraded app no longer sends a transfer date. Keep the legacy column
-- nullable during the compatibility window so old and new app instances work.
do $$
begin
  if exists (
    select 1
    from pg_attribute
    where attrelid = 'public.community_supports'::regclass
      and attname = 'transfer_date'
      and not attisdropped
  ) then
    alter table public.community_supports
      alter column transfer_date drop not null;
  end if;
end;
$$;

alter table public.community_supports
  drop constraint if exists community_supports_transfer_date_reasonable,
  drop constraint if exists community_supports_status_timestamps,
  drop constraint if exists community_supports_status,
  drop constraint if exists community_supports_status_rollout,
  drop constraint if exists community_supports_ticker_consent_state,
  drop constraint if exists community_supports_ticker_consent_rollout;

-- Old instances may still write the legacy values until the rollout is fully
-- drained. New instances write only submitted/excluded.
alter table public.community_supports
  add constraint community_supports_status_rollout
    check (
      status in (
        'pending',
        'verified',
        'rejected',
        'submitted',
        'excluded'
      )
    ) not valid;

alter table public.community_supports
  validate constraint community_supports_status_rollout;

-- A null timestamp never grants ticker eligibility. The compatibility form
-- intentionally allows legacy display_publicly=true rows to remain unlisted.
alter table public.community_supports
  add constraint community_supports_ticker_consent_rollout
    check (
      ticker_consent_at is null
      or (
        display_publicly
        and not is_anonymous
        and supporter_name is not null
      )
    ) not valid;

alter table public.community_supports
  validate constraint community_supports_ticker_consent_rollout;

create index if not exists community_supports_ticker_latest_idx
  on public.community_supports (created_at desc)
  where status = 'submitted'
    and display_publicly
    and not is_anonymous
    and ticker_consent_at is not null
    and supporter_name is not null;

comment on column public.community_supports.ticker_consent_at is
  'Timestamp of explicit consent to show the masked name and self-reported amount in the public ticker.';
comment on column public.community_supports.status is
  'Compatibility phase: new writes use submitted/excluded; legacy values are removed by the contract migration.';

commit;
