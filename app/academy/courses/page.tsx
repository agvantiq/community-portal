"use client";

import * as React from "react";
import Link from "next/link";
import { COURSE_CATALOG, ALL_PATHS } from "@/lib/sample-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Search } from "lucide-react";

type SortKey = "latest" | "title" | "duration";
type CategoryFilter = "all" | "technical" | "sales";

function durationMinutes(duration: string) {
  const hours = duration.match(/(\d+)h/);
  const minutes = duration.match(/(\d+)m/);
  return (hours ? parseInt(hours[1], 10) * 60 : 0) + (minutes ? parseInt(minutes[1], 10) : 0);
}

const ALL_TAGS = Array.from(new Set(COURSE_CATALOG.flatMap((c) => c.tags))).sort();

export default function CoursesPage() {
  const { isRegistered, registerMany } = useRegisteredCourses();

  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("latest");
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
    const matchesCategory = category === "all" || c.category === category;
    const matchesPaths = selectedPathIds.length === 0 || selectedPathIds.some((id) => c.pathIds.includes(id));
    const matchesTags = selectedTags.length === 0 || selectedTags.every((t) => c.tags.includes(t));
    return matchesQuery && matchesCategory && matchesPaths && matchesTags;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "duration") return durationMinutes(a.duration) - durationMinutes(b.duration);
    return 0;
  });

  const singlePath =
    selectedPathIds.length === 1 ? ALL_PATHS.find((p) => p.id === selectedPathIds[0]) : undefined;
  const pathCourses = singlePath ? COURSE_CATALOG.filter((c) => c.pathIds.includes(singlePath.id)) : [];
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
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
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
            <p className="text-xs font-medium text-foreground">Category</p>
            <div className="space-y-1">
              {([
                ["all", "All Courses"],
                ["technical", "Technical"],
                ["sales", "Sales"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCategory(value)}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                    category === value
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Paths</p>
            <div className="space-y-1">
              {ALL_PATHS.map((path) => (
                <label
                  key={path.id}
                  className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-foreground hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={selectedPathIds.includes(path.id)}
                    onChange={() => togglePath(path.id)}
                    className="size-4 rounded border-input accent-primary"
                  />
                  {path.label}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map((tag) => (
                <Badge key={tag} asChild variant={selectedTags.includes(tag) ? "default" : "secondary"}>
                  <button type="button" onClick={() => toggleTag(tag)}>
                    {tag}
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          {singlePath && (
            <Card className="shadow-card mb-4 flex flex-wrap items-center justify-between gap-3 p-4">
              <p className="text-sm text-foreground">
                Register for all {pathCourses.length} courses in the {singlePath.label} Path
              </p>
              <Button
                size="sm"
                variant={pathFullyRegistered ? "secondary" : "default"}
                disabled={pathFullyRegistered}
                onClick={() =>
                  registerMany(
                    pathCourses,
                    `Registered for all ${pathCourses.length} courses in the ${singlePath.label} Path.`
                  )
                }
              >
                {pathFullyRegistered ? "Registered" : "Register"}
              </Button>
            </Card>
          )}

          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses match your filters.</p>
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
