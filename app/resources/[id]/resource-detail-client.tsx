"use client";

/**
 * DESIGN TEMPLATE — per-item resource detail page.
 *
 * Only the top row of /resources and /resources/knowledge-base (the first 3
 * cards in the grid) link here instead of to their shared category listing
 * page (e.g. /developer-center/documentation) — a pilot for a "one page per
 * catalog item" pattern. To extend it to more cards, give the item its own
 * href of `/resources/${item.id}` at the call site (see app/resources/page.tsx
 * and app/resources/knowledge-base/page.tsx) — this template already resolves
 * any id in RESOURCE_CENTER_ITEMS via lib/developer-data.ts#getResourceById,
 * no further wiring needed here.
 */

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRole } from "@/components/shell/role-provider";
import { RESOURCE_CENTER_ITEMS, RESOURCE_TYPE_STYLE, type ResourceItem } from "@/lib/developer-data";
import { ChevronRight } from "lucide-react";

export function ResourceDetailClient({ resource }: { resource: ResourceItem }) {
  const { role } = useRole();

  // A handful of other items in the same category — real catalog data, not
  // fabricated related-content. They still go to the shared category page,
  // since only this item has its own detail page for now.
  const related = RESOURCE_CENTER_ITEMS.filter(
    (r) => r.category === resource.category && r.id !== resource.id
  ).slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/resources" className="hover:text-foreground">
            &larr; Resources
          </Link>
        }
        title={resource.title}
        description={resource.description || undefined}
      >
        {role !== "onboarding" && (
          <BookmarkButton
            item={{
              id: `/resources/${resource.id}`,
              label: resource.title,
              href: `/resources/${resource.id}`,
              iconKey: "Library",
            }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      <Card className="shadow-card grid grid-cols-1 divide-y divide-border p-0 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</p>
          <Badge variant="secondary" className={RESOURCE_TYPE_STYLE[resource.type]}>
            {resource.type}
          </Badge>
        </div>
        <div className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Category</p>
          <Badge variant="secondary">{resource.category}</Badge>
        </div>
      </Card>

      {related.length > 0 && (
        <Card className="shadow-card p-6">
          <h2 className="mb-4 text-sm font-medium text-foreground">More in {resource.category}</h2>
          <div className="space-y-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <span className="min-w-0 truncate text-sm font-medium text-foreground">{r.title}</span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
