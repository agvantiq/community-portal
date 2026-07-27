import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Concentric hairline arcs, echoing the flowing line motif on vantiq.com's page
 * banners. Two groups: one sweeping in from the right edge, one from the bottom
 * left, both centered off-canvas so only the curves read.
 */
function ArcMotif() {
  const rightArcs = Array.from({ length: 18 }, (_, i) => 90 + i * 26);
  const leftArcs = Array.from({ length: 12 }, (_, i) => 60 + i * 28);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 520 320"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-y-0 right-0 h-full w-[62%] text-primary/25"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {rightArcs.map((r) => (
            <circle key={r} cx="560" cy="-20" r={r} />
          ))}
        </g>
      </svg>
      <svg
        viewBox="0 0 400 320"
        preserveAspectRatio="xMinYMax slice"
        className="absolute inset-y-0 left-0 h-full w-[34%] text-primary/20"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {leftArcs.map((r) => (
            <circle key={r} cx="-30" cy="360" r={r} />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function PageBanner({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  motif,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links rendered in flow, below the description. */
  actions?: React.ReactNode;
  /** Slot for absolutely-positioned controls, e.g. a BookmarkButton. */
  children?: React.ReactNode;
  className?: string;
  /** Override the default arc motif with a page-specific decoration (e.g. Vantiq Spark's burst). */
  motif?: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "shadow-card relative overflow-hidden border-none bg-linear-to-br from-card via-card to-secondary/70 px-8 py-12 text-foreground sm:py-14",
        className
      )}
    >
      {motif ?? <ArcMotif />}
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
        {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      </div>
      {children}
    </Card>
  );
}
