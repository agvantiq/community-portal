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

export interface CommunityEvent {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  location: string;
  type: EventType;
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
  { id: "e1", title: "Edge AI Office Hours", date: "2026-07-08", time: "11:00 AM", location: "Virtual", type: "Office Hours" },
  { id: "e2", title: "VAIL Deep Dive Workshop", date: "2026-07-15", time: "2:00 PM", location: "Virtual", type: "Workshop" },
  { id: "e3", title: "Community Office Hours", date: "2026-07-22", time: "11:00 AM", location: "Virtual", type: "Office Hours" },
  { id: "e4", title: "Partner Networking Mixer", date: "2026-07-24", time: "4:00 PM", location: "Virtual", type: "Networking" },
  { id: "e5", title: "Partner Field Day: Edge AI", date: "2026-07-29", time: "10:00 AM", location: "Virtual", type: "Workshop" },
  { id: "e6", title: "GenAI Orchestration Webinar", date: "2026-08-05", time: "1:00 PM", location: "Virtual", type: "Webinar" },
  { id: "e7", title: "Vantiq Certified Partner Summit", date: "2026-08-12", time: "9:00 AM", location: "Austin, TX", type: "Summit" },
  { id: "e8", title: "AMA: Solutions Architects", date: "2026-08-19", time: "12:00 PM", location: "Virtual", type: "Webinar" },
  { id: "e9", title: "Community Showcase Demo Day", date: "2026-08-26", time: "3:00 PM", location: "Virtual", type: "Networking" },
];
