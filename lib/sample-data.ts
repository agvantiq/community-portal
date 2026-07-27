// Shared mock content for the community portal prototype pages.
// Partner org roster and deal names are carried over from the earlier prototype
// (Community Portal - updated/) so forum authors, deal owners, and showcase
// contributors read as one consistent fictional ecosystem rather than random filler.

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
    author: "Radenta Tech",
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
    author: "SoftServe",
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
    author: "NTT Data",
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
    author: "Cognizant Tech",
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
    author: "Wipro Mfg",
    votes: 14,
    answers: 2,
    accepted: false,
    timeAgo: "2d ago",
  },
];

export const TOP_CONTRIBUTORS = [
  { org: "Radenta Tech", points: 450 },
  { org: "SoftServe", points: 320 },
  { org: "Cognizant Tech", points: 285 },
];

export interface CourseModule {
  title: string;
  status: "done" | "current" | "locked";
  progress?: number;
}

// Source: Vantiq Partner Program deck, "The 90-Day Sprint" (Sales Enablement Track, slide 7)
// and "The 90-Day Sprint" (Technical Enablement Track, slide 8). Both tracks run the same
// four-phase cadence, so they share the RoadmapStepper component with different content.
export interface SprintPhase {
  id: string;
  label: string;
  timeframe: string;
  status: "done" | "current" | "locked";
  tasks: string[];
}

export const SALES_SPRINT: SprintPhase[] = [
  {
    id: "foundation",
    label: "Foundation & Onboarding",
    timeframe: "Week 1-2",
    status: "done",
    tasks: [
      "Register on Vantiq Community Portal & access partner tools",
      "Complete on-demand sales essentials training",
      "In-person kickoff for joint planning & alignment",
      "Shadowed discovery calls with Vantiq experts",
    ],
  },
  {
    id: "gtm-alignment",
    label: "AOP & GTM Alignment",
    timeframe: "Week 3-4",
    status: "current",
    tasks: [
      "1-Day Ideation and Solutioning Workshop",
      "Targeted solution ideation & use-case selection",
      "Develop joint Go-To-Market (GTM) plan",
      "Establish joint value proposition & messaging",
    ],
  },
  {
    id: "demand-gen",
    label: "Demand Gen & Pipeline",
    timeframe: "Week 5+",
    status: "locked",
    tasks: [
      'Launch "First Look" campaign (Webinar / Email / AI Summit)',
      "Define standard POV (Proof of Value) Framework",
      "Execute targeted account mapping session",
      "Roadshow and Events",
    ],
  },
  {
    id: "scaling",
    label: "Scaling & Autonomy",
    timeframe: "By Month 3",
    status: "locked",
    tasks: [
      "Official Joint Solution Launch to market",
      "First customer case study / success story",
      "Partner leads sales cycle with Vantiq support",
      "Quarterly Business Review (QBR) & next 90-day plan",
    ],
  },
];

export const TECHNICAL_SPRINT: SprintPhase[] = [
  {
    id: "foundations",
    label: "Foundations & Basics",
    timeframe: "Week 1-2",
    status: "done",
    tasks: [
      "Complete Vantiq Foundations course",
      "Complete assigned supplemental electives",
      "Complete labs/tutorials to gain basic platform visibility",
      "Setup developer environment & access",
    ],
  },
  {
    id: "coaching",
    label: "Coaching & Shadow",
    timeframe: "Week 3-6",
    status: "current",
    tasks: [
      "Weekly Office Hours: 90 min expert-led HOL sessions",
      "Apply training to simulated / real projects",
      "Partner takes lead on design (assisted)",
      "POC Build Confidence & Knowledge Transfer",
    ],
  },
  {
    id: "reverse-shadowing",
    label: "Reverse Shadowing",
    timeframe: "Week 7-11",
    status: "locked",
    tasks: [
      "Partner leads prototype design and development",
      "Vantiq provides validation and coaching",
      "Reference build for target use case",
      "Performance tuning & optimization",
    ],
  },
  {
    id: "assessment",
    label: "Assessment",
    timeframe: "Week 12",
    status: "locked",
    tasks: [
      "Structured rubric evaluation by Vantiq experts",
      "Project presentation & code review",
      "Final certification sign-off",
      "Individual level credentials awarded",
    ],
  },
];

// Source: "Role-Based Learning Pathways" (slide 5). All five tracks share the same two
// foundation courses before branching into role-specific modules.
const FOUNDATION_MODULES: CourseModule[] = [
  { title: "Technical Applications Developer Foundations", status: "done" },
  { title: "Vantiq Business Fundamentals", status: "done" },
];

export interface TechnicalPath {
  id: string;
  label: string;
  modules: CourseModule[];
}

export const TECHNICAL_PATHS: TechnicalPath[] = [
  {
    id: "ai-developer",
    label: "AI Developer",
    modules: [
      ...FOUNDATION_MODULES,
      { title: "Intro to GenAI Apps", status: "current", progress: 60 },
      { title: "Advanced GenAI Apps", status: "locked" },
      { title: "Multi-agent Orchestration", status: "locked" },
      { title: "Trust & Governance", status: "locked" },
    ],
  },
  {
    id: "server-developer",
    label: "Server Developer",
    modules: [
      ...FOUNDATION_MODULES,
      { title: "Vantiq on Edge", status: "locked" },
      { title: "Assemblies", status: "locked" },
      { title: "Vantiq Catalog", status: "locked" },
      { title: "App & GenAI Composition", status: "locked" },
    ],
  },
  {
    id: "ui-developer",
    label: "UI Developer",
    modules: [
      ...FOUNDATION_MODULES,
      { title: "Client Developer Best Practices", status: "locked" },
      { title: "Assemblies", status: "locked" },
      { title: "Vantiq Catalogue", status: "locked" },
      { title: "Launchable Clients", status: "locked" },
    ],
  },
  {
    id: "architect",
    label: "Architect",
    modules: [
      ...FOUNDATION_MODULES,
      { title: "Design Model", status: "locked" },
      { title: "System Modeler", status: "locked" },
      { title: "Server Dev Best Practices", status: "locked" },
      { title: "Software Development Lifecycle", status: "locked" },
    ],
  },
  {
    id: "administrator",
    label: "Administrator",
    modules: [
      ...FOUNDATION_MODULES,
      { title: "Namespace & Org Admin", status: "locked" },
      { title: "Vantiq CLI", status: "locked" },
      { title: "System Administration", status: "locked" },
      { title: "Vantiq Server Deployment", status: "locked" },
      { title: "Version Control System", status: "locked" },
    ],
  },
];

export const DEFAULT_TECHNICAL_PATH_ID = "ai-developer";

export interface CatalogCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

// Shared by the Academy page's inline preview and the standalone Courses
// catalog (/academy/courses) — one list so both stay in sync.
export const COURSES: { technical: CatalogCourse[]; sales: CatalogCourse[] } = {
  technical: [
    {
      id: "vail-fundamentals",
      title: "VAIL Fundamentals",
      description: "The syntax, event/rule model, and core building blocks of VAIL.",
      duration: "2h 30m",
      level: "Beginner",
    },
    {
      id: "edge-ai-architecture",
      title: "Edge AI Architecture Deep Dive",
      description: "Design real-time inference pipelines that run at the edge.",
      duration: "2h 15m",
      level: "Intermediate",
    },
    {
      id: "edge-deployment-patterns",
      title: "Edge Deployment Patterns",
      description: "Provisioning, promotion, and monitoring for edge nodes.",
      duration: "1h 45m",
      level: "Intermediate",
    },
    {
      id: "real-time-event-orchestration",
      title: "Real-Time Event Orchestration",
      description: "Fan events out across sources, rules, and downstream systems.",
      duration: "3h",
      level: "Advanced",
    },
    {
      id: "building-custom-connectors",
      title: "Building Custom Connectors",
      description: "Build and package a reusable extension source from scratch.",
      duration: "2h",
      level: "Intermediate",
    },
  ],
  sales: [
    {
      id: "vantiq-value-proposition",
      title: "Vantiq Value Proposition",
      description: "The core pitch — where Vantiq wins and why it matters.",
      duration: "1h",
      level: "Beginner",
    },
    {
      id: "discovery-call-playbook",
      title: "Discovery Call Playbook",
      description: "Questions that surface a real use case in the first call.",
      duration: "1h 30m",
      level: "Beginner",
    },
    {
      id: "competitive-positioning",
      title: "Competitive Positioning",
      description: "Where Vantiq stands against the platforms you'll be up against.",
      duration: "1h 15m",
      level: "Intermediate",
    },
    {
      id: "closing-enterprise-deals",
      title: "Closing Enterprise Deals",
      description: "Navigating procurement, security review, and multi-stakeholder signoff.",
      duration: "2h",
      level: "Advanced",
    },
  ],
};

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
  { user: "Radenta Tech (RJ)", org: "Radenta Tech", discussionsCreated: 14, eventRsvps: 5, leaderboardPts: 12450 },
  { user: "SoftServe (S)", org: "SoftServe", discussionsCreated: 9, eventRsvps: 3, leaderboardPts: 9820 },
  { user: "NTT Data (NT)", org: "NTT Data", discussionsCreated: 6, eventRsvps: 4, leaderboardPts: 8105 },
  { user: "Alex Chen (AC)", org: "Softura", discussionsCreated: 2, eventRsvps: 2, leaderboardPts: 3200 },
];

export type ActivityKind = "Deal Registered" | "Deal Teaming" | "Content Added";

export interface ActivityLogEntry {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  actor: string;
  source: "Vantiq" | "Partner";
  date: string;
}

// Single source of truth for "what's new in the portal" — the Deal Teaming and
// Recently Added Content admin sections each filter this same log by kind, and
// the Portal Activity Log renders it in full, so nothing new can enter the
// portal without also showing up here.
export const ACTIVITY_LOG: ActivityLogEntry[] = [
  {
    id: "act-1",
    kind: "Deal Teaming",
    title: "Domain expert requested for Harborview Health",
    detail: "Looking for a HIPAA compliance partner on the bed-availability event pipeline.",
    actor: "Cognizant Tech",
    source: "Partner",
    date: "2026-07-24",
  },
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
    title: "Multi-agent Orchestration",
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
    id: "act-5",
    kind: "Deal Teaming",
    title: "TCS Solutions requested a team-up on Aurora Dynamics",
    detail: "Looking for a hardware partner for the edge AI quality inspection build.",
    actor: "TCS Solutions",
    source: "Partner",
    date: "2026-07-22",
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
    id: "act-7",
    kind: "Content Added",
    title: "Edge AI Quality Inspection",
    detail: "New Community Showcase submission",
    actor: "TCS Solutions",
    source: "Partner",
    date: "2026-07-21",
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
    id: "act-10",
    kind: "Deal Teaming",
    title: "Radenta Tech matched with SoftServe on Northwind Manufacturing",
    detail: "Predictive maintenance for assembly lines — systems integrator team-up confirmed.",
    actor: "Radenta Tech",
    source: "Partner",
    date: "2026-07-18",
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

export interface ResourceFile {
  id: string;
  title: string;
  type: "pdf" | "deck" | "doc";
}

export const RESOURCE_FOLDERS: { label: string; files: ResourceFile[] }[] = [
  {
    label: "Analyst Reports",
    files: [
      { id: "gartner-magic-quadrant-2026", title: "Gartner Magic Quadrant 2026", type: "pdf" },
      { id: "forrester-wave-real-time-platforms", title: "Forrester Wave: Real-Time Platforms", type: "pdf" },
    ],
  },
  {
    label: "Customer Use Cases",
    files: [
      { id: "smart-city-implementation-deck", title: "Smart City Implementation Deck", type: "deck" },
      { id: "healthcare-solution-overview", title: "Healthcare Solution Overview", type: "pdf" },
    ],
  },
  {
    label: "Product & Pricing",
    files: [{ id: "2026-price-list-partners", title: "2026 Price List (Partners)", type: "doc" }],
  },
  {
    label: "Technical Whitepapers",
    files: [
      { id: "state-management-at-the-edge", title: "State Management at the Edge", type: "pdf" },
      { id: "scaling-to-10m-events-per-second", title: "Scaling to 10M Events per Second", type: "pdf" },
      { id: "federated-ai-vs-cloud-ai", title: "Federated AI vs. Cloud AI", type: "pdf" },
    ],
  },
];
