import type { User } from "@/types";

export type ClientSession = {
  user: User;
  authenticatedAt: string;
};

export const sessionFromUser = (user: User): ClientSession => ({
  user,
  authenticatedAt: new Date().toISOString(),
});
