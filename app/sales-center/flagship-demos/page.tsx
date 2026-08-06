import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { BookmarkButton } from "@/components/bookmark-button";
import { FlagshipIndustryTile } from "@/components/flagship-industry-tile";
import { FLAGSHIP_INDUSTRIES } from "@/lib/flagship-industries";

export const metadata: Metadata = {
  title: "Interactive Demos",
  description:
    "The Flagship Demo Series: industry command centres built on Vantiq that you can walk a prospect through live.",
};

export default function SalesFlagshipDemosPage() {
  return (
    <div className="space-y-16">
      <PageBanner eyebrow="Sales Hub" title="Interactive Demos">
        {/* Passed as a child rather than through `description`: PageHero caps
            its description inside a max-w-3xl block, which stopped this
            paragraph at about 65% of the column and left a void to its right.
            Children render outside that cap, so this fills the band.

            Copy note: reworded from "each one demonstrates a real end-to-end
            Vantiq deployment". These are built demonstration applications, not
            customer deployments. */}
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
          The Flagship Demo Series: industry command centres built on Vantiq that you can walk a
          prospect through live. Each one runs a complete flow (ingestion, agents reasoning over it
          and coordinating with each other, and the operational actions that follow, every one of
          them governed and audited) so a customer sees how the platform behaves in their world
          before writing any of their own code.
        </p>

        <BookmarkButton
          item={{
            id: "/sales-center/flagship-demos",
            label: "Interactive Demos",
            href: "/sales-center/flagship-demos",
            iconKey: "Handshake",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLAGSHIP_INDUSTRIES.map((industry) => (
          <Link key={industry.id} href={`/sales-center/flagship-demos/${industry.id}`}>
            <Card className="shadow-card h-full overflow-hidden border-none p-0 transition-shadow hover:shadow-lg">
              <FlagshipIndustryTile industry={industry} />
              <div className="p-4">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="text-sm font-medium text-foreground">{industry.label}</p>
                  {industry.codename && (
                    <span className="text-xs text-muted-foreground">{industry.codename}</span>
                  )}
                </div>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {industry.summary}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                    {industry.agentCount} agents
                  </Badge>
                  <Badge variant="secondary">
                    {industry.useCases.length} capabilities
                  </Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
