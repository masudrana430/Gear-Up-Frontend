import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create account | GearUp" };

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 items-center px-4 py-12">
      <section className="w-full rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-primary">START YOUR NEXT ADVENTURE</p>
        <h1 className="mt-2 text-3xl font-bold">Create a GearUp account</h1>
        <p className="mb-7 mt-2 text-sm text-muted-foreground">
          Rent reliable equipment or grow your rental business.
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}
