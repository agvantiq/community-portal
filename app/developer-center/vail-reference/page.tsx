import { DevDocListPage } from "@/components/dev-doc-list-page";
import { VAIL_REFERENCE } from "@/lib/developer-data";
import { BookOpen } from "lucide-react";

export default function VailReferencePage() {
  return (
    <DevDocListPage
      title="VAIL Reference Guide"
      description="Syntax cheatsheet, built-in functions, and event/rule grammar."
      icon={BookOpen}
      items={VAIL_REFERENCE}
      backHref="/developer-center/knowledge-base"
      backLabel="Knowledge Base"
    />
  );
}
