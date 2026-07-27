"use client";

import * as React from "react";
import { toast } from "sonner";
import type { CatalogCourse } from "@/lib/sample-data";

const STORAGE_KEY = "community-portal-registered-courses";

interface RegisteredCoursesContextValue {
  courses: CatalogCourse[];
  isRegistered: (id: string) => boolean;
  register: (course: CatalogCourse) => void;
}

const RegisteredCoursesContext = React.createContext<RegisteredCoursesContextValue | null>(null);

export function RegisteredCoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = React.useState<CatalogCourse[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setCourses(parsed);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const persist = React.useCallback((next: CatalogCourse[]) => {
    setCourses(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const isRegistered = React.useCallback((id: string) => courses.some((c) => c.id === id), [courses]);

  const register = React.useCallback(
    (course: CatalogCourse) => {
      if (courses.some((c) => c.id === course.id)) return;
      persist([...courses, course]);
      toast.success(`"${course.title}" has been added to your Learning Dashboard.`);
    },
    [courses, persist]
  );

  const value = React.useMemo(
    () => ({ courses, isRegistered, register }),
    [courses, isRegistered, register]
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
