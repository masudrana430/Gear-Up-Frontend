import Link from "next/link";
import { ArrowRight, Quote, ShieldCheck } from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { MagneticButton } from "../ui/magnetic-button";

const testimonials = [
  {
    quote:
      "I found a hiking backpack and trekking gear for my weekend trip without having to buy equipment I would only use once.",
    name: "Afsana Rahman",
    designation: "Customer · Hiking rental",
    src: "/images/categories/hiking.jpg",
  },
  {
    quote:
      "GearUp makes it much easier to list equipment, receive bookings, and keep track of returns from one dashboard.",
    name: "Siam Ahmed",
    designation: "Provider · Camping equipment",
    src: "/images/categories/camping.jpg",
  },
  {
    quote:
      "The date selection and rental process felt simple. I could focus on planning the ride instead of finding a bike.",
    name: "Nabila Hasan",
    designation: "Customer · Cycling rental",
    src: "/images/categories/cycling.jpg",
  },
  {
    quote:
      "I needed water-sport equipment for one day. Booking local gear was more practical than buying and storing it.",
    name: "Rafiul Karim",
    designation: "Customer · Water-sports rental",
    src: "/images/categories/water-sports.jpg",
  },
];

export function AnimatedTestimonialsDemo() {
  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200 bg-slate-50 py-16 text-slate-950 sm:py-24 dark:border-white/10 dark:bg-[#050b1f] dark:text-white">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-16 hidden size-80 rounded-full bg-cyan-400/15 blur-3xl dark:block"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-32 hidden size-96 rounded-full bg-violet-500/20 blur-3xl dark:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden opacity-20 dark:block [background-image:linear-gradient(rgba(103,232,249,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.1)_1px,transparent_1px)] [background-size:34px_34px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
              <ShieldCheck className="size-4" />
              LOCAL ADVENTURE STORIES
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Built for weekends
              <span className="block bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                worth remembering.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              GearUp helps customers find equipment and gives local providers a
              better way to share their gear.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <Quote className="size-5 text-cyan-600 dark:text-cyan-300" />
            Real rental experiences, made simple.
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-8 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-black/40">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
          />

          <AnimatedTestimonials testimonials={testimonials} />
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Find gear near you, book securely, then get outside.
          </p>

          <MagneticButton strength={0.18}>
            <Link
              href="/gear"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-cyan-700 transition hover:gap-3 dark:text-cyan-300"
            >
              Explore available gear
              <ArrowRight className="size-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
