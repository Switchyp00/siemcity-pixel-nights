# Authentication — current implementation and proposed changes

Nothing here changes behaviour. It documents what exists so any change is reviewed
before it lands.

## Current flow (verified in source)

1. `CitizenProvider` subscribes to `supabase.auth.onAuthStateChange` and calls
   `getSession()` on mount, then loads the citizen and homebase for the signed-in user.
2. `Onboarding` boots a terminal sequence, then offers **Create citizen** or **Log in**.
3. Sign-up calls `supabase.auth.signUp` with `emailRedirectTo: ${origin}/app`.
   The project requires email confirmation, so no session is returned immediately and the
   UI moves to a "check your inbox" step.
4. After confirmation the user logs in; if the session exists but no citizen row does, the
   flow jumps to the handle step.
5. Handle step validates `^[a-zA-Z0-9_]{3,16}$`, checks availability with a case-insensitive
   `ilike` lookup, then opens the avatar creator.
6. Saving calls `citizens.insert` with the auth user id as the primary key, a generated
   `192.SC.xx.yy` address and the avatar JSONB. A `23505` on `username` surfaces as
   "Handle already on the network"; other `23505`s trigger up to 8 address retries.
7. A starter homebase is created immediately after the citizen.
8. Password reset sends `resetPasswordForEmail` to `/reset-password`.
9. Session storage is `brokeredPreviewStorage()`: a Lovable editor postMessage broker on
   preview hosts, otherwise `localStorage`.

## Observations

- The citizen's `id` equals the auth user id, so one identity spans every client. This is
  the property the mobile apps must preserve.
- Handle uniqueness is enforced twice: a client pre-check and a database constraint. Only
  the constraint is authoritative.
- `emailRedirectTo` and the reset `redirectTo` are built from `window.location.origin`, so
  any new origin (Capacitor's `https://localhost`, a staging domain) must be added to the
  Supabase redirect allow-list before those emails will work there.
- Session durability relies on `localStorage`. That is acceptable in browsers, but iOS may
  evict it under storage pressure, and it is not protected at rest.

## Proposed changes (each needs approval)

1. **Session storage adapter for native.** Keep `localStorage` for web, switch to
   `@capacitor/preferences` (backed by Keychain/Keystore via a secure-storage plugin)
   inside the native shell. No change to the auth flow.
2. **Redirect allow-list entries** for `https://localhost` (iOS/Android shell) and a
   staging origin, so confirmation and reset emails work off-web.
3. **Surface auth errors verbatim** for the mobile shell: the current copy is friendly but
   loses the provider's reason, which makes device debugging hard.
4. **Verify the unique constraints** against the real schema before relying on the retry
   loop; if `username` is not uniquely indexed case-insensitively, add a migration.
5. **Do not** add OAuth, magic links, anonymous sign-in or account merging in this phase.

## Explicitly unchanged without further approval

- Existing auth users, their passwords, confirmation state and citizen rows.
- Email templates, SMTP configuration, signup openness.
- Any policy on `citizens`, `homebases`, `district_messages`, `message_reports`.
