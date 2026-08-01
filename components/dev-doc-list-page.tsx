import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ExternalLink, type LucideIcon } from "lucide-react";

interface DocItem {
  id?: string;
  title: string;
  detail: string;
}

// Shared body for the Developer Hub sub-pages that are just a titled list of
// docs/links (Documentation, VAIL Reference, Extension Sources, Deployment &
// Operations, Security & Authentication, API References). Code Recipes and
// the Prompt Gallery use a tag badge instead of a detail line, and
// Architecture has its own interactive tiers, so those pages are composed
// individually rather than through here.
export function DevDocListPage({
  title,
  description,
  items,
  idPrefix,
  backHref = "/developer-center",
  backLabel = "Developer Hub",
  bookmarkHref,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  items: DocItem[];
  idPrefix?: string;
  /** Defaults to Developer Hub — pass the immediate parent for a nested page (e.g. Technical Documents). */
  backHref?: string;
  backLabel?: string;
  /** This page's own route — pass to make it bookmarkable from Developer Hub's Quick Links. */
  bookmarkHref?: string;
}) {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href={backHref} className="hover:text-foreground">
            &larr; {backLabel}
          </Link>
        }
        title={title}
        description={description}
      >
        {bookmarkHref && (
          <BookmarkButton
            item={{ id: bookmarkHref, label: title, href: bookmarkHref, iconKey: "Code2" }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      <Card className="shadow-card p-6">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.title}
              id={idPrefix && item.id ? `${idPrefix}-${item.id}` : undefined}
              className="scroll-mt-6 flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary target:border-primary target:bg-primary/5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
