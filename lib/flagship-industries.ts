// Backs Sales Hub's Interactive Demos (/sales-center/flagship-demos).
//
// Content is drawn from the actual Flagship Demo Series projects, not invented:
// codenames, namespaces, agent rosters and capabilities come from each demo's
// own source and UI.
//
// `agentCount` is the authoritative number, confirmed against each demo's own
// build/audit session, NOT inferred from the local folder. Those folders are
// partial mirrors (the projects live in Vantiq namespaces), and counting synced
// files under-reported Manufacturing, Public Safety and Retail badly.
//
// `agents` is separate and optional: it lists names only where the full roster
// is known. Three demos have one; the rest show the count alone rather than a
// partial list presented as complete.

export interface FlagshipUseCase {
  title: string;
  description: string;
  tag: string;
}

export interface FlagshipIndustry {
  id: string;
  label: string;
  /** Project codename, where the demo has one. */
  codename?: string;
  /** Vantiq package the demo is built in. */
  namespace: string;
  /** Path under public/. Pass through `asset()` at render time for basePath. */
  image: string;
  /** Describes the scene, not the industry label the card already prints. */
  imageAlt: string;
  /** One line for the index card. */
  summary: string;
  /** Fuller framing for the detail page. */
  description: string;
  /** Total agents in the demo. Confirmed per demo. Do not derive from `agents`. */
  agentCount: number;
  /** Named agents, only where the full roster is known. */
  agents?: string[];
  /** What the demo actually shows. */
  useCases: FlagshipUseCase[];
  /**
   * Real screenshots of the demo, captured from its own UI, never stock
   * imagery standing in for one. Present only where the interface could
   * actually be run and captured offline; the rest await captures from a
   * connected environment. See public/images/demos/README.md.
   */
  gallery?: { src: string; caption: string }[];
}

export const FLAGSHIP_INDUSTRIES: FlagshipIndustry[] = [
  {
    id: "logistics",
    label: "Logistics",
    codename: "Meridian",
    namespace: "com.meridian.logistics",
    agentCount: 7,
    image: "/images/industry-logistics.jpg",
    imageAlt: "Stacked freight containers beneath gantry cranes at a port",
    summary:
      "A supply-chain control tower where governed agents watch a live network, raise incidents, argue with each other, and ask permission before they act.",
    description:
      "A control tower for a fictional European third-party logistics operator. Agents watch a simulated network (raising incidents, requesting approvals, debating each other, and acting) with every action bounded by a written policy and recorded in an audit trail. The central claim is that the agents are not clever scripts with database access; they are actors operating under written authority, and nothing mutates operational state except through that gate.",
    agents: [
      "Cold Chain",
      "Dynamic Routing",
      "Fleet Asset",
      "Carrier Management",
      "Supply Chain Risk",
      "Sustainability",
      "Customs Compliance",
    ],
    gallery: [
      {
        src: "/images/demos/logistics/control-tower.png",
        caption:
          "Control tower: shipments in flight, on-time rate, at-risk count and open incidents over the European network, with the incident feed running alongside.",
      },
      {
        src: "/images/demos/logistics/approvals.png",
        caption:
          "Approvals: actions an agent may not take unaided. Each carries the agent's reasoning, the policy that routed it there, the role required to decide, and an expiry.",
      },
      {
        src: "/images/demos/logistics/arbitration.png",
        caption:
          "Arbitration: three agents wanted incompatible things. The winning position is shown with the rule that decided it, and the losing position is kept as quantified dissent: the cost, carbon and hours it would have saved.",
      },
      {
        src: "/images/demos/logistics/agent-comms.png",
        caption:
          "Agent communication: every edge is something that actually happened: a decision published, a position overruled, evidence corroborated, a decision escalated to a human.",
      },
      {
        src: "/images/demos/logistics/shipment-detail.png",
        caption:
          "Shipment detail: movement, live cold-chain state with mean kinetic temperature and how much of the stability budget remains, customs standing and emissions, on one consignment.",
      },
    ],
    useCases: [
      {
        title: "Every action passes a policy gate",
        description:
          "Agent conclusions funnel through one procedure that checks the proposed action against that agent's written policy (confidence floors, cost ceilings, permission tiers, written prohibitions) and routes it to auto-execution, a human approval, or advisory-only.",
        tag: "Governance",
      },
      {
        title: "Multi-agent arbitration with quantified dissent",
        description:
          "When cold chain, sustainability and routing want incompatible things, precedence rules resolve it. Losing positions are stored with the cost, carbon and hours they would have saved. One case records that rail would have saved 127 kg CO₂e, and why it was overruled anyway.",
        tag: "Arbitration",
      },
      {
        title: "Winning a debate grants no extra authority",
        description:
          "The arbitrated action goes back through the ordinary decision path and faces the same policy gate as any other. An agent that wins an argument still cannot act beyond what its policy permits.",
        tag: "Governance",
      },
      {
        title: "Predictive ETA with confidence bands",
        description:
          "Every movement writes a P10/P50/P90 window with the named reasons for its spread, and the median is honest about its source: extrapolated pace once under way, route plan before that. Mandatory driver rest goes into the median rather than the band, because a legally required stop is arithmetic, not uncertainty.",
        tag: "Forecasting",
      },
      {
        title: "Customs holds judged against the cargo, not the clock",
        description:
          "For perishable freight the question is never how long a hold lasts but whether it outlasts the stability budget left. The same four-hour paperwork hold is critical for frozen vaccine and routine for fresh produce, and demurrage prices on escalating tiers per started day.",
        tag: "Compliance",
      },
      {
        title: "A sweep that catches what emits no event",
        description:
          "A hold can go from tolerable to terminal without anything about the hold changing, because the crossing is the absence of change. A time-driven sweep re-checks open holds against eroding budgets and escalates when one quietly crosses the line.",
        tag: "Detection",
      },
      {
        title: "Agent communication reconstructed, not instrumented",
        description:
          "The comms graph draws only edges that really exist (a decision published to the bus, an arbitration position that lost, evidence joining another agent's incident, a decision escalated to a human), rebuilt from stored events, positions and the audit trail rather than from invented chatter.",
        tag: "Observability",
      },
      {
        title: "Live external signals and emissions accounting",
        description:
          "Facility weather comes from a live external source and is mapped to operational risk, so freezing rain outranks a thunderstorm because black ice stops a truck. Emissions are priced per mode against real route distance, so a modal-shift proposal carries a real number.",
        tag: "Integration",
      },
      {
        title: "A deterministic world you can reset mid-demo",
        description:
          "Reset rebuilds the identical network every time from a seeded baseline, so a scenario behaves the same in front of every customer, and approvals expire and stale tasks escalate on the simulation clock, not wall-clock time, so a paused demo doesn't drift.",
        tag: "Simulation",
      },
    ],
  },
  {
    id: "defense",
    label: "Defense",
    codename: "Sentinel",
    namespace: "com.sentinel",
    agentCount: 12,
    image: "/images/industry-defense.jpg",
    imageAlt: "Large radio antenna dish in open terrain at dusk",
    summary:
      "Multi-domain situational awareness where deterministic agents fuse observations across domains and route every consequential decision to human authority.",
    description:
      "A synthetic multi-domain command-and-control demonstration. Deterministic agents monitor a six-site operating area, fuse observations across domains, and route consequential decisions to human authority, expressed in the doctrinal vocabulary a military audience already reads: CCIR/PIR/FFIR, NATO Admiralty grading, ATP 5-19 risk, DRRS readiness, Days of Supply, PACE, MEDEVAC 9-line and Sphere minimum standards. All data is synthetic. The platform models no weapons, no targeting and no lethal effects, and never applies a posture change on its own authority. There is no LLM anywhere in it: every agent is deterministic, so behaviour is reproducible and auditable.",
    agents: [
      "ISR Fusion",
      "Base Security",
      "Force Readiness",
      "Contested Logistics",
      "Medical Readiness",
      "Humanitarian Ops",
      "Uncrewed Systems",
      "Comms Resilience",
      "Cyber Physical",
      "Asset Readiness",
      "Facility Energy",
      "Mission Command",
    ],
    gallery: [
      {
        src: "/images/demos/defense/command-center.jpg",
        caption:
          "Command Center: mission readiness, open incidents and pending approvals over the common operational picture, with the event stream alongside.",
      },
      {
        src: "/images/demos/defense/operational-picture.jpg",
        caption:
          "Common Operational Picture: six sites with comms links, sensor coverage rings and named areas of interest. Only friendly and neutral symbology is drawn; there are no target areas.",
      },
      {
        src: "/images/demos/defense/approvals.jpg",
        caption:
          "Command Approval Queue: decisions routed to human authority, each carrying its evidence, Admiralty source grading and residual risk. The 'deciding as' selector checks the decision against who actually holds authority.",
      },
      {
        src: "/images/demos/defense/information-flow.jpg",
        caption:
          "Information Flow Enforcement: accredited boundaries and every verdict the cross-domain guard rendered, permitted and refused alike, each with its reason.",
      },
      {
        src: "/images/demos/defense/controls-assurance.jpg",
        caption:
          "Controls & Assurance: NIST 800-53 controls mapped to the resources implementing them and the tests proving them, recomputed on every run.",
      },
    ],
    useCases: [
      {
        title: "Findings answer the questions the commander asked",
        description:
          "Assessments are matched against standing information requirements (PIR, FFIR, CCIR and EEFI), and a tripped commander-level requirement raises the authority needed, even where the agent had assessed the action as something it could take alone.",
        tag: "Doctrine",
      },
      {
        title: "Uncertainty is preserved, not resolved away",
        description:
          "Corroboration and contradiction drive a NATO Admiralty grade. Contradictory reporting produces an incident held as uncertain rather than an adjudicated answer, and data carrying spoofing indicators is quarantined for review instead of mutating the operational picture.",
        tag: "Fusion",
      },
      {
        title: "Authority is verified, not asserted",
        description:
          "A 'deciding as' selector runs every approval against who actually holds authority, at what level, over what scope, and whether it has been revoked. An agent cannot approve its own request, and delegation only ever moves downward.",
        tag: "Access control",
      },
      {
        title: "The refusals are the demonstration",
        description:
          "A refused decision writes an authority-violation record naming the control and the reason, and the request stays pending. A control that refuses silently is indistinguishable from one that isn't running.",
        tag: "Assurance",
      },
      {
        title: "A cross-domain guard that renders verdicts",
        description:
          "Caveats are evaluated before classification level, because a handling restriction is absolute rather than a threshold. One record passes at an own-force boundary and is blocked at a coalition boundary accredited to the same level, and redaction copies rather than deletes, so the partner receives less while the command picture keeps everything.",
        tag: "Information flow",
      },
      {
        title: "Classification by compilation",
        description:
          "An aggregate is classified no lower than the most sensitive report in it and inherits every contributing caveat. Correlating a second domain into an open incident can reclassify it upward by the act of correlation, not by anyone deciding to reclassify.",
        tag: "Classification",
      },
      {
        title: "Edge autonomy through a disconnection",
        description:
          "When a site loses its link, events queue locally and the platform keeps operating on its own authority within set bounds. Reconnection surfaces a sync conflict that is flagged rather than silently overwritten.",
        tag: "Edge / DDIL",
      },
      {
        title: "A tamper-evident audit chain",
        description:
          "Every audit record is sealed into a hash chain, so whether the trail has been altered stops being a matter of trust and becomes a computation. The demo can break its own chain live, name the damaged record, and restore it.",
        tag: "Assurance",
      },
      {
        title: "An accreditation worksheet that re-runs",
        description:
          "A verification suite turns each safety and security claim into an assertion that can fail, and a control matrix maps NIST 800-53 controls to the resources implementing them and the tests proving them, recomputed on every run.",
        tag: "Compliance",
      },
      {
        title: "Command products built from recorded evidence",
        description:
          "Commander's Update Briefs and After-Action Reviews are generated from what actually happened in the run, so every sustain finding traces to a recorded event rather than a narrative written in advance.",
        tag: "Reporting",
      },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    codename: "Northstar",
    namespace: "com.northstar",
    agentCount: 10,
    image: "/images/industry-healthcare.jpg",
    imageAlt: "Clinician moving equipment along a hospital ward corridor",
    summary:
      "A hospital agent operations centre coordinating capacity, patient flow and clinical escalation, and showing what each agent's autonomy was worth.",
    description:
      "A hospital command centre where specialised agents watch admissions, capacity, clinical signals and support functions at once. Each reacts to hospital events, exchanges peer signals with the others, and hands decisions needing a human to an approval queue, with a command agent coordinating across all of them. Alongside the operational picture the demo keeps score of itself: what each agent contributed, what its autonomy avoided, and what every decision cost.",
    agents: [
      "Bed Capacity",
      "Patient Flow",
      "ED Surge",
      "Deterioration",
      "Infection",
      "Operating Room",
      "Pharmacy",
      "Staffing",
      "Equipment",
      "Command",
    ],
    gallery: [
      {
        src: "/images/demos/healthcare/command-center.png",
        caption:
          "Command Center: occupancy, ED waiting and boarding, ICU beds and pending approvals over a live unit map, with the event stream running beside it.",
      },
      {
        src: "/images/demos/healthcare/approval-queue.png",
        caption:
          "Human Approval Queue: agents may not execute these actions without authorization. Each request carries the reasoning, the supporting evidence, the expected impact, the risks and the alternatives considered.",
      },
      {
        src: "/images/demos/healthcare/agent-operations.png",
        caption:
          "Agent Operations: the peer-signalling mesh between the specialist agents, with each agent's card and the case it is currently working.",
      },
      {
        src: "/images/demos/healthcare/autonomy-value.png",
        caption:
          "Autonomy Value: what each agent's autonomy was worth against a baseline: cost avoided, cost incurred, and contribution by agent.",
      },
      {
        src: "/images/demos/healthcare/audit-decisions.png",
        caption:
          "Audit and Decisions: every recommendation, approval and action, so any state the hospital reached can be walked back to what produced it.",
      },
    ],
    useCases: [
      {
        title: "Capacity and flow as one conversation",
        description:
          "Capacity and flow are watched by separate agents that signal each other, so a bed freeing on one ward and a patient boarding on another are the same conversation rather than two dashboards, with boarding, acuity and awaiting-discharge tracked as live capacity risks.",
        tag: "Capacity",
      },
      {
        title: "Emergency department surge",
        description:
          "A dedicated surge agent tracks arrival pressure and escalates when the department crosses its thresholds, routing the response through the same approval path as every other agent.",
        tag: "Escalation",
      },
      {
        title: "Early deterioration and infection signals",
        description:
          "Clinical-signal agents surface patients trending the wrong way and infection-control risks as they emerge, as coordination prompts for staff, never as clinical judgements.",
        tag: "Clinical signals",
      },
      {
        title: "Support functions in the same picture",
        description:
          "Operating room scheduling, pharmacy and equipment availability run as peer agents, so a theatre delay caused by missing equipment is visible as one chain rather than three unrelated alerts.",
        tag: "Coordination",
      },
      {
        title: "Staffing, rosters and agency cover",
        description:
          "The staffing agent reasons over the roster and the cost of covering a gap, so a shortfall arrives with the options and their prices attached rather than as an alert someone else has to price.",
        tag: "Workforce",
      },
      {
        title: "Autonomy value, measured",
        description:
          "The demo reports what each agent's autonomy was worth against a baseline (cost avoided, cost incurred, and contribution by agent), so the question 'what did the agents actually do for us' has an answer on screen.",
        tag: "Value",
      },
      {
        title: "Alternatives considered, not just the recommendation",
        description:
          "Agent recommendations carry the alternatives weighed and the confidence behind them, so a clinician reviewing an approval sees the reasoning rather than a single output to accept or reject.",
        tag: "Explainability",
      },
      {
        title: "Full audit and decision history",
        description:
          "Every recommendation, approval and action lands in a complete decision history, so any state the hospital reached can be walked backwards to the events and approvals that produced it.",
        tag: "Audit",
      },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    codename: "Orion",
    namespace: "com.orion",
    // The demo's own Agent Operations Center renders a 10-node A2A mesh,
    // CMD plus nine domain agents, matching Northstar's "nine specialists
    // plus a command agent" shape. An earlier build note said 8; the running
    // UI is treated as authoritative here.
    agentCount: 10,
    agents: [
      "Plant Command",
      "Train Orchestration",
      "Predictive Maintenance",
      "Quality Intelligence",
      "Process Safety",
      "Feedstock & Additives",
      "Packaging & Logistics",
      "Production Scheduling",
      "Energy Optimization",
      "Supply Chain Risk",
    ],
    image: "/images/industry-manufacturing.jpg",
    imageAlt: "Robotic arm working a modern production line",
    summary:
      "A plant-floor agent operations centre where agents hold running conversations about a machine or order, coordinate robots, and act only once approved.",
    description:
      "A manufacturing operations demo built around an agent hub. Agents open and maintain collaborations scoped to a specific machine, order or event, exchange messages and signals inside them, and record decisions that route through an approval handler. The collaboration is the unit of work rather than the individual alert, so the reasoning behind an intervention stays attached to the thing it concerns, and an operator can ask the command agent directly.",
    gallery: [
      {
        src: "/images/demos/manufacturing/plant-command.png",
        caption:
          "Plant Command Center: OEE, energy draw, open incidents and pending approvals over the production trains, with agent-ranked priorities and the live event stream.",
      },
      {
        src: "/images/demos/manufacturing/agent-mesh.png",
        caption:
          "Agent Operations Center: direct peer signalling between the ten agents. Every line is one agent finding, assessing, escalating or notifying another; there is no routed hub.",
      },
      {
        src: "/images/demos/manufacturing/approvals.png",
        caption:
          "Human Approval Queue: pending requests with their evidence and the alternatives weighed, above a decision history of what was already approved and why.",
      },
      {
        src: "/images/demos/manufacturing/quality.png",
        caption:
          "Quality Intelligence: first-pass yield and live QC lab results, with a failed batch traced into the containment decision the quality agent proposed.",
      },
      {
        src: "/images/demos/manufacturing/executive.png",
        caption:
          "Executive View: value protected, CO₂e avoided, downtime avoided and material recovered, each traced back to the verified interventions that produced it.",
      },
    ],
    useCases: [
      {
        title: "Collaborations scoped to an entity",
        description:
          "A collaboration opens for a given machine or order and carries its own conversation, artifacts and result, so the history of an intervention lives with the asset instead of scrolling away in a feed.",
        tag: "Collaboration",
      },
      {
        title: "An agent directory you can read",
        description:
          "Every agent has a card showing what it watches, what it is currently doing, its priorities and its activity, so the roster is a thing an operator can inspect rather than an implementation detail.",
        tag: "Agent operations",
      },
      {
        title: "Agent-to-agent coordination made visible",
        description:
          "The agent network view shows which agents are talking to which, and about what, so a plant-floor intervention that took three agents to reach reads as one coordinated chain.",
        tag: "Coordination",
      },
      {
        title: "Autonomous mobile robots in the same flow",
        description:
          "AMR guide paths and delivery tasks participate in the same event and decision flow as every other agent, rather than sitting behind a separate control system.",
        tag: "Robotics",
      },
      {
        title: "Approval-gated intervention",
        description:
          "Agent decisions pass through an approval handler governed by an access-control policy before anything acts, so an operator stays in the loop on changes that affect production.",
        tag: "Governance",
      },
      {
        title: "Alternatives considered on every decision",
        description:
          "Decisions record the options weighed and why the chosen one won, so an approval is a judgement an operator can check rather than a recommendation they have to trust.",
        tag: "Explainability",
      },
      {
        title: "Ask the command agent",
        description:
          "An assistant surface lets an operator put a question to the command agent about current plant risks or a specific asset, grounded in the same state the agents are reasoning over.",
        tag: "Assistant",
      },
      {
        title: "Complete audit trail",
        description:
          "Every message, decision and approval lands in an audit trail and decision history, so the plant's current state can always be traced back to what produced it.",
        tag: "Audit",
      },
    ],
  },
  {
    id: "public-safety",
    label: "Public Safety",
    codename: "Riverton",
    namespace: "com.vantiq.ps",
    // 11 confirmed from Agents.listAgents in the running demo, which is what
    // the Agents and Systems screen renders. The demo's own presenter guide
    // says "seven agents fan out", which is stale: a single fire scenario was
    // measured with 9 distinct agents producing recommendations. A twelfth,
    // Recovery Coordination, issues recommendations but is not registered.
    agentCount: 11,
    agents: [
      "Incident Triage",
      "Dispatch Support",
      "Fire Response",
      "EMS Coordination",
      "Traffic & Evacuation",
      "Infrastructure & Utilities",
      "Public Communications",
      "Emergency Operations",
      "Resource Allocation",
      "Campus Safety",
      "Executive Summary",
    ],
    image: "/images/industry-public-safety.jpg",
    imageAlt: "Emergency ambulance responding through a street, motion blurred",
    summary:
      "A city emergency operations centre where specialist agents triage incoming signals, coordinate the response across agencies, and hand every consequential call to a human.",
    description:
      "A city emergency operations centre. Incoming 911 calls and sensor signals are classified, correlated against active incidents, and either attached as fused context or opened as a new incident with a severity and risk score. Specialist agents then fan out across fire, EMS, traffic, infrastructure, campus and public communications, and the response runs through dispatch, mutual aid, public alerting and recovery, with a dispatcher approving anything consequential. Classification runs on a deterministic standard-operating-procedure table; where a generative credential is configured a GenAI procedure may override it, and which path produced the answer is always recorded.",
    gallery: [
      {
        src: "/images/demos/public-safety/command-center.jpg",
        caption:
          "Executive Command Center: active incidents, a scored risk level with its contributing factors, unit availability and pending decisions, over live KPI history.",
      },
      {
        src: "/images/demos/public-safety/city-map.jpg",
        caption:
          "City map: incidents, evacuation zones, unit positions and district overlays on one operational picture.",
      },
      {
        src: "/images/demos/public-safety/dispatcher.jpg",
        caption:
          "Dispatcher: incidents by status alongside pending agent decisions, each with its confidence, its evidence, and approve, reject or override.",
      },
      {
        src: "/images/demos/public-safety/incident-detail.jpg",
        caption:
          "Incident detail: on-scene status against SLA, unit assignment, the released public alert, and the standard operating procedures retrieved for this incident with their match scores.",
      },
      {
        src: "/images/demos/public-safety/ai-oversight.jpg",
        caption:
          "AI oversight: how many decisions the agents made, how many a human overrode, how much was generated rather than deterministic, plus drift and bias monitoring.",
      },
    ],
    useCases: [
      {
        title: "Deterministic rules, with GenAI allowed to argue",
        description:
          "The SOP classification table runs first and always. A generative procedure may override it by reasoning over the free-text summary, but either path is written into provenance, so an operator can see which one produced the classification rather than trusting a black box.",
        tag: "Provenance",
      },
      {
        title: "Signal fusion into one incident",
        description:
          "A signal matching an active incident in the same district and class within a two-hour window attaches as fused context rather than opening a duplicate, so one event reported three ways stays one incident.",
        tag: "Correlation",
      },
      {
        title: "Cameras classified by what they saw",
        description:
          "Every other sensor names its own incident class, but a camera reports lane blockages, smoke columns and crowd surges alike. A keyword table over the scene summary decides between fire, hazmat, flood, crowd safety and collision, and the matched keyword goes into the reasoning trace.",
        tag: "Classification",
      },
      {
        title: "A plottable incident whichever signal opened it",
        description:
          "When two signals in the same moment resolve to the same class and race to open the incident, the correlating branch backfills a missing location from whichever signal has one, so the incident lands on the map either way.",
        tag: "Resilience",
      },
      {
        title: "Low-impact actions run, consequential ones don't",
        description:
          "Classification is advisory and runs automatically; anything with operational consequence routes to a human. Everything either path does is audited.",
        tag: "Governance",
      },
      {
        title: "Eleven specialists on one incident",
        description:
          "An incident doesn't belong to one agent. Fire, infrastructure, traffic, campus and the rest each produce their own recommendation on the same incident, and a collaboration opens with a commander and a lead agency assigned, so the response is coordinated rather than a pile of parallel alerts.",
        tag: "Coordination",
      },
      {
        title: "Only the agents that should engage, engage",
        description:
          "A fire at a substation brings in fire, infrastructure and traffic while the campus agent correctly stays out. Relevance is decided per incident, so an operator isn't reading recommendations from agents with nothing to contribute.",
        tag: "Relevance",
      },
      {
        title: "Live conditions change the response",
        description:
          "The fire agent fuses live wind into the evacuation zone it recommends, so that a 32 mph wind produces an 800 m zone and the perimeter reflects the conditions at the time rather than a fixed radius from a table.",
        tag: "Situational awareness",
      },
      {
        title: "Public alerts held behind a guardrail",
        description:
          "Anything going to the public queues for public-information sign-off and stays pending until a human releases it. An agent can draft the alert; it cannot publish one.",
        tag: "Guardrail",
      },
      {
        title: "Mutual aid negotiated across agencies",
        description:
          "When the incident outgrows local resources, mutual-aid negotiation resolves against neighbouring agencies modelled as genuinely external parties, so the hand-off crosses an organisational boundary rather than being assumed.",
        tag: "Mutual aid",
      },
      {
        title: "Three live source types, and an edge that keeps working",
        description:
          "Video, MQTT sensor and SMS sources all feed the same intake path, and edge store-and-forward keeps the centre functioning through a connectivity loss rather than dropping what happened during it.",
        tag: "Integration",
      },
      {
        title: "Oversight of the agents themselves",
        description:
          "Human overrides and drift and bias monitoring are first-class views, so the question of whether the agents are still behaving correctly has a place to be answered on screen.",
        tag: "AI oversight",
      },
      {
        title: "Through to recovery, not just response",
        description:
          "The incident lifecycle carries an escalation timer and continues past the emergency into recovery operations, with KPI snapshots capturing how the response actually performed.",
        tag: "Lifecycle",
      },
    ],
  },
  {
    id: "retail",
    label: "Retail",
    // PLACEHOLDER NAME, chosen here, not taken from the demo's own source,
    // which carries no codename. Rename freely.
    codename: "Harborline",
    namespace: "com.vantiq.retail",
    agentCount: 7,
    image: "/images/industry-retail.jpg",
    imageAlt: "Stocked supermarket aisle seen down the centre line",
    summary:
      "A store operations command centre where specialist agents collaborate on one incident, and one of them belongs to another company.",
    description:
      "A retail operations command centre. Specialist agents watch stock, pricing, staffing, loss and customer impact, and collaborate on a single incident rather than raising separate alerts: detection, sourcing, customer-facing mitigation and the associate tasks that follow all belong to the same chain. Competitive price matching deliberately leaves the building: verification is handed to an external partner organisation over agent-to-agent, so the demo shows agents cooperating across a company boundary, not just inside one.",
    agents: [
      "Store Operations",
      "Inventory Replenishment",
      "Loss Prevention",
      "Workforce Optimization",
      "Customer Experience",
      "Supply Chain Exception",
      "Executive Summary",
    ],
    gallery: [
      {
        src: "/images/demos/retail/agent-theater.jpg",
        caption:
          "Multi-Agent AI Layer: the specialist agents ringed around the network hub, with the roster beneath showing what each one watches and the gate it answers to.",
      },
      {
        src: "/images/demos/retail/a2a-partners.jpg",
        caption:
          "Agent-to-agent partner network: agents belonging to other companies, discovered live with their skills and endpoints. This is where a decision leaves the building.",
      },
      {
        src: "/images/demos/retail/decision-walkthrough.jpg",
        caption:
          "Decision walkthrough: one stockout traced end to end: detection, the inventory agent's read, a sourced transfer, customer-facing mitigation, associate tasks, and the approval it stopped at.",
      },
      {
        src: "/images/demos/retail/approvals.jpg",
        caption:
          "Human-in-the-loop approvals: pending decisions with the recommendation, its confidence, the evidence trail behind it and the value at risk, alongside approve, reject and override.",
      },
      {
        src: "/images/demos/retail/governance-scorecard.jpg",
        caption:
          "Governance scorecard: how much ran autonomously, how much escalated, where a guardrail overrode an agent, and per-agent confidence calibration.",
      },
    ],
    useCases: [
      {
        title: "Markdown recommendations on live stock",
        description:
          "The markdown agent evaluates a SKU for clearance pricing based on how close it is to expiry and how slowly it is moving, returning a recommendation rather than repricing on its own authority.",
        tag: "Pricing",
      },
      {
        title: "Price match across an organisational boundary",
        description:
          "Competitive price matching is its own chain: an agent proposes, a threshold decides whether the gap is worth pursuing, and verification is handed to an external partner organisation rather than resolved internally.",
        tag: "Agent-to-agent",
      },
      {
        title: "A threshold that stops noise crossing the boundary",
        description:
          "Only a price gap past the configured threshold escalates to the external partner, so the cross-organisation call happens when it is worth making rather than on every price movement.",
        tag: "Policy",
      },
      {
        title: "Fulfilment handled in the same flow",
        description:
          "A supporting operations procedure prepares the response to a delivery delay, so a pricing decision and the fulfilment problem behind it are handled together rather than in separate systems.",
        tag: "Operations",
      },
      {
        title: "One stockout, four agents, one chain",
        description:
          "Detection opens an incident; the inventory agent analyses it, the supply-chain agent sources a transfer from another location, and the customer-experience agent puts substitution signage in front of shoppers, ending in associate tasks and a single approval request carrying its confidence score.",
        tag: "Collaboration",
      },
      {
        title: "A cold-chain failure priced before anyone decides",
        description:
          "A refrigeration fault auto-actuates a maintenance response, then the at-risk inventory is valued, and only then does disposition hit a policy gate for approval, so the human decides with the cost already on the table.",
        tag: "Cold chain",
      },
      {
        title: "The external agent has no seat at the table",
        description:
          "In the reasoning view the partner agent has no fixed position in the ring the way the internal seven do. It appears when it is engaged and leaves when it isn't, because it belongs to another company.",
        tag: "Agent-to-agent",
      },
      {
        title: "Demand shocks from outside the store",
        description:
          "A local event, a championship game a mile away with fifteen thousand attending, is injected as a signal the agents have to absorb, so the demo shows the store reacting to its neighbourhood rather than only to its own shelves.",
        tag: "Demand",
      },
      {
        title: "Confidence attached to every recommendation",
        description:
          "Approvals arrive with the agent's confidence in the action it is proposing, so an operator can triage what needs real scrutiny rather than treating every request as equal.",
        tag: "Explainability",
      },
      {
        title: "An executive read of the same events",
        description:
          "A summary agent produces the leadership view from the same incident record the store team worked, so the two are never a re-keyed version of each other.",
        tag: "Reporting",
      },
    ],
  },
];

export function getIndustryById(id: string): FlagshipIndustry | undefined {
  return FLAGSHIP_INDUSTRIES.find((i) => i.id === id);
}
