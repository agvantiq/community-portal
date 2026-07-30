# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Vantiq's partner and internal ecosystem, split by role:

- **Technical Partner** — systems integrator or ISV engineer building on Vantiq (job: learn the platform, ship integrations, find docs/code recipes fast).
- **Sales Partner** — partner-side rep sourcing and closing Vantiq deals (job: pitch materials, deal registration, pipeline visibility).
- **1st-Time Partner** — a brand-new partner's first landing experience (job: onboarding, orientation).
- **Vantiq Employee** — internal team member supporting partners.
- **Vantiq Admin** — internal program administrator (job: portal analytics, program oversight).
- **Partner Exec** — partner-side executive tracking org readiness/progress.
- **Guest** — signed in, but with a personal/non-company email (e.g. Gmail) rather than a recognized partner company domain; that's what limits them to guest-level access.

The role structure above is real and durable (confirmed by the user). Specific people, org names, course titles, and badge names currently shown (e.g. "Alex Rivera," "Radenta Tech") are placeholder sample data, not real partners — do not treat them as facts to preserve, and do not fabricate new "real" testimonials/customers/orgs in their place.

## Product Purpose

This portal is the Vantiq Partner/Community Portal: the hub where partners learn the platform (Academy/Learning Hub), find developer resources (Developer Hub/Center — docs, API references, code recipes, guides), get sales enablement (Sales Center — pitch decks, deal registration, pipeline, teaming), and participate in community (Forum — Q&A, events, showcase). Success means partners can onboard, build, and sell on Vantiq faster with less friction.

## Positioning

Vantiq is a real-time AI orchestration platform — software that helps organizations build event-driven, intelligent systems that run anywhere, connect to diverse devices, and respond instantly to changing conditions (e.g. detecting a flood or accident and orchestrating a response involving both humans and machines).

The platform combines AI, generative AI, and multi-agent systems to automate decision-making, positioning itself as a "master orchestrator" for agentic AI, edge computing, and IoT use cases across industries including disaster management, healthcare, and defense. Its core pitch: hide the complexity of building real-time applications that would otherwise be too costly or risky to develop.

This portal's design and content should reflect that positioning — partners are building serious, high-stakes, real-time systems, not toy CRUD apps.

## Operating Context

Partners and internal staff switch between role-based views of the same portal (role switcher in the app shell). Core workflows: taking courses (Learning/Academy Hub with progress tracking, badges), browsing developer docs/API references/code recipes, registering deals and finding sales collateral, and participating in community forum/Q&A/events. Admin role sees an analytics dashboard instead of a learning/build path.

## Capabilities and Constraints

- Next.js app with static export (`output: "export"`, `basePath: "/community-portal"`), auto-deployed to GitHub Pages on push to `master`.
- Uses shadcn/ui components and design tokens defined in `app/globals.css` — extend these rather than introducing new patterns.
- Role state is client-side only (`RoleProvider`), no real auth/backend — this is a design/prototype build, not a production app with live partner data.
- Undecided: whether "real-time," "orchestration," and industry-specific imagery (disaster/healthcare/defense) should appear literally in the UI, or stay as background positioning that informs tone only. Flag this to the user before committing to literal imagery.

## Brand Commitments

Binding brand colors (user-confirmed, apply regardless of any other visual direction proposed):

- Dark Teal — `#0D3D3D`
- Stormy Teal — `#0F5A5B`
- Azure Mist — `#D6E6E5`
- Lavender Grey — `#8797B2`
- Midnight Violet — `#351431`

Product name: "Vantiq Community Portal" / "Vantiq Partner Portal". No confirmed typography or logo-usage rules beyond these colors — ask before inventing any.

## Evidence on Hand

- Real: role taxonomy (7 roles listed above), hub/section structure (Academy, Developer Hub, Sales Center, Forum, Resources, Support), the five brand colors above.
- Not real / must not be treated as fact: specific partner names, org names ("Radenta Tech," "Northbridge Solutions"), course titles, badge names, progress percentages, analytics numbers, forum posts — all placeholder. Do not invent new "real" case studies, testimonials, or customer logos to replace them; state absence instead.

## Product Principles

1. Partners are building high-stakes, real-time, event-driven systems — the portal's tone and craft should read as serious and capable, not playful SaaS-template gloss.
2. One portal, many roles — role-based views must stay coherent as the same product, not fragmented sub-apps.
3. Preserve existing shadcn/ui tokens and patterns; extend the system, don't fork it.
4. This is a prototype/demo build (no real backend) — don't let placeholder data get mistaken for or upgraded into fabricated "real" claims.
5. Vantiq's five confirmed brand colors are non-negotiable and take precedence over any generic palette Impeccable might otherwise propose.

## Accessibility & Inclusion

No project-specific accessibility requirement established yet beyond general web standards.
