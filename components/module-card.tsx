import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, type LucideIcon } from "lucide-react";

export interface ModuleCardData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count?: number;
}

/** Shared hub-module tile — icon, title, description, optional count badge. */
export function ModuleCard({ module }: { module: ModuleCardData }) {
  const Icon = module.icon;
  return (
    <Link href={module.href}>
      <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          {module.count !== undefined && <Badge variant="secondary">{module.count}</Badge>}
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
