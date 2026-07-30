"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export function RoleGuard({
  allow,
  children,
}: {
  allow: UserRole[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || !allow.includes(user.role))) {
      router.replace(user ? "/unauthorized" : "/auth/login");
    }
  }, [allow, isLoading, router, user]);

  if (isLoading || !user || !allow.includes(user.role)) {
    return <LoadingSpinner label="Checking access…" />;
  }
  return children;
}
