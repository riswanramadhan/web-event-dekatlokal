-- Read-only health check for the community-support backend.
-- Run this in the same Supabase project referenced by Vercel Production.
-- It never reads supporter rows or proof objects.

select to_regclass('public.community_supports') as community_supports_table;
 
with expected(column_name) as (
  values
    ('request_id'),
    ('ticker_consent_at'),
    ('proof_sha256'),
    ('status')
)
select
  expected.column_name,
  (columns.column_name is not null) as present,
  columns.is_nullable,
  columns.column_default
from expected
left join information_schema.columns as columns
  on columns.table_schema = 'public'
  and columns.table_name = 'community_supports'
  and columns.column_name = expected.column_name
order by expected.column_name;

select
  column_name,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'community_supports'
  and column_name = 'transfer_date';

select
  constraint_name,
  check_clause
from information_schema.check_constraints
where constraint_schema = 'public'
  and constraint_name in (
    'community_supports_status',
    'community_supports_status_rollout',
    'community_supports_ticker_consent_state'
  )
order by constraint_name;

select
  relrowsecurity as rls_enabled
from pg_class
where oid = to_regclass('public.community_supports');

select
  grantee,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'community_supports'
  and grantee in ('service_role', 'anon', 'authenticated')
order by grantee, privilege_type;

select
  id,
  public,
  file_size_limit,
  allowed_mime_types
from storage.buckets
where id = 'community-support-proofs';

-- Healthy final state:
-- 1. community_supports_table is not null;
-- 2. all four required columns report present = true;
-- 3. transfer_date returns zero rows;
-- 4. status allows only submitted/excluded;
-- 5. RLS is true, service_role has access, anon/authenticated have none;
-- 6. the proof bucket exists, public = false, and the limit is 5 MB.
