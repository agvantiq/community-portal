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
  History,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/roles";
import { FEATURED_ARCHITECTURES } from "@/lib/sample-data";

export const TECHNICAL_DOCS = [
  { id: "getting-started-with-vail", title: "Getting Started with VAIL", detail: "Language basics, procedures, and rule syntax." },
  { id: "building-your-first-vail-app", title: "Building Your First VAIL App", detail: "A step-by-step walkthrough from empty namespace to running app." },
  { id: "integration-best-practices", title: "Integration Best Practices", detail: "Patterns for connecting external systems reliably." },
  { id: "edge-deployment-guide", title: "Edge Deployment Guide", detail: "Packaging and deploying nodes to edge devices." },
  { id: "event-type-reference", title: "Event Type Reference", detail: "Defining and subscribing to real-time event types." },
  { id: "security-access-control", title: "Security & Access Control", detail: "Namespaces, resource permissions, and OAuth setup." },
];

export const EXTENSION_SOURCES = [
  { title: "Enterprise Connectors Overview", detail: "How Vantiq communicates with other systems through Enterprise Connectors." },
  { title: "Enterprise Connector SDK", detail: "Build a custom Enterprise Connector for a system Vantiq doesn't ship a connector for." },
  { title: "Prebuilt Enterprise Connectors", detail: "The full catalog of ready-to-use connectors, open source and individually licensed." },
  { title: "JDBC Enterprise Connector", detail: "Connect Vantiq to relational databases over JDBC." },
  { title: "Apache Camel Connector", detail: "Bridge Vantiq into Camel's integration routes and components." },
  { title: "JMS Enterprise Connector", detail: "Exchange messages with JMS-based enterprise messaging systems." },
  { title: "Object Recognition Enterprise Connector", detail: "Feed computer-vision object detection results into Vantiq." },
  { title: "OPC UA Enterprise Connector", detail: "Industrial OPC-UA protocol bridge for plant and equipment data." },
  { title: "UDP Enterprise Connector", detail: "Ingest and publish raw UDP datagram traffic." },
  { title: "Python Execution Connector & Enterprise Connector SDK", detail: "Run custom Python logic as part of an Enterprise Connector." },
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
  { title: "Client Development", detail: "Reference for building browser-based Vantiq clients." },
  { title: "Operations & Management", detail: "Day-to-day platform operations and namespace management reference." },
  { title: "Design Modeler", detail: "Reference for the visual type and relationship modeling tool." },
  { title: "Service Development", detail: "Reference for building and deploying Vantiq services." },
  { title: "Branding", detail: "Theming and white-labeling reference for partner deployments." },
  { title: "Catalog", detail: "Reference for publishing and installing from the Vantiq Catalog." },
  { title: "Image Processing", detail: "Reference for image and computer-vision processing procedures." },
  { title: "External Sources", detail: "Reference for connecting external data and event sources." },
  { title: "Testing", detail: "Reference for unit and integration testing Vantiq projects." },
  { title: "AI", detail: "Reference for Vantiq's AI and GenAI platform capabilities." },
  { title: "Vantiq Modeler", detail: "Reference for the Vantiq Modeler design environment." },
  { title: "Storage Managers", detail: "Reference for configuring and managing data storage backends." },
  { title: "Core Platform", detail: "Reference for core platform concepts, types, and procedures." },
  { title: "Assemblies", detail: "Reference for packaging and structuring reusable assemblies." },
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
  { title: "Advanced Collaborations", detail: "Coordinating multi-user, real-time collaborative workflows." },
  { title: "Analytics", detail: "Building analytics views over live and historical Vantiq data." },
  { title: "App Components", detail: "Composing an application from reusable App Builder components." },
  { title: "Assemblies", detail: "Packaging a set of project resources into a reusable assembly." },
  { title: "Catalogs", detail: "Publishing and installing packaged assemblies through the Vantiq Catalog." },
  { title: "Client Builder", detail: "Building a browser-based client UI with the Client Builder." },
  { title: "Client Components", detail: "Composing reusable UI components for a Vantiq client." },
  { title: "Conversation", detail: "Building conversational, chat-style interactions into a Vantiq app." },
];

export const DEV_GUIDES = [
  { title: "Namespace Design Patterns", detail: "Structuring namespaces for multi-tenant deployments." },
  { title: "Event-Driven Architecture in VAIL", detail: "Modeling systems as events, rules, and reactions." },
  { title: "Working with Assemblies", detail: "Packaging reusable app components for reuse across namespaces." },
  { title: "VANTIQ Developers Guide - Introduction to Intelligence in VANTIQ Applications", detail: "How AI and GenAI capabilities fit into a Vantiq application." },
  { title: "VANTIQ Developers Guide Series - Designing VANTIQ Applications", detail: "A structured approach to designing a real-time Vantiq application." },
  { title: "VANTIQ Developers Guide Series - Introduction to VANTIQ Development", detail: "Foundational concepts every Vantiq developer starts from." },
];

export const STYLE_GUIDES = [
  { title: "VAIL Naming Conventions", detail: "Consistent naming for types, procedures, and rules." },
  { title: "Project Structure Guidelines", detail: "Recommended namespace and folder organization." },
  { title: "Commenting & Documentation Standards", detail: "Writing procedures other developers can maintain." },
  { title: "Server Development Standards", detail: "Coding and structure standards for server-side VAIL development." },
  { title: "Client Builder Development Standards", detail: "Coding and structure standards for Client Builder projects." },
];

export const BEST_PRACTICES = [
  { title: "Idempotent Rule Design", detail: "Avoiding duplicate side effects on event replay." },
  { title: "Secure Secrets Handling", detail: "Never hardcode credentials in a procedure." },
  { title: "Testing VAIL Procedures", detail: "Unit and integration testing strategies." },
  { title: "Build Your Own Tools", detail: "Packaging custom logic as reusable AI tools." },
  { title: "Cache Services", detail: "Using cache services to reduce redundant lookups and calls." },
  { title: "Camel Assemblies", detail: "Packaging Apache Camel integrations as reusable assemblies." },
  { title: "Client to Component Conversion", detail: "Migrating a standalone client into reusable components." },
  { title: "Create a MCP Server in a Vantiq Project", detail: "Exposing a Vantiq project's tools over MCP." },
  { title: "Discovering Current Session Information", detail: "Reading the active user and session context from a procedure." },
  { title: "Dynamic Client Content", detail: "Rendering client content that adapts to runtime data." },
  { title: "Dynamic Map View Widget", detail: "Configuring a map widget to reflect live, changing data." },
];

export const PERFORMANCE_GUIDES = [
  { title: "Optimizing Rule Execution", detail: "Reducing latency in high-throughput event rules." },
  { title: "Scaling Edge Nodes", detail: "Load distribution across a fleet of edge deployments." },
  { title: "Query & Index Tuning", detail: "Speeding up resource queries at scale." },
  { title: "Diagnosing Faults and Scalability Issues In Vantiq Applications", detail: "A troubleshooting approach for faults and scale bottlenecks." },
];

export const GLOSSARY_TERMS = [
  { title: "VAIL", detail: "Vantiq's own procedural language for writing rules and procedures." },
  { title: "Namespace", detail: "An isolated workspace containing an app's types, rules, and resources." },
  { title: "Resource", detail: "Any first-class object in the platform — types, procedures, rules, sources, and more." },
  { title: "Type", detail: "A schema defining the shape of data stored and exchanged within a namespace." },
  { title: "Procedure", detail: "A reusable block of VAIL code, callable from rules, other procedures, or the REST API." },
  { title: "Rule", detail: "A WHEN/DO statement that reacts to an event by running a procedure." },
  { title: "Source", detail: "A connector that brings external events (MQTT, REST, OPC-UA, etc.) into a namespace." },
  { title: "Assembly", detail: "A packaged, reusable bundle of app components that can be installed into another namespace." },
];

export const WHITEPAPERS = [
  { title: "State Management at the Edge", detail: "Patterns for keeping edge nodes consistent under intermittent connectivity." },
  { title: "Scaling to 10M Events per Second", detail: "Architecture notes from Vantiq's highest-throughput deployments." },
  { title: "Federated AI vs. Cloud AI", detail: "Trade-offs between on-device inference and centralized model serving." },
];

// --- Resource Library folders (part of Resources, /resources/library) ---
// Mirrors the real Resource Library's top-level folder structure. Most
// folders only had their name confirmed, not real file-level contents — one
// representative item per folder keeps the structure complete without
// inventing a fuller file listing than was actually seen.
export const ANALYST_REPORTS = [
  { title: "Gartner Magic Quadrant 2026", detail: "Independent analyst evaluation of the real-time platform market." },
  { title: "Forrester Wave: Real-Time Platforms", detail: "Independent analyst comparison of real-time application platforms." },
];

export const CUSTOMER_USE_CASE_DECKS = [
  { title: "Smart City Implementation Deck", detail: "A customer implementation walkthrough for smart city deployments." },
  { title: "Healthcare Solution Overview", detail: "A customer-facing overview of the healthcare reference architecture." },
];

export const CUSTOMER_TECHNICAL_SUPPORT = [
  { title: "Customer Support Handbook", detail: "How to engage Vantiq technical support for a customer deployment." },
];

export const KOREAN_TRANSLATED_COLLATERALS = [
  { title: "Vantiq Platform Overview (한국어)", detail: "Korean-language translation of the core platform overview." },
];

export const MARKETING_SUPPORT_PROGRAMS = [
  { title: "Co-Marketing Program Guide", detail: "How to run a joint marketing program with Vantiq." },
];

export const PARTNER_ENABLEMENT_DOCS = [
  { title: "Partner Enablement Roadmap", detail: "The recommended path from onboarding to certified partner." },
];

export const PRODUCT_CONTENT = [
  { title: "Product Overview Deck", detail: "A general-purpose overview deck for introducing the Vantiq product." },
];

export const HOW_TO_VIDEOS = [
  { title: "Getting Started with VAIL", detail: "12 min — a first tour of the language and console." },
  { title: "Building a Real-Time Dashboard", detail: "18 min — composing a client app against live data." },
  { title: "Deploying Your First Edge Node", detail: "9 min — provisioning and registering a node." },
  { title: "Debugging Event Rules", detail: "15 min — tracing why a rule didn't fire." },
  { title: "How To Video - The Join Activity Pattern", detail: "8 min — modeling a multi-party join in an activity flow." },
  { title: "How To Video Shorts - LLM Playground", detail: "Short — trying prompts against a model in the LLM Playground." },
  { title: "How To Video Shorts: Client Layouts", detail: "Short — composing client layouts." },
  { title: "How To Video Shorts: AI Tools (Functions)", detail: "Short — exposing AI tools as callable functions." },
  { title: "How To Video Shorts: Analytics and ComputeStatistics", detail: "Short — using ComputeStatistics in an analytics view." },
  { title: "How To Video Shorts: Calling Procedures by Properties", detail: "Short — invoking a procedure by property reference." },
  { title: "How To Video Shorts: Client CSS", detail: "Short — styling a Vantiq client with CSS." },
  { title: "How To Video Shorts: How to Create a Built-In Source", detail: "Short — building a built-in source type." },
];

// Real Vantiq release notes are published on their own cadence outside this
// prototype — kept as a small representative set rather than a live feed.
export const RELEASE_NOTES_DOCS = [
  { title: "Release 1.40", detail: "Native GenAI orchestration on the Edge." },
  { title: "Release 1.39", detail: "Improved WebSocket reconnection handling." },
  { title: "Release 1.38", detail: "New OPC-UA source connector, bug fixes." },
];

// Tips & Tricks (part of Developer Hub, /developer-center/tips-and-tricks) —
// partner-submitted lessons learned. Mutable fields (upvotes, new
// submissions) live in local state on that page; this is just the seed data,
// also surfaced as "Tip"-type cards in the Resources catalog below.
export const TIP_CATEGORIES = ["VAIL", "Performance", "Deployment", "Debugging", "Integrations"] as const;
export type TipCategory = (typeof TIP_CATEGORIES)[number];

export interface Tip {
  id: string;
  title: string;
  body: string;
  author: string;
  org: string;
  category: TipCategory;
  upvotes: number;
}

export const TIPS_AND_TRICKS: Tip[] = [
  {
    id: "vail-early-return",
    title: "Use early returns to keep procedures flat",
    body: "Guard clauses at the top of a VAIL procedure avoid deep nesting and make error paths obvious at a glance.",
    author: "Priya Nair",
    org: "Radenta Tech",
    category: "VAIL",
    upvotes: 42,
  },
  {
    id: "index-hot-fields",
    title: "Index any field you filter events on",
    body: "Unindexed event-type queries scan the full collection. Add an index on every field used in a WHERE clause before you go to load testing.",
    author: "Derek Osei",
    org: "SoftServe",
    category: "Performance",
    upvotes: 37,
  },
  {
    id: "staged-rollouts",
    title: "Ship rule changes to a canary namespace first",
    body: "Clone the target namespace, deploy there, and watch the event log for a day before promoting to production.",
    author: "Naomi Wallace",
    org: "NTT Data",
    category: "Deployment",
    upvotes: 29,
  },
  {
    id: "replay-event-log",
    title: "Replay the event log to reproduce timing bugs",
    body: "Most \"only happens sometimes\" issues are event-ordering races. Export the log and replay it locally instead of guessing.",
    author: "Ravi Patel",
    org: "Wipro Mfg",
    category: "Debugging",
    upvotes: 51,
  },
  {
    id: "webhook-retries",
    title: "Set idempotency keys on outbound webhooks",
    body: "Vantiq retries failed webhook deliveries. Without an idempotency key on the receiving end, retries duplicate side effects.",
    author: "Maya Chen",
    org: "Cognizant Tech",
    category: "Integrations",
    upvotes: 33,
  },
  {
    id: "vail-type-checks",
    title: "Validate incoming payloads before mapping to a type",
    body: "A single malformed event can crash a whole rule chain. Validate shape first, then map — don't let the type system find out at runtime.",
    author: "Lucia Fernandez",
    org: "Infosys Cloud",
    category: "VAIL",
    upvotes: 24,
  },
];

// The Contributions repo — community-shared VANTIQ projects, apps, and code
// samples that can be imported directly into a namespace via Modelo.
export const CONTRIBUTIONS = [
  { title: "Google APIs", detail: "Using Google Maps, Directions, and related APIs from a Vantiq app." },
  { title: "Google Maps API", detail: "Mapping, geocoding, and location display in a Vantiq client." },
  { title: "MSFace APIs", detail: "Facial recognition via Microsoft Face API integration." },
  { title: "Public User Registration", detail: "A self-serve public registration and login flow." },
  { title: "Pump AI Troubleshooting", detail: "AI-assisted fault diagnosis for industrial pump equipment." },
  { title: "Tracking Region", detail: "Geofencing and region-based tracking for moving assets." },
  { title: "Twitter API", detail: "Pulling and reacting to social posts from the Twitter/X API." },
  { title: "Weather Emergency Project", detail: "Severe-weather alerting and coordinated emergency response." },
  { title: "Adding a Contribution", detail: "How to package and submit your own project to the Contributions repo." },
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
  {
    id: "release-notes",
    title: "Release Notes",
    description: "Version-by-version changes, fixes, and new capabilities.",
    icon: History,
    href: "/developer-center/release-notes",
    count: RELEASE_NOTES_DOCS.length,
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
  {
    id: "contributions",
    title: "Contributions",
    description: "Community-shared projects, apps, and code samples, ready to import.",
    icon: GitBranch,
    href: "/developer-center/contributions",
    count: CONTRIBUTIONS.length,
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

// --- Resources (part of Resources, /resources) ---
// One flattened, type-badged list built from every section above, so the
// Resources stays in sync with the sidebar/module content instead of
// duplicating it.

export type ResourceType =
  | "Guide"
  | "Documentation"
  | "Article"
  | "Reference"
  | "Video"
  | "Tutorial"
  | "Whitepaper"
  | "Report"
  | "Template"
  | "SDK"
  | "API"
  | "Prompt"
  | "Tip";

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
  Documentation: "bg-emphasis/10 text-emphasis",
  Article: "bg-success/10 text-success",
  Reference: "bg-info/10 text-info",
  Video: "bg-emphasis/10 text-emphasis",
  Tutorial: "bg-success/10 text-success",
  Whitepaper: "bg-critical/10 text-critical",
  Report: "bg-critical/10 text-critical",
  Template: "bg-emphasis/10 text-emphasis",
  SDK: "bg-critical/10 text-critical",
  API: "bg-info/10 text-info",
  Prompt: "bg-emphasis/10 text-emphasis",
  Tip: "bg-primary/10 text-primary",
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
  ...fromDetailItems(TECHNICAL_DOCS, "Documentation", "Documentation", "/developer-center/documentation"),
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
  ...fromDetailItems(DEV_GUIDES, "Article", "Dev Guides", "/developer-center/dev-guides"),
  ...fromDetailItems(STYLE_GUIDES, "Article", "Style Guides", "/developer-center/style-guides"),
  ...fromDetailItems(BEST_PRACTICES, "Article", "Best Practices", "/developer-center/best-practices"),
  ...fromDetailItems(PERFORMANCE_GUIDES, "Article", "Performance", "/developer-center/performance"),
  ...fromDetailItems(HOW_TO_VIDEOS, "Video", "How-to Videos", "/developer-center/how-to-videos"),
  ...TIPS_AND_TRICKS.map((tip) => ({
    id: `tip-${tip.id}`,
    title: tip.title,
    description: tip.body,
    type: "Tip" as ResourceType,
    category: "Tips & Tricks",
    href: "/developer-center/tips-and-tricks",
  })),
  ...fromDetailItems(WHITEPAPERS, "Whitepaper", "Whitepapers", "/resources/whitepapers"),
  ...fromDetailItems(GLOSSARY_TERMS, "Reference", "Glossary", "/resources/reference"),
  ...fromDetailItems(RELEASE_NOTES_DOCS, "Documentation", "Release Notes", "/developer-center/release-notes"),
  ...fromDetailItems(CONTRIBUTIONS, "Template", "Contributions", "/developer-center/contributions"),
  ...fromDetailItems(ANALYST_REPORTS, "Report", "Analyst Reports", "/resources/library"),
  ...fromDetailItems(CUSTOMER_USE_CASE_DECKS, "Report", "Customer Use Cases", "/resources/library"),
  ...fromDetailItems(CUSTOMER_TECHNICAL_SUPPORT, "Guide", "Customer Technical Support", "/resources/library"),
  ...fromDetailItems(KOREAN_TRANSLATED_COLLATERALS, "Guide", "Korean Translated Collaterals", "/resources/library"),
  ...fromDetailItems(MARKETING_SUPPORT_PROGRAMS, "Guide", "Marketing Support and Programs", "/resources/library"),
  ...fromDetailItems(PARTNER_ENABLEMENT_DOCS, "Guide", "Partner Enablement", "/resources/library"),
  ...fromDetailItems(PRODUCT_CONTENT, "Guide", "Product Content", "/resources/library"),
  ...FEATURED_ARCHITECTURES.map((item) => ({
    id: `architecture-${slugify(item.title)}`,
    title: item.title,
    description: item.description,
    type: "Guide" as ResourceType,
    category: "Architecture",
    href: "/developer-center/architecture",
  })),
];

export const RESOURCE_TYPES: ResourceType[] = Array.from(new Set(RESOURCE_CENTER_ITEMS.map((r) => r.type)));

// The Knowledge Base's own "Getting Started" entry — not sourced from any of
// the fromDetailItems() groups above, so it isn't in RESOURCE_CENTER_ITEMS.
// Exported (rather than left inline on the Knowledge Base page) so the
// /resources/[id] detail-page template can resolve it by id too.
export const WELCOME_TO_VANTIQ_ITEM: ResourceItem = {
  id: "getting-started-welcome-to-vantiq",
  title: "Welcome to Vantiq!",
  description: "",
  type: "Guide",
  category: "Getting Started",
  href: "/developer-center",
};

export function getResourceById(id: string): ResourceItem | undefined {
  return (
    RESOURCE_CENTER_ITEMS.find((r) => r.id === id) ??
    (WELCOME_TO_VANTIQ_ITEM.id === id ? WELCOME_TO_VANTIQ_ITEM : undefined)
  );
}

