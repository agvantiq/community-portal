import { DevDocListPage } from "@/components/dev-doc-list-page";
import { TUTORIALS } from "@/lib/developer-data";
import { NotebookText } from "lucide-react";

export default function TutorialsPage() {
  return (
    <DevDocListPage
      title="Tutorials"
      description="Step-by-step walkthroughs for common builds, start to finish."
      icon={NotebookText}
      items={TUTORIALS}
      backHref="/developer-center/knowledge-base"
      backLabel="Knowledge Base"
      bookmarkHref="/developer-center/tutorials"
    />
  );
}
