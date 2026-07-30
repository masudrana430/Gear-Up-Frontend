"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();
  if (isLoading || !user) return <LoadingSpinner label="Loading your dashboard…" />;
  return <div className="flex-1 bg-muted/30 lg:flex">
    <DashboardSidebar role={user.role} />
    <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
      <DashboardHeader />
      {children}
    </main>
  </div>;
}
