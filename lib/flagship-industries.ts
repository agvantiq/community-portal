// Backs Sales Hub's Interactive Demos (/sales-center/flagship-demos)
// — the single entry point for these industry showcases now that every
// non-guest role reaches Sales Hub directly, so a separate Developer Hub
// copy is no longer needed.

import { ShoppingBag, HeartPulse, Siren, Radar, Factory, Truck, type LucideIcon } from "lucide-react";

export interface FlagshipUseCase {
  title: string;
  description: string;
  tag: string;
}

export interface FlagshipIndustry {
  id: string;
  label: string;
  icon: LucideIcon;
  /** What the demo actually shows, for the industry detail page. */
  description: string;
  /** Specific use cases within this industry, each backed by a reusable VAIL template. */
  useCases: FlagshipUseCase[];
}

export const FLAGSHIP_INDUSTRIES: FlagshipIndustry[] = [
  {
    id: "retail",
    label: "Retail",
    icon: ShoppingBag,
    description:
      "Real-time inventory visibility and dynamic pricing across every store location, driven off a single live event stream.",
    useCases: [
      {
        title: "Real-Time Inventory Sync",
        description: "Keep on-hand counts accurate across every store the moment a shelf sensor or POS event fires.",
        tag: "Connector",
      },
      {
        title: "Dynamic Pricing Rules",
        description: "Adjust price automatically based on live demand, inventory levels, or competitor signals.",
        tag: "VAIL Rule",
      },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: HeartPulse,
    description:
      "Bed-availability tracking and patient-flow orchestration across a hospital network, from admission to discharge.",
    useCases: [
      {
        title: "Bed Availability Tracking",
        description: "Surface open beds in real time as patients are admitted, transferred, and discharged.",
        tag: "Data Model",
      },
      {
        title: "HL7/FHIR Patient Ingestion",
        description: "Bring clinical system events into Vantiq without a custom integration for every EHR.",
        tag: "Connector",
      },
    ],
  },
  {
    id: "public-safety",
    label: "Public Safety",
    icon: Siren,
    description:
      "Live incident detection and multi-agency dispatch coordination, unified in a single operational console.",
    useCases: [
      {
        title: "Incident Dispatch Automation",
        description: "Route the nearest available unit the moment an incident is reported, automatically.",
        tag: "VAIL Rule",
      },
      {
        title: "Multi-Agency Alerting",
        description: "Fan a single incident out to every agency that needs to respond, with no manual handoff.",
        tag: "VAIL Rule",
      },
    ],
  },
  {
    id: "defense",
    label: "Defense",
    icon: Radar,
    description:
      "Secure, edge-deployed situational awareness that keeps operating in contested or disconnected environments.",
    useCases: [
      {
        title: "Disconnected Edge Sync",
        description: "Keep operating and later reconcile state when a link to the network drops entirely.",
        tag: "Architecture",
      },
      {
        title: "Secure Telemetry Ingestion",
        description: "Bring sensor data in under strict security and access-control requirements.",
        tag: "Connector",
      },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: Factory,
    description:
      "Predictive maintenance and quality-inspection AI running directly on the plant floor, at the machine level.",
    useCases: [
      {
        title: "Predictive Maintenance",
        description: "Flag a machine likely to fail before it actually does, from its own vibration and temperature data.",
        tag: "GenAI",
      },
      {
        title: "Automated Quality Inspection",
        description: "Catch defects on the line using OPC-UA sensor data and a standing VAIL rule.",
        tag: "VAIL Rule",
      },
    ],
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    description:
      "End-to-end shipment tracking with automated exception handling across every leg of the supply chain.",
    useCases: [
      {
        title: "Shipment Exception Handling",
        description: "Automatically flag and reroute a shipment the moment it falls outside its expected path or timeline.",
        tag: "VAIL Rule",
      },
      {
        title: "Fleet Telemetry Aggregation",
        description: "Roll up live vehicle location and health data from an entire fleet into one event stream.",
        tag: "Connector",
      },
    ],
  },
];

// Cycled by card index so the "generic image" placeholders read as a coherent
// on-brand set (same formula as the Courses catalog banners) without hand
// assigning a gradient per industry.
export const FLAGSHIP_GRADIENTS = [
  "from-primary/25 via-secondary to-accent",
  "from-critical/15 via-secondary to-accent",
  "from-warning/20 via-accent to-secondary",
  "from-emphasis/20 via-accent to-secondary",
  "from-info/20 via-secondary to-accent",
  "from-primary/15 via-accent to-secondary",
];
