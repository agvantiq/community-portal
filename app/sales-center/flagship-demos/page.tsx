import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SALES_FLAGSHIP_DEMOS } from "@/lib/sales-data";
import { Presentation } from "lucide-react";

export default function SalesFlagshipDemosPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/sales-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Sales Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Presentation className="size-5 text-primary" />
          Vantiq Flagship Demos
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          End-to-end demos ready for customer meetings.
        </p>
      </div>

      <Card className="shadow-card p-6">
        <div className="space-y-2">
          {SALES_FLAGSHIP_DEMOS.map((demo) => (
            <div
              key={demo.title}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{demo.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{demo.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
