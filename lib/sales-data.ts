// Sales Hub content. The hub landing page (app/sales-center/page.tsx) renders
// one module block per section here; each block links to its own dedicated
// page rather than an in-page anchor. Deal data itself (DEALS, Deal, DealStage)
// stays in sample-data.ts since it's also used by the Partner Exec dashboard —
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
  type LucideIcon,
} from "lucide-react";
import { FLAGSHIP_INDUSTRIES } from "@/lib/flagship-industries";

export const VANTIQ_SPARK_ITEMS = [
  { title: "Rapid Prototype Builder", detail: "Spin up a branded proof-of-concept in under an hour." },
  { title: "Discovery Question Bank", detail: "Qualifying questions mapped to Vantiq use cases." },
  { title: "Solution Sizing Estimator", detail: "Quick-turn scoping numbers for a first customer call." },
];

// Short, pre-recorded reels for outbound/campaigns — distinct from the
// interactive Flagship Demos, which are live, industry-specific walkthroughs
// a partner runs themselves in front of a prospect.
export const MARKETING_DEMOS = [
  { title: "Vantiq Platform Overview", duration: "2 min", detail: "A quick tour of the platform for a first customer conversation." },
  { title: "Healthcare: Bed Availability in Action", duration: "3 min", detail: "Highlight reel for the hospital-network patient-flow demo." },
  { title: "Manufacturing: Predictive Maintenance Reel", duration: "2 min", detail: "Highlight reel for the assembly-line quality inspection demo." },
  { title: "Public Safety: Incident Response Trailer", duration: "3 min", detail: "Short trailer showing live incident detection and dispatch." },
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
    id: "deal-registration",
    title: "Deal Registration",
    description: "Register a new lead and track it through to close.",
    icon: FilePlus2,
    href: "/sales-center/deal-registration",
  },
  {
    id: "vantiq-spark",
    title: "Vantiq Spark",
    description: "Quick-turn tools for the first customer conversation.",
    icon: Zap,
    href: "/sales-center/vantiq-spark",
    count: VANTIQ_SPARK_ITEMS.length,
  },
  {
    id: "flagship-demos",
    title: "Flagship Interactive Demos",
    description: "End-to-end demos ready for customer meetings.",
    icon: Presentation,
    href: "/sales-center/flagship-demos",
    count: FLAGSHIP_INDUSTRIES.length,
  },
  {
    id: "marketing-demos",
    title: "Marketing Demos",
    description: "Short, polished demo videos for outbound and campaigns.",
    icon: Video,
    href: "/sales-center/marketing-demos",
    count: MARKETING_DEMOS.length,
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
    id: "customer-pitch",
    title: "Customer Pitch Collateral",
    description: "Decks and calculators for the customer-facing pitch.",
    icon: FileText,
    href: "/sales-center/customer-pitch",
    count: CUSTOMER_PITCH_COLLATERAL.length,
  },
  {
    id: "project-sizing",
    title: "Project Sizing & Pricing",
    description: "Worksheets and templates for scoping and pricing a deal.",
    icon: Calculator,
    href: "/sales-center/project-sizing",
    count: PROJECT_SIZING_PRICING.length,
  },
];
