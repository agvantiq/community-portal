// Sales Hub content. The hub landing page (app/sales-center/page.tsx) renders
// one module block per section here; each block links to its own dedicated
// page rather than an in-page anchor. Deal data itself (DEALS, Deal, DealStage)
// stays in sample-data.ts since it's also used by the Partner Admin dashboard —
// deal-stage visibility ("the pipeline") is exec-only; everyone else only gets
// Deal Registration.

import {
  FilePlus2,
  Zap,
  Presentation,
  Video,
  Megaphone,
  FileText,
  Calculator,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { FLAGSHIP_INDUSTRIES } from "@/lib/flagship-industries";

// --- Key Collaterals (/sales-center/key-collaterals) ---
export const DATASHEETS_AND_WHITEPAPERS = [
  { title: "Vantiq Platform Datasheet", detail: "A one-page technical summary of the platform." },
  { title: "Vantiq Solution Overview", detail: "How Vantiq's capabilities map to a customer's problem." },
  { title: "Vantiq Agentic AI", detail: "Positioning and capabilities for agentic AI use cases." },
];

export const INDUSTRY_SOLUTION_BRIEFS = [
  { title: "Healthcare", detail: "Reference architecture and positioning for healthcare deployments." },
  { title: "Public Safety", detail: "Reference architecture and positioning for public safety deployments." },
  { title: "Defense", detail: "Reference architecture and positioning for defense deployments." },
  { title: "Smart Cities", detail: "Reference architecture and positioning for smart city deployments." },
];

export interface DemoVideo {
  title: string;
  detail: string;
  category: string;
  href: string;
}

// Mirrors Vantiq's public demo library (vantiq.com/demos) — pre-recorded reels for
// outbound/campaigns, distinct from the interactive Flagship Demos, which are live,
// industry-specific walkthroughs a partner runs themselves in front of a prospect.
// Each entry opens the real hosted video on vantiq.com in a new tab.
export const MARKETING_DEMOS: DemoVideo[] = [
  {
    title: "Agentic AI in Manufacturing Demo",
    category: "Manufacturing",
    detail: "Event-driven AI monitors the factory floor and coordinates automated responses to anomalies.",
    href: "https://vantiq.com/demos/agentic-ai-in-manufacturing-demo/",
  },
  {
    title: "Remote Patient Monitoring Demo",
    category: "Healthcare",
    detail: "Real-time home health monitoring that surfaces alerts and AI guidance for care teams.",
    href: "https://vantiq.com/demos/remote-patient-monitoring-demo/",
  },
  {
    title: "Heatstroke Monitoring and Prevention for Field Operations",
    category: "Public Safety",
    detail: "Wearable and weather data flag heat-stress risk and trigger safety responses for field crews.",
    href: "https://vantiq.com/demos/heatstroke-monitoring-and-prevention-for-field-operations/",
  },
  {
    title: "Real-Time Disaster Response Monitoring Application",
    category: "Public Safety",
    detail: "Multi-sensor monitoring that detects, tracks, and coordinates response to emergency scenarios live.",
    href: "https://vantiq.com/demos/real-time-disaster-response-monitoring-application/",
  },
  {
    title: "Building an Automated PDF Ingestion and Monitoring App",
    category: "Healthcare",
    detail: "Automatically scrapes, tracks changes in, and stores documents pulled from multiple websites.",
    href: "https://vantiq.com/demos/building-an-automated-pdf-ingestion-and-monitoring-app/",
  },
  {
    title: "Firefighter Safety Monitoring Application",
    category: "Public Safety",
    detail: "Wearables, drone feeds, and weather combine into one dashboard with automated safety alerts.",
    href: "https://vantiq.com/demos/firefighter-safety-monitoring-application/",
  },
  {
    title: "Agentic AI for Home Health Care Planning",
    category: "Agentic AI",
    detail: "Agentic AI drafts personalized home care plans that managers review and adjust in real time.",
    href: "https://vantiq.com/demos/agentic-ai-for-home-health-care-planning/",
  },
  {
    title: "Building Agentic AI Applications Demo",
    category: "Healthcare",
    detail: "Live device data, EHRs, and AI combine to auto-detect clinical issues and alert care teams.",
    href: "https://vantiq.com/demos/building-agentic-ai-applications-demo/",
  },
  {
    title: "Smart City Demo",
    category: "Smart City",
    detail: "Citywide infrastructure, utilities, and public safety data unified into one real-time operational view.",
    href: "https://vantiq.com/demos/smart-city-demo/",
  },
  {
    title: "Transaction Monitoring Demo",
    category: "Finance",
    detail: "AI-driven monitoring flags anomalous transactions instantly so compliance teams can act before risk escalates.",
    href: "https://vantiq.com/demos/transaction-monitoring-demo/",
  },
  {
    title: "Disaster Management Demo",
    category: "Public Safety",
    detail: "Live data, AI, and operational workflows coordinate disaster response and guide citizens to safety.",
    href: "https://vantiq.com/demos/disaster-management-demo/",
  },
  {
    title: "Coordinating Ambulance Transport in Real Time",
    category: "Healthcare",
    detail: "Live coordination between ambulances, hospitals, and care teams for faster emergency response.",
    href: "https://vantiq.com/demos/coordinating-ambulance-transport-in-real-time/",
  },
  {
    title: "Multi AI-Agent Demo",
    category: "Manufacturing",
    detail: "Multiple specialized AI agents work together to monitor, diagnose, and act on the factory floor.",
    href: "https://vantiq.com/demos/multi-ai-agent-demo/",
  },
];

export const MARKETING_COLLATERAL = [
  { title: "Vantiq Brand Guidelines", type: "PDF" },
  { title: "Co-Branded Email Templates", type: "ZIP" },
  { title: "Social Media Asset Pack", type: "ZIP" },
  { title: "Partner Logo Kit", type: "ZIP" },
];

export const CUSTOMER_PITCH_COLLATERAL = [
  "Executive Overview Deck",
  "ROI Calculator",
  "Reference Architecture One-Pager",
];

export const PROJECT_SIZING_PRICING = ["2026 Price List (Partners)", "Sizing Worksheet", "SOW Template"];

export interface SalesHubModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  /** Item count shown as a badge. Omit for action-oriented modules (e.g. a form) with no list to count. */
  count?: number;
}

export const SALES_HUB_MODULES: SalesHubModule[] = [
  {
    id: "key-collaterals",
    title: "Key Collaterals",
    description: "Datasheets, whitepapers, and industry solution briefs.",
    icon: Layers,
    href: "/sales-center/key-collaterals",
    count: DATASHEETS_AND_WHITEPAPERS.length + INDUSTRY_SOLUTION_BRIEFS.length,
  },
  {
    id: "flagship-demos",
    title: "Interactive Demos",
    description: "End-to-end demos ready for customer meetings.",
    icon: Presentation,
    href: "/sales-center/flagship-demos",
    count: FLAGSHIP_INDUSTRIES.length,
  },
  {
    id: "marketing-demos",
    title: "Demo Videos",
    description: "Short, polished demo videos for outbound and campaigns.",
    icon: Video,
    href: "/sales-center/marketing-demos",
    count: MARKETING_DEMOS.length,
  },
  {
    id: "vantiq-spark",
    title: "Vantiq Spark",
    description: "Quick-turn tools for the first customer conversation.",
    icon: Zap,
    href: "/sales-center/vantiq-spark",
  },
  {
    id: "marketing-collateral",
    title: "Marketing Collateral",
    description: "Brand assets, templates, and co-marketing materials.",
    icon: Megaphone,
    href: "/sales-center/marketing-collateral",
    count: MARKETING_COLLATERAL.length,
  },
  {
    id: "deal-registration",
    title: "Deal Registration",
    description: "Register a new lead and track it through to close.",
    icon: FilePlus2,
    href: "/sales-center/deal-registration",
  },
  // Phase 2 — re-enable once Customer Pitch Collateral and Project Sizing &
  // Pricing are linked from navigation again:
  // {
  //   id: "customer-pitch",
  //   title: "Customer Pitch Collateral",
  //   description: "Decks and calculators for the customer-facing pitch.",
  //   icon: FileText,
  //   href: "/sales-center/customer-pitch",
  //   count: CUSTOMER_PITCH_COLLATERAL.length,
  // },
  // {
  //   id: "project-sizing",
  //   title: "Project Sizing & Pricing",
  //   description: "Worksheets and templates for scoping and pricing a deal.",
  //   icon: Calculator,
  //   href: "/sales-center/project-sizing",
  //   count: PROJECT_SIZING_PRICING.length,
  // },
];
