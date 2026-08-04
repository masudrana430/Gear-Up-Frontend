import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  MapPin,
  PackageCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";
import { KineticText } from "../ui/kinetic-text";

type FlowNodeProps = {
  className: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

function FlowNode({ className, icon: Icon, title, subtitle }: FlowNodeProps) {
  return (
    <div
      className={`gearup-flow-node absolute z-10 w-[142px] rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#101d46]/90 dark:shadow-[0_18px_45px_rgba(0,0,0,0.32)] ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-cyan-300/10 dark:text-cyan-200 dark:ring-cyan-200/10">
          <Icon className="size-4" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
            {title}
          </p>
          <p className="truncate text-[10px] text-slate-500 dark:text-indigo-200/70">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function RentalNetwork() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden min-h-[520px] overflow-hidden rounded-[28px] border border-slate-200/80 shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:block dark:border-indigo-300/15 dark:shadow-[0_26px_80px_rgba(0,0,0,0.30)] [--center-ring:#818cf8] [--flow-path:#a5b4fc] [--network-bg:#f8fafc] [--network-dot:#6366f120] [--network-glow:#7c3aed1c] [--particle-a:#4f46e5] [--particle-b:#0ea5e9] [--particle-c:#8b5cf6] dark:[--center-ring:#8b7dff] dark:[--flow-path:#6366f1] dark:[--network-bg:#091433] dark:[--network-dot:#757eff33] dark:[--network-glow:#513dff3d] dark:[--particle-a:#6fffee] dark:[--particle-b:#60f7ea] dark:[--particle-c:#a78bfa]"
      style={{
        backgroundColor: "var(--network-bg)",
        backgroundImage:
          "radial-gradient(var(--network-dot) 1px, transparent 1px)",
        backgroundSize: "8px 8px",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--network-glow), transparent 38%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent dark:via-cyan-300/35" />

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

        <path
          className="gearup-flow-path"
          d="M 170 280 H 535"
          style={{ stroke: "var(--flow-path)" }}
        />
        <path
          className="gearup-flow-path"
          d="M 355 108 V 225 H 535"
          style={{ stroke: "var(--flow-path)" }}
        />
        <path
          className="gearup-flow-path"
          d="M 355 452 V 335 H 535"
          style={{ stroke: "var(--flow-path)" }}
        />
        <path
          className="gearup-flow-path"
          d="M 665 280 H 1030"
          style={{ stroke: "var(--flow-path)" }}
        />
        <path
          className="gearup-flow-path"
          d="M 665 225 H 845 V 108"
          style={{ stroke: "var(--flow-path)" }}
        />
        <path
          className="gearup-flow-path"
          d="M 665 335 H 845 V 452"
          style={{ stroke: "var(--flow-path)" }}
        />

        <g filter="url(#gearupParticleGlow)" className="motion-reduce:hidden">
          <circle r="5" fill="var(--particle-a)">
            <animateMotion
              dur="3.8s"
              repeatCount="indefinite"
              path="M 170 280 H 535"
            />
          </circle>

          <circle r="4" fill="var(--particle-c)">
            <animateMotion
              dur="3.3s"
              begin="-1.2s"
              repeatCount="indefinite"
              path="M 355 108 V 225 H 535"
            />
          </circle>

          <circle r="4" fill="var(--particle-b)">
            <animateMotion
              dur="3.5s"
              begin="-2.2s"
              repeatCount="indefinite"
              path="M 355 452 V 335 H 535"
            />
          </circle>

          <circle r="5" fill="var(--particle-a)">
            <animateMotion
              dur="3.9s"
              begin="-0.7s"
              repeatCount="indefinite"
              path="M 665 280 H 1030"
            />
          </circle>

          <circle r="4" fill="var(--particle-c)">
            <animateMotion
              dur="3.4s"
              begin="-1.8s"
              repeatCount="indefinite"
              path="M 665 225 H 845 V 108"
            />
          </circle>

          <circle r="4" fill="var(--particle-b)">
            <animateMotion
              dur="3.2s"
              begin="-2.7s"
              repeatCount="indefinite"
              path="M 665 335 H 845 V 452"
            />
          </circle>
        </g>

        <circle
          className="gearup-center-ring"
          cx="600"
          cy="280"
          r="78"
          style={{ stroke: "var(--center-ring)" }}
        />
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

      <div className="gearup-flow-core absolute left-1/2 top-1/2 z-10 size-36 -translate-x-1/2 -translate-y-1/2 sm:size-40">
        <div className="gearup-core-float relative size-full">
          <div className="gearup-core-orbit absolute -inset-3 rounded-full border-2 border-dashed border-indigo-300/80 dark:border-violet-300/80" />

          <div className="relative grid size-full place-items-center rounded-full border border-white/30 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 shadow-[0_20px_55px_rgba(79,70,229,0.38)] dark:border-cyan-200/25 dark:from-[#684dff] dark:via-[#4d35cf] dark:to-[#25166f] dark:shadow-[0_0_60px_rgba(91,75,255,0.65)]">
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
    <section className="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[#0b1736] dark:shadow-[0_26px_80px_rgba(0,0,0,0.30)]">
      <div
        aria-hidden="true"
        className="gearup-momentum-grid absolute inset-0 opacity-25 dark:opacity-100"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-16 size-72 rounded-full bg-sky-300/20 blur-3xl dark:bg-cyan-400/10"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 size-80 rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-500/20"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent dark:via-cyan-300/35" />

     
    </section>
  );
}

const mobileFlowItems = [
  "Provider gear → Availability",
  "Availability → Secure payment",
  "Secure payment → Pickup and return tracking",
];

const confidenceItems = [
  {
    title: "Simple",
    text: "Booking in clear steps",
    className: "text-indigo-600 dark:text-cyan-200",
  },
  {
    title: "Live",
    text: "Rental status updates",
    className: "text-violet-600 dark:text-violet-300",
  },
  {
    title: "Local",
    text: "Trusted nearby providers",
    className: "text-rose-500 dark:text-pink-300",
  },
];

export function GearFlowSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f7fb] py-20 text-slate-950 transition-colors sm:py-28 dark:bg-[#071334] dark:text-white">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-24 -z-10 size-[420px] rounded-full bg-indigo-200/35 blur-3xl dark:bg-indigo-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -right-48 bottom-32 -z-10 size-[460px] rounded-full bg-fuchsia-200/25 blur-3xl dark:bg-violet-500/10"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
            BUILT FOR RELIABLE RENTALS
          </p>

          <KineticText
            as="h2"
            text="A smooth rental journey from"
            className="mt-4 block font-sans text-3xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 [font-optical-sizing:auto] sm:text-5xl lg:text-6xl dark:text-white"
          />
          <KineticText
            as="h2"
            text="discovery to return."
            className="mt-1 block font-sans text-3xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 [font-optical-sizing:auto] sm:text-5xl lg:text-6xl dark:text-white"
          />

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-indigo-100/75">
            GearUp connects local providers, availability, secure payments, and
            rental updates in one clear experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton strength={0.24}>
              <Link
                href="/gear"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,70,229,0.24)] transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-[0_16px_36px_rgba(79,70,229,0.30)] dark:bg-violet-500 dark:hover:bg-violet-400"
              >
                Browse gear <ArrowRight className="size-4" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.18}>
              <Link
                href="/auth/register"
                className="inline-flex h-11 items-center rounded-xl border border-slate-300/80 bg-white/70 px-5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white dark:border-indigo-200/20 dark:bg-white/[0.035] dark:text-white dark:hover:border-indigo-200/30 dark:hover:bg-white/10"
              >
                Become a provider
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="mt-12">
          <RentalNetwork />

          <div className="grid gap-3 md:hidden">
            {mobileFlowItems.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/85 p-4 text-sm font-medium text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur dark:border-indigo-200/15 dark:bg-indigo-950/55 dark:text-indigo-100"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-cyan-300/10 dark:text-cyan-200">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <RentalMomentum />
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 px-6 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur sm:px-10 sm:py-12 dark:border-indigo-200/15 dark:bg-[#0a173a]/90 dark:shadow-[0_26px_80px_rgba(0,0,0,0.28)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent dark:via-cyan-300/35" />

          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
              Plan adventures with confidence.
            </h3>

            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-indigo-100/75">
              Check availability, reserve with secure payment, and follow each
              rental status without confusion.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-3 sm:gap-0">
            {confidenceItems.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl border border-slate-200/70 bg-slate-50/75 p-5 sm:rounded-none sm:border-y-0 sm:bg-transparent sm:px-7 sm:py-1 dark:border-white/10 dark:bg-white/[0.025] sm:dark:bg-transparent ${
                  index > 0 ? "sm:border-l" : "sm:border-0"
                }`}
              >
                <p
                  className={`text-3xl font-black tracking-[-0.04em] sm:text-4xl ${item.className}`}
                >
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-indigo-100/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
