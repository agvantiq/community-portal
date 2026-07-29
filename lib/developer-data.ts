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
