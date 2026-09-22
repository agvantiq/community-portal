import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ExternalLink, type LucideIcon } from "lucide-react";

interface DocItem {
  id?: string;
  title: string;
  detail: string;
  /** Real destination for this item. Items without one render as inert (no link, no external-link icon). */
  href?: string;
  /** ISO date ("YYYY-MM-DD") this item was published — only read when `groupByYear` is set. */
  date?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Year > "Month: Title" archive layout, mirroring how
 * community.vantiq.com/devcenter/technical-documents-content/ lists its
 * Developer How To's — newest year first, newest month first within a year.
 * Items without a `date` (not every DevDocListPage consumer has real
 * publish dates yet) fall back to the plain row treatment below, appended
 * after the dated years rather than dropped.
 */
function DatedArchive({ items, idPrefix }: { items: DocItem[]; idPrefix?: string }) {
  const dated = items.filter((item): item is DocItem & { date: string } => Boolean(item.date));
  const undated = items.filter((item) => !item.date);

  const byYear = new Map<number, (DocItem & { date: string })[]>();
  for (const item of dated) {
    const year = new Date(`${item.date}T00:00:00Z`).getUTCFullYear();
    const bucket = byYear.get(year);
    if (bucket) bucket.push(item);
    else byYear.set(year, [item]);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);
  for (const year of years) {
    byYear.get(year)!.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }

  return (
    <>
      {years.map((year) => (
        <div key={year} className="mt-6 first:mt-0">
          <p className="text-base font-semibold text-foreground">{year}</p>
          <div className="mt-2 space-y-1.5">
            {byYear.get(year)!.map((item) => {
              const month = MONTH_NAMES[new Date(`${item.date}T00:00:00Z`).getUTCMonth()];
              return (
                <div key={item.title} className="flex items-baseline gap-2 text-sm">
                  <span className="w-24 shrink-0 font-medium text-foreground">{month}:</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-0 items-center gap-1 text-emphasis hover:underline"
                    >
                      <span className="truncate">{item.title}</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="min-w-0 truncate text-foreground">{item.title}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {undated.length > 0 && (
        <div className="mt-6 space-y-2 first:mt-0">
          {undated.map((item) => (
            <PlainRow key={item.title} item={item} idPrefix={idPrefix} />
          ))}
        </div>
      )}
    </>
  );
}

function PlainRow({ item, idPrefix }: { item: DocItem; idPrefix?: string }) {
  const rowClassName =
    "scroll-mt-6 flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors target:border-primary target:bg-primary/5" +
    (item.href ? " hover:border-primary" : "");
  const rowId = idPrefix && item.id ? `${idPrefix}-${item.id}` : undefined;
  const content = (
    <>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.detail}</p>
      </div>
      {item.href && <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />}
    </>
  );

  // Items with a real destination open it in a new tab — this list links out
  // to community.vantiq.com / GitHub, not to another page in this portal.
  // Items without one (not every entry here has a confirmed real-world
  // source yet) stay inert rather than linking nowhere.
  return item.href ? (
    <a id={rowId} href={item.href} target="_blank" rel="noopener noreferrer" className={rowClassName}>
      {content}
    </a>
  ) : (
    <div id={rowId} className={rowClassName}>
      {content}
    </div>
  );
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
  groupByYear = false,
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
  /** Year > "Month: Title" archive layout instead of the plain card list — see DatedArchive. */
  groupByYear?: boolean;
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
        {groupByYear ? (
          <DatedArchive items={items} idPrefix={idPrefix} />
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <PlainRow key={item.title} item={item} idPrefix={idPrefix} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
