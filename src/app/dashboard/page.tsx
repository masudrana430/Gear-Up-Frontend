"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { dashboardForRole } from "@/lib/constants/routes";
import { useAuthStore } from "@/store/auth-store";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (user) router.replace(dashboardForRole(user.role));
  }, [router, user]);
  return <LoadingSpinner label="Opening dashboard…" />;
}
