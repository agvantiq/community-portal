import Link from "next/link";
import { ModuleCard } from "@/components/module-card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { TECHNICAL_DOC_MODULES } from "@/lib/developer-data";

export default function TechnicalDocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Technical Documents"
        description="The core reference material for building on Vantiq — architecture, VAIL, extension sources, deployment, and security."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/technical-documents",
            label: "Technical Documents",
            href: "/developer-center/technical-documents",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNICAL_DOC_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
