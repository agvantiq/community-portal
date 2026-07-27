import Link from "next/link";
import { ModuleCard } from "@/components/module-card";
import { TECHNICAL_DOC_MODULES } from "@/lib/developer-data";
import { FileText } from "lucide-react";

export default function TechnicalDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/developer-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Developer Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <FileText className="size-5 text-primary" />
          Technical Documents
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The core reference material for building on Vantiq — architecture, VAIL, extension sources,
          deployment, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNICAL_DOC_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
