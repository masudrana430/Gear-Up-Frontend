"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/api/error-parser";
import { dashboardForRole } from "@/lib/constants/routes";
import { registerSchema } from "@/lib/validations/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

type RegisterValues = z.infer<typeof registerSchema>;

const inputClassName =
  "h-11 rounded-xl border-border/80 bg-muted/30 px-4 shadow-none transition focus-visible:ring-primary/30";

export function RegisterForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "CUSTOMER",
    },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      const result = await authService.register(values);
      setSession(result.user, result.accessToken);
      toast.success("Your GearUp account is ready");
      router.replace(dashboardForRole(result.user.role));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Full name"
          error={form.formState.errors.name?.message}
        >
          <Input
            id="name"
            className={inputClassName}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(form.formState.errors.name)}
            {...form.register("name")}
          />
        </Field>

        <Field
          id="email"
          label="Email address"
          error={form.formState.errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            className={inputClassName}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(form.formState.errors.email)}
            {...form.register("email")}
          />
        </Field>

        <Field
          id="phone"
          label="Phone (optional)"
          error={form.formState.errors.phone?.message}
        >
          <Input
            id="phone"
            className={inputClassName}
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            aria-invalid={Boolean(form.formState.errors.phone)}
            {...form.register("phone")}
          />
        </Field>

        <Field
          id="role"
          label="Account type"
          error={form.formState.errors.role?.message}
        >
          <select
            id="role"
            className={inputClassName}
            aria-invalid={Boolean(form.formState.errors.role)}
            {...form.register("role")}
          >
            <option value="CUSTOMER">Customer — rent equipment</option>
            <option value="PROVIDER">Provider — list equipment</option>
          </select>
        </Field>
      </div>

      <Field
        id="address"
        label="Address (optional)"
        error={form.formState.errors.address?.message}
      >
        <Input
          id="address"
          className={inputClassName}
          placeholder="Chattogram, Bangladesh"
          autoComplete="street-address"
          aria-invalid={Boolean(form.formState.errors.address)}
          {...form.register("address")}
        />
      </Field>

      <Field
        id="password"
        label="Password"
        error={form.formState.errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          className={inputClassName}
          autoComplete="new-password"
          placeholder="8+ characters with upper, lower and number"
          aria-invalid={Boolean(form.formState.errors.password)}
          {...form.register("password")}
        />
      </Field>

      <Button
        className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? "Creating account…"
          : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}