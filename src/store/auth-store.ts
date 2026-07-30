"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { tokenStorage } from "@/lib/auth/token";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setSession: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setSession: (user, token) => {
        tokenStorage.set(token, user.role);
        set({ user, isAuthenticated: true });
      },
      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
      logout: () => {
        tokenStorage.clear();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "gearup-auth",
      partialize: ({ user, isAuthenticated }) => ({ user, isAuthenticated }),
    },
  ),
);
