import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Dot-matrix background used by the boxed ("card") variant — fades evenly
 * top-to-bottom, tinted with a warm-to-cool sweep across our own token
 * palette rather than a literal rainbow.
 */
function DotMatrix() {
  const dotShape = "radial-gradient(black 1.4px, transparent 1.6px)";
  const verticalFade = "linear-gradient(to bottom, black 0%, black 45%, transparent 95%)";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(100deg, var(--warning) 0%, var(--primary) 35%, var(--info) 65%, var(--critical) 100%)",
          WebkitMaskImage: `${dotShape}, ${verticalFade}`,
          maskImage: `${dotShape}, ${verticalFade}`,
          WebkitMaskSize: "16px 16px, 100% 100%",
          maskSize: "16px 16px, 100% 100%",
          WebkitMaskRepeat: "repeat, no-repeat",
          maskRepeat: "repeat, no-repeat",
          maskComposite: "intersect",
        }}
      />
    </div>
  );
}

/**
 * Atmospheric dot field for the "background" (edge-to-edge) variant. Color
 * (purple → teal → blue) runs horizontally across the top edge; visibility
 * fades vertically (strong at top, dissolving by the lower third) — the two
 * are independent axes, so the field reads as a texture with vertical
 * movement rather than a single diagonal blob. A separate white (theme-aware)
 * glow sits on top, clearing the left-aligned text column horizontally, so
 * the copy stays highly readable without ever becoming a visible card.
 */
function AtmosphericDotField() {
  // Small, dense dots — read as a texture/field first, individual dots
  // second, rather than a scattering of decorative circles.
  const dotShape = "radial-gradient(black 1px, transparent 1.2px)";
  const verticalFade =
    "linear-gradient(to bottom, black 0%, black 20%, rgba(0,0,0,0.5) 50%, transparent 85%)";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(90deg, var(--critical) 0%, var(--primary) 50%, var(--info) 100%)",
          WebkitMaskImage: `${dotShape}, ${verticalFade}`,
          maskImage: `${dotShape}, ${verticalFade}`,
          WebkitMaskSize: "12px 12px, 100% 100%",
          maskSize: "12px 12px, 100% 100%",
          WebkitMaskRepeat: "repeat, no-repeat",
          maskRepeat: "repeat, no-repeat",
          maskComposite: "intersect",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--background) 0%, var(--background) 40%, transparent 78%)",
        }}
      />
    </div>
  );
}

export function DashboardHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  variant = "card",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links rendered in flow, below the description. */
  actions?: React.ReactNode;
  /** Slot for absolutely-positioned controls, e.g. a BookmarkButton. */
  children?: React.ReactNode;
  className?: string;
  /**
   * "card" (default): boxed, shadowed banner, matching every other hub page.
   * "background": full-bleed, content-sized — no box, no shadow, no fixed
   * height. Breaks out of the page's own left/right/top padding so the dot
   * field runs edge-to-edge and reads as part of the page.
   */
  variant?: "card" | "background";
}) {
  if (variant === "background") {
    return (
      <div
        className={cn(
          "relative -mx-6 -mt-8 overflow-hidden py-16 text-foreground md:-mx-10 md:-mt-10",
          className
        )}
      >
        <AtmosphericDotField />
        <div className="relative mx-6 max-w-[700px] md:mx-10">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-[560px] text-base text-muted-foreground">{description}</p>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>}
        </div>
        {children}
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "shadow-card relative overflow-hidden border-none bg-card px-8 py-12 text-foreground sm:py-14",
        className
      )}
    >
      <DotMatrix />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
        {actions && <div className="mt-6 flex flex-wrap items-center gap-4">{actions}</div>}
      </div>
      {children}
    </Card>
  );
}
