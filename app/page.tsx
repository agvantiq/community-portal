"use client";

import * as React from "react";
import Link from "next/link";
import { useRole } from "@/components/shell/role-provider";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { FirstTimeDashboard } from "@/components/first-time-dashboard";
import { OnboardingLanding } from "@/components/onboarding-landing";
import { ExecDashboard } from "@/components/exec-dashboard";
import { AdminDashboard } from "@/components/admin-dashboard";
import { GuidedTour, type TourStep } from "@/components/guided-tour";
import { TrackingPathCard } from "@/components/tracking-path-card";
import { useSavedItems, SAVED_ITEM_ICONS } from "@/lib/saved-items";
import { ANNOUNCEMENTS } from "@/lib/sample-data";
import { MessagesSquare, Library, Bookmark, RotateCcw } from "lucide-react";

/**
 * DIRECTION CONTRACT — app/page.tsx default (showJourney) view, trial branch
 * alsug/2026-07-28-impeccable-trial. Hero uses the portal-wide PageHero
 * (light vertical gradient, white page background); the tracking panel below
 * keeps its own direction: a synoptic/storm-tracking console — a horizontal
 * front line instead of a circle stepper, tabular-mono telemetry readouts,
 * diamond tick markers, no drop-shadow cards. Partner reads it like an ops
 * board — what's tracking, what's live now, what needs attention.
 */

const RECOMMENDATIONS = [
  {
    type: "Course",
    title: "Edge AI Architecture Deep Dive",
    description: "Design real-time inference at the edge.",
    href: "/academy/courses#course-edge-ai-architecture",
  },
  {
    type: "Resource",
    title: "Healthcare Solution Overview",
    description: "Reference architecture for patient monitoring.",
    href: "/resources#file-healthcare-solution-overview",
  },
  {
    type: "Video",
    title: "Building Your First VAIL App",
    description: "Walkthrough from project setup to deploy.",
    href: "/developer-center/documentation#doc-building-your-first-vail-app",
  },
  {
    type: "Doc",
    title: "Integration Best Practices",
    description: "Connect external systems without breaking flow.",
    href: "/developer-center/documentation#doc-integration-best-practices",
  },
];

const SAVED_ITEMS_VISIBLE_COUNT = 6;

const ESTABLISHED_TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="journey"]',
    title: "Track progress & resume",
    description:
      "Check your roadmap progress here and pick up where you left off — hit Resume to jump straight back into your current course.",
  },
  {
    target: '[data-tour="nav"]',
    title: "Find & enroll in courses",
    description:
      "Open the Learning Hub in the sidebar to see your courses and enroll in more anytime.",
  },
  {
    target: '[data-tour="search"]',
    title: "Search everything",
    description:
      "Press / or click here to search docs, training, and solutions across the whole portal.",
  },
];

export default function DashboardPage() {
  const { role, info } = useRole();
  const firstName = info.user.name.split(" ")[0];
  const [tourOpen, setTourOpen] = React.useState(false);
  const { items: savedItems } = useSavedItems();

  if (role === "onboarding") {
    return <OnboardingLanding />;
  }

  if (role === "guest") {
    return (
      <div className="space-y-6">
        <PageHero
          title="Explore the Vantiq Community"
          description="You're signed in with a personal email, which limits you to guest access. Sign in with your partner company email to track certifications, post in the Q&A forum, and unlock partner sales tools."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/forum/qa">
            <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
              <MessagesSquare className="size-5 text-primary" />
              <p className="mt-3 text-sm font-medium">Browse the Q&A forum</p>
              <p className="mt-1 text-xs text-muted-foreground">
                See how the community solves real integration problems.
              </p>
            </Card>
          </Link>
          <Link href="/resources">
            <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
              <Library className="size-5 text-primary" />
              <p className="mt-3 text-sm font-medium">Browse resources</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Whitepapers, case studies, and product documentation.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    );
  }

  if (role === "first-time-partner") {
    return <FirstTimeDashboard firstName={firstName} />;
  }

  if (role === "exec") {
    return <ExecDashboard firstName={firstName} />;
  }

  if (role === "admin") {
    return <AdminDashboard firstName={firstName} />;
  }

  const showJourney = role === "technical-partner" || role === "sales-partner" || role === "employee";
  const isSales = role === "sales-partner";

  const heroDescription =
    role === "employee"
      ? "Your Vantiq Journey starts here."
      : "Your partner success starts here. Continue your journey or explore new opportunities.";

  return (
    <div className="space-y-6">
      <PageHero
        title={`Welcome back, ${firstName}`}
        description={heroDescription}
        actions={
          <button
            type="button"
            onClick={() => setTourOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <RotateCcw className="size-4" />
            Replay guided tour
          </button>
        }
      />

      {showJourney && <TrackingPathCard isSales={isSales} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-col lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Saved Items
            </h2>
            <Link href="/saved-items" className="text-xs text-emphasis hover:underline">
              View all
            </Link>
          </div>
          {savedItems.length === 0 ? (
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 border border-border p-8 text-center shadow-none">
              <Bookmark className="size-6 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">No saved items yet</p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Click the bookmark icon on any hub page to pin it here for quick access.
              </p>
            </Card>
          ) : (
            <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-4">
              {savedItems.slice(0, SAVED_ITEMS_VISIBLE_COUNT).map((item) => {
                const Icon = SAVED_ITEM_ICONS[item.iconKey] ?? Bookmark;
                return (
                  <Link key={item.id} href={item.href}>
                    <Card className="flex h-full flex-col justify-center border border-border p-4 shadow-none transition-colors hover:border-primary">
                      <div className="flex size-9 items-center justify-center text-primary">
                        <Icon className="size-5" />
                      </div>
                      <p className="mt-3 text-sm font-medium leading-snug">{item.label}</p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Announcements
            </h2>
            <Link href="/resources" className="text-xs text-emphasis hover:underline">
              View all
            </Link>
          </div>
          <Card className="flex-1 border border-border p-5 shadow-none">
          <ItemGroup>
            {ANNOUNCEMENTS.map((item, i) => (
              <React.Fragment key={item.title}>
                <Item size="sm" className="items-start px-0">
                  <ItemMedia className="self-stretch">
                    <div
                      className={`h-full w-1 rounded-full ${item.isEvent ? "bg-info" : "bg-border"}`}
                    />
                  </ItemMedia>
                  <ItemContent className="min-w-0">
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription className="text-xs">{item.description}</ItemDescription>
                  </ItemContent>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-xs whitespace-nowrap text-emphasis">{item.time}</span>
                    {item.isEvent && (
                      <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                        Upcoming
                      </Badge>
                    )}
                  </div>
                </Item>
                {i < ANNOUNCEMENTS.length - 1 && <ItemSeparator />}
              </React.Fragment>
            ))}
          </ItemGroup>
          </Card>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-4">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Recommended for you
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {RECOMMENDATIONS.map((rec) => (
            <Link key={rec.title} href={rec.href}>
              <Card className="h-full border border-border p-4 shadow-none transition-colors hover:border-primary">
                <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                  {rec.type}
                </Badge>
                <p className="mt-2 text-sm font-medium text-foreground">{rec.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {showJourney && (
        <GuidedTour steps={ESTABLISHED_TOUR_STEPS} open={tourOpen} onClose={() => setTourOpen(false)} />
      )}
    </div>
  );
}
