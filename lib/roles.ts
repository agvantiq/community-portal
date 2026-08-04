export type Role =
  | "onboarding"
  | "technical-partner"
  | "sales-partner"
  | "first-time-partner"
  | "employee"
  | "admin"
  | "exec"
  | "guest";

export interface RoleInfo {
  id: Role;
  label: string;
  description: string;
  user: { name: string; title: string; org: string | null; email: string };
}

export const ROLES: Record<Role, RoleInfo> = {
  onboarding: {
    id: "onboarding",
    label: "Onboarding Experience",
    description: "Preview of what a signed-out visitor sees before joining the portal",
    user: {
      name: "Visitor",
      title: "Not Signed In",
      org: null,
      email: "",
    },
  },
  "technical-partner": {
    id: "technical-partner",
    label: "Technical Partner",
    description: "Systems integrator or ISV engineer building on Vantiq",
    user: {
      name: "Alex Rivera",
      title: "Partner Solutions Engineer",
      org: "Radenta Tech",
      email: "alex.rivera@radentatech.com",
    },
  },
  "sales-partner": {
    id: "sales-partner",
    label: "Sales Partner",
    description: "Partner-side rep sourcing and closing Vantiq deals",
    user: {
      name: "Priya Nair",
      title: "Partner Account Manager",
      org: "Radenta Tech",
      email: "priya.nair@radentatech.com",
    },
  },
  "first-time-partner": {
    id: "first-time-partner",
    label: "1st Time Partner Flow",
    description: "Demo of a brand-new partner's first landing on the community portal",
    user: {
      name: "Jordan Lee",
      title: "New Partner",
      org: "Northbridge Solutions",
      email: "jordan.lee@northbridgesolutions.com",
    },
  },
  employee: {
    id: "employee",
    label: "Vantiq Employee",
    description: "Internal Vantiq team member",
    user: { name: "Sam Chen", title: "Solutions Engineer", org: "Vantiq", email: "sam.chen@vantiq.com" },
  },
  admin: {
    id: "admin",
    label: "Vantiq Admin",
    description: "Internal admin with portal analytics access",
    user: {
      name: "Morgan Blake",
      title: "Program Administrator",
      org: "Vantiq",
      email: "morgan.blake@vantiq.com",
    },
  },
  exec: {
    id: "exec",
    label: "Partner Admin",
    description: "Partner-side executive tracking org readiness",
    user: {
      name: "Taylor Brooks",
      title: "VP, Partnerships",
      org: "Radenta Tech",
      email: "taylor.brooks@radentatech.com",
    },
  },
  guest: {
    id: "guest",
    label: "Guest",
    description: "Signed in with a personal email, not a recognized partner company domain",
    user: { name: "Guest", title: "Exploring Vantiq", org: null, email: "guest@gmail.com" },
  },
};

export const ROLE_LIST: RoleInfo[] = Object.values(ROLES);

export const DEFAULT_ROLE: Role = "onboarding";

export const ROLE_STORAGE_KEY = "community-portal-role";
