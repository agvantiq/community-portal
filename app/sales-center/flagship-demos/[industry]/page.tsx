import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { FlagshipIndustryTile } from "@/components/flagship-industry-tile";
import { FLAGSHIP_INDUSTRIES, FLAGSHIP_GRADIENTS } from "@/lib/flagship-industries";

export function generateStaticParams() {
  return FLAGSHIP_INDUSTRIES.map((industry) => ({ industry: industry.id }));
}

export default async function SalesFlagshipDemoIndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: industryId } = await params;
  const index = FLAGSHIP_INDUSTRIES.findIndex((i) => i.id === industryId);
  const industry = FLAGSHIP_INDUSTRIES[index];
  if (!industry) notFound();

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center/flagship-demos" className="hover:text-foreground">
            &larr; Flagship Interactive Demos
          </Link>
        }
        title={industry.label}
      />

      <Card className="shadow-card overflow-hidden border-none p-0">
        <FlagshipIndustryTile icon={industry.icon} gradient={FLAGSHIP_GRADIENTS[index % FLAGSHIP_GRADIENTS.length]} size="lg" />
        <div className="p-6">
          <p className="text-sm font-medium text-foreground">What this demo shows</p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{industry.description}</p>
        </div>
      </Card>
    </div>
  );
}
