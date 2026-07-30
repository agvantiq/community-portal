import { AppSidebar } from "@/components/shell/app-sidebar";
import { AppHeader } from "@/components/shell/app-header";
import { CommunityHelpWidget } from "@/components/shell/community-help-widget";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10 md:py-10">{children}</div>
        </main>
      </div>
      <CommunityHelpWidget />
    </div>
  );
}
