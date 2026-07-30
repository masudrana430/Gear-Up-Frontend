"use client";

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
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={form.formState.errors.name?.message}>
          <Input
            placeholder="Your name"
            autoComplete="name"
            {...form.register("name")}
          />
        </Field>
        <Field
          label="Email address"
          error={form.formState.errors.email?.message}
        >
          <Input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...form.register("email")}
          />
        </Field>
        <Field
          label="Phone (optional)"
          error={form.formState.errors.phone?.message}
        >
          <Input
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            {...form.register("phone")}
          />
        </Field>
        <Field label="Account type" error={form.formState.errors.role?.message}>
          <select
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            {...form.register("role")}
          >
            <option value="CUSTOMER">Customer — rent equipment</option>
            <option value="PROVIDER">Provider — list equipment</option>
          </select>
        </Field>
      </div>
      <Field
        label="Address (optional)"
        error={form.formState.errors.address?.message}
      >
        <Input
          placeholder="Chattogram, Bangladesh"
          autoComplete="street-address"
          {...form.register("address")}
        />
      </Field>
      <Field label="Password" error={form.formState.errors.password?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="8+ characters with upper, lower and number"
          {...form.register("password")}
        />
      </Field>
      <Button
        className="w-full"
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
