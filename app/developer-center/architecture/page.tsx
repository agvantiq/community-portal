"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHero } from "@/components/page-hero";
import { ARCHITECTURE_TIERS, FEATURED_ARCHITECTURES } from "@/lib/sample-data";
import { ChevronRight, Cpu } from "lucide-react";

export default function ArchitecturePage() {
  const [openTier, setOpenTier] = React.useState<string | null>(null);
  const active = ARCHITECTURE_TIERS.find((t) => t.id === openTier);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center/knowledge-base" className="hover:text-foreground">
            &larr; Knowledge Base
          </Link>
        }
        title="Platform Architecture"
        description="How Vantiq orchestrates real-time data from the edge to operational action."
      />

      <Card className="shadow-card p-6">
        <h2 className="mb-5 text-sm font-medium text-foreground">Platform Blueprint</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {ARCHITECTURE_TIERS.map((tier, i) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setOpenTier(tier.id)}
              className="group flex flex-col items-start gap-1 rounded-md border border-border p-4 text-left transition-colors hover:border-primary"
            >
              <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-primary">
                Tier {i + 1}
              </span>
              <span className="text-sm font-semibold text-foreground">{tier.label}</span>
              <span className="text-xs text-muted-foreground">{tier.detail}</span>
              <ChevronRight className="mt-1 size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </Card>

      <Card className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-foreground">Featured Integration Architectures</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURED_ARCHITECTURES.map((arch) => (
            <div key={arch.title} className="rounded-md border border-border p-4">
              <Cpu className="size-5 text-primary" />
              <p className="mt-2 text-sm font-medium text-foreground">{arch.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{arch.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={!!active} onOpenChange={(open) => !open && setOpenTier(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{active?.label}</DialogTitle>
          </DialogHeader>
          {active && (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">{active.detail}</p>
              <div className="grid grid-cols-3 gap-3 border-t border-border pt-3">
                <div>
                  <p className="text-xs text-muted-foreground">Protocols</p>
                  <p className="font-medium">{active.protocols}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Throughput</p>
                  <p className="font-medium">{active.throughput}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Latency</p>
                  <p className="font-medium">{active.latency}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
