# Handover kit changelog

What changed in each version of `public/handover/`, newest first.

All files carry the same version, so "am I on the latest?" is one question,
not four. Check the stamp at the top of any file against the newest heading
below. When you re-pull, bump the version string in the theme's
`wp_enqueue_style` / `wp_enqueue_script` calls to match, so a stale browser
cache is never the difference between "fixed" and "still broken".

Pull from `master` — see the direct links in `HANDOVER.md`.

## 1.4.1 — 2026-10-21

**Contact Support: attachments capped at 20 MB in total.**

- `vantiq-support.js` — replaces the 25 MB per-file limit with one 20 MB cap
  on the combined size (still up to 10 files). The total is checked as each
  file is added; a file that would push it over is refused with a message
  saying how much room is left, so nothing oversized reaches the server.
  The list ends with a running total ("3 files · 4.2 MB of 20 MB"). The
  input attribute is now `data-vq-max-total-mb="20"` (was
  `data-vq-max-mb="25"`), so re-copy the file input from `support-form.html`.
- `vantiq-portal.css` — `.vq-filelist__total` for that last row.
- `support-form.html` — regenerated: new limit text and attribute.
- `HANDOVER.md` — server settings for the new cap
  (`upload_max_filesize` ≥ 20M, `post_max_size` ≥ 32M).
- Every other file: version stamp only.

## 1.4.0 — 2026-10-20

**Contact Support: the dynamic form, with uploads. Registration notices.
Sidebar help divider. Input sizing fix.**

- **New: `support-form.html`** — the whole Contact Support `<form>`, ready
  to copy into the template, plus a test harness that prints what the form
  would post. Generated from `lib/support-form.json` (the mockup's own field
  map) by `scripts/gen-support-form.mjs`; don't hand-edit it.
- **New: `vantiq-support.js`** — Contact Support page only. Switches fields
  by reason (Technical Support and Bug Report get the issue form; everything
  else gets a message box) and by deployment (Public Cloud, Private Cloud,
  Edge: shared fields stay, only the differing ones swap, nothing is
  cleared). Shows each interface's details field once it's ticked. Runs the
  file picker: drag-and-drop, add in several goes, remove one, and limits
  (10 files, 25 MB each, an allowed-type list). Fields that don't apply are
  disabled, so they're neither validated nor posted.
  Every field, option and help text is taken from the three PDF templates
  (2026-10-20), and each deployment posts exactly its template's field
  names. Only Namespace and Project are required, as in the templates.
  Includes **Security Issue**, a staff-only reason built from the internal
  Security Issue Submission Template, with its own eleven sections; its
  markup sits between `staff-only` comment markers for PHP to print only
  for Vantiq employees and admins.
- `vantiq-portal.css`
  - **Forms:** `.vq-form`, `.vq-field`, `.vq-label`, `.vq-required`,
    `.vq-help`, `.vq-select`, `.vq-textarea`, `.vq-form-section` +
    `.vq-legend`, `.vq-grid`, `.vq-check` / `.vq-check-detail`,
    `.vq-choice-group` / `.vq-choices` / `.vq-choice` (radio cards),
    `.vq-checklist`, `.vq-empty-hint`, `.vq-dropzone`, `.vq-filelist`,
    `.vq-stack`, `.vq-options` (radio/checkbox groups), `.vq-note`,
    `.vq-sr-only`. Fields in a `.vq-grid` are subgrids, so two-column rows
    stay aligned when a label wraps. Every inner element has its own `vq-` class so the scoped
    reset leaves it alone.
  - **Fix: `.vq-input` sizing.** It had no `box-sizing: border-box`, so
    `width: 100%` overflowed its container by its padding and `height: 36px`
    rendered 54px tall. Inputs are now 36px and fit their container, as in
    the mockup. **This changes inputs already on the live site** (e.g. the
    register page's resend field): they get shorter and stop overflowing.
  - **New `.vq-notice`** with `--success` and `--error` tones, for the
    register page's `#register-response` and `#resend-response` lines,
    replacing their inline red italic.
  - `.vq-sidebar__footer` ("Need Help?") gets a divider line above it. The
    live site already has one; the kit and mockup now match it, so there's
    nothing to change on WordPress.
- `handover.html` — a "Notice" entry with both tones and their markup.
- `HANDOVER.md` — new "Contact Support form" section (dropping it in, what
  the handler receives, server upload settings, and the content decisions
  Support owns) and "Registration" section (only the two status lines
  change on the live register page).
- Every other file: version stamp only.

## 1.3.0 — 2026-10-16

**Password reset: styles for WordPress's own reset screens.**

- **New: `vantiq-login.css`** — restyles `wp-login.php`'s lost-password,
  new-password and done screens (and the expired-link error) to match the
  mockup's `/reset-password`. Load it on the login screen only, after
  `vantiq-portal.css`. Every rule is scoped `body.login #login …`.
- **New: `login.html`** — WordPress 6.x's markup for each of those screens,
  styled only by the kit, with a switcher for screen and theme.
- **`HANDOVER.md` → "Password reset"** — the fix for reset requests
  bouncing back to sign-in (`lostpassword_redirect` to a `/check-your-email/`
  page, and letting `action=lostpassword|rp|resetpass` through the login
  redirect), plus the `login_message` and `gettext` snippets for titles and
  wording.
- Other files — no functional change; version stamps moved with the
  release.

## 1.2.1 — 2026-10-16

**Deal Registration confirmation: numbered steps instead of a progress rail.**

- `vantiq-portal.css` — `.vq-steps` is now a plain numbered list. Each step
  starts with `<span class="vq-steps__num">1</span>` (a small tinted circle)
  instead of `.vq-steps__node`; the rail, the `--done` / `--current`
  modifiers and `.vq-badge--status` ("In progress") are gone. If you built
  1.2.0's markup, swap the node spans for numbered ones and drop the
  modifiers.
- `handover.html` — sample updated to match.
- `vantiq-interface.js`, `vantiq-events.js`, `shell.html` — no functional
  change; version stamps moved with the release.

## 1.2.0 — 2026-10-15

**Phase 2: dark mode, Events, Community Hub, and the full nav.**

- `vantiq-portal.css`
  - **Dark mode tokens.** A second token block, `:root[data-vq-theme="dark"]`,
    with the same `--vq-*` names. Both blocks are now generated from
    `app/globals.css` by `scripts/gen-handover-tokens.mjs` — the light values
    are byte-identical to 1.1.0.
  - **New tokens: `--vq-primary-vivid`, `--vq-emphasis-vivid`.** Use these
    for teal/violet *text, icons, borders, and focus rings*; keep
    `--vq-primary` / `--vq-emphasis` for fills. Identical in light mode,
    different in dark (the fill colors fail contrast as text there).
    Focus outlines, the active sub-link, and the default button border now
    read `-vivid`. If your theme has its own rules using `--vq-primary` as a
    text color, switch them too.
  - `--vq-shadow-color` moved into the generated block (it changes per theme).
  - `.vq-btn` now sets `color: var(--vq-foreground)`. It never set a color
    before, so buttons fell back to the browser's black — invisible once the
    background goes dark. It (and `.vq-nav__toggle`) also set
    `background: transparent` now — ghost/icon buttons and the nav chevrons
    were showing the browser's default grey button fill. Subtle in light mode,
    obvious in dark.
  - `.vq-sidebar__footer` no longer has a top border — the divider above
    "Need Help?" was removed from the app.
  - New components: `.vq-logo--light/--dark`, `.vq-theme-toggle__sun/__moon`,
    `.vq-linklist` (hub landing pages), `.vq-tabs`, `.vq-calendar`.
- `vantiq-interface.js` — adds `data-vq-tabs` (click + arrow keys) and
  `data-vq-theme-toggle` (sets `data-vq-theme` on `<html>`, remembered in
  localStorage). New `VantiqInterface.setTheme("dark"|"light")`.
- **Deal Registration confirmation page** (new): `.vq-confirm`,
  `.vq-success-mark`, `.vq-steps` (the "what happens next" rail),
  `.vq-badge--status`, and `.vq-section-heading` (the portal-wide section
  heading, missing until now). Plus
  `--vq-success` / `--vq-success-foreground` in the generated tokens.
  CSS and markup only — no JS.
- **New: `vantiq-events.js`** — the `/events` month calendar. Reads a JSON
  blob your PHP prints; never fetches. Load on the Events page only.
- `shell.html` — nav brought in line with the app as of today (this had
  drifted since 1.1.0):
  - Developer Hub: Knowledge Base, Developer Resources (was Reuse Library),
    Developer Forum (was Q&A Forum, moved back from Community Hub),
    Developer How To's, Extension Sources.
  - Sales Hub: Vantiq Spark, Deal Registration, Sales Resources.
  - Demos is its own group: Command Centers (was Interactive Demos), Demo
    Videos.
  - Community Hub (new): Events, Leaderboard. Events is no longer a
    top-level link.
  - Hidden after the Phase 2 PRD review (pages exist, no nav links): API
    References, Code Recipes, Prompt Gallery, Tips & Tricks as its own page
    (now a "Tips & Tricks" filter on Sales Resources), Pitch Collateral,
    Project Sizing & Pricing, and Solutions Showcasing. The notifications
    bell is gone from the header.
  - Theme toggle added to the header; real logo (both theme variants)
    replaces the "VANTIQ" text placeholder.
  - A `<head>` snippet that pre-applies the saved theme (no light flash).
- `handover.html` — a light/dark toggle at the top that re-renders every
  preview, plus samples for the four new components.

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
