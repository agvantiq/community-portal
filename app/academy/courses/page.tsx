"use client";

import * as React from "react";
import Link from "next/link";
import {
  COURSE_CATALOG,
  TECHNICAL_PATHS,
  SALES_FOUNDATIONS_TRACK,
  SALES_EXECUTION_TRACK,
  SALES_TECHNICAL_DEPTH_TRACK,
} from "@/lib/sample-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { CourseCard, COURSE_CARD_GRADIENTS } from "@/components/course-card";
import { GuestRegisterLock } from "@/components/guest-register-lock";
import { useRole } from "@/components/shell/role-provider";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { ChevronDown, Search, X } from "lucide-react";

type CategoryFilter = "all" | "technical" | "sales" | "electives";

// One filter entry per technical path, plus a single "Sales Training" entry
// that aggregates the three Sales Enablement tracks shown on the actual
// Sales Training Paths page (/academy/paths/sales-training) — not the
// separate, older standalone Sales Rep path (SALES_PATH), whose courses
// don't live under Sales Training Paths and so shouldn't surface here.
const PATH_FILTERS = [
  ...TECHNICAL_PATHS.map((p) => ({ id: p.id, label: p.label, matchIds: [p.id] })),
  {
    id: "sales-training",
    label: "Sales Training",
    matchIds: [SALES_FOUNDATIONS_TRACK.id, SALES_EXECUTION_TRACK.id, SALES_TECHNICAL_DEPTH_TRACK.id],
  },
];

const ALL_TAGS = Array.from(new Set(COURSE_CATALOG.flatMap((c) => c.tags))).sort();

export default function CoursesPage() {
  const { isRegistered, registerMany } = useRegisteredCourses();
  const { role } = useRole();

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<CategoryFilter>("all");
  const [selectedPathIds, setSelectedPathIds] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  function togglePath(id: string) {
    setSelectedPathIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const filtered = COURSE_CATALOG.filter((c) => {
    const matchesQuery = `${c.title} ${c.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === "all" || (category === "electives" ? c.elective === true : c.category === category);
    const matchesPaths =
      selectedPathIds.length === 0 ||
      selectedPathIds.some((id) => {
        const filter = PATH_FILTERS.find((f) => f.id === id);
        return filter ? filter.matchIds.some((pid) => c.pathIds.includes(pid)) : false;
      });
    const matchesTags = selectedTags.length === 0 || selectedTags.every((t) => c.tags.includes(t));
    return matchesQuery && matchesCategory && matchesPaths && matchesTags;
  });

  const singleFilter =
    selectedPathIds.length === 1 ? PATH_FILTERS.find((f) => f.id === selectedPathIds[0]) : undefined;
  const pathCourses = singleFilter
    ? COURSE_CATALOG.filter((c) => singleFilter.matchIds.some((pid) => c.pathIds.includes(pid)))
    : [];
  const pathFullyRegistered = pathCourses.length > 0 && pathCourses.every((c) => isRegistered(c.id));

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
      >
        {role !== "onboarding" && (
          <BookmarkButton
            item={{ id: "/academy/courses", label: "Courses Catalog", href: "/academy/courses", iconKey: "GraduationCap" }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      <div className="space-y-4">
        {/* Search and path/tag filters share one toolbar row instead of a
            second sidebar — the page nav on the left stays the only rail.
            Paths and tags are the two high-cardinality filters (6 and 15+
            options), so they live behind a count-badged popover rather than
            crowding the row when nothing's selected. */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="pl-9"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                Paths
                {selectedPathIds.length > 0 && (
                  <Badge className="rounded-full px-1.5 py-0 text-xs">{selectedPathIds.length}</Badge>
                )}
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-2">
              <div className="space-y-0.5">
                {PATH_FILTERS.map((path) => (
                  <label
                    key={path.id}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                  >
                    <Checkbox
                      checked={selectedPathIds.includes(path.id)}
                      onCheckedChange={() => togglePath(path.id)}
                    />
                    {path.label}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                Tags
                {selectedTags.length > 0 && (
                  <Badge className="rounded-full px-1.5 py-0 text-xs">{selectedTags.length}</Badge>
                )}
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-2">
              <div className="space-y-0.5">
                {ALL_TAGS.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                  >
                    <Checkbox checked={selectedTags.includes(tag)} onCheckedChange={() => toggleTag(tag)} />
                    {tag}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Tabs value={category} onValueChange={(v) => setCategory(v as CategoryFilter)}>
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="electives">Electives</TabsTrigger>
          </TabsList>
        </Tabs>

        {(selectedPathIds.length > 0 || selectedTags.length > 0) && (
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedPathIds.map((id) => {
              const path = PATH_FILTERS.find((f) => f.id === id);
              if (!path) return null;
              return (
                <Badge key={id} variant="secondary" className="gap-1 py-1 pr-1 pl-2.5">
                  {path.label}
                  <button
                    type="button"
                    onClick={() => togglePath(id)}
                    aria-label={`Remove ${path.label} filter`}
                    className="rounded-full p-0.5 hover:bg-foreground/10"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              );
            })}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 py-1 pr-1 pl-2.5">
                {tag}
                <button
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-label={`Remove ${tag} filter`}
                  className="rounded-full p-0.5 hover:bg-foreground/10"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            <button
              type="button"
              onClick={() => {
                setSelectedPathIds([]);
                setSelectedTags([]);
              }}
              className="text-xs font-medium text-muted-foreground underline hover:text-foreground"
            >
              Clear all
            </button>
          </div>
        )}

        {singleFilter && (
          <Card className="shadow-card flex flex-wrap items-center justify-between gap-3 p-4">
            <p className="text-sm text-foreground">
              Register for all {pathCourses.length} courses in the {singleFilter.label} Path
            </p>
            {role === "guest" ? (
              <GuestRegisterLock compact />
            ) : (
              <Button
                size="sm"
                variant={pathFullyRegistered ? "secondary" : "default"}
                disabled={pathFullyRegistered}
                onClick={() =>
                  registerMany(
                    pathCourses,
                    `Registered for all ${pathCourses.length} courses in the ${singleFilter.label} Path.`
                  )
                }
              >
                {pathFullyRegistered ? "Registered" : "Register"}
              </Button>
            )}
          </Card>
        )}

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No courses match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                gradient={COURSE_CARD_GRADIENTS[i % COURSE_CARD_GRADIENTS.length]}
                showBadge={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
