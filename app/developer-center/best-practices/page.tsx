import { DevDocListPage } from "@/components/dev-doc-list-page";
import { BEST_PRACTICES } from "@/lib/developer-data";
import { Award } from "lucide-react";

export default function BestPracticesPage() {
  return (
    <DevDocListPage
      title="Best Practices"
      description="Patterns that hold up in production, not just in a demo."
      icon={Award}
      items={BEST_PRACTICES}
      backHref="/developer-center/guides"
      backLabel="Developer Guides"
    />
  );
}
