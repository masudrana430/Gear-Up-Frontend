"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { tokenStorage } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/query-keys";
import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const query = useQuery({
    queryKey: queryKeys.me,
    queryFn: authService.me,
    enabled: Boolean(tokenStorage.get()),
    retry: false,
  });

  useEffect(() => {
    if (query.data) setUser(query.data);
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) logout();
  }, [logout, query.isError]);

  return {
    user,
    isAuthenticated,
    setSession,
    setUser,
    logout,
    isLoading: query.isLoading,
  };
}
