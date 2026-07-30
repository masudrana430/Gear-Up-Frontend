"use client";

import { ROLE_LABELS } from "@/lib/constants/roles";
import { useAuthStore } from "@/store/auth-store";
import { LogoutButton } from "@/components/auth/logout-button";

export function DashboardHeader() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;
  return (
    <div className="mb-7 flex items-center justify-between rounded-2xl border bg-card p-4">
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-muted-foreground">
          {ROLE_LABELS[user.role]} · {user.email}
        </p>
      </div>
      <LogoutButton />
    </div>
  );
}
