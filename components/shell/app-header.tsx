"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { NotificationPanel } from "@/components/shell/notification-panel";
import { RoleSwitcher } from "@/components/shell/role-switcher";
import { CommandPalette } from "@/components/shell/command-palette";
import { VantiqLogo } from "@/components/shell/vantiq-logo";

export function AppHeader() {
  const [paletteOpen, setPaletteOpen] = React.useState(false);

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
          onClick={() => setPaletteOpen(true)}
          className="flex flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-ring"
        >
          <Search className="size-4" />
          <span className="text-left">Search the community portal...</span>
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <NotificationPanel />
          <RoleSwitcher />
        </div>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
}
