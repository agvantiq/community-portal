import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";

export default function ReusabilityCatalogPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Reuse Library"
        description="Reusable assemblies, templates, and components for building on Vantiq."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/reusability-catalog",
            label: "Reuse Library",
            href: "/developer-center/reusability-catalog",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>
    </div>
  );
}
