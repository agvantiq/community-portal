"use client";

import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRole } from "@/components/shell/role-provider";
import {
  COMMUNITY_BADGES,
  MY_COMMUNITY_STATS,
  resolveCommunityLevel,
  useOrgVisibility,
} from "@/lib/community-data";
import { Trophy, MessagesSquare, CalendarDays, ChevronRight, type LucideIcon } from "lucide-react";
import { toast } from "sonner";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function handleFromName(name: string) {
  return "@" + name.toLowerCase().replace(/\s+/g, ".");
}

function EmptyTab({ label }: { label: string }) {
  return (
    <p className="py-10 text-center text-sm text-muted-foreground">
      Nothing to show here yet in this preview — browse the{" "}
      <Link href="/forum/qa" className="font-medium text-primary-vivid hover:underline">
        Developer Forum
      </Link>{" "}
      to see live {label.toLowerCase()}.
    </p>
  );
}

// Events lives under Community Hub in the sidebar; the Developer Forum lives
// under Developer Hub but is still where most community activity happens
// (PRD COMM-01: "links to events and forum activity"), so both are here.
// Solutions Showcasing is hidden (PRD P3-02).
const SPACES: { href: string; icon: LucideIcon; label: string; description: string }[] = [
  {
    href: "/events",
    icon: CalendarDays,
    label: "Events",
    description: "Office hours, workshops, webinars, and partner gatherings — upcoming and past.",
  },
  {
    href: "/forum/qa",
    icon: MessagesSquare,
    label: "Developer Forum",
    description: "Ask questions, share answers, and see how other developers solve real integration problems.",
  },
];

function SpacesList() {
  return (
    <div>
      <SectionHeading>Spaces</SectionHeading>
      <Card className="shadow-card gap-0 divide-y divide-border p-2">
        {SPACES.map(({ href, icon: Icon, label, description }) => (
          <Link key={href} href={href} className="flex items-center gap-4 p-3.5 transition-colors hover:bg-muted">
            <Icon className="size-5 shrink-0 text-primary-vivid" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </Card>
    </div>
  );
}

export default function CommunityHubPage() {
  const { info, role } = useRole();
  const [orgVisible, setOrgVisible] = useOrgVisibility();

  if (role === "onboarding") {
    return (
      <div className="space-y-6">
        <PageHero
          title="Community Hub"
          description="Sign in to see your community reputation, badges, and activity."
          actions={
            <Button asChild>
              <Link href="/">Go to sign in</Link>
            </Button>
          }
        />
      </div>
    );
  }

  // Guests browse with a personal email, not a recognized partner account —
  // they can see the leaderboard, just never appear on it (see
  // lib/community-data.ts and the Q&A Forum's community widgets, hidden for
  // the same reason).
  if (role === "guest") {
    return (
      <div className="space-y-6">
        <PageHero
          title="Community Hub"
          description="Guest access doesn't earn community reputation. Register as a partner to start earning points, levels, and badges."
          actions={
            <Button asChild>
              <Link href="/register">Register for partner access</Link>
            </Button>
          }
        />
        <Button variant="link" asChild className="h-auto p-0 text-sm font-medium">
          <Link href="/community-hub/leaderboard">
            <Trophy className="size-4" />
            See who's leading the community
          </Link>
        </Button>
        <SpacesList />
      </div>
    );
  }

  const { level, next, pointsToNext } = resolveCommunityLevel(MY_COMMUNITY_STATS.points);
  const progressToNext = next ? (MY_COMMUNITY_STATS.points - level.minPoints) / (next.minPoints - level.minPoints) : 1;
  const badges = COMMUNITY_BADGES.filter((b) => MY_COMMUNITY_STATS.badgeIds.includes(b.id));

  return (
    <div className="space-y-6">
      <PageHero
        title="Community Hub"
        description="Your community profile, badges, and everywhere the partner ecosystem gathers."
        actions={
          <Button variant="link" asChild className="h-auto p-0 text-sm font-medium">
            <Link href="/community-hub/leaderboard">
              <Trophy className="size-4" />
              View the leaderboard
            </Link>
          </Button>
        }
      />

      <Card className="shadow-card grid grid-cols-1 gap-6 p-6 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center gap-3 border-b border-border pb-6 text-center md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <div
            className="relative flex size-24 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--primary-vivid) ${Math.round(progressToNext * 100)}%, var(--muted) 0)`,
            }}
          >
            <div className="flex size-20 items-center justify-center rounded-full bg-card text-xl font-semibold text-foreground">
              {initials(info.user.name)}
            </div>
            <div className="absolute -bottom-1 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-4 ring-card">
              {level.number}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-vivid">{level.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {MY_COMMUNITY_STATS.points.toLocaleString()} points
              {next ? ` · ${pointsToNext?.toLocaleString()} to level up` : " · Max level"}
            </p>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">{info.user.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Member since {MY_COMMUNITY_STATS.memberSince}</p>
          </div>
          {info.user.org && <Badge variant="secondary">{info.user.org}</Badge>}
        </div>

        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts {MY_COMMUNITY_STATS.postsCount}</TabsTrigger>
            <TabsTrigger value="comments">Comments {MY_COMMUNITY_STATS.commentsCount}</TabsTrigger>
            <TabsTrigger value="spaces">Spaces {MY_COMMUNITY_STATS.spacesCount}</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6 pt-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Handle</p>
                <p className="mt-1 text-sm text-foreground">{handleFromName(info.user.name)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Activity score
                </p>
                <p className="mt-1 text-sm text-foreground">{MY_COMMUNITY_STATS.activityScore} / 100</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Role</p>
                <p className="mt-1 text-sm text-foreground">{info.label}</p>
              </div>
            </div>

            <div>
              <SectionHeading className="mb-3">Badges</SectionHeading>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-1.5 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary-vivid">
                      <badge.icon className="size-5" />
                    </span>
                    <p className="text-xs text-muted-foreground">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
              <div>
                <Label htmlFor="org-visibility" className="text-sm font-medium text-foreground">
                  Show your company on the Leaderboard
                </Label>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Off shows your name and points without {info.user.org ?? "your organization"}.
                </p>
              </div>
              <Switch
                id="org-visibility"
                checked={orgVisible}
                onCheckedChange={(checked) => {
                  setOrgVisible(checked);
                  toast.success(checked ? "Your company is now visible on the leaderboard." : "Your company is now hidden on the leaderboard.");
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="posts" className="pt-2">
            <EmptyTab label="Posts" />
          </TabsContent>
          <TabsContent value="comments" className="pt-2">
            <EmptyTab label="Comments" />
          </TabsContent>
          <TabsContent value="spaces" className="pt-2">
            <EmptyTab label="Spaces" />
          </TabsContent>
          <TabsContent value="rewards" className="pt-2">
            <EmptyTab label="Rewards" />
          </TabsContent>
        </Tabs>
      </Card>

      <SpacesList />
    </div>
  );
}
