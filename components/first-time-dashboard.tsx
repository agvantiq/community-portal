"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { DashboardHero } from "@/components/dashboard-hero";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { GuidedTour, type TourStep } from "@/components/guided-tour";
import { GraduationCap, Code2, MessagesSquare, Library, Compass } from "lucide-react";

const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="nav"]',
    title: "Explore the hubs",
    description:
      "Everything's organized into hubs — Learning, Developer, Community, and Resources. Expand any group to dive in.",
  },
  {
    target: '[data-tour="search"]',
    title: "Search everything",
    description:
      "Press / or click here to search docs, training, and solutions across the whole portal.",
  },
  {
    target: '[data-tour="checklist"]',
    title: "Your onboarding checklist",
    description:
      "Work through these steps to get set up — complete your profile, enroll in a course, and more. Check them off as you go.",
  },
  {
    target: '[data-tour="explore"]',
    title: "Jump into the portal",
    description: "Use these shortcuts to start exploring the community whenever you're ready.",
  },
  {
    target: '[data-tour="copilot"]',
    title: "Meet the Vantiq AI Co-Pilot",
    description:
      "Stuck? Open the Co-Pilot to write VAIL code, troubleshoot edge deployments, or find documentation.",
  },
];

const QUICK_LINKS = [
  { label: "Learning Hub", href: "/academy", icon: GraduationCap },
  { label: "Developer Hub", href: "/developer-center", icon: Code2 },
  { label: "Q&A Forum", href: "/forum/qa", icon: MessagesSquare },
  { label: "Resource Library", href: "/resources", icon: Library },
];

const CHECKLIST_ITEMS = [
  {
    id: "profile",
    label: "Complete your profile",
    description: "Add your role, company, and areas of expertise.",
  },
  {
    id: "enroll",
    label: "Enroll in your first course",
    description: "Start the certification track that fits your role.",
  },
  {
    id: "forum",
    label: "Introduce yourself in the Q&A forum",
    description: "Say hello to the partner community.",
  },
  {
    id: "resources",
    label: "Explore the resource library",
    description: "Browse case studies and technical whitepapers.",
  },
  {
    id: "office-hours",
    label: "Register for office hours",
    description: "Get your questions answered live.",
  },
];

export function FirstTimeDashboard({ firstName }: { firstName: string }) {
  const [tourOpen, setTourOpen] = React.useState(true);
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Welcome to Vantiq"
        title={
          <>
            Hi {firstName}, let&apos;s get you set up. <span aria-hidden>👋</span>
          </>
        }
        description="This is your first time here — take the quick tour of the portal, then work through your onboarding checklist below."
        actions={
          <Button onClick={() => setTourOpen(true)}>
            <Compass className="size-4" />
            Replay guided tour
          </Button>
        }
      />

      <Card data-tour="checklist" className="shadow-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-emphasis">Get Started Checklist</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {completedCount} / {CHECKLIST_ITEMS.length} complete
            </p>
          </div>
          <span className="text-sm font-semibold text-primary">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="mb-5 h-1.5" />
        <div className="space-y-2">
          {CHECKLIST_ITEMS.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
            >
              <Checkbox
                checked={!!checked[item.id]}
                onCheckedChange={(value) =>
                  setChecked((prev) => ({ ...prev, [item.id]: value === true }))
                }
                className="mt-0.5"
              />
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium ${
                    checked[item.id] ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <Card data-tour="explore" className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-emphasis">Explore the Portal</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              <Card className="shadow-card flex h-full flex-col justify-center p-4 transition-colors hover:border-primary">
                <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <link.icon className="size-5" />
                </div>
                <p className="mt-3 text-sm font-medium leading-snug">{link.label}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Card>

      <GuidedTour steps={TOUR_STEPS} open={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
