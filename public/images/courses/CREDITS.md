# Course banner photography

One photograph per course, 56 in total. Every image is a distinct Unsplash
photo: verified unique by photo id and by file content hash.

All images are Unsplash free tier (not Unsplash+), downloaded at 1200x675.

## Why one per course

An earlier version mapped these 56 courses onto 13 images by topic cluster. The
catalogue sorts by catalogue order, so identical banners landed next to each
other, up to seven in a row. Cluster mapping also forced metaphor, since a
single picture had to stand in for a whole track. Both are fixed by sourcing
per course and choosing literal subjects.

## Selection rules

1. **Unique.** No photograph appears twice.
2. **Literal.** Depict the subject, or the activity the course teaches. No
   symbols standing in for abstract topics.
3. **Survives the treatment.** Cards apply `saturate-[0.55] contrast-[1.1]
   brightness-[0.92]`, a `bg-primary/22` teal multiply and a bottom-weighted
   `from-primary/50` multiply, with the title in bold white over the lower
   left. Every candidate was checked twice: once at the real crop, then again
   with the treatment and a sample title applied. High-key frames were rejected
   because white titles disappear on them.
4. **No third-party branding.** Readable vendor logos and product names were
   rejected. Two known exceptions are noted below.

## Known exceptions

- `testing.jpg` carries a small Lenovo wordmark on a monitor bezel, roughly 3%
  of frame width. Tighter crops pushed pale instrument faces into the title band
  and cost contrast, so the wider frame was kept. Not readable at card size
  under the teal treatment.
- `edge-ai-architecture.jpg` shows a Raspberry Pi with the small raspberry
  silkscreen glyph and no wordmark, effectively invisible after treatment.

## Weakest fits, flagged for revisiting

Unsplash has no honest, unbranded photograph of generative AI: the category is
either branded product screenshots, 3D robot renders, or a person at a laptop.
These fell back to the literal activity instead, and are the first candidates
for replacement if better sources become available:

- `intro-to-genai-apps.jpg` and `advanced-genai-apps.jpg` both show people
  building software, separated by scale.
- `vantiq-ai-fit-framework.jpg` shows structured card sorting, which depicts
  the framework half of the title but not the AI half.
- `namespace-and-org-admin.jpg` shows an engineering floor with several teams,
  honest about "org" but not about namespace administration.
- `vantiq-catalog.jpg` uses a library card catalogue, a real catalogue and
  browsable index, but an analogy rather than software.

## Full attribution

| Course | File | Photographer | Unsplash | Scene |
|---|---|---|---|---|
| VAIL Fundamentals | `vail-fundamentals.jpg` | Chris Ried | [ieic5Tq8YMk](https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-code-on-it-ieic5Tq8YMk) | Colour syntax-highlighted Python source code with line numbers filling a dark computer monitor shot at a slight angle. |
| Edge AI Architecture Deep Dive | `edge-ai-architecture.jpg` | Stefan Cosma | [f3Yk7gW6chM](https://unsplash.com/photos/green-and-black-computer-motherboard-f3Yk7gW6chM) | A single-board computer with two metal heatsinks, GPIO header pins, USB and Ethernet ports resting on a dark textured surface. |
| Edge Deployment Patterns | `edge-deployment-patterns.jpg` | Homa Appliances | [ERXFD4jLpJc](https://unsplash.com/photos/a-line-of-electrical-equipment-in-a-factory-ERXFD4jLpJc) | A row of identical automated production line stations on a factory floor, each with its own push-button control panel, status lamps and looped cable harness. |
| Real-Time Event Orchestration | `real-time-event-orchestration.jpg` | Tasha Kostyuk | [TtMKq3lJm-U](https://unsplash.com/photos/a-man-sitting-in-front-of-multiple-monitors-TtMKq3lJm-U) | An operator seen from behind in a darkened control room facing a wall of roughly twenty live screens showing camera feeds, process schematics and status dashboards. |
| Building Custom Connectors | `building-custom-connectors.jpg` | Scott Rodgerson | [PSpf_XgOM5w](https://unsplash.com/photos/a-bunch-of-blue-wires-connected-to-each-other-PSpf_XgOM5w) | Thick blue network cables fanning out from a patch panel and plugged into labelled ports with yellow link LEDs, against a black rack interior. |
| Vantiq Value Proposition | `vantiq-value-proposition.jpg` | Christina @ wocintechchat.com | [1573167507387-6b4b98cb7c13](https://unsplash.com/photos/people-on-conference-table-looking-at-talking-woman-Q80LYxv_Tbs) | A full boardroom of colleagues seated down both sides of a long wooden table, watching a woman writing on the whiteboard at the far end. |
| Discovery Call Playbook | `discovery-call-playbook.jpg` | The Jopwell Collection | [1653669486900-fd06730dcc78](https://unsplash.com/photos/a-man-and-a-woman-sitting-at-a-table-pL0835-dILw) | Two people mid-conversation across a small round table by a window, a notebook, a phone and a pen on the table between them. |
| Competitive Positioning | `competitive-positioning.jpg` | Vitaly Gariev | [1758876021444-3885d0a2539f](https://unsplash.com/photos/man-planning-on-sticky-notes-wall-in-office-1c-YonlQjUE) | A man standing at a dark grey office wall, reaching up to rearrange a grid of coloured sticky notes laid out in rows and columns. |
| Closing Enterprise Deals | `closing-enterprise-deals.jpg` | Dimitri Karastelev | [1635859890085-ec8cb5466806](https://unsplash.com/photos/a-woman-sitting-at-a-table-with-lots-of-papers-ZH4FUYiaczY) | A hand holding a pen over a fan of printed contract pages spread across a dark table, the other hand resting on the stack. |
| AI Market Today | `ai-market-today.jpg` | Jakub Zerdzicki | [1748439435495-722cc1728b7e](https://unsplash.com/photos/a-traders-desk-is-lit-up-with-charts-aGKspo5OIyg) | A working desk at night with a laptop and two wide monitors filled with live market quote tables and candlestick charts. |
| AI Concepts | `ai-concepts.jpg` | Austin | [1736066330610-c102cab4e942](https://unsplash.com/photos/a-group-of-people-sitting-in-front-of-a-blackboard-N8Z8s3n3qBk) | An instructor standing beside a blackboard covered in chalked diagrams and notation, teaching a seated class in a dark wood lecture room. |
| What Is Vantiq | `what-is-vantiq.jpg` | Miha Meglic | [p7Bfwn_VKRQ](https://unsplash.com/photos/a-control-room-with-a-desk-and-two-chairs-p7Bfwn_VKRQ) | A plant control room with a curved operator console and two chairs facing a full-width wall of mimic panels, gauges and screens under a coffered light ceiling. |
| Orchestration as Transformation Enabler | `orchestration-transformation-enabler.jpg` | Adrian Sulyok | [c_4eaGRDSVU](https://unsplash.com/photos/c_4eaGRDSVU) | Warehouse staff in hi-vis vests and work blues walking down the central aisle of a live distribution warehouse, motion-blurred mid-stride between tall orange pallet racking on both sides. |
| Consultative Selling for Vantiq | `consultative-selling-for-vantiq.jpg` | Md Ishak Rahman | [1780733066665-21bebd5eeab5](https://unsplash.com/photos/businesswoman-pointing-at-documents-for-businessman-in-office-s2Tcv1uulc8) | A woman standing over a dark desk, pointing at a printed bar chart report while the seated man she is advising follows along. |
| Competitive Positioning for Vantiq | `competitive-positioning-for-vantiq.jpg` | Kvalifik | [1598520106804-d05d4a743915](https://unsplash.com/photos/person-in-black-and-white-striped-long-sleeve-shirt-holding-white-pen-IzLoifsGL1A) | Close on a person's hands writing percentage splits and labelled boxes for platform versus consulting onto a glass board. |
| Discovery and Deal Qualification | `discovery-and-deal-qualification.jpg` | Vitaly Gariev | [1758873271687-ec6b5bc28fe8](https://unsplash.com/photos/team-collaborating-around-a-table-with-charts-3-gj1U72tiQ) | Overhead view of four colleagues leaning over a table covered in printed sales-by-region charts, annotating them with pens. |
| Pitching Value and Business Impact | `pitching-value-and-business-impact.jpg` | Vitaly Gariev | [1758691736097-7f735ac5f118](https://unsplash.com/photos/man-presenting-data-on-a-large-screen-to-colleagues-eb5nX6G1sk0) | A man presenting beside a large wall screen of line and bar charts, seen over the shoulders of the colleagues he is presenting to. |
| Objection Handling for Vantiq | `objection-handling-for-vantiq.jpg` | G + L | [1711636091907-5038a1f4434d](https://unsplash.com/photos/a-group-of-people-sitting-in-chairs-in-a-room-QgFnw3cCaiI) | Seen from the back of a seated room, one attendee raises her hand to put a question to the front. |
| Land and Expand Strategy | `land-and-expand-strategy.jpg` | Shridhar Gupta | [1527192491265-7e15c55b1ed2](https://unsplash.com/photos/people-sitting-in-front-of-computer-monitors-dZxQn4VEv2M) | A wide loft office floor with long shared desk benches, many workstations occupied and many more standing empty alongside them. |
| Technical Differentiators | `technical-differentiators.jpg` | Paymo | [-s2FC9pPP1E](https://unsplash.com/photos/-s2FC9pPP1E) | A team leader stands at a wall screen presenting to colleagues around a meeting-room table, seen through the glass wall. |
| Architectural Principles | `architectural-principles.jpg` | Daniel Miksha | [28ww1dSengI](https://unsplash.com/photos/28ww1dSengI) | A large printed engineering system schematic, its radial structure and numbered sections drawn out across the sheet. |
| Technical Discovery | `technical-discovery.jpg` | Kaleidico | [xxHDLWmc1wE](https://unsplash.com/photos/xxHDLWmc1wE) | Close on a person's hands taking handwritten notes on a pad with a marker while facing someone across a table. |
| Demo & Proof Strategy | `demo-and-proof-strategy.jpg` | Teemu Paananen | [bzdhc5b3Bxs](https://unsplash.com/photos/bzdhc5b3Bxs) | A presenter on a darkened stage gestures at a large projection screen showing a live application interface to a seated audience. |
| Vantiq Solution Design | `vantiq-solution-design.jpg` | Kelly Sikkema | [ml1IgjV8OvY](https://unsplash.com/photos/ml1IgjV8OvY) | Overhead view of hands drawing an application user-flow diagram of linked screen wireframes in a sketchbook, with sticky notes on the desk. |
| Vantiq Solution Development | `vantiq-solution-development.jpg` | Árpád Czapp | [H424WdcQN4Y](https://unsplash.com/photos/H424WdcQN4Y) | A developer's hands on a laptop keyboard at night with syntax-highlighted source code filling the monitor above. |
| The Vantiq AI Fit Framework | `vantiq-ai-fit-framework.jpg` | UX Indonesia | [WCID2JWoxwE](https://unsplash.com/photos/WCID2JWoxwE) | A person sorting handwritten labelled cards into grouped columns across a desk during a structured assessment session. |
| Applications Developer Foundations Course | `foundation-course.jpg` | Quilia | [1-aA2Fadydc](https://unsplash.com/photos/a-group-of-people-in-a-room-with-a-projector-screen-1-aA2Fadydc) | A room of seated attendees facing an instructor at a lectern with his laptop, beside a large projected screen, during a class in session. |
| The VIA and KB MCP Servers | `the-via-and-kb-mcp-servers.jpg` | Kier in Sight Archives | [3Nwt6w-KU3E](https://unsplash.com/photos/a-close-up-of-a-server-room-3Nwt6w-KU3E) | A close frontal view of dark server racks packed floor to ceiling with equipment modules, hanging patch cables and small status LEDs. |
| Intro to GenAI Apps | `intro-to-genai-apps.jpg` | Compagnons | [Im_cQ6hQo10](https://unsplash.com/photos/woman-in-black-shirt-sitting-beside-black-flat-screen-computer-monitor-Im_cQ6hQo10) | Two developers seated side by side behind their monitors, the nearest screen filled with an application's source code open in an IDE. |
| Advanced GenAI Apps | `advanced-genai-apps.jpg` | Hack Capital | [uv5_bsypFUM](https://unsplash.com/photos/black-flat-screen-computer-monitors-uv5_bsypFUM) | An open plan engineering office where headphoned developers work at desks holding three monitors of dense code and terminal output. |
| Multi-agent Orchestration | `multi-agent-orchestration.jpg` | Simon Kadula | [8gr6bObQLOI](https://unsplash.com/photos/a-factory-filled-with-lots-of-orange-machines-8gr6bObQLOI) | Three orange industrial robot arms working together over one shared conveyor line inside a working factory. |
| Trust & Governance | `trust-and-governance.jpg` | Luke Caunt | [5utYi64hnJ0](https://unsplash.com/photos/rows-of-white-archive-boxes-on-wooden-shelves-5utYi64hnJ0) | A narrow records archive aisle where white boxes printed 'archive' fill the wooden shelving down both walls, closed at the far end by a panelled oak door under a wall clock. |
| Version Control System | `version-control-system.jpg` | Yancy Min | [842ofHC6MaI](https://unsplash.com/photos/842ofHC6MaI) | A code editor screen showing a commit history graph with coloured branch lines, branch labels and file tree. |
| Shadowing / Reverse Shadowing | `shadowing-reverse-shadowing.jpg` | Blackcreek Corporate | [4wrd0uTOwSg](https://unsplash.com/photos/4wrd0uTOwSg) | One person leans in over a colleague's shoulder and points at their monitor while the colleague works. |
| Vantiq on Edge | `vantiq-on-edge.jpg` | Raymond Sime | [KDkU44ikiko](https://unsplash.com/photos/KDkU44ikiko) | An open industrial control cabinet with rack-mounted programmable controllers, terminal blocks and colour-coded field wiring. |
| Assemblies | `assemblies.jpg` | Blaz Erzetic | [g5f0BJq-FRs](https://unsplash.com/photos/g5f0BJq-FRs) | A hand fitting a component into a partly populated circuit board on a workbench, with a driver alongside. |
| Vantiq Catalog | `vantiq-catalog.jpg` | Jan Antonin Kolar | [lRoX0shwjUQ](https://unsplash.com/photos/lRoX0shwjUQ) | A wall of wooden library card-catalogue drawers, each with a printed index label in its brass holder. |
| App & GenAI Comp | `app-and-genai-comp.jpg` | Zulfugar Karimov | [-lZmnpignB8](https://unsplash.com/photos/-lZmnpignB8) | A dark application screen showing a generative-AI prompt component: an 'Ask anything' input with an attach and tools row. |
| Dev Best Practices | `dev-best-practices.jpg` | X (@disruptxn) | [IgUR1iX0mqM](https://unsplash.com/photos/IgUR1iX0mqM) | Two developers lean into a laptop screen full of code during a code review, with the rest of the team working behind them. |
| Vail Rules | `vail-rules.jpg` | Patrick Martin | [UMlT0bviaek](https://unsplash.com/photos/UMlT0bviaek) | A macro frame of real source code on a lit monitor, the comment lines and typedef declarations sharp in the centre and falling out of focus toward the edges. |
| Vail DML | `vail-dml.jpg` | Ilija Boshkov | [0nI1DczRQAM](https://unsplash.com/photos/0nI1DczRQAM) | A screen photographed at an angle showing data-manipulation code, with Array.filter, Array.sortBy and Array.iter operations chained down the frame. |
| Vantiq Integration | `vantiq-integration.jpg` | Peaky Frames | [Aowg76xooEY](https://unsplash.com/photos/Aowg76xooEY) | A screen filled with an async REST call: fetchData(url) awaiting a response, checking response.ok, throwing a network Error and parsing the JSON body. |
| Vail Procedures | `vail-procedures.jpg` | Ion (Ivan) Sipilov | [Z8Fm-Dc3G7A](https://unsplash.com/photos/Z8Fm-Dc3G7A) | A developer seen from behind at a home desk under warm string lights, writing code across a widescreen monitor and a second display. |
| Testing | `testing.jpg` | Lightsaber Collection | [hqBr-KfgR8o](https://unsplash.com/photos/hqBr-KfgR8o) | A hardware test bench with an optical pulse meter and an IL and RL test station wired up in orange and cyan patch cords, the monitor above showing a table of measurements ending in a green Pass. |
| Distributed Deployment | `distributed-deployment.jpg` | Taylor Vick | [aWslrFhs1w4](https://unsplash.com/photos/aWslrFhs1w4) | A wide view down a data centre hall with rows of server cabinets and overhead cable trays running the length of the room. |
| Client Developer Best Practices | `client-developer-best-practices.jpg` | Faizur Rehman | [x0YNF7uY0is](https://unsplash.com/photos/x0YNF7uY0is) | A front-end developer at his desk holding a phone up beside a large monitor, comparing the before and after states of the same app screen. |
| Launchable Clients | `launchable-clients.jpg` | Compagnons | [O3YTqGI6fEE](https://unsplash.com/photos/O3YTqGI6fEE) | Two hands holding a rugged field tablet running a live ordering app, its category buttons and order list on screen, in a stockroom. |
| Client Layouts, Templates and Components | `client-layouts-templates-and-components.jpg` | Dharmik Moradiya | [I_8_KJBWAV4](https://unsplash.com/photos/I_8_KJBWAV4) | A laptop screen showing four variants of the same button component side by side in a dark design tool, shot close with the room falling into bokeh. |
| Design Model | `design-model.jpg` | Kaleidico | [26MJGnCM0Wc](https://unsplash.com/photos/26MJGnCM0Wc) | Two people drawing a model on a whiteboard with markers, boxes, arrows, a numbered list and sticky notes filling the board. |
| System Modeler | `system-modeler.jpg` | Kelly Sikkema | [wdnpaTNwOEQ](https://unsplash.com/photos/wdnpaTNwOEQ) | A top-down view of a desk where a box-and-arrow flow model has been drawn on a dot-grid pad in marker, lying over the printed product brief and user goals it came from. |
| Server Dev Best Practices | `server-dev-best-practices.jpg` | Flipsnack | [Hp4RPL_Z6wE](https://unsplash.com/photos/Hp4RPL_Z6wE) | Two developers leaning in over one laptop reading through code together, a second monitor with terminal output behind them. |
| Software Development Lifecycle | `software-development-lifecycle.jpg` | Vitaly Gariev | [LLQGyw2my7k](https://unsplash.com/photos/LLQGyw2my7k) | A wide view of a dark-walled studio where someone is arranging a planning wall of sticky notes into columns, desks and shelves in the foreground. |
| Namespace & Org Admin | `namespace-and-org-admin.jpg` | Compagnons | [Fa9b57hffnM](https://unsplash.com/photos/Fa9b57hffnM) | An engineering floor where several teams work side by side at their own multi-monitor workstations under the windows. |
| Vantiq CLI | `vantiq-cli.jpg` | Lukas | [MU8w72PzRow](https://unsplash.com/photos/MU8w72PzRow) | A monitor in a dark room running htop in a terminal, the CPU meters, load average and coloured process table filling the screen. |
| System Administration | `system-administration.jpg` | Sammyayot254 | [knUZi7dzb58](https://unsplash.com/photos/knUZi7dzb58) | A systems administrator working with both hands inside a rack, seating a bundle of network cables into a patch panel. |
| Vantiq Server Deployment | `vantiq-server-deployment.jpg` | Valentin Lacoste | [fJTyegEd-6k](https://unsplash.com/photos/fJTyegEd-6k) | A technician in a hi-vis vest driving a screwdriver into rack-mount equipment while installing it into a cabinet. |
