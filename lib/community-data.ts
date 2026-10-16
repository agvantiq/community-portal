import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Award, MessageCircle, ShieldCheck, Flame, Rocket, Star } from "lucide-react";

export interface CommunityLevel {
  number: number;
  name: string;
  minPoints: number;
}

// Reputation points, not the "50 / 25 / 10" bounty-style numbers on individual
// forum posts (lib/sample-data.ts FORUM_POSTS) — this is the cumulative,
// leaderboard-scale currency.
export const COMMUNITY_LEVELS: CommunityLevel[] = [
  { number: 1, name: "Newcomer", minPoints: 0 },
  { number: 2, name: "Contributor", minPoints: 500 },
  { number: 3, name: "Regular", minPoints: 1500 },
  { number: 4, name: "Collaborator", minPoints: 3000 },
  { number: 5, name: "Expert", minPoints: 4000 },
  { number: 6, name: "Champion", minPoints: 8000 },
];

export function resolveCommunityLevel(points: number): {
  level: CommunityLevel;
  next: CommunityLevel | null;
  pointsToNext: number | null;
} {
  let level = COMMUNITY_LEVELS[0];
  for (const l of COMMUNITY_LEVELS) {
    if (points >= l.minPoints) level = l;
  }
  const next = COMMUNITY_LEVELS.find((l) => l.minPoints > level.minPoints) ?? null;
  return { level, next, pointsToNext: next ? next.minPoints - points : null };
}

export interface CommunityBadgeInfo {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const COMMUNITY_BADGES: CommunityBadgeInfo[] = [
  { id: "top-contributor", label: "Top Contributor", icon: Award },
  { id: "first-answer", label: "First Answer", icon: MessageCircle },
  { id: "mentor", label: "Mentor", icon: ShieldCheck },
  { id: "streak-30", label: "30-Day Streak", icon: Flame },
  { id: "shipped-project", label: "Shipped a Project", icon: Rocket },
  { id: "rising-star", label: "Rising Star", icon: Star },
];

// The signed-in demo persona's own community stats. Name/org/handle derive
// from the active role (see useRole()) so switching roles stays consistent;
// these gamification numbers are static sample data like the rest of the
// portal's progress figures (there's no real backend — see PRODUCT.md).
export const MY_COMMUNITY_STATS = {
  points: 3200,
  activityScore: 78,
  memberSince: "March 23, 2023",
  postsCount: 18,
  commentsCount: 6,
  spacesCount: 14,
  badgeIds: ["top-contributor", "first-answer", "mentor", "streak-30", "shipped-project", "rising-star"],
};

// Contribution/role tags shown next to a forum commenter's name (see
// app/forum/[id]/forum-thread-client.tsx). "Vantiq Employee" marks internal
// Vantiq staff answering in the forum; "Vantiq Expert" marks a
// Vantiq-recognized community expert; "Top 10% Contributor" is a
// leaderboard-percentile designation. Distinct from "Accepted", which marks
// the answer the asker accepted, not the answerer.
export type ContributorTag = "Vantiq Employee" | "Vantiq Expert" | "Top 10% Contributor";

export const ORG_VISIBILITY_STORAGE_KEY = "community-portal-leaderboard-show-org";

/** Whether the signed-in persona shows their org on the public leaderboard — a per-user privacy preference, not tied to any one role. */
export function useOrgVisibility(): [boolean, (value: boolean) => void] {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(ORG_VISIBILITY_STORAGE_KEY);
    if (stored !== null) setVisible(stored === "true");
  }, []);

  const update = React.useCallback((value: boolean) => {
    setVisible(value);
    window.localStorage.setItem(ORG_VISIBILITY_STORAGE_KEY, String(value));
  }, []);

  return [visible, update];
}

export interface LeaderboardEntry {
  name: string;
  org: string;
  /** This entry's own preference — some partners keep their org private. */
  orgVisible: boolean;
  initials: string;
  points: number;
  weeklyPoints: number;
  comments: number;
  events: number;
}

// Person names match the forum's existing placeholder authors (see
// lib/sample-data.ts FORUM_POSTS and app/forum/[id]/forum-thread-client.tsx
// DEMO_COMMENTS) — a leaderboard ranks people, not companies — paired with
// org names already established elsewhere in the portal (PARTNER_OUTREACH /
// COMMUNITY_CONTRIBUTION_BY_USER), so both rosters read as one consistent
// fictional partner community. Guests never appear here — see
// resolveLeaderboard below, which excludes the "guest" role entirely.
export const LEADERBOARD: LeaderboardEntry[] = [
  { name: "Marek Kowalski", org: "Radenta Tech", orgVisible: true, initials: "MK", points: 12450, weeklyPoints: 450, comments: 14, events: 5 },
  { name: "Priya Nandakumar", org: "SoftServe", orgVisible: true, initials: "PN", points: 9820, weeklyPoints: 320, comments: 9, events: 3 },
  { name: "Haruto Tanaka", org: "Cognizant Tech", orgVisible: false, initials: "HT", points: 8105, weeklyPoints: 285, comments: 6, events: 4 },
  { name: "Daniela Ferreira", org: "NTT Data", orgVisible: true, initials: "DF", points: 6340, weeklyPoints: 210, comments: 5, events: 2 },
  { name: "Arjun Mehta", org: "Wipro Mfg", orgVisible: true, initials: "AM", points: 4890, weeklyPoints: 160, comments: 4, events: 1 },
  { name: "Grace Odhiambo", org: "Softura", orgVisible: false, initials: "GO", points: 2870, weeklyPoints: 95, comments: 2, events: 2 },
  { name: "Elena Popescu", org: "Capgemini", orgVisible: true, initials: "EP", points: 2110, weeklyPoints: 60, comments: 2, events: 0 },
];

/** Top rows for the compact widget on the Q&A Forum page — hidden for guests entirely, see that page. */
export const WEEKLY_LEADERBOARD = [...LEADERBOARD]
  .sort((a, b) => b.weeklyPoints - a.weeklyPoints)
  .slice(0, 3);
