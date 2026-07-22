// Vantiq's wordmark re-colored to the portal's teal palette instead of the brand's usual
// white-on-black, with "Community" appended in muted-foreground the way Glean pairs its blue
// wordmark with a plain-gray "Community" — the product name stays untouched, the surface label
// is additive.
export function VantiqLogo({ className }: { className?: string }) {
  return (
    <span className={className ?? "flex items-baseline gap-1.5 whitespace-nowrap"}>
      <span className="text-2xl leading-none font-bold uppercase tracking-wide text-primary">
        Vantiq
      </span>
      <span className="text-[15px] font-medium text-muted-foreground">Community</span>
    </span>
  );
}
