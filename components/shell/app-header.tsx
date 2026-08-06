"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationPanel } from "@/components/shell/notification-panel";
import { RoleSwitcher } from "@/components/shell/role-switcher";
import { VantiqLogo } from "@/components/shell/vantiq-logo";
import { SearchDialog } from "@/components/shell/search-dialog";

export function AppHeader({
  minimal = false,
  guestBrowsing = false,
}: {
  minimal?: boolean;
  /**
   * Signed-out visitors browsing Resources/Knowledge Base without going
   * through the sign-in gate (see app-shell.tsx) — there's no persona to
   * preview here, just an anonymous visitor, so the header offers the real
   * next step (sign in or register) instead of the demo's role switcher.
   */
  guestBrowsing?: boolean;
}) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Signed-out visitors don't get portal search or notifications — just the
  // wordmark and the role switcher (the demo's own "preview as" control).
  if (minimal) {
    return (
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-5">
        <Link href="/" className="flex items-center">
          <VantiqLogo />
        </Link>
        {guestBrowsing ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        ) : (
          <RoleSwitcher />
        )}
      </header>
    );
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
        <button
          type="button"
          data-tour="search"
          onClick={() => setSearchOpen(true)}
          className="flex flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-ring"
        >
          <Search className="size-4 shrink-0" />
          Search the community portal...
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <NotificationPanel />
          <RoleSwitcher />
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
