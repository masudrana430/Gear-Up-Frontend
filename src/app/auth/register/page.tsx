import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create account | GearUp" };

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full flex-1 items-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2rem] border bg-card shadow-xl lg:min-h-[720px] lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: registration form */}
        <div className="relative flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card px-6 py-10 sm:px-10 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 right-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative z-10 w-full max-w-xl">
            <div className="mb-10 flex items-center gap-2 font-bold">
              <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_16px] shadow-primary" />
              GearUp<span className="text-primary">.</span>
            </div>

            <p className="text-xs font-bold tracking-[0.18em] text-primary">
              START YOUR NEXT ADVENTURE
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Create your
              <br />
              GearUp account<span className="text-primary">.</span>
            </h1>

            <p className="mb-7 mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
              Rent reliable equipment or grow your rental business with GearUp.
            </p>

            <RegisterForm />
          </div>
        </div>

        {/* Right: video + feature cards */}
        <aside className="relative hidden overflow-hidden bg-slate-950 lg:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          >
            <source src="/videos/gearup-login.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-primary/55" />

          {/* Same curved divider used by the login page */}
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

          <div className="relative z-20 flex min-h-[720px] flex-col p-8 pl-20 text-white">
            {/* Dark card */}
            <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/40 p-7 shadow-2xl backdrop-blur-md [mask-image:radial-gradient(3.25rem_at_100%_0,transparent_99%,black_100%)] [-webkit-mask-image:radial-gradient(3.25rem_at_100%_0,transparent_99%,black_100%)]">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                WHY GEARUP
              </p>

              <p className="mt-6 text-5xl leading-none text-primary-foreground">
                “
              </p>

              <h2 className="mt-2 text-3xl font-bold leading-tight">
                Everything you need for your next adventure.
              </h2>

              <p className="mt-5 text-sm leading-6 text-white/70">
                Discover reliable gear, book faster, and manage every rental in
                one simple place.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  G
                </div>
                <div>
                  <p className="text-sm font-semibold">GearUp community</p>
                  <p className="text-xs text-white/60">
                    Built for renters and providers
                  </p>
                </div>
              </div>
            </div>

            {/* White card */}
            <div className="mt-auto ml-8 overflow-hidden rounded-[1.5rem] border border-white/40 bg-card p-6 text-card-foreground shadow-2xl [mask-image:radial-gradient(3.25rem_at_100%_0,transparent_99%,black_100%)] [-webkit-mask-image:radial-gradient(3.25rem_at_100%_0,transparent_99%,black_100%)]">
              <p className="text-lg font-bold leading-tight">
                Rent smarter.
                <br />
                Explore further.
              </p>
              <p className="mt-3 text-sm leading-5 text-muted-foreground">
                Create an account and start your GearUp journey today.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
