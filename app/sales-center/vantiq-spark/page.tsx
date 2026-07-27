import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHero } from "@/components/dashboard-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { VANTIQ_SPARK_ITEMS } from "@/lib/sales-data";
import { ArrowUpRight, Zap } from "lucide-react";

// Vantiq Spark's own hosted app lives outside the community portal — swap in
// the real destination once it's ready.
const SPARK_APP_URL = "https://spark.vantiq.com";

export default function VantiqSparkPage() {
  return (
    <div className="space-y-6">
      <DashboardHero
        variant="background"
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
      </DashboardHero>

      <Card className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-foreground">Quick-Turn Tools</h2>
        <div className="space-y-2">
          {VANTIQ_SPARK_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
