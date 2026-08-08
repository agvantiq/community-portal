---
target: Primary CTAs (homepage hero, onboarding landing, register flow, tracking path card)
total_score: 26
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 1
timestamp: 2026-08-06T04-38-54Z
slug: nboarding-landing-register-flow-tracking-path-card
---
Method: dual-agent (A: a391cf11ad580844c · B: ac4ac2ff26d7709d5)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No pending/loading state on Register or Log In submit — button gives no in-flight feedback before the toast fires. |
| 2 | Match System / Real World | 4 | CTA copy is plain and task-accurate throughout ("Log In," "Register," "Resume"). |
| 3 | User Control and Freedom | 3 | No explicit cancel/back CTA on the register form beyond browser nav; minor. |
| 4 | Consistency and Standards | 1 | Two of three parallel "Access Options" cards have no button at all; "Register now" bypasses the shared `Button` primitive while "Log In" above it uses the full primary Button; `app/page.tsx:160` uses a raw `<button>` where every other target file routes CTAs through the shared component. |
| 5 | Error Prevention | 4 | Register form validates password length/match and consent inline before submit. |
| 6 | Recognition Rather Than Recall | 4 | CTA labels are self-explanatory, no jargon, no icon-only dependence. |
| 7 | Flexibility and Efficiency | 2 | No CTA-specific accelerators beyond native Enter-to-submit; neutral. |
| 8 | Aesthetic and Minimalist Design | 2 | Onboarding grid shows 3 visually-equal cards where only 1 has buttons; violet emphasis spreads across headings/badges/timestamps on the homepage, diluting single-CTA hierarchy. |
| 9 | Error Recovery | 4 | Inline errors are field-scoped, `role="alert"`, immediately actionable. |
| 10 | Help and Documentation | n/a | No help/documentation surface attaches to any CTA in scope — not meaningfully evaluable at this scope. |
| **Total** | | **26/36** | **Good (72%) — solid foundation, real gaps in one surface** |

## Design Specificity Verdict

**LLM assessment:** Mostly Vantiq-specific at the primitive level, undermined by inconsistent application. `components/ui/button.tsx`'s default variant is a byte-for-byte match to DESIGN.md's signature gradient (`bg-linear-to-br from-emphasis/20 via-accent to-secondary`) — where it's actually reached for (Register, Log In, Resume), the CTA reads as the intended "quiet-confidence" teal-to-violet wash, not a generic SaaS solid fill. The gap isn't taste, it's discipline: several CTA-critical moments — most of all the onboarding landing page's own recommended path — never reach the `Button` component at all, falling back to raw, ad hoc `<button>` styling.

**Deterministic scan:** `detect.mjs` returned exit code 2 with one finding: `design-system-font-size` (advisory) on `components/tracking-path-card.tsx:226` — the "Currently Tracking" readout label is `text-[10px]`, an arbitrary value off DESIGN.md's type ramp (the readout tier is specified as `0.6875rem`/11px). A structural grep pass corroborates and extends this: `app/page.tsx:160` (the "Replay guided tour" control) is a raw `<button>`, the only CTA-shaped element in the five target files that isn't either a shared `Button` or an intentionally plain text link; `tracking-path-card.tsx:147` carries a second arbitrary `text-[11px]` that happens to match spec numerically but still bypasses the token system. No raw hex colors or arbitrary color values were found bypassing tokens on any CTA element. No false positives to flag — the one detector finding is real.

**Visual overlays:** Not available this run — no browser-automation tool was reachable from either assessment or the parent session (confirmed via tool search; no Playwright/Puppeteer install present). Both button-hierarchy and spacing findings below rest on source reads, not a rendered screenshot; treat visual-weight comparisons as high-confidence from code but not screenshot-verified.

## Overall Impression

The underlying system is well-built and the primary conversion moments that use it (Register, Resume-course) are genuinely good — calm, on-brand, validated before submit. The single biggest opportunity is `components/onboarding-landing.tsx`: it's the first thing a brand-new partner sees, and its most visually-promoted option (the ring-highlighted "Registered Partner Access" card) has nothing to click. That one gap does more damage to the CTA system's credibility than every other finding combined.

## What's Working

- **`components/ui/button.tsx`** implements the DESIGN.md gradient spec exactly — no drift between design system and code on the primitive itself.
- **`app/register/page.tsx`** ships exactly one primary `Button` in the whole form, no competing CTA, backed by real inline validation that blocks a broken submit rather than reporting one after the fact.
- **`components/tracking-path-card.tsx`** — the Resume/Browse-more CTA changes label with completion state and sits correctly beside the mono "Currently Tracking" readout without letting the readout voice leak into a heading (Readout-Voice Rule respected, modulo the font-size drift noted above).

## Priority Issues

**[P0] Two of three "Access Options" cards have no CTA, including the one visually promoted as the recommended path**
- **Why it matters:** `onboarding-landing.tsx` is the first-time-partner landing surface. "Continue as a Guest" and "Registered Partner Access" (the latter marked `ring-2 ring-primary` as the recommended option) list benefits but contain zero interactive elements. A new partner following the page's own visual cue hits a dead end and has to hunt for the much smaller "Register now" text link buried in an unrelated card.
- **Fix:** Add an explicit `Button` to both cards, matching the pattern already used on the "Explore" cards — e.g. "Continue as Guest" (outline/secondary, sets guest role) and "Register now" (default gradient, links to `/register`) directly on the Partner card.
- **Suggested command:** `/impeccable layout` (or direct fix, given scope)

**[P1] "Register now" is demoted to a raw text link beneath the full-weight "Log In" button**
- **Why it matters:** `onboarding-landing.tsx` styles "Register now" as a raw `<button class="text-lg font-bold text-primary hover:underline">` directly under a fully-realized gradient `Button` ("Log In"). For a portal whose stated first-touch job is onboarding new partners, registration is arguably the more important action, yet it visually reads as secondary. `text-lg font-bold` also isn't a DESIGN.md type tier — it's an ad hoc combination.
- **Fix:** Promote to a first-class `Button` (`variant="outline"` or `"secondary"`) so both paths are unmistakably buttons, differentiated by variant weight rather than by one being a real button and the other plain text.
- **Suggested command:** direct fix alongside P0 (same file, same pass)

**[P2] Midnight Violet emphasis usage on `app/page.tsx` exceeds the "≤10%, rare accent" rule**
- **Why it matters:** DESIGN.md's One Violet Rule caps emphasis-violet at "a heading, one gradient edge, a single badge" per screen. `app/page.tsx` applies `text-emphasis`/`bg-emphasis` across 3 section headings, an announcement timestamp, an "Upcoming" badge, and 4 content-type badges — all on one screen. Individually correct, in aggregate it turns the rare accent into wallpaper and competes with the teal-gradient primary CTA for attention instead of reinforcing it.
- **Fix:** Reserve emphasis-tinted badges for genuinely rare moments; move routine content-type badges (Course/Resource/Video/Doc) to a neutral or secondary variant.
- **Suggested command:** `/impeccable colorize`

**[P3] Focus "border shift" is a no-op for most button variants**
- **Why it matters:** DESIGN.md's button focus spec is "3px ring in ring/50 **plus border shift**." `button.tsx`'s base class carries `focus-visible:border-ring`, but `default`/`secondary`/`ghost`/`link` variants have no border width for the color to shift on — only `outline` (which already has a border) actually shows it. The 3px ring alone is still visible, so this isn't a hard accessibility failure, but it's a literal spec/implementation gap.
- **Fix:** Either drop "plus border shift" from the DESIGN.md spec, or add a 1px transparent border to all variants so the shift renders.
- **Suggested command:** direct fix (trivial, one file)

**[P3] Several tertiary CTAs bypass the shared `Button` component**
- **Why it matters:** `onboarding-landing.tsx` (Lost Your Password, Register now), `register/page.tsx` (Terms of Service, resend-validation-email link), and `app/page.tsx:160` (Replay guided tour) all use raw `<button>`/text-link markup instead of `Button variant="link"`. Functions fine visually today, but drifts from the working convention ("reuse existing shadcn/ui components") and multiplies the surfaces a future button-style change has to be manually re-applied to. The detector also flagged an arbitrary `text-[10px]` on the readout label beside the tracking-card CTA (`tracking-path-card.tsx:226`), off the DESIGN.md type ramp (spec is 11px).
- **Fix:** Route tertiary text-CTAs through `Button variant="link"`; fix the readout to `text-[11px]` or the token equivalent.
- **Suggested command:** direct fix (mechanical, low risk)

## Persona Red Flags

**Jordan (First-Timer):** Lands on the onboarding page, sees the ring-highlighted "Registered Partner Access" card promising the full unlock, and finds nothing to click. Hunts for another way to register, eventually finds a small text link competing visually with "Log In" in an unrelated card, or abandons. This sits exactly on Jordan's critical path — the highest-severity finding in this review.

**Casey (Mobile):** The "Access Options" grid stacks to a single column on narrow viewports, so the two button-less cards appear as full-width blocks directly beside the one functional card with no adjacent grid context to signal "this one's different" — worse on mobile than desktop. Several tertiary CTAs also render at `text-xs` (Terms of Service, Lost Your Password), and the DESIGN.md-specified 36px button height sits below the ~44–48px touch-target guideline common for mobile-first products.

## Minor Observations

- `tracking-path-card.tsx` deliberately omits `.shadow-card` per an intentional direction-contract note in `app/page.tsx` — a documented divergence, not a bug, but worth flagging when auditing shadow consistency elsewhere.
- `register/page.tsx`'s two tertiary post-submit links ("View our Terms of Service" vs. "Waiting for your validation email?") use two different color treatments (`text-muted-foreground` vs. `text-primary`) for functionally equivalent weight.
- `muted-foreground` (`#5b6a85`) at `text-xs` on several tertiary CTA labels is likely borderline-AA contrast against white cards — worth a formal contrast check rather than an assumption either way.
- No `disabled`/`loading` state exists on any submit-type Button in the five target files — not scored as a heuristic failure beyond #1 above, but worth bundling into any CTA pass.

## Questions to Consider

- If "Registered Partner Access" is important enough to visually promote with `ring-2 ring-primary`, was its missing button an intentional deferral or a refactor drop?
- Is "Log In" or "Register" actually meant to be the primary CTA of the onboarding landing page? The current hierarchy (full-width gradient Button vs. bold text link) answers "Log In" — is that right for a portal whose first-touch job is onboarding *new* partners?
- Given the One Violet Rule's own language ("spread it around and it becomes wallpaper"), should routine content-type badges share the emphasis-violet family at all, or does the rarity budget need its own non-violet lane to survive contact with a real, busy dashboard?
