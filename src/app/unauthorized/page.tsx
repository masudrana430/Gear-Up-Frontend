import Link from "next/link";
import { ShieldX } from "lucide-react";
export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-20">
      <section className="w-full rounded-2xl border bg-card p-8 text-center">
        <ShieldX className="mx-auto size-12 text-destructive" />
        <h1 className="mt-5 text-3xl font-bold">Access denied</h1>
        <p className="mt-3 text-muted-foreground">
          Your account role does not have permission to open this dashboard.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go to my dashboard
        </Link>
      </section>
    </main>
  );
}
