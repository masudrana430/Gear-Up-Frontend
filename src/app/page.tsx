import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  Mountain,
  PackageCheck,
} from "lucide-react";
import { GearGrid } from "@/components/gear/gear-grid";

const features = [
  {
    icon: CalendarCheck,
    title: "Choose your dates",
    text: "Select available gear and rental dates that fit your plan.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    text: "Complete real payment through the SSLCommerz gateway.",
  },
  {
    icon: PackageCheck,
    title: "Pick up and explore",
    text: "Track confirmation, pickup, and return status from your dashboard.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="overflow-hidden border-b bg-gradient-to-br from-emerald-50 via-background to-orange-50 dark:from-emerald-950/40 dark:to-orange-950/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm font-medium">
              <BadgeCheck className="size-4 text-emerald-600" /> Trusted local providers
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              Adventure-ready gear, <span className="text-primary">without the storage.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Rent quality sports and outdoor equipment by the day. Browse,
              book, pay securely, and get moving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/gear" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 font-medium text-primary-foreground">
                Explore gear <ArrowRight className="size-4" />
              </Link>
              <Link href="/auth/register" className="inline-flex h-11 items-center rounded-lg border bg-background px-5 font-medium">
                List your equipment
              </Link>
            </div>
          </div>
          <div className="relative mx-auto grid aspect-square w-full max-w-lg place-items-center rounded-[3rem] border bg-primary text-primary-foreground shadow-2xl">
            <Mountain className="size-44 opacity-90" />
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-background/95 p-4 text-foreground shadow">
                <p className="text-2xl font-bold">6+</p>
                <p className="text-sm text-muted-foreground">Gear categories</p>
              </div>
              <div className="rounded-2xl bg-background/95 p-4 text-foreground shadow">
                <p className="text-2xl font-bold">Secure</p>
                <p className="text-sm text-muted-foreground">SSLCommerz payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">AVAILABLE NOW</p>
            <h2 className="mt-2 text-3xl font-bold">Featured equipment</h2>
          </div>
          <Link href="/gear" className="hidden items-center gap-1 text-sm font-medium sm:flex">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <GearGrid filters={{ page: 1, limit: 3 }} />
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border bg-card p-6">
                <Icon className="size-8 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
