"use client";

import * as React from "react";
import Link from "next/link";
import { useRole } from "@/components/shell/role-provider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemSeparator, ItemTitle } from "@/components/ui/item";
import { RoadmapStepper } from "@/components/roadmap-stepper";
import { toast } from "sonner";
import { DEALS, SALES_SPRINT, TECHNICAL_SPRINT, TECHNICAL_PATHS, DEFAULT_TECHNICAL_PATH_ID } from "@/lib/sample-data";
import {
  GraduationCap,
  Code2,
  Handshake,
  MessagesSquare,
  Library,
  ArrowRight,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Users2,
  FileText,
} from "lucide-react";

const QUICK_ACCESS = {
  builder: [
    { label: "Continue Certification", href: "/academy", icon: GraduationCap },
    { label: "Architecture Docs", href: "/developer-center", icon: Code2 },
    { label: "Q&A Forum", href: "/forum", icon: MessagesSquare },
    { label: "Resource Library", href: "/resources", icon: Library },
  ],
  sales: [
    { label: "Deal Pipeline", href: "/sales-center", icon: Handshake },
    { label: "Q&A Forum", href: "/forum", icon: MessagesSquare },
    { label: "Resource Library", href: "/resources", icon: Library },
    { label: "Certification Roadmap", href: "/academy", icon: GraduationCap },
    { label: "Deal Teaming Hub", href: "/sales-center#teaming-hub", icon: Users2 },
    { label: "Deal Registration", href: "/sales-center#deal-registration", icon: FileText },
  ],
};

const RECOMMENDATIONS = [
  { type: "Course", title: "Edge AI Architecture Deep Dive" },
  { type: "Resource", title: "Healthcare Solution Overview" },
  { type: "Video", title: "Building Your First VAIL App" },
  { type: "Doc", title: "Integration Best Practices" },
];

const ANNOUNCEMENTS = [
  {
    title: "AI Knowledge Hub is Here",
    description: "Ask questions. Get answers with source attribution.",
    time: "2d ago",
  },
  {
    title: "Partner Office Hours",
    description: "Join our live session on best practices and Q&A.",
    time: "Jul 21",
  },
  {
    title: "Release 1.40 is Live",
    description: "Native GenAI orchestration on the Edge.",
    time: "Jul 18",
  },
];

const stageTone: Record<string, string> = {
  Discovery: "bg-info/10 text-info",
  "Technical Validation": "bg-info/10 text-info",
  Proposal: "bg-emphasis/10 text-emphasis",
  Negotiation: "bg-emphasis/10 text-emphasis",
  "Closed Won": "bg-success/10 text-success",
};

const SAVED_ITEMS_COLLAPSED_COUNT = 4;

export default function DashboardPage() {
  const { role, info } = useRole();
  const firstName = info.user.name.split(" ")[0];
  const [savedItemsExpanded, setSavedItemsExpanded] = React.useState(false);

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

  const quickAccess =
    role === "technical-partner" || role === "employee" ? QUICK_ACCESS.builder : QUICK_ACCESS.sales;

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
              onClick={() => toast("Guided tour coming soon.")}
              className="font-semibold text-foreground hover:underline"
            >
              Replay guided tour
            </button>
          </p>
        )}
      </div>

      {showJourney && (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          <Card className="shadow-card p-5 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-emphasis">Continue Your Journey</h2>
                {!isSales && (
                  <p className="text-xs text-muted-foreground">{activeTechnicalPath?.label} path</p>
                )}
              </div>
              <Link href="/academy" className="text-xs text-emphasis hover:underline">
                View Full Roadmap
              </Link>
            </div>
            <RoadmapStepper steps={sprint} />
            <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-border p-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Currently enrolled
                </p>
                <p className="mt-1 truncate text-sm text-foreground">{currentEnrollment}</p>
              </div>
              <Link href="/academy">
                <Button size="sm">Resume</Button>
              </Link>
            </div>
          </Card>

          <Card className="shadow-card p-5 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-emphasis">My Progress</h2>
              <Link href="/academy" className="text-xs text-emphasis hover:underline">
                View all
              </Link>
            </div>
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

            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Next Milestone
            </p>
            <Link
              href="/academy"
              className="mt-1.5 flex items-center gap-3 rounded-md bg-muted p-2 transition-colors hover:bg-muted/70"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Award className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{nextMilestoneLabel}</p>
                <p className="text-xs text-muted-foreground">{progressPercent}% complete</p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-col lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-emphasis">Saved Items</h2>
            {quickAccess.length > SAVED_ITEMS_COLLAPSED_COUNT && (
              <button
                type="button"
                onClick={() => setSavedItemsExpanded((v) => !v)}
                className="flex items-center gap-1 text-xs text-emphasis hover:underline"
              >
                {savedItemsExpanded ? "Show less" : "Show all"}
                {savedItemsExpanded ? (
                  <ChevronUp className="size-3.5" />
                ) : (
                  <ChevronDown className="size-3.5" />
                )}
              </button>
            )}
          </div>
          <div
            className={
              savedItemsExpanded
                ? "grid grid-cols-2 gap-4 sm:grid-cols-4"
                : "grid flex-1 grid-cols-2 grid-rows-2 gap-4"
            }
          >
            {(savedItemsExpanded ? quickAccess : quickAccess.slice(0, SAVED_ITEMS_COLLAPSED_COUNT)).map(
              (item) => (
                <Link key={item.label} href={item.href}>
                  <Card className="shadow-card flex h-full flex-col justify-center p-4 transition-colors hover:border-primary">
                    <item.icon className="size-5 text-primary" />
                    <p className="mt-3 text-sm font-medium leading-snug">{item.label}</p>
                  </Card>
                </Link>
              )
            )}
          </div>
        </div>

        <Card className="shadow-card p-5 lg:col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-medium text-emphasis">Announcements</h2>
            <Link href="/resources" className="text-xs text-emphasis hover:underline">
              View all
            </Link>
          </div>
          <ItemGroup>
            {ANNOUNCEMENTS.map((item, i) => (
              <React.Fragment key={item.title}>
                <Item size="sm" className="px-0">
                  <ItemContent>
                    <div className="flex items-center justify-between gap-2">
                      <ItemTitle>{item.title}</ItemTitle>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <ItemDescription>{item.description}</ItemDescription>
                  </ItemContent>
                </Item>
                {i < ANNOUNCEMENTS.length - 1 && <ItemSeparator />}
              </React.Fragment>
            ))}
          </ItemGroup>
        </Card>
      </div>

      {role === "sales-partner" && (
        <Card className="shadow-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-emphasis">Deal Pipeline</h2>
            <Link href="/sales-center" className="text-xs text-emphasis hover:underline">
              View all
            </Link>
          </div>
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
      )}

      <Card className="shadow-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-emphasis">Recommended for you</h2>
          <Link
            href="/resources"
            className="flex items-center gap-1 text-xs text-emphasis hover:underline"
          >
            View all recommendations <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {RECOMMENDATIONS.map((rec) => (
            <div key={rec.title} className="rounded-md border border-border p-3">
              <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                {rec.type}
              </Badge>
              <p className="mt-2 text-sm font-medium text-foreground">{rec.title}</p>
            </div>
          ))}
        </div>
      </Card>

      {role === "exec" && (
        <Card className="shadow-card p-5">
          <h2 className="mb-4 text-sm font-medium text-emphasis">Organization Activity</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Seats used</p>
              <p className="text-lg font-semibold">5 / 10</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Certified users</p>
              <p className="text-lg font-semibold">3 / 5</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Org readiness</p>
              <p className="text-lg font-semibold text-success">80%</p>
            </div>
          </div>
        </Card>
      )}

      {role === "admin" && (
        <Card className="shadow-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-sm font-medium text-emphasis">Platform Analytics</h2>
            <Badge variant="secondary" className="text-[10px]">Admin only</Badge>
          </div>
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
      )}
    </div>
  );
}
