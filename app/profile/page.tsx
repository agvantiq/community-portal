"use client";

import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRole } from "@/components/shell/role-provider";
import { useSavedItems } from "@/lib/saved-items";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { TrackingPathCard, resolveTrackedPath } from "@/components/tracking-path-card";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href}>
      <Card className="h-full border border-border p-5 shadow-none transition-colors hover:border-primary">
        {/* Same stat caption as the admin dashboard's metric cards. */}
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      </Card>
    </Link>
  );
}

export default function ProfilePage() {
  const { info, role } = useRole();
  const { items: savedItems } = useSavedItems();
  const { courses, isRegistered } = useRegisteredCourses();
  const trackedPath = resolveTrackedPath(false, isRegistered);

  // The signed-out preview has no profile to show.
  if (role === "onboarding") {
    return (
      <div className="space-y-6">
        <PageHero
          title="Your profile"
          description="Sign in to see your profile, certification progress, and saved items."
          actions={
            <Button asChild>
              <Link href="/">Go to sign in</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <PageHero
        title="Your profile"
        description="How you appear to the rest of the Vantiq partner community."
      />

      {/* Identity card and the stat tiles are one "at a glance" block, so they
          stay tight; certification progress below is a separate section. */}
      <Card className="shadow-card mb-4 flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-secondary-foreground">
          {initials(info.user.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">{info.user.name}</h2>
            <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
              {info.label}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {info.user.title}
            {info.user.org ? ` · ${info.user.org}` : ""}
          </p>
          {info.user.email && (
            <p className="mt-0.5 text-sm text-muted-foreground">{info.user.email}</p>
          )}
        </div>
        <div className="shrink-0">
          <Button variant="outline" asChild>
            <Link href="/settings">Edit profile</Link>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Saved Items" value={savedItems.length} href="/saved-items" />
        <StatCard label="Courses" value={courses.length} href="/academy/courses" />
      </div>

      <div>
        <SectionHeading>Certification progress</SectionHeading>
        <TrackingPathCard path={trackedPath} celebrateOnComplete={role === "employee"} />
      </div>
    </div>
  );
}
