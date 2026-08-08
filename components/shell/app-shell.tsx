"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/shell/app-sidebar";
import { AppHeader } from "@/components/shell/app-header";
import { OnboardingLanding } from "@/components/onboarding-landing";
import { useRole } from "@/components/shell/role-provider";
import { cn } from "@/lib/utils";

// The only area a signed-out visitor can reach without going through the
// sign-in gate (see components/onboarding-landing.tsx's "You can use the
// portal without signing in" card): the Resources hub and everything under
// it (articles, the knowledge base, individual resource pages). With the
// sidebar dropped for this role (see below), the tabs below are how they
// move between the two top-level entry points into that area.
const GUEST_BROWSE_TABS = [
  { href: "/resources", label: "Resources" },
  { href: "/resources/knowledge-base", label: "Knowledge Base" },
];

function isGuestAccessiblePath(pathname: string) {
  return pathname === "/" || pathname.startsWith("/resources");
}

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
  const isGuestBrowsing = isOnboarding && pathname.startsWith("/resources");
  // The sidebar being hidden only stops *navigation* into gated areas — a
  // direct URL (or a stale role after this page was already open) would
  // otherwise still render the real page underneath. Swap in the landing
  // gate itself whenever a signed-out visitor lands outside the one area
  // they're allowed into, the same way "/" already does.
  const isGated = isOnboarding && !isGuestAccessiblePath(pathname);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <AppHeader minimal={isOnboarding} guestBrowsing={isGuestBrowsing} />
      {isGuestBrowsing && <GuestBrowseNav />}
      <div className="flex flex-1 overflow-hidden">
        {!isOnboarding && (
          <div className="hidden w-[260px] shrink-0 border-r border-border lg:block">
            <AppSidebar />
          </div>
        )}
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto bg-white"
          // PageHero reads these to bleed its background to this element's
          // true edges (see that component) — set here, once, rather than
          // hardcoded there, so it stays correct if the sidebar width
          // changes or (as with onboarding) the sidebar isn't rendered at
          // all, in which case this simply isn't set and PageHero's calc
          // falls back to 0px, i.e. a plain viewport-centered bleed.
          style={!isOnboarding ? ({ "--app-sidebar-w": "260px" } as React.CSSProperties) : undefined}
        >
          <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10 md:py-10">
            {isGated ? <OnboardingLanding /> : children}
          </div>
        </main>
      </div>
    </div>
  );
}
