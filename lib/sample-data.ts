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

export interface ResourceFile {
  title: string;
  type: "pdf" | "deck" | "doc";
}

export const RESOURCE_FOLDERS: { label: string; files: ResourceFile[] }[] = [
  {
    label: "Analyst Reports",
    files: [
      { title: "Gartner Magic Quadrant 2026", type: "pdf" },
      { title: "Forrester Wave: Real-Time Platforms", type: "pdf" },
    ],
  },
  {
    label: "Customer Use Cases",
    files: [
      { title: "Smart City Implementation Deck", type: "deck" },
      { title: "Healthcare Supply Chain Case Study", type: "pdf" },
    ],
  },
  {
    label: "Product & Pricing",
    files: [{ title: "2026 Price List (Partners)", type: "doc" }],
  },
  {
    label: "Technical Whitepapers",
    files: [
      { title: "State Management at the Edge", type: "pdf" },
      { title: "Scaling to 10M Events per Second", type: "pdf" },
      { title: "Federated AI vs. Cloud AI", type: "pdf" },
    ],
  },
];
