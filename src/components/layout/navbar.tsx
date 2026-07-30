"use client";

import Link from "next/link";
import { Moon, Mountain, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { dashboardForRole } from "@/lib/constants/routes";
import { LogoutButton } from "@/components/auth/logout-button";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Mountain className="size-5" />
          </span>
          <span className="text-lg">GearUp</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/gear"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Browse gear
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 dark:hidden" />
            <Moon className="hidden size-4 dark:block" />
          </Button>
          {isAuthenticated && user ? (
            <>
              <Link
                href={dashboardForRole(user.role)}
                className="hidden rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground sm:block"
              >
                Dashboard
              </Link>
              <LogoutButton compact />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden px-3 py-2 text-sm font-medium sm:block"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              >
                Join
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
