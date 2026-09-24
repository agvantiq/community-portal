import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { SectionHeading } from "@/components/section-heading";
import { BookmarkButton } from "@/components/bookmark-button";
import { SALES_RESOURCES } from "@/lib/sales-resources";
import { ChevronRight, Zap, FilePlus2, BookOpen } from "lucide-react";
import Link from "next/link";

// Sales Hub's landing dashboard mirrors exactly what the sidebar links to under
// Sales Hub (Vantiq Spark, Deal Registration, Sales Resources) — nothing more. Key
// Collaterals used to appear here too, but it isn't in the sidebar (see
// app-sidebar.tsx's Phase 2 note), so a partner following this page's cards
// could land somewhere the nav never mentioned. Resources moved here from
// Developer Hub — see app-sidebar.tsx.
// Demos (Interactive Demos, Demo Videos) used to live here too but is now its
// own standalone top-level hub — see app-sidebar.tsx and
// app/sales-center/demos/page.tsx.

export default function SalesCenterPage() {
  return (
    <div className="space-y-8">
      <PageBanner
        eyebrow="Sales Hub"
        title="Sales Hub"
        description="Everything for a live customer conversation: run a demo, register the deal, and keep it moving."
      >
        <BookmarkButton
          item={{ id: "/sales-center", label: "Sales Hub", href: "/sales-center", iconKey: "Handshake" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div>
        <SectionHeading>Tools</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/sales-center/vantiq-spark"
            className="block rounded-xl bg-linear-to-br from-emphasis/20 via-accent to-secondary p-5 shadow-card transition-opacity hover:opacity-90"
          >
            <Zap className="size-6 text-foreground/70" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">Vantiq Spark</p>
                <p className="mt-0.5 text-xs text-foreground/70">
                  Quick-turn tools for the first customer conversation.
                </p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-foreground/70" />
            </div>
          </Link>

          <Link
            href="/sales-center/deal-registration"
            className="block rounded-xl bg-linear-to-br from-emphasis/20 via-accent to-secondary p-5 shadow-card transition-opacity hover:opacity-90"
          >
            <FilePlus2 className="size-6 text-foreground/70" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">Deal Registration</p>
                <p className="mt-0.5 text-xs text-foreground/70">
                  Register a new lead and track it through to close.
                </p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-foreground/70" />
            </div>
          </Link>
        </div>
      </div>

      <div>
        <SectionHeading>Reference</SectionHeading>
        <Card className="shadow-card gap-0 divide-y divide-border p-2">
          <Link href="/resources" className="flex items-center gap-4 p-3.5 transition-colors hover:bg-muted">
            <BookOpen className="size-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Sales Resources</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {SALES_RESOURCES.length} data sheets, white papers, use cases, presentations, and videos.
              </p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        </Card>
      </div>
    </div>
  );
}
