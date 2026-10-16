// Regenerates the color-token blocks in public/handover/vantiq-portal.css
// from app/globals.css (:root and .dark). CLAUDE.md rule 4: derived token
// values are never hand-typed. Run after any token change:
//
//   node scripts/gen-handover-tokens.mjs
//
// Only the region between the @generated markers is rewritten; radius, font,
// and layout tokens live outside it and are maintained by hand.
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = "app/globals.css";
const TARGET = "public/handover/vantiq-portal.css";

// The kit's token subset, in output order. Anything the kit CSS reads as
// var(--vq-<name>) must be listed here.
const TOKENS = [
  "background", "foreground", "card", "card-foreground",
  "primary", "primary-foreground", "primary-vivid",
  "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "destructive-foreground",
  "border", "input", "ring",
  "success", "success-foreground",
  "emphasis", "emphasis-foreground", "emphasis-vivid",
  "sidebar", "sidebar-foreground", "sidebar-accent", "sidebar-accent-foreground", "sidebar-border",
  "shadow-color",
];

const css = readFileSync(SOURCE, "utf8");

function block(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`${SOURCE}: no "${selector} {" block`);
  const body = css.slice(start, css.indexOf("\n}", start));
  const values = {};
  for (const m of body.matchAll(/^\s*--([a-z0-9-]+):\s*([^;]+);/gm)) values[m[1]] = m[2].trim();
  return values;
}

function emit(values, label) {
  return TOKENS.map((name) => {
    if (!(name in values)) throw new Error(`${SOURCE} ${label}: missing --${name}`);
    return `  --vq-${name}: ${values[name]};`;
  }).join("\n");
}

const light = block(":root");
const dark = block(".dark");

const generated = `/* @generated tokens:start — scripts/gen-handover-tokens.mjs from app/globals.css. Don't hand-edit. */
:root {
${emit(light, ":root")}
}
/* Dark mode: set data-vq-theme="dark" on <html> (vantiq-interface.js's
   data-vq-theme-toggle does this and remembers the choice). Same token
   names, different values — no component rule changes between themes.
   Use --vq-primary-vivid / --vq-emphasis-vivid for teal/violet *text, icons,
   borders, and focus rings*; --vq-primary / --vq-emphasis stay for fills.
   In light mode the pairs are identical; in dark mode the fill colors fail
   contrast as text, which is why the split exists. */
:root[data-vq-theme="dark"] {
${emit(dark, ".dark")}
}
/* @generated tokens:end */`;

const target = readFileSync(TARGET, "utf8");
const re = /\/\* @generated tokens:start[\s\S]*?\/\* @generated tokens:end \*\//;
if (!re.test(target)) throw new Error(`${TARGET}: @generated markers not found`);
writeFileSync(TARGET, target.replace(re, generated));
console.log(`Wrote ${TOKENS.length} tokens × 2 themes to ${TARGET}`);
