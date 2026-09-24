// Shared mock content for the community portal prototype pages.
// Partner org roster and deal names are carried over from the earlier prototype
// (Community Portal - updated/) so forum authors, deal owners, and showcase
// contributors read as one consistent fictional ecosystem rather than random filler.

import type { Role } from "@/lib/roles";

export const PARTNER_ORGS = [
  "Radenta Tech",
  "SoftServe",
  "NTT Data",
  "Cognizant Tech",
  "Wipro Mfg",
  "TCS Solutions",
  "Infosys Cloud",
  "DXC Tech",
  "Capgemini",
] as const;

export const FORUM_TAGS = [
  { label: "VAIL", count: 142 },
  { label: "Edge-Computing", count: 98 },
  { label: "MQTT", count: 85 },
  { label: "App-Builder", count: 76 },
  { label: "REST", count: 64 },
  { label: "GenAI", count: 53 },
  { label: "Kafka", count: 41 },
  { label: "OPC-UA", count: 38 },
] as const;

export type DealStage = "Discovery" | "Technical Validation" | "Proposal" | "Negotiation" | "Closed Won";

export interface Deal {
  id: string;
  client: string;
  useCase: string;
  stage: DealStage;
  owner: string;
}

export const DEALS: Deal[] = [
  { id: "d1", client: "Northwind Manufacturing", useCase: "Predictive maintenance for assembly lines", stage: "Technical Validation", owner: "Radenta Tech" },
  { id: "d2", client: "Meridian Logistics", useCase: "Real-time fleet telemetry orchestration", stage: "Proposal", owner: "SoftServe" },
  { id: "d3", client: "Harborview Health", useCase: "Bed-availability event pipeline", stage: "Discovery", owner: "Cognizant Tech" },
  { id: "d4", client: "Aurora Dynamics", useCase: "Edge AI quality inspection", stage: "Negotiation", owner: "TCS Solutions" },
  { id: "d5", client: "Sentinel Industries", useCase: "Perimeter anomaly detection", stage: "Closed Won", owner: "Wipro Mfg" },
  { id: "d6", client: "Vertex Energy", useCase: "Grid load-balancing automation", stage: "Discovery", owner: "Infosys Cloud" },
];

export interface ForumPost {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  votes: number;
  answers: number;
  accepted: boolean;
  timeAgo: string;
  bounty?: number;
}

export const FORUM_POSTS: ForumPost[] = [
  {
    id: "how-do-i-configure-mqtt-source-tls",
    title: "How do I configure an MQTT source with TLS?",
    description: "Trying to connect to a broker that requires mutual TLS auth. Where do client certs go in the source config?",
    tags: ["MQTT", "Security"],
    author: "Priya Nandakumar",
    votes: 24,
    answers: 3,
    accepted: true,
    timeAgo: "2h ago",
  },
  {
    id: "vail-rule-firing-twice",
    title: "VAIL rule firing twice on the same event",
    description: "A WHEN/DO rule watching a Type seems to execute twice per insert. Is this an idempotency issue on my end?",
    tags: ["VAIL", "App-Builder"],
    author: "Marek Kowalski",
    votes: 18,
    answers: 2,
    accepted: false,
    timeAgo: "5h ago",
  },
  {
    id: "kafka-topic-fanout-pattern",
    title: "Best pattern for fanning telemetry out to multiple Kafka topics",
    description: "Need to publish the same edge event to three downstream topics with different partition keys.",
    tags: ["Kafka", "Edge-Computing"],
    author: "Haruto Tanaka",
    votes: 31,
    answers: 4,
    accepted: true,
    timeAgo: "1d ago",
    bounty: 500,
  },
  {
    id: "opcua-bridge-latency",
    title: "OPC-UA to Kafka bridge adding 400ms latency",
    description: "Seeing consistent latency spikes on the bridge extension source under load. Any tuning guidance?",
    tags: ["OPC-UA", "Kafka"],
    author: "Daniela Ferreira",
    votes: 9,
    answers: 1,
    accepted: false,
    timeAgo: "1d ago",
  },
  {
    id: "genai-connector-rate-limits",
    title: "Handling rate limits on the native Anthropic connector",
    description: "What's the recommended backoff strategy when the GenAI connector hits a 429?",
    tags: ["GenAI", "REST"],
    author: "Arjun Mehta",
    votes: 14,
    answers: 2,
    accepted: false,
    timeAgo: "2d ago",
  },
];

export interface PathModule {
  /** References CatalogCourse.id (defined further below) — resolve via getCourseById(). */
  courseId: string;
  /** Recommended order, not enforced — nothing is ever locked/unavailable. */
  status: "done" | "current" | "upcoming";
  progress?: number;
  /** Optional supplementary instructions shown alongside the module title. */
  note?: string;
}


export interface TechnicalPath {
  id: string;
  label: string;
  /** Recommended order — partners are encouraged to complete all five paths, but nothing enforces the sequence. */
  modules: PathModule[];
}

export const TECHNICAL_PATHS: TechnicalPath[] = [
  {
    id: "ai-developer",
    label: "AI Developer",
    modules: [
      { courseId: "applications-developer-level-1", status: "done" },
      { courseId: "vantiq-version-control-system", status: "done" },
      { courseId: "advanced-genai-applications", status: "current", progress: 60 },
      { courseId: "app-components", status: "upcoming" },
      { courseId: "vail-procedures", status: "upcoming" },
      { courseId: "vail-ai", status: "upcoming" },
      { courseId: "ai-multi-agent-architecture", status: "upcoming" },
      { courseId: "visual-event-handler-ai-features", status: "upcoming" },
    ],
  },
  {
    id: "server-developer",
    label: "Server Developer",
    modules: [
      { courseId: "applications-developer-level-1", status: "upcoming" },
      { courseId: "vantiq-version-control-system", status: "upcoming" },
      { courseId: "vantiqs-testing-tools", status: "upcoming" },
      { courseId: "ai-in-event-driven-applications", status: "upcoming" },
      { courseId: "vail-procedures", status: "upcoming" },
      { courseId: "vantiq-integration", status: "upcoming" },
      { courseId: "vail-dml", status: "upcoming" },
      { courseId: "vail-rules", status: "upcoming" },
      { courseId: "server-developer-best-practices", status: "upcoming" },
      { courseId: "app-components", status: "upcoming" },
      { courseId: "the-vantiq-catalog", status: "upcoming" },
      { courseId: "1-34-vantiq-assemblies", status: "upcoming" },
      { courseId: "distributed-deployment", status: "upcoming" },
      { courseId: "vantiq-edge-2", status: "upcoming" },
    ],
  },
  {
    id: "ui-developer",
    label: "UI Developer",
    modules: [
      { courseId: "applications-developer-level-1", status: "upcoming" },
      { courseId: "vantiq-version-control-system", status: "upcoming" },
      { courseId: "vantiq-integration", status: "upcoming" },
      { courseId: "client-developer-best-practices", status: "upcoming" },
      { courseId: "client-layouts-templates-components", status: "upcoming" },
      { courseId: "launchable-clients", status: "upcoming" },
      { courseId: "dynamic-client-content", status: "upcoming" },
      { courseId: "the-vantiq-catalog", status: "upcoming" },
      { courseId: "1-34-vantiq-assemblies", status: "upcoming" },
    ],
  },
  {
    id: "architect",
    label: "Architect",
    modules: [
      { courseId: "applications-developer-level-1", status: "upcoming" },
      { courseId: "system-modeler-2", status: "upcoming" },
      { courseId: "server-developer-best-practices", status: "upcoming" },
    ],
  },
  {
    id: "administrator",
    label: "Administration Training",
    modules: [
      { courseId: "applications-developer-level-1", status: "upcoming" },
      { courseId: "vantiq-deployment-system-administration", status: "upcoming" },
      { courseId: "vantiq-system-administration", status: "upcoming" },
      { courseId: "organization-namespace-administration", status: "upcoming" },
      { courseId: "vantiq-command-line-interface-2", status: "upcoming" },
    ],
  },
];

// Sales enablement decks provided by the user (OneDrive_1_8-12-2026), added
// as three additional tracks under Sales Training Paths alongside the
// original Sales Rep path above. Each track mirrors one real curriculum
// folder 1:1, in file order — "1- Sales Foundations" (5 modules),
// "2- Advanced Sales" (6 modules), "3- Advanced Pre-Sales" (6 modules plus
// the 3.R reference module). The fourth folder, "Electives" (E1-E3), has no
// required sequence, so those three live as freestanding elective courses in
// COURSE_CATALOG below rather than as a fourth track box here — same
// treatment as the technical electives, surfaced via the Courses Catalog's
// Electives filter.
export const SALES_FOUNDATIONS_TRACK: TechnicalPath = {
  id: "sales-foundations",
  label: "Sales Foundations",
  modules: [
    { courseId: "ai-foundations", status: "upcoming" },
    { courseId: "what-is-vantiq", status: "upcoming" },
    { courseId: "orchestration-transformation-enabler", status: "upcoming" },
    { courseId: "pitching-value-and-business-impact", status: "upcoming" },
    { courseId: "vantiq-elevator-pitch-exercise", status: "upcoming", note: "Workshop exercise" },
  ],
};

export const ADVANCED_SALES_TRACK: TechnicalPath = {
  id: "advanced-sales",
  label: "Advanced Sales",
  modules: [
    { courseId: "industry-use-cases", status: "upcoming" },
    { courseId: "inside-vantiq-technical-deep-dive", status: "upcoming" },
    { courseId: "vantiq-competitive-landscape", status: "upcoming" },
    { courseId: "running-the-deal-customer-engagement-playbook", status: "upcoming" },
    { courseId: "opportunity-qualification-exercise", status: "upcoming", note: "Workshop exercise" },
    { courseId: "partnership-strategy", status: "upcoming" },
  ],
};

export const ADVANCED_PRESALES_TRACK: TechnicalPath = {
  id: "advanced-presales",
  label: "Advanced Pre-Sales",
  modules: [
    { courseId: "technical-differentiators", status: "upcoming" },
    { courseId: "architecture-deep-dive", status: "upcoming" },
    { courseId: "technical-discovery", status: "upcoming" },
    { courseId: "demo-and-proof-strategy", status: "upcoming" },
    { courseId: "solution-design-and-ai-integration-strategy", status: "upcoming" },
    { courseId: "solution-development-and-deployment", status: "upcoming" },
    { courseId: "vantiq-ai-fit-framework", status: "upcoming", note: "Reference — optional" },
  ],
};

export const SALES_ENABLEMENT_TRACKS: TechnicalPath[] = [
  SALES_FOUNDATIONS_TRACK,
  ADVANCED_SALES_TRACK,
  ADVANCED_PRESALES_TRACK,
];

export const ALL_PATHS: TechnicalPath[] = [...TECHNICAL_PATHS, ...SALES_ENABLEMENT_TRACKS];

export const DEFAULT_TECHNICAL_PATH_ID = "ai-developer";

export interface CatalogCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "technical" | "sales";
  tags: string[];
  /** TechnicalPath ids that include this course as curriculum. Empty for freestanding courses. */
  pathIds: string[];
  /** Optional, freestanding — a course can be both required path curriculum and a browsable elective. */
  elective?: boolean;
  /** Where this course actually lives on community.vantiq.com — the source of truth for the link. Sales enablement decks have none. */
  liveUrl?: string;
  /** Status the live course page shows in its own title (e.g. "Introduction to Generative AI Applications – Deprecated"). */
  liveStatus?: "Deprecated" | "Draft";
  /** Restricts visibility to these roles only. Omit to show to every role that can already see the surrounding track/catalog. */
  roles?: Role[];
}

// The only courses a Guest can actually register for — everything else in
// the catalog is browsable but locked behind "Upgrade from Guest Access."
export const FOUNDATION_COURSE_IDS = ["applications-developer-level-1", "the-via-and-kb-mcp-servers"];

// Single source of truth for every course — both the standalone Courses catalog
// (/academy/courses) and the five Technical Paths' curricula (below, via
// PathModule.courseId) draw from this same list, so a course only ever exists once.
export const COURSE_CATALOG: CatalogCourse[] = [
  // --- Freestanding catalog courses — not tied to a specific Technical Path ---

  // --- Sales Enablement tracks (Sales Foundations, Advanced Sales, Advanced
  // Pre-Sales), plus the standalone Electives — one entry per real deck in
  // OneDrive_1_8-12-2026, in file order. Titles are cleaned-up filenames;
  // descriptions are the module's own subtitle line, taken verbatim from
  // each deck's title slide.
  {
    id: "ai-foundations",
    title: "AI Foundations",
    description:
      "What every customer-facing Vantiq person needs to know about AI in 2026: the market, the vocabulary, the limits, and the language that survives a technical evaluation.",
    duration: "30m",
    level: "Beginner",
    category: "sales",
    tags: ["Sales-Enablement", "AI-Fluency"],
    pathIds: ["sales-foundations"],
  },
  {
    id: "what-is-vantiq",
    title: "What Is Vantiq",
    description:
      "A platform for building and, above all, running real-time applications that coordinate events, data, AI, people, devices, and enterprise systems in live operations.",
    duration: "30m",
    level: "Beginner",
    category: "sales",
    tags: ["Sales-Enablement", "AI-Fluency"],
    pathIds: ["sales-foundations"],
  },
  {
    id: "orchestration-transformation-enabler",
    title: "Orchestration as a Business Outcome Enabler",
    description:
      "Why coordination, rather than detection or data or models, is the constraint on operations that can't wait and can't fail, and how a seller ties it to a number an executive already owns.",
    duration: "30m",
    level: "Beginner",
    category: "sales",
    tags: ["Sales-Enablement", "AI-Fluency"],
    pathIds: ["sales-foundations"],
  },
  {
    id: "pitching-value-and-business-impact",
    title: "Pitching Value and Business Impact",
    description:
      "How to move a conversation from what Vantiq can do to the operational number a buyer already owns, and how to size that number without pretending to a precision you do not have.",
    duration: "30m",
    level: "Beginner",
    category: "sales",
    tags: ["Sales-Enablement", "AI-Fluency"],
    pathIds: ["sales-foundations"],
  },
  {
    id: "vantiq-elevator-pitch-exercise",
    title: "Exercise: The Vantiq Elevator Pitch",
    description:
      "A workshop, not a lecture — deliver the Vantiq pitch twice, score each other against six checks, and leave able to do it cold in front of someone who has never heard of us.",
    duration: "25m",
    level: "Beginner",
    category: "sales",
    tags: ["Sales-Enablement", "AI-Fluency"],
    pathIds: ["sales-foundations"],
  },
  {
    id: "industry-use-cases",
    title: "Industry Use Cases",
    description:
      "Healthcare, manufacturing, public safety, and physical AI look nothing alike from the outside — underneath, all four lose money the same way, and the same sales frame works in every room.",
    duration: "45m",
    level: "Intermediate",
    category: "sales",
    tags: ["Sales-Enablement", "Sales-Execution"],
    pathIds: ["advanced-sales"],
  },
  {
    id: "inside-vantiq-technical-deep-dive",
    title: "Inside Vantiq: A Technical Deep Dive",
    description:
      "Enough technical literacy to hold a credible conversation with an architect, ask the question that moves it forward, and recognize the moment to bring an SE in.",
    duration: "45m",
    level: "Intermediate",
    category: "sales",
    tags: ["Sales-Enablement", "Sales-Execution"],
    pathIds: ["advanced-sales"],
  },
  {
    id: "vantiq-competitive-landscape",
    title: "Vantiq Competitive Landscape",
    description:
      "How to place Vantiq in the enterprise stack, answer the competitors buyers now raise by name, and draw lines a technical evaluator will accept as fair.",
    duration: "30m",
    level: "Intermediate",
    category: "sales",
    tags: ["Sales-Enablement", "Sales-Execution"],
    pathIds: ["advanced-sales"],
  },
  {
    id: "running-the-deal-customer-engagement-playbook",
    title: "Running the Deal: Customer Engagement Playbook",
    description:
      "One playbook for the whole customer conversation — diagnose before you position, judge an opportunity on more than fit, answer resistance without overclaiming, and turn a first workflow into an account.",
    duration: "1h",
    level: "Intermediate",
    category: "sales",
    tags: ["Sales-Enablement", "Sales-Execution"],
    pathIds: ["advanced-sales"],
  },
  {
    id: "opportunity-qualification-exercise",
    title: "Exercise: Opportunity Qualification",
    description:
      "Four anonymized opportunities and no scorecard to hide behind — rank them, defend the ranking out loud, and say no to one of them properly.",
    duration: "30m",
    level: "Intermediate",
    category: "sales",
    tags: ["Sales-Enablement", "Sales-Execution"],
    pathIds: ["advanced-sales"],
  },
  {
    id: "partnership-strategy",
    title: "Partnership Strategy",
    description:
      "Vantiq sells seven-figure orchestration into hospitals, ministries, and national telcos with roughly sixty-five people — who delivers it, which partnerships are real, and how the sale changes when someone else leads.",
    duration: "35m",
    level: "Intermediate",
    category: "sales",
    tags: ["Sales-Enablement", "Sales-Execution"],
    pathIds: ["advanced-sales"],
    roles: ["employee"],
  },
  {
    id: "technical-differentiators",
    title: "Technical Differentiators",
    description:
      "How to compress ten platform differentiators into three arguments a technical evaluator will accept, draw every competitive line fairly, and qualify an opportunity before you commit engineering to a proof.",
    duration: "35m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Presales-Technical"],
    pathIds: ["advanced-presales"],
  },
  {
    id: "architecture-deep-dive",
    title: "Architecture Deep Dive",
    description:
      "How the Vantiq reference architecture turns an event into a coordinated response, and how you draw it, defend it, and qualify against it in a technical conversation.",
    duration: "30m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Presales-Technical"],
    pathIds: ["advanced-presales"],
  },
  {
    id: "technical-discovery",
    title: "Technical Discovery",
    description:
      "Technical discovery is not a requirements interview — it's a structured test of what must be true for this workflow to run safely, at speed, in the customer's real environment.",
    duration: "30m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Presales-Technical"],
    pathIds: ["advanced-presales"],
  },
  {
    id: "demo-and-proof-strategy",
    title: "Demo and Proof Strategy",
    description:
      "A demo shows what the product can do. A proof removes one named risk that is stopping this buyer from funding the next stage — knowing which one you are running is the whole job.",
    duration: "30m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Presales-Technical"],
    pathIds: ["advanced-presales"],
  },
  {
    id: "solution-design-and-ai-integration-strategy",
    title: "Solution Design and AI Integration Strategy",
    description:
      "Turning discovery into a runtime design an enterprise architect will believe, and deciding, decision by decision, where AI belongs and where it does not.",
    duration: "35m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Presales-Technical"],
    pathIds: ["advanced-presales"],
  },
  {
    id: "solution-development-and-deployment",
    title: "Solution Development and Deployment",
    description:
      "The phase where a good design either becomes a workflow the customer runs without you, or becomes another pilot that demonstrated well and quietly stopped.",
    duration: "35m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Presales-Technical"],
    pathIds: ["advanced-presales"],
  },
  {
    id: "vantiq-ai-fit-framework",
    title: "The Vantiq AI Fit Framework (Reference)",
    description:
      "A five-question filter for deciding whether an AI workload belongs on a real-time orchestration platform and, if it does, where in the loop it sits and what it is allowed to decide.",
    duration: "30m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Presales-Technical"],
    pathIds: ["advanced-presales"],
  },

  // --- Electives (OneDrive_1_8-12-2026/Electives) — freestanding, not tied
  // to a track, surfaced via the Courses Catalog's Electives filter. Same
  // treatment as the technical electives above.
  {
    id: "packaging-industry-solutions",
    title: "Packaging Industry Solutions",
    description:
      "Productizing a solution — how a bespoke build for one customer becomes a packaged, configurable industry solution that a partner can install for the next ten.",
    duration: "30m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Elective"],
    pathIds: [],
    elective: true,
  },
  {
    id: "ai-token-efficiency",
    title: "AI Token Efficiency",
    description:
      "Unit prices no longer fall reliably, agentic workloads consume a thousand times what a chat message does, and the largest saving available is the model call that never happens.",
    duration: "30m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Elective"],
    pathIds: [],
    elective: true,
  },
  {
    id: "solution-architecture-best-practices",
    title: "Solution Architecture Best Practices",
    description:
      "The judgement behind designs that survive production — what to optimize for, which patterns keep working, which keep failing, and how to catch an expensive problem while it is still cheap.",
    duration: "30m",
    level: "Advanced",
    category: "sales",
    tags: ["Sales-Enablement", "Elective"],
    pathIds: [],
    elective: true,
  },

  // --- Technical Path curriculum, promoted to real catalog courses ---
  {
    id: "applications-developer-level-1",
    title: "Applications Developer Foundations Course",
    description: "Platform orientation and core concepts every Vantiq partner needs before specializing.",
    duration: "Self-paced",
    level: "Beginner",
    category: "technical",
    tags: ["Foundations"],
    pathIds: ["ai-developer", "server-developer", "ui-developer", "architect", "administrator"],
    liveUrl: "https://community.vantiq.com/courses/applications-developer-level-1/",
  },
  {
    id: "the-via-and-kb-mcp-servers",
    title: "The VIA and KB MCP Servers",
    description: "Build alongside an AI Assistant using Vantiq's VIA and KB MCP servers for development and Q&A.",
    duration: "Self-paced",
    level: "Beginner",
    category: "technical",
    tags: ["Foundations", "AI"],
    pathIds: [],
    liveUrl: "https://community.vantiq.com/courses/the-via-and-kb-mcp-servers/",
    elective: true,
  },
  {
    id: "advanced-genai-applications",
    title: "GenAIBuilder",
    description: "Build advanced generative AI systems on the platform with the GenAI Builder tool.",
    duration: "4h",
    level: "Intermediate",
    category: "technical",
    tags: ["GenAI"],
    pathIds: ["ai-developer"],
    liveUrl: "https://community.vantiq.com/courses/advanced-genai-applications/",
    elective: true,
  },
  {
    id: "vantiq-version-control-system",
    title: "Version Control System",
    description: "Branching, versioning, and promoting Vantiq projects safely.",
    duration: "1h",
    level: "Beginner",
    category: "technical",
    tags: ["DevOps"],
    pathIds: ["ai-developer", "server-developer", "ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/vantiq-version-control-system/",
    elective: true,
  },
  {
    id: "vantiq-edge-2",
    title: "Vantiq Edge",
    description: "Running and managing Vantiq nodes at the edge.",
    duration: "2h 30m",
    level: "Intermediate",
    category: "technical",
    tags: ["Edge-Computing"],
    pathIds: ["server-developer"],
    liveUrl: "https://community.vantiq.com/courses/vantiq-edge-2/",
    elective: true,
  },
  {
    id: "1-34-vantiq-assemblies",
    title: "Assemblies",
    description: "Packaging reusable project components as installable assemblies.",
    duration: "2h",
    level: "Intermediate",
    category: "technical",
    tags: ["App-Builder"],
    pathIds: ["server-developer", "ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/1-34-vantiq-assemblies/",
    elective: true,
  },
  {
    id: "the-vantiq-catalog",
    title: "The Vantiq Catalog",
    description: "Discovering, publishing, and reusing packaged assemblies from the Vantiq Catalog.",
    duration: "1h",
    level: "Intermediate",
    category: "technical",
    tags: ["App-Builder"],
    pathIds: ["server-developer", "ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/the-vantiq-catalog/",
    elective: true,
  },
  {
    id: "app-components",
    title: "App & GenAI Components",
    description: "Composing app logic alongside GenAI components in the same project.",
    duration: "2h",
    level: "Intermediate",
    category: "technical",
    tags: ["GenAI", "App-Builder"],
    pathIds: ["ai-developer", "server-developer"],
    liveUrl: "https://community.vantiq.com/courses/app-components/",
    elective: true,
  },
  {
    id: "vail-rules",
    title: "VAIL Rules",
    description: "Authoring WHEN/DO rules that react to events in real time.",
    duration: "1h",
    level: "Intermediate",
    category: "technical",
    tags: ["VAIL"],
    pathIds: ["server-developer"],
    liveUrl: "https://community.vantiq.com/courses/vail-rules/",
    elective: true,
  },
  {
    id: "vail-dml",
    title: "VAIL DML",
    description: "Querying and manipulating Vantiq data with VAIL's data manipulation language.",
    duration: "1h",
    level: "Intermediate",
    category: "technical",
    tags: ["VAIL"],
    pathIds: ["server-developer"],
    liveUrl: "https://community.vantiq.com/courses/vail-dml/",
    elective: true,
  },
  {
    id: "vantiq-integration",
    title: "Integration",
    description: "Connecting Vantiq to external systems and APIs.",
    duration: "3h",
    level: "Intermediate",
    category: "technical",
    tags: ["REST", "App-Builder"],
    pathIds: ["server-developer", "ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/vantiq-integration/",
    elective: true,
  },
  {
    id: "vail-procedures",
    title: "VAIL Procedures, Tools & Skills",
    description: "Encapsulating business logic in reusable VAIL procedures.",
    duration: "1h",
    level: "Intermediate",
    category: "technical",
    tags: ["VAIL"],
    pathIds: ["ai-developer", "server-developer"],
    liveUrl: "https://community.vantiq.com/courses/vail-procedures/",
    elective: true,
  },
  {
    id: "vantiqs-testing-tools",
    title: "Testing Tools",
    description: "Unit and integration testing strategies for Vantiq projects.",
    duration: "2h",
    level: "Intermediate",
    category: "technical",
    tags: ["DevOps", "Testing"],
    pathIds: ["server-developer"],
    liveUrl: "https://community.vantiq.com/courses/vantiqs-testing-tools/",
    elective: true,
  },
  {
    id: "distributed-deployment",
    title: "Distributed Deployment",
    description: "Partitioning project resources for deployment across multiple installations and environments.",
    duration: "2h",
    level: "Advanced",
    category: "technical",
    tags: ["DevOps", "Edge-Computing"],
    pathIds: ["server-developer"],
    liveUrl: "https://community.vantiq.com/courses/distributed-deployment/",
    elective: true,
  },
  {
    id: "client-developer-best-practices",
    title: "Client Developer Best Practices",
    description: "Patterns for building maintainable, performant Vantiq clients.",
    duration: "1h",
    level: "Intermediate",
    category: "technical",
    tags: ["UI"],
    pathIds: ["ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/client-developer-best-practices/",
    elective: true,
  },
  {
    id: "launchable-clients",
    title: "Launchable Clients",
    description: "Packaging and launching client applications for end users.",
    duration: "2h",
    level: "Intermediate",
    category: "technical",
    tags: ["UI"],
    pathIds: ["ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/launchable-clients/",
    elective: true,
  },
  {
    id: "client-layouts-templates-components",
    title: "Client Layouts, Templates & Components",
    description: "Composing layouts from reusable templates and components.",
    duration: "4h",
    level: "Intermediate",
    category: "technical",
    tags: ["UI"],
    pathIds: ["ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/client-layouts-templates-components/",
    elective: true,
  },
  {
    id: "system-modeler-2",
    title: "System Model",
    description: "Visually designing and validating a Vantiq system's structure.",
    duration: "1h",
    level: "Intermediate",
    category: "technical",
    tags: ["Architecture"],
    pathIds: ["architect"],
    liveUrl: "https://community.vantiq.com/courses/system-modeler-2/",
    elective: true,
  },
  {
    id: "server-developer-best-practices",
    title: "Server Developer Best Practices",
    description:
      "Performance and scalability don't have one right answer — weigh the trade-offs between approaches and choose what fits your project's business requirements.",
    duration: "30m",
    level: "Intermediate",
    category: "technical",
    tags: ["Architecture", "DevOps"],
    pathIds: ["server-developer", "architect"],
    liveUrl: "https://community.vantiq.com/courses/server-developer-best-practices/",
    elective: true,
  },
  {
    id: "organization-namespace-administration",
    title: "Organization & Namespace Administration",
    description: "The duties and platform tools for Org- and Namespace-level administrators.",
    duration: "2h",
    level: "Intermediate",
    category: "technical",
    tags: ["Admin"],
    pathIds: ["administrator"],
    liveUrl: "https://community.vantiq.com/courses/organization-namespace-administration/",
    elective: true,
  },
  {
    id: "vantiq-command-line-interface-2",
    title: "Vantiq Command Line Interface",
    description: "A terminal-based tool for shell scripts that perform basic Vantiq maintenance tasks.",
    duration: "1h",
    level: "Intermediate",
    category: "technical",
    tags: ["Admin", "DevOps"],
    pathIds: ["administrator"],
    liveUrl: "https://community.vantiq.com/courses/vantiq-command-line-interface-2/",
    elective: true,
  },
  {
    id: "vantiq-system-administration",
    title: "System Administration",
    description: "Monitoring cluster health and administering Orgs, Org Admins, and resource quotas.",
    duration: "2h",
    level: "Intermediate",
    category: "technical",
    tags: ["Admin"],
    pathIds: ["administrator"],
    liveUrl: "https://community.vantiq.com/courses/vantiq-system-administration/",
    elective: true,
  },
  {
    id: "vantiq-deployment-system-administration",
    title: "Vantiq Server Deployment",
    description: "Installing the Vantiq server and related software onto cloud infrastructure.",
    duration: "1h",
    level: "Advanced",
    category: "technical",
    tags: ["Admin", "DevOps"],
    pathIds: ["administrator"],
    liveUrl: "https://community.vantiq.com/courses/vantiq-deployment-system-administration/",
    elective: true,
  },

  // --- New electives, browsable in the catalog only (not tied to a required path) ---
  {
    id: "ai-in-event-driven-applications",
    title: "AI in Event-Driven Applications",
    description: "How generative and agentic AI components plug into VAIL's event/rule model.",
    duration: "2h",
    level: "Intermediate",
    category: "technical",
    tags: ["GenAI", "VAIL"],
    pathIds: ["server-developer"],
    liveUrl: "https://community.vantiq.com/courses/ai-in-event-driven-applications/",
    liveStatus: "Draft",
  },
  {
    id: "ai-multi-agent-architecture",
    title: "AI Multi-Agent Architecture",
    description: "Design patterns for coordinating multiple AI agents across a Vantiq application.",
    duration: "5h",
    level: "Advanced",
    category: "technical",
    tags: ["GenAI", "Multi-Agent"],
    pathIds: ["ai-developer"],
    liveUrl: "https://community.vantiq.com/courses/ai-multi-agent-architecture/",
    elective: true,
  },
  {
    id: "visual-event-handler-ai-features",
    title: "Visual Event Handler AI Features",
    description: "Add AI capabilities and Collaboration conversation management to Service Visual Event Handlers.",
    duration: "3h",
    level: "Intermediate",
    category: "technical",
    tags: ["GenAI", "App-Builder"],
    pathIds: ["ai-developer"],
    liveUrl: "https://community.vantiq.com/courses/visual-event-handler-ai-features/",
    elective: true,
  },
  {
    id: "dynamic-client-content",
    title: "Dynamic Client Content",
    description: "Driving client screens and components from live, server-side data.",
    duration: "4h",
    level: "Intermediate",
    category: "technical",
    tags: ["UI", "App-Builder"],
    pathIds: ["ui-developer"],
    liveUrl: "https://community.vantiq.com/courses/dynamic-client-content/",
    elective: true,
  },
  {
    id: "vail-ai",
    title: "VAIL AI",
    description: "Make the AI in your projects more flexible, autonomous, and informed with the built-in Service features of VAIL.",
    duration: "6h",
    level: "Intermediate",
    category: "technical",
    tags: ["VAIL", "GenAI"],
    pathIds: ["ai-developer"],
    liveUrl: "https://community.vantiq.com/courses/vail-ai/",
    elective: true,
  },
];

export function getCourseById(id: string): CatalogCourse | undefined {
  return COURSE_CATALOG.find((c) => c.id === id);
}

// The 21 real sales-enablement decks (OneDrive_1_8-12-2026) — every module in
// the three tracks above, plus the three Electives. Each of these plays a
// deck recording on its course page instead of the generic step-outline
// placeholder (see course-detail-client.tsx).
export const SALES_DECK_COURSE_IDS = new Set<string>([
  ...SALES_FOUNDATIONS_TRACK.modules.map((m) => m.courseId),
  ...ADVANCED_SALES_TRACK.modules.map((m) => m.courseId),
  ...ADVANCED_PRESALES_TRACK.modules.map((m) => m.courseId),
  "packaging-industry-solutions",
  "ai-token-efficiency",
  "solution-architecture-best-practices",
]);

export const ARCHITECTURE_TIERS = [
  {
    id: "sources",
    label: "Sources",
    detail: "Edge Devices, Smart Cameras",
    protocols: "MQTT, RTSP, OPC-UA",
    throughput: "10K events/sec",
    latency: "< 5ms",
  },
  {
    id: "edge",
    label: "Edge Compute",
    detail: "Vantiq Edge Node",
    protocols: "gRPC, WebSocket",
    throughput: "50K events/sec",
    latency: "< 20ms",
  },
  {
    id: "cloud",
    label: "Cloud Compute",
    detail: "Vantiq Cloud Cluster",
    protocols: "Kafka, REST, GraphQL",
    throughput: "1M+ events/sec",
    latency: "< 100ms",
  },
  {
    id: "actions",
    label: "Operational Actions",
    detail: "GenAI Models, Physical Systems",
    protocols: "REST, MQTT, OPC-UA",
    throughput: "10K actions/sec",
    latency: "< 200ms",
  },
];

export const FEATURED_ARCHITECTURES = [
  { title: "Distributed GenAI Reasoning", description: "Multi-region LLM orchestration with local fallback models." },
  { title: "Secure SCADA Monitoring", description: "OPC-UA ingestion with role-based operational action gating." },
  { title: "Kafka Telemetry Fan-Out", description: "Single edge event replicated across downstream analytics topics." },
  { title: "Spatial AI Multi-Camera Sync", description: "Cross-camera object tracking with unified spatial indexing." },
];

// Admin dashboard (Vantiq Admin role) — ecosystem-wide analytics, deal/content
// oversight, and the portal-wide activity log. Dates are relative to "today"
// (2026-07-24) so the log reads as a live, rolling feed.

export const PLATFORM_ANALYTICS = {
  monthlyActiveUsers: 4812,
  weeklyActiveUsers: 1904,
  dailyActiveUsers: 412,
  searchSuccessRate: 74,
};

export const FREQUENTLY_VISITED_PAGES = [
  { page: "Knowledge Base", visits30d: 18204, avgTime: "4m 10s" },
  { page: "Q&A Forum", visits30d: 12880, avgTime: "6m 40s" },
  { page: "Academy", visits30d: 9415, avgTime: "11m 05s" },
  { page: "Sales Center", visits30d: 6022, avgTime: "5m 30s" },
  { page: "Code Recipes", visits30d: 5190, avgTime: "3m 50s" },
];

export const LEARNING_ENABLEMENT = [
  { label: "Registered for courses", value: 612 },
  { label: "Completed courses", value: 355 },
  { label: "Certified users", value: 241 },
  { label: "Deals registered", value: 318 },
  { label: "Feedback received", value: 58 },
  { label: "Avg. time on platform", value: "14m / session" },
];

export const PARTNER_OUTREACH = [
  { org: "Softura", lastContact: "Today", contacts7d: 3, primaryTopic: "Certification renewal" },
  { org: "Wipro Mfg", lastContact: "2 days ago", contacts7d: 1, primaryTopic: "Stalled certification" },
  { org: "Capgemini", lastContact: "9 days ago", contacts7d: 0, primaryTopic: "Re-engagement" },
  { org: "NTT Data", lastContact: "Yesterday", contacts7d: 2, primaryTopic: "Deal support" },
];

export const HELP_REQUESTS_BY_TOPIC = [
  { topic: "Edge deployment issues", count: 22 },
  { topic: "Certification / exam access", count: 16 },
  { topic: "API & connector errors", count: 11 },
  { topic: "Billing & account", count: 6 },
  { topic: "Deal registration", count: 3 },
];

export const COMMUNITY_CONTRIBUTION_BY_USER = [
  { user: "Radenta Tech (RJ)", org: "Radenta Tech", discussionsCreated: 14, eventRsvps: 5 },
  { user: "SoftServe (S)", org: "SoftServe", discussionsCreated: 9, eventRsvps: 3 },
  { user: "NTT Data (NT)", org: "NTT Data", discussionsCreated: 6, eventRsvps: 4 },
  { user: "Alex Chen (AC)", org: "Softura", discussionsCreated: 2, eventRsvps: 2 },
];

export type ActivityKind = "Deal Registered" | "Content Added";

export interface ActivityLogEntry {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  actor: string;
  source: "Vantiq" | "Partner";
  date: string;
}

// Single source of truth for "what's new in the portal" — the Recently Added
// Content admin section filters this same log by kind, and the Portal
// Activity Log renders it in full, so nothing new can enter the portal
// without also showing up here.
export const ACTIVITY_LOG: ActivityLogEntry[] = [
  {
    id: "act-2",
    kind: "Content Added",
    title: "How do I configure an MQTT source with TLS?",
    detail: "New Q&A Forum thread",
    actor: "Radenta Tech",
    source: "Partner",
    date: "2026-07-24",
  },
  {
    id: "act-3",
    kind: "Content Added",
    title: "AI Multi-Agent Architecture",
    detail: "New course published to the AI Developer path",
    actor: "Vantiq",
    source: "Vantiq",
    date: "2026-07-23",
  },
  {
    id: "act-4",
    kind: "Content Added",
    title: "Best pattern for fanning telemetry out to multiple Kafka topics",
    detail: "New Q&A Forum thread",
    actor: "NTT Data",
    source: "Partner",
    date: "2026-07-23",
  },
  {
    id: "act-6",
    kind: "Content Added",
    title: "Federated AI vs. Cloud AI",
    detail: "New technical whitepaper uploaded to Resources",
    actor: "Vantiq",
    source: "Vantiq",
    date: "2026-07-22",
  },
  {
    id: "act-8",
    kind: "Content Added",
    title: "Security & Authentication Guide",
    detail: "Developer Center documentation updated",
    actor: "Vantiq",
    source: "Vantiq",
    date: "2026-07-20",
  },
  {
    id: "act-9",
    kind: "Deal Registered",
    title: "Vertex Energy — Grid load-balancing automation",
    detail: "New deal entered Discovery stage",
    actor: "Infosys Cloud",
    source: "Partner",
    date: "2026-07-19",
  },
  {
    id: "act-11",
    kind: "Content Added",
    title: "VAIL rule firing twice on the same event",
    detail: "New Q&A Forum thread",
    actor: "SoftServe",
    source: "Partner",
    date: "2026-07-18",
  },
  {
    id: "act-12",
    kind: "Deal Registered",
    title: "Harborview Health — Bed-availability event pipeline",
    detail: "New deal entered Discovery stage",
    actor: "Cognizant Tech",
    source: "Partner",
    date: "2026-07-17",
  },
];

export interface Announcement {
  title: string;
  description: string;
  time: string;
  date: string;
  isEvent?: boolean;
}

const UPCOMING_EVENT: Announcement = {
  title: "Partner Field Day: Edge AI",
  description: "Live workshop and networking for certified partners.",
  time: "Jul 29",
  date: "2026-07-29",
  isEvent: true,
};

export const ANNOUNCEMENTS: Announcement[] = [
  UPCOMING_EVENT,
  {
    title: "AI Knowledge Hub is Here",
    description: "Ask questions. Get answers with source attribution.",
    time: "2d ago",
    date: "2026-07-21",
  },
  {
    title: "Partner Office Hours",
    description: "Join our live session on best practices and Q&A.",
    time: "Jul 21",
    date: "2026-07-21",
  },
  {
    title: "New Course: VAIL AI",
    description: "Calling AI models and services directly from VAIL rules and procedures.",
    time: "Jul 25",
    date: "2026-07-25",
  },
  {
    title: "Release 1.40 is Live",
    description: "Native GenAI orchestration on the Edge.",
    time: "Jul 18",
    date: "2026-07-18",
  },
  {
    title: "Extension Sources Guide is Live",
    description: "Enterprise Connectors and the SDK for building your own, now on Resources.",
    time: "Aug 1",
    date: "2026-08-01",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
