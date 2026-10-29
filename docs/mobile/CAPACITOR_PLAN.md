# Capacitor plan for SIEMCITY

Goal: one React codebase serving web, Android and iOS, against the existing Supabase
project. No fork of the backend and no second identity system.

## Why Capacitor fits this codebase

- Client-side routing only (`BrowserRouter`), no SSR, no server runtime to replace.
- The mobile product already exists as `/app/*` inside a `max-w-md` column.
- Auth is email/password over `supabase-js`; no OAuth deep-link dance is needed for v1.
- Vite builds a static `dist/` that Capacitor can bundle directly.

## Deliverables, in order

1. **PWA (interim test channel).** `manifest.webmanifest`, icons, `theme-color`, a minimal
   service worker for an offline shell, and `viewport-fit=cover` in `index.html`. Installable
   from the browser today, no store, no cost.
2. **Android.** Capacitor project with app id `com.siemcity.app`, built to an AAB in
   Android Studio. Requires JDK 17 + Android Studio on the machine that builds it.
3. **iOS.** Same project, `ios/` target opened in Xcode. Requires macOS, Xcode and an Apple
   developer account; cannot be produced on Windows.

## Implementation steps

```bash
npm i @capacitor/core @capacitor/cli @capacitor/preferences @capacitor/status-bar @capacitor/splash-screen
npx cap init SIEMCITY com.siemcity.app --web-dir=dist
npx cap add android
npx cap add ios          # macOS only
npm run build && npx cap sync
```

`capacitor.config.ts` essentials:

```ts
{
  appId: "com.siemcity.app",
  appName: "SIEMCITY",
  webDir: "dist",
  server: { androidScheme: "https" },
  plugins: { SplashScreen: { launchAutoHide: false } },
}
```

## The five areas that need real work

### 1. Secure session persistence
`brokeredPreviewStorage()` falls back to `localStorage`. In the shell, swap in a Capacitor
storage adapter so the session survives restarts and sits in Keychain/Keystore. The auth
flow itself does not change.

### 2. Safe areas
`index.html` currently sets a plain viewport. Change to
`width=device-width, initial-scale=1.0, viewport-fit=cover` and pad the shell with
`env(safe-area-inset-top/bottom/left/right)`. Affected: `AppShell` bottom tabs, the fixed
`Navbar`, and any full-height screen using `min-h-[100dvh]`.

### 3. City layout adaptation
`src/world/data/locations.ts` positions buildings with `desktopPosition: {x, bottom, width, z}`.
Desktop coordinates do not translate to a 390 px viewport. Two options: a `mobilePosition`
per location, or route the shell's city entry to the existing `/app/city` map. The second is
zero-risk and recommended for the first release; the first is the eventual immersive answer.

### 4. Routing in the shell
Capacitor serves `dist/` from a local server and resolves `BrowserRouter` paths internally,
so `/app/home` works. What still breaks is a cold start on a deep path from a shared link,
and any external `/app` link on GitHub Pages. Add a `404.html` fallback for Pages, and treat
in-shell entry as always starting at `/app`.

### 5. Redirect allow-list
Confirmation and reset emails use `window.location.origin`. Add `https://localhost`
(Capacitor) and any staging origin to the Supabase redirect allow-list before testing auth
on device. This is a project setting, not a code change.

## Build and test requirements

| Target | Needs |
|---|---|
| Web / PWA | Node 20+, `npm ci`, `npm run build` |
| Android | JDK 17, Android Studio + SDK 34, a signing keystore, Play Console for release |
| iOS | macOS, Xcode 15+, CocoaPods, Apple developer account, TestFlight for distribution |
| Device testing | A Supabase user that has confirmed email and a citizen row |

None of these toolchains exist in the environment where this audit was written, so every
build claim must come from CI or the user's machine.

## Risks

- No automated tests currently exercise auth or the repository layer; a device build would be
  the first real integration check.
- WebView storage and lifecycle differ per OS; session restore must be tested on low-storage
  iOS devices specifically.
- GitHub Pages cannot rewrite routes, so PWA links and store-less sharing stay fragile until
  a host with rewrites is chosen.
- The Lovable-preview auth broker is dead code in a native shell; it must not be relied on.
