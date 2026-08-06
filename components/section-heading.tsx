import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The portal's one section heading.
 *
 * Two treatments had drifted apart: `text-sm font-medium text-emphasis` on hub
 * and dashboard pages, and a `font-mono` uppercase micro-label on the partner
 * dashboard, so the same rank of heading looked different depending on which
 * page you were on. This is the single definition.
 *
 * The mono/telemetry treatment survives only inside TrackingPathCard, where the
 * direction contract in app/page.tsx calls for it deliberately; it is a readout,
 * not a section heading.
 */
export function SectionHeading({
  children,
  description,
  action,
  icon,
  className,
  as: As = "h2",
}: {
  children: React.ReactNode;
  /** Optional sub-line under the heading. */
  description?: React.ReactNode;
  /** Optional trailing control, e.g. a "View all" link. */
  action?: React.ReactNode;
  /** Optional leading icon, e.g. the dashboard's per-section glyphs. */
  icon?: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <As className="flex items-center gap-2 text-sm font-medium text-emphasis">
          {icon}
          {children}
        </As>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** The "View all" affordance used beside several section headings. */
export function SectionHeadingLink({ href, children = "View all" }: { href: string; children?: React.ReactNode }) {
  return (
    <Link href={href} className="text-xs text-emphasis hover:underline">
      {children}
    </Link>
  );
}
