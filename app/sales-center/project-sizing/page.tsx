import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PROJECT_SIZING_PRICING } from "@/lib/sales-data";
import { Calculator, FileText } from "lucide-react";

export default function ProjectSizingPricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/sales-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Sales Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Calculator className="size-5 text-primary" />
          Project Sizing &amp; Pricing
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Worksheets and templates for scoping and pricing a deal.
        </p>
      </div>

      <Card className="shadow-card p-6">
        <div className="space-y-2">
          {PROJECT_SIZING_PRICING.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 rounded-md border border-border p-3 text-sm text-foreground transition-colors hover:border-primary"
            >
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              {f}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
