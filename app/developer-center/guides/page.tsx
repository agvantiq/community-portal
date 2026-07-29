import Link from "next/link";
import { ModuleCard } from "@/components/module-card";
import { PageHero } from "@/components/page-hero";
import { DEVELOPER_GUIDE_MODULES } from "@/lib/developer-data";

export default function DeveloperGuidesPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Developer Guides"
        description="Tutorials, conventions, and production guidance for building on Vantiq well, not just building on Vantiq."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEVELOPER_GUIDE_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
