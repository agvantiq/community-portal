---
name: Vantiq Community Portal
description: A calm, warmly-guiding control surface for partners learning, building, and selling on Vantiq's real-time AI orchestration platform.
colors:
  ink: "#0d3d3d"
  primary: "#0f5a5b"
  primary-foreground: "#ffffff"
  azure-mist: "#d6e6e5"
  lavender-grey: "#8797b2"
  emphasis: "#351431"
  emphasis-foreground: "#ffffff"
  background: "#f3f8f7"
  card: "#ffffff"
  surface-sunken: "#edf4f3"
  muted: "#e7efee"
  muted-foreground: "#5b6a85"
  accent: "#e2e6f0"
  accent-foreground: "#2e3a54"
  border: "#d8e3e2"
  input: "#e9f1f0"
  destructive: "#b23a34"
  success: "#2f7548"
  warning: "#c98a3e"
  info: "#4c6fa6"
  critical: "#6b3566"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  readout:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
components:
  button-default:
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.azure-mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  input:
    backgroundColor: "{colors.input}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 12px"
---

# Design System: Vantiq Community Portal

## Overview

**Creative North Star: "The Field Atlas"**

The portal is a guided reference for partners moving through unfamiliar territory — learning the platform, building integrations, registering and closing deals. Like a field atlas, it earns trust through structure, legible wayfinding, and honest depiction rather than spectacle: every screen orients the reader ("you are here, here is the path, here is what's next"), and imagery functions as landmarks, not decoration. The people using it are building high-stakes, real-time, event-driven systems, so the surface stays calm and capable — it recedes so the work can lead — while remaining unmistakably warm and human, never a cold enterprise console.

The system is **teal-anchored and duotone-disciplined**. A single stormy teal carries primary action and identity; a deep dark-teal ink carries nearly all text; a Midnight Violet *emphasis* accent appears rarely, for the few moments that deserve weight. Photography is never raw — it is pulled through a teal-duotone treatment so six unrelated stock images read as one Vantiq set. Type is dense and small-first: the workspace is information-rich, so `body` and `label` sizes dominate and headings stay modest. A distinctive **mono, uppercase, wide-tracked micro-label** marks telemetry-style readouts (progress trackers, "Currently Tracking") — the instrument voice inside an otherwise humane interface.

Surfaces are **consistently lifted**: cards rest on a soft shadow rather than sitting flush, giving the atlas a gentle physical presence, like leaves of paper you can pick up. Motion is restrained and never load-bearing — the resting state is always the finished state — so animation clarifies (a thumbnail *grows* into its lightbox; a veil *thins* on hover) instead of performing.

**Key Characteristics:**
- Teal-anchored palette with a rare Midnight Violet emphasis accent
- Duotone-unified photography — no raw stock imagery, ever
- Dense, small-first typography with a mono telemetry-readout voice
- Consistently lifted surfaces on soft, ink-tinted shadow
- Full, first-class dark mode
- Motion that clarifies, never performs

## Colors

A cool teal family does the structural work; warmth and character come from where the palette *doesn't* go — a single violet accent and a disciplined semantic set.

### Primary
- **Stormy Teal** (`#0f5a5b`): The identity color and primary action — primary buttons' key stop, active nav, links, focus rings, progress fills, selected states, and the multiply scrim on all photography. In dark mode it brightens to `#1f7a7b`.

### Secondary
- **Azure Mist** (`#d6e6e5`): Soft teal-tinted fills for secondary buttons, chips, and quiet surfaces that need to lift off the background without competing with primary.

### Tertiary (Emphasis)
- **Midnight Violet** (`#351431`): The `emphasis` accent — deliberately rare. Section-heading text, the upper gradient stop on the default button, and the one or two moments per screen that earn extra weight. In dark mode: `#6e2f63`.

### Neutral
- **Dark Teal / Ink** (`#0d3d3d`): Nearly all foreground text and the page's ink identity; also the tint behind every shadow (`--shadow-color`). The default background in dark mode.
- **Portal Background** (`#f3f8f7`): The faint cool-teal page field — never pure white, so white cards read as lifted.
- **Card White** (`#ffffff`): Elevated card and popover surfaces.
- **Surface Sunken** (`#edf4f3`): Recessed wells and inset areas one step below the page.
- **Lavender Grey** (`#8797b2`): Muted/secondary text and dark-mode muted foreground; a cool grey that keeps secondary text from going flat.
- **Border** (`#d8e3e2`): Hairline dividers and card edges — a low-contrast teal-grey, quiet by design.

### Semantic
- **Success** `#2f7548` · **Warning** `#c98a3e` · **Info** `#4c6fa6` · **Critical** `#6b3566` · **Destructive** `#b23a34`. Each ships a paired foreground and a dark-mode variant. Warning and Info double as chart accents.

### Named Rules
**The One Violet Rule.** Midnight Violet `emphasis` is an accent, not a color you build with. It appears on ≤10% of any screen — a heading, one gradient edge, a single badge. Its rarity is what makes it read as emphasis; spread it around and it becomes wallpaper.

**The Never-Pure-White Rule.** The page field is `#f3f8f7`, not white. White is reserved for lifted surfaces (cards, popovers). This is what lets "consistently lifted" read without heavy shadows.

## Typography

**Display / Body Font:** `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` — one sans-serif family for everything. The font decision is deliberately deferred in `app/globals.css` (branding team to decide Gilroy vs. an open fallback); nothing references a font name directly, so it swaps in one place.
**Readout Font:** `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` — reserved exclusively for telemetry-style micro-labels.

**Character:** Neutral, legible, and unfussy — the type gets out of the way of a dense workspace. Personality is carried by the mono readout voice and by weight/tracking, not by an expressive display face.

### Hierarchy
- **Display** (600, `1.875rem`/text-3xl, line-height 1.1): Rare — the largest page or hero titles only.
- **Headline** (600, `1.5rem`/text-2xl, line-height 1.2): Standard page titles.
- **Title** (600, `1.125rem`/text-lg, line-height 1.3): Card titles and sub-section heads.
- **Body** (400, `0.875rem`/text-sm, line-height 1.5): The workhorse — the overwhelmingly dominant size across the app.
- **Label** (500, `0.75rem`/text-xs): Metadata, secondary lines, chip text, captions.
- **Readout** (600 mono, `0.6875rem`/11px, uppercase, letter-spacing `0.14em`): Telemetry micro-labels — "Tracking", "Currently Tracking". The instrument voice.

### Named Rules
**The Section-Heading Rule.** A section heading is `text-sm font-medium text-emphasis` (see `components/section-heading.tsx`) — one definition, portal-wide. Do not reinvent it larger or in a different color per page.

**The Readout-Voice Rule.** The mono uppercase treatment is *only* for genuine telemetry readouts (progress state, live-tracking labels). It is never a section heading and never decoration. If it isn't a readout, it isn't mono.

## Layout

A left **app sidebar + top header** shell wraps every role's view (`components/shell/`). Content sits in a centered max-width column with generous gutters. The grid is card-driven: hub and dashboard pages compose responsive card grids (typically 1 → 2 → 3 columns) that collapse to a single stacked column on mobile. Density is high but not cramped — `24px` (gap-6 / p-6) is the default card rhythm, with `12–16px` for tighter internal groupings. Breakpoints follow Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`); the signature responsive move is the TrackingPathCard, which flips from a horizontal dot-and-line timeline on `sm+` to a vertical list on mobile.

## Elevation & Depth

Surfaces are **consistently lifted** — the atlas is made of pickup-able leaves, not flush panels. Because the page field is a tinted off-white and cards are true white, even a whisper of shadow reads as elevation.

- Every `Card` rests on `shadow-sm` by default — always slightly off the page, never flush.
- Feature and interactive cards escalate to `.shadow-card`: a **six-layer stacked soft shadow tinted to the ink color** (`--shadow-color: 13 61 61`), each layer at `0.04` opacity, ramping from a `1px` seam to a `24px` diffuse base. The result is soft and ambient — a floating page, not a hard drop shadow.
- Dark mode neutralizes the shadow tint to black (`0 0 0`) and leans more on tonal surface steps (`surface-sunken` / `surface-elevated`).

### Shadow Vocabulary
- **Resting** (`shadow-sm`): Every card at rest.
- **Lifted** (`.shadow-card`, the 6-layer ink-tinted stack): Feature cards, primary content tiles, anything the eye should treat as a distinct object.

### Named Rules
**The Ink-Tinted Shadow Rule.** Shadows are never neutral grey/black in light mode — they are tinted to the portal's ink (`rgb(var(--shadow-color) / 0.04)`). A raw black drop shadow is off-system.

## Shapes

Gently rounded, calm geometry. The radius scale derives from a `0.5rem` base: **sm `4px`, md `6px`, lg `8px`, xl `12px`.** Cards use the largest corner (`rounded-xl`, 12px) to feel like soft physical objects; buttons, inputs, and badges use `rounded-md` (6px). Borders are hairline (`1px`) in the low-contrast teal-grey `border` color — present for definition, never assertive. Progress dots and status markers are full circles. Imagery containers clip to the card's own radius. There are no sharp corners and no heavy strokes anywhere in the system.

## Components

The feel across the board: **refined & guiding** — quietly polished, unobtrusive, always pointing the way. Soft edges, gentle gradients, nothing shouts.

### Buttons
- **Shape:** `rounded-md` (6px); default height `36px` (h-9), sizes `sm` (32px) / `lg` (40px) / icon.
- **Default (signature):** a soft diagonal wash — `bg-linear-to-br from-emphasis/20 via-accent to-secondary`, `border-primary/25`, with ink text. This is the portal's quiet-confidence primary action: a light, near-white wash (matching the CTA card treatment) rather than a saturated fill, kept legible against the card by its border and hairline contrast rather than color weight. Hover: `opacity-90`.
- **Secondary:** solid Azure Mist (`bg-secondary`) with ink text; hover darkens to `bg-secondary/80`.
- **Outline / Ghost / Link:** bordered-on-card, transparent-until-hover, and underline-on-hover respectively — for lower-priority actions.
- **Focus:** `3px` ring in `ring/50` plus border shift — never removed, always visible.

### Cards / Containers
- **Corner:** `rounded-xl` (12px).
- **Background:** Card White (`#ffffff`) on the tinted page field.
- **Shadow:** `shadow-sm` at rest, `.shadow-card` when lifted (see Elevation).
- **Border:** hairline `border` color.
- **Internal padding:** `24px` (p-6), with `gap-6` between stacked regions.

### Badges / Chips
- **Shape:** `rounded-md`, `px-2 py-0.5`, `text-xs font-medium`.
- **Variants:** default (solid primary teal), secondary (Azure Mist), outline (foreground text), plus semantic mappings for status.

### Inputs / Fields
- **Style:** filled `input` color (`#e9f1f0`), hairline border, `rounded-md`, `36px` tall.
- **Focus:** `3px` primary ring + border shift; `:focus-visible` shows a `2px` solid primary outline at `2px` offset globally.
- **Invalid:** `aria-invalid` drives a destructive ring and border.

### Navigation (App Shell)
- **Sidebar:** white (`sidebar` token), hairline right border; active item in primary teal, hover in a soft teal accent fill. A **role switcher** lets users move between role-based views of the same portal.
- **Header:** thin top bar with search (`⌘K` command dialog) and account controls.

### Signature: TrackingPathCard
A progress "roadmap" module (`components/tracking-path-card.tsx`): a dot-and-line timeline of real course lessons, headed by the mono **"Tracking"** readout label. Dots are `done` (filled primary) / `current` (ringed `ring-4 ring-primary/20`) / `upcoming` (bordered). Completing a tracked path fires a one-time confetti celebration for celebration-enabled roles. Horizontal timeline on `sm+`, vertical list on mobile.

### Signature: FlagshipIndustryTile & DemoGallery
The teal-duotone imagery system (`components/flagship-industry-tile.tsx`): a real photograph pulled down to `saturate-[0.55] contrast-[1.1] brightness-[0.92]`, then unified by a full-coverage `bg-primary/22 mix-blend-multiply` scrim plus a bottom-weighted teal gradient for text contrast. On hover within a card link, the veil thins (`opacity-45`) over 500ms and the photo warms toward true color. DemoGallery expands a clicked thumbnail into a lightbox by *growing the same object into place* rather than cutting to a modal.

## Do's and Don'ts

### Do:
- **Do** put all text on the ink color (`#0d3d3d`) and reserve Stormy Teal (`#0f5a5b`) for action, identity, and state.
- **Do** run every photograph through the teal-duotone treatment (desaturate + `bg-primary` multiply scrim) so imagery reads as one Vantiq set. **This is binding — no raw stock photography reaches the UI.**
- **Do** use `SectionHeading` for section headings and the mono readout voice *only* for genuine telemetry (progress, live-tracking labels).
- **Do** keep surfaces lifted: white cards on the `#f3f8f7` field, `shadow-sm` at rest escalating to `.shadow-card` for feature cards.
- **Do** keep body copy at `text-sm` and let headings stay modest — this is a dense, information-first workspace.
- **Do** ship every new color and component with a dark-mode value; dark mode is first-class, not an afterthought.

### Don't:
- **Don't** spend Midnight Violet emphasis freely — it's an accent for ≤10% of a screen, never a build color (The One Violet Rule).
- **Don't** use raw grey/black drop shadows; shadows are ink-tinted (The Ink-Tinted Shadow Rule).
- **Don't** put the mono uppercase treatment on anything that isn't a telemetry readout.
- **Don't** introduce new palette entries, radii, or one-off component patterns — extend the existing tokens in `app/globals.css` rather than forking the system.
- **Don't** let motion become load-bearing: the resting state must be the finished state, and every animation must respect `prefers-reduced-motion`.
- **Don't** use pure white as a page background — that flattens the "consistently lifted" depth model.
