"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ARCHITECTURE_TIERS, FEATURED_ARCHITECTURES } from "@/lib/sample-data";
import { Cpu, FileText, Puzzle, Link2, ChevronRight } from "lucide-react";

export default function DeveloperCenterPage() {
  const [openTier, setOpenTier] = React.useState<string | null>(null);
  const active = ARCHITECTURE_TIERS.find((t) => t.id === openTier);

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-none bg-primary p-8 text-primary-foreground">
        <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
          Developer Hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Architecture &amp; Technical Docs</h1>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          Explore how Vantiq orchestrates real-time data from the edge to operational action.
        </p>
      </Card>

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="shadow-card flex items-center gap-3 p-4">
          <FileText className="size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Technical Docs</p>
            <Badge variant="secondary" className="mt-1 text-[10px]">Soon</Badge>
          </div>
        </Card>
        <Card className="shadow-card flex items-center gap-3 p-4">
          <Puzzle className="size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Extension Sources</p>
            <Badge variant="secondary" className="mt-1 text-[10px]">Soon</Badge>
          </div>
        </Card>
        <Card className="shadow-card flex items-center gap-3 p-4">
          <Link2 className="size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">API Reference</p>
            <Badge variant="secondary" className="mt-1 text-[10px]">Soon</Badge>
          </div>
        </Card>
      </div>

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
