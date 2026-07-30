import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign in | GearUp" };

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-4 py-16">
      <section className="w-full rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-primary">WELCOME BACK</p>
        <h1 className="mt-2 text-3xl font-bold">Sign in to GearUp</h1>
        <p className="mb-7 mt-2 text-sm text-muted-foreground">
          Manage rentals, inventory, or platform activity.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
