export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  profileImage?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};
