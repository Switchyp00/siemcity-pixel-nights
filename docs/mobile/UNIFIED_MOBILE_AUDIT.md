# SIEMCITY Unified Mobile — Source Audit

Branch: `feat/unified-mobile`, created from `main` at `96c0ada` (11 Oct 2026).
Nothing in this branch is deployed: the Pages workflow runs only on pushes to `main`.

## Repository facts

| | |
|---|---|
| Repo | `Switchyp00/siemcity-pixel-nights` (public) |
| Default branch | `main` @ `96c0ada` |
| Stack | Vite 8, React 18, TypeScript 5.8, React Router 6, Tailwind 3, shadcn/Radix, TanStack Query, framer-motion, Supabase JS 2.117 |
| Tests | vitest (unit) and Playwright (e2e) configured, no test files found under `src` at audit time |
| Hosting | GitHub Pages via `.github/workflows/main.yml`, build on push to `main` |
| Backend | Supabase project `nxgdbadfhvvrczgmsmif`, reachable directly at `https://nxgdbadfhvvrczgmsmif.supabase.co`; the `lovable.cloud` URL is a proxy in front of it |
| Schema in repo | None. `supabase/` contains only `config.toml` and one edge function; `drizzle/schema.ts` is intentionally blank |

## Routes (from `src/App.tsx`)

`/`, `/projects/siemcity-v2` (+ `/phase-2`, `/phase-3`, `/phase-4`), `/community`,
`/city`, `/city/:slug`, `/reset-password`, `/app/*` (mobile world),
`/citizen` (desktop shell: index, `home`, `creator`), catch-all 404.

## Core modules

- `src/world/` — the mobile product: onboarding, homebase editor, city map, social, missions, profile, avatar creator, repository layer.
- `src/desktop/` — desktop shell, profile, home, creator.
- `src/city/` — building, ambient and destination-preview components.
- `src/integrations/supabase/` — client, generated `Database` types, preview auth storage.
- `src/components/ui/` — shadcn primitives.

## Refined A/B/C inventory

### A. Working and reusable

- Supabase email/password auth: sign-up with verification, sign-in, password reset (`Onboarding.tsx`).
- Citizen creation: handle validation `^[a-zA-Z0-9_]{3,16}$`, generated `192.SC.xx.yy` network address, district, avatar JSONB (`repositories.ts`, `networkAddress.ts`).
- Homebase: starter layout, room grid, placement validation, rotate/store/place, starter furniture catalogue.
- Avatar system: sprite rendering plus 22 KB of part definitions; layered sprite work exists on the unmerged branch.
- Profile edit, sign-out, mission checklist, AI mission generator (edge function `generate-mission`).
- Marketing site, city artwork, desktop shell and routing.
- Session handling: `onAuthStateChange` plus a user-scoped load cache in `CitizenContext`.

### B. Present but incomplete

- `SocialScreen` lists four hardcoded simulated citizens (`simCitizens.ts`); friend requests are a toast stub.
- `CityScreen` lists four locations, two marked under construction.
- `MissionsScreen` is four static conditions.
- PWA: no manifest, no service worker, viewport lacks `viewport-fit=cover`.
- Deep links: `/city` and `/app` return 404 when loaded directly on GitHub Pages (no SPA fallback).

### C. Not implemented on `main`

- Real friends/social graph, direct messages, notifications, packets/search.
- Projects and guides as data; furniture ownership per citizen (catalogue is client constants).
- Presence/realtime (implemented on the unmerged branch only).
- Any native client.

## `feature/district-social-overlay` — inspection

24 commits ahead of `main`, 0 behind, unmerged and undeployed. Contents:

- District social overlay + `DistrictChat.tsx` (text chat backed by `district_messages`), presence published on channel join and reconnect, chat history de-duplicated against realtime, voice controls deliberately hidden.
- Avatar artwork: four selectable base models, layered sprites (`AvatarSprite.tsx` 2.4 KB → 11.2 KB), refined hair/collar/zipper detail.
- A pixel-art production standard document under `docs/`.

**Avatar artwork can be incorporated safely in a later change.** It is additive: new/expanded art components and data, no schema change and no change to auth. Recommended path is a focused follow-up branch that takes only the avatar art commits, leaving the district chat/presence work to be reviewed separately, because chat introduces realtime subscriptions and new write paths that deserve their own review.

## `.env` audit

Committed at repo root in a public repository. Contents are client configuration only:

| Variable | Class | Notes |
|---|---|---|
| `VITE_SUPABASE_PROJECT_ID` | Public | Project reference; exposed in any case |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public by design | `sb_publishable_...`; access is governed by RLS, not secrecy |
| `VITE_SUPABASE_URL` | Public | Endpoint URL |

No service-role key, database password, JWT signing secret or provider API key is committed. The AI provider key (`LOVABLE_API_KEY`) is read server-side in the edge function only.

Recommendations: keep `.env` out of version control and inject the three variables at build time; if the publishable key is ever rotated, update it in the deployment settings rather than the repo; treat RLS as the only real boundary.

## Risks carried into the next phase

1. No migrations, so the schema and RLS cannot be reviewed or reproduced. See `docs/mobile/DATABASE_BASELINE.md`.
2. RLS policies are unverified. Until they are read, we cannot claim users cannot modify other citizens.
3. `district_messages` exists on `main` with no UI, while a full chat implementation sits unmerged; decide its future before adding more clients to the table.
4. Open signup with email confirmation on; confirmations depend on whichever SMTP the project uses.
5. GitHub Pages does not rewrite routes, so shared `/app` links 404 outside the SPA.
