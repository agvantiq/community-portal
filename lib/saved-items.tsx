"use client";

import * as React from "react";
import {
  GraduationCap,
  Code2,
  Handshake,
  MessagesSquare,
  Library,
  LifeBuoy,
  Mail,
  type LucideIcon,
} from "lucide-react";

export interface SavedItem {
  /** Unique id — the item's href. */
  id: string;
  label: string;
  href: string;
  iconKey: string;
}

export const SAVED_ITEM_ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Code2,
  Handshake,
  MessagesSquare,
  Library,
  LifeBuoy,
  Mail,
};

const STORAGE_KEY = "community-portal-saved-items";

const DEFAULT_SAVED_ITEMS: SavedItem[] = [
  { id: "/academy", label: "Certification Roadmap", href: "/academy", iconKey: "GraduationCap" },
  { id: "/developer-center", label: "Architecture Docs", href: "/developer-center", iconKey: "Code2" },
  { id: "/forum", label: "Q&A Forum", href: "/forum", iconKey: "MessagesSquare" },
  { id: "/resources", label: "Resource Library", href: "/resources", iconKey: "Library" },
];

interface SavedItemsContextValue {
  items: SavedItem[];
  isSaved: (id: string) => boolean;
  toggle: (item: SavedItem) => void;
  remove: (id: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
}

const SavedItemsContext = React.createContext<SavedItemsContextValue | null>(null);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<SavedItem[]>(DEFAULT_SAVED_ITEMS);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const persist = React.useCallback((next: SavedItem[]) => {
    setItems(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const isSaved = React.useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const toggle = React.useCallback(
    (item: SavedItem) => {
      if (items.some((i) => i.id === item.id)) {
        persist(items.filter((i) => i.id !== item.id));
      } else {
        persist([...items, item]);
      }
    },
    [items, persist]
  );

  const remove = React.useCallback(
    (id: string) => persist(items.filter((i) => i.id !== id)),
    [items, persist]
  );

  const moveUp = React.useCallback(
    (id: string) => {
      const index = items.findIndex((i) => i.id === id);
      if (index <= 0) return;
      const next = [...items];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      persist(next);
    },
    [items, persist]
  );

  const moveDown = React.useCallback(
    (id: string) => {
      const index = items.findIndex((i) => i.id === id);
      if (index === -1 || index >= items.length - 1) return;
      const next = [...items];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      persist(next);
    },
    [items, persist]
  );

  const value = React.useMemo(
    () => ({ items, isSaved, toggle, remove, moveUp, moveDown }),
    [items, isSaved, toggle, remove, moveUp, moveDown]
  );

  return <SavedItemsContext.Provider value={value}>{children}</SavedItemsContext.Provider>;
}

export function useSavedItems() {
  const ctx = React.useContext(SavedItemsContext);
  if (!ctx) throw new Error("useSavedItems must be used within a SavedItemsProvider");
  return ctx;
}
