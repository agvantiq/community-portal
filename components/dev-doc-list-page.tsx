import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ExternalLink, type LucideIcon } from "lucide-react";

interface DocItem {
  id?: string;
  title: string;
  detail: string;
}

// Shared body for the seven Developer Hub sub-pages that are just a titled
// list of docs/links (Documentation, VAIL Reference, Extension Sources,
// Deployment & Operations, Security & Authentication, API References,
// Flagship Demo). Code Recipes and the Prompt Gallery use a tag badge
// instead of a detail line, and Architecture has its own interactive tiers,
// so those three pages are composed individually rather than through here.
export function DevDocListPage({
  title,
  description,
  icon: Icon,
  items,
  idPrefix,
  backHref = "/developer-center",
  backLabel = "Developer Hub",
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  items: DocItem[];
  idPrefix?: string;
  /** Defaults to Developer Hub — pass the immediate parent for a nested page (e.g. Technical Documents). */
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Link href={backHref} className="text-xs text-muted-foreground hover:text-foreground">
          &larr; {backLabel}
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Icon className="size-5 text-primary" />
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

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
