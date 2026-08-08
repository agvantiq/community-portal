"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { BookmarkButton } from "@/components/bookmark-button";
import { ContentRequestDialog } from "@/components/content-request-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  PathCourseList,
  CourseOutlineCard,
  FOUNDATION_STANDALONE_COURSE_ID,
} from "@/components/path-course-list";
import { useRole } from "@/components/shell/role-provider";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { useDismissedPaths } from "@/lib/dismissed-paths";
import { cn } from "@/lib/utils";
import { ALL_PATHS, getCourseById, type TechnicalPath } from "@/lib/sample-data";

export default function AcademyPage() {
  const { role } = useRole();
  const { courses: registeredCourses, deregisterMany } = useRegisteredCourses();
  const { dismissed, dismiss } = useDismissedPaths();

  const foundationCourse = getCourseById(FOUNDATION_STANDALONE_COURSE_ID);

  // Real enrollment only — a path shows up here because the partner has
  // actually registered a course specific to it, not from a curated "sample"
  // list. The Foundations course opens every path and everyone is
  // auto-enrolled in it, so it can't be the signal on its own or literally
  // every partner would see every path; only a course beyond it counts.
  const enrolledPaths = ALL_PATHS.filter(
    (p) =>
      !dismissed.includes(p.id) &&
      p.modules.some(
        (m) =>
          m.courseId !== FOUNDATION_STANDALONE_COURSE_ID &&
          registeredCourses.some((c) => c.id === m.courseId)
      )
  );

  // Foundations leads and is where everyone lands, since it's the course
  // every partner starts from; enrolled paths follow it.
  const tabs = [
    ...(foundationCourse
      ? [{ id: foundationCourse.id, label: foundationCourse.title, path: null }]
      : []),
    ...enrolledPaths.map((p) => ({ id: p.id, label: `${p.label} Path`, path: p })),
  ];

  const [selectedTabId, setSelectedTabId] = React.useState<string | null>(null);
  const activeTab = tabs.find((t) => t.id === selectedTabId) ?? tabs[0] ?? null;

  // Paths share courses (e.g. Server Developer and UI Developer both
  // include "assemblies" and "vantiq-catalog") — deregistering every course
  // this path lists would silently unenroll the partner from any other path
  // built on the same shared course, so only courses unique to this path
  // actually get removed. Foundations is excluded outright — it's the
  // shared, always-enrolled course, not something a path action should touch.
  // The path is also explicitly dismissed (see useDismissedPaths): a shared
  // course left behind for a sibling path would otherwise keep re-triggering
  // this path's own "enrolled" signal and the tab would never actually go away.
  function handleLeavePath(path: TechnicalPath) {
    const sharedElsewhere = new Set(
      ALL_PATHS.filter((p) => p.id !== path.id).flatMap((p) => p.modules.map((m) => m.courseId))
    );
    const courseIds = path.modules
      .map((m) => m.courseId)
      .filter((id) => id !== FOUNDATION_STANDALONE_COURSE_ID && !sharedElsewhere.has(id));
    deregisterMany(courseIds, `You've left the ${path.label} Path.`);
    dismiss(path.id);
  }

  return (
    <div className="space-y-6">
      <PageBanner eyebrow="Learning Hub" title="Technical Enablement Track">
        <div className="absolute right-4 top-4 flex items-center gap-1">
          <ContentRequestDialog
            source="Learning Hub"
            dialogDescription="New courses, content updates, or ideas for the Learning Hub."
            requestTypes={["New Course", "Content Update", "Enhancement Idea", "Other"]}
            triggerVariant="ghost"
            triggerSize="sm"
          />
          <BookmarkButton
            item={{ id: "/academy", label: "Certification Roadmap", href: "/academy", iconKey: "GraduationCap" }}
            className="text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        </div>
      </PageBanner>

      {role !== "guest" && activeTab && (
        <div>
          {tabs.length > 1 ? (
            // Folder tabs: the Foundations course and each enrolled path get
            // their own folder, flap left-anchored like a physical file tab —
            // matches the dashboard's path switcher, so flipping between them
            // feels the same everywhere it appears.
            <div className="flex flex-wrap items-end gap-1">
              {tabs.map((t) => {
                const isActive = t.id === activeTab.id;
                return (
                  <div
                    key={t.id}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    onClick={() => setSelectedTabId(t.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedTabId(t.id);
                      }
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-t-lg border pl-4 pr-2 py-2 text-sm transition-colors",
                      isActive
                        ? "z-10 -mb-px border-border border-b-card bg-card font-semibold text-primary"
                        : "translate-y-px border-border bg-muted/60 font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{t.label}</span>
                    {/* Only real paths can be left — the Foundations tab is the
                        always-enrolled course, not a path to unenroll from. */}
                    {t.path && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Leave ${t.path.label} Path`}
                            className="rounded p-0.5 opacity-60 transition-opacity hover:bg-foreground/10 hover:opacity-100"
                          >
                            <X className="size-3.5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Leave {t.path.label} Path?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You&apos;ll be unenrolled from its courses and this tab will disappear from the
                              Learning Hub. You can rejoin anytime from Training Paths.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleLeavePath(t.path!)}>
                              Leave Path
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mb-3">
              <span className="text-sm font-semibold text-primary">{activeTab.label}</span>
            </div>
          )}

          {activeTab.path ? (
            // Keyed per path so switching tabs remounts with that path's own
            // first course open, rather than carrying the previous tab's
            // expanded rows across.
            <PathCourseList
              key={activeTab.path.id}
              path={activeTab.path}
              squareTopLeft={tabs.length > 1}
            />
          ) : (
            foundationCourse && (
              <CourseOutlineCard course={foundationCourse} squareTopLeft={tabs.length > 1} />
            )
          )}

          {enrolledPaths.length === 0 && (
            <p className="mt-4 text-xs text-muted-foreground">
              Ready for more?{" "}
              <Link href="/academy/paths" className="font-medium text-primary hover:underline">
                Browse the training paths
              </Link>{" "}
              to add a specialization.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
