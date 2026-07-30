import { apiRequest } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { AuthResult, LoginInput, RegisterInput, User } from "@/types";

export const authService = {
  login: (input: LoginInput) =>
    apiRequest<AuthResult>(endpoints.auth.login, { method: "POST", body: input }),
  register: (input: RegisterInput) =>
    apiRequest<AuthResult>(endpoints.auth.register, { method: "POST", body: input }),
  me: () => apiRequest<User>(endpoints.auth.me),
};
