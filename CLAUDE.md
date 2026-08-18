# Community Portal — Design Precedence

- `../community.design.md` (one directory above this repo) is the **primary source of
  truth** for this project's design system: colors, spacing, typography, and
  component patterns. Never redesign or override what it specifies.
- The root `CLAUDE.md` (Vantiq Community Portal — Design & UX Consistency Rules) is
  **supplemental** — apply a rule from it only where `community.design.md` is silent
  on that specific point.
- If the two ever conflict, `community.design.md` wins. Flag the conflict to the user
  rather than resolving it yourself.
- Never cite the root `CLAUDE.md` as justification for changing something that already
  complies with `community.design.md`.

## Working conventions
- Reuse existing shadcn/ui components and design tokens (`--primary`, `--emphasis`,
  `--muted-foreground`, etc. from `app/globals.css`) — don't introduce new patterns.
- Git: stage explicit files (never `git add -A`), never force-push, default branch is
  `master` (not `main`).
- Static export via `next.config.mjs` (`output: "export"`, `basePath:
  "/community-portal"`), auto-deployed to GitHub Pages on push to `master` via
  `.github/workflows/deploy.yml`.

## WordPress handover (read this before touching any interactive UI)

This mockup isn't the final product — a separate engineer (an external WordPress
contractor) rebuilds every page of it as a WordPress/Astra theme by hand, translating
our React/Tailwind output into plain HTML/CSS/JS they can paste into PHP templates.
They have no Node, no React, no build step, and no access to this repo; the only
thing they can work from is whatever we hand them.

In the first two weeks of that handoff (Aug 9–15, 2026), nearly every round-trip was
the same failure: something in this mockup didn't survive translation, the WordPress
engineer found out by trial and error days later, and it cost a full email exchange
to fix. The rules below exist to stop that recurring. Full incident history, if
useful context: ask the user for the "Re: Community Portal Mockup" email thread.

As of Aug 17, 2026 the user owns that correspondence directly (it previously ran
through a product manager on the Vantiq side). Treat handover questions as theirs to
answer or escalate — don't assume an intermediary will catch a gap.

**The handover kit is a checked-in part of this repo, not an emailed zip.** If
`public/handover/` doesn't exist yet, creating and maintaining it is part of the job,
not a separate task someone else owns. It holds:
- `vantiq-portal.css` — plain CSS, no Tailwind, no build step, no dependencies. Every
  color/radius/shadow/font is a CSS custom property; every rule reads from those
  tokens, never a literal, so a token change here is one edit instead of a hunt.
- `vantiq-interface.js` — sitewide, framework-free interactivity (accordions, the
  off-canvas drawer, dropdown menus, modal dialogs), driven entirely by
  `data-vq-*` attributes so the WordPress engineer writes PHP and never opens the
  file. Zero dependencies, no jQuery requirement (detect it, never require it — see
  below). `VantiqInterface.init(container)` re-scans injected content and is
  idempotent.
- One `vantiq-<page>.js` per page that has bespoke interactivity beyond the sitewide
  file (search, sort, filter — anything with local state). Name it after the page.
- `handover.html` (or one file per page) — every component rendered next to the
  portable markup that produced it, styled *only* by the portable stylesheet. This
  page IS the test: if the CSS is wrong, this page shows it before the WordPress
  build does.
- A version stamp on the CSS (`wp_enqueue_style(..., '1.0.3')`-style) that changes
  every time the file does, so "did I pull the latest" is answerable by looking, not
  asking.
- `CHANGELOG.md` in the kit — a dated list of what changed per version. Batch handover
  changes into a version and say what's in it, rather than superseding the previous
  drop a day later. Four separate "re-pull the CSS, it's changed again" messages went
  out in six days; the engineer was building against a moving target the whole time.

**Rules, each tied to a specific failure that already happened once:**

1. **Ship the vanilla-JS counterpart in the same change as any new interactive
   pattern.** A new accordion, filter, search box, or sort control added to a page
   is not done until its `data-vq-*` / plain-JS equivalent exists in the handover
   kit. Don't wait for the WordPress build to hit the gap and ask for it.
2. **Never trust `!important` for a specificity fight with the host theme.** The
   scoping pattern is `.vq-root` as the outer boundary, with reset rules written
   `.vq-root.vq-root <selector>` (the same element matched twice — legal CSS, raises
   specificity without `!important`). Every such reset rule also carries
   `:not([class*="vq-"])`, so it only touches elements the design system hasn't
   already claimed. Without that guard, the reset silently wins fights it shouldn't
   — that's exactly how the active-nav pill lost its fill last time, and it was only
   caught by chance, by someone looking at the rendered page.
3. **Visually verify before calling any handover change done** — render the actual
   component states (default, active, hover, focus) in a browser and look, the same
   way this project already verifies UI changes elsewhere. Reading the CSS is not a
   substitute; that's precisely the check that got skipped when the reset broke
   default link/button styling.
4. **Generate derived documents from the token source — never hand-type them.** Any
   "cheat sheet" or settings guide for the host theme's own customizer (Astra, in
   this case) must be produced by reading the actual CSS custom properties, not
   written from memory or re-typed by hand. The first Astra cheat sheet handed over
   shipped with three wrong values for exactly this reason.
5. **Structural intent belongs in a comment, not just in a class name.** If a
   component is two controls sharing a row (e.g. a nav link plus a separate
   expand/collapse toggle), say so in a comment on the exported markup. A raw
   `flex-1` with no explanation is how that structure got misread as one control
   and a real navigation path silently disappeared.
6. **Static export is not a substitute for the running app.** `next build`'s
   static `out/` has no role state — it renders the signed-out default, which has
   no sidebar. Anything handed off must be confirmed against the running app
   (`npm run dev`, actual role switched in the browser), not the static export.
7. **A content/data-model mismatch is not a code problem — say so explicitly and
   name who owns the decision.** If a new UI pattern assumes content that the real
   WordPress data doesn't actually have in that shape (e.g. a type taxonomy the
   existing posts were never tagged with), flag it as a content decision for the
   project's content owner rather than quietly picking an answer or leaving it for
   the WordPress engineer to discover.
8. **Ship the portable markup counterpart too, not just the portable JS.** Rule 1
   covers behaviour; this covers structure. A new or restyled component isn't done
   until its `vq-`classed markup exists in the handover kit, styled only by
   `vantiq-portal.css`. This repo renders Tailwind utilities, so what the engineer
   copies out of a page (`class="flex flex-1 items-center gap-3 px-3 py-2.5"`) and
   what the portable stylesheet describes (`.vq-nav__link`) are two different
   vocabularies, and reconciling them by hand is a per-screen tax. Their most
   repeated request is a version of "I'm fine with the mockup code, just need the
   right CSS to drive it" — the kit is where that gets answered.
9. **Write role variation down as a rule; never hand it over as more exported
   files.** WordPress resolves the current user server-side in PHP, so the engineer
   needs the condition, not a rendering. State it in one sentence per difference —
   "a `newpartner` sees the onboarding checklist card where a `partner` sees the
   pipeline card, rest of the page identical" — and keep the differences few and
   stateable, because each one multiplies across all eight roles (`visitor`,
   `partner`, `newpartner`, `customer`, `employee`, `admin`, `partneradmin`,
   `guest`). With no such rule written anywhere, the only complete answer available
   was a static export of every route × every role: 2,624 files, stale the moment
   any screen changes, and it needed a covering paragraph just to explain that the
   visitor header has three variants rather than two.
10. **Don't design markup for regions WordPress generates — design the CSS that
    restyles theirs.** Login, registration, password reset, user profile, comments,
    search results, pagination, and every LearnDash course/lesson/quiz/certificate
    page emit fixed markup with fixed names that the child theme cannot restructure.
    The homepage login has to come from `wp_login_form()`, so what's actually needed
    is CSS scoped to `#community-loginform` (with WordPress's own `user_login`,
    `user_pass`, `rememberme`, `wp-submit` names) — not a designed form the engineer
    has no way to output. Before designing any screen in that list, confirm which
    regions are host-generated.
11. **Design the states live content will produce, not just the demo state.** Seed
    data always fits; real data doesn't. For each screen, decide what shows on zero
    results, on no access, while loading, on failure, and when a title runs long or
    an image is missing. Anything left undecided gets invented during the WordPress
    build, and the invention becomes the design.
