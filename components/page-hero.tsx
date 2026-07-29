import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The one hero/banner style for the whole portal: a tall vertical gradient
 * (Azure Mist fading to white) so it reads as hero space rather than a
 * header bar, and blends seamlessly into the white page background below.
 * Replaces every prior per-page banner treatment (dotted cards, dark
 * console strips, atmospheric dot fields) — content only changes by props.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links rendered in flow, below the description. */
  actions?: React.ReactNode;
  /** Slot for absolutely-positioned controls, e.g. a BookmarkButton. */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative -mx-6 -mt-8 overflow-hidden px-6 pt-16 pb-24 md:-mx-10 md:-mt-10 md:px-10 md:pt-20",
        className
      )}
      style={{ background: "linear-gradient(to bottom, var(--secondary) 0%, white 100%)" }}
    >
      <div className="relative flex max-w-3xl flex-col gap-3">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {actions && <div className="mt-2 flex flex-wrap items-center gap-4">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
