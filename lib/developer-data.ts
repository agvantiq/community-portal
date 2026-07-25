// Developer Hub content. The hub landing page (app/developer-center/page.tsx)
// renders one module block per section here; each block links to its own
// dedicated page rather than an in-page anchor.

import {
  FileText,
  Cpu,
  BookOpen,
  Puzzle,
  Rocket,
  ShieldCheck,
  Link2,
  Code2,
  Sparkles,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/roles";

export const TECHNICAL_DOCS = [
  { id: "getting-started-with-vail", title: "Getting Started with VAIL", detail: "Language basics, procedures, and rule syntax." },
  { id: "building-your-first-vail-app", title: "Building Your First VAIL App", detail: "A step-by-step walkthrough from empty namespace to running app." },
  { id: "integration-best-practices", title: "Integration Best Practices", detail: "Patterns for connecting external systems reliably." },
  { id: "edge-deployment-guide", title: "Edge Deployment Guide", detail: "Packaging and deploying nodes to edge devices." },
  { id: "event-type-reference", title: "Event Type Reference", detail: "Defining and subscribing to real-time event types." },
  { id: "security-access-control", title: "Security & Access Control", detail: "Namespaces, resource permissions, and OAuth setup." },
];

export const EXTENSION_SOURCES = [
  { title: "vantiq-extension-sdk", detail: "Core SDK for building custom source connectors." },
  { title: "mqtt-source-connector", detail: "Reference implementation for MQTT device ingestion." },
  { title: "opcua-source-connector", detail: "Industrial OPC-UA protocol bridge." },
];

export const API_REFERENCES = [
  { title: "REST API", detail: "CRUD operations over resources, types, and procedures." },
  { title: "WebSocket API", detail: "Real-time subscriptions and event publishing." },
  { title: "GraphQL API", detail: "Query and mutate typed resources." },
];

export const CODE_RECIPES = [
  { title: "Debounce a Noisy Sensor Stream", tag: "VAIL" },
  { title: "Batch Insert with Retry", tag: "VAIL" },
  { title: "Call an External REST API", tag: "VAIL" },
  { title: "Geofence Trigger Rule", tag: "VAIL" },
];

export const PROMPT_GALLERY = [
  { title: "Scaffold a new VAIL procedure", tag: "Scaffolding" },
  { title: "Explain an event orchestration rule", tag: "Explain" },
  { title: "Convert a REST call to a VAIL source", tag: "Migration" },
  { title: "Write unit tests for a procedure", tag: "Testing" },
];

export const VAIL_REFERENCE = [
  { title: "Language Syntax Cheatsheet", detail: "Procedures, rules, types, and control flow at a glance." },
  { title: "Built-in Functions", detail: "String, date, collection, and system function reference." },
  { title: "Event & Rule Grammar", detail: "WHEN/DO syntax, event patterns, and trigger conditions." },
];

export const DEPLOYMENT_OPS = [
  { title: "Environment Promotion", detail: "Moving namespaces from dev to staging to production." },
  { title: "Edge Node Provisioning", detail: "Registering and configuring edge nodes at scale." },
  { title: "Monitoring & Alerting", detail: "Health checks, logs, and operational dashboards." },
];

export const SECURITY_AUTH = [
  { title: "OAuth 2.0 Setup", detail: "Configuring identity providers and token scopes." },
  { title: "Namespace Permissions", detail: "Resource-level access control and role assignment." },
  { title: "Secrets Management", detail: "Storing and rotating credentials safely." },
];

export const FLAGSHIP_DEMOS = [
  { title: "Autonomous Cold-Chain Monitoring", detail: "End-to-end edge AI demo for logistics." },
  { title: "Real-Time Patient Flow", detail: "Event-driven hospital operations walkthrough." },
  { title: "Predictive Grid Maintenance", detail: "Utility sensor fusion and anomaly detection." },
];

export interface DeveloperHubModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count: number;
  /** Roles that can see this module. Omit to show to every role that can see the hub. */
  roles?: Role[];
}

// The six modules grouped under "Technical Documents" in the sidebar.
export const TECHNICAL_DOC_MODULES: DeveloperHubModule[] = [
  {
    id: "documentation",
    title: "Documentation",
    description: "Language basics, walkthroughs, and integration guidance.",
    icon: FileText,
    href: "/developer-center/documentation",
    count: TECHNICAL_DOCS.length,
  },
  {
    id: "architecture",
    title: "Platform Architecture",
    description: "The platform blueprint and featured integration architectures.",
    icon: Cpu,
    href: "/developer-center/architecture",
    count: 4,
  },
  {
    id: "vail-reference",
    title: "VAIL Reference Guide",
    description: "Syntax cheatsheet, built-in functions, and event/rule grammar.",
    icon: BookOpen,
    href: "/developer-center/vail-reference",
    count: VAIL_REFERENCE.length,
  },
  {
    id: "extension-sources",
    title: "Extension Sources",
    description: "SDKs and reference connectors for building custom sources.",
    icon: Puzzle,
    href: "/developer-center/extension-sources",
    count: EXTENSION_SOURCES.length,
  },
  {
    id: "deployment-operations",
    title: "Deployment & Operations",
    description: "Environment promotion, edge provisioning, and monitoring.",
    icon: Rocket,
    href: "/developer-center/deployment-operations",
    count: DEPLOYMENT_OPS.length,
  },
  {
    id: "security-authentication",
    title: "Security & Authentication",
    description: "OAuth setup, namespace permissions, and secrets management.",
    icon: ShieldCheck,
    href: "/developer-center/security-authentication",
    count: SECURITY_AUTH.length,
  },
];

// Modules that sit outside the "Technical Documents" grouping in the sidebar.
export const STANDALONE_MODULES: DeveloperHubModule[] = [
  {
    id: "api-references",
    title: "API References",
    description: "REST, WebSocket, and GraphQL interfaces into the platform.",
    icon: Link2,
    href: "/developer-center/api-references",
    count: API_REFERENCES.length,
  },
  {
    id: "code-recipes",
    title: "Code Recipes / Reusable Templates",
    description: "Drop-in VAIL snippets for common patterns.",
    icon: Code2,
    href: "/developer-center/code-recipes",
    count: CODE_RECIPES.length,
  },
  {
    id: "prompt-gallery",
    title: "Claude Prompt Gallery",
    description: "Curated prompts for scaffolding, explaining, and testing VAIL code.",
    icon: Sparkles,
    href: "/developer-center/prompt-gallery",
    count: PROMPT_GALLERY.length,
  },
  {
    id: "flagship-demo",
    title: "Flagship Demo",
    description: "End-to-end reference builds across industries.",
    icon: PlayCircle,
    href: "/developer-center/flagship-demo",
    count: FLAGSHIP_DEMOS.length,
    roles: ["technical-partner"],
  },
];
