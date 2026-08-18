import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RESOURCE_TYPE_STYLE, type ResourceItem } from "@/lib/developer-data";

/**
 * Type + category + title only — no blurb.
 *
 * The blurb was cut 2026-08-18. The WordPress resources these cards map to
 * have titles but no short description, and adding an "excerpt" field across
 * the whole catalog was dropped from scope rather than hand-writing one per
 * entry. Don't reinstate it here without that field existing on the
 * WordPress side first, or the mockup goes back to specifying content the
 * build can't produce.
 *
 * `ResourceItem.description` is unchanged and still feeds the resources
 * search filter and the /resources/[id] detail pages — it is only absent
 * from the card face.
 */
export function ResourceCard({ resource }: { resource: ResourceItem }) {
  return (
    <Link href={resource.href}>
      <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className={RESOURCE_TYPE_STYLE[resource.type]}>
            {resource.type}
          </Badge>
          <span className="text-[11px] text-muted-foreground">{resource.category}</span>
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">{resource.title}</p>
      </Card>
    </Link>
  );
}
