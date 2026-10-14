# SIEMCITY visual-first avatar art direction (v1)

Reference: the user-approved desktop Citizen Creator and Homebase mockups (October 2026). This is an implementation specification, not a claim that the art has been produced.

## Visual bar
- High-detail hand-authored pixel art: deliberate silhouettes, pixel clusters, material shading, rim lights, seams, zippers, pockets, shoelaces, individual hair clumps, expressive faces.
- Neon cyan/magenta accents, deep navy shadows, restrained highlights. Preserve the existing district interior backgrounds.
- No vector-smooth cartoon rendering, flat block placeholders, blurry resampling, or AI-generated one-piece character images masquerading as customizable sprites.
- Pixel assets must be rendered with nearest-neighbor scaling (`image-rendering: pixelated`), transparent backgrounds, and consistent anchors.

## Avatar asset contract
- Four base looks: Classic, Techwear, Cyber, Rogue. These are *presets*, not locked classes.
- One canonical front-facing sprite coordinate system and consistent head, shoulders, waist, hand and foot anchors across all options.
- Separate transparent layers: base body/skin, facial features, back hair, bottoms, shoes, tops, front hair, accessories; some items may require back/front sublayers.
- Each layer must use identical canvas dimensions and origin, so any of the existing 20 tops, 15 bottoms, 15 shoes, and 20 accessories can be composed without changing the saved avatar schema.
- Preserve existing part IDs, palette semantics, legacy migration, Citizen persistence, and use in districts/Homebase.
- Begin with one *fully layered* detailed Classic outfit, then validate mixing one item from each category before extending to all four looks. Do not switch every avatar to the new renderer until coverage is complete.
- Provide art fallbacks for missing layer assets. Never silently render blank or pretend every outfit is complete.

## Proposed asset organization
`src/assets/avatars/v2/<category>/<part-id>.png` for transparent layer assets. Add a typed manifest mapping existing IDs to assets and optional palette masks. Avoid overwriting current avatar parts until tested.

## Acceptance checks
1. Four presets remain fully customizable.
2. Saved Citizens display the same selected look in Creator, Homebase, and districts.
3. At least one complete layered outfit visibly matches the detailed reference quality before declaring the art upgrade shipped.
4. No missing sprites, offsets, transparency halos, clipping, or blurry pixel scaling at typical desktop resolutions.
5. Existing Citizens retain their avatars; absent v2 assets fall back to the current renderer.
6. Screens remain responsive and usable with keyboard/mouse.

## Homebase after avatar milestone
Create room/furniture artwork as separate layered, interactive assets, not a flattened screenshot. Preserve furniture IDs, placement, rotation, inventory and saved layouts.
