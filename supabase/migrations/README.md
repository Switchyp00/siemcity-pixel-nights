# Migrations

There were no migrations in this repository before this branch. Nothing here has been
applied to any database.

## Status

`20261029000000_baseline_reconstruction.sql` is a **reconstruction, not a baseline.** It
records the columns, nullability and known foreign keys of the four live tables, taken from
the generated `Database` types. It deliberately contains no RLS policies, unique
constraints, indexes, triggers or default expressions, because those cannot be read with
the publishable key and must not be guessed.

**Do not apply it.** Applying it to the live project would create duplicate objects or
silently disagree with the real definitions.

## What replaces it

A `pg_dump --schema-only` of the live project, or the equivalent queries in
`docs/mobile/DATABASE_BASELINE.md`. That dump becomes
`20261029000001_baseline_verified.sql` and the reconstruction is deleted in the same change.

## Rules for every later migration

1. One concern per file, timestamped, forward-only.
2. Applied to a staging or branch database first, never straight to production.
3. RLS is part of the migration, not a dashboard click.
4. Every new table gets policies in the same commit that creates it.
