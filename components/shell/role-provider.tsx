"use client";

import * as React from "react";
import { DEFAULT_ROLE, ROLE_STORAGE_KEY, ROLES, type Role, type RoleInfo } from "@/lib/roles";

interface RoleContextValue {
  role: Role;
  info: RoleInfo;
  setRole: (role: Role) => void;
}

const RoleContext = React.createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<Role>(DEFAULT_ROLE);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(ROLE_STORAGE_KEY) as Role | null;
    if (stored && stored in ROLES) setRoleState(stored);
  }, []);

  const setRole = React.useCallback((next: Role) => {
    setRoleState(next);
    window.localStorage.setItem(ROLE_STORAGE_KEY, next);
  }, []);

  const value = React.useMemo(
    () => ({ role, info: ROLES[role], setRole }),
    [role, setRole]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = React.useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within a RoleProvider");
  return ctx;
}
