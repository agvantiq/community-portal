import { DevDocListPage } from "@/components/dev-doc-list-page";
import { PERFORMANCE_GUIDES } from "@/lib/developer-data";
import { Gauge } from "lucide-react";

export default function PerformancePage() {
  return (
    <DevDocListPage
      title="Performance"
      description="Tuning rules, edge nodes, and queries at scale."
      icon={Gauge}
      items={PERFORMANCE_GUIDES}
      backHref="/developer-center/knowledge-base"
      backLabel="Knowledge Base"
      bookmarkHref="/developer-center/performance"
    />
  );
}
