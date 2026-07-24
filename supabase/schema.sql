create extension if not exists pgcrypto;

-- =====================================================
-- UPDATED AT FUNCTION
-- =====================================================

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

-- =====================================================
-- PROFILES
-- =====================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,

  role text not null default 'freelancer'
    check (
      role in (
        'freelancer',
        'employer',
        'agency',
        'service_provider',
        'affiliate_marketer',
        'investor'
      )
    ),

  first_name text,
  last_name text,
  country_of_residence text,
  country_of_citizenship text,
  phone text,
  english_proficiency text,
  notice_period text,
  job_commitment text,
  preferred_hourly_rate numeric(12,2),
  timezone text,

  onboarding_step text not null default 'upload-resume'
    check (
      onboarding_step in (
        'upload-resume',
        'setup-profile',
        'choose-skill',
        'connect-wallet',
        'complete-profile',
        'completed'
      )
    ),

  onboarding_completed boolean not null default false,
  profile_completed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at
on public.profiles;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- =====================================================
-- CREATE PROFILE AFTER SIGNUP
-- =====================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_role text;
begin
  selected_role :=
    case
      when new.raw_user_meta_data ->> 'role' in (
        'freelancer',
        'employer',
        'agency',
        'service_provider',
        'affiliate_marketer',
        'investor'
      )
      then new.raw_user_meta_data ->> 'role'
      else 'freelancer'
    end;

  insert into public.profiles (
    id,
    email,
    role,
    onboarding_step
  )
  values (
    new.id,
    new.email,
    selected_role,
    'upload-resume'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- =====================================================
-- RESUMES
-- =====================================================

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  file_name text not null,
  file_path text not null unique,
  mime_type text not null,
  file_size bigint not null check (file_size > 0),

  extraction_status text not null default 'pending'
    check (
      extraction_status in (
        'pending',
        'processing',
        'completed',
        'partial',
        'failed'
      )
    ),

  extracted_text text,
  extracted_data jsonb not null default '{}'::jsonb,
  extraction_error text,

  is_primary boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resumes_user_id_idx
on public.resumes(user_id);

drop trigger if exists resumes_set_updated_at
on public.resumes;

create trigger resumes_set_updated_at
before update on public.resumes
for each row
execute function public.set_updated_at();

-- =====================================================
-- EDUCATION
-- =====================================================

create table if not exists public.educations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  degree text,
  university text,
  start_month text,
  start_year integer,
  end_month text,
  end_year integer,
  is_current boolean not null default false,

  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists educations_user_id_idx
on public.educations(user_id);

drop trigger if exists educations_set_updated_at
on public.educations;

create trigger educations_set_updated_at
before update on public.educations
for each row
execute function public.set_updated_at();

-- =====================================================
-- WORK EXPERIENCE
-- =====================================================

create table if not exists public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  position text,
  workplace text,
  start_month text,
  start_year integer,
  end_month text,
  end_year integer,
  is_current boolean not null default false,
  description text,

  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists work_experiences_user_id_idx
on public.work_experiences(user_id);

drop trigger if exists work_experiences_set_updated_at
on public.work_experiences;

create trigger work_experiences_set_updated_at
before update on public.work_experiences
for each row
execute function public.set_updated_at();

-- =====================================================
-- CERTIFICATIONS
-- =====================================================

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  certificate_name text,
  certificate_link text,
  certificate_file_path text,

  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists certifications_user_id_idx
on public.certifications(user_id);

drop trigger if exists certifications_set_updated_at
on public.certifications;

create trigger certifications_set_updated_at
before update on public.certifications
for each row
execute function public.set_updated_at();

-- =====================================================
-- PORTFOLIOS
-- =====================================================

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  title text,
  portfolio_link text,
  portfolio_file_path text,
  description text,

  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolios_user_id_idx
on public.portfolios(user_id);

drop trigger if exists portfolios_set_updated_at
on public.portfolios;

create trigger portfolios_set_updated_at
before update on public.portfolios
for each row
execute function public.set_updated_at();

-- =====================================================
-- FREELANCER SKILLS
-- =====================================================

create table if not exists public.freelancer_skill_selections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,

  category text not null,
  subcategory text not null,
  skills text[] not null default '{}',
  suggested_skills text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists freelancer_skills_set_updated_at
on public.freelancer_skill_selections;

create trigger freelancer_skills_set_updated_at
before update on public.freelancer_skill_selections
for each row
execute function public.set_updated_at();

-- =====================================================
-- WALLET CONNECTIONS
-- =====================================================

create table if not exists public.wallet_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  provider text not null,
  wallet_address text not null,
  network text,
  is_primary boolean not null default true,

  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, wallet_address)
);

create index if not exists wallet_connections_user_id_idx
on public.wallet_connections(user_id);

drop trigger if exists wallet_connections_set_updated_at
on public.wallet_connections;

create trigger wallet_connections_set_updated_at
before update on public.wallet_connections
for each row
execute function public.set_updated_at();

-- =====================================================
-- ENABLE RLS
-- =====================================================

alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.educations enable row level security;
alter table public.work_experiences enable row level security;
alter table public.certifications enable row level security;
alter table public.portfolios enable row level security;
alter table public.freelancer_skill_selections enable row level security;
alter table public.wallet_connections enable row level security;

-- =====================================================
-- PROFILES POLICY
-- =====================================================

drop policy if exists "Users manage own profile"
on public.profiles;

create policy "Users manage own profile"
on public.profiles
for all
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- =====================================================
-- RESUMES POLICY
-- =====================================================

drop policy if exists "Users manage own resumes"
on public.resumes;

create policy "Users manage own resumes"
on public.resumes
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- =====================================================
-- EDUCATION POLICY
-- =====================================================

drop policy if exists "Users manage own education"
on public.educations;

create policy "Users manage own education"
on public.educations
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- =====================================================
-- EXPERIENCE POLICY
-- =====================================================

drop policy if exists "Users manage own experience"
on public.work_experiences;

create policy "Users manage own experience"
on public.work_experiences
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- =====================================================
-- CERTIFICATIONS POLICY
-- =====================================================

drop policy if exists "Users manage own certifications"
on public.certifications;

create policy "Users manage own certifications"
on public.certifications
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- =====================================================
-- PORTFOLIOS POLICY
-- =====================================================

drop policy if exists "Users manage own portfolios"
on public.portfolios;

create policy "Users manage own portfolios"
on public.portfolios
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- =====================================================
-- SKILLS POLICY
-- =====================================================

drop policy if exists "Users manage own skill selection"
on public.freelancer_skill_selections;

create policy "Users manage own skill selection"
on public.freelancer_skill_selections
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- =====================================================
-- WALLET POLICY
-- =====================================================

drop policy if exists "Users manage own wallets"
on public.wallet_connections;

create policy "Users manage own wallets"
on public.wallet_connections
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- =====================================================
-- PRIVATE RESUME BUCKET
-- =====================================================

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'resumes',
  'resumes',
  false,
  6291456,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id)
do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- =====================================================
-- RESUME STORAGE POLICIES
-- Files must use: user-id/file-name
-- =====================================================

drop policy if exists "Users view own resume files"
on storage.objects;

create policy "Users view own resume files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users upload own resume files"
on storage.objects;

create policy "Users upload own resume files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users update own resume files"
on storage.objects;

create policy "Users update own resume files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users delete own resume files"
on storage.objects;

create policy "Users delete own resume files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
