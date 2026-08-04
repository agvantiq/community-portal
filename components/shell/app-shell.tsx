"use client";

import { AppSidebar } from "@/components/shell/app-sidebar";
import { AppHeader } from "@/components/shell/app-header";
import { useRole } from "@/components/shell/role-provider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  // The onboarding/signed-out preview has no internal nav to show — it's a
  // gate, not a workspace — so it drops the sidebar and the signed-in-only
  // header controls (search, notifications) rather than reusing the shell.
  const isOnboarding = role === "onboarding";

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <AppHeader minimal={isOnboarding} />
      <div className="flex flex-1 overflow-hidden">
        {!isOnboarding && <AppSidebar />}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
