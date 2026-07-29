"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommunityProfile } from "@/components/community-profile";
import { PageHero } from "@/components/page-hero";
import { FORUM_POSTS } from "@/lib/sample-data";
import { COMMUNITY_EVENTS, EVENT_TYPE_STYLE } from "@/lib/community-data";
import {
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Calendar,
  MessagesSquare,
  Wrench,
  LayoutTemplate,
  Bot,
} from "lucide-react";

const SHOWCASE_PREVIEW = [
  { title: "Fleet Ops Console", org: "Radenta Tech", icon: Wrench, tint: "bg-info/10 text-info" },
  { title: "Partner Deal Room", org: "SoftServe", icon: LayoutTemplate, tint: "bg-emphasis/10 text-emphasis" },
  { title: "Cold-Chain Sentinel", org: "Wipro Mfg", icon: Bot, tint: "bg-warning/10 text-warning" },
] as const;

function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function CommunityDashboardPage() {
  const topQuestions = React.useMemo(
    () => [...FORUM_POSTS].sort((a, b) => b.votes - a.votes).slice(0, 3),
    []
  );
  const upcomingEvents = React.useMemo(
    () => [...COMMUNITY_EVENTS].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3),
    []
  );

  return (
    <div className="space-y-6">
      <PageHero
        title="Community Dashboard"
        description="Your community profile, badges, and everywhere the partner ecosystem gathers."
      />

      <CommunityProfile />

      <Link href="/forum/qa" className="block">
        <Card className="shadow-card p-6 transition-colors hover:border-primary">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-medium text-emphasis">
              <MessagesSquare className="size-4 text-primary" />
              Q&amp;A Forum
            </h2>
            <span className="flex items-center gap-1 text-xs text-emphasis">
              View all
              <ChevronRight className="size-3.5" />
            </span>
          </div>
          <div className="space-y-2">
            {topQuestions.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-3 rounded-md border border-border p-3"
              >
                <div className="flex w-10 shrink-0 flex-col items-center gap-0.5 text-center">
                  <span className="flex items-center gap-1 text-xs font-medium text-foreground">
                    <ArrowUp className="size-3 text-muted-foreground" />
                    {post.votes}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{post.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {post.author} &middot; {post.timeAgo}
                  </p>
                </div>
                {post.accepted && <CheckCircle2 className="size-4 shrink-0 text-success" />}
              </div>
            ))}
          </div>
        </Card>
      </Link>

      <Link href="/forum/showcase" className="block">
        <Card className="shadow-card p-6 transition-colors hover:border-primary">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-medium text-emphasis">
              <Sparkles className="size-4 text-primary" />
              Community Showcase
            </h2>
            <span className="flex items-center gap-1 text-xs text-emphasis">
              View all
              <ChevronRight className="size-3.5" />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {SHOWCASE_PREVIEW.map((project) => (
              <div
                key={project.title}
                className="flex items-center gap-3 rounded-md border border-border p-3"
              >
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-md ${project.tint}`}>
                  <project.icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{project.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{project.org}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Link>

      <Link href="/forum/events" className="block">
        <Card className="shadow-card p-6 transition-colors hover:border-primary">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-medium text-emphasis">
              <Calendar className="size-4 text-primary" />
              Events
            </h2>
            <span className="flex items-center gap-1 text-xs text-emphasis">
              View all
              <ChevronRight className="size-3.5" />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emphasis">{formatEventDate(event.date)}</span>
                  <Badge variant="secondary" className={EVENT_TYPE_STYLE[event.type].chip}>
                    {event.type}
                  </Badge>
                </div>
                <p className="mt-1.5 truncate text-sm font-medium text-foreground">{event.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{event.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </Link>
    </div>
  );
}
