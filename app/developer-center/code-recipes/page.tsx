import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CODE_RECIPES } from "@/lib/developer-data";
import { Code2 } from "lucide-react";

export default function CodeRecipesPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/developer-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Developer Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Code2 className="size-5 text-primary" />
          Code Recipes / Reusable Templates
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Drop-in VAIL snippets for common patterns.</p>
      </div>

      <Card className="shadow-card p-6">
        <div className="space-y-2">
          {CODE_RECIPES.map((recipe) => (
            <div
              key={recipe.title}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
            >
              <p className="truncate text-sm font-medium text-foreground">{recipe.title}</p>
              <Badge variant="secondary" className="shrink-0">
                {recipe.tag}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
