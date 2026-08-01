"use client";

import * as React from "react";
import { toast } from "sonner";
import { COURSE_CATALOG, type CatalogCourse } from "@/lib/sample-data";

const STORAGE_KEY = "community-portal-registered-courses";

function dedupe(courses: CatalogCourse[]): CatalogCourse[] {
  return Array.from(new Map(courses.map((c) => [c.id, c])).values());
}

// Drop entries whose id no longer resolves in the current catalog — stale
// localStorage from an earlier course-id scheme otherwise sits forever next
// to the same course registered again under its current id, showing up as a
// visual duplicate (same title, different id).
function pruneStale(courses: CatalogCourse[]): CatalogCourse[] {
  return courses.filter((c) => COURSE_CATALOG.some((cc) => cc.id === c.id));
}

interface RegisteredCoursesContextValue {
  courses: CatalogCourse[];
  isRegistered: (id: string) => boolean;
  register: (course: CatalogCourse) => void;
  registerMany: (courses: CatalogCourse[], successMessage: string) => void;
  deregister: (id: string) => void;
}

const RegisteredCoursesContext = React.createContext<RegisteredCoursesContextValue | null>(null);

export function RegisteredCoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = React.useState<CatalogCourse[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const cleaned = pruneStale(dedupe(parsed));
        setCourses(cleaned);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  // Functional updates (rather than closing over `courses`) so two updates
  // fired in quick succession — e.g. an individual "Register" click landing
  // right after a "Register for all N courses" bulk click — always apply on
  // top of each other instead of one clobbering the other's stale base.
  const persist = React.useCallback((updater: (prev: CatalogCourse[]) => CatalogCourse[]) => {
    setCourses((prev) => {
      const next = dedupe(updater(prev));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isRegistered = React.useCallback((id: string) => courses.some((c) => c.id === id), [courses]);

  const register = React.useCallback((course: CatalogCourse) => {
    persist((prev) => (prev.some((c) => c.id === course.id) ? prev : [...prev, course]));
    toast.success(`"${course.title}" has been added to your Learning Dashboard.`);
  }, [persist]);

  const registerMany = React.useCallback(
    (newCourses: CatalogCourse[], successMessage: string) => {
      persist((prev) => {
        const toAdd = newCourses.filter((nc) => !prev.some((c) => c.id === nc.id));
        return toAdd.length === 0 ? prev : [...prev, ...toAdd];
      });
      toast.success(successMessage);
    },
    [persist]
  );

  const deregister = React.useCallback(
    (id: string) => {
      const course = courses.find((c) => c.id === id);
      persist((prev) => prev.filter((c) => c.id !== id));
      if (course) toast.success(`"${course.title}" has been removed from your Learning Dashboard.`);
    },
    [courses, persist]
  );

  const value = React.useMemo(
    () => ({ courses, isRegistered, register, registerMany, deregister }),
    [courses, isRegistered, register, registerMany, deregister]
  );

  return (
    <RegisteredCoursesContext.Provider value={value}>{children}</RegisteredCoursesContext.Provider>
  );
}

export function useRegisteredCourses() {
  const ctx = React.useContext(RegisteredCoursesContext);
  if (!ctx) throw new Error("useRegisteredCourses must be used within a RegisteredCoursesProvider");
  return ctx;
}
