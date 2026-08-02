"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MousePointer2 } from "lucide-react";
import { Compare } from "@/components/ui/compare";
import { MagneticButton } from "../ui/magnetic-button";
import { KineticText } from "../ui/kinetic-text";

export function OwnLessCompare() {
  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200 bg-slate-50 py-16 text-slate-950 sm:py-24 dark:border-white/10 dark:bg-[#050b1f] dark:text-white">
      <div
        aria-hidden="true"
        className="absolute -left-36 top-0 hidden size-[30rem] rounded-full bg-cyan-400/15 blur-3xl dark:block"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-32 hidden size-[32rem] rounded-full bg-violet-500/20 blur-3xl dark:block"
      />

      <div className="relative mx-auto grid max-w-8xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
            MADE FOR REAL ADVENTURES
          </p>

          <h2 className="mt-4 text-8xl font-black tracking-tight sm:text-8xl">
            <KineticText
              as="span"
              text="Own less."
              className="block [font-optical-sizing:auto]"
            />

            <KineticText
              as="span"
              text="Explore more."
              className="block bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent [font-optical-sizing:auto]"
            />
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">
            Don&apos;t fill your home with equipment you only use a few times a
            year. Rent trusted local gear when your next adventure starts.
          </p>

          <ul className="mt-7 space-y-3">
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="size-5 shrink-0 text-cyan-600 dark:text-cyan-300" />
              No storage space needed
            </li>

            <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="size-5 shrink-0 text-cyan-600 dark:text-cyan-300" />
              Rent for one day or a full trip
            </li>

            <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="size-5 shrink-0 text-cyan-600 dark:text-cyan-300" />
              Support local outdoor providers
            </li>
          </ul>

          <MagneticButton strength={0.18}>
            <Link
              href="/gear"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
            >
              Browse rental gear
              <ArrowRight className="size-4" />
            </Link>
          </MagneticButton>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between">
            <span className="rounded-full border border-white/20 bg-slate-950/65 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-white backdrop-blur-md">
              BUY &amp; STORE
            </span>

            <span className="rounded-full border border-cyan-200/30 bg-cyan-400/15 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-cyan-50 backdrop-blur-md">
              RENT &amp; EXPLORE
            </span>
          </div>

          <Compare
            firstImage="/images/compare/buy-store.jpg"
            secondImage="/images/compare/rent-explore.jpg"
            firstImageClassName="object-cover object-center"
            secondImageClassname="object-cover object-center"
            className="h-[270px] w-full rounded-[1.5rem] border border-slate-200 shadow-2xl shadow-slate-950/15 sm:h-[380px] lg:h-[470px] dark:border-white/10 dark:shadow-black/50"
            initialSliderPercentage={45}
            slideMode="drag"
            showHandlebar
          />

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <MousePointer2 className="size-4 text-cyan-600 dark:text-cyan-300" />
            Drag the divider to compare
          </div>
        </div>
      </div>
    </section>
  );
}
