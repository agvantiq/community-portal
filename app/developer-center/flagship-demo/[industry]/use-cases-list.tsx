"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { FlagshipUseCase } from "@/lib/flagship-industries";

export function UseCasesList({ useCases }: { useCases: FlagshipUseCase[] }) {
  return (
    <div className="space-y-2">
      {useCases.map((useCase) => (
        <div
          key={useCase.title}
          className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium text-foreground">{useCase.title}</p>
              <Badge variant="secondary" className="shrink-0">
                {useCase.tag}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{useCase.description}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0"
            onClick={() => toast.success(`"${useCase.title}" template is ready to use.`)}
          >
            Use Template
          </Button>
        </div>
      ))}
    </div>
  );
}
