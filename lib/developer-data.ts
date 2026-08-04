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
  NotebookText,
  Compass,
  Palette,
  Award,
  Gauge,
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

export const TUTORIALS = [
  { title: "Build Your First VAIL App", detail: "From an empty namespace to a running app in about 20 minutes." },
  { title: "Connect an MQTT Source", detail: "Wire up a live device feed end to end." },
  { title: "Deploy to the Edge", detail: "Package and push a namespace to an edge node." },
  { title: "Build a Custom Dashboard", detail: "Compose a client app against your own types." },
];

export const DEV_GUIDES = [
  { title: "Namespace Design Patterns", detail: "Structuring namespaces for multi-tenant deployments." },
  { title: "Event-Driven Architecture in VAIL", detail: "Modeling systems as events, rules, and reactions." },
  { title: "Working with Assemblies", detail: "Packaging reusable app components for reuse across namespaces." },
];

export const STYLE_GUIDES = [
  { title: "VAIL Naming Conventions", detail: "Consistent naming for types, procedures, and rules." },
  { title: "Project Structure Guidelines", detail: "Recommended namespace and folder organization." },
  { title: "Commenting & Documentation Standards", detail: "Writing procedures other developers can maintain." },
];

export const BEST_PRACTICES = [
  { title: "Idempotent Rule Design", detail: "Avoiding duplicate side effects on event replay." },
  { title: "Secure Secrets Handling", detail: "Never hardcode credentials in a procedure." },
  { title: "Testing VAIL Procedures", detail: "Unit and integration testing strategies." },
];

export const PERFORMANCE_GUIDES = [
  { title: "Optimizing Rule Execution", detail: "Reducing latency in high-throughput event rules." },
  { title: "Scaling Edge Nodes", detail: "Load distribution across a fleet of edge deployments." },
  { title: "Query & Index Tuning", detail: "Speeding up resource queries at scale." },
];

export const HOW_TO_VIDEOS = [
  { title: "Getting Started with VAIL", detail: "12 min — a first tour of the language and console." },
  { title: "Building a Real-Time Dashboard", detail: "18 min — composing a client app against live data." },
  { title: "Deploying Your First Edge Node", detail: "9 min — provisioning and registering a node." },
  { title: "Debugging Event Rules", detail: "15 min — tracing why a rule didn't fire." },
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

// The six modules grouped under "Developer Guides" in the sidebar.
export const DEVELOPER_GUIDE_MODULES: DeveloperHubModule[] = [
  {
    id: "tutorials",
    title: "Tutorials",
    description: "Step-by-step walkthroughs for common builds.",
    icon: NotebookText,
    href: "/developer-center/tutorials",
    count: TUTORIALS.length,
  },
  {
    id: "dev-guides",
    title: "Dev Guides",
    description: "Deeper conceptual guides for designing on Vantiq.",
    icon: Compass,
    href: "/developer-center/dev-guides",
    count: DEV_GUIDES.length,
  },
  {
    id: "style-guides",
    title: "Style Guides",
    description: "Naming, structure, and documentation conventions.",
    icon: Palette,
    href: "/developer-center/style-guides",
    count: STYLE_GUIDES.length,
  },
  {
    id: "best-practices",
    title: "Best Practices",
    description: "Patterns that hold up in production.",
    icon: Award,
    href: "/developer-center/best-practices",
    count: BEST_PRACTICES.length,
  },
  {
    id: "performance",
    title: "Performance",
    description: "Tuning rules, edge nodes, and queries at scale.",
    icon: Gauge,
    href: "/developer-center/performance",
    count: PERFORMANCE_GUIDES.length,
  },
  {
    id: "how-to-videos",
    title: "How-to Videos",
    description: "Short screen-capture walkthroughs of common tasks.",
    icon: PlayCircle,
    href: "/developer-center/how-to-videos",
    count: HOW_TO_VIDEOS.length,
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
];

// --- Resource Center (/developer-center/resources) ---
// One flattened, type-badged list built from every section above, so the
// Resource Center stays in sync with the sidebar/module content instead of
// duplicating it.

export type ResourceType = "Guide" | "Reference" | "Video" | "Tutorial" | "Template" | "SDK" | "API" | "Prompt";

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  href: string;
}

export const RESOURCE_TYPE_STYLE: Record<ResourceType, string> = {
  Guide: "bg-primary/10 text-primary",
  Reference: "bg-info/10 text-info",
  Video: "bg-warning/10 text-warning",
  Tutorial: "bg-success/10 text-success",
  Template: "bg-emphasis/10 text-emphasis",
  SDK: "bg-critical/10 text-critical",
  API: "bg-info/10 text-info",
  Prompt: "bg-emphasis/10 text-emphasis",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function fromDetailItems(
  items: { title: string; detail: string }[],
  type: ResourceType,
  category: string,
  href: string
): ResourceItem[] {
  return items.map((item) => ({
    id: `${slugify(category)}-${slugify(item.title)}`,
    title: item.title,
    description: item.detail,
    type,
    category,
    href,
  }));
}

function fromTagItems(
  items: { title: string; tag: string }[],
  type: ResourceType,
  category: string,
  href: string
): ResourceItem[] {
  return items.map((item) => ({
    id: `${slugify(category)}-${slugify(item.title)}`,
    title: item.title,
    description: `Tagged ${item.tag}.`,
    type,
    category,
    href,
  }));
}

export const RESOURCE_CENTER_ITEMS: ResourceItem[] = [
  ...fromDetailItems(TECHNICAL_DOCS, "Guide", "Documentation", "/developer-center/documentation"),
  ...fromDetailItems(EXTENSION_SOURCES, "SDK", "Extension Sources", "/developer-center/extension-sources"),
  // Phase 2 — re-enable once API References, Code Recipes, and the Prompt
  // Gallery are linked from navigation again:
  // ...fromDetailItems(API_REFERENCES, "API", "API References", "/developer-center/api-references"),
  // ...fromTagItems(CODE_RECIPES, "Template", "Code Recipes", "/developer-center/code-recipes"),
  // ...fromTagItems(PROMPT_GALLERY, "Prompt", "Prompt Gallery", "/developer-center/prompt-gallery"),
  ...fromDetailItems(VAIL_REFERENCE, "Reference", "VAIL Reference", "/developer-center/vail-reference"),
  ...fromDetailItems(DEPLOYMENT_OPS, "Guide", "Deployment & Operations", "/developer-center/deployment-operations"),
  ...fromDetailItems(SECURITY_AUTH, "Guide", "Security & Authentication", "/developer-center/security-authentication"),
  ...fromDetailItems(TUTORIALS, "Tutorial", "Tutorials", "/developer-center/tutorials"),
  ...fromDetailItems(DEV_GUIDES, "Guide", "Dev Guides", "/developer-center/dev-guides"),
  ...fromDetailItems(STYLE_GUIDES, "Guide", "Style Guides", "/developer-center/style-guides"),
  ...fromDetailItems(BEST_PRACTICES, "Guide", "Best Practices", "/developer-center/best-practices"),
  ...fromDetailItems(PERFORMANCE_GUIDES, "Guide", "Performance", "/developer-center/performance"),
  ...fromDetailItems(HOW_TO_VIDEOS, "Video", "How-to Videos", "/developer-center/how-to-videos"),
];

export const RESOURCE_TYPES: ResourceType[] = Array.from(new Set(RESOURCE_CENTER_ITEMS.map((r) => r.type)));

// Hand-picked highlights spanning a mix of types — one from each of the four
// "Browse by Type" tiles below.
export const FEATURED_RESOURCE_IDS = [
  "documentation-getting-started-with-vail",
  "how-to-videos-getting-started-with-vail",
  "tutorials-build-your-first-vail-app",
  "vail-reference-language-syntax-cheatsheet",
];

export interface KBLink {
  label: string;
  href: string;
}

export interface KBSection {
  title: string;
  links: KBLink[];
}

// Mirrors the structure of the Knowledge Base Vantiq manages externally on
// WordPress (Echo) — same three categories, same grouping — so partners find
// the same organization here as on the external KB, just pointed at the
// portal's own pages instead of a second, separately-maintained copy.
export const KB_SECTIONS: KBSection[] = [
  {
    title: "Getting Started",
    links: [
      { label: "Welcome to Vantiq!", href: "/developer-center/documentation" },
      { label: "Tutorials", href: "/developer-center/tutorials" },
    ],
  },
  {
    title: "Product Documentation",
    links: [
      { label: "Reference", href: "/developer-center/vail-reference" },
      { label: "Release Notes", href: "/resources#release-notes" },
      { label: "Glossary", href: "/resources/reference" },
    ],
  },
  {
    title: "Articles",
    links: [
      { label: "Architecture", href: "/developer-center/architecture" },
      { label: "Developer Guides", href: "/developer-center/dev-guides" },
      { label: "Style Guides", href: "/developer-center/style-guides" },
      { label: "Best Practices", href: "/developer-center/best-practices" },
      { label: "Performance", href: "/developer-center/performance" },
      { label: "How To Videos", href: "/developer-center/how-to-videos" },
    ],
  },
];
