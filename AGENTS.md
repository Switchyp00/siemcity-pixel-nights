# Architecture rules

- City destinations come from the typed Location list in `src/world/data/locations.ts`; desktop and mobile only render it — so a shared backend can replace it later.
- World data goes through repository interfaces in `src/world/services/repositories.ts` — so local storage can be swapped for Cloud without touching screens.
- The desktop city (`/city`) is the main web experience; the mobile prototype (`/app`) is kept as a demo — so both stay separate representations of one world.
