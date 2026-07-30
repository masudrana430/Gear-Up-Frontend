import type { User, UserRole } from "./user";

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role: Exclude<UserRole, "ADMIN">;
};

export type AuthResult = {
  user: User;
  accessToken: string;
};
