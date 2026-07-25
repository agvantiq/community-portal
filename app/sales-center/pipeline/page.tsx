import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEALS, type Deal } from "@/lib/sample-data";
import { ClipboardList } from "lucide-react";

const stageTone: Record<Deal["stage"], string> = {
  Discovery: "bg-info/10 text-info",
  "Technical Validation": "bg-info/10 text-info",
  Proposal: "bg-emphasis/10 text-emphasis",
  Negotiation: "bg-emphasis/10 text-emphasis",
  "Closed Won": "bg-success/10 text-success",
};

export default function DealPipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/sales-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Sales Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <ClipboardList className="size-5 text-primary" />
          Deal Pipeline
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every deal in flight across the partner ecosystem, by stage.
        </p>
      </div>

      <Card className="shadow-card p-6">
        <div className="space-y-2">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{deal.client}</p>
                <p className="truncate text-xs text-muted-foreground">{deal.useCase}</p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:inline">{deal.owner}</span>
              <Badge variant="secondary" className={stageTone[deal.stage]}>
                {deal.stage}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
