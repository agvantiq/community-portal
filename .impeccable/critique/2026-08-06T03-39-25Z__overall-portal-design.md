---
target: overall portal design
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-08-06T03-39-25Z
slug: overall-portal-design
---
# Design Critique — Vantiq Community Portal (overall)

Method: dual-agent (A: design-review, B: detector+evidence). Browser inspection unavailable (no automation); source-grounded, server verified 200 OK.

## Design Health Score: 27/40 (Acceptable, borderline Good)
- Consistency & Standards: 2 (three section-heading treatments; bg-white vs #f3f8f7 token; shadow-none vs shadow-card)
- Error Prevention: 2 (register: no required/inline validation)
- Error Recovery: 2 (toast-only errors)
- Others mostly 3.

## Design Specificity: Mixed, drifting off its own system
Signature components (TrackingPathCard, teal-duotone imagery, DemoGallery motion) are strongly Vantiq-authored. Home dashboard + shell read as category-standard SaaS AND contradict the portal's own tokens/components. Detector (loaded DESIGN.md): 10 findings, all design-system-font-size (literal micro sizes off ramp); no false positives; calendar.tsx hits are shadcn vendor defaults.

## Priority Issues
- [P0] Pure-white page field collapses the depth model. app-shell.tsx:52,57 bg-white overrides --background #f3f8f7; page-hero.tsx:34 fades to white. Fix: use bg-background; fade hero to var(--background). -> colorize
- [P1] Section headings have three treatments; home abuses the reserved mono readout voice (page.tsx:175,211,251). Fix: adopt SectionHeading everywhere; strip mono from non-telemetry headings. -> clarify
- [P1] Home dashboard flat; shadow-none cards on white express none of the design. Fix: escalate tiles to shadow-sm/shadow-card. -> polish
- [P2] Registration is a cold wall: ~9 ungrouped fields, no validation, unenforced password rule, confusable Position fields. -> harden
- [P2] Partner (primary persona) denied the path-completion peak-end (celebrateOnComplete=false). -> delight

## Persona Red Flags
- Alex: "/" shortcut promised but only ⌘K bound; sidebar re-expands on role change; course Register one-way.
- Sam: confetti no prefers-reduced-motion guard; 11px grey mono headings low-contrast; placeholder-only name/password inputs; tiny role-switcher chevron target.
- Jordan: "Continue as a Guest" card has no button; "Register now" out-shouts "Log In".
- Sales Partner: Deal Registration has no prominence or fast CTA.

## Minor
- text-emphasis overused (beyond One Violet Rule); hero titles louder than small-first north star; role labels leak demo scaffolding ("Flow","Experience"); exec-dashboard duplicate cert metric; sales-center redundant eyebrow+title.
