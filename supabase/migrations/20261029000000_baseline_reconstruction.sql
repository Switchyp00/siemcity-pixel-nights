-- SIEMCITY — baseline schema RECONSTRUCTION
--
-- STATUS: reference only. DO NOT APPLY.
--
-- Everything below was derived from src/integrations/supabase/types.ts, which is
-- generated from the live project. Column names, nullability and the known foreign
-- keys are accurate. The following are NOT captured here because they cannot be
-- read with the publishable key, and must come from a pg_dump instead:
--
--   * row level security policies
--   * unique / check constraints (handle and network address uniqueness live there)
--   * indexes
--   * triggers and updated_at maintenance
--   * default expressions and exact integer/timestamp types
--
-- Replacing file: 20261029000001_baseline_verified.sql (from `pg_dump --schema-only`)
-- See docs/mobile/DATABASE_BASELINE.md for the export commands.

create table if not exists public.citizens (
  -- NOTE: the client supplies id = auth.users.id; there is no default (verified:
  -- id is required on insert while other columns are optional).
  id              uuid        primary key,
  username        text        not null,
  display_name    text,
  network_address text        not null,
  district        integer,
  avatar          jsonb,
  bio             text,
  tutorial_done   boolean,
  created_at      timestamptz,
  updated_at      timestamptz
);

create table if not exists public.homebases (
  id         uuid        primary key default gen_random_uuid(),
  owner_id   uuid        not null references public.citizens (id),
  name       text        not null,
  width      integer,
  height     integer,
  floor      text,
  placed     jsonb,
  inventory  jsonb,
  settings   jsonb,
  created_at timestamptz,
  updated_at timestamptz
);

-- owner_id is one-to-one in the live project: a citizen has at most one homebase.
create unique index if not exists homebases_owner_id_key on public.homebases (owner_id);

create table if not exists public.district_messages (
  id          uuid        primary key default gen_random_uuid(),
  author_id   uuid        references public.citizens (id),
  location_id text        not null,
  content     text        not null,
  created_at  timestamptz
);

create table if not exists public.message_reports (
  id          uuid        primary key default gen_random_uuid(),
  message_id  uuid        not null references public.district_messages (id),
  reporter_id uuid        references public.citizens (id),
  created_at  timestamptz
);

-- REQUIRED BEFORE THIS FILE COULD EVER BECOME A REAL MIGRATION:
--   1. confirm handle uniqueness is case-insensitive, e.g.
--        create unique index on public.citizens (lower(username));
--   2. confirm network_address uniqueness;
--   3. enable RLS on all four tables and add policies for select/insert/update;
--   4. add updated_at triggers if the live project has them.
