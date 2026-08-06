import Image from "next/image";
import { asset } from "@/lib/utils";
import type { FlagshipIndustry } from "@/lib/flagship-industries";

/* Motion: one idea, "the veil thins when the card is being chosen".
 *
 * This tile is a surface, not a subject, so it never performs: no entrance, no
 * loop, no drift, nothing on load. It only responds, and only where responding
 * means something, which is the grid, where the tile heads a card that is a
 * link. Hovering anywhere on that card lifts the flat teal multiply off the
 * photograph, the image warms toward its true color, and it settles back when
 * the cursor leaves. Half a second, opacity on one already-composited layer,
 * no transform on the photograph itself.
 *
 * `[a:hover_&]` anchors to the anchor the grid wraps this tile in, so the
 * whole card is the trigger without needing a `group` class added to a file
 * this component does not own. On the detail-page hero there is no ancestor
 * anchor, so the selector never matches and the hero stays perfectly still,
 * which is the right answer for a surface nobody is choosing.
 *
 * The bottom-weighted gradient is deliberately left out of this: it is the
 * layer doing contrast work, and it should not move.
 */
const VEIL_LIFT =
  "transition-opacity duration-500 ease-out [a:hover_&]:opacity-45 motion-reduce:transition-none";

/**
 * The industry's real photograph. Replaces the previous tinted-gradient-plus-
 * centered-icon placeholder, which stood in for photography that had never been
 * sourced. `size="lg"` for a detail-page hero, `size="sm"` for a preview card.
 *
 * The teal scrim is what keeps six unrelated photographs reading as one set and
 * as part of this portal rather than six stock images pasted onto cards.
 */
export function FlagshipIndustryTile({
  industry,
  size = "sm",
  priority = false,
}: {
  industry: FlagshipIndustry;
  size?: "sm" | "lg";
  /** Set on the above-the-fold detail hero so it isn't lazy-loaded. */
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${size === "lg" ? "h-64 sm:h-72" : "h-32"}`}>
      <Image
        src={asset(industry.image)}
        alt={industry.imageAlt}
        fill
        sizes={size === "lg" ? "(max-width: 768px) 100vw, 900px" : "(max-width: 768px) 100vw, 400px"}
        priority={priority}
        // Pulling saturation down is what actually makes six unrelated
        // photographs read as one set, a warm supermarket, a near-white
        // corridor and a yellow-green ambulance have nothing in common at full
        // saturation, and a bottom-edge scrim alone was too weak to register.
        // brightness holds the high-key images down: the set spans a near-white
        // hospital corridor and a night port, and without it the bright end
        // washes out to nothing under the tint below.
        className="object-cover saturate-[0.55] contrast-[1.1] brightness-[0.92]"
      />
      {/* Brand duotone: a full-coverage teal multiply unifies the midtones,
          then a second bottom-weighted pass deepens the base so any text
          sitting under the image keeps its contrast. No screen/highlight pass 
          it lifted the already-bright images straight back out of the tint. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-primary/22 mix-blend-multiply ${VEIL_LIFT}`}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-primary/50 via-primary/8 to-transparent mix-blend-multiply"
      />
    </div>
  );
}
