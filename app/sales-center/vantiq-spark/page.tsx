import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { BookmarkButton } from "@/components/bookmark-button";
import { asset } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const SPARK_APP_URL = "https://vantiq-spark-public.netlify.app/";

export const metadata: Metadata = {
  title: "Vantiq Spark",
  description:
    "The AI solution studio sellers open in the room: research an account, test whether a use case is worth building, and design the system live.",
};

/**
 * The three apps on Spark's own "Choose your app" screen, with their real
 * descriptions and agent counts. Kept page-local rather than in lib/ because
 * nothing else in the portal references them, and they belong to the external
 * product rather than to this portal's data model.
 */
const SPARK_APPS = [
  {
    name: "Spark Research",
    detail:
      "A sourced picture of an organization: the systems they run, the pressures they are under, and what changed this week. Every claim carries a citation you can open.",
    capability: "Live web search",
    useIt: "Before the first call, so you walk in already knowing their stack and their pressures.",
  },
  {
    name: "Spark Fit",
    detail:
      "Find out whether a use case is worth building. Scope, ROI, competitive landscape, and the hard questions answered, including an honest read when the case is not there.",
    capability: "7 agents",
    useIt: "In qualification, when you need to know if this is a real opportunity before you spend a solution architect on it.",
  },
  {
    name: "Spark Design",
    detail:
      "Answer \"how would this actually work?\" in the room, not in two weeks. Domain model, event-driven architecture, implementation scaffolding.",
    capability: "9 agents",
    useIt: "In the technical deep dive, when the question that stalls the deal is how it would actually be built.",
  },
];

/**
 * Spark Design's left rail, which is the clearest statement of what the product
 * does: a session moves top to bottom through these four stages and each one
 * leaves an artefact behind.
 */
const SPARK_PIPELINE = [
  {
    stage: "Discovery",
    steps: ["Problem Input", "Sales Discovery", "Use Case Scope"],
    detail:
      "Starts from a plain description of the problem. Spark turns it into a scoped use case with the discovery questions you still need answered.",
  },
  {
    stage: "Architecture",
    steps: ["Domain Model", "Architecture", "Event System", "Diagrams"],
    detail:
      "Produces the domain model and the event-driven architecture that follows from it, then draws the diagrams you can put on screen.",
  },
  {
    stage: "AI Consulting",
    steps: ["AI Models", "Agentic Augmentation"],
    detail:
      "Recommends which models fit the problem and where agents add judgement rather than just automation.",
  },
  {
    stage: "Implementation",
    steps: ["Implementation"],
    detail:
      "Ends with implementation scaffolding, demo scenarios and training labs, so the conversation hands off to a build with something concrete.",
  },
];

/** The worked examples Spark ships preloaded, taken from its own start screen. */
const SPARK_EXAMPLES = [
  "Retail Inventory",
  "Supply Chain",
  "Fraud Detection",
  "Wildfire Detection",
  "Hospital Patient Deterioration",
  "Industrial Predictive Maintenance",
  "Smart Traffic Management",
  "Smart Building Energy",
];

export default function VantiqSparkPage() {
  return (
    <div className="space-y-16">
      <PageHero
        eyebrow="Sales Hub"
        title="Vantiq Spark"
        description="An AI solution studio that turns a described problem into a scoped use case, a system architecture and implementation scaffolding, fast enough to do it in front of a customer."
        actions={
          <Button asChild size="lg">
            <a href={SPARK_APP_URL} target="_blank" rel="noopener noreferrer">
              Open Vantiq Spark
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

      {/* Single column at the full width of the band, matching the flagship
          demo pages. A max-w cap here would strand the paragraph at roughly
          two thirds and leave a void to its right. */}
      <Card className="shadow-card border-none p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Spark exists because the slowest part of a Vantiq deal is usually not the pitch, it is the gap
          after it. A customer asks how their problem would actually be built, and the honest answer has
          been to take it away and come back in two weeks with an architect's time spent. Spark closes
          that gap by running the same reasoning live: you describe the problem in ordinary language and
          a set of agents work it into a domain model, an event-driven architecture, a view of which AI
          models fit, and scaffolding a team could start from.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          It is deliberately three separate apps rather than one, because the three jobs happen at
          different points in a deal and need different evidence. Research answers what is true about
          this account today and cites where it got each claim. Fit answers whether the use case is worth
          building at all, including saying no. Design answers how it would work. You choose the app when
          you open Spark and can switch at any time.
        </p>
      </Card>

      <section>
        <SectionHeading description="Each app runs the agents that matter for that job. You can switch at any time.">
          Choose your app
        </SectionHeading>

        <Card className="shadow-card overflow-hidden border-none p-0">
          <Image
            src={asset("/images/spark/choose-your-app.jpg")}
            // The three apps are written out as cards directly below, so the
            // screenshot is showing what the product looks like rather than
            // carrying information of its own.
            alt=""
            width={1600}
            height={741}
            sizes="(max-width: 1024px) 100vw, 1320px"
            className="h-auto w-full"
          />
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SPARK_APPS.map((app) => (
            <Card key={app.name} className="shadow-card flex h-full flex-col border-none p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-medium text-foreground">{app.name}</h3>
                <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                  {app.capability}
                </Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{app.detail}</p>
              {/* Label on its own line rather than inline: "Reach for it" runs
                  straight into a sentence that starts with a capital, and the
                  two read as a fragment when they share a line. */}
              <div className="mt-auto border-t border-border pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emphasis">
                  Reach for it
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{app.useIt}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading description="A Spark Design session runs top to bottom through four stages, and each one leaves an artefact behind.">
          Inside a session
        </SectionHeading>

        {/* Same shape as "Choose your app" above: the screenshot full width,
            then the written breakdown under it. Side by side, the four stage
            cards ran taller than the image and left a void beside it, and the
            screenshot is detailed enough that 3/5 of the column was too small
            to read the rail it is there to show. */}
        <Card className="shadow-card overflow-hidden border-none p-0">
          <Image
            src={asset("/images/spark/workspace.jpg")}
            alt=""
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 1320px"
            className="h-auto w-full"
          />
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPARK_PIPELINE.map((phase, i) => (
            <Card key={phase.stage} className="shadow-card flex h-full flex-col border-none p-5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emphasis">
                  {phase.stage}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{phase.detail}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {phase.steps.map((step) => (
                  <Badge key={step} variant="secondary" className="text-[10px]">
                    {step}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading description="Spark ships with worked examples, so you can show it running before you type anything of your own.">
          Start from a worked example
        </SectionHeading>

        <Card className="shadow-card border-none p-6">
          <div className="flex flex-wrap gap-2">
            {SPARK_EXAMPLES.map((example) => (
              <Badge key={example} variant="secondary">
                {example}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Loading one of these is the fastest way to see the whole pipeline produce output, which
            matters on a call where you have four minutes rather than forty. Spark also takes a list of
            competitors to compare against, or picks a set itself if you leave it empty.
          </p>
        </Card>
      </section>

      <section>
        <SectionHeading>Before you put it in front of a customer</SectionHeading>

        <Card className="shadow-card border-none p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Spark carries its own disclaimer, and it is worth reading rather than clicking past. Everything
            it produces, architectures, models, code scaffolding and ROI projections alike, is generated and
            conceptual. It is an enablement and educational tool. Any output that is going to inform a real
            commitment needs a certified Vantiq engineer to verify it first, and Vantiq accepts no liability
            for implementations or business decisions taken straight from the tool.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            In practice that shapes how you use it live. Spark is excellent for showing a customer that
            their problem has a shape and that the shape is buildable. It is not a substitute for a scoped
            statement of work, and presenting its ROI numbers as committed figures is the one way to turn a
            good demo into a bad conversation later.
          </p>
          <div className="mt-5">
            <Button asChild variant="secondary">
              <a href={SPARK_APP_URL} target="_blank" rel="noopener noreferrer">
                Open Vantiq Spark
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
