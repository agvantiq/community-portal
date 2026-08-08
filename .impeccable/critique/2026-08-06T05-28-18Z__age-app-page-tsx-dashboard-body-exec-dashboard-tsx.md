---
target: Partner homepage (app/page.tsx dashboard body + exec-dashboard.tsx)
total_score: 21
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 2
timestamp: 2026-08-06T05-28-18Z
slug: age-app-page-tsx-dashboard-body-exec-dashboard-tsx
---
Method: dual-agent (A: ad3dad629518f03ac · B: af0748f882e724609)

**Note on timing:** `app/page.tsx` and `components/tracking-path-card.tsx` were edited by a concurrent session while this critique was running (a documented "layout pass" direction-contract comment, dated today). One finding both review agents would have raised — TrackingPathCard rendering flat with no shadow ("ops board" styling) — was resolved mid-review: the card now carries `shadow-card` plus tinted header/footer washes, and its readout labels were renamed "Path"/"Current course". That finding is dropped below as already-addressed rather than reported as open. Every other finding was re-verified against the current file state just before this report was written.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | TrackingPathCard communicates status well for technical-partner/employee, but Sales Partner gets no progress module at all. |
| 2 | Match System / Real World | 4 | Course/deal copy is domain-authentic to Vantiq's real-time/edge/orchestration positioning. |
| 3 | User Control and Freedom | 3 | Replay-tour and Resume/Browse actions exist; roster "Remove" has no undo, only a toast. |
| 4 | Consistency and Standards | 1 | `exec-dashboard.tsx` re-forks section headings as raw `<h2 className="text-sm font-medium text-emphasis">` five times instead of the shared `SectionHeading` component. |
| 5 | Error Prevention | 2 | Roster "Remove" is a single icon-click with no confirm step, in a 30-row table. |
| 6 | Recognition Rather Than Recall | 3 | Typed badges (Course/Resource/Video/Doc), per-item icons — legible scanning. |
| 7 | Flexibility and Efficiency | 2 | No sort/filter/search on the 30-employee roster or the deals table. |
| 8 | Aesthetic and Minimalist Design | 2 | 5 competing modules on the default dashboard, 6 on exec-dashboard (two full inline data tables). |
| 9 | Error Recovery | n/a | No error states exist to evaluate — client-only role state, no real backend. |
| 10 | Help and Documentation | 2 | Guided tour exists but is gated to technical-partner/employee only — Sales Partner gets none. |
| **Total** | | **21/36 (58%)** | **Acceptable — real gaps, especially for Sales Partner** |

## Design Specificity Verdict

**LLM assessment:** Partially authored, partially generic. The genuinely Vantiq-specific parts are real: TrackingPathCard's mono "Path"/"Current course" readout voice is used exactly as DESIGN.md's Readout-Voice Rule prescribes, and copy is domain-authentic ("Edge AI Architecture Deep Dive," "Predictive maintenance for assembly lines"). But the surrounding shell — hero, saved-items grid, announcement feed, recommendation row — is a fairly conventional card-grid dashboard; swap the copy and it's hard to distinguish from a generic learning-portal template. The violet-emphasis system, meant to be a disciplined rare accent, is applied inconsistently enough that it reads as leftover default styling in several places, particularly on `exec-dashboard.tsx`.

**Deterministic scan:** `detect.mjs` returned exit code 0 with zero findings across all 5 files, confirmed stable under three config modes (default, `--no-design-system`, `--no-config`). No pattern-level anti-patterns exist in this code; every issue below is a judgment call the regex detector isn't built to catch (role-branching gaps, rule-application consistency, elevation hierarchy).

**Visual overlays:** Not available this run — no browser-automation tool was reachable. Findings rest on source reads, cross-checked against a fresh read of the current files (not screenshots).

## Overall Impression

Where this dashboard serves a Technical Partner or Employee, it mostly works — hero, tracking card, supporting content in a sensible sequence. The real problem is who it *doesn't* serve: Sales Partner lands on a page whose hero copy promises "Continue your journey" and delivers no journey module, no primary CTA, and no status of any kind — despite the tracking component already having the sales-track logic built and simply not wired up. The Exec dashboard's problem is different: six modules, two of them full data tables, all firing at once with identical `shadow-card` weight, reads more like an admin console than the "calm, capable, recedes so the work can lead" north star DESIGN.md describes.

## What's Working

- **Readout-voice discipline in `TrackingPathCard`** — mono uppercase "Path"/"Current course" reserved exclusively for genuine progress telemetry, matching DESIGN.md's Readout-Voice Rule, with intent documented directly in code comments.
- **`Button` default variant matches the current DESIGN.md spec exactly** wherever it's used (Resume, Add Employee) — no drift between system and code.
- **Domain-authentic content** throughout `lib/sample-data.ts` reads as genuine high-stakes systems work, not generic SaaS placeholder copy.

## Priority Issues

**[P0] Sales Partner has no progress/journey module, and the hero copy over-promises one**
- **Why it matters:** `app/page.tsx:152`, `showJourney = role === "technical-partner" || role === "employee"` excludes `sales-partner` from both `TrackingPathCard` (line 177) and the guided tour (line 264). Yet the non-employee hero description explicitly says "Continue your journey" (line 157), and `TrackingPathCard`'s own `resolveTrackedPath()` (`tracking-path-card.tsx:29-35`) already has sales-track resolution logic that's simply never called from this page. Sales Partner is one of the three roles this exact screen serves — they get zero status visibility, no primary CTA anywhere on the page, and copy referencing a journey that doesn't exist.
- **Fix:** render `TrackingPathCard` with `resolveTrackedPath(true, isRegistered)` for `sales-partner` too, matching what's already built for the underlying component.
- **Suggested command:** direct fix (the resolution logic already exists, this is wiring)

**[P1] The One Violet Rule is broken by repetition across both dashboards**
- **Why it matters:** on the default dashboard, `text-emphasis`/`bg-emphasis/10` appears on the announcement timestamp (`app/page.tsx:231`), the "Upcoming" badge (233), and every "Recommended" type badge (253) — on top of the 3 `SectionHeading`s already using emphasis by design. On `exec-dashboard.tsx` it's 5 raw `text-emphasis` headings (144, 177, 204, 259, 377) plus the "Proposal"/"Negotiation" deal-stage tone recolored violet (63-64). DESIGN.md is explicit: "≤10% of any screen... spread it around and it becomes wallpaper." A dozen-plus violet touch-points per screen is exactly the wallpaper outcome the rule warns against.
- **Fix:** keep emphasis to genuinely rare moments; move repeated badges/labels (announcement timestamps, recommendation-type badges, deal-stage tones) to `info`/`muted`/neutral tokens.
- **Suggested command:** `/impeccable colorize`

**[P1] `exec-dashboard.tsx` bypasses `SectionHeading` entirely, forking the pattern it exists to prevent**
- **Why it matters:** 5 instances of raw `<h2 className="text-sm font-medium text-emphasis">` (lines 144, 177, 204, 259, 377) instead of `SectionHeading`. That component's own doc comment states it was built precisely because "two treatments had drifted apart" — `exec-dashboard.tsx` re-forks it and now silently diverges (no `SectionHeadingLink` support, inconsistent icon placement) from every other hub/dashboard page.
- **Fix:** replace all five with `<SectionHeading>`.
- **Suggested command:** direct fix (mechanical, one file)

**[P2] Saved Items grid ignores the documented responsive pattern and won't collapse on mobile**
- **Why it matters:** `app/page.tsx:196`, `grid-cols-3 grid-rows-2` has no responsive breakpoints — fixed 3 columns at every viewport including phones. The same file demonstrates the correct pattern two branches above it (`grid-cols-1 gap-4 sm:grid-cols-2`, line 116). DESIGN.md's Layout section calls for grids that "collapse to a single stacked column on mobile." `RECOMMENDATIONS` (`grid-cols-2 sm:grid-cols-4`, line 249) is a milder version of the same drift — it never reaches single-column either.
- **Fix:** `grid-cols-2 sm:grid-cols-3` for Saved Items; consider `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` for Recommended.
- **Suggested command:** `/impeccable adapt`

**[P2] Exec dashboard's elevation hierarchy is flattened: every card is hard-set to `.shadow-card`**
- **Why it matters:** all 5 cards (`exec-dashboard.tsx:142, 176, 202, 256, 383`) use `shadow-card` at rest; none use the default `shadow-sm`. DESIGN.md treats `.shadow-card` as an escalation for cards that should read as a distinct object — not the default for every card. Five simultaneously "lifted" cards means nothing reads as more important than anything else.
- **Fix:** let secondary modules (Notifications, Team Overview) rest at `shadow-sm`; reserve `.shadow-card` for 1-2 genuinely primary cards (Certification Progress, User Management).
- **Suggested command:** `/impeccable layout`

## Persona Red Flags

**Alex (Power User):** No sort/filter/search anywhere on the 30-employee × 6-course roster table or the deals table (`exec-dashboard.tsx:310-372, 383-408`) — for an exec managing an org above ~10 people, scanning a flat table for who hasn't started is real friction. TrackingPathCard and pure content-recommendation cards also get near-identical white-card treatment, so a fast-scanning power user can't distinguish "my actual status" from "a content suggestion" at a glance.

**Sam (Accessibility-Dependent):** Roster row "Remove" (`exec-dashboard.tsx:340-347`) is an icon-only button with a correct `aria-label`, but no confirmation step — a screen-reader user can trigger an irreversible removal from a 30-row table in one activation, with only a toast for feedback. Sticky table headers/first-column inside a scrollable, height-capped container is a risk to check live under browser zoom for low-vision users.

## Minor Observations

- `ItemGroup`/`Item` primitives power the Announcements list (`app/page.tsx:217-242`) but aren't documented in DESIGN.md's Components section — worth confirming this is an intentional shared primitive.
- `RECOMMENDATIONS` (`app/page.tsx:49-74`) is static and identical regardless of role or progress despite the "Recommended for you" label — not actually personalized. Likely fine given PRODUCT.md's placeholder-data disclosure, but the copy claims more than it delivers.
- Announcements' left accent bar (`bg-info` vs `bg-border`) duplicates the "Upcoming" badge signal on event items — mildly redundant, not harmful.
- The Hero's only action for technical-partner/employee is a low-emphasis `variant="link"` "Replay guided tour" — the Hero itself never carries a primary CTA; that job is pushed down into TrackingPathCard's footer, which is fine but worth being a deliberate choice rather than a default.
- Announcements has no empty-state branch (Saved Items right next to it does); not currently reachable since `ANNOUNCEMENTS` is a hardcoded non-empty array, but structurally inconsistent with its neighbor.

## Questions to Consider

- Is excluding Sales Partner from `TrackingPathCard` an intentional product call ("sales enablement has no path concept"), or a straightforward gap in `app/page.tsx`'s role branching — given the component already has sales-track resolution built and unused?
- DESIGN.md's ≤10% violet budget is written per-screen, but `SectionHeading` — the portal-wide canonical heading — is itself `text-emphasis`, and most dashboard screens render 3+ section headings before counting anything else. Should the Section-Heading Rule carve out an explicit exception to the One Violet Rule, so this doesn't have to be resolved by judgment call every time?
- Exec dashboard renders two full data tables plus four other modules on first load with no sequencing. Would a tabbed or collapsed-by-default structure (roster/deals behind a click, summary cards up front) serve the "recedes so the work can lead" principle better than the current all-at-once layout?
