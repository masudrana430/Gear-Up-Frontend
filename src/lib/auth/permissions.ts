import type { UserRole } from "@/types";

export const canAccessRole = (actual: UserRole, allowed: UserRole[]) =>
  allowed.includes(actual);

export const canManageUsers = (role: UserRole) => role === "ADMIN";
export const canManageInventory = (role: UserRole) => role === "PROVIDER";
export const canRentGear = (role: UserRole) => role === "CUSTOMER";
