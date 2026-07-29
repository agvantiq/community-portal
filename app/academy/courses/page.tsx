"use client";

import * as React from "react";
import Link from "next/link";
import {
  COURSES,
  TECHNICAL_PATHS,
  SALES_SPRINT,
  type CatalogCourse,
  type TechnicalPath,
} from "@/lib/sample-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { CourseCard, COURSE_CARD_GRADIENTS } from "@/components/course-card";
import { useRegisteredCourses } from "@/lib/registered-courses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  GraduationCap,
  ListChecks,
  PlayCircle,
  Search,
} from "lucide-react";

type SortKey = "latest" | "title" | "duration";
type TypeFilter = "course" | "path";

function durationMinutes(duration: string) {
  const hours = duration.match(/(\d+)h/);
  const minutes = duration.match(/(\d+)m/);
  return (hours ? parseInt(hours[1], 10) * 60 : 0) + (minutes ? parseInt(minutes[1], 10) : 0);
}

function ModuleStatusIcon({ status }: { status: "done" | "current" | "upcoming" }) {
  if (status === "done") return <CheckCircle2 className="size-4 shrink-0 text-success" />;
  if (status === "current") return <PlayCircle className="size-4 shrink-0 text-primary" />;
  return <Circle className="size-4 shrink-0 text-muted-foreground" />;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** A path's modules aren't catalog courses (no id/description/duration) — synthesize
 * catalog-shaped entries so "Register" can enroll them through the same store the
 * course catalog uses. */
function pathToCourses(path: TechnicalPath): CatalogCourse[] {
  return path.modules.map((mod) => ({
    id: `${path.id}--${slugify(mod.title)}`,
    title: mod.title,
    description: mod.note ?? `Part of the ${path.label} Path.`,
    duration: "Self-paced",
    level: "Intermediate",
  }));
}

/** One collapsible "block" for a path or sales phase — collapsed by default, expands in place. */
function PathBlock({
  title,
  subtitle,
  defaultOpen,
  headerRight,
  children,
}: {
  title: string;
  subtitle: string;
  defaultOpen?: boolean;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <Card className="shadow-card overflow-hidden p-0">
      <div className="flex items-center gap-3 p-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
        >
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {headerRight}
      </div>
      {open && <div className="space-y-2 px-6 pb-6">{children}</div>}
    </Card>
  );
}

export default function CoursesPage() {
  // Every signed-in role sees the same catalog and the same paths — only a
  // guest (not yet registered) doesn't reach this page's content.
  const courses = [...COURSES.technical, ...COURSES.sales];

  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("latest");
  const [type, setType] = React.useState<TypeFilter>("course");
  const { isRegistered, registerMany } = useRegisteredCourses();

  const filtered = courses.filter((c) =>
    `${c.title} ${c.description}`.toLowerCase().includes(query.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "duration") return durationMinutes(a.duration) - durationMinutes(b.duration);
    return 0;
  });

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/academy" className="hover:text-foreground">
            &larr; Learning Hub
          </Link>
        }
        title="All Courses"
        description="Every course across both the Technical and Sales Enablement Tracks, in one place."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Search</p>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Sort</p>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="title">Title A&ndash;Z</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Type</p>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setType("path")}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                  type === "path"
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <ListChecks className="size-4" />
                Learning Path
              </button>
              <button
                type="button"
                onClick={() => setType("course")}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                  type === "course"
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <GraduationCap className="size-4" />
                Course
              </button>
            </div>
          </div>
        </div>

        <div>
          {type === "path" ? (
            <div className="space-y-8">
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Technical Paths
                </h2>
                <div className="space-y-3">
                  {TECHNICAL_PATHS.map((path) => {
                    const pathCourses = pathToCourses(path);
                    const fullyRegistered = pathCourses.every((c) => isRegistered(c.id));
                    return (
                    <PathBlock
                      key={path.id}
                      title={`${path.label} Path`}
                      subtitle={`${path.modules.length} courses · recommended order, not required`}
                      headerRight={
                        <Button
                          size="sm"
                          variant={fullyRegistered ? "secondary" : "default"}
                          disabled={fullyRegistered}
                          onClick={() =>
                            registerMany(
                              pathCourses,
                              `Registered for all ${pathCourses.length} courses in the ${path.label} Path.`
                            )
                          }
                        >
                          {fullyRegistered ? "Registered" : "Register"}
                        </Button>
                      }
                    >
                      {path.modules.map((mod) => (
                        <div
                          key={mod.title}
                          className="flex flex-col gap-1 rounded-md border border-border p-3 text-sm text-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <ModuleStatusIcon status={mod.status} />
                            <span className="flex-1">{mod.title}</span>
                            {mod.status === "current" && mod.progress !== undefined && (
                              <span className="shrink-0 text-xs text-muted-foreground">{mod.progress}%</span>
                            )}
                          </div>
                          {mod.note && <p className="pl-6 text-xs text-muted-foreground">{mod.note}</p>}
                        </div>
                      ))}
                    </PathBlock>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sales Path
                </h2>
                <div className="space-y-3">
                  {SALES_SPRINT.map((phase) => (
                    <PathBlock
                      key={phase.id}
                      title={phase.label}
                      subtitle={`${phase.tasks.length} items · ${phase.timeframe}`}
                      defaultOpen={phase.status === "current"}
                    >
                      {phase.tasks.map((task) => (
                        <div
                          key={task}
                          className="flex items-center gap-2 rounded-md border border-border p-3 text-sm text-foreground"
                        >
                          <ModuleStatusIcon status={phase.status === "done" ? "done" : "upcoming"} />
                          <span className="flex-1">{task}</span>
                        </div>
                      ))}
                    </PathBlock>
                  ))}
                </div>
              </div>
            </div>
          ) : sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses match your search.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sorted.map((course, i) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  gradient={COURSE_CARD_GRADIENTS[i % COURSE_CARD_GRADIENTS.length]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
