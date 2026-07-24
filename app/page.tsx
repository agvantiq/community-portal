"use client";

import * as React from "react";
import Link from "next/link";
import { useRole } from "@/components/shell/role-provider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { RoadmapStepper } from "@/components/roadmap-stepper";
import { FirstTimeDashboard } from "@/components/first-time-dashboard";
import { ExecDashboard } from "@/components/exec-dashboard";
import { GuidedTour, type TourStep } from "@/components/guided-tour";
import { useSavedItems, SAVED_ITEM_ICONS } from "@/lib/saved-items";
import { DEALS, SALES_SPRINT, TECHNICAL_SPRINT, TECHNICAL_PATHS, DEFAULT_TECHNICAL_PATH_ID } from "@/lib/sample-data";
import { MessagesSquare, Library, Award, ChevronRight, Bookmark } from "lucide-react";

const RECOMMENDATIONS = [
  { type: "Course", title: "Edge AI Architecture Deep Dive", href: "/academy#course-edge-ai-architecture" },
  { type: "Resource", title: "Healthcare Solution Overview", href: "/resources#file-healthcare-solution-overview" },
  { type: "Video", title: "Building Your First VAIL App", href: "/developer-center#doc-building-your-first-vail-app" },
  { type: "Doc", title: "Integration Best Practices", href: "/developer-center#doc-integration-best-practices" },
];

const UPCOMING_EVENT = {
  title: "Partner Field Day: Edge AI",
  description: "Live workshop and networking for certified partners.",
  time: "Jul 29",
  date: "2026-07-29",
  isEvent: true,
};

const ANNOUNCEMENTS = [
  UPCOMING_EVENT,
  {
    title: "AI Knowledge Hub is Here",
    description: "Ask questions. Get answers with source attribution.",
    time: "2d ago",
    date: "2026-07-21",
  },
  {
    title: "Partner Office Hours",
    description: "Join our live session on best practices and Q&A.",
    time: "Jul 21",
    date: "2026-07-21",
  },
  {
    title: "Release 1.40 is Live",
    description: "Native GenAI orchestration on the Edge.",
    time: "Jul 18",
    date: "2026-07-18",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const stageTone: Record<string, string> = {
  Discovery: "bg-info/10 text-info",
  "Technical Validation": "bg-info/10 text-info",
  Proposal: "bg-emphasis/10 text-emphasis",
  Negotiation: "bg-emphasis/10 text-emphasis",
  "Closed Won": "bg-success/10 text-success",
};

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
  {
    target: '[data-tour="copilot"]',
    title: "Meet the Vantiq AI Co-Pilot",
    description:
      "Stuck? Open the Co-Pilot to write VAIL code, troubleshoot edge deployments, or find documentation.",
  },
];

export default function DashboardPage() {
  const { role, info } = useRole();
  const firstName = info.user.name.split(" ")[0];
  const [tourOpen, setTourOpen] = React.useState(false);

  if (role === "guest") {
    return (
      <div className="space-y-6">
        <Card className="shadow-card border-none bg-primary p-8 text-primary-foreground">
          <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
            Welcome
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Explore the Vantiq Community</h1>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
            Create an account to track certifications, post in the Q&A forum, and unlock partner
            sales tools.
          </p>
          <Button variant="secondary" className="mt-5">
            Create your account
          </Button>
        </Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/forum">
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

  const { items: savedItems } = useSavedItems();

  const showJourney = role === "technical-partner" || role === "sales-partner" || role === "employee";
  const isSales = role === "sales-partner";
  const sprint = isSales ? SALES_SPRINT : TECHNICAL_SPRINT;
  const currentPhase = sprint.find((p) => p.status === "current") ?? sprint[0];
  const activeTechnicalPath = TECHNICAL_PATHS.find((p) => p.id === DEFAULT_TECHNICAL_PATH_ID);
  const currentEnrollment = isSales
    ? currentPhase.tasks[0]
    : (activeTechnicalPath?.modules.find((m) => m.status === "current")?.title ?? currentPhase.tasks[0]);

  const badgesEarned = sprint.filter((p) => p.status === "done").length;
  const modulesComplete = isSales
    ? sprint.filter((p) => p.status === "done").reduce((sum, p) => sum + p.tasks.length, 0)
    : (activeTechnicalPath?.modules.filter((m) => m.status === "done").length ?? 0);
  const modulesTotal = isSales
    ? sprint.reduce((sum, p) => sum + p.tasks.length, 0)
    : (activeTechnicalPath?.modules.length ?? 0);
  const modulesLabel = isSales ? "Tasks Complete" : "Courses Complete";
  const progressPercent = isSales
    ? Math.round((modulesComplete / modulesTotal) * 100)
    : (activeTechnicalPath?.modules.find((m) => m.status === "current")?.progress ??
      Math.round((modulesComplete / modulesTotal) * 100));
  const nextMilestoneLabel = `${currentPhase.label} Badge`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back,
        </p>
        <h1 className="text-2xl font-semibold text-foreground">{firstName}</h1>
        {showJourney && (
          <p className="mt-1 text-sm text-muted-foreground">
            {role === "employee"
              ? "Your Vantiq Journey starts here."
              : "Your partner success starts here. Continue your journey or explore new opportunities."}
            <br />
            <button
              type="button"
              onClick={() => setTourOpen(true)}
              className="font-semibold text-foreground hover:underline"
            >
              Replay guided tour
            </button>
          </p>
        )}
      </div>

      {showJourney && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div data-tour="journey" className="flex flex-col lg:col-span-3">
            <div className="mb-4 flex min-h-8 items-end gap-2">
              <h2 className="text-sm font-medium text-emphasis">Continue Your Journey</h2>
              {!isSales && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-base font-semibold text-primary">
                    {activeTechnicalPath?.label} Path
                  </span>
                </>
              )}
            </div>
            <Card className="shadow-card flex-1 justify-between gap-8 p-5">
              <RoadmapStepper steps={sprint} />
              <div className="flex items-center justify-between gap-3 rounded-md bg-emphasis/10 p-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Currently enrolled
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-primary">{currentEnrollment}</p>
                </div>
                <Link href="/academy">
                  <Button size="sm">Resume</Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="flex flex-col lg:col-span-2">
            <div className="mb-4 flex min-h-8 items-end justify-between">
              <h2 className="text-sm font-medium text-emphasis">My Progress</h2>
              <Link href="/academy" className="text-xs text-emphasis hover:underline">
                View all
              </Link>
            </div>
            <Card className="shadow-card flex-1 justify-between gap-8 p-5">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(var(--primary) ${progressPercent}%, var(--muted) 0)`,
                  }}
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-card text-xs font-semibold">
                    {progressPercent}%
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {modulesComplete} / {modulesTotal}
                    <span className="ml-1 font-normal text-muted-foreground">{modulesLabel}</span>
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    {badgesEarned}
                    <span className="ml-1 font-normal text-muted-foreground">
                      {badgesEarned === 1 ? "Badge" : "Badges"} Earned
                    </span>
                  </p>
                </div>
              </div>

              <Link
                href="/academy"
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <Award className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Next Milestone
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-primary">
                      {nextMilestoneLabel} · {progressPercent}% complete
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </Card>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-col lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-emphasis">Saved Items</h2>
            <Link href="/saved-items" className="text-xs text-emphasis hover:underline">
              View all
            </Link>
          </div>
          {savedItems.length === 0 ? (
            <Card className="shadow-card flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
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
                    <Card className="shadow-card flex h-full flex-col justify-center p-4 transition-colors hover:border-primary">
                      <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
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
            <h2 className="text-sm font-medium text-emphasis">Announcements</h2>
            <Link href="/resources" className="text-xs text-emphasis hover:underline">
              View all
            </Link>
          </div>
          <Card className="shadow-card flex-1 p-5">
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

      {role === "sales-partner" && (
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-emphasis">Deal Pipeline</h2>
            <Link href="/sales-center" className="text-xs text-emphasis hover:underline">
              View all
            </Link>
          </div>
          <Card className="shadow-card p-5">
            <div className="space-y-2">
              {DEALS.slice(0, 4).map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{deal.client}</p>
                    <p className="truncate text-xs text-muted-foreground">{deal.useCase}</p>
                  </div>
                  <Badge variant="secondary" className={stageTone[deal.stage]}>
                    {deal.stage}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <div className="flex flex-col">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-emphasis">Recommended for you</h2>
        </div>
        <Card className="shadow-card p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {RECOMMENDATIONS.map((rec) => (
              <Link key={rec.title} href={rec.href}>
                <div className="h-full rounded-md border border-border p-3 transition-colors hover:border-primary">
                  <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                    {rec.type}
                  </Badge>
                  <p className="mt-2 text-sm font-medium text-foreground">{rec.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {role === "admin" && (
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-sm font-medium text-emphasis">Platform Analytics</h2>
            <Badge variant="secondary" className="text-[10px]">Admin only</Badge>
          </div>
          <Card className="shadow-card p-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Monthly active users</p>
                <p className="text-lg font-semibold">3,842</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Path completion</p>
                <p className="text-lg font-semibold">68%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Self-service resolution</p>
                <p className="text-lg font-semibold">74%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deal registrations</p>
                <p className="text-lg font-semibold">126</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showJourney && (
        <GuidedTour steps={ESTABLISHED_TOUR_STEPS} open={tourOpen} onClose={() => setTourOpen(false)} />
      )}
    </div>
  );
}
