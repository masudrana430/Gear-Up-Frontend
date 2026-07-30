import type { UserRole } from "@/types";

export const ROLES: Record<UserRole, UserRole> = {
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
  ADMIN: "ADMIN",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  CUSTOMER: "Customer",
  PROVIDER: "Provider",
  ADMIN: "Administrator",
};
