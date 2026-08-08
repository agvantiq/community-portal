"use client";

import * as React from "react";
import { toast } from "sonner";
import { COURSE_CATALOG, type CatalogCourse } from "@/lib/sample-data";

const STORAGE_KEY = "community-portal-registered-courses";

// Everyone is enrolled in the Foundations course by default — it's the
// "all paths start here" prerequisite and has its own standalone tab in the
// Learning Hub, so there's no state where a signed-in user hasn't got it.
const AUTO_REGISTERED_COURSE_IDS = ["foundation-course"];

function withAutoRegistered(courses: CatalogCourse[]): CatalogCourse[] {
  const missing = AUTO_REGISTERED_COURSE_IDS.filter((id) => !courses.some((c) => c.id === id))
    .map((id) => COURSE_CATALOG.find((c) => c.id === id))
    .filter((c): c is CatalogCourse => !!c);
  return missing.length === 0 ? courses : [...missing, ...courses];
}

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
  deregisterMany: (ids: string[], successMessage: string) => void;
  /**
   * Forces exactly `doneCourseIds` (a subset of `pathCourses`) to be
   * registered, silently — no toast. Used to seed a deterministic demo
   * progress state for a tracked path (e.g. Partner = midway, Employee =
   * complete) when the role-switcher preview changes; a real user action
   * always goes through register/deregister instead. Courses outside
   * `pathCourses` are left untouched.
   */
  setPathProgress: (pathCourses: CatalogCourse[], doneCourseIds: string[]) => void;
}

const RegisteredCoursesContext = React.createContext<RegisteredCoursesContextValue | null>(null);

export function RegisteredCoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = React.useState<CatalogCourse[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    let parsed: CatalogCourse[] = [];
    if (stored) {
      try {
        const raw = JSON.parse(stored);
        if (Array.isArray(raw)) parsed = raw;
      } catch {
        // ignore malformed storage
      }
    }
    // Runs even with nothing stored, so a brand-new visitor still starts out
    // enrolled in the auto-registered course(s).
    const cleaned = withAutoRegistered(pruneStale(dedupe(parsed)));
    setCourses(cleaned);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  }, []);

  // Functional updates (rather than closing over `courses`) so two updates
  // fired in quick succession — e.g. an individual "Register" click landing
  // right after a "Register for all N courses" bulk click — always apply on
  // top of each other instead of one clobbering the other's stale base.
  // withAutoRegistered runs on every write so nothing — deregister, or the
  // role switcher's setPathProgress — can drop the always-enrolled course.
  const persist = React.useCallback((updater: (prev: CatalogCourse[]) => CatalogCourse[]) => {
    setCourses((prev) => {
      const next = withAutoRegistered(dedupe(updater(prev)));
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

  const deregisterMany = React.useCallback(
    (ids: string[], successMessage: string) => {
      persist((prev) => prev.filter((c) => !ids.includes(c.id)));
      toast.success(successMessage);
    },
    [persist]
  );

  const setPathProgress = React.useCallback(
    (pathCourses: CatalogCourse[], doneCourseIds: string[]) => {
      persist((prev) => {
        const outsidePath = prev.filter((c) => !pathCourses.some((pc) => pc.id === c.id));
        const done = pathCourses.filter((c) => doneCourseIds.includes(c.id));
        return [...outsidePath, ...done];
      });
    },
    [persist]
  );

  const value = React.useMemo(
    () => ({ courses, isRegistered, register, registerMany, deregister, deregisterMany, setPathProgress }),
    [courses, isRegistered, register, registerMany, deregister, deregisterMany, setPathProgress]
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
