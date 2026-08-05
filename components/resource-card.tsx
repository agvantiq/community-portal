import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RESOURCE_TYPE_STYLE, type ResourceItem } from "@/lib/developer-data";

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
        {resource.description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{resource.description}</p>
        )}
      </Card>
    </Link>
  );
}
