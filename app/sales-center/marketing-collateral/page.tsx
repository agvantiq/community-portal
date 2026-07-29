import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { MARKETING_COLLATERAL } from "@/lib/sales-data";
import { Download } from "lucide-react";

export default function MarketingCollateralPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title="Marketing Collateral"
        description="Brand assets, templates, and co-marketing materials."
      />

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
