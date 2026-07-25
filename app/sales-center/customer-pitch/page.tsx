import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CUSTOMER_PITCH_COLLATERAL } from "@/lib/sales-data";
import { FileText } from "lucide-react";

export default function CustomerPitchCollateralPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/sales-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Sales Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <FileText className="size-5 text-primary" />
          Customer Pitch Collateral
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Decks and calculators for the customer-facing pitch.
        </p>
      </div>

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
