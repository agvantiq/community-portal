import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/page-banner";
import { SectionHeading } from "@/components/section-heading";
import { BookmarkButton } from "@/components/bookmark-button";
import { asset } from "@/lib/utils";
import { FLAGSHIP_INDUSTRIES } from "@/lib/flagship-industries";
import { RESOURCE_CENTER_ITEMS } from "@/lib/developer-data";
import { ChevronRight, Zap, FilePlus2, BookOpen } from "lucide-react";

// Sales Hub's landing dashboard mirrors exactly what the sidebar links to under
// Sales Hub (Demos > Interactive Demos, Vantiq Spark, Deal Registration,
// Resources) — nothing more. Key Collaterals used to appear here too, but it
// isn't in the sidebar (see app-sidebar.tsx's Phase 2 note), so a partner
// following this page's cards could land somewhere the nav never mentioned.
// Resources moved here from Developer Hub — see app-sidebar.tsx. Demo Videos
// is also unlinked per phase 1 scope — see app-sidebar.tsx for the phase 2
// note; the Demos section is a single card until it comes back.
// The Demos tile got the richest treatment because Interactive Demos genuinely
// has the best asset to show off — six real photographed industry builds —
// so this page leads with that instead of the same icon-in-a-box card as
// everything else on the portal.

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
        <SectionHeading>Demos</SectionHeading>
        <Link href="/sales-center/flagship-demos">
          <Card className="shadow-card h-full overflow-hidden border-none p-0 transition-shadow hover:shadow-lg">
            <div className="flex h-full flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-foreground">Interactive Demos</p>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                  Live, industry-specific command centres — walk a prospect through a real end-to-end
                  build before they write any code of their own.
                </p>
                <Badge variant="secondary" className="mt-4">
                  {FLAGSHIP_INDUSTRIES.length} industries
                </Badge>
              </div>
              {/* Overlapping preview of every industry's real photography —
                  a "here's what's inside" glance rather than a generic icon,
                  since the whole point of this module is that the assets
                  behind it are genuinely photographed, not stock art. */}
              <div className="flex shrink-0 items-center pl-2 sm:pl-0">
                {FLAGSHIP_INDUSTRIES.map((industry, i) => (
                  <div
                    key={industry.id}
                    className="relative size-14 shrink-0 overflow-hidden rounded-full ring-4 ring-card"
                    style={{ marginLeft: i === 0 ? 0 : -20, zIndex: FLAGSHIP_INDUSTRIES.length - i }}
                  >
                    <Image
                      src={asset(industry.image)}
                      alt={industry.imageAlt}
                      fill
                      sizes="56px"
                      className="object-cover saturate-[0.6] contrast-[1.1] brightness-[0.92]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Link>
      </div>

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
              <p className="text-sm font-medium text-foreground">Resources</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {RESOURCE_CENTER_ITEMS.length}+ docs, guides, and reference material.
              </p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        </Card>
      </div>
    </div>
  );
}
