import Image from "next/image";
import logo from "@/public/images/brand/vantiq-community-logo.png";

// The real Vantiq Community logo (pulled from community.vantiq.com's own
// header asset), re-colored from brand blue to the portal's teal palette —
// icon + "VANTIQ" in --primary, "COMMUNITY" in --muted-foreground, matching
// how the rest of the portal re-tints Vantiq's usual brand color. Recolored
// as a flat two-tone raster (not currentColor-able SVG), so it only matches
// the light theme; fine today since ThemeProvider is pinned to
// defaultTheme="light" with enableSystem={false} and nothing in the app
// exposes a dark-mode toggle yet.
export function VantiqLogo({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Vantiq Community"
      className={className ?? "h-8 w-auto"}
      priority
    />
  );
}
