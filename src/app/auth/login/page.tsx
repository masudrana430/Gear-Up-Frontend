// src/app/auth/login/page.tsx
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign in | GearUp" };

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full flex-1 items-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border bg-card shadow-xl lg:min-h-[680px] lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: login form */}
        <div className="relative flex items-center px-6 py-10 sm:px-10 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative z-10 w-full max-w-md">
            <div className="mb-14 flex items-center gap-2 font-bold">
              <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_16px] shadow-primary" />
              GearUp<span className="text-primary">.</span>
            </div>

            <p className="text-xs font-bold tracking-[0.18em] text-primary">
              WELCOME BACK
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Sign in to
              <br />
              GearUp<span className="text-primary">.</span>
            </h1>

            <p className="mb-8 mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Manage rentals, inventory, and platform activity from one place.
            </p>

            <LoginForm />
          </div>
        </div>

        {/* Right: video panel */}
        <aside className="relative hidden overflow-hidden bg-slate-950 lg:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/gearup-login.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/10" />

          {/* Curved divider inspired by your reference */}
          <svg
            aria-hidden="true"
            viewBox="0 0 180 800"
            preserveAspectRatio="none"
            className="absolute inset-y-0 left-0 z-10 h-full w-40 text-card"
          >
            <path
              fill="currentColor"
              d="M0 0H85C175 75 165 170 95 260C25 350 165 430 120 545C95 620 140 720 82 800H0Z"
            />
          </svg>

          <div className="relative z-20 flex min-h-[680px] flex-col justify-between p-10 pl-24 text-white">
            <span className="w-fit rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.15em] backdrop-blur-sm">
              GEARUP RENTALS
            </span>

            
          </div>
        </aside>
      </section>
    </main>
  );
}