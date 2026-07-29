"use client";

import * as React from "react";
import { toast } from "sonner";
import type { CommunityEvent } from "@/lib/community-data";

const STORAGE_KEY = "community-portal-registered-events";

interface RegisteredEventsContextValue {
  events: CommunityEvent[];
  isRegistered: (id: string) => boolean;
  register: (event: CommunityEvent) => void;
  unregister: (id: string) => void;
}

const RegisteredEventsContext = React.createContext<RegisteredEventsContextValue | null>(null);

export function RegisteredEventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = React.useState<CommunityEvent[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setEvents(parsed);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const persist = React.useCallback((next: CommunityEvent[]) => {
    setEvents(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const isRegistered = React.useCallback((id: string) => events.some((e) => e.id === id), [events]);

  const register = React.useCallback(
    (event: CommunityEvent) => {
      if (events.some((e) => e.id === event.id)) return;
      persist([...events, event]);
      toast.success(`Registered for "${event.title}".`);
    },
    [events, persist]
  );

  const unregister = React.useCallback(
    (id: string) => {
      const event = events.find((e) => e.id === id);
      if (!event) return;
      persist(events.filter((e) => e.id !== id));
      toast.success(`Registration cancelled for "${event.title}".`);
    },
    [events, persist]
  );

  const value = React.useMemo(
    () => ({ events, isRegistered, register, unregister }),
    [events, isRegistered, register, unregister]
  );

  return (
    <RegisteredEventsContext.Provider value={value}>{children}</RegisteredEventsContext.Provider>
  );
}

export function useRegisteredEvents() {
  const ctx = React.useContext(RegisteredEventsContext);
  if (!ctx) throw new Error("useRegisteredEvents must be used within a RegisteredEventsProvider");
  return ctx;
}
