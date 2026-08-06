"use client";

import * as React from "react";
import {
  DEFAULT_ROLE,
  ROLE_STORAGE_KEY,
  ROLES,
  VISITOR_NAME_STORAGE_KEY,
  type Role,
  type RoleInfo,
} from "@/lib/roles";

interface RoleContextValue {
  role: Role;
  info: RoleInfo;
  setRole: (role: Role) => void;
  setVisitorName: (name: string) => void;
}

const RoleContext = React.createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<Role>(DEFAULT_ROLE);
  const [visitorName, setVisitorNameState] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(ROLE_STORAGE_KEY) as Role | null;
    if (stored && stored in ROLES) setRoleState(stored);
    const storedName = window.localStorage.getItem(VISITOR_NAME_STORAGE_KEY);
    if (storedName) setVisitorNameState(storedName);
  }, []);

  const setRole = React.useCallback((next: Role) => {
    setRoleState(next);
    window.localStorage.setItem(ROLE_STORAGE_KEY, next);
  }, []);

  const setVisitorName = React.useCallback((name: string) => {
    setVisitorNameState(name);
    window.localStorage.setItem(VISITOR_NAME_STORAGE_KEY, name);
  }, []);

  const value = React.useMemo(() => {
    const baseInfo = ROLES[role];
    const info: RoleInfo =
      role === "onboarding" && visitorName
        ? { ...baseInfo, user: { ...baseInfo.user, name: visitorName } }
        : baseInfo;
    return { role, info, setRole, setVisitorName };
  }, [role, visitorName, setRole, setVisitorName]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = React.useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within a RoleProvider");
  return ctx;
}
