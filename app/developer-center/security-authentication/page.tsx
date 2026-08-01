import { DevDocListPage } from "@/components/dev-doc-list-page";
import { SECURITY_AUTH } from "@/lib/developer-data";
import { ShieldCheck } from "lucide-react";

export default function SecurityAuthenticationPage() {
  return (
    <DevDocListPage
      title="Security & Authentication"
      description="OAuth setup, namespace permissions, and secrets management."
      icon={ShieldCheck}
      items={SECURITY_AUTH}
      backHref="/developer-center/knowledge-base"
      backLabel="Knowledge Base"
      bookmarkHref="/developer-center/security-authentication"
    />
  );
}
