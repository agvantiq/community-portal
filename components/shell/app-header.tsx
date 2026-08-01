"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { NotificationPanel } from "@/components/shell/notification-panel";
import { RoleSwitcher } from "@/components/shell/role-switcher";
import { VantiqLogo } from "@/components/shell/vantiq-logo";

export function AppHeader() {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function runSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <header className="flex h-16 shrink-0 items-center border-b border-border bg-card">
      <Link
        href="/"
        className="flex h-full w-[260px] shrink-0 items-center border-r border-border px-5"
      >
        <VantiqLogo />
      </Link>
      <div className="flex flex-1 items-center gap-4 px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
          className="flex flex-1"
        >
          <div className="flex flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-within:border-ring">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              data-tour="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  runSearch();
                }
              }}
              placeholder="Search the community portal..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </form>
        <div className="flex shrink-0 items-center gap-1">
          <NotificationPanel />
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
}
