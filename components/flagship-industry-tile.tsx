import type { LucideIcon } from "lucide-react";

/**
 * Placeholder "photo" for an industry — a tinted gradient with a large
 * centered icon standing in for real industry photography until that's
 * sourced. `size="lg"` for a detail-page hero, `size="sm"` for a preview card.
 */
export function FlagshipIndustryTile({
  icon: Icon,
  gradient,
  size = "sm",
}: {
  icon: LucideIcon;
  gradient: string;
  size?: "sm" | "lg";
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-md bg-linear-to-br ${gradient} ${
        size === "lg" ? "h-56" : "h-28"
      }`}
    >
      <Icon className={size === "lg" ? "size-16 text-foreground/60" : "size-8 text-foreground/60"} />
    </div>
  );
}
