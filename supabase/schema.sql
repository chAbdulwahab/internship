-- =====================================================
-- RESET / ERASE OLD DATABASE (CLEAN START)
-- =====================================================

-- Drop existing triggers and functions
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user CASCADE;
drop function if exists public.set_updated_at CASCADE;

-- Drop all old tables (CASCADE deletes dependencies)
drop table if exists public.otp_codes cascade;
drop table if exists public.profiles cascade;
drop table if exists public.roles cascade;
drop table if exists public.resumes cascade;
drop table if exists public.educations cascade;
drop table if exists public.work_experiences cascade;
drop table if exists public.certifications cascade;
drop table if exists public.portfolios cascade;
drop table if exists public.freelancer_skill_selections cascade;
drop table if exists public.wallet_connections cascade;

-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- =====================================================
-- 1. UPDATED AT HELPER FUNCTION
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
-- 2. SEPARATE ROLES TABLE (Normalized Structure)
-- =====================================================
create table public.roles (
  id serial primary key,
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

-- Seed default roles
insert into public.roles (name, description) values
  ('Client', 'Standard client or customer account'),
  ('Service Provider', 'Provider offering services or freelancing'),
  ('Admin', 'System administrator with full permissions')
on conflict (name) do nothing;

-- =====================================================
-- 3. PROFILES TABLE (Linked with Auth & Roles)
-- =====================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role_id integer references public.roles(id) on delete set null,
  full_name text,
  avatar_url text,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger for auto updating updated_at column
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- =====================================================
-- 4. OTP CODES TABLE (For Verification & Auth)
-- =====================================================
create table public.otp_codes (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  otp_code varchar(6) not null,
  purpose text not null default 'verification', -- e.g. 'signup', 'login', 'reset_password'
  expires_at timestamptz not null,
  is_used boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index for faster OTP lookup
create index idx_otp_codes_email on public.otp_codes(email);

-- =====================================================
-- 5. AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
-- =====================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  assigned_role_id integer;
  user_role_input text;
begin
  -- Extract role from metadata if provided
  user_role_input := new.raw_user_meta_data ->> 'role';

  -- Find corresponding role ID or default to 'Service Provider'
  select id into assigned_role_id 
  from public.roles 
  where lower(name) = lower(user_role_input) 
  limit 1;

  if assigned_role_id is null then
    select id into assigned_role_id from public.roles where name = 'Service Provider' limit 1;
  end if;

  insert into public.profiles (
    id,
    email,
    role_id,
    full_name
  )
  values (
    new.id,
    new.email,
    assigned_role_id,
    new.raw_user_meta_data ->> 'full_name'
  )
  on conflict (id) do update set
    email = excluded.email,
    updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- =====================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.otp_codes enable row level security;

-- ROLES: Anyone can read available roles
create policy "Allow read access to roles"
on public.roles for select
to authenticated, anon
using (true);

-- PROFILES: Authenticated users & anon can read profiles
create policy "Allow public read access to profiles"
on public.profiles for select
to authenticated, anon
using (true);

-- PROFILES: Users can update their own profile
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- OTP CODES: Allow read/insert for OTP verification logic
create policy "Allow select and insert on otp_codes"
on public.otp_codes for all
to authenticated, anon
using (true)
with check (true);
