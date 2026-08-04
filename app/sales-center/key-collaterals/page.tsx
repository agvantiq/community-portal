import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { DATASHEETS_AND_WHITEPAPERS, INDUSTRY_SOLUTION_BRIEFS } from "@/lib/sales-data";
import { ExternalLink } from "lucide-react";

function StaticList({ items }: { items: { title: string; detail: string }[] }) {
  return (
    <div className="mt-4 space-y-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.detail}</p>
          </div>
          <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}

export default function KeyCollateralsPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title="Key Collaterals"
        description="Datasheets, whitepapers, and industry solution briefs for positioning Vantiq."
      >
        <BookmarkButton
          item={{ id: "/sales-center/key-collaterals", label: "Key Collaterals", href: "/sales-center/key-collaterals", iconKey: "Handshake" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <Card className="shadow-card p-6">
        <h2 className="text-sm font-medium text-foreground">Datasheets and Whitepapers</h2>
        <StaticList items={DATASHEETS_AND_WHITEPAPERS} />
      </Card>

      <Card className="shadow-card p-6">
        <h2 className="text-sm font-medium text-foreground">Industry Solution Briefs</h2>
        <StaticList items={INDUSTRY_SOLUTION_BRIEFS} />
      </Card>
    </div>
  );
}
