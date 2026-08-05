import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  ANALYST_REPORTS,
  CUSTOMER_USE_CASE_DECKS,
  CUSTOMER_TECHNICAL_SUPPORT,
  KOREAN_TRANSLATED_COLLATERALS,
  MARKETING_SUPPORT_PROGRAMS,
  PARTNER_ENABLEMENT_DOCS,
  PRODUCT_CONTENT,
} from "@/lib/developer-data";
import { FileText } from "lucide-react";

const FOLDERS = [
  { title: "Analyst Reports", items: ANALYST_REPORTS },
  { title: "Customer Use Cases", items: CUSTOMER_USE_CASE_DECKS },
  { title: "Customer Technical Support", items: CUSTOMER_TECHNICAL_SUPPORT },
  { title: "Korean Translated Collaterals", items: KOREAN_TRANSLATED_COLLATERALS },
  { title: "Marketing Support and Programs", items: MARKETING_SUPPORT_PROGRAMS },
  { title: "Partner Enablement", items: PARTNER_ENABLEMENT_DOCS },
  { title: "Product Content", items: PRODUCT_CONTENT },
];

export default function ResourceLibraryPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/resources" className="hover:text-foreground">
            &larr; Resources
          </Link>
        }
        title="Resource Library"
        description="A digital library of business collateral — analyst reports, use case studies, and partner and marketing materials."
      >
        <BookmarkButton
          item={{ id: "/resources/library", label: "Resource Library", href: "/resources/library", iconKey: "Library" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      {FOLDERS.map((folder) => (
        <Card key={folder.title} className="shadow-card p-6">
          <h2 className="text-sm font-medium text-foreground">{folder.title}</h2>
          <div className="mt-4 space-y-2">
            {folder.items.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-md border border-border p-3"
              >
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
