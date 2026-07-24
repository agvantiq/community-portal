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
import { BookmarkButton } from "@/components/bookmark-button";
import { ARCHITECTURE_TIERS, FEATURED_ARCHITECTURES } from "@/lib/sample-data";
import {
  Cpu,
  FileText,
  Puzzle,
  Link2,
  ChevronRight,
  Code2,
  Sparkles,
  ExternalLink,
  BookOpen,
  Rocket,
  ShieldCheck,
  PlayCircle,
} from "lucide-react";

const TECHNICAL_DOCS = [
  { id: "getting-started-with-vail", title: "Getting Started with VAIL", detail: "Language basics, procedures, and rule syntax." },
  { id: "building-your-first-vail-app", title: "Building Your First VAIL App", detail: "A step-by-step walkthrough from empty namespace to running app." },
  { id: "integration-best-practices", title: "Integration Best Practices", detail: "Patterns for connecting external systems reliably." },
  { id: "edge-deployment-guide", title: "Edge Deployment Guide", detail: "Packaging and deploying nodes to edge devices." },
  { id: "event-type-reference", title: "Event Type Reference", detail: "Defining and subscribing to real-time event types." },
  { id: "security-access-control", title: "Security & Access Control", detail: "Namespaces, resource permissions, and OAuth setup." },
];

const EXTENSION_SOURCES = [
  { title: "vantiq-extension-sdk", detail: "Core SDK for building custom source connectors." },
  { title: "mqtt-source-connector", detail: "Reference implementation for MQTT device ingestion." },
  { title: "opcua-source-connector", detail: "Industrial OPC-UA protocol bridge." },
];

const API_REFERENCES = [
  { title: "REST API", detail: "CRUD operations over resources, types, and procedures." },
  { title: "WebSocket API", detail: "Real-time subscriptions and event publishing." },
  { title: "GraphQL API", detail: "Query and mutate typed resources." },
];

const CODE_RECIPES = [
  { title: "Debounce a Noisy Sensor Stream", tag: "VAIL" },
  { title: "Batch Insert with Retry", tag: "VAIL" },
  { title: "Call an External REST API", tag: "VAIL" },
  { title: "Geofence Trigger Rule", tag: "VAIL" },
];

const PROMPT_GALLERY = [
  { title: "Scaffold a new VAIL procedure", tag: "Scaffolding" },
  { title: "Explain an event orchestration rule", tag: "Explain" },
  { title: "Convert a REST call to a VAIL source", tag: "Migration" },
  { title: "Write unit tests for a procedure", tag: "Testing" },
];

const VAIL_REFERENCE = [
  { title: "Language Syntax Cheatsheet", detail: "Procedures, rules, types, and control flow at a glance." },
  { title: "Built-in Functions", detail: "String, date, collection, and system function reference." },
  { title: "Event & Rule Grammar", detail: "WHEN/DO syntax, event patterns, and trigger conditions." },
];

const DEPLOYMENT_OPS = [
  { title: "Environment Promotion", detail: "Moving namespaces from dev to staging to production." },
  { title: "Edge Node Provisioning", detail: "Registering and configuring edge nodes at scale." },
  { title: "Monitoring & Alerting", detail: "Health checks, logs, and operational dashboards." },
];

const SECURITY_AUTH = [
  { title: "OAuth 2.0 Setup", detail: "Configuring identity providers and token scopes." },
  { title: "Namespace Permissions", detail: "Resource-level access control and role assignment." },
  { title: "Secrets Management", detail: "Storing and rotating credentials safely." },
];

const FLAGSHIP_DEMOS = [
  { title: "Autonomous Cold-Chain Monitoring", detail: "End-to-end edge AI demo for logistics." },
  { title: "Real-Time Patient Flow", detail: "Event-driven hospital operations walkthrough." },
  { title: "Predictive Grid Maintenance", detail: "Utility sensor fusion and anomaly detection." },
];

export default function DeveloperCenterPage() {
  const [openTier, setOpenTier] = React.useState<string | null>(null);
  const active = ARCHITECTURE_TIERS.find((t) => t.id === openTier);

  return (
    <div className="space-y-6">
      <Card className="shadow-card relative border-none bg-primary p-8 text-primary-foreground">
        <BookmarkButton
          item={{ id: "/developer-center", label: "Architecture Docs", href: "/developer-center", iconKey: "Code2" }}
          className="absolute right-4 top-4"
        />
        <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
          Developer Hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Architecture &amp; Technical Docs</h1>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          Explore how Vantiq orchestrates real-time data from the edge to operational action.
        </p>
      </Card>

      <Card id="architecture" className="shadow-card p-6">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card id="documentation" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <FileText className="size-4 text-primary" />
            Technical Documentation
          </h2>
          <div className="space-y-2">
            {TECHNICAL_DOCS.map((doc) => (
              <div
                key={doc.id}
                id={`doc-${doc.id}`}
                className="scroll-mt-6 flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary target:border-primary target:bg-primary/5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{doc.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card id="extension-sources" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Puzzle className="size-4 text-primary" />
            Extension Sources
          </h2>
          <div className="space-y-2">
            {EXTENSION_SOURCES.map((src) => (
              <div
                key={src.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{src.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{src.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card id="api-references" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Link2 className="size-4 text-primary" />
            API References
          </h2>
          <div className="space-y-2">
            {API_REFERENCES.map((api) => (
              <div
                key={api.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{api.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{api.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card id="code-recipes" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Code2 className="size-4 text-primary" />
            Code Recipes / Reusable Templates
          </h2>
          <div className="space-y-2">
            {CODE_RECIPES.map((recipe) => (
              <div
                key={recipe.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <p className="truncate text-sm font-medium text-foreground">{recipe.title}</p>
                <Badge variant="secondary" className="shrink-0">{recipe.tag}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card id="prompt-gallery" className="shadow-card p-6 lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="size-4 text-primary" />
            Claude Prompt Gallery
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROMPT_GALLERY.map((prompt) => (
              <div
                key={prompt.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <p className="truncate text-sm font-medium text-foreground">{prompt.title}</p>
                <Badge variant="secondary" className="shrink-0 bg-emphasis/10 text-emphasis">
                  {prompt.tag}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card id="vail-reference" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <BookOpen className="size-4 text-primary" />
            VAIL Reference Guide
          </h2>
          <div className="space-y-2">
            {VAIL_REFERENCE.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{doc.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card id="deployment-operations" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Rocket className="size-4 text-primary" />
            Deployment &amp; Operations
          </h2>
          <div className="space-y-2">
            {DEPLOYMENT_OPS.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{doc.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card id="security-authentication" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Security &amp; Authentication
          </h2>
          <div className="space-y-2">
            {SECURITY_AUTH.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{doc.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card id="flagship-demo" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <PlayCircle className="size-4 text-primary" />
            Flagship Demo
          </h2>
          <div className="space-y-2">
            {FLAGSHIP_DEMOS.map((demo) => (
              <div
                key={demo.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{demo.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{demo.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
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
