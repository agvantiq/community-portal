"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRole } from "@/components/shell/role-provider";
import {
  TECHNICAL_DOC_MODULES,
  STANDALONE_MODULES,
  type DeveloperHubModule,
} from "@/lib/developer-data";
import { ChevronRight } from "lucide-react";

function ModuleCard({ module }: { module: DeveloperHubModule }) {
  const Icon = module.icon;
  return (
    <Link href={module.href}>
      <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <Badge variant="secondary">{module.count}</Badge>
        </div>
        <p className="mt-3 flex items-center gap-1 text-sm font-medium text-foreground">
          {module.title}
          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{module.description}</p>
      </Card>
    </Link>
  );
}

export default function DeveloperCenterPage() {
  const { role } = useRole();
  const standaloneModules = STANDALONE_MODULES.filter((m) => !m.roles || m.roles.includes(role));

  return (
    <div className="space-y-6">
      <Card className="shadow-card relative border-none bg-primary p-8 text-primary-foreground">
        <BookmarkButton
          item={{ id: "/developer-center", label: "Developer Hub", href: "/developer-center", iconKey: "Code2" }}
          className="absolute right-4 top-4"
        />
        <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
          Developer Hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Developer Hub</h1>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          Everything you need to build on Vantiq — architecture guidance, references, reusable
          code, and demos. Pick a module to dive in.
        </p>
      </Card>

      <div>
        <h2 className="mb-4 text-sm font-medium text-emphasis">Technical Documents</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNICAL_DOC_MODULES.map((module) => (
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
