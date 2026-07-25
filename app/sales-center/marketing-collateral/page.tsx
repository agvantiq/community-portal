import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MARKETING_COLLATERAL } from "@/lib/sales-data";
import { Megaphone, Download } from "lucide-react";

export default function MarketingCollateralPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/sales-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Sales Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Megaphone className="size-5 text-primary" />
          Marketing Collateral
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Brand assets, templates, and co-marketing materials.
        </p>
      </div>

      <Card className="shadow-card p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MARKETING_COLLATERAL.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Download className="size-4 shrink-0 text-muted-foreground" />
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                <Download className="size-3.5" />
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
