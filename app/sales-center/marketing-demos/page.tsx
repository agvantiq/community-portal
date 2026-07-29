import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { MARKETING_DEMOS } from "@/lib/sales-data";
import { PlayCircle, Clock } from "lucide-react";

export default function MarketingDemosPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title="Marketing Demos"
        description="Short, polished demo videos for outbound and campaigns — pre-recorded, not live walkthroughs."
      />

      <Card className="shadow-card p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MARKETING_DEMOS.map((demo) => (
            <div
              key={demo.title}
              className="flex items-start gap-3 rounded-md border border-border p-4 transition-colors hover:border-primary"
            >
              <PlayCircle className="size-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{demo.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{demo.detail}</p>
                <span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {demo.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
