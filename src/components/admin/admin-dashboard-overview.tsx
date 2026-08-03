"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  Package,
  RefreshCw,
  RotateCcw,
  Users,
} from "lucide-react";

import {
  interpolate,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  type AnimationInterpolateFn,
  type PolarLayout,
  type RadarPoint,
} from "recharts";

import {
  Bar,
  BarChart,
  BarStack,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Cell, Pie, PieChart } from "recharts";

export type RentalStatusSnapshot = {
  placed: number;
  confirmed: number;
  paid: number;
  pickedUp: number;
  returned: number;
  cancelled: number;
};

export type PaymentStatusSnapshot = {
  completed: number;
  pending: number;
  failed: number;
  cancelled: number;
};

type AdminDashboardOverviewProps = {
  users: number;
  gear: number;
  rentals: number;
  revenue: number;
  rentalStatus: RentalStatusSnapshot;
  paymentStatus: PaymentStatusSnapshot;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-BD").format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);

export function AdminDashboardOverview({
  users,
  gear,
  rentals,
  revenue,
  rentalStatus,
  paymentStatus,
  isLoading,
  isRefreshing,
  onRefresh,
}: AdminDashboardOverviewProps) {
  const activeRentals =
    rentalStatus.confirmed + rentalStatus.paid + rentalStatus.pickedUp;

  const recentRentalCount = Object.values(rentalStatus).reduce(
    (sum, value) => sum + value,
    0,
  );

  const paymentCount = Object.values(paymentStatus).reduce(
    (sum, value) => sum + value,
    0,
  );

  const completionRate =
    paymentCount > 0
      ? Math.round((paymentStatus.completed / paymentCount) * 100)
      : 0;

  const metrics = [
    {
      label: "Platform users",
      value: isLoading ? "—" : formatNumber(users),
      detail: "Registered GearUp accounts",
      icon: Users,
      iconClass:
        "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200",
      glowClass: "from-cyan-300/50 via-sky-200/10 to-transparent",
    },
    {
      label: "Gear listings",
      value: isLoading ? "—" : formatNumber(gear),
      detail: "Items available to manage",
      icon: Package,
      iconClass:
        "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-200",
      glowClass: "from-violet-300/50 via-indigo-200/10 to-transparent",
    },
    {
      label: "Rental orders",
      value: isLoading ? "—" : formatNumber(rentals),
      detail: `${formatNumber(activeRentals)} active in recent activity`,
      icon: CalendarDays,
      iconClass: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-200",
      glowClass: "from-sky-300/50 via-cyan-200/10 to-transparent",
    },
    {
      label: "Completed revenue",
      value: isLoading ? "—" : formatCurrency(revenue),
      detail: "From the latest 100 transactions",
      icon: CreditCard,
      iconClass:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200",
      glowClass: "from-emerald-300/50 via-cyan-200/10 to-transparent",
    },
  ];

  return (
    <>
      <section className="gearup-admin-canvas relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-slate-50/80 p-4 text-slate-950 shadow-[0_25px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#07122c] dark:text-white sm:p-6 lg:p-8">
        <div
          aria-hidden="true"
          className="gearup-admin-dots pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-12 size-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15"
        />

        <div className="relative z-10">
          <header className="gearup-admin-reveal flex flex-col gap-5 border-b border-slate-200/80 pb-6 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                ADMIN CONTROL CENTRE
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Platform overview
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Monitor rentals, inventory, users, and payment activity from one
                place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-xs font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                LIVE ADMIN DATA
              </span>

              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:border-cyan-300/50 dark:hover:text-cyan-200"
              >
                <RefreshCw
                  className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh data
              </button>
            </div>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.label} {...metric} delay={index * 90} />
            ))}
          </div>

          <div className="space-y-4">
            {/* First dashboard row */}
            <div className="grid auto-rows-fr gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
              <RentalFlowCard
                rentalStatus={rentalStatus}
                hasActivity={recentRentalCount > 0}
              />

              <PlatformHealthCard
                users={users}
                gear={gear}
                activeRentals={activeRentals}
                completionRate={completionRate}
                rentalStatus={rentalStatus}
                paymentStatus={paymentStatus}
                isLoading={isLoading}
              />
            </div>

            {/* Second dashboard row: keep this exact three-card format */}
            <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
              <RentalLifecycleCard
                rentalStatus={rentalStatus}
                hasActivity={recentRentalCount > 0}
              />

              <PaymentDistributionCard paymentStatus={paymentStatus} />

              <OperationsCard
                rentals={rentals}
                activeRentals={activeRentals}
                cancelledRentals={rentalStatus.cancelled}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .gearup-admin-canvas {
          background-image: radial-gradient(
            rgba(14, 116, 144, 0.08) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
        }

        .dark .gearup-admin-canvas {
          background-image: radial-gradient(
            rgba(103, 232, 249, 0.1) 1px,
            transparent 1px
          );
        }

        .gearup-admin-dots {
          background-image:
            linear-gradient(
              90deg,
              rgba(34, 211, 238, 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at center, black, transparent 78%);
        }

        .gearup-admin-reveal {
          animation: gearup-admin-reveal 700ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .gearup-admin-card {
          animation: gearup-admin-reveal 700ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .gearup-admin-flow-line {
          stroke-dasharray: 1300;
          stroke-dashoffset: 1300;
          animation: gearup-admin-line-draw 1200ms
            cubic-bezier(0.22, 1, 0.36, 1) 250ms forwards;
        }

        .gearup-admin-flow-bar {
          transform: scaleY(0.08);
          transform-origin: bottom;
          animation: gearup-admin-bar-rise 800ms cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .gearup-admin-radar {
          transform-box: fill-box;
          transform-origin: center;
          animation: gearup-admin-radar-in 950ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .gearup-admin-radar-dot {
          animation: gearup-admin-dot-pulse 2200ms ease-in-out infinite;
        }

        .gearup-admin-donut {
          animation: gearup-admin-donut-in 900ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes gearup-admin-reveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gearup-admin-line-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes gearup-admin-bar-rise {
          to {
            transform: scaleY(1);
          }
        }

        @keyframes gearup-admin-radar-in {
          from {
            opacity: 0;
            transform: scale(0.72) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes gearup-admin-dot-pulse {
          0%,
          100% {
            opacity: 0.55;
            r: 3;
          }
          50% {
            opacity: 1;
            r: 5;
          }
        }

        @keyframes gearup-admin-donut-in {
          from {
            opacity: 0;
            transform: scale(0.75) rotate(-80deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gearup-admin-reveal,
          .gearup-admin-card,
          .gearup-admin-flow-line,
          .gearup-admin-flow-bar,
          .gearup-admin-radar,
          .gearup-admin-radar-dot,
          .gearup-admin-donut {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}

const animateRadarFromCenter: AnimationInterpolateFn<
  RadarPoint,
  PolarLayout
> = (items, animationElapsedTime) => {
  if (items == null) {
    return [];
  }

  if (animationElapsedTime === 1) {
    return items.flatMap((item) =>
      item.status === "removed" ? [] : [item.next],
    );
  }

  return items.flatMap((item) => {
    if (item.status === "removed") {
      return [];
    }

    return [
      {
        ...item.next,
        x: interpolate(item.next.cx, item.next.x, animationElapsedTime),
        y: interpolate(item.next.cy, item.next.y, animationElapsedTime),
        radius: interpolate(0, item.next.radius, animationElapsedTime),
      },
    ];
  });
};

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  iconClass,
  glowClass,
  delay,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  iconClass: string;
  glowClass: string;
  delay: number;
}) {
  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="gearup-admin-card group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-950/5 dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-cyan-300/40"
    >
      <div
        aria-hidden="true"
        className={`absolute -right-10 -top-12 size-36 rounded-full bg-gradient-to-br ${glowClass} blur-2xl transition duration-500 group-hover:scale-125`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {detail}
          </p>
        </div>

        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${iconClass}`}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </article>
  );
}

function RentalFlowCard({
  rentalStatus,
  hasActivity,
}: {
  rentalStatus: RentalStatusSnapshot;
  hasActivity: boolean;
}) {
  const stages = [
    {
      label: "Placed",
      value: rentalStatus.placed,
    },
    {
      label: "In progress",
      value: rentalStatus.confirmed + rentalStatus.paid + rentalStatus.pickedUp,
    },
    {
      label: "Returned",
      value: rentalStatus.returned,
    },
    {
      label: "Cancelled",
      value: rentalStatus.cancelled,
    },
  ];

  const maximum = Math.max(...stages.map((stage) => stage.value), 1);

  const visualStages = stages.map((stage) => ({
    ...stage,
    layers:
      stage.value === 0
        ? 0
        : Math.max(1, Math.min(4, Math.ceil((stage.value / maximum) * 4))),
  }));

  const xPositions = [125, 375, 625, 875];

  const getTopY = (layers: number) => 132 - layers * 25;

  const connectors = visualStages.slice(0, -1).map((stage, index) => {
    const startX = xPositions[index];
    const endX = xPositions[index + 1];
    const startY = getTopY(stage.layers);
    const endY = getTopY(visualStages[index + 1].layers);

    return {
      id: `${stage.label}-${visualStages[index + 1].label}`,
      path: `M ${startX} ${startY} C ${
        startX + 85
      } ${startY}, ${endX - 85} ${endY}, ${endX} ${endY}`,
    };
  });

  const stackColors = [
    "bg-[#10245e]",
    "bg-[#1e63d7]",
    "bg-[#32afe6]",
    "bg-[#67e2df]",
  ];

  return (
    <article className="gearup-admin-card gearup-rental-panel-enter h-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="gearup-rental-heading-enter flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-slate-950 dark:text-white">
            Rental flow
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Status distribution from the latest rental orders.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
          <span className="size-1.5 animate-pulse rounded-full bg-cyan-500" />
          Live snapshot
        </span>
      </div>

      {hasActivity ? (
        <div className="gearup-rental-chart-enter relative mt-5 isolate overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-white/[0.07] dark:bg-[#071837]/70">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(56,189,248,0.18)_1px,transparent_1px)] [background-size:11px_11px] dark:opacity-30"
          />

          <div className="gearup-rental-summary-enter relative z-10 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#10245e] text-white shadow-lg shadow-blue-950/20">
              <CalendarDays className="size-5" />
            </span>

            <div>
              <p className="text-base font-black text-slate-950 dark:text-white">
                {formatNumber(
                  visualStages.reduce((sum, stage) => sum + stage.value, 0),
                )}{" "}
                orders
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recent rental activity
              </p>
            </div>
          </div>

          <div className="relative mt-5 h-[185px]">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 155"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-0 h-[142px] w-full"
            >
              <defs>
                <linearGradient
                  id="gearup-rental-flow-gradient"
                  x1="0%"
                  x2="100%"
                >
                  <stop offset="0%" stopColor="#67e2df" stopOpacity="0.12" />
                  <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.48" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.12" />
                </linearGradient>

                <filter
                  id="gearup-rental-flow-glow"
                  x="-20%"
                  y="-50%"
                  width="140%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {connectors.map((connector, index) => (
                <g key={connector.id}>
                  <path
                    d={connector.path}
                    fill="none"
                    stroke="url(#gearup-rental-flow-gradient)"
                    strokeLinecap="round"
                    strokeWidth="15"
                    opacity="0.45"
                  />

                  <path
                    d={connector.path}
                    fill="none"
                    stroke="#b8f3f1"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    className="gearup-rental-connector"
                  />

                  <circle
                    r="3.5"
                    fill={index % 2 === 0 ? "#67e2df" : "#a78bfa"}
                    filter="url(#gearup-rental-flow-glow)"
                  >
                    <animateMotion
                      dur={`${3.4 + index * 0.45}s`}
                      repeatCount="indefinite"
                      path={connector.path}
                    />
                  </circle>
                </g>
              ))}
            </svg>

            <div className="relative z-10 grid h-full grid-cols-4 items-end gap-3 sm:gap-6">
              {visualStages.map((stage, stageIndex) => (
                <div
                  key={stage.label}
                  className="flex h-full flex-col justify-end"
                >
                  <p className="mb-2 text-center text-sm font-black text-slate-950 dark:text-white">
                    {formatNumber(stage.value)}
                  </p>

                  <div className="flex h-[105px] flex-col-reverse justify-start gap-1">
                    {Array.from({ length: stage.layers }).map(
                      (_, layerIndex) => (
                        <span
                          key={`${stage.label}-${layerIndex}`}
                          style={{
                            animationDelay: `${650 + stageIndex * 130 + layerIndex * 90}ms`,
                          }}
                          className={`gearup-rental-stack h-5 rounded-md ${
                            stackColors[layerIndex]
                          } shadow-[0_7px_18px_rgba(14,116,144,0.16)] sm:h-6`}
                        />
                      ),
                    )}
                  </div>

                  <p className="mt-3 text-center text-[10px] font-bold text-slate-500 dark:text-slate-400 sm:text-xs">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-1 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-[#10245e]" />
              Lower activity
            </span>

            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-[#1e63d7]" />
              Growing
            </span>

            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-[#32afe6]" />
              High activity
            </span>

            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-[#67e2df]" />
              Peak activity
            </span>
          </div>
        </div>
      ) : (
        <EmptyChartMessage message="No recent rental activity is available yet." />
      )}
    </article>
  );
}

function PlatformHealthCard({
  users,
  gear,
  activeRentals,
  completionRate,
  rentalStatus,
  paymentStatus,
  isLoading,
}: {
  users: number;
  gear: number;
  activeRentals: number;
  completionRate: number;
  rentalStatus: RentalStatusSnapshot;
  paymentStatus: PaymentStatusSnapshot;
  isLoading: boolean;
}) {
  const rentalHealthy = rentalStatus.returned;
  const rentalActive = activeRentals;
  const rentalAttention = rentalStatus.placed + rentalStatus.cancelled;

  const paymentHealthy = paymentStatus.completed;
  const paymentActive = paymentStatus.pending;
  const paymentAttention = paymentStatus.failed + paymentStatus.cancelled;

  const healthData = [
    {
      name: "Rentals",
      healthy: [0, rentalHealthy],
      active: [rentalHealthy, rentalHealthy + rentalActive],
      attention: [
        rentalHealthy + rentalActive,
        rentalHealthy + rentalActive + rentalAttention,
      ],
    },
    {
      name: "Payments",
      healthy: [0, paymentHealthy],
      active: [paymentHealthy, paymentHealthy + paymentActive],
      attention: [
        paymentHealthy + paymentActive,
        paymentHealthy + paymentActive + paymentAttention,
      ],
    },
  ];

  const maximum = Math.max(
    rentalHealthy + rentalActive + rentalAttention,
    paymentHealthy + paymentActive + paymentAttention,
    1,
  );

  const hasData =
    rentalHealthy +
      rentalActive +
      rentalAttention +
      paymentHealthy +
      paymentActive +
      paymentAttention >
    0;

  return (
    <article className="gearup-admin-card h-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-slate-950 dark:text-white">
            Platform health
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Rental and payment activity from recent records.
          </p>
        </div>

        <span className="rounded-lg border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
          {isLoading ? "Loading" : `${completionRate}% healthy`}
        </span>
      </div>

      {isLoading ? (
        <div className="mt-6 grid h-[210px] place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="size-10 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
        </div>
      ) : hasData ? (
        <div className="relative mt-5 h-[220px] overflow-hidden rounded-2xl border border-slate-100 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_68%)] p-3 dark:border-white/[0.08] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_68%)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(56,189,248,0.16)_1px,transparent_1px)] [background-size:12px_12px]"
          />

          <div className="relative z-10 h-full text-slate-500 dark:text-slate-400">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={healthData}
                layout="vertical"
                margin={{ top: 10, right: 8, bottom: 6, left: 0 }}
              >
                <XAxis type="number" domain={[0, maximum]} hide />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={70}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "currentColor",
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(34, 211, 238, 0.08)",
                  }}
                  contentStyle={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "12px",
                    background: "rgba(15, 23, 42, 0.96)",
                    color: "#f8fafc",
                    boxShadow: "0 16px 40px rgba(15,23,42,0.22)",
                  }}
                  labelStyle={{
                    color: "#a5f3fc",
                    fontWeight: 800,
                  }}
                  formatter={(value) => {
                    if (value == null) {
                      return ["0", ""];
                    }

                    const total = Array.isArray(value)
                      ? Number(value[1] ?? 0) - Number(value[0] ?? 0)
                      : Number(value);

                    return [
                      formatNumber(Number.isFinite(total) ? total : 0),
                      "",
                    ];
                  }}
                />

                <BarStack radius={10}>
                  <Bar
                    name="Healthy"
                    dataKey="healthy"
                    maxBarSize={34}
                    fill="#32afe6"
                    activeBar={{ fill: "#67e2df" }}
                    isAnimationActive
                    animationBegin={150}
                    animationDuration={900}
                    animationEasing="cubic-bezier(0.22, 1, 0.36, 1)"
                  />

                  <Bar
                    name="In progress"
                    dataKey="active"
                    maxBarSize={34}
                    fill="#6366f1"
                    activeBar={{ fill: "#8b5cf6" }}
                    isAnimationActive
                    animationBegin={280}
                    animationDuration={1000}
                    animationEasing="cubic-bezier(0.22, 1, 0.36, 1)"
                  />

                  <Bar
                    name="Needs review"
                    dataKey="attention"
                    maxBarSize={34}
                    fill="#fb7185"
                    activeBar={{ fill: "#fda4af" }}
                    isAnimationActive
                    animationBegin={410}
                    animationDuration={1100}
                    animationEasing="cubic-bezier(0.22, 1, 0.36, 1)"
                  />
                </BarStack>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <EmptyChartMessage message="No recent platform activity is available yet." />
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <HealthMetric
          label="Users"
          value={formatNumber(users)}
          href="/dashboard/admin/users"
        />

        <HealthMetric
          label="Listings"
          value={formatNumber(gear)}
          href="/dashboard/admin/gear"
        />

        <HealthMetric
          label="Active rentals"
          value={formatNumber(activeRentals)}
          href="/dashboard/admin/rentals"
        />

        <HealthMetric
          label="Payment success"
          value={`${completionRate}%`}
          href="/dashboard/admin/payments"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-[#32afe6]" />
          Healthy / completed
        </span>

        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-[#6366f1]" />
          In progress
        </span>

        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-[#fb7185]" />
          Needs review
        </span>
      </div>
    </article>
  );
}

function HealthMetric({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 dark:border-white/[0.07] dark:bg-white/[0.035] dark:hover:border-cyan-300/30 dark:hover:bg-cyan-300/[0.06]"
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-slate-950 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200">
        {value}
      </p>
    </Link>
  );
}

function RentalLifecycleCard({
  rentalStatus,
  hasActivity,
}: {
  rentalStatus: RentalStatusSnapshot;
  hasActivity: boolean;
}) {
  const chartData = [
    {
      subject: "Placed",
      value: rentalStatus.placed,
      range: [0, rentalStatus.placed],
    },
    {
      subject: "Confirmed",
      value: rentalStatus.confirmed,
      range: [0, rentalStatus.confirmed],
    },
    {
      subject: "Paid",
      value: rentalStatus.paid,
      range: [0, rentalStatus.paid],
    },
    {
      subject: "Pickup",
      value: rentalStatus.pickedUp,
      range: [0, rentalStatus.pickedUp],
    },
    {
      subject: "Returned",
      value: rentalStatus.returned,
      range: [0, rentalStatus.returned],
    },
  ];

  const maximum = Math.max(4, ...chartData.map((item) => item.value));

  const chartKey = chartData.map((item) => item.value).join("-");

  return (
    <article className="gearup-admin-card h-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-slate-950 dark:text-white">
            Rental lifecycle
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Movement across the latest rental stages.
          </p>
        </div>

        <span className="rounded-lg border border-violet-100 bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700 dark:border-violet-300/20 dark:bg-violet-300/10 dark:text-violet-200">
          Live flow
        </span>
      </div>

      {hasActivity ? (
        <>
          <div className="relative mt-5 h-[245px] overflow-hidden rounded-2xl border border-slate-100 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)] dark:border-white/[0.08] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(139,92,246,0.16)_1px,transparent_1px)] [background-size:12px_12px]"
            />

            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                key={chartKey}
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius="67%"
                className="text-slate-500 dark:text-slate-400"
              >
                <defs>
                  <linearGradient
                    id="gearup-radar-fill"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                    <stop offset="52%" stopColor="#38bdf8" stopOpacity="0.35" />
                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                      stopOpacity="0.55"
                    />
                  </linearGradient>

                  <filter
                    id="gearup-radar-glow"
                    x="-40%"
                    y="-40%"
                    width="180%"
                    height="180%"
                  >
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <PolarGrid
                  gridType="polygon"
                  stroke="currentColor"
                  strokeOpacity={0.18}
                />

                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: "currentColor",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                  tickLine={false}
                />

                <PolarRadiusAxis
                  domain={[0, maximum]}
                  tick={false}
                  axisLine={false}
                />

                <Radar
                  name="Rental orders"
                  dataKey="range"
                  isRange
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  fill="url(#gearup-radar-fill)"
                  fillOpacity={1}
                  dot={{
                    r: 4,
                    fill: "#a78bfa",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  isAnimationActive
                  animationBegin={250}
                  animationDuration={1400}
                  animationEasing="cubic-bezier(0.22, 1, 0.36, 1)"
                  animationInterpolateFn={animateRadarFromCenter}
                  filter="url(#gearup-radar-glow)"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-1">
            {chartData.map((item) => (
              <div
                key={item.subject}
                className="rounded-lg border border-slate-100 bg-slate-50 px-1 py-2 text-center dark:border-white/[0.07] dark:bg-white/[0.035]"
              >
                <p className="truncate text-[9px] font-bold text-slate-500 dark:text-slate-400">
                  {item.subject}
                </p>

                <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">
                  {formatNumber(item.value)}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyChartMessage message="No rental lifecycle data is available yet." />
      )}
    </article>
  );
}
function PaymentDistributionCard({
  paymentStatus,
}: {
  paymentStatus: PaymentStatusSnapshot;
}) {
  const segments = [
    {
      name: "Completed",
      value: Math.max(0, paymentStatus.completed),
      color: "#18c9b0",
    },
    {
      name: "Pending",
      value: Math.max(0, paymentStatus.pending),
      color: "#6d8cff",
    },
    {
      name: "Failed",
      value: Math.max(0, paymentStatus.failed),
      color: "#fb7185",
    },
    {
      name: "Cancelled",
      value: Math.max(0, paymentStatus.cancelled),
      color: "#fbbf24",
    },
  ];

  const totalPayments = segments.reduce((sum, item) => sum + item.value, 0);

  const chartData =
    totalPayments > 0
      ? segments.filter((item) => item.value > 0)
      : [
          {
            name: "No payment data",
            value: 1,
            color: "#dbe4f0",
          },
        ];

  const completedPercent =
    totalPayments > 0
      ? Math.round((paymentStatus.completed / totalPayments) * 100)
      : 0;

  const chartKey = segments
    .map((item) => `${item.name}-${item.value}`)
    .join("-");

  return (
    <section className="gearup-admin-card relative h-full min-h-[275px] min-w-0 overflow-hidden p-4 sm:p-5">
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 size-32 rounded-full bg-cyan-300/20 blur-3xl"
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-950 dark:text-white">
            Payment distribution
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Live payment outcome mix.
          </p>
        </div>

        <span className="shrink-0 rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
          Live
        </span>
      </div>

      <div className="relative z-10 mt-5 grid grid-cols-[108px_minmax(0,1fr)] items-center gap-3">
        {/* Donut chart */}
        <div className="relative h-[118px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={false}
                formatter={(value) => [
                  Number(value).toLocaleString(),
                  "Payments",
                ]}
                contentStyle={{
                  border: "1px solid rgba(148, 163, 184, 0.22)",
                  borderRadius: "12px",
                  background: "#0b1731",
                  color: "#ffffff",
                }}
              />

              <Pie
                key={chartKey}
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="92%"
                startAngle={90}
                endAngle={-270}
                paddingAngle={chartData.length > 1 ? 5 : 0}
                cornerRadius="50%"
                stroke="transparent"
                isAnimationActive
                animationBegin={150}
                animationDuration={1300}
                animationEasing="cubic-bezier(0.22, 1, 0.36, 1)"
              >
                {chartData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xl font-black text-slate-950 dark:text-white">
              {completedPercent}%
            </p>

            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Success
            </p>
          </div>
        </div>

        {/* Status list */}
        <div className="min-w-0 space-y-2.5">
          {segments.map((segment) => (
            <div
              key={segment.name}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <span className="flex min-w-0 items-center gap-2 text-slate-600 dark:text-slate-300">
                <span
                  className="size-2 shrink-0 rounded-full shadow-[0_0_10px_currentColor]"
                  style={{
                    backgroundColor: segment.color,
                    color: segment.color,
                  }}
                />

                <span className="truncate">{segment.name}</span>
              </span>

              <span className="shrink-0 font-bold text-slate-950 dark:text-white">
                {segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 border-t border-slate-200 pt-3 dark:border-white/10">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Total payments{" "}
          <span className="ml-1 font-bold text-cyan-700 dark:text-cyan-300">
            {totalPayments.toLocaleString()}
          </span>
        </p>
      </div>
    </section>
  );
}

function OperationsCard({
  rentals,
  activeRentals,
  cancelledRentals,
  isLoading,
}: {
  rentals: number;
  activeRentals: number;
  cancelledRentals: number;
  isLoading: boolean;
}) {
  const activeRate =
    rentals > 0 ? Math.round((activeRentals / rentals) * 100) : 0;
  const cancelledRate =
    rentals > 0 ? Math.round((cancelledRentals / rentals) * 100) : 0;

  const rows = [
    {
      label: "Active rental share",
      value: isLoading ? "—" : `${activeRate}%`,
      className: "from-cyan-400 to-sky-500",
      icon: Activity,
    },
    {
      label: "Cancelled rental share",
      value: isLoading ? "—" : `${cancelledRate}%`,
      className: "from-rose-400 to-orange-400",
      icon: RotateCcw,
    },
  ];

  return (
    <article className="gearup-admin-card h-full min-w-0 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-black text-slate-950 dark:text-white">
            Operations snapshot
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Quick indicators for current orders.
          </p>
        </div>

        <Link
          href="/dashboard/admin/rentals"
          className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-white/10 dark:text-slate-300 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10 dark:hover:text-cyan-200"
          aria-label="Open rental management"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="mt-6 space-y-5">
        {rows.map(({ label, value, className, icon: Icon }) => (
          <div key={label}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                <Icon className="size-4 text-slate-400 dark:text-slate-500" />
                {label}
              </span>
              <span className="font-black text-slate-950 dark:text-white">
                {value}
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.08]">
              <div
                style={{
                  width: isLoading ? "0%" : value,
                }}
                className={`h-full rounded-full bg-gradient-to-r ${className} transition-all duration-1000`}
              />
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/admin/payments"
        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 transition hover:gap-3 dark:text-cyan-300"
      >
        Review payments
        <ArrowUpRight className="size-4" />
      </Link>
    </article>
  );
}

function EmptyChartMessage({ message }: { message: string }) {
  return (
    <div className="mt-5 grid min-h-48 place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.025] dark:text-slate-400">
      {message}
    </div>
  );
}

function getRadarPoint(index: number, ratio: number, total: number) {
  const angle = ((-90 + (index * 360) / total) * Math.PI) / 180;
  const radius = 70 * Math.max(0, Math.min(ratio, 1));

  return `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
}
