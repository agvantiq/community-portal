import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { BookmarkButton } from "@/components/bookmark-button";
import { FlagshipIndustryTile } from "@/components/flagship-industry-tile";
import { FLAGSHIP_INDUSTRIES, FLAGSHIP_GRADIENTS } from "@/lib/flagship-industries";

export default function SalesFlagshipDemosPage() {
  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Sales Hub"
        title="Flagship Interactive Demos"
        description="Ready-to-run, industry-specific showcases you can walk a prospect through live — each one demonstrates a real end-to-end Vantiq deployment, from data ingestion to the operational actions it triggers, so a customer sees exactly how the platform solves problems in their world before a single line of their own code is written."
      >
        <BookmarkButton
          item={{
            id: "/sales-center/flagship-demos",
            label: "Flagship Interactive Demos",
            href: "/sales-center/flagship-demos",
            iconKey: "Handshake",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLAGSHIP_INDUSTRIES.map((industry, i) => (
          <Link key={industry.id} href={`/sales-center/flagship-demos/${industry.id}`}>
            <Card className="shadow-card h-full overflow-hidden border-none p-0 transition-shadow hover:shadow-lg">
              <FlagshipIndustryTile icon={industry.icon} gradient={FLAGSHIP_GRADIENTS[i % FLAGSHIP_GRADIENTS.length]} />
              <div className="p-4">
                <p className="text-sm font-medium text-foreground">{industry.label}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{industry.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
