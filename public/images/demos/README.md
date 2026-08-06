# Demo gallery screenshots

Screenshots of the Flagship Demo Series interfaces, shown in the "Demo gallery"
section of each `/sales-center/flagship-demos/<industry>` page.

**These must be real captures of the demo's own UI.** Never substitute stock
imagery or a mock-up for a screenshot. The section's whole value is that a
prospect is looking at the actual product.

**Capture with the demo running and populated.** An empty table or a bare shell
is worse than no screenshot, because it makes a working product look unfinished.
Start the scenario, let data flow, then capture. Stop the namespace afterwards.

## What's here

All six industries have five captures each, taken against live demo namespaces
with scenarios running.

| Industry | Codename | Captures |
|---|---|---|
| `logistics/` | Meridian | 5 |
| `defense/` | Sentinel | 5 |
| `healthcare/` | Northstar | 5 |
| `manufacturing/` | Orion | 5 |
| `public-safety/` | Riverton | 5 |
| `retail/` | Harborline | 5 |

Earlier revisions of this file listed four of these as blocked, because the
demos gate on a Vantiq server URL and access token before rendering, and several
UIs live server-side rather than in the local mirror. That was worked around by
driving the running deployments directly rather than the local copies, so the
blockers are historical.

## Adding more

1. Capture at **1600x1000** from the running demo, with a scenario active so the
   screen has real content in it.
2. Save as PNG under `public/images/demos/<industry>/<name>.png`.
3. Add an entry to that industry's `gallery` array in
   `lib/flagship-industries.ts`:

   ```ts
   gallery: [
     { src: "/images/demos/<industry>/<name>.png", caption: "What a prospect is looking at." },
   ],
   ```

The section renders only when `gallery` is present, so an industry without
captures simply omits it.

## Note on branding

The Manufacturing captures carry "Dow" and "Kyndryl" branding, and the Retail
captures carry "Walmart" branding, all from the demos themselves. The demos are
stamped as synthetic demonstration data. Confirm this is intended before the
portal is shown outside Vantiq.
