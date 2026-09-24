import type { CatalogCourse } from "@/lib/sample-data";

/**
 * Course banner photography, one photograph per course.
 *
 * The first version of this file mapped 56 courses onto 13 photographs by topic
 * cluster, on the theory that a shared image would make each track read as one
 * body of work. In the rendered catalogue it did the opposite: courses sort by
 * catalogue order, so the Presales track showed the same banner seven times in
 * a row and the page looked like a rendering fault. That approach also pushed
 * the imagery toward metaphor, because one picture had to stand for a whole
 * cluster, which is how a starling murmuration ended up representing GenAI.
 *
 * So: 56 courses, 56 distinct photographs, verified distinct by Unsplash photo
 * id and by file content hash. Each one depicts the literal subject of its
 * course or the literal activity the course teaches, never a symbol for it.
 *
 * `scene` is documentation, not alt text. The banner sits inside the card's
 * link, so alt text here would be spoken as part of the link's name on all 56
 * cards ("Macro of real source on a lit monitor ... VAIL Fundamentals"). The
 * photograph carries no information the title does not already carry, so it
 * renders decorative with an empty alt and the description lives here instead,
 * for re-sourcing and re-cropping later.
 *
 * Attribution for every image is in public/images/courses/CREDITS.md.
 */
export interface CourseImage {
  /** Path under public/. Pass through `asset()` at render time for basePath. */
  src: string;
  /** What the photograph shows. Not rendered: see the note above. */
  scene: string;
}

/** Keyed by `CatalogCourse["id"]`, in catalogue order. */
export const COURSE_IMAGES: Record<string, CourseImage> = {
  // AI Foundations
  "ai-foundations": {
    src: "/images/courses/ai-concepts.jpg",
    scene: "An instructor standing beside a blackboard covered in chalked diagrams and notation, teaching a seated class in a dark wood lecture room.",
  },
  // What Is Vantiq
  "what-is-vantiq": {
    src: "/images/courses/what-is-vantiq.jpg",
    scene: "A plant control room with a curved operator console and two chairs facing a full-width wall of mimic panels, gauges and screens under a coffered light ceiling.",
  },
  // Orchestration as a Business Outcome Enabler
  "orchestration-transformation-enabler": {
    src: "/images/courses/orchestration-transformation-enabler.jpg",
    scene: "Warehouse staff in hi-vis vests and work blues walking down the central aisle of a live distribution warehouse, motion-blurred mid-stride between tall orange pallet racking on both sides.",
  },
  // Pitching Value and Business Impact
  "pitching-value-and-business-impact": {
    src: "/images/courses/pitching-value-and-business-impact.jpg",
    scene: "A man presenting beside a large wall screen of line and bar charts, seen over the shoulders of the colleagues he is presenting to.",
  },
  // Vantiq Competitive Landscape
  "vantiq-competitive-landscape": {
    src: "/images/courses/competitive-positioning-for-vantiq.jpg",
    scene: "Close on a person's hands writing percentage splits and labelled boxes for platform versus consulting onto a glass board.",
  },
  // Running the Deal: Customer Engagement Playbook
  "running-the-deal-customer-engagement-playbook": {
    src: "/images/courses/consultative-selling-for-vantiq.jpg",
    scene: "A woman standing over a dark desk, pointing at a printed bar chart report while the seated man she is advising follows along.",
  },
  // Exercise: Opportunity Qualification
  "opportunity-qualification-exercise": {
    src: "/images/courses/discovery-and-deal-qualification.jpg",
    scene: "Overhead view of four colleagues leaning over a table covered in printed sales-by-region charts, annotating them with pens.",
  },
  // Partnership Strategy
  "partnership-strategy": {
    src: "/images/courses/land-and-expand-strategy.jpg",
    scene: "A wide loft office floor with long shared desk benches, many workstations occupied and many more standing empty alongside them.",
  },
  // Technical Differentiators
  "technical-differentiators": {
    src: "/images/courses/technical-differentiators.jpg",
    scene: "A team leader stands at a wall screen presenting to colleagues around a meeting-room table, seen through the glass wall.",
  },
  // Architecture Deep Dive
  "architecture-deep-dive": {
    src: "/images/courses/architectural-principles.jpg",
    scene: "A large printed engineering system schematic, its radial structure and numbered sections drawn out across the sheet.",
  },
  // Demo and Proof Strategy
  "demo-and-proof-strategy": {
    src: "/images/courses/demo-and-proof-strategy.jpg",
    scene: "A presenter on a darkened stage gestures at a large projection screen showing a live application interface to a seated audience.",
  },
  // Solution Design and AI Integration Strategy
  "solution-design-and-ai-integration-strategy": {
    src: "/images/courses/vantiq-solution-design.jpg",
    scene: "Overhead view of hands drawing an application user-flow diagram of linked screen wireframes in a sketchbook, with sticky notes on the desk.",
  },
  // Applications Developer Foundations Course
  "applications-developer-level-1": {
    src: "/images/courses/foundation-course.jpg",
    scene: "A room of seated attendees facing an instructor at a lectern with his laptop, beside a large projected screen, during a class in session.",
  },
  // The VIA and KB MCP Servers
  "the-via-and-kb-mcp-servers": {
    src: "/images/courses/the-via-and-kb-mcp-servers.jpg",
    scene: "A close frontal view of dark server racks packed floor to ceiling with equipment modules, hanging patch cables and small status LEDs.",
  },
  // Advanced GenAI Apps
  "advanced-genai-applications": {
    src: "/images/courses/advanced-genai-apps.jpg",
    scene: "An open plan engineering office where headphoned developers work at desks holding three monitors of dense code and terminal output.",
  },
  // AI Multi-Agent Architecture
  "ai-multi-agent-architecture": {
    src: "/images/courses/multi-agent-orchestration.jpg",
    scene: "Three orange industrial robot arms working together over one shared conveyor line inside a working factory.",
  },
  // Version Control System
  "vantiq-version-control-system": {
    src: "/images/courses/version-control-system.jpg",
    scene: "A code editor screen showing a commit history graph with coloured branch lines, branch labels and file tree.",
  },
  // Vantiq on Edge
  "vantiq-edge-2": {
    src: "/images/courses/vantiq-on-edge.jpg",
    scene: "An open industrial control cabinet with rack-mounted programmable controllers, terminal blocks and colour-coded field wiring.",
  },
  // Assemblies
  "1-34-vantiq-assemblies": {
    src: "/images/courses/assemblies.jpg",
    scene: "A hand fitting a component into a partly populated circuit board on a workbench, with a driver alongside.",
  },
  // Vantiq Catalog
  "the-vantiq-catalog": {
    src: "/images/courses/vantiq-catalog.jpg",
    scene: "A wall of wooden library card-catalogue drawers, each with a printed index label in its brass holder.",
  },
  // App & GenAI Comp
  "app-components": {
    src: "/images/courses/app-and-genai-comp.jpg",
    scene: "A dark application screen showing a generative-AI prompt component: an 'Ask anything' input with an attach and tools row.",
  },
  // Vail Rules
  "vail-rules": {
    src: "/images/courses/vail-rules.jpg",
    scene: "A macro frame of real source code on a lit monitor, the comment lines and typedef declarations sharp in the centre and falling out of focus toward the edges.",
  },
  // Vail DML
  "vail-dml": {
    src: "/images/courses/vail-dml.jpg",
    scene: "A screen photographed at an angle showing data-manipulation code, with Array.filter, Array.sortBy and Array.iter operations chained down the frame.",
  },
  // Vantiq Integration
  "vantiq-integration": {
    src: "/images/courses/vantiq-integration.jpg",
    scene: "A screen filled with an async REST call: fetchData(url) awaiting a response, checking response.ok, throwing a network Error and parsing the JSON body.",
  },
  // Vail Procedures
  "vail-procedures": {
    src: "/images/courses/vail-procedures.jpg",
    scene: "A developer seen from behind at a home desk under warm string lights, writing code across a widescreen monitor and a second display.",
  },
  // Testing
  "vantiqs-testing-tools": {
    src: "/images/courses/testing.jpg",
    scene: "A hardware test bench with an optical pulse meter and an IL and RL test station wired up in orange and cyan patch cords, the monitor above showing a table of measurements ending in a green Pass.",
  },
  // Distributed Deployment
  "distributed-deployment": {
    src: "/images/courses/distributed-deployment.jpg",
    scene: "A wide view down a data centre hall with rows of server cabinets and overhead cable trays running the length of the room.",
  },
  // Client Developer Best Practices
  "client-developer-best-practices": {
    src: "/images/courses/client-developer-best-practices.jpg",
    scene: "A front-end developer at his desk holding a phone up beside a large monitor, comparing the before and after states of the same app screen.",
  },
  // Launchable Clients
  "launchable-clients": {
    src: "/images/courses/launchable-clients.jpg",
    scene: "Two hands holding a rugged field tablet running a live ordering app, its category buttons and order list on screen, in a stockroom.",
  },
  // Client Layouts, Templates and Components
  "client-layouts-templates-components": {
    src: "/images/courses/client-layouts-templates-and-components.jpg",
    scene: "A laptop screen showing four variants of the same button component side by side in a dark design tool, shot close with the room falling into bokeh.",
  },
  // System Modeler
  "system-modeler-2": {
    src: "/images/courses/system-modeler.jpg",
    scene: "A top-down view of a desk where a box-and-arrow flow model has been drawn on a dot-grid pad in marker, lying over the printed product brief and user goals it came from.",
  },
  // Server Dev Best Practices
  "server-developer-best-practices": {
    src: "/images/courses/server-dev-best-practices.jpg",
    scene: "Two developers leaning in over one laptop reading through code together, a second monitor with terminal output behind them.",
  },
  // Namespace & Org Admin
  "organization-namespace-administration": {
    src: "/images/courses/namespace-and-org-admin.jpg",
    scene: "An engineering floor where several teams work side by side at their own multi-monitor workstations under the windows.",
  },
  // Vantiq CLI
  "vantiq-command-line-interface-2": {
    src: "/images/courses/vantiq-cli.jpg",
    scene: "A monitor in a dark room running htop in a terminal, the CPU meters, load average and coloured process table filling the screen.",
  },
  // System Administration
  "vantiq-system-administration": {
    src: "/images/courses/system-administration.jpg",
    scene: "A systems administrator working with both hands inside a rack, seating a bundle of network cables into a patch panel.",
  },
  // Vantiq Server Deployment
  "vantiq-deployment-system-administration": {
    src: "/images/courses/vantiq-server-deployment.jpg",
    scene: "A technician in a hi-vis vest driving a screwdriver into rack-mount equipment while installing it into a cabinet.",
  },
};

/**
 * Every course in COURSE_CATALOG has its own entry, so the fallback only fires
 * for a course added without a banner. It resolves to the Foundations image
 * rather than throwing, because a missing photograph should degrade to a card
 * that still renders rather than take the catalogue down.
 */
export function courseImage(course: Pick<CatalogCourse, "id">): CourseImage {
  return COURSE_IMAGES[course.id] ?? COURSE_IMAGES["applications-developer-level-1"];
}
