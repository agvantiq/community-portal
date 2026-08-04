import { DevDocListPage } from "@/components/dev-doc-list-page";
import { GLOSSARY_TERMS } from "@/lib/developer-data";
import { BookOpen } from "lucide-react";

export default function ReferencePage() {
  return (
    <DevDocListPage
      title="Reference"
      description="Quick definitions for core Vantiq platform concepts."
      icon={BookOpen}
      items={GLOSSARY_TERMS}
      backHref="/resources"
      backLabel="Resource Hub"
    />
  );
}
