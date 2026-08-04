"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { GuidedTour, type TourStep } from "@/components/guided-tour";
import { ProfileSetupDialog } from "@/components/profile-setup-dialog";
import { TrackingPathCard } from "@/components/tracking-path-card";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { Bookmark, Megaphone } from "lucide-react";

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
];

const CHECKLIST_ITEMS = [
  {
    id: "profile",
    label: "Help us personalize your experience by completing your profile",
    description: "Add your role, company, and areas of expertise.",
  },
  {
    id: "enroll",
    label: "Enroll in your first course",
    description: "Start the certification track that fits your role.",
  },
  {
    id: "tour",
    label: "Take the guided tour",
    description: "A 60-second walkthrough of the nav, search, and your checklist.",
  },
];

// Where "Enroll in your first course" sends the partner, based on the role
// they picked in the profile setup wizard.
const ENROLL_PATH_BY_ROLE: Record<string, string> = {
  build: "/academy/paths/overview",
  sell: "/academy/paths/sales-training",
};
const DEFAULT_ENROLL_PATH = "/academy/paths";

// Recommendations tailored to the industry picked in the profile wizard —
// same card shape as the default dashboard's "Recommended for you".
const INDUSTRY_RECOMMENDATIONS: Record<
  string,
  { type: string; title: string; description: string; href: string }[]
> = {
  Manufacturing: [
    { type: "Course", title: "Predictive Maintenance at the Edge", description: "Design real-time inference pipelines for equipment monitoring.", href: "/academy/courses" },
    { type: "Resource", title: "Manufacturing Solution Overview", description: "Reference architecture for connected production lines.", href: "/resources" },
    { type: "Video", title: "Real-Time Production Monitoring", description: "Walkthrough from sensor to dashboard.", href: "/developer-center/how-to-videos" },
    { type: "Doc", title: "Integration Best Practices", description: "Connect external systems without breaking flow.", href: "/developer-center/documentation" },
  ],
  Energy: [
    { type: "Course", title: "Edge AI for Grid Operations", description: "Design real-time inference at the edge.", href: "/academy/courses" },
    { type: "Resource", title: "Energy & Utilities Solution Overview", description: "Reference architecture for grid monitoring.", href: "/resources" },
    { type: "Video", title: "Building Your First VAIL App", description: "Walkthrough from project setup to deploy.", href: "/developer-center/how-to-videos" },
    { type: "Doc", title: "Integration Best Practices", description: "Connect external systems without breaking flow.", href: "/developer-center/documentation" },
  ],
  Healthcare: [
    { type: "Course", title: "Edge AI Architecture Deep Dive", description: "Design real-time inference at the edge.", href: "/academy/courses" },
    { type: "Resource", title: "Healthcare Solution Overview", description: "Reference architecture for patient monitoring.", href: "/resources" },
    { type: "Video", title: "Building Your First VAIL App", description: "Walkthrough from project setup to deploy.", href: "/developer-center/how-to-videos" },
    { type: "Doc", title: "Integration Best Practices", description: "Connect external systems without breaking flow.", href: "/developer-center/documentation" },
  ],
  "Public Sector": [
    { type: "Course", title: "Real-Time Event Orchestration", description: "Fan events out across sources, rules, and downstream systems.", href: "/academy/courses" },
    { type: "Resource", title: "Public Sector Solution Overview", description: "Reference architecture for emergency response coordination.", href: "/resources" },
    { type: "Video", title: "Building Your First VAIL App", description: "Walkthrough from project setup to deploy.", href: "/developer-center/how-to-videos" },
    { type: "Doc", title: "Security & Authentication Guide", description: "Harden a Vantiq deployment for production.", href: "/developer-center/security-authentication" },
  ],
  Retail: [
    { type: "Course", title: "Building Custom Connectors", description: "Build and package a reusable extension source from scratch.", href: "/academy/courses" },
    { type: "Resource", title: "Retail Solution Overview", description: "Reference architecture for inventory and demand sensing.", href: "/resources" },
    { type: "Video", title: "Building Your First VAIL App", description: "Walkthrough from project setup to deploy.", href: "/developer-center/how-to-videos" },
    { type: "Doc", title: "Integration Best Practices", description: "Connect external systems without breaking flow.", href: "/developer-center/documentation" },
  ],
  Transportation: [
    { type: "Course", title: "Edge Deployment Patterns", description: "Provisioning, promotion, and monitoring for edge nodes.", href: "/academy/courses" },
    { type: "Resource", title: "Transportation & Logistics Solution Overview", description: "Reference architecture for fleet and route optimization.", href: "/resources" },
    { type: "Video", title: "Building Your First VAIL App", description: "Walkthrough from project setup to deploy.", href: "/developer-center/how-to-videos" },
    { type: "Doc", title: "Integration Best Practices", description: "Connect external systems without breaking flow.", href: "/developer-center/documentation" },
  ],
};

export function FirstTimeDashboard({ firstName }: { firstName: string }) {
  const router = useRouter();
  const [tourOpen, setTourOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [profileRole, setProfileRole] = React.useState<string | null>(null);
  const [profileIndustry, setProfileIndustry] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const { courses: registeredCourses } = useRegisteredCourses();
  const hasEnrolled = registeredCourses.length > 0;
  const isSalesEnrollment = registeredCourses.some((c) => c.category === "sales");

  // Registering for a path (from the Overview or Sales Training page) is
  // itself the "enrolled" signal — mark the checklist item done even if the
  // partner never came back to click its checkbox directly.
  React.useEffect(() => {
    if (hasEnrolled) setChecked((prev) => ({ ...prev, enroll: true }));
  }, [hasEnrolled]);

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="space-y-6">
      <PageHero
        title={<>Hi {firstName}, let&apos;s get you set up!</>}
        description="This is your first time here — work through your onboarding checklist below to get set up."
      />

      {hasEnrolled && <TrackingPathCard isSales={isSalesEnrollment} />}

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
                onCheckedChange={(value) => {
                  if (item.id === "profile" && value === true) {
                    setProfileOpen(true);
                    return;
                  }
                  setChecked((prev) => ({ ...prev, [item.id]: value === true }));
                  if (item.id === "tour" && value === true) setTourOpen(true);
                  if (item.id === "enroll" && value === true) {
                    router.push(profileRole ? ENROLL_PATH_BY_ROLE[profileRole] ?? DEFAULT_ENROLL_PATH : DEFAULT_ENROLL_PATH);
                  }
                }}
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
                <p
                  className={`mt-0.5 text-xs text-muted-foreground ${
                    checked[item.id] ? "line-through" : ""
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {checked.profile && (
        <>
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
              <Card className="flex flex-1 flex-col items-center justify-center gap-2 border border-border p-8 text-center shadow-none">
                <Bookmark className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">No saved items yet</p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  Click the bookmark icon on any hub page to pin it here for quick access.
                </p>
              </Card>
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
              <Card className="flex flex-1 flex-col items-center justify-center gap-2 border border-border p-8 text-center shadow-none">
                <Megaphone className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">No announcements yet</p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  Partner news and updates will show up here.
                </p>
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
              {(profileIndustry ? INDUSTRY_RECOMMENDATIONS[profileIndustry] : []).map((rec) => (
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
        </>
      )}

      <GuidedTour steps={TOUR_STEPS} open={tourOpen} onClose={() => setTourOpen(false)} />
      <ProfileSetupDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        onComplete={(role, industry) => {
          setChecked((prev) => ({ ...prev, profile: true }));
          setProfileRole(role);
          setProfileIndustry(industry);
          setProfileOpen(false);
        }}
      />
    </div>
  );
}
