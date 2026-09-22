import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/page-banner";
import { SectionHeading } from "@/components/section-heading";
import { BookmarkButton } from "@/components/bookmark-button";
import { asset } from "@/lib/utils";
import { FLAGSHIP_INDUSTRIES } from "@/lib/flagship-industries";
import { MARKETING_DEMOS } from "@/lib/sales-data";
import { ChevronRight, Play } from "lucide-react";

// Demos' own landing page — a standalone top-level hub (see
// components/shell/app-sidebar.tsx), so it gets the same treatment
// sales-center/page.tsx uses for its own hub cards: one feature card per
// destination, richer than a plain icon tile because both destinations here
// have real imagery to lead with (photographed industry builds; recorded
// video thumbnails).
export default function SalesDemosPage() {
  return (
    <div className="space-y-8">
      <PageBanner
        eyebrow="Demos"
        title="Demos"
        description="Everything for showing Vantiq in action — live command centres you run yourself, and polished reels for outbound and campaigns."
      >
        <BookmarkButton
          item={{ id: "/sales-center/demos", label: "Demos", href: "/sales-center/demos", iconKey: "MonitorPlay" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div>
        <SectionHeading>Interactive Demos</SectionHeading>
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
        <SectionHeading>Demo Videos</SectionHeading>
        <Link href="/sales-center/marketing-demos">
          <Card className="shadow-card h-full overflow-hidden border-none p-0 transition-shadow hover:shadow-lg">
            <div className="flex h-full flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-foreground">Demo Videos</p>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                  Short, polished demo videos for outbound and campaigns. Hosted on vantiq.com/demos,
                  opens in a new tab.
                </p>
                <Badge variant="secondary" className="mt-4">
                  {MARKETING_DEMOS.length} videos
                </Badge>
              </div>
              {/* Overlapping preview of the real video thumbnails, mirroring
                  the Interactive Demos treatment above — same "here's what's
                  inside" glance, same card. */}
              <div className="flex shrink-0 items-center pl-2 sm:pl-0">
                {MARKETING_DEMOS.slice(0, 5).map((demo, i) => (
                  <div
                    key={demo.title}
                    className="relative size-14 shrink-0 overflow-hidden rounded-full ring-4 ring-card"
                    style={{ marginLeft: i === 0 ? 0 : -20, zIndex: 5 - i }}
                  >
                    <Image
                      src={asset(demo.thumbnail)}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover saturate-[0.6] contrast-[1.1] brightness-[0.92]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
                    {i === 4 && (
                      <div
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center bg-foreground/40"
                      >
                        <Play className="size-4 translate-x-px fill-card text-card" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
