"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ShieldCheck,
  Store,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/api/error-parser";
import { dashboardForRole } from "@/lib/constants/routes";
import { loginSchema } from "@/lib/validations/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

type LoginValues = z.infer<typeof loginSchema>;

type DemoAccount = {
  role: "Customer" | "Provider" | "Admin";
  email: string;
  password: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
};

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "Customer",
    email: "final.customer20260709@example.com",
    password: "Customer123",
    description: "Browse and rent outdoor gear.",
    icon: UserRound,
    iconClassName:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
  },
  {
    role: "Provider",
    email: "final.provider20260709@example.com",
    password: "Provider123",
    description: "Manage gear listings and orders.",
    icon: Store,
    iconClassName:
      "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  },
  {
    role: "Admin",
    email: "admin@gearup.com",
    password: "GearUpAdmin@2026",
    description: "Manage users and platform activity.",
    icon: ShieldCheck,
    iconClassName:
      "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  },
];

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (values: LoginValues) => {
    if (isSigningIn) return;

    setIsSigningIn(true);

    try {
      const result = await authService.login(values);

      setSession(result.user, result.accessToken);

      toast.success(`Welcome back, ${result.user.name}`);

      router.replace(dashboardForRole(result.user.role));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSigningIn(false);
    }
  };

  const submit = form.handleSubmit(login);

  const signInWithDemoAccount = (account: DemoAccount) => {
    if (isSigningIn) return;

    form.reset({
      email: account.email,
      password: account.password,
    });

    void login({
      email: account.email,
      password: account.password,
    });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
      noValidate
      aria-busy={isSigningIn}
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isSigningIn}
          aria-invalid={Boolean(form.formState.errors.email)}
          {...form.register("email")}
        />

        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="At least 8 characters"
          disabled={isSigningIn}
          aria-invalid={Boolean(form.formState.errors.password)}
          {...form.register("password")}
        />

        {form.formState.errors.password && (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Quick demo login */}
      <div className="rounded-2xl border bg-muted/35 p-3 dark:bg-white/[0.03]">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground">
            QUICK DEMO SIGN IN
          </p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {DEMO_ACCOUNTS.map((account) => {
            const Icon = account.icon;

            return (
              <button
                key={account.role}
                type="button"
                disabled={isSigningIn}
                onClick={() => signInWithDemoAccount(account)}
                className="group rounded-xl border bg-background p-3 text-left transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/[0.04] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/40 dark:hover:bg-white/[0.06]"
              >
                <span
                  className={`grid size-9 place-items-center rounded-lg ${account.iconClassName}`}
                >
                  <Icon className="size-4" />
                </span>

                <span className="mt-3 block text-sm font-bold">
                  {account.role}
                </span>

                <span className="mt-1 block min-h-10 text-xs leading-5 text-muted-foreground">
                  {account.description}
                </span>

                <span className="mt-2 block text-xs font-semibold text-primary transition group-hover:translate-x-1">
                  Sign in instantly →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
        type="submit"
        disabled={isSigningIn}
      >
        {isSigningIn ? "Signing in…" : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to GearUp?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}