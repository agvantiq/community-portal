import Link from "next/link";
import { ModuleCard } from "@/components/module-card";
import { DEVELOPER_GUIDE_MODULES } from "@/lib/developer-data";
import { Compass } from "lucide-react";

export default function DeveloperGuidesPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/developer-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Developer Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Compass className="size-5 text-primary" />
          Developer Guides
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tutorials, conventions, and production guidance for building on Vantiq well, not just
          building on Vantiq.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEVELOPER_GUIDE_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
