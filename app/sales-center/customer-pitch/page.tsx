import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { CUSTOMER_PITCH_COLLATERAL } from "@/lib/sales-data";
import { FileText } from "lucide-react";

export default function CustomerPitchCollateralPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title="Customer Pitch Collateral"
        description="Decks and calculators for the customer-facing pitch."
      />

      <Card className="shadow-card p-6">
        <div className="space-y-2">
          {CUSTOMER_PITCH_COLLATERAL.map((f) => (
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
