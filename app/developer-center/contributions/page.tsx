import { DevDocListPage } from "@/components/dev-doc-list-page";
import { CONTRIBUTIONS } from "@/lib/developer-data";
import { GitBranch } from "lucide-react";

export default function ContributionsPage() {
  return (
    <DevDocListPage
      title="Contributions"
      description="Community-shared Vantiq projects, apps, and code samples — freely available and importable directly into a namespace."
      icon={GitBranch}
      items={CONTRIBUTIONS}
      backHref="/developer-center"
      backLabel="Developer Hub"
      bookmarkHref="/developer-center/contributions"
    />
  );
}
