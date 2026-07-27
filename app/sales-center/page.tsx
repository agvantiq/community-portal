import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { DEALS } from "@/lib/sample-data";
import { SALES_HUB_MODULES, type SalesHubModule } from "@/lib/sales-data";
import { ChevronRight } from "lucide-react";

function ModuleCard({ module }: { module: SalesHubModule }) {
  const Icon = module.icon;
  const count = module.id === "pipeline" ? DEALS.length : module.count;
  return (
    <Link href={module.href}>
      <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          {count !== undefined && <Badge variant="secondary">{count}</Badge>}
        </div>
        <p className="mt-3 flex items-center gap-1 text-sm font-medium text-foreground">
          {module.title}
          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{module.description}</p>
      </Card>
    </Link>
  );
}

export default function SalesCenterPage() {
  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Sales Hub"
        title="Sales Hub"
        description="Track pipeline, find teaming partners, and access every sales resource in one place. Pick a module to dive in."
      >
        <BookmarkButton
          item={{ id: "/sales-center", label: "Sales Hub", href: "/sales-center", iconKey: "Handshake" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SALES_HUB_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
