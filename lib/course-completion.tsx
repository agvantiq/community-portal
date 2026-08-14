"use client";

import * as React from "react";
import { toast } from "sonner";
import { COURSE_CATALOG } from "@/lib/sample-data";

const STORAGE_KEY = "community-portal-completed-courses";

// Drop ids that no longer resolve in the current catalog, same reasoning as
// registered-courses.tsx's pruneStale — an id renamed or retired shouldn't
// linger in storage forever.
function pruneStale(ids: string[]): string[] {
  return ids.filter((id) => COURSE_CATALOG.some((c) => c.id === id));
}

interface CourseCompletionContextValue {
  completedIds: string[];
  isCompleted: (id: string) => boolean;
  markComplete: (courseId: string, courseTitle: string) => void;
}

const CourseCompletionContext = React.createContext<CourseCompletionContextValue | null>(null);

export function CourseCompletionProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    let parsed: string[] = [];
    if (stored) {
      try {
        const raw = JSON.parse(stored);
        if (Array.isArray(raw)) parsed = raw;
      } catch {
        // ignore malformed storage
      }
    }
    setCompletedIds(pruneStale(parsed));
  }, []);

  const isCompleted = React.useCallback((id: string) => completedIds.includes(id), [completedIds]);

  const markComplete = React.useCallback((courseId: string, courseTitle: string) => {
    setCompletedIds((prev) => {
      if (prev.includes(courseId)) return prev;
      const next = [...prev, courseId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    toast.success(`"${courseTitle}" marked complete.`);
  }, []);

  const value = React.useMemo(
    () => ({ completedIds, isCompleted, markComplete }),
    [completedIds, isCompleted, markComplete]
  );

  return <CourseCompletionContext.Provider value={value}>{children}</CourseCompletionContext.Provider>;
}

export function useCourseCompletion() {
  const ctx = React.useContext(CourseCompletionContext);
  if (!ctx) throw new Error("useCourseCompletion must be used within a CourseCompletionProvider");
  return ctx;
}
