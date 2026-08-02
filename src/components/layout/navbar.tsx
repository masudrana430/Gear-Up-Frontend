"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  House,
  LayoutDashboard,
  LogIn,
  Menu,
  Moon,
  Mountain,
  Sun,
  UserPlus,
  X,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/auth-store";
import { dashboardForRole } from "@/lib/constants/routes";
import { LogoutButton } from "@/components/auth/logout-button";
import { MagneticButton } from "../ui/magnetic-button";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <MagneticButton strength={0.18}>
      <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="group relative h-10 w-[72px] overflow-hidden rounded-full border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur-xl transition hover:scale-[1.03] hover:shadow-md dark:border-white/10 dark:bg-slate-900/70"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/80 via-cyan-50/40 to-violet-100/60 dark:from-white/10 dark:via-cyan-400/10 dark:to-violet-500/20" />

      <Sun className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-amber-500 transition dark:text-amber-200/60" />
      <Moon className="absolute right-2 top-1/2 size-4 -translate-y-1/2 text-indigo-500 transition dark:text-cyan-200" />

      <span
        className={`absolute top-1 grid size-8 place-items-center rounded-full border border-white/70 bg-white/90 shadow-[0_4px_14px_rgba(15,23,42,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/20 dark:bg-slate-800 ${
          isDark ? "translate-x-[34px] rotate-[360deg]" : "translate-x-1"
        }`}
      >
        <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white via-white/50 to-cyan-200/30 dark:from-white/20 dark:via-indigo-400/20 dark:to-cyan-300/20" />

        {isDark ? (
          <Moon className="relative z-10 size-4 text-cyan-200" />
        ) : (
          <Sun className="relative z-10 size-4 text-amber-500" />
        )}
      </span>
    </button>
    </MagneticButton>
    
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = resolvedTheme === "dark";

  const navItems: NavigationItem[] = [
    {
      label: "Home",
      href: "/",
      icon: House,
    },
    {
      label: "Browse gear",
      href: "/gear",
      icon: Compass,
    },
    {
      label: "Features",
      href: "/features",
      icon: Sparkles,
    },
    ...(isAuthenticated && user
      ? [
          {
            label: "Dashboard",
            href: dashboardForRole(user.role),
            icon: LayoutDashboard,
          },
        ]
      : []),
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07112c]/75">
        <div className="mx-auto flex h-16 max-w-[2000px] items-center justify-between px-4 sm:px-6 md:grid md:h-[82px] md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-bold tracking-tight"
          >
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md dark:border-white/10 dark:bg-slate-900">
              <span className="absolute inset-1 rounded-xl bg-gradient-to-br from-cyan-100 via-white to-violet-100 dark:from-cyan-400/20 dark:via-indigo-500/20 dark:to-violet-400/20" />
              <Mountain className="relative z-10 size-5 text-slate-900 dark:text-white" />
            </span>

            <span className="text-lg text-slate-950 dark:text-white">
              Gear<span className="text-cyan-600 dark:text-cyan-300">Up</span>
            </span>
          </Link>

          {/* Desktop water-glass navigation */}
          <nav
            aria-label="Main navigation"
            className="relative hidden items-stretch rounded-[24px] border border-slate-200/80 bg-white/60 p-1.5 pt-5 shadow-[0_12px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55 md:flex"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative min-w-[96px] rounded-[18px] px-4 pb-2.5 pt-5 text-center text-xs font-bold transition-all duration-300 ${
                    active
                      ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`absolute left-1/2 top-0 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border shadow-[0_6px_18px_rgba(15,23,42,0.14)] transition-all duration-300 group-hover:-translate-y-[55%] ${
                      active
                        ? "border-white/50 bg-gradient-to-br from-cyan-300 via-indigo-400 to-violet-500 text-white"
                        : "border-white/80 bg-white/75 text-slate-700 backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/80 dark:text-cyan-100"
                    }`}
                  >
                    <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white/80 via-white/30 to-cyan-200/20 dark:from-white/20 dark:via-white/5 dark:to-cyan-300/10" />
                    <Icon className="relative z-10 size-4" />
                  </span>

                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <div className="hidden md:block">
              <ThemeToggle
                isDark={isDark}
                onToggle={() => setTheme(isDark ? "light" : "dark")}
              />
            </div>

            {isAuthenticated && user ? (
              <div className="hidden md:block">
                <LogoutButton compact />
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/auth/login"
                  className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  <LogIn className="size-4" />
                  Sign in
                </Link>

                <Link
                  href="/auth/register"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-white dark:text-slate-950 dark:shadow-white/10 dark:hover:bg-cyan-200"
                >
                  <UserPlus className="size-4" />
                  Join
                </Link>
              </div>
            )}

            <div className="md:hidden">
              <ThemeToggle
                isDark={isDark}
                onToggle={() => setTheme(isDark ? "light" : "dark")}
              />
            </div>

            <button
              type="button"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white/75 text-slate-900 shadow-sm backdrop-blur md:hidden dark:border-white/10 dark:bg-slate-900/75 dark:text-white"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar stays mounted, so closing animation also works. */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[70] md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-slate-950/50 backdrop-blur-[3px] transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,390px)] flex-col overflow-hidden border-l border-white/30 bg-white/80 p-5 shadow-[-24px_0_70px_rgba(15,23,42,0.25)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/10 dark:bg-[#07112c]/90 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute -right-20 top-20 size-64 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-400/15"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 size-64 rounded-full bg-violet-400/30 blur-3xl dark:bg-violet-500/20"
          />

          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 font-bold text-slate-950 dark:text-white"
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Mountain className="size-5" />
              </span>
              GearUp
            </Link>

            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-900 transition hover:rotate-90 dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav
            className="relative z-10 mt-12 space-y-3"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center gap-4 rounded-2xl border p-3 transition duration-300 ${
                    active
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg dark:border-white dark:bg-white dark:text-slate-950"
                      : "border-slate-200/80 bg-white/45 text-slate-700 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`relative grid size-11 place-items-center overflow-hidden rounded-full border ${
                      active
                        ? "border-white/30 bg-white/15 dark:border-slate-300 dark:bg-slate-900/10"
                        : "border-white/70 bg-white/70 dark:border-white/10 dark:bg-slate-900/70"
                    }`}
                  >
                    <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white/70 via-white/20 to-cyan-200/30 dark:from-white/15 dark:to-cyan-300/10" />
                    <Icon className="relative z-10 size-5" />
                  </span>

                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 mt-auto space-y-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white/50 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-bold tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                READY FOR YOUR NEXT TRIP
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Find local gear, reserve your dates, and get outside.
              </p>
            </div>

            {isAuthenticated && user ? (
              <LogoutButton compact />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white/70 text-sm font-semibold text-slate-900 dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  Sign in
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
                >
                  Join GearUp
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
