import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";

const actions = [
  {
    label: "RENT",
    title: "Find the gear you need.",
    text: "Browse local equipment and rent it for the days you need.",
    button: "Browse gear",
    href: "/gear",
    image: "/images/home/actions/rent.jpg",
  },
  {
    label: "LIST",
    title: "Earn from your equipment.",
    text: "List unused gear and grow your local rental business.",
    button: "List your gear",
    href: "/auth/register",
    image: "/images/home/actions/list.jpg",
  },
  {
    label: "PLAN",
    title: "Book with confidence.",
    text: "Choose dates, pay securely, and track every rental step.",
    button: "How it works",
    href: "/#how-it-works",
    image: "/images/home/actions/plan.jpg",
  },
  {
    label: "EXPLORE",
    title: "Try something new.",
    text: "Discover outdoor activities without buying every item first.",
    button: "Explore gear",
    href: "/gear",
    image: "/images/home/actions/explore.jpg",
  },
];

function PremiumBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[#061a22]" />

      <div className="absolute -left-48 top-1/3 size-[34rem] rounded-full bg-[#0b7682]/30 blur-[140px]" />
      <div className="absolute -right-36 -top-32 size-[38rem] rounded-full bg-[#5ee3e5]/30 blur-[150px]" />
      <div className="absolute bottom-0 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[#042c3b]/80 blur-[130px]" />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id="premiumContour" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d6ffff" stopOpacity="0.12" />
            <stop offset="55%" stopColor="#74f4ee" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#0c5363" stopOpacity="0.08" />
          </linearGradient>

          <pattern
            id="premiumDots"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#c9ffff" opacity="0.15" />
          </pattern>

          <filter id="premiumGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1440" height="760" fill="url(#premiumDots)" opacity="0.22" />

        <g
          fill="none"
          stroke="url(#premiumContour)"
          strokeWidth="1.25"
          filter="url(#premiumGlow)"
        >
          <path d="M-100 70 C120 -20 240 210 455 94 S760 -5 960 120 S1240 250 1540 55" />
          <path d="M-110 125 C105 25 260 275 475 145 S770 45 985 165 S1250 310 1540 110" />
          <path d="M-95 190 C130 80 285 340 510 205 S795 100 1015 225 S1280 375 1540 175" />
          <path d="M-100 420 C135 300 305 540 535 415 S810 300 1040 435 S1300 570 1540 385" />
          <path d="M-100 485 C125 350 330 610 565 475 S840 365 1075 500 S1320 650 1540 455" />
          <path d="M-100 555 C150 410 360 685 595 540 S870 435 1110 565 S1330 725 1540 525" />
          <path d="M-90 630 C175 485 395 755 625 615 S900 510 1145 635 S1350 790 1540 600" />
        </g>

        <ellipse
          cx="1120"
          cy="185"
          rx="225"
          ry="145"
          fill="none"
          stroke="#9dffff"
          strokeWidth="1"
          opacity="0.22"
        />
        <ellipse
          cx="1120"
          cy="185"
          rx="170"
          ry="105"
          fill="none"
          stroke="#9dffff"
          strokeWidth="1"
          opacity="0.18"
        />
      </svg>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04131b]/65 to-transparent" />
    </>
  );
}

export function MarketplaceActions() {
  return (
    <section className="relative isolate overflow-hidden bg-[#061a22] py-14 text-white sm:py-20">
      <PremiumBackground />

      {/* This is empty now. Your mobile image will appear here later. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-20 hidden h-[440px] w-[680px] bg-contain bg-right bg-no-repeat lg:block"
        style={{
          backgroundImage:
            "url('/images/home/gearup-mobile-preview.png')",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl border border-white/25 bg-white/10">
              <Mountain className="size-6" />
            </span>
            <p className="text-2xl font-black tracking-tight">
              Gear<span className="text-teal-200">Up</span>
            </p>
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            More adventure.
            <span className="block text-teal-200">Less ownership.</span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-white/85 sm:text-lg">
            GearUp helps you rent reliable local equipment, list your own
            gear, and get outside more often.
          </p>
        </div>

        <div className="relative mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <article
              key={action.label}
              className="group flex min-h-[370px] flex-col overflow-hidden rounded-2xl border border-white/30 bg-white text-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,0.32)]"
            >
              <div className="flex h-16 items-center justify-center border-b border-slate-200 px-4">
                <p className="text-lg font-black tracking-[0.18em] text-[#155563]">
                  {action.label}
                </p>
              </div>

              <div className="relative h-44 overflow-hidden bg-slate-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${action.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-bold">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {action.text}
                </p>

                <Link
                  href={action.href}
                  className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 text-sm font-bold transition hover:border-[#155563] hover:bg-[#155563] hover:text-white"
                >
                  {action.button}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}