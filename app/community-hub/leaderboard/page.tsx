"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/components/shell/role-provider";
import {
  LEADERBOARD,
  MY_COMMUNITY_STATS,
  useOrgVisibility,
  type LeaderboardEntry,
} from "@/lib/community-data";
import { MessageSquare, CalendarCheck, Trophy, Medal, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

// Was gold/silver/bronze (warning + emphasis) — warning is a status color,
// not a decorative one, and spending emphasis-violet on two ranks broke the
// One Violet Rule. Now only rank 1 gets the violet highlight (the one
// moment on this screen that earns it); 2 and 3 are neutral tones already
// used elsewhere for muted/secondary surfaces.
const RANK_STYLE: Record<number, { icon: typeof Trophy; className: string }> = {
  1: { icon: Trophy, className: "bg-emphasis/10 text-emphasis-vivid" },
  2: { icon: Medal, className: "bg-muted text-muted-foreground" },
  3: { icon: Medal, className: "bg-secondary text-foreground" },
};

export default function LeaderboardPage() {
  const { info, role } = useRole();
  const [myOrgVisible] = useOrgVisibility();

  // Guests aren't ranked — see lib/community-data.ts and the "Help the
  // Community" widget on the Q&A Forum page, which is hidden for guests for
  // the same reason.
  const rows: LeaderboardEntry[] = React.useMemo(() => {
    const list = [...LEADERBOARD];
    if (role !== "guest" && role !== "onboarding") {
      list.push({
        name: info.user.name,
        org: info.user.org ?? "",
        orgVisible: myOrgVisible,
        initials: info.user.name
          .split(" ")
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase(),
        points: MY_COMMUNITY_STATS.points,
        weeklyPoints: 0,
        comments: MY_COMMUNITY_STATS.commentsCount,
        events: 0,
      });
    }
    return list.sort((a, b) => b.points - a.points);
  }, [role, info.user.name, info.user.org, myOrgVisible]);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/community-hub" className="hover:text-foreground">
            &larr; Community Hub
          </Link>
        }
        title="Leaderboard"
        description="Top contributors across the partner community, ranked by activity this quarter."
      />

      <Card className="shadow-card divide-y divide-border p-2">
        {rows.map((entry, i) => {
          const rank = i + 1;
          const rankStyle = RANK_STYLE[rank];
          const isMe = role !== "guest" && role !== "onboarding" && entry.name === info.user.name;
          return (
            <div
              key={entry.name}
              className={cn(
                "flex items-center gap-4 px-4 py-3",
                isMe && "rounded-md bg-primary/5"
              )}
            >
              {rankStyle ? (
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full",
                    rankStyle.className
                  )}
                >
                  <rankStyle.icon className="size-4" />
                </span>
              ) : (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                  {rank}
                </span>
              )}

              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-foreground">
                  {entry.name} <span className="font-normal text-muted-foreground">({entry.initials})</span>
                  {isMe && <Badge variant="secondary">You</Badge>}
                </p>
                {entry.orgVisible ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">{entry.org}</p>
                ) : (
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground italic">
                    <EyeOff className="size-3" />
                    Company hidden
                  </p>
                )}
              </div>

              <div className="hidden shrink-0 items-center gap-4 text-xs text-muted-foreground sm:flex">
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-3.5" />
                  {entry.comments}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarCheck className="size-3.5" />
                  {entry.events}
                </span>
              </div>

              <Badge variant="secondary" className="shrink-0 text-sm">
                {entry.points.toLocaleString()} pts
              </Badge>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
