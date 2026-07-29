// Community Dashboard data — the current user's community profile, earned badges,
// and the events feed that powers the visual calendar. Kept separate from
// sample-data.ts so the community surface owns its own mock content.

import {
  Award,
  Star,
  Flame,
  MessageCircle,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// Stats that aren't derivable from the role (points, level, tenure, tab counts).
// Name and organization come from the active role at render time.
export const COMMUNITY_PROFILE = {
  level: 4,
  levelName: "Collaborator",
  points: 46,
  pointsToLevelUp: 34,
  memberSince: "March 23, 2023",
  handle: "james.b",
  activityScore: "N/A",
  tags: ["Balance team"],
  counts: {
    posts: 18,
    comments: 6,
    spaces: 14,
  },
};

export interface CommunityBadge {
  id: string;
  label: string;
  icon: LucideIcon;
  tint: string; // token-based tint classes
}

// The purple marks in the reference each stand for a distinct earned badge.
export const COMMUNITY_BADGES: CommunityBadge[] = [
  { id: "top-contributor", label: "Top Contributor", icon: Award, tint: "bg-emphasis/10 text-emphasis" },
  { id: "first-answer", label: "First Answer", icon: MessageCircle, tint: "bg-info/10 text-info" },
  { id: "mentor", label: "Mentor", icon: ShieldCheck, tint: "bg-primary/10 text-primary" },
  { id: "streak", label: "30-Day Streak", icon: Flame, tint: "bg-warning/10 text-warning" },
  { id: "launch", label: "Shipped a Project", icon: Rocket, tint: "bg-success/10 text-success" },
  { id: "rising-star", label: "Rising Star", icon: Star, tint: "bg-emphasis/10 text-emphasis" },
];

export type EventType = "Office Hours" | "Workshop" | "Webinar" | "Summit" | "Networking";

export interface EventRecording {
  url: string;
  durationMinutes: number;
}

export interface EventAttendee {
  name: string;
  org: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  location: string;
  type: EventType;
  description: string;
  // Populated only once an event is in the past — the recap a partner can refer back to.
  recording?: EventRecording;
  notes?: string;
  attendees?: EventAttendee[];
  attendeeCount?: number;
}

export type EventTopicCategory =
  | "Project Examples"
  | "New Releases"
  | "Reusable Assets & Demos"
  | "How-To's"
  | "Other";

/** Marketing-authored monthly theme for the Technical Partner track — independent of
 * any single event, since a month's theme may span zero, one, or several sessions. */
export interface TopicOfTheMonth {
  month: string; // "yyyy-mm"
  category: EventTopicCategory;
  title: string;
  summary: string;
  details?: string;
  relatedEventId?: string;
}

// Dot/pill color per event type — each maps to a semantic design token.
export const EVENT_TYPE_STYLE: Record<EventType, { dot: string; chip: string }> = {
  "Office Hours": { dot: "bg-info", chip: "bg-info/10 text-info" },
  Workshop: { dot: "bg-primary", chip: "bg-primary/10 text-primary" },
  Webinar: { dot: "bg-emphasis", chip: "bg-emphasis/10 text-emphasis" },
  Summit: { dot: "bg-warning", chip: "bg-warning/10 text-warning" },
  Networking: { dot: "bg-success", chip: "bg-success/10 text-success" },
};

export const EVENT_TYPES = Object.keys(EVENT_TYPE_STYLE) as EventType[];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "e1",
    title: "Edge AI Office Hours",
    date: "2026-07-08",
    time: "11:00 AM",
    location: "Virtual",
    type: "Office Hours",
    description: "Drop-in Q&A with the edge AI team — bring a deployment question or come listen in.",
    recording: { url: "https://vantiq.example/recordings/e1-edge-ai-office-hours", durationMinutes: 52 },
    notes:
      "Covered inference batching on constrained hardware, and a walkthrough of the new edge model registry. No blockers reported by attendees.",
    attendeeCount: 34,
    attendees: [
      { name: "Derek Osei", org: "NTT Data" },
      { name: "Lucia Fernandez", org: "SoftServe" },
      { name: "Ravi Patel", org: "Radenta Tech" },
    ],
  },
  {
    id: "e2",
    title: "VAIL Deep Dive Workshop",
    date: "2026-07-15",
    time: "2:00 PM",
    location: "Virtual",
    type: "Workshop",
    description: "Hands-on session on VAIL rules, procedures, and event orchestration patterns.",
    recording: { url: "https://vantiq.example/recordings/e2-vail-deep-dive", durationMinutes: 78 },
    notes:
      "Live-coded a WHEN/DO rule from scratch, then refactored it into a procedure. Slides and sample project posted in Knowledge Base.",
    attendeeCount: 61,
    attendees: [
      { name: "Naomi Wallace", org: "Wipro Mfg" },
      { name: "Tomás Ibarra", org: "SoftServe" },
      { name: "Grace Kim", org: "TCS Solutions" },
      { name: "Ethan Brooks", org: "Cognizant Tech" },
    ],
  },
  {
    id: "e3",
    title: "Community Office Hours",
    date: "2026-07-22",
    time: "11:00 AM",
    location: "Virtual",
    type: "Office Hours",
    description: "General open office hours for anything portal, program, or platform related.",
    recording: { url: "https://vantiq.example/recordings/e3-community-office-hours", durationMinutes: 45 },
    notes: "Mostly certification-timeline questions this week — recap posted to the Q&A forum.",
    attendeeCount: 28,
    attendees: [
      { name: "Aisha Bello", org: "Infosys Cloud" },
      { name: "Noah Kessler", org: "DXC Tech" },
    ],
  },
  {
    id: "e4",
    title: "Partner Networking Mixer",
    date: "2026-07-24",
    time: "4:00 PM",
    location: "Virtual",
    type: "Networking",
    description: "Informal virtual meetup for partners to connect across orgs — no agenda, just conversation.",
    // Intentionally no recording — informal networking sessions aren't recorded.
    notes: "Good turnout across five partner orgs. A few teams are following up directly on joint pitches.",
    attendeeCount: 22,
    attendees: [
      { name: "Priya Deshmukh", org: "Capgemini" },
      { name: "Liam O'Connell", org: "Radenta Tech" },
      { name: "Sofia Marchetti", org: "SoftServe" },
    ],
  },
  {
    id: "e5",
    title: "Partner Field Day: Edge AI",
    date: "2026-07-29",
    time: "10:00 AM",
    location: "Virtual",
    type: "Workshop",
    description:
      "This month's Topic of the Month session — partners present real edge AI projects shipped on Vantiq, architecture and all.",
  },
  {
    id: "e6",
    title: "GenAI Orchestration Webinar",
    date: "2026-08-05",
    time: "1:00 PM",
    location: "Virtual",
    type: "Webinar",
    description:
      "This month's Topic of the Month session — a walkthrough of the latest multi-agent orchestration release with live Q&A.",
  },
  {
    id: "e7",
    title: "Vantiq Certified Partner Summit",
    date: "2026-08-12",
    time: "9:00 AM",
    location: "Austin, TX",
    type: "Summit",
    description: "The flagship in-person partner summit — keynotes, certification ceremonies, and roadmap sessions.",
  },
  {
    id: "e8",
    title: "AMA: Solutions Architects",
    date: "2026-08-19",
    time: "12:00 PM",
    location: "Virtual",
    type: "Webinar",
    description: "Ask Vantiq's solutions architects anything — architecture reviews, best practices, war stories.",
  },
  {
    id: "e9",
    title: "Community Showcase Demo Day",
    date: "2026-08-26",
    time: "3:00 PM",
    location: "Virtual",
    type: "Networking",
    description: "Partners demo what they've built this quarter — Community Showcase entries get first pick of slots.",
  },
];

export const COMMUNITY_TOPICS_OF_THE_MONTH: TopicOfTheMonth[] = [
  {
    month: "2026-07",
    category: "Project Examples",
    title: "Real-World Edge AI Deployments",
    summary:
      "A look at how partners are shipping edge AI in production — architectures, pitfalls, and results.",
    details:
      "This month we're spotlighting real partner projects built on Vantiq's edge AI stack: what shipped, what broke, and what the teams would do differently. Bring your own project to Partner Field Day if you want it featured.",
    relatedEventId: "e5",
  },
  {
    month: "2026-08",
    category: "New Releases",
    title: "What's New in GenAI Orchestration",
    summary:
      "Walking through the latest multi-agent orchestration features and how to start using them today.",
    details:
      "Marketing and Product are teaming up for a deep dive into this quarter's GenAI orchestration release — new APIs, migration notes, and a live Q&A.",
    relatedEventId: "e6",
  },
];

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function isPastEvent(event: CommunityEvent, referenceDate: Date = new Date()): boolean {
  return event.date < toDateKey(referenceDate);
}

/** Sorted soonest first. */
export function getUpcomingEvents(referenceDate: Date = new Date()): CommunityEvent[] {
  return COMMUNITY_EVENTS.filter((e) => !isPastEvent(e, referenceDate)).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

/** Sorted most recent first. */
export function getPastEvents(referenceDate: Date = new Date()): CommunityEvent[] {
  return COMMUNITY_EVENTS.filter((e) => isPastEvent(e, referenceDate)).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getCurrentTopicOfMonth(referenceDate: Date = new Date()): TopicOfTheMonth | undefined {
  const month = `${referenceDate.getFullYear()}-${String(referenceDate.getMonth() + 1).padStart(2, "0")}`;
  return COMMUNITY_TOPICS_OF_THE_MONTH.find((t) => t.month === month);
}
