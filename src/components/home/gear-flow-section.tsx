import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  MapPin,
  PackageCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const signalLines = Array.from({ length: 26 }, (_, index) => index);

type FlowNodeProps = {
  className: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

function FlowNode({ className, icon: Icon, title, subtitle }: FlowNodeProps) {
  return (
    <div
      className={`gearup-flow-node absolute z-10 w-[142px] rounded-xl border border-cyan-200/15 bg-[#101d46]/90 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.28)] backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-md bg-cyan-300/15 text-cyan-200">
          <Icon className="size-4" />
        </span>

        <div>
          <p className="text-xs font-semibold text-white">{title}</p>
          <p className="text-[10px] text-indigo-200/75">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function RentalNetwork() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden min-h-[520px] overflow-hidden rounded-2xl border border-indigo-300/15 bg-[#091433] md:block"
      style={{
        backgroundImage:
          "radial-gradient(rgba(117, 126, 255, 0.2) 1px, transparent 1px)",
        backgroundSize: "8px 8px",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(81,61,255,0.24),transparent_36%)]" />

      <svg
        viewBox="0 0 1200 560"
        className="absolute inset-0 size-full"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="gearupParticleGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        <path className="gearup-flow-path" d="M 170 280 H 535" />
        <path className="gearup-flow-path" d="M 355 108 V 225 H 535" />
        <path className="gearup-flow-path" d="M 355 452 V 335 H 535" />

        <path className="gearup-flow-path" d="M 665 280 H 1030" />
        <path className="gearup-flow-path" d="M 665 225 H 845 V 108" />
        <path className="gearup-flow-path" d="M 665 335 H 845 V 452" />

        {/* Moving dots */}
        <g filter="url(#gearupParticleGlow)">
          <circle r="5" fill="#6fffee">
            <animateMotion
              dur="3.8s"
              repeatCount="indefinite"
              path="M 170 280 H 535"
            />
          </circle>

          <circle r="4" fill="#9f83ff">
            <animateMotion
              dur="3.3s"
              begin="-1.2s"
              repeatCount="indefinite"
              path="M 355 108 V 225 H 535"
            />
          </circle>

          <circle r="4" fill="#60f7ea">
            <animateMotion
              dur="3.5s"
              begin="-2.2s"
              repeatCount="indefinite"
              path="M 355 452 V 335 H 535"
            />
          </circle>

          <circle r="5" fill="#6fffee">
            <animateMotion
              dur="3.9s"
              begin="-0.7s"
              repeatCount="indefinite"
              path="M 665 280 H 1030"
            />
          </circle>

          <circle r="4" fill="#ad91ff">
            <animateMotion
              dur="3.4s"
              begin="-1.8s"
              repeatCount="indefinite"
              path="M 665 225 H 845 V 108"
            />
          </circle>

          <circle r="4" fill="#60f7ea">
            <animateMotion
              dur="3.2s"
              begin="-2.7s"
              repeatCount="indefinite"
              path="M 665 335 H 845 V 452"
            />
          </circle>
        </g>
      </svg>

      <FlowNode
        className="left-7 top-1/2 -translate-y-1/2"
        icon={PackageCheck}
        title="Provider gear"
        subtitle="Live inventory"
      />

      <FlowNode
        className="left-[23%] top-8 gearup-flow-node-delay-1"
        icon={CalendarDays}
        title="Availability"
        subtitle="Rental dates"
      />

      <FlowNode
        className="left-[23%] bottom-8 gearup-flow-node-delay-2"
        icon={CreditCard}
        title="Secure payment"
        subtitle="Checkout"
      />

      <circle className="gearup-center-ring" cx="600" cy="280" r="78" />

      <div className="gearup-flow-core absolute left-1/2 top-1/2 z-10 size-36 -translate-x-1/2 -translate-y-1/2 sm:size-40">
        <div className="gearup-core-float relative size-full">
          {/* Dotted orbit */}
          <div className="gearup-core-orbit absolute -inset-3 rounded-full border-2 border-dashed border-violet-300/80" />

          {/* Main circle */}
          <div className="relative grid size-full place-items-center rounded-full border border-cyan-200/25 bg-gradient-to-br from-[#684dff] to-[#25166f] shadow-[0_0_60px_rgba(91,75,255,0.7)]">
            <div className="text-center">
              <p className="text-xl font-black tracking-tight text-white sm:text-2xl">
                GearUp
              </p>

              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-indigo-100">
                Rental flow
              </p>
            </div>
          </div>
        </div>
      </div>

      <FlowNode
        className="right-[23%] top-8 gearup-flow-node-delay-3"
        icon={MapPin}
        title="Pickup plan"
        subtitle="Location ready"
      />

      <FlowNode
        className="right-[23%] bottom-8 gearup-flow-node-delay-1"
        icon={PackageCheck}
        title="Return tracking"
        subtitle="Clear status"
      />

      <FlowNode
        className="right-7 top-1/2 -translate-y-1/2 gearup-flow-node-delay-2"
        icon={CalendarDays}
        title="Customer"
        subtitle="Adventure ready"
      />
    </div>
  );
}

const ribbonLines = Array.from({ length: 34 }, (_, index) => index);

const momentumSteps = [
  {
    number: "01",
    title: "Discover",
    text: "Find trusted gear near your next adventure.",
  },
  {
    number: "02",
    title: "Reserve",
    text: "Choose dates and confirm with secure payment.",
  },
  {
    number: "03",
    title: "Explore",
    text: "Pick up, enjoy, and return with confidence.",
  },
];

function RentalMomentum() {
  return (
    <section className="gearup-momentum relative mt-10 overflow-hidden rounded-[30px] border border-white/10">
      <div
        aria-hidden="true"
        className="gearup-momentum-grid absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-16 size-72 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 size-80 rounded-full bg-violet-500/20 blur-3xl"
      />

      <div className="relative z-10 grid min-h-[540px] grid-rows-[auto_1fr_auto] p-6 sm:p-10 lg:p-12">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-bold tracking-[0.22em] text-cyan-200">
            RENTAL, WITHOUT FRICTION
          </p>

          <h3 className="mt-4 font-sans text-3xl font-black tracking-tight text-white sm:text-5xl">
            Every great adventure starts
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              with a simple plan.
            </span>
          </h3>

          <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
            GearUp connects local gear, secure booking, pickup, and return in
            one clear rental journey.
          </p>
        </div>

        <div className="relative min-h-[250px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 280"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
          >
            <defs>
              <linearGradient id="momentum-ribbon-one" x1="0" x2="1">
                <stop offset="0%" stopColor="#24d9d3" stopOpacity="0.08" />
                <stop offset="42%" stopColor="#6d75ff" stopOpacity="0.95" />
                <stop offset="68%" stopColor="#d677ff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#47ece3" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="momentum-ribbon-two" x1="0" x2="1">
                <stop offset="0%" stopColor="#ffbd9e" stopOpacity="0.08" />
                <stop offset="42%" stopColor="#ef84c7" stopOpacity="0.9" />
                <stop offset="67%" stopColor="#695cff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#4fdfe4" stopOpacity="0.1" />
              </linearGradient>

              <filter id="momentum-glow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="gearup-momentum-ribbon gearup-momentum-ribbon-one"
              d="M-60 205 C150 245 245 42 475 122 S815 278 1260 72"
              fill="none"
              filter="url(#momentum-glow)"
              stroke="url(#momentum-ribbon-one)"
              strokeLinecap="round"
              strokeWidth="7"
            />

            <path
              className="gearup-momentum-ribbon gearup-momentum-ribbon-two"
              d="M-60 95 C150 22 286 250 520 160 S860 30 1260 205"
              fill="none"
              filter="url(#momentum-glow)"
              stroke="url(#momentum-ribbon-two)"
              strokeLinecap="round"
              strokeWidth="6"
            />

            <circle
              className="gearup-momentum-pulse"
              cx="208"
              cy="170"
              r="5"
              fill="#7dfcf2"
            />
            <circle
              className="gearup-momentum-pulse gearup-momentum-pulse-delay"
              cx="950"
              cy="111"
              r="5"
              fill="#d9b4ff"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 sm:size-32">
            <div className="gearup-momentum-orbit absolute -inset-4 rounded-full border border-dashed border-violet-300/70" />

            <div className="relative grid size-full place-items-center rounded-full border border-cyan-100/20 bg-gradient-to-br from-violet-500 via-indigo-600 to-[#15185a] shadow-[0_0_70px_rgba(116,91,255,0.7)]">
              <div className="text-center">
                <p className="font-sans text-lg font-black text-white sm:text-xl">
                  GearUp
                </p>
                <p className="mt-1 font-sans text-[9px] font-bold tracking-[0.16em] text-indigo-100">
                  READY TO GO
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
          {momentumSteps.map((step) => (
            <article
              key={step.number}
              className="gearup-momentum-step rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm"
            >
              <p className="font-sans text-xs font-bold tracking-[0.18em] text-cyan-300">
                {step.number}
              </p>
              <h4 className="mt-3 font-sans text-lg font-bold text-white">
                {step.title}
              </h4>
              <p className="mt-1 font-sans text-sm leading-6 text-slate-400">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function GearFlowSection() {
  return (
    <section className="overflow-hidden bg-[#071334] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.2em] text-cyan-300">
            BUILT FOR RELIABLE RENTALS
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            A smooth rental journey from discovery to return.
          </h2>

          <p className="mt-5 text-lg leading-8 text-indigo-100/80">
            GearUp connects local providers, availability, secure payments, and
            rental updates in one clear experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gear"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Browse gear <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/auth/register"
              className="inline-flex h-11 items-center rounded-lg border border-indigo-200/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Become a provider
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <RentalNetwork />

          <div className="grid gap-3 md:hidden">
            {[
              "Provider gear → Availability",
              "Availability → Secure payment",
              "Secure payment → Pickup and return tracking",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-indigo-200/15 bg-indigo-950/60 p-4 text-sm text-indigo-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-indigo-200/15 bg-[#0a173a] px-6 py-10 sm:px-10 sm:py-14">
          <RentalMomentum />

          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-bold sm:text-3xl">
              Plan adventures with confidence.
            </h3>

            <p className="mt-3 text-base leading-7 text-indigo-100/75">
              Check availability, reserve with secure payment, and follow each
              rental status without confusion.
            </p>
          </div>

          <div className="relative z-10 mt-16 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-black text-cyan-200">Simple</p>
              <p className="mt-2 text-sm text-indigo-100/75">
                Booking in clear steps
              </p>
            </div>

            <div>
              <p className="text-4xl font-black text-violet-300">Live</p>
              <p className="mt-2 text-sm text-indigo-100/75">
                Rental status updates
              </p>
            </div>

            <div>
              <p className="text-4xl font-black text-pink-300">Local</p>
              <p className="mt-2 text-sm text-indigo-100/75">
                Trusted nearby providers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
