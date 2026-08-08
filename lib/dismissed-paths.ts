"use client";

import * as React from "react";

const STORAGE_KEY = "community-portal-dismissed-paths";

function readDismissed(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Which paths a partner has explicitly left, tracked separately from course
 * registration. Paths often share courses (Server Developer and UI
 * Developer both include "Assemblies"), so "some course from this path is
 * registered" can't double as "the partner left this path" — that shared
 * course might still be exactly what's keeping a sibling path enrolled.
 * Re-registering for a path clears its dismissal, since that's an explicit
 * "I'm back in" signal.
 */
export function useDismissedPaths() {
  const [dismissed, setDismissed] = React.useState<string[]>([]);

  React.useEffect(() => {
    setDismissed(readDismissed());
  }, []);

  const dismiss = React.useCallback((pathId: string) => {
    setDismissed((prev) => {
      if (prev.includes(pathId)) return prev;
      const next = [...prev, pathId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const undismiss = React.useCallback((pathId: string) => {
    setDismissed((prev) => {
      if (!prev.includes(pathId)) return prev;
      const next = prev.filter((id) => id !== pathId);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { dismissed, dismiss, undismiss };
}
