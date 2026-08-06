import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { MARKETING_DEMOS } from "@/lib/sales-data";
import { asset } from "@/lib/utils";
import { Play, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Demo Videos",
  description:
    "Short, polished demo videos for outbound and campaigns, hosted on vantiq.com/demos.",
};

export default function MarketingDemosPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title="Demo Videos"
        description="Short, polished demo videos for outbound and campaigns. Hosted on vantiq.com/demos, opens in a new tab."
      >
        <BookmarkButton
          item={{
            id: "/sales-center/marketing-demos",
            label: "Demo Videos",
            href: "/sales-center/marketing-demos",
            iconKey: "Handshake",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MARKETING_DEMOS.map((demo) => (
          <a
            key={demo.title}
            href={demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group focus-visible:outline-none"
          >
            <Card className="shadow-card h-full overflow-hidden border-none p-0 transition-shadow group-hover:shadow-lg group-focus-visible:shadow-lg">
              <div className="relative aspect-video overflow-hidden bg-surface-sunken">
                <Image
                  src={asset(demo.thumbnail)}
                  // The card's own title says what this is, so the still is
                  // decorative rather than informative.
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {/* Play affordance. Functional, not decorative: it marks the
                    card as a video rather than a document, and it sits over a
                    real frame instead of standing in for missing artwork. */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center bg-foreground/15 transition-colors group-hover:bg-foreground/25"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-card/90 shadow-md transition-transform group-hover:scale-105">
                    <Play className="size-5 translate-x-px fill-primary text-primary" />
                  </span>
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-1.5">
                  <h3 className="min-w-0 flex-1 text-sm font-medium text-foreground">
                    {demo.title}
                  </h3>
                  <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {demo.detail}
                </p>
                <Badge variant="secondary" className="mt-3">
                  {demo.category}
                </Badge>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
