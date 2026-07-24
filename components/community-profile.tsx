"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRole } from "@/components/shell/role-provider";
import { COMMUNITY_PROFILE, COMMUNITY_BADGES } from "@/lib/community-data";
import { CalendarDays, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const TABS = ["About", "Posts", "Comments", "Spaces", "Rewards"] as const;
type ProfileTab = (typeof TABS)[number];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CommunityProfile() {
  const { info } = useRole();
  const [tab, setTab] = React.useState<ProfileTab>("About");

  const { level, levelName, points, pointsToLevelUp, memberSince, handle, activityScore, tags, counts } =
    COMMUNITY_PROFILE;
  const ringPercent = Math.round((points / (points + pointsToLevelUp)) * 100);
  const name = info.user.name;
  const team = info.user.org ?? "Community";

  const tabCount: Partial<Record<ProfileTab, number>> = {
    Posts: counts.posts,
    Comments: counts.comments,
    Spaces: counts.spaces,
  };

  return (
    <Card className="shadow-card overflow-hidden p-0">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr]">
        {/* Identity column */}
        <div className="flex flex-col items-center gap-2 border-b border-border bg-gradient-to-b from-secondary/40 to-transparent p-6 text-center md:border-b-0 md:border-r">
          <div className="relative">
            <div
              className="flex size-24 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(var(--primary) ${ringPercent}%, var(--muted) 0)` }}
            >
              <Avatar className="size-[86px] border-4 border-card">
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {initials(name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="absolute -bottom-1 left-1/2 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-card bg-primary text-xs font-semibold text-primary-foreground">
              {level}
            </span>
          </div>

          <p className="mt-2 text-sm font-medium text-primary">{levelName}</p>
          <p className="text-xs text-muted-foreground">
            {points} points &middot; {pointsToLevelUp} to level up
          </p>

          <h1 className="mt-1 text-xl font-semibold text-foreground">{name}</h1>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            Member since {memberSince}
          </p>
          <Badge variant="secondary" className="mt-1 bg-warning/10 text-warning">
            {team}
          </Badge>

          <div className="mt-3 flex items-center gap-2">
            <Button size="sm" onClick={() => toast("Profile editing is coming soon.")}>
              Edit
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              aria-label="More options"
              onClick={() => toast("More profile options coming soon.")}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>

        {/* Detail column */}
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-accent"
                }`}
              >
                {t}
                {tabCount[t] !== undefined && (
                  <span className={tab === t ? "ml-1.5 text-primary-foreground/80" : "ml-1.5 text-muted-foreground"}>
                    {tabCount[t]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {tab === "About" && (
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Handle</p>
                <p className="mt-1 text-sm text-foreground">@{handle}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Activity score
                </p>
                <p className="mt-1 text-sm text-foreground">{activityScore}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tags</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-warning/10 text-warning">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Badges</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {COMMUNITY_BADGES.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div key={badge.id} className="flex w-20 flex-col items-center gap-1.5 text-center">
                        <div className={`flex size-12 items-center justify-center rounded-full ${badge.tint}`}>
                          <Icon className="size-5" />
                        </div>
                        <span className="text-[11px] leading-tight text-muted-foreground">{badge.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === "Rewards" && (
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Earned badges
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {COMMUNITY_BADGES.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className="flex w-20 flex-col items-center gap-1.5 text-center">
                      <div className={`flex size-12 items-center justify-center rounded-full ${badge.tint}`}>
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[11px] leading-tight text-muted-foreground">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(tab === "Posts" || tab === "Comments" || tab === "Spaces") && (
            <div className="mt-6 flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-border text-center">
              <p className="text-2xl font-semibold text-foreground">{tabCount[tab]}</p>
              <p className="text-sm text-muted-foreground">
                {tab === "Posts" && "posts across the community"}
                {tab === "Comments" && "comments contributed"}
                {tab === "Spaces" && "spaces joined"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
