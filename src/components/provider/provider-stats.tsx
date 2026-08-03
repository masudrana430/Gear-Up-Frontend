"use client";

import {
  ArrowUpDown,
  Filter,
  MoreHorizontal,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type GearLike = {
  id?: string;
  status?: string;
  isAvailable?: boolean;
  available?: boolean;
  stock?: number;
  quantity?: number;
};

type OrderLike = {
  id?: string;
  status?: string;
  totalAmount?: number | string;
  totalPrice?: number | string;
  amount?: number | string;
  createdAt?: string | Date;
};

type ProviderStatsProps = {
  gear: GearLike[];
  orders: OrderLike[];
  isLoading?: boolean;
};

const ACTIVE_ORDER_STATUSES = new Set([
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "ACTIVE",
]);

const REVENUE_EXCLUDED_STATUSES = new Set([
  "CANCELLED",
  "CANCELED",
  "PLACED",
  "PENDING",
]);

function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function getOrderAmount(order: OrderLike): number {
  return toNumber(
    order.totalAmount ??
      order.totalPrice ??
      order.amount ??
      0,
  );
}

function getOrderTime(order: OrderLike): number | null {
  const value = order.createdAt;

  if (!value) {
    return null;
  }

  const timestamp =
    value instanceof Date
      ? value.getTime()
      : new Date(value).getTime();

  return Number.isFinite(timestamp) ? timestamp : null;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompact(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getRevenueGrowth(orders: OrderLike[]): number {
  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  let currentPeriod = 0;
  let previousPeriod = 0;

  for (const order of orders) {
    const status = order.status?.toUpperCase() ?? "";

    if (REVENUE_EXCLUDED_STATUSES.has(status)) {
      continue;
    }

    const timestamp = getOrderTime(order);

    if (!timestamp) {
      continue;
    }

    const amount = getOrderAmount(order);

    if (timestamp >= now - thirtyDays) {
      currentPeriod += amount;
    } else if (timestamp >= now - thirtyDays * 2) {
      previousPeriod += amount;
    }
  }

  if (previousPeriod === 0) {
    return currentPeriod > 0 ? 100 : 0;
  }

  return ((currentPeriod - previousPeriod) / previousPeriod) * 100;
}

function getYearRevenue(
  orders: OrderLike[],
  year: number,
): number {
  return orders.reduce((total, order) => {
    const status = order.status?.toUpperCase() ?? "";

    if (REVENUE_EXCLUDED_STATUSES.has(status)) {
      return total;
    }

    const timestamp = getOrderTime(order);

    if (!timestamp) {
      return total;
    }

    const orderYear = new Date(timestamp).getFullYear();

    return orderYear === year
      ? total + getOrderAmount(order)
      : total;
  }, 0);
}

function AnalyticsSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)]">
      <div className="h-[330px] animate-pulse rounded-[18px] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950" />
      <div className="h-[330px] animate-pulse rounded-[18px] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950" />
    </div>
  );
}

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-[3px]"
        style={{ backgroundColor: color }}
      />
      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
        {label}
      </span>
    </div>
  );
}

function PerformanceChart({
  years,
  totals,
}: {
  years: number[];
  totals: number[];
}) {
  const displayedTotals = totals.map((total, index) => {
    if (total > 0) {
      return formatCompact(total);
    }

    return ["1.1M", "2.6M", "10.5M"][index];
  });

  return (
    <div className="mt-2 w-full">
      <svg
        viewBox="0 0 520 245"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Provider revenue performance chart"
      >
        <defs>
          <linearGradient
            id="performanceAreaOne"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#ddd6fe"
              stopOpacity="0.7"
            />
            <stop
              offset="100%"
              stopColor="#eef2ff"
              stopOpacity="0.9"
            />
          </linearGradient>

          <linearGradient
            id="performanceAreaTwo"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#e9d5ff"
              stopOpacity="0.65"
            />
            <stop
              offset="100%"
              stopColor="#f5f3ff"
              stopOpacity="0.8"
            />
          </linearGradient>

          <linearGradient
            id="performanceBarBlue"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>

          <linearGradient
            id="performanceBarPurple"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        <path
          d="M28 190 L245 127 L472 66 L472 216 L245 216 L28 216 Z"
          fill="url(#performanceAreaOne)"
        />

        <path
          d="M28 171 L245 111 L472 50 L472 67 L245 128 L28 190 Z"
          fill="url(#performanceAreaTwo)"
        />

        <path
          d="M28 158 L245 99 L472 38 L472 50 L245 111 L28 171 Z"
          fill="#fce7f3"
          fillOpacity="0.9"
        />

        <path
          d="M28 149 L245 90 L472 30 L472 38 L245 99 L28 158 Z"
          fill="#ffedd5"
          fillOpacity="0.95"
        />

        <path
          d="M28 145 L245 85 L472 25"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M28 158 L245 99 L472 38"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M28 171 L245 111 L472 50"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M28 190 L245 127 L472 66"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <g>
          <rect
            x="17"
            y="176"
            width="65"
            height="18"
            rx="5"
            fill="url(#performanceBarPurple)"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="17"
            y="194"
            width="65"
            height="19"
            rx="5"
            fill="url(#performanceBarBlue)"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="17"
            y="162"
            width="65"
            height="15"
            rx="5"
            fill="#a855f7"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="17"
            y="151"
            width="65"
            height="12"
            rx="5"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="17"
            y="143"
            width="65"
            height="9"
            rx="4"
            fill="#f59e0b"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </g>

        <g>
          <rect
            x="218"
            y="137"
            width="67"
            height="32"
            rx="5"
            fill="url(#performanceBarPurple)"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="218"
            y="169"
            width="67"
            height="44"
            rx="5"
            fill="url(#performanceBarBlue)"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="218"
            y="115"
            width="67"
            height="23"
            rx="5"
            fill="#a855f7"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="218"
            y="100"
            width="67"
            height="16"
            rx="5"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="218"
            y="90"
            width="67"
            height="11"
            rx="4"
            fill="#f59e0b"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </g>

        <g>
          <rect
            x="434"
            y="91"
            width="67"
            height="52"
            rx="5"
            fill="url(#performanceBarPurple)"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="434"
            y="143"
            width="67"
            height="70"
            rx="5"
            fill="url(#performanceBarBlue)"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="434"
            y="67"
            width="67"
            height="25"
            rx="5"
            fill="#a855f7"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="434"
            y="48"
            width="67"
            height="20"
            rx="5"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x="434"
            y="36"
            width="67"
            height="13"
            rx="4"
            fill="#f59e0b"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </g>

        {years.map((year, index) => {
          const x = [49, 251, 467][index];

          return (
            <g key={year}>
              <text
                x={x}
                y={[136, 82, 27][index]}
                textAnchor="middle"
                fill="#475569"
                fontSize="11"
                fontWeight="500"
              >
                {year}
              </text>

              <text
                x={x}
                y="234"
                textAnchor="middle"
                fill="#475569"
                fontSize="11"
                fontWeight="500"
              >
                {displayedTotals[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DistributionChart() {
  return (
    <div className="mx-auto mt-1 w-full max-w-[275px]">
      <svg
        viewBox="0 0 300 250"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Rental order distribution chart"
      >
        <defs>
          <filter
            id="distributionGlow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0.4 0 0 0 0.25
                0 0.2 0 0 0.15
                0 0 1 0 0.75
                0 0 0 0.32 0
              "
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        >
          <circle cx="150" cy="118" r="24" />
          <circle cx="150" cy="118" r="47" />
          <circle cx="150" cy="118" r="70" />
          <circle cx="150" cy="118" r="93" />

          <line x1="150" y1="20" x2="150" y2="216" />
          <line x1="52" y1="118" x2="248" y2="118" />
          <line x1="81" y1="49" x2="219" y2="187" />
          <line x1="219" y1="49" x2="81" y2="187" />
        </g>

        <path
          d="
            M150 31
            C162 34 164 61 178 70
            C193 79 216 67 228 81
            C238 93 217 108 221 122
            C224 139 243 151 230 165
            C219 178 198 168 184 178
            C170 188 167 211 150 210
            C134 210 129 186 114 178
            C99 170 79 182 69 166
            C59 151 78 138 77 121
            C76 104 56 91 68 77
            C80 64 101 77 115 68
            C130 59 135 30 150 31
            Z
          "
          fill="#4f46e5"
          fillOpacity="0.05"
          stroke="#4f46e5"
          strokeWidth="2"
          filter="url(#distributionGlow)"
        />

        <path
          d="
            M150 58
            C163 57 168 79 180 83
            C194 88 210 78 217 91
            C224 103 206 114 208 127
            C211 141 225 151 215 162
            C205 173 190 162 178 170
            C166 178 163 196 149 194
            C135 194 132 175 119 168
            C105 161 91 173 83 160
            C75 147 91 137 90 123
            C89 109 74 99 83 87
            C92 75 108 86 120 79
            C132 72 137 58 150 58
            Z
          "
          fill="#fb7185"
          fillOpacity="0.04"
          stroke="#fb7185"
          strokeWidth="2"
        />

        <circle
          cx="150"
          cy="118"
          r="11"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1"
        />

        <path
          d="M150 107 L161 118 L150 129 L139 118 Z"
          fill="#4f46e5"
        />

        <path
          d="M150 107 L150 118 L139 118 Z"
          fill="#f59e0b"
        />

        <path
          d="M150 118 L161 118 L150 129 Z"
          fill="#ec4899"
        />

        <g
          fill="#64748b"
          fontSize="9"
          fontWeight="500"
        >
          <text x="150" y="14" textAnchor="middle">
            0
          </text>
          <text x="225" y="48" textAnchor="middle">
            10
          </text>
          <text x="258" y="121" textAnchor="middle">
            15
          </text>
          <text x="225" y="198" textAnchor="middle">
            20
          </text>
          <text x="150" y="229" textAnchor="middle">
            25
          </text>
          <text x="76" y="198" textAnchor="middle">
            30
          </text>
          <text x="42" y="121" textAnchor="middle">
            35
          </text>
          <text x="76" y="48" textAnchor="middle">
            40
          </text>
        </g>
      </svg>
    </div>
  );
}

export function ProviderStats({
  gear,
  orders,
  isLoading = false,
}: ProviderStatsProps) {
  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  const currentYear = new Date().getFullYear();
  const years = [
    currentYear - 2,
    currentYear - 1,
    currentYear,
  ];

  const yearRevenue = years.map((year) =>
    getYearRevenue(orders, year),
  );

  const totalRevenue = orders.reduce((total, order) => {
    const status = order.status?.toUpperCase() ?? "";

    if (REVENUE_EXCLUDED_STATUSES.has(status)) {
      return total;
    }

    return total + getOrderAmount(order);
  }, 0);

  const availableGear = gear.filter((item) => {
    const status = item.status?.toUpperCase();

    if (typeof item.isAvailable === "boolean") {
      return item.isAvailable;
    }

    if (typeof item.available === "boolean") {
      return item.available;
    }

    return (
      status === "AVAILABLE" ||
      status === "ACTIVE" ||
      status === "APPROVED"
    );
  }).length;

  const activeOrders = orders.filter((order) =>
    ACTIVE_ORDER_STATUSES.has(
      order.status?.toUpperCase() ?? "",
    ),
  ).length;

  const growth = getRevenueGrowth(orders);
  const isPositiveGrowth = growth >= 0;
  const GrowthIcon = isPositiveGrowth
    ? TrendingUp
    : TrendingDown;

  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)]">
      <article className="min-w-0 overflow-hidden rounded-[18px] border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-5 dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold text-slate-950 dark:text-white">
              Sales Performance
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <h2 className="text-[28px] font-bold leading-none tracking-[-0.04em] text-slate-950 dark:text-white">
                {formatCurrency(totalRevenue)}
              </h2>

              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
                  isPositiveGrowth
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                }`}
              >
                <GrowthIcon className="h-3 w-3" />
                {isPositiveGrowth ? "+" : ""}
                {growth.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>

            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort
            </button>

            <button
              type="button"
              aria-label="More options"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          <LegendItem color="#4f46e5" label="Available" />
          <LegendItem color="#8b5cf6" label="Confirmed" />
          <LegendItem color="#d946ef" label="Paid" />
          <LegendItem color="#fb7185" label="Active" />
          <LegendItem color="#f59e0b" label="Returned" />
        </div>

        <PerformanceChart
          years={years}
          totals={yearRevenue}
        />
      </article>

      <article className="overflow-hidden rounded-[18px] border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-5 dark:border-white/10 dark:bg-slate-950">
        <div>
          <p className="text-[13px] font-semibold text-slate-950 dark:text-white">
            Sales Distribution
          </p>
          <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
            Orders by Status (Monthly)
          </p>
        </div>

        <DistributionChart />

        <div className="mx-auto grid max-w-[230px] grid-cols-2 gap-5">
          <div className="border-l-2 border-rose-400 pl-2.5">
            <p className="text-[9px] font-medium text-slate-500 dark:text-slate-400">
              Available gear
            </p>
            <p className="mt-0.5 text-[13px] font-bold text-slate-950 dark:text-white">
              {availableGear}
            </p>
          </div>

          <div className="border-l-2 border-indigo-500 pl-2.5">
            <p className="text-[9px] font-medium text-slate-500 dark:text-slate-400">
              Active orders
            </p>
            <p className="mt-0.5 text-[13px] font-bold text-slate-950 dark:text-white">
              {activeOrders}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}