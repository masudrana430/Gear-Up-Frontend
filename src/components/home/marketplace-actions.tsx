import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";

const actions = [
  {
    label: "RENT",
    title: "Find the gear you need.",
    text: "Browse trusted local equipment and rent it for the days you need.",
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

export function MarketplaceActions() {
  return (
    <section className="relative isolate overflow-hidden bg-[#04151c] py-14 text-white sm:py-20">
      {/* Full-section background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home/gearup-marketplace-bg.png')",
          backgroundPosition: "center top",
        }}
      />

      {/* Dark overlays make the content readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#03141d]/95 via-[#03141d]/65 to-[#03141d]/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#03141d]/95 via-[#03141d]/50 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl border border-cyan-200/30 bg-cyan-300/10 text-cyan-200">
              <Mountain className="size-6" />
            </span>
            <span className="text-xl font-bold tracking-tight">GearUp</span>
          </div>

          <p className="mt-8 text-xs font-bold tracking-[0.24em] text-cyan-200">
            OUTDOOR EQUIPMENT, MADE SIMPLE
          </p>

          <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            Everything you need for your next adventure.
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
            Rent quality outdoor equipment from trusted local providers. Explore
            more without buying everything.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/gear"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-cyan-300 px-5 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Browse gear <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/auth/register"
              className="inline-flex h-11 items-center rounded-lg border border-white/35 bg-white/10 px-5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              List your gear
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <article
              key={action.label}
              className="group overflow-hidden rounded-2xl border border-white/45 bg-white p-3 text-slate-950 shadow-[0_20px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_65px_rgba(0,0,0,0.5)]"
            >
              <div className="grid h-12 place-items-center">
                <p className="card-brush-title text-center text-[2.5rem] leading-none text-slate-700 sm:text-[2.8rem]">
                  {action.label}
                </p>
              </div>
              {/* Middle image of each card */}
              <div className="relative mt-3 h-44 overflow-hidden rounded-xl bg-slate-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${action.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <h3 className="mt-5 text-xl font-bold">{action.title}</h3>

              <p className="mt-2 min-h-12 text-sm leading-5 text-slate-600">
                {action.text}
              </p>

              <Link
                href={action.href}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-900 px-4 py-3 text-sm font-semibold transition hover:bg-slate-950 hover:text-white"
              >
                {action.button}
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
