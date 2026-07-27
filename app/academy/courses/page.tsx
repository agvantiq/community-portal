"use client";

import * as React from "react";
import Link from "next/link";
import { useRole } from "@/components/shell/role-provider";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { COURSES, type CatalogCourse } from "@/lib/sample-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Clock, GraduationCap, ListChecks, Search } from "lucide-react";

// Pastel tints of the portal's own palette (primary/emphasis/info/warning at
// low opacity over secondary/accent) so every card reads on-brand rather than
// like a stock gradient set, and stays legible under dark-teal foreground text.
const BANNER_GRADIENTS = [
  "from-primary/25 via-secondary to-accent",
  "from-emphasis/20 via-accent to-secondary",
  "from-info/20 via-secondary to-accent",
  "from-warning/20 via-accent to-secondary",
  "from-critical/15 via-secondary to-accent",
];

type SortKey = "latest" | "title" | "duration";
type TypeFilter = "course" | "path";

interface PathCard {
  id: string;
  label: string;
  description: string;
}

const TECHNICAL_PATH_CARD: PathCard = {
  id: "technical",
  label: "Technical Enablement Track",
  description: "The full 90-day roadmap — courses, coaching, and shadowing in sequence.",
};
const SALES_PATH_CARD: PathCard = {
  id: "sales",
  label: "Sales Enablement Track",
  description: "The full 90-day roadmap — courses, coaching, and workshops in sequence.",
};

function durationMinutes(duration: string) {
  const hours = duration.match(/(\d+)h/);
  const minutes = duration.match(/(\d+)m/);
  return (hours ? parseInt(hours[1], 10) * 60 : 0) + (minutes ? parseInt(minutes[1], 10) : 0);
}

function CourseCard({ course, gradient }: { course: CatalogCourse; gradient: string }) {
  const { isRegistered, register } = useRegisteredCourses();
  const registered = isRegistered(course.id);

  return (
    <Card
      id={`course-${course.id}`}
      className="shadow-card scroll-mt-6 h-full overflow-hidden border-none p-0"
    >
      <div className={`flex h-36 flex-col justify-end bg-linear-to-br ${gradient} p-5`}>
        <span className="flex w-fit items-center gap-1.5 rounded-md bg-card/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
          <GraduationCap className="size-3" />
          Vantiq Academy
        </span>
        <h3 className="mt-3 line-clamp-2 border-b-2 border-foreground/20 pb-2 text-lg leading-tight font-bold text-foreground">
          {course.title}
        </h3>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-xs text-muted-foreground">{course.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {course.duration}
          </span>
          <Button
            size="sm"
            variant={registered ? "secondary" : "default"}
            disabled={registered}
            onClick={() => register(course)}
          >
            {registered ? "Registered" : "Register"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function CoursesPage() {
  const { role } = useRole();
  const isSales = role === "sales-partner";
  const isEmployee = role === "employee";
  const courses = isEmployee
    ? [...COURSES.technical, ...COURSES.sales]
    : isSales
      ? COURSES.sales
      : COURSES.technical;
  const pathCards = isEmployee ? [TECHNICAL_PATH_CARD, SALES_PATH_CARD] : [isSales ? SALES_PATH_CARD : TECHNICAL_PATH_CARD];

  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("latest");
  const [type, setType] = React.useState<TypeFilter>("course");

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
      <div>
        <Link href="/academy" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Learning Hub
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">All Courses</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEmployee
            ? "Every course across both the Technical and Sales Enablement Tracks, in one place."
            : isSales
              ? "Every course in your Sales Enablement Track, in one place."
              : "Every course in your Technical Enablement Track, in one place."}
        </p>
      </div>

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
            <div className="flex flex-wrap gap-6">
              {pathCards.map((p) => (
                <Link key={p.id} href="/academy" className="group block max-w-sm flex-1 basis-72">
                  <Card className="shadow-card overflow-hidden border-none p-0 transition-shadow hover:shadow-lg">
                    <div className="flex h-36 flex-col justify-end bg-linear-to-br from-emphasis/20 via-secondary to-accent p-5">
                      <span className="flex w-fit items-center gap-1.5 rounded-md bg-card/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
                        <ListChecks className="size-3" />
                        Vantiq Academy
                      </span>
                      <h3 className="mt-3 border-b-2 border-foreground/20 pb-2 text-lg leading-tight font-bold text-foreground">
                        {p.label}
                      </h3>
                    </div>
                    <div className="flex items-start justify-between gap-3 p-4">
                      <p className="text-xs text-muted-foreground">{p.description}</p>
                      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses match your search.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sorted.map((course, i) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  gradient={BANNER_GRADIENTS[i % BANNER_GRADIENTS.length]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
