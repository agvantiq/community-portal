"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookmarkButton } from "@/components/bookmark-button";
import { DEALS, type Deal } from "@/lib/sample-data";
import { FileText, Users2, Megaphone, Download, Zap, Presentation } from "lucide-react";
import { toast } from "sonner";

const MARKETING_COLLATERAL = [
  { title: "Vantiq Brand Guidelines", type: "PDF" },
  { title: "Co-Branded Email Templates", type: "ZIP" },
  { title: "Social Media Asset Pack", type: "ZIP" },
  { title: "Partner Logo Kit", type: "ZIP" },
];

const VANTIQ_SPARK_ITEMS = [
  { title: "Rapid Prototype Builder", detail: "Spin up a branded proof-of-concept in under an hour." },
  { title: "Discovery Question Bank", detail: "Qualifying questions mapped to Vantiq use cases." },
  { title: "Solution Sizing Estimator", detail: "Quick-turn scoping numbers for a first customer call." },
];

const SALES_FLAGSHIP_DEMOS = [
  { title: "Autonomous Cold-Chain Monitoring", detail: "Edge AI demo for logistics and cold-chain prospects." },
  { title: "Real-Time Patient Flow", detail: "Event-driven hospital operations walkthrough." },
  { title: "Predictive Grid Maintenance", detail: "Utility sensor fusion and anomaly detection demo." },
];

const stageTone: Record<Deal["stage"], string> = {
  Discovery: "bg-info/10 text-info",
  "Technical Validation": "bg-info/10 text-info",
  Proposal: "bg-emphasis/10 text-emphasis",
  Negotiation: "bg-emphasis/10 text-emphasis",
  "Closed Won": "bg-success/10 text-success",
};

const TEAMING_REQUESTS = [
  { label: "Looking for a Systems Integrator", detail: "Multi-site manufacturing rollout" },
  { label: "Looking for a Hardware Partner", detail: "Edge compute nodes for cold-chain sensors" },
  { label: "Looking for a Domain Expert", detail: "Healthcare compliance (HIPAA) review" },
  { label: "Looking for an App Developer", detail: "Custom dashboard for logistics client" },
];

export default function SalesCenterPage() {
  const [deals, setDeals] = React.useState(DEALS);

  function handleRegisterLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const client = (form.elements.namedItem("client") as HTMLInputElement)?.value || "New Client";
    const useCase = (form.elements.namedItem("useCase") as HTMLTextAreaElement)?.value || "Use case pending";
    setDeals((prev) => [
      { id: `d-${Date.now()}`, client, useCase, stage: "Discovery", owner: "You" },
      ...prev,
    ]);
    form.reset();
    toast.success(`${client} added to the deal pipeline.`);
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-card relative border-none bg-primary p-8 text-primary-foreground">
        <BookmarkButton
          item={{ id: "/sales-center", label: "Deal Pipeline", href: "/sales-center", iconKey: "Handshake" }}
          className="absolute right-4 top-4"
        />
        <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
          Sales Hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Partner Sales Center</h1>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          Track pipeline, find teaming partners, and register deals in one place.
        </p>
      </Card>

      <Card id="pipeline" className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-foreground">Deal Pipeline</h2>
        <div className="space-y-2">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{deal.client}</p>
                <p className="truncate text-xs text-muted-foreground">{deal.useCase}</p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:inline">{deal.owner}</span>
              <Badge variant="secondary" className={stageTone[deal.stage]}>
                {deal.stage}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card id="vantiq-spark" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Zap className="size-4 text-primary" />
            Vantiq Spark
          </h2>
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

        <Card id="flagship-demos" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Presentation className="size-4 text-primary" />
            Vantiq Flagship Demos
          </h2>
          <div className="space-y-2">
            {SALES_FLAGSHIP_DEMOS.map((demo) => (
              <div
                key={demo.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{demo.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{demo.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card id="teaming-hub" className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-foreground">Deal Teaming Hub</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TEAMING_REQUESTS.map((req) => (
            <div key={req.label} className="rounded-md border border-border p-4">
              <Users2 className="size-5 text-primary" />
              <p className="mt-2 text-sm font-medium text-foreground">{req.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{req.detail}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => toast(`Team-up proposal sent for: ${req.label}`)}
              >
                Propose Team-Up
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card id="deal-registration" className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-foreground">Register a Lead</h2>
        <form onSubmit={handleRegisterLead} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input name="client" placeholder="Client name" required />
          <Select defaultValue="mid">
            <SelectTrigger>
              <SelectValue placeholder="Estimated ARR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Under $100K</SelectItem>
              <SelectItem value="mid">$100K &ndash; $500K</SelectItem>
              <SelectItem value="large">$500K+</SelectItem>
            </SelectContent>
          </Select>
          <Textarea name="useCase" placeholder="Use case summary" className="sm:col-span-2" rows={3} />
          <Button type="submit" className="sm:col-span-2 sm:w-fit">
            Register Deal
          </Button>
        </form>
      </Card>

      <div id="customer-pitch" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="shadow-card p-5">
          <h2 className="mb-3 text-sm font-medium text-foreground">Customer Pitch Collateral</h2>
          <div className="space-y-2">
            {["Executive Overview Deck", "ROI Calculator", "Reference Architecture One-Pager"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                <FileText className="size-4 text-muted-foreground" /> {f}
              </div>
            ))}
          </div>
        </Card>
        <Card id="project-sizing" className="shadow-card p-5">
          <h2 className="mb-3 text-sm font-medium text-foreground">Project Sizing &amp; Pricing</h2>
          <div className="space-y-2">
            {["2026 Price List (Partners)", "Sizing Worksheet", "SOW Template"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                <FileText className="size-4 text-muted-foreground" /> {f}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card id="marketing-collateral" className="shadow-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <Megaphone className="size-4 text-primary" />
          Marketing Collateral
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MARKETING_COLLATERAL.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
            >
              <div className="flex min-w-0 items-center gap-2">
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                <Download className="size-3.5" />
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
