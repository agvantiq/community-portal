# WordPress handover

This is the portable kit for rebuilding the Community Portal as a WordPress/Astra
child theme — plain CSS and JS with no framework, no build step, and no
dependencies, meant to be copied into PHP templates by hand.

See the "WordPress handover" section of `CLAUDE.md` for the rules this kit exists
to enforce and the incidents each rule traces back to. This file is the *how*;
that one is the *why*.

## What's here

All of it lives in `public/handover/`, checked into this repo — not an emailed
zip. That's deliberate: a single source of truth that can't go stale between a
"here's the fix" email and someone remembering to re-send it.

- **`vantiq-portal.css`** — the stylesheet. Tokens (color/radius/shadow/font) as
  CSS custom properties, component classes read from those tokens, a scoped
  reset that neutralizes the host theme without `!important`.
- **`vantiq-interface.js`** — sitewide interactivity: accordions, the mobile nav
  drawer, pop-out menus, modal dialogs. Driven entirely by `data-vq-*`
  attributes. No content, no data, no fetching — interface only.
- **`shell.html`** — the header + sidebar, hand-written and kept in sync with
  the real nav structure in `components/shell/app-sidebar.tsx`. View-source it
  and copy what you need.
- **`handover.html`** — every component class rendered next to the markup that
  produced it. Styled only by `vantiq-portal.css`, so if something in the CSS
  is wrong, this page shows it.

Page-specific interactivity (search, sort, filter — anything with local state
beyond the sitewide patterns) gets its own `vantiq-<page>.js`, added as a page
actually needs it. None exist yet as of this version.

## Using it

1. Copy `vantiq-portal.css` and `vantiq-interface.js` into the theme and
   enqueue them:

   ```php
   wp_enqueue_style( 'vantiq-portal',
       get_stylesheet_directory_uri() . '/css/vantiq-portal.css', [], '1.0.0' );
   wp_enqueue_script( 'vantiq-interface',
       get_stylesheet_directory_uri() . '/js/vantiq-interface.js', [], '1.0.0', true );
   ```

   The version string (`'1.0.0'`) should match the version comment at the top
   of each file — bump both together so a stale browser cache is never the
   difference between "fixed" and "still broken."

2. Put `class="vq-root"` on one wrapper that contains everything copied from
   the mockup — commonly `<body>`, or the theme's main content block. Every
   rule in the stylesheet is scoped inside that wrapper; nothing leaks out to
   Astra's own header, footer, or admin bar, and nothing from Astra leaks in.

3. Copy markup from the **running app** (`npm run dev`,
   `http://localhost:3000/community-portal`), not the static `npm run build`
   export. The static export has no role state, so it renders the signed-out
   default — which has no sidebar. Switch roles in the header role-switcher to
   see the different nav/dashboard states before copying.

4. The one exception: `shell.html` stays hand-written, not copy-pasted. The
   real header's menus (search, notifications, account) render into React
   portals that only exist in the DOM while open — copying the rendered page
   captures the trigger buttons with no panels behind them. `shell.html`
   already has the full pattern (button + panel) for each one.

## Keeping it in sync

- **New interactive pattern added to a page** (a filter, a new kind of
  dropdown): its vanilla-JS equivalent belongs in this kit in the same change
  that adds it to the mockup, not as a follow-up once WordPress hits the gap.
- **Design tokens change** (`app/globals.css`): re-derive the `--vq-*` custom
  properties at the top of `vantiq-portal.css` from the new values. Don't
  hand-adjust a component rule to compensate — fix it at the token.
- **A settings cheat sheet for the host theme's own customizer** (Astra, or
  whatever comes next): generate it from the actual token values in
  `vantiq-portal.css`, never type it from memory.
- Bump the version comment at the top of whichever file changed, every time it
  changes, even for a small fix.

## Known gaps in this version (1.0.0, 2026-08-14)

- Several icons in `shell.html` and `handover.html` are labeled
  `<!-- placeholder -->` — simplified shapes, not the exact `lucide-react`
  path data. The one exact, verified path (`handshake`, for Sales Hub) is
  marked as such. Swap the rest for the real paths from the running app when
  pixel-parity on icons matters.
- Dark mode is not included. The live app has a `.dark` token set in
  `app/globals.css`; if WordPress ever needs it, mirror that block onto the
  `--vq-*` custom properties the same way the light set was derived.
- No page-specific JS files exist yet (search/sort/filter on a content page,
  for instance). Add `vantiq-<page>.js` the same way `vantiq-interface.js` was
  built — plain JS, data-attribute driven, documented at the top of the file —
  as each page actually needs one.
