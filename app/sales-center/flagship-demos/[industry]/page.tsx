import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { SectionHeading } from "@/components/section-heading";
import { FlagshipIndustryTile } from "@/components/flagship-industry-tile";
import { DemoGallery } from "@/components/demo-gallery";
import { FLAGSHIP_INDUSTRIES } from "@/lib/flagship-industries";

export function generateStaticParams() {
  return FLAGSHIP_INDUSTRIES.map((industry) => ({ industry: industry.id }));
}

// Mirrors the hero below, codename and all, so the tab reads the same as the
// page. An unknown id falls through to the layout default rather than
// inventing a title for a page that will render notFound().
export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: industryId } = await params;
  const industry = FLAGSHIP_INDUSTRIES.find((i) => i.id === industryId);
  if (!industry) return {};

  return {
    title: industry.codename ? `${industry.codename} · ${industry.label}` : industry.label,
    description: industry.summary,
  };
}

export default async function SalesFlagshipDemoIndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: industryId } = await params;
  const industry = FLAGSHIP_INDUSTRIES.find((i) => i.id === industryId);
  if (!industry) notFound();

  return (
    <div className="space-y-16">
      {/* The hero titles the demo tile directly below it, so the two read as
          one unit rather than two ranks. */}
      <PageHero
        className="mb-8"
        eyebrow={
          <Link href="/sales-center/flagship-demos" className="hover:text-foreground">
            &larr; Interactive Demos
          </Link>
        }
        title={industry.codename ? `${industry.codename} · ${industry.label}` : industry.label}
        description={industry.summary}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
              {industry.agentCount} agents
            </Badge>
            <code className="rounded-lg bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
              {industry.namespace}
            </code>
          </div>
        }
      >
        <BookmarkButton
          item={{
            id: `/sales-center/flagship-demos/${industry.id}`,
            label: industry.label,
            href: `/sales-center/flagship-demos/${industry.id}`,
            iconKey: "Handshake",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <Card className="shadow-card overflow-hidden border-none p-0">
        <FlagshipIndustryTile industry={industry} size="lg" priority />
        <div className="p-6 md:p-8">
          {/* Single column, full card width, no max-w cap. */}
          <p className="text-sm leading-relaxed text-foreground">{industry.description}</p>
        </div>
      </Card>

      {/* Only three demos have a fully enumerated roster; the rest carry the
          verified count in the hero rather than a partial list shown as whole. */}
      {industry.agents && industry.agents.length > 0 && (
        <section>
          <SectionHeading description={`All ${industry.agentCount} agents in this demo.`}>
            Agent roster
          </SectionHeading>
          <div className="flex flex-wrap gap-2">
            {industry.agents.map((agent) => (
              <span
                key={agent}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground"
              >
                {agent}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading description="The moments worth walking a prospect through.">
          What this demo shows
        </SectionHeading>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {industry.useCases.map((useCase) => (
            <Card key={useCase.title} className="border border-border p-6 shadow-none">
              <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                {useCase.tag}
              </Badge>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{useCase.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {useCase.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {industry.gallery && industry.gallery.length > 0 && (
        <section>
          <SectionHeading>Demo gallery</SectionHeading>
          <DemoGallery industry={industry} />
        </section>
      )}

      {/* Sales callout: the top of the design system's landing range, so it
          lands as its own beat after the demo content. */}
      <section className="mt-20">
        {/* `md:flex-row` went horizontal at the exact width where the sidebar
            starts taking 260px, so the card had less room at 768 than at 700
            and the button group (326px, shrink-0) pushed the CTA past the
            screen edge. Wrapping on flex-basis measures the card's own width
            instead: the row only goes horizontal once the copy can hold 18rem
            alongside the buttons. */}
        <Card className="shadow-card flex flex-row flex-wrap items-center justify-between gap-5 p-6 md:p-8">
          <div className="max-w-xl grow basis-72">
            <h2 className="text-sm font-semibold text-foreground">
              Want to walk a customer through this?
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Demo environments are provisioned per partner. Request access and the team will set up
              a namespace you can run this in front of a prospect.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/custom-request"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request demo access
            </Link>
            <Link
              href="/support"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-primary"
            >
              Talk to the team
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
