import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ArrowUpRight, Zap } from "lucide-react";

// Vantiq Spark's own hosted app lives outside the community portal — swap in
// the real destination once it's ready.
const SPARK_APP_URL = "https://spark.vantiq.com";

export default function VantiqSparkPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Sales Hub"
        title="Vantiq Spark"
        description="VANTIQ Spark is an AI-powered innovation accelerator that transforms ideas into intelligent, real-time solutions. By combining agentic AI, event-driven automation, and seamless workflow orchestration, Spark enables organizations to rapidly design, test, and deploy smart applications that respond instantly to changing conditions. Whether optimizing operations, automating decision-making, or creating next-generation digital experiences, VANTIQ Spark empowers teams to move from concept to impact faster, with less complexity and greater business value."
        actions={
          <Button asChild size="lg">
            <a href={SPARK_APP_URL} target="_blank" rel="noopener noreferrer">
              <Zap className="size-4" />
              Launch Vantiq Spark
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        }
      >
        <BookmarkButton
          item={{ id: "/sales-center/vantiq-spark", label: "Vantiq Spark", href: "/sales-center/vantiq-spark", iconKey: "Handshake" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>
    </div>
  );
}
