export type Role =
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
  user: { name: string; title: string; org: string | null };
}

export const ROLES: Record<Role, RoleInfo> = {
  "technical-partner": {
    id: "technical-partner",
    label: "Technical Partner",
    description: "Systems integrator or ISV engineer building on Vantiq",
    user: { name: "Alex Rivera", title: "Partner Solutions Engineer", org: "Radenta Tech" },
  },
  "sales-partner": {
    id: "sales-partner",
    label: "Sales Partner",
    description: "Partner-side rep sourcing and closing Vantiq deals",
    user: { name: "Priya Nair", title: "Partner Account Manager", org: "Radenta Tech" },
  },
  "first-time-partner": {
    id: "first-time-partner",
    label: "1st Time Partner Flow",
    description: "Demo of a brand-new partner's first landing on the community portal",
    user: { name: "Jordan Lee", title: "New Partner", org: "Northbridge Solutions" },
  },
  employee: {
    id: "employee",
    label: "Vantiq Employee",
    description: "Internal Vantiq team member",
    user: { name: "Sam Chen", title: "Solutions Engineer", org: "Vantiq" },
  },
  admin: {
    id: "admin",
    label: "Vantiq Admin",
    description: "Internal admin with portal analytics access",
    user: { name: "Morgan Blake", title: "Program Administrator", org: "Vantiq" },
  },
  exec: {
    id: "exec",
    label: "Partner Exec",
    description: "Partner-side executive tracking org readiness",
    user: { name: "Taylor Brooks", title: "VP, Partnerships", org: "Radenta Tech" },
  },
  guest: {
    id: "guest",
    label: "Guest",
    description: "Not yet signed in or registered",
    user: { name: "Guest", title: "Exploring Vantiq", org: null },
  },
};

export const ROLE_LIST: RoleInfo[] = Object.values(ROLES);

export const DEFAULT_ROLE: Role = "technical-partner";

export const ROLE_STORAGE_KEY = "community-portal-role";
