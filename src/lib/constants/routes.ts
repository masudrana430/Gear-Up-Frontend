import type { UserRole } from "@/types";

export const ROUTES = {
  home: "/",
  gear: "/gear",
  login: "/auth/login",
  register: "/auth/register",
  dashboard: "/dashboard",
} as const;

export const dashboardForRole = (role: UserRole) =>
  `/dashboard/${role.toLowerCase()}`;
