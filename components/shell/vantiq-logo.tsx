import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/public/images/brand/vantiq-community-logo.png";
import logoDark from "@/public/images/brand/vantiq-community-logo-dark.png";

// The real Vantiq Community logo (pulled from community.vantiq.com's own
// header asset), re-colored from brand blue to the portal's teal palette —
// icon + "VANTIQ" in --primary-vivid, "COMMUNITY" in --muted-foreground,
// matching how the rest of the portal re-tints Vantiq's usual brand color.
// Recolored as flat two-tone rasters (not currentColor-able SVG), so there's
// one per theme: the -dark variant uses the .dark values of those same two
// tokens (app/globals.css). Both render; Tailwind's dark: variant picks one.
export function VantiqLogo({ className }: { className?: string }) {
  const size = className ?? "h-8 w-auto";
  return (
    <>
      <Image src={logo} alt="Vantiq Community" className={cn(size, "dark:hidden")} priority />
      <Image src={logoDark} alt="Vantiq Community" className={cn(size, "hidden dark:block")} priority />
    </>
  );
}
