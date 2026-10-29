# Database baseline — what is verified and what is not

Project: `nxgdbadfhvvrczgmsmif` (Supabase). Administered through the Lovable workspace.

## Verified from the repo

`src/integrations/supabase/types.ts` is generated from the live database, so the four
tables, their columns and nullability below are trustworthy.

| Table | Columns | Required on insert |
|---|---|---|
| `citizens` | `id`, `username`, `display_name`, `network_address`, `district`, `avatar` (jsonb), `bio`, `tutorial_done`, `created_at`, `updated_at` | `id`, `username`, `network_address` |
| `homebases` | `id`, `owner_id`, `name`, `width`, `height`, `floor`, `placed` (jsonb), `inventory` (jsonb), `settings` (jsonb), `created_at`, `updated_at` | `owner_id`, `name` |
| `district_messages` | `id`, `author_id`, `location_id`, `content`, `created_at` | `location_id`, `content` |
| `message_reports` | `id`, `message_id`, `reporter_id`, `created_at` | `message_id` |

Known relationships: `district_messages.author_id → citizens.id`,
`homebases.owner_id → citizens.id` (one-to-one), and
`message_reports.message_id → district_messages.id`.

A column being optional on insert means the database supplies a default; it does not
tell us the default expression.

## Verified against the live endpoint (read-only)

- `citizens` and `homebases` answer `200 []`; `profiles`, `locations`, `posts`, `messages`,
  `furniture` return 404 and do not exist.
- Auth: signup enabled, email confirmation **required** (`mailer_autoconfirm = false`),
  email provider only, no OAuth, no anonymous sign-in.

## Not verifiable with the publishable key

- RLS policies and their expressions.
- Unique constraints and their exact definitions (handle and network address appear to be
  enforced, since the client handles `23505` on `username`).
- Indexes, triggers, check constraints, grants.
- Column defaults and precise types (`district` may be `int2` or `int4`; timestamps may be
  `timestamptz` or `timestamp`).

`supabase/migrations/20261029000000_baseline_reconstruction.sql` therefore records only
what is verified and marks the rest as outstanding. **Do not apply it to any database.**

## How to capture the real baseline

Run these against the project and commit the output. No writes, no schema changes.

```bash
# 1. Full schema, including policies, indexes, triggers and grants
pg_dump --schema-only --no-owner --no-privileges \
  "$SUPABASE_DB_URL" > docs/mobile/baseline.sql
```

If a direct connection is not available, these queries in the SQL editor produce the same
information per object:

```sql
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies where schemaname = 'public';

select schemaname, tablename, indexname, indexdef
from pg_indexes where schemaname = 'public';

select c.relname as table_name, con.conname, con.contype, pg_get_constraintdef(con.oid) as definition
from pg_constraint con
join pg_class c on c.oid = con.conrelid
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public';

select tgname, tgrelid::regclass as table_name, pg_get_triggerdef(oid)
from pg_trigger where not tgisinternal;

select column_name, data_type, column_default, is_nullable
from information_schema.columns
where table_schema = 'public' order by table_name, ordinal_position;
```

Resulting file replaces the reconstruction and becomes the authoritative migration.
