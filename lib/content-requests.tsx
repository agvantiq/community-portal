"use client";

import * as React from "react";

const STORAGE_KEY = "community-portal-content-requests";

export interface ContentRequest {
  id: string;
  /** Which hub the request came from — "Developer Hub" or "Learning Hub". */
  source: string;
  requestType: string;
  subject: string;
  details: string;
  submittedByName: string;
  submittedByEmail: string;
  submittedAt: string; // ISO timestamp
}

interface ContentRequestsContextValue {
  requests: ContentRequest[];
  addRequest: (input: Omit<ContentRequest, "id" | "submittedAt">) => void;
}

const ContentRequestsContext = React.createContext<ContentRequestsContextValue | null>(null);

export function ContentRequestsProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = React.useState<ContentRequest[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setRequests(parsed);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const addRequest = React.useCallback((input: Omit<ContentRequest, "id" | "submittedAt">) => {
    setRequests((prev) => {
      const next = [
        { ...input, id: `req-${Date.now()}`, submittedAt: new Date().toISOString() },
        ...prev,
      ];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = React.useMemo(() => ({ requests, addRequest }), [requests, addRequest]);

  return <ContentRequestsContext.Provider value={value}>{children}</ContentRequestsContext.Provider>;
}

export function useContentRequests() {
  const ctx = React.useContext(ContentRequestsContext);
  if (!ctx) throw new Error("useContentRequests must be used within a ContentRequestsProvider");
  return ctx;
}
