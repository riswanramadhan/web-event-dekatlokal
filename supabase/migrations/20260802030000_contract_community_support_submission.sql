-- Contract phase for the immediate-success community-support flow.
-- Apply only after every old app instance has been drained from production.

begin;

alter table public.community_supports
  add column if not exists ticker_consent_at timestamptz;

drop trigger if exists normalize_community_support_status_timestamps
  on public.community_supports;
drop function if exists public.normalize_community_support_status_timestamps();
drop function if exists public.get_community_support_totals();
drop index if exists public.community_supports_verified_latest_idx;

alter table public.community_supports
  alter column display_publicly set default false,
  alter column status set default 'submitted',
  drop constraint if exists community_supports_transfer_date_reasonable,
  drop constraint if exists community_supports_status_timestamps,
  drop constraint if exists community_supports_status_rollout,
  drop constraint if exists community_supports_status,
  drop constraint if exists community_supports_ticker_consent_rollout,
  drop constraint if exists community_supports_ticker_consent_state;

-- Preserve legacy submissions while replacing verification semantics with an
-- internal moderation state. No legacy public-display choice is interpreted
-- as explicit ticker consent.
update public.community_supports
set status = case status
  when 'pending' then 'submitted'
  when 'verified' then 'submitted'
  when 'rejected' then 'excluded'
  else status
end
where status in ('pending', 'verified', 'rejected');

update public.community_supports
set display_publicly = false
where ticker_consent_at is null
  and display_publicly;

alter table public.community_supports
  add constraint community_supports_status
    check (status in ('submitted', 'excluded')) not valid,
  add constraint community_supports_ticker_consent_state
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
    ) not valid;

alter table public.community_supports
  validate constraint community_supports_status;
alter table public.community_supports
  validate constraint community_supports_ticker_consent_state;

alter table public.community_supports
  drop column if exists transfer_date,
  drop column if exists verified_at,
  drop column if exists verified_by,
  drop column if exists rejected_at;

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
  'Internal moderation state only: submitted is eligible for consented display; excluded is hidden.';

commit;
