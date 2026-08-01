import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create account | GearUp" };

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full flex-1 items-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-8xl overflow-hidden rounded-[2rem] border bg-card shadow-xl lg:min-h-[720px] lg:grid-cols-[1.15fr_0.85fr]">
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
        {/* Right: register feature cards */}
        <aside className="relative hidden min-h-[720px] overflow-hidden border-l border-white/10 bg-slate-950 lg:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-100 brightness-110 saturate-125"
          >
            <source src="/videos/gearup-login.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 via-slate-950/75 to-primary/55" />

          <div className="relative z-20 flex min-h-[720px] flex-col justify-center px-4 py-8">
            {/* Dark card */}
            <div className="relative h-[450px] w-full">
              <svg
                aria-hidden="true"
                viewBox="0 0 420 450"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-2xl"
              >
                <defs>
                  <linearGradient
                    id="register-dark-card"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#111827" stopOpacity="0.98" />
                    <stop offset="55%" stopColor="#030712" stopOpacity="0.94" />
                    <stop offset="100%" stopColor="#172554" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                <path
                  d="M30 1H295C324 1 340 17 340 42C340 55 351 64 365 64H383C405 64 419 79 419 101V420C419 438 407 449 389 449H30C13 449 1 437 1 420V30C1 13 13 1 30 1Z"
                  fill="url(#register-dark-card)"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="relative z-10 flex h-full flex-col p-8 pr-16 text-white">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                  WHY GEARUP
                </p>

                <p className="mt-6 text-5xl leading-none text-primary-foreground">
                  “
                </p>

                <h2 className="mt-2 max-w-[230px] text-3xl font-bold leading-tight">
                  Everything you need for your next adventure.
                </h2>

                <p className="mt-5 max-w-[230px] text-sm leading-6 text-white/70">
                  Discover reliable gear, book faster, and manage every rental
                  in one simple place.
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
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
            </div>

            {/* White overlapping card */}
            <div className="relative z-10 -mt-20 ml-5 h-[190px] w-[calc(100%-1.25rem)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 380 190"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-2xl"
              >
                <defs>
                  <linearGradient
                    id="register-light-card"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#dbeafe" />
                  </linearGradient>
                </defs>

                <path
                  d="M24 1H242C266 1 280 15 280 37C280 51 292 62 308 62H337C360 62 379 81 379 104V166C379 180 370 189 356 189H24C11 189 1 179 1 166V24C1 11 11 1 24 1Z"
                  fill="url(#register-light-card)"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="relative z-10 h-full p-6 pr-16 text-slate-950">
                <p className="text-lg font-bold leading-tight">
                  Rent smarter.
                  <br />
                  Explore further.
                </p>

                <p className="mt-3 text-sm leading-5 text-slate-600">
                  Create an account and start your GearUp journey today.
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
