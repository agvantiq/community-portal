"use client";

import * as React from "react";
import { toast } from "sonner";
import type { CommunityEvent } from "@/lib/events-data";

const STORAGE_KEY = "community-portal-registered-events";

interface RegisteredEventsContextValue {
  eventIds: string[];
  isRegistered: (id: string) => boolean;
  register: (event: CommunityEvent) => void;
  deregister: (event: CommunityEvent) => void;
}

const RegisteredEventsContext = React.createContext<RegisteredEventsContextValue | null>(null);

export function RegisteredEventsProvider({ children }: { children: React.ReactNode }) {
  const [eventIds, setEventIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setEventIds(parsed);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const persist = React.useCallback((updater: (prev: string[]) => string[]) => {
    setEventIds((prev) => {
      const next = updater(prev);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isRegistered = React.useCallback((id: string) => eventIds.includes(id), [eventIds]);

  const register = React.useCallback(
    (event: CommunityEvent) => {
      persist((prev) => (prev.includes(event.id) ? prev : [...prev, event.id]));
      toast.success(`You're registered for "${event.title}".`, {
        description: `${event.date} at ${event.time} · ${event.location}`,
      });
    },
    [persist]
  );

  const deregister = React.useCallback(
    (event: CommunityEvent) => {
      persist((prev) => prev.filter((id) => id !== event.id));
      toast.success(`You're no longer registered for "${event.title}".`);
    },
    [persist]
  );

  const value = React.useMemo(
    () => ({ eventIds, isRegistered, register, deregister }),
    [eventIds, isRegistered, register, deregister]
  );

  return <RegisteredEventsContext.Provider value={value}>{children}</RegisteredEventsContext.Provider>;
}

export function useRegisteredEvents() {
  const ctx = React.useContext(RegisteredEventsContext);
  if (!ctx) throw new Error("useRegisteredEvents must be used within a RegisteredEventsProvider");
  return ctx;
}
