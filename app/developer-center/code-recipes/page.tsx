import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { CODE_RECIPES } from "@/lib/developer-data";

export default function CodeRecipesPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Code Recipes / Reusable Templates"
        description="Drop-in VAIL snippets for common patterns."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/code-recipes",
            label: "Code Recipes / Reusable Templates",
            href: "/developer-center/code-recipes",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

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
