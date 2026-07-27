import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { BookmarkButton } from "@/components/bookmark-button";
import { FlagshipIndustryTile } from "@/components/flagship-industry-tile";
import { FLAGSHIP_INDUSTRIES, FLAGSHIP_GRADIENTS } from "@/lib/flagship-industries";

export default function FlagshipDemoPage() {
  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Developer Hub"
        title="Flagship Demo"
        description="Flagship Demo is your library of end-to-end reference builds, one per industry — not a customer-facing pitch, but a working starting point for your own build. Each industry page breaks its demo down into the specific use cases it covers, with the reusable VAIL templates, connectors, and data models behind them ready to adapt into a customer's implementation."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/flagship-demo",
            label: "Flagship Demo",
            href: "/developer-center/flagship-demo",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLAGSHIP_INDUSTRIES.map((industry, i) => (
          <Link key={industry.id} href={`/developer-center/flagship-demo/${industry.id}`}>
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
