"use client";

import * as React from "react";
import Link from "next/link";
import { useRole } from "@/components/shell/role-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { TrackingPathSwitcher } from "@/components/tracking-path-card";
import { SectionHeading, SectionHeadingLink } from "@/components/section-heading";
import { useSavedItems, SAVED_ITEM_ICONS } from "@/lib/saved-items";
import { ANNOUNCEMENTS, TECHNICAL_PATHS } from "@/lib/sample-data";
import { Lightbulb, Library, Bookmark, RotateCcw } from "lucide-react";

/**
 * DIRECTION CONTRACT — app/page.tsx default (showJourney) view, trial branch
 * alsug/2026-07-28-impeccable-trial, revised 2026-08-06 (layout pass). Hero
 * uses the portal-wide PageHero (light vertical gradient fading into the
 * tinted #f3f8f7 page field). The Path module below is the page's primary
 * focus — the one action ("continue your journey") the hero text points to —
 * so it carries the strongest lift on the page (shadow-card, above the
 * ordinary shadow-sm of the cards below it) and a soft azure header/footer
 * wash that ties it back to the hero instead of reading as a separate flat
 * box. This supersedes the original "flat ops-board, no drop-shadow"
 * direction: that flatness was fighting the hierarchy this dashboard needs —
 * the most important module was the only unshadowed one on the page. A
 * horizontal dot-and-line timeline and the mono, uppercase, tracking-wide
 * readout voice are the parts of that original direction that still hold;
 * the readout voice stays reserved for the Path module's own "Path" /
 * "Current course" labels, never for the section headings below, which use
 * the canonical SectionHeading (see components/section-heading.tsx).
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
    href: "/resources",
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
    target: '[data-tour="nav"]',
    title: "Explore the hubs",
    description:
      "Learning Hub, Developer Hub, and Sales Hub — everything you need lives in one of these three places. Expand a hub to see what's inside.",
  },
  {
    target: '[data-tour="saved-items"]',
    title: "Save what you use often",
    description:
      "Pin any page here for one-click access — click the bookmark icon in the top right of any hub page to add or remove it.",
  },
  {
    target: '[data-tour="courses"]',
    title: "Browse courses and enroll",
    description:
      "See every course across the Technical and Sales Enablement tracks in one catalog, and register with a click.",
  },
  {
    target: '[data-tour="journey"]',
    title: "Resume where you left off",
    description:
      "Your learning progress shows up right here as a roadmap — click the current radiating dot anytime to jump back into your studies.",
  },
  {
    target: '[data-tour="spark"]',
    title: "Vantiq Spark",
    description:
      "Quick-turn AI tools for the first customer conversation — research, scoping, and solution design in minutes.",
  },
  {
    target: '[data-tour="demos"]',
    title: "Run an interactive demo",
    description:
      "Walk a prospect through a real, industry-specific build before they write any code of their own.",
  },
  {
    target: '[data-tour="deal-registration"]',
    title: "Register a deal",
    description: "Found an opportunity? Register it here.",
  },
  {
    target: '[data-tour="support"]',
    title: "We're here if you need us",
    description:
      "Have feedback, a question, or can't find something? Contact Support is always one click away.",
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
          description="You have guest access to the Vantiq Community — browse the knowledge base, explore public resources, and take intro courses. Sign in with your partner company email to track certifications and unlock partner sales tools."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/resources/knowledge-base"
            className="block rounded-xl bg-linear-to-br from-emphasis/20 via-accent to-secondary p-5 shadow-card transition-opacity hover:opacity-90"
          >
            <Lightbulb className="size-5 text-foreground/70" />
            <p className="mt-3 text-sm font-medium text-foreground">Browse Knowledge Base</p>
            <p className="mt-1 text-xs text-foreground/70">
              Searchable articles, tutorials, and how-tos.
            </p>
          </Link>
          <Link
            href="/resources"
            className="block rounded-xl bg-linear-to-br from-emphasis/20 via-accent to-secondary p-5 shadow-card transition-opacity hover:opacity-90"
          >
            <Library className="size-5 text-foreground/70" />
            <p className="mt-3 text-sm font-medium text-foreground">Browse resources</p>
            <p className="mt-1 text-xs text-foreground/70">
              Whitepapers, case studies, and product documentation.
            </p>
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

  const showJourney = role === "technical-partner" || role === "employee";

  const heroDescription =
    role === "employee"
      ? "Your Vantiq Journey starts here."
      : role === "customer"
        ? undefined
        : "Your partner success starts here. Continue your journey or explore new opportunities.";

  return (
    <div className="space-y-6">
      <PageHero
        title={`Welcome back, ${firstName}`}
        description={heroDescription}
        actions={
          showJourney ? (
            <Button
              type="button"
              variant="link"
              onClick={() => setTourOpen(true)}
              className="h-auto p-0 text-sm font-medium"
            >
              <RotateCcw className="size-4" />
              Replay guided tour
            </Button>
          ) : undefined
        }
      />

      {/* Roadmap + Saved Items stack in the left column at the same width;
          Announcements becomes a tall right column spanning that combined
          height rather than a full-width roadmap row above two shorter
          columns. TrackingPathSwitcher's `compact` prop and Announcements'
          plain SectionHeading are height-matched (see tracking-path-card.tsx)
          so both columns' cards start at the same y. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7 lg:items-stretch">
        <div className="flex flex-col gap-6 lg:col-span-5">
          {showJourney && <TrackingPathSwitcher paths={TECHNICAL_PATHS} compact />}

          <div data-tour="saved-items" className="flex flex-col">
            <SectionHeading action={<SectionHeadingLink href="/saved-items" />}>Saved Items</SectionHeading>
            {savedItems.length === 0 ? (
              <Card className="flex flex-1 flex-col items-center justify-center gap-2 border border-border p-8 text-center">
                <Bookmark className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">No saved items yet</p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  Click the bookmark icon on any hub page to pin it here for quick access.
                </p>
              </Card>
            ) : (
              <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
                {savedItems.slice(0, SAVED_ITEMS_VISIBLE_COUNT).map((item) => {
                  const Icon = SAVED_ITEM_ICONS[item.iconKey] ?? Bookmark;
                  return (
                    <Link key={item.id} href={item.href}>
                      <Card className="flex h-full flex-col justify-center border border-border bg-linear-to-br from-emphasis/20 via-accent to-secondary p-4 transition-all hover:border-primary hover:shadow-card">
                        <div className="flex size-10 items-center justify-center text-primary">
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
        </div>

        <div className="flex flex-col lg:col-span-2">
          {/* mb-3 (not the default mb-4) — matches the roadmap header's fixed
              h-9 exactly, so this card's top edge lines up with the roadmap
              card's instead of sitting 4px lower. */}
          <SectionHeading className="mb-3" action={<SectionHeadingLink href="/resources" />}>
            Announcements
          </SectionHeading>
          <Card className="flex-1 border border-border p-5">
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
                    <ItemDescription className="text-xs line-clamp-none">{item.description}</ItemDescription>
                  </ItemContent>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {item.isEvent && (
                      <Badge variant="secondary" className="bg-info/10 text-info">
                        Upcoming
                      </Badge>
                    )}
                    <span className="text-xs whitespace-nowrap text-muted-foreground">{item.time}</span>
                  </div>
                </Item>
                {i < ANNOUNCEMENTS.length - 1 && <ItemSeparator />}
              </React.Fragment>
            ))}
          </ItemGroup>
          </Card>
        </div>
      </div>

      {role !== "customer" && (
        <div className="flex flex-col">
          <SectionHeading>Recommended for you</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECOMMENDATIONS.map((rec) => (
              <Link key={rec.title} href={rec.href}>
                <Card className="h-full border border-border p-4 transition-all hover:border-primary hover:shadow-card">
                  <Badge variant="secondary">{rec.type}</Badge>
                  <p className="mt-2 text-sm font-medium text-foreground">{rec.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showJourney && (
        <GuidedTour steps={ESTABLISHED_TOUR_STEPS} open={tourOpen} onClose={() => setTourOpen(false)} />
      )}
    </div>
  );
}
