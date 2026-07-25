import { DevDocListPage } from "@/components/dev-doc-list-page";
import { FLAGSHIP_DEMOS } from "@/lib/developer-data";
import { PlayCircle } from "lucide-react";

export default function FlagshipDemoPage() {
  return (
    <DevDocListPage
      title="Flagship Demo"
      description="End-to-end reference builds across industries."
      icon={PlayCircle}
      items={FLAGSHIP_DEMOS}
    />
  );
}
