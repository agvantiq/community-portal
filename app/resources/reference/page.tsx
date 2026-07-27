import { DevDocListPage } from "@/components/dev-doc-list-page";
import { BookOpen } from "lucide-react";

const VANTIQ_GLOSSARY = [
  { title: "VAIL", detail: "Vantiq's own procedural language for writing rules and procedures." },
  { title: "Namespace", detail: "An isolated workspace containing an app's types, rules, and resources." },
  { title: "Resource", detail: "Any first-class object in the platform — types, procedures, rules, sources, and more." },
  { title: "Type", detail: "A schema defining the shape of data stored and exchanged within a namespace." },
  { title: "Procedure", detail: "A reusable block of VAIL code, callable from rules, other procedures, or the REST API." },
  { title: "Rule", detail: "A WHEN/DO statement that reacts to an event by running a procedure." },
  { title: "Source", detail: "A connector that brings external events (MQTT, REST, OPC-UA, etc.) into a namespace." },
  { title: "Assembly", detail: "A packaged, reusable bundle of app components that can be installed into another namespace." },
];

export default function ReferencePage() {
  return (
    <DevDocListPage
      title="Reference"
      description="Quick definitions for core Vantiq platform concepts."
      icon={BookOpen}
      items={VANTIQ_GLOSSARY}
      backHref="/resources"
      backLabel="Resources"
    />
  );
}
