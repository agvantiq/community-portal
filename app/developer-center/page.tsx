"use client";

import * as React from "react";
import Link from "next/link";
import { BookmarkButton } from "@/components/bookmark-button";
import { PageBanner } from "@/components/page-banner";
import { ModuleCard } from "@/components/module-card";
import { useRole } from "@/components/shell/role-provider";
import {
  TECHNICAL_DOC_MODULES,
  DEVELOPER_GUIDE_MODULES,
  STANDALONE_MODULES,
} from "@/lib/developer-data";

export default function DeveloperCenterPage() {
  const { role } = useRole();
  const standaloneModules = STANDALONE_MODULES.filter((m) => !m.roles || m.roles.includes(role));

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Developer Hub"
        title="Developer Hub"
        description="Everything you need to build on Vantiq — architecture guidance, references, reusable code, and demos. Pick a module to dive in."
      >
        <BookmarkButton
          item={{ id: "/developer-center", label: "Developer Hub", href: "/developer-center", iconKey: "Code2" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-emphasis">Technical Documents</h2>
          <Link
            href="/developer-center/technical-documents"
            className="text-xs text-emphasis hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNICAL_DOC_MODULES.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-emphasis">Developer Guides</h2>
          <Link href="/developer-center/guides" className="text-xs text-emphasis hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEVELOPER_GUIDE_MODULES.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-medium text-emphasis">More Resources</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standaloneModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
