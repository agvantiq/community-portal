# Community Portal — Design Precedence

- `../community.design.md` (one directory above this repo) is the **primary source of
  truth** for this project's design system: colors, spacing, typography, and
  component patterns. Never redesign or override what it specifies.
- The root `CLAUDE.md` (Vantiq Community Portal — Design & UX Consistency Rules) is
  **supplemental** — apply a rule from it only where `community.design.md` is silent
  on that specific point.
- If the two ever conflict, `community.design.md` wins. Flag the conflict to the user
  rather than resolving it yourself.
- Never cite the root `CLAUDE.md` as justification for changing something that already
  complies with `community.design.md`.

## Working conventions
- Reuse existing shadcn/ui components and design tokens (`--primary`, `--emphasis`,
  `--muted-foreground`, etc. from `app/globals.css`) — don't introduce new patterns.
- Git: stage explicit files (never `git add -A`), never force-push, default branch is
  `master` (not `main`).
- Static export via `next.config.mjs` (`output: "export"`, `basePath:
  "/community-portal"`), auto-deployed to GitHub Pages on push to `master` via
  `.github/workflows/deploy.yml`.
