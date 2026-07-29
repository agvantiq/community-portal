import * as React from "react";
import { PageHero } from "@/components/page-hero";

/**
 * Thin adapter over PageHero — kept as PageBanner so existing callers don't
 * need to change, but the visual is now the one shared portal-wide hero.
 */
export function PageBanner({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links rendered in flow, below the description. */
  actions?: React.ReactNode;
  /** Slot for absolutely-positioned controls, e.g. a BookmarkButton. */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <PageHero eyebrow={eyebrow} title={title} description={description} actions={actions} className={className}>
      {children}
    </PageHero>
  );
}
