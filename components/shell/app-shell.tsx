"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/shell/app-sidebar";
import { AppHeader } from "@/components/shell/app-header";
import { useRole } from "@/components/shell/role-provider";
import { cn } from "@/lib/utils";

// The only two pages a signed-out visitor can reach without going through
// the sign-in gate (see components/onboarding-landing.tsx's "You can use the
// portal without signing in" card). With the sidebar dropped for this role
// (see below), they need some way to move between the two.
const GUEST_BROWSE_TABS = [
  { href: "/resources", label: "Resources" },
  { href: "/resources/knowledge-base", label: "Knowledge Base" },
];

function GuestBrowseNav() {
  const pathname = usePathname();
  return (
    <nav className="flex h-11 shrink-0 items-center gap-1 border-b border-border bg-card px-6">
      {GUEST_BROWSE_TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const pathname = usePathname();
  // The onboarding/signed-out preview has no internal nav to show — it's a
  // gate, not a workspace — so it drops the sidebar and the signed-in-only
  // header controls (search, notifications) rather than reusing the shell.
  const isOnboarding = role === "onboarding";
  const isGuestBrowsing = isOnboarding && GUEST_BROWSE_TABS.some((tab) => tab.href === pathname);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <AppHeader minimal={isOnboarding} guestBrowsing={isGuestBrowsing} />
      {isGuestBrowsing && <GuestBrowseNav />}
      <div className="flex flex-1 overflow-hidden">
        {!isOnboarding && <AppSidebar />}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
