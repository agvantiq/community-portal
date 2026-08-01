"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RoadmapStepper } from "@/components/roadmap-stepper";
import { BookmarkButton } from "@/components/bookmark-button";
import { ContentRequestDialog } from "@/components/content-request-dialog";
import { CourseCard, COURSE_CARD_GRADIENTS } from "@/components/course-card";
import { useRole } from "@/components/shell/role-provider";
import Link from "next/link";
import {
  SALES_SPRINT,
  TECHNICAL_SPRINT,
  TECHNICAL_PATHS,
  SALES_PATH,
  DEFAULT_TECHNICAL_PATH_ID,
  COURSE_CATALOG,
  getCourseById,
} from "@/lib/sample-data";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

export default function AcademyPage() {
  const { role } = useRole();
  const isSales = role === "sales-partner";

  // RoleProvider resolves the persisted role from localStorage only after the
  // first render (it starts from a hardcoded default), so anything seeded
  // from `isSales` at useState-init time would freeze on that first, often
  // wrong, value. Defaulting to null and falling back to a value computed
  // fresh on every render keeps these in sync once the real role settles.
  const [selectedTabIdOverride, setSelectedTabIdOverride] = React.useState<string | null>(null);
  const selectedTabId = selectedTabIdOverride ?? (isSales ? SALES_PATH.id : DEFAULT_TECHNICAL_PATH_ID);

  const sprint = isSales ? SALES_SPRINT : TECHNICAL_SPRINT;
  const currentPhase = sprint.find((p) => p.status === "current") ?? sprint[0];
  // Every signed-in role sees the same catalog — no separation between what a
  // technical vs. sales partner can browse here.
  const courses = COURSE_CATALOG;

  // The path(s) this role is enrolled in, always led by their real default
  // (with actual progress) — plus a couple of sample paths alongside it so
  // the multi-path switcher still has something to demo. Not the full
  // five-path catalog; that stays one click away via Courses.
  const defaultTechnicalPath = TECHNICAL_PATHS.find((p) => p.id === DEFAULT_TECHNICAL_PATH_ID)!;
  const otherTechnicalPaths = TECHNICAL_PATHS.filter((p) => p.id !== defaultTechnicalPath.id);
  const enrolledPaths = isSales
    ? [SALES_PATH, ...otherTechnicalPaths.slice(0, 2)]
    : role === "employee"
      ? [defaultTechnicalPath, SALES_PATH]
      : [defaultTechnicalPath, ...otherTechnicalPaths.slice(0, 2)];

  const activePath = enrolledPaths.find((p) => p.id === selectedTabId) ?? enrolledPaths[0];
  const isSalesPathSelected = activePath.id === SALES_PATH.id;

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Learning Hub"
        title={isSales ? "Sales Enablement Track" : "Technical Enablement Track"}
        description={
          isSales
            ? "The 90-day sprint from foundation to revenue — enabling you to sell, scope, and create repeatable solutions independently."
            : "Five recommended learning paths, at your own pace — building toward Vantiq Certified Partner status."
        }
        actions={
          <ContentRequestDialog
            source="Learning Hub"
            dialogDescription="New courses, content updates, or ideas for the Learning Hub."
            requestTypes={["New Course", "Content Update", "Enhancement Idea", "Other"]}
          />
        }
      >
        <BookmarkButton
          item={{ id: "/academy", label: "Certification Roadmap", href: "/academy", iconKey: "GraduationCap" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <Card className="shadow-card p-6">
        <h2 className="mb-5 text-sm font-medium text-foreground">90-Day Sprint</h2>
        <RoadmapStepper steps={sprint} />
      </Card>

      <Card className="shadow-card p-6">
        {enrolledPaths.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {enrolledPaths.map((p) => (
              <Button
                key={p.id}
                type="button"
                size="sm"
                variant={p.id === selectedTabId ? "default" : "outline"}
                onClick={() => setSelectedTabIdOverride(p.id)}
              >
                {p.label}
              </Button>
            ))}
          </div>
        )}
        <h2 className="mb-1 text-sm font-medium text-foreground">
          {isSalesPathSelected ? SALES_PATH.label : `${activePath.label} Path`}
        </h2>
        {!isSalesPathSelected && (
          <p className="mb-4 text-xs text-muted-foreground">
            Recommended order — take these courses at your own pace, in any sequence.
          </p>
        )}
        <div className={!isSalesPathSelected ? "space-y-3" : "mt-4 space-y-3"}>
          {activePath.modules.map((mod) => {
            const course = getCourseById(mod.courseId);
            if (!course) return null;
            return (
              <div key={mod.courseId} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {mod.status === "done" && <CheckCircle2 className="size-4 text-success" />}
                    {mod.status === "current" && <PlayCircle className="size-4 text-primary" />}
                    {mod.status === "upcoming" && <Circle className="size-4 shrink-0 text-muted-foreground" />}
                    {course.title}
                  </span>
                  {mod.status === "done" && (
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      Complete
                    </Badge>
                  )}
                  {mod.status === "current" && (
                    <Badge variant="secondary" className="bg-info/10 text-info">
                      In progress
                    </Badge>
                  )}
                </div>
                {mod.status === "current" && mod.progress && (
                  <Progress value={mod.progress} className="mt-3 h-1.5" />
                )}
                {mod.note && <p className="mt-2 text-xs text-muted-foreground">{mod.note}</p>}
              </div>
            );
          })}
        </div>
      </Card>

      <div id="courses" className="flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">All Courses</h2>
          <Link href="/academy/courses" className="text-xs text-emphasis hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.slice(0, 4).map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              gradient={COURSE_CARD_GRADIENTS[i % COURSE_CARD_GRADIENTS.length]}
              showBadge={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
