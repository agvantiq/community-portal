import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The one hero/banner style for the whole portal: a tall vertical gradient
 * (Azure Mist fading to white) so it reads as hero space rather than a header
 * bar, and blends seamlessly into the shell's white page field below.
 *
 * The gradient background bleeds all the way to the *browser window* on any
 * viewport width, not just to the edges of the centered `max-w-[1320px]`
 * content column — on ultra-wide screens the column stops growing and sits
 * centered with its own gutters, and without this the hero would visibly
 * stop there too, leaving plain white margins outside it. Since this
 * component is nested inside that column (through other pages' own
 * wrappers), it can't measure the column's actual gutter width in plain
 * CSS — so `--app-sidebar-w` (set once on `<main>` in AppShell) plus the
 * column's own known 1320px cap let it compute that gutter with `calc()`
 * and cancel exactly it, landing on the real window edge every time. Where
 * the shell doesn't set that variable (onboarding, which drops the sidebar
 * entirely — see components/onboarding-landing.tsx), it defaults to 0px and
 * this degrades to a plain viewport-centered bleed, which is already correct
 * there.
 * Replaces every prior per-page banner treatment (dotted cards, dark console
 * strips, atmospheric dot fields) — content only changes by props.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  blendTo = "white",
}: {
  eyebrow?: React.ReactNode;
  /** Omit only where a page genuinely has nothing to title — e.g. a quiz, whose own card already states what it is. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links rendered in flow, below the description. */
  actions?: React.ReactNode;
  /** Slot for absolutely-positioned controls, e.g. a BookmarkButton. */
  children?: React.ReactNode;
  className?: string;
  /** The color the gradient fades into — must match the page field it sits on, or the seam shows. */
  blendTo?: string;
}) {
  // Extends past this element's own edges by exactly the gutter width
  // between the (possibly narrower) main content area and the browser
  // window — see the component doc comment above for the full derivation.
  const bleed = "max(0px, (100vw - var(--app-sidebar-w, 0px) - 1320px) / 2)";

  return (
    <div
      className={cn("relative -mx-6 -mt-8 px-6 pt-16 pb-10 md:-mx-10 md:-mt-10 md:px-10 md:pt-20", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{
          left: `calc(0px - ${bleed})`,
          right: `calc(0px - ${bleed})`,
          background: `linear-gradient(to bottom, var(--secondary) 0%, ${blendTo} 100%)`,
        }}
      />
      <div className="relative flex max-w-3xl flex-col gap-3">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p>
        )}
        {title && <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {actions && <div className="mt-2 flex flex-wrap items-center gap-4">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
