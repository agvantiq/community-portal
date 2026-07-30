import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { MARKETING_DEMOS } from "@/lib/sales-data";
import { PlayCircle, ArrowUpRight } from "lucide-react";

export default function MarketingDemosPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title="Demo Videos"
        description="Short, polished demo videos for outbound and campaigns — hosted on vantiq.com/demos, opens in a new tab."
      />

      <Card className="shadow-card p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MARKETING_DEMOS.map((demo) => (
            <a
              key={demo.title}
              href={demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-md border border-border p-4 transition-colors hover:border-primary"
            >
              <PlayCircle className="size-5 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  {demo.title}
                  <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{demo.detail}</p>
                <Badge variant="secondary" className="mt-2">
                  {demo.category}
                </Badge>
              </div>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
