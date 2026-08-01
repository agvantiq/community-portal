"use client";

import * as React from "react";
import { toast } from "sonner";

export interface EventComment {
  id: string;
  eventId: string;
  authorName: string;
  authorTitle: string;
  authorOrg: string | null;
  body: string;
  createdAt: string; // ISO timestamp
}

const STORAGE_KEY = "community-portal-event-comments";

// Seeded so past events' hubs don't look empty on first load — upcoming events start
// with no discussion, which is the realistic state for a session that hasn't happened yet.
const DEFAULT_EVENT_COMMENTS: EventComment[] = [
  {
    id: "ec-e1-1",
    eventId: "e1",
    authorName: "Derek Osei",
    authorTitle: "Partner Engineer",
    authorOrg: "NTT Data",
    body: "Thanks for covering the model registry — exactly what we needed for our rollout.",
    createdAt: "2026-07-08T16:20:00",
  },
  {
    id: "ec-e1-2",
    eventId: "e1",
    authorName: "Lucia Fernandez",
    authorTitle: "Solutions Engineer",
    authorOrg: "SoftServe",
    body: "Is the sample project from this session available anywhere?",
    createdAt: "2026-07-08T17:05:00",
  },
  {
    id: "ec-e2-1",
    eventId: "e2",
    authorName: "Naomi Wallace",
    authorTitle: "Integration Engineer",
    authorOrg: "Wipro Mfg",
    body: "The procedure refactor walkthrough was great — cleared up a lot of confusion on when to use rules vs. procedures.",
    createdAt: "2026-07-15T15:40:00",
  },
  {
    id: "ec-e2-2",
    eventId: "e2",
    authorName: "Tomás Ibarra",
    authorTitle: "Developer",
    authorOrg: "SoftServe",
    body: "Recording audio cuts out around the 40 minute mark for me — anyone else seeing that?",
    createdAt: "2026-07-16T09:10:00",
  },
  {
    id: "ec-e3-1",
    eventId: "e3",
    authorName: "Aisha Bello",
    authorTitle: "Program Manager",
    authorOrg: "Infosys Cloud",
    body: "Appreciate the certification timeline clarity — saved us a lot of back and forth internally.",
    createdAt: "2026-07-22T12:15:00",
  },
  {
    id: "ec-e4-1",
    eventId: "e4",
    authorName: "Priya Deshmukh",
    authorTitle: "Partner Account Manager",
    authorOrg: "Capgemini",
    body: "Great meeting the SoftServe team — following up on a possible joint pitch next week.",
    createdAt: "2026-07-24T21:00:00",
  },
  {
    id: "ec-e4-2",
    eventId: "e4",
    authorName: "Liam O'Connell",
    authorTitle: "Solutions Architect",
    authorOrg: "Radenta Tech",
    body: "Would love more of these — maybe monthly?",
    createdAt: "2026-07-24T21:30:00",
  },
];

interface EventCommentsContextValue {
  /** Every comment across all events, unfiltered — powers cross-portal search. */
  comments: EventComment[];
  getComments: (eventId: string) => EventComment[];
  addComment: (
    eventId: string,
    body: string,
    author: { name: string; title: string; org: string | null }
  ) => void;
}

const EventCommentsContext = React.createContext<EventCommentsContextValue | null>(null);

export function EventCommentsProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = React.useState<EventComment[]>(DEFAULT_EVENT_COMMENTS);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setComments(parsed);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const persist = React.useCallback((next: EventComment[]) => {
    setComments(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const getComments = React.useCallback(
    (eventId: string) =>
      comments
        .filter((c) => c.eventId === eventId)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [comments]
  );

  const addComment = React.useCallback(
    (eventId: string, body: string, author: { name: string; title: string; org: string | null }) => {
      const trimmed = body.trim();
      if (!trimmed) return;
      const comment: EventComment = {
        id: `ec-${eventId}-${Date.now()}`,
        eventId,
        authorName: author.name,
        authorTitle: author.title,
        authorOrg: author.org,
        body: trimmed,
        createdAt: new Date().toISOString(),
      };
      persist([...comments, comment]);
      toast.success("Comment posted.");
    },
    [comments, persist]
  );

  const value = React.useMemo(
    () => ({ comments, getComments, addComment }),
    [comments, getComments, addComment]
  );

  return <EventCommentsContext.Provider value={value}>{children}</EventCommentsContext.Provider>;
}

export function useEventComments() {
  const ctx = React.useContext(EventCommentsContext);
  if (!ctx) throw new Error("useEventComments must be used within an EventCommentsProvider");
  return ctx;
}
