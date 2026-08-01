"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, MapPin, Mountain, Send } from "lucide-react";
import { AnimatedEarth } from "@/components/layout/animated-earth";

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Enter your email address first.");
      return;
    }

    // Connect this to a real newsletter API later.
    setMessage("Newsletter form is ready for backend connection.");
  };

  return (
    <footer className="relative overflow-hidden bg-slate-50 px-4 pb-4 pt-20 dark:bg-[#030817] sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-[1440px] rounded-[38px] border border-slate-200/80 bg-white/60 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02] sm:p-6">
        

        {/* Footer: black in light mode, premium white in dark mode */}
        <div className="relative mt-16 rounded-[30px] bg-[#050608] px-6 pb-8 pt-px text-white shadow-[0_25px_70px_rgba(0,0,0,0.25)] dark:border dark:border-slate-200 dark:bg-[radial-gradient(circle_at_92%_0%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(135deg,#ffffff_0%,#f8fafc_55%,#eef2ff_100%)] dark:text-slate-950 sm:mt-20 sm:px-10 lg:px-20">
          {/* This card stays in layout flow, so nothing can appear beneath it. */}
          <section className="relative z-20 mx-4 -mt-16 mb-10 min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#171827] via-[#0a0c11] to-[#0b121e] p-7 text-white shadow-[0_24px_60px_rgba(0,0,0,0.38)] dark:border-slate-200 dark:bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.14),transparent_35%),linear-gradient(135deg,#ffffff_0%,#f8fafc_60%,#ecfeff_100%)] dark:text-slate-950 sm:mx-10 sm:-mt-20 sm:mb-12 sm:min-h-[280px] sm:p-10 lg:mx-20 lg:min-h-[300px] lg:p-14">
            <div
              aria-hidden="true"
              className="absolute -left-12 bottom-0 size-56 rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-cyan-300/20"
            />

            <div className="relative z-10 max-w-md">
              <p className="text-xs font-bold tracking-[0.2em] text-cyan-200 dark:text-cyan-700">
                RENT SMARTER. EXPLORE FURTHER.
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Local gear.
                <br />
                Big weekends.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300 dark:text-slate-600 sm:text-base">
                Find the equipment you need, reserve your dates, and make room
                for more adventure.
              </p>

              <Link
                href="/gear"
                className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200 dark:bg-slate-950 dark:text-white dark:hover:bg-cyan-600"
              >
                Browse gear
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Original abstract rental-globe visual */}
            <AnimatedEarth className="absolute -bottom-24 -right-20 hidden size-[380px] lg:block" />
          </section>

          <div className="relative z-10 grid gap-12 pb-2 lg:grid-cols-[1.4fr_repeat(3,0.7fr)]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-2xl bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
                  <Mountain className="size-5" />
                </span>

                <span className="text-xl font-black">
                  Gear
                  <span className="text-cyan-300 dark:text-cyan-700">Up</span>
                </span>
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400 dark:text-slate-600">
                Rent what you need. Share what you own. Adventure more without
                filling your home with gear.
              </p>

              <div className="mt-6 flex items-start gap-3 text-sm text-slate-400 dark:text-slate-600">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-300 dark:text-cyan-700" />
                <span>
                  Built for local adventure.
                  <br />
                  Chattogram, Bangladesh.
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white dark:text-slate-950">
                Explore
              </h4>

              <div className="mt-5 space-y-3 text-sm text-slate-400 dark:text-slate-600">
                <Link
                  href="/gear"
                  className="block transition hover:text-cyan-300 dark:hover:text-cyan-700"
                >
                  Browse gear
                </Link>

                <Link
                  href="/auth/register"
                  className="block transition hover:text-cyan-300 dark:hover:text-cyan-700"
                >
                  List your gear
                </Link>

                <Link
                  href="/auth/register"
                  className="block transition hover:text-cyan-300 dark:hover:text-cyan-700"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white dark:text-slate-950">
                Account
              </h4>

              <div className="mt-5 space-y-3 text-sm text-slate-400 dark:text-slate-600">
                <Link
                  href="/auth/login"
                  className="block transition hover:text-cyan-300 dark:hover:text-cyan-700"
                >
                  Sign in
                </Link>

                <Link
                  href="/auth/register"
                  className="block transition hover:text-cyan-300 dark:hover:text-cyan-700"
                >
                  Join GearUp
                </Link>

                <Link
                  href="/gear"
                  className="block transition hover:text-cyan-300 dark:hover:text-cyan-700"
                >
                  Find gear nearby
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white dark:text-slate-950">
                Platform
              </h4>

              <div className="mt-5 space-y-3 text-sm text-slate-400 dark:text-slate-600">
                <p>Secure payments</p>
                <p>Rental tracking</p>
                <p>Trusted providers</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 dark:border-slate-200 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} GearUp. All rights reserved.</p>
            <p>Made for people who would rather be outside.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
