# Handover kit changelog

What changed in each version of `public/handover/`, newest first.

All four files carry the same version, so "am I on the latest?" is one question,
not four. Check the stamp at the top of any file against the newest heading
below. When you re-pull, bump the version string in the theme's
`wp_enqueue_style` / `wp_enqueue_script` calls to match, so a stale browser
cache is never the difference between "fixed" and "still broken".

Pull from `master` — see the direct links in `HANDOVER.md`.

## 1.1.0 — 2026-08-18

**Nav label renamed: "Learning Hub" is now "Vantiq Academy".**

- `shell.html` — the sidebar nav group label and its collapse button's
  `aria-label` both now read "Vantiq Academy". The group's `id` and the
  `aria-controls` / panel id are deliberately **unchanged** (still
  `nav-learning`), so no PHP that targets those hooks needs editing. This is a
  visible-text change only.
- The route is unchanged too — Academy pages still live under `/academy`. No
  permalinks move.
- `vantiq-portal.css`, `vantiq-interface.js`, `handover.html` — no functional
  change; version stamps moved with the release.

`shell.html` and `handover.html` carry a version stamp for the first time in
this release. Before now only the CSS and JS were stamped, which meant a change
to the shell reference was invisible to anyone checking whether they had the
current copy.

## 1.0.0 — 2026-08-14

First versioned drop of the kit.

- `vantiq-portal.css` — tokens as CSS custom properties, component classes
  reading from those tokens, and a `.vq-root`-scoped reset that neutralizes the
  host theme without `!important`.
- `vantiq-interface.js` — sitewide interactivity (accordions, mobile nav
  drawer, pop-out menus, modal dialogs), driven by `data-vq-*` attributes.
- `shell.html` — hand-written header + sidebar reference. Not copy-pasted from
  the running app on purpose: the real header's menus render into portals that
  only exist in the DOM while open, so a copy captures the trigger buttons with
  no panels behind them.
- `handover.html` — every component class rendered next to the markup that
  produced it, styled only by `vantiq-portal.css`.

Known gaps at this version are listed in `HANDOVER.md` (placeholder icon paths,
no dark mode, no page-specific JS files yet). They still stand at 1.1.0.
