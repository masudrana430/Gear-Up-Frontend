"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return (
    <Button
      type="button"
      variant="ghost"
      size={compact ? "icon" : "sm"}
      onClick={() => {
        logout();
        router.replace("/");
      }}
      aria-label="Sign out"
    >
      <LogOut className="size-4" />
      {!compact && "Sign out"}
    </Button>
  );
}
