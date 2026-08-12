---
target: Dark mode (dashboard, courses catalog, knowledge base, error states)
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 1
timestamp: 2026-08-11T17-24-56Z
slug: app-page-tsx-dark-mode
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Toggle swaps instantly; progress text stays legible |
| 2 | Match System / Real World | 3 | Plain language, atlas/journey framing intact |
| 3 | User Control and Freedom | 3 | Back-links/breadcrumbs present throughout |
| 4 | Consistency and Standards | 2 | `bg-primary` buttons (muted teal) and `text-primary-vivid` links (bright cyan) now visibly disagree about what "primary" looks like in the same view |
| 5 | Error Prevention | 2 | Deal Registration's required-field cues unverified for dark-mode contrast |
| 6 | Recognition Rather Than Recall | 3 | Sidebar + breadcrumbs consistent |
| 7 | Flexibility and Efficiency | 3 | ⌘K, role switcher, saved items all present |
| 8 | Aesthetic and Minimalist Design | 2 | Several panels sit at near-identical lightness to the page, reading flat/murky instead of "consistently lifted" |
| 9 | Error Recovery | 0 | 404 page renders near-black text on the dark background — confirmed independently, genuinely unreadable |
| 10 | Help and Documentation | 3 | "Need Help? / Contact Support" persistent in sidebar footer |
| **Total** | | **24/40** | **Acceptable — significant improvements needed** |

## Design Specificity Verdict

**LLM assessment**: Mostly authored, partly patched. The duotone photography, hairline card system, mono readout voice, and card-lift model survive dark mode intact and still feel like this product. But the two contrast-fix tokens read as bolted on rather than extended: `--primary-vivid` (`#22cdcf`) is a genuinely saturated cyan — closer to neon than "stormy" — used on every "View Full Path" link and current-step label, so the calm teal identity gets a much louder voice in dark mode than in light. More seriously, `--emphasis-vivid` (`#dea8d7`, documented in its own code comment as "a lighter orchid rather than a dark violet") is what every `SectionHeading` and "View all" link renders in — meaning the codebase's own **One Violet Rule** ("≤10% of any screen... its rarity is what makes it read as emphasis") is now violated by the accessibility fix itself. The contrast math is correct; the brand rule it lives inside is not being honored.

**Deterministic scan**: The static regex scanner (`detect.mjs`) found zero findings across the 6 source files checked — it doesn't do computed-style contrast math, so it couldn't see the CSS-custom-property-driven issues above. The live browser detector, run separately, did catch real signal: `ai-color-palette` flagged cyan/violet saturation on the Dashboard (corroborating the specificity verdict above independently) and `undersized-ui-text` flagged 10px tag-pill labels ("VAIL," "GenAI," "Edge-Computing") on the Courses Catalog, below the 11px floor — a genuine issue neither of us caught otherwise. The dominant flagged rule, `gray-on-color` (60+ hits on Knowledge Base alone), is a **false positive**: spot-checked two flagged pairs at 9.8:1 and 7.9:1 — both comfortably exceed AA and even AAA. It's over-triggering on any light text over a saturated background, regardless of actual luminance.

**Visual overlays**: No user-visible overlay was left running — the live-server instance was stopped after evidence capture, as instructed.

## Overall Impression

The infrastructure fix worked: nothing is illegible-by-accident anymore, and the card/border boundary problem you flagged earlier is genuinely solved. But two rounds of "make the contrast math pass" pushed both `primary` and `emphasis` into much louder, more saturated versions of themselves in dark mode, and nobody re-checked those against the *design* rules that made this system distinctive in the first place — specifically the One Violet Rule, which the emphasis fix now breaks on nearly every screen. The single biggest opportunity: stop asking "does this text pass 4.5:1" as the only question, and ask "does this still look like ≤10% violet" as a second, independent constraint.

## What's Working

1. **Card-lift re-solve** — `--card`/`--border` genuinely fix the "where does a module begin" problem from the last round, without shadows (which don't work in dark mode). Confirmed distinct on Knowledge Base and Q&A Forum.
2. **Teal-duotone photography** survives the theme switch untouched and still unifies unrelated course thumbnails.
3. **TrackingPathCard** — the pulsing current-step dot and confetti-on-completion moment is the best-crafted interaction in the product, dark mode included.

## Priority Issues

**[P0] 404 / error boundary is unreadable in dark mode**
- **Why it matters**: Confirmed directly — "404 / This page could not be found" renders in near-black text on the `#0d3d3d` background. This is the worst possible moment for the peak-end rule to fail: the one screen most likely to be someone's *last* impression of a session is currently illegible.
- **Fix**: Theme `app/not-found.tsx` (or equivalent) to use `text-foreground` instead of a hardcoded/default color.
- **Suggested command**: `/impeccable harden`

**[P1] `--emphasis-vivid` breaks the One Violet Rule portal-wide**
- **Why it matters**: Violet was designed to be a rare accent ("appears on ≤10% of any screen"); it's now the color of every section heading and "View all" link in dark mode, and it's a *lighter, more attention-grabbing* violet than light mode's deep `#351431`. Corroborated independently by the browser detector's `ai-color-palette` flags.
- **Fix**: Don't default `SectionHeading` to the emphasis color at all — it's a rank-of-heading treatment being asked to double as a rare-accent color, which was already in tension before dark mode made it visible. Reserve `emphasis-vivid` for genuinely rare moments; give the default section heading a quieter dark-mode treatment (e.g. `foreground` or a dedicated heading token).
- **Suggested command**: `/impeccable colorize`

**[P2] `primary-vivid` reads as neon, not "stormy"**
- **Why it matters**: The brand's teal identity is described as calm and capable; `#22cdcf` is a notably higher-energy cyan than that voice, used on every interactive link/current-state label.
- **Fix**: Explore a slightly desaturated variant that still clears 4.5:1, tuned for mood rather than contrast alone.
- **Suggested command**: `/impeccable quieter`

**[P2] Undersized tag-pill text on Courses Catalog**
- **Why it matters**: Category/tag pills ("VAIL," "GenAI," "Edge-Computing") render at ~10px, below the 11px legibility floor — a real readability issue independent of dark mode, just surfaced during this pass.
- **Fix**: Bump pill label size to at least 11-12px.
- **Suggested command**: `/impeccable typeset`

**[P2] Signature gradient wash reads flat/murky in dark mode**
- **Why it matters**: The `from-emphasis/20 via-accent to-secondary` wash that gives buttons and CTA cards their light-mode "quiet confidence" identity collapses to a near-uniform dark block in dark mode, losing its visible gradation (flagged by the LLM review; not independently corroborated by the browser pass, worth a second look before treating as certain).
- **Fix**: Re-tune the dark-mode gradient stops so the wash stays visibly graduated, not just technically present.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

**Alex (Power User)**: The cyan "View Full Path" / current-step label pulls his eye away from course titles he's scanning on a page he opens daily; the hover glow on every Saved Items card adds visual noise across repeat visits.

**Sam (Accessibility-Dependent User)**: The 404 page is a hard failure — an unreadable error with no recovery cue for anyone relying on screen contrast. Separately, `--border` on card sits at 3.30:1, right at the WCAG 1.4.11 floor with effectively no margin — fine today, but one future token tweak away from failing again.

## Minor Observations

- Semantic badges (Tutorial=success green, Upcoming=info blue) keep good hue separation from each other and from the new vivid tokens.
- Focus-visible outline is crisp and consistently applied everywhere checked.
- No layout breakage, no leftover light-mode artifacts, no invisible borders found in the browser evidence pass — the structural fixes from the last two rounds are holding.

## Questions to Consider

1. If the vivid tokens exist only to satisfy contrast math, should they use a *different*, deliberately quieter hue than their light-mode counterpart — rather than "same hue, more lightness"?
2. Should `SectionHeading` use `--emphasis` at all, given it's applied to effectively every section — was this already in tension with the One Violet Rule before dark mode simply made it visible?
3. Has the default Next.js error boundary ever actually been designed in this system, or has it been running on framework defaults the whole time?
