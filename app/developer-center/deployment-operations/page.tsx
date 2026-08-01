import { DevDocListPage } from "@/components/dev-doc-list-page";
import { DEPLOYMENT_OPS } from "@/lib/developer-data";
import { Rocket } from "lucide-react";

export default function DeploymentOperationsPage() {
  return (
    <DevDocListPage
      title="Deployment & Operations"
      description="Environment promotion, edge provisioning, and monitoring."
      icon={Rocket}
      items={DEPLOYMENT_OPS}
      backHref="/developer-center/knowledge-base"
      backLabel="Knowledge Base"
      bookmarkHref="/developer-center/deployment-operations"
    />
  );
}
