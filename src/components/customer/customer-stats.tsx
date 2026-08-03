"use client";

import { MoreHorizontal } from "lucide-react";

type CustomerStatsProps = {
  rentals: unknown[];
  payments: unknown[];
  isLoading?: boolean;
};

type DashboardMetric = {
  label: string;
  value: number;
};

type MonthlyPoint = {
  label: string;
  value: number;
};

const SUCCESS_PAYMENT_STATUSES = new Set([
  "SUCCESS",
  "SUCCESSFUL",
  "PAID",
  "COMPLETED",
  "VALID",
  "VALIDATED",
]);

const AUTHORIZED_PAYMENT_STATUSES = new Set([
  "AUTHORIZED",
  "AUTHORised",
  "VALID",
  "VALIDATED",
  "SUCCESS",
  "SUCCESSFUL",
  "PAID",
  "COMPLETED",
]);

const REFUNDED_PAYMENT_STATUSES = new Set([
  "REFUNDED",
  "PARTIALLY_REFUNDED",
]);

const COMPLETED_RENTAL_STATUSES = new Set([
  "COMPLETED",
  "RETURNED",
  "CLOSED",
]);

const PAYMENT_DATE_KEYS = [
  "paidAt",
  "paymentDate",
  "createdAt",
  "updatedAt",
];

const RENTAL_DATE_KEYS = [
  "createdAt",
  "startDate",
  "rentalDate",
  "bookingDate",
  "updatedAt",
];

function toRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return {};
  }

  return value as Record<string, unknown>;
}

function getString(
  value: unknown,
  keys: string[],
): string {
  const record = toRecord(value);

  for (const key of keys) {
    const field = record[key];

    if (typeof field === "string") {
      return field;
    }
  }

  return "";
}

function getDate(
  value: unknown,
  keys: string[],
): Date | null {
  const record = toRecord(value);

  for (const key of keys) {
    const field = record[key];

    if (
      typeof field !== "string" &&
      typeof field !== "number" &&
      !(field instanceof Date)
    ) {
      continue;
    }

    const date =
      field instanceof Date ? field : new Date(field);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

function getStatus(value: unknown): string {
  return getString(value, [
    "status",
    "paymentStatus",
    "transactionStatus",
    "rentalStatus",
  ]).toUpperCase();
}

function formatCompact(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatSigned(value: number): string {
  const formatted = new Intl.NumberFormat("en").format(
    Math.abs(value),
  );

  if (value > 0) {
    return `+${formatted}`;
  }

  if (value < 0) {
    return `-${formatted}`;
  }

  return "0";
}

function getPeriodComparison(
  items: unknown[],
  dateKeys: string[],
) {
  const now = new Date();
  const currentStart = new Date(now);
  const previousStart = new Date(now);

  currentStart.setDate(now.getDate() - 30);
  previousStart.setDate(now.getDate() - 60);

  let current = 0;
  let previous = 0;
  let datedItems = 0;

  for (const item of items) {
    const date = getDate(item, dateKeys);

    if (!date) {
      continue;
    }

    datedItems += 1;

    if (date >= currentStart && date <= now) {
      current += 1;
    } else if (
      date >= previousStart &&
      date < currentStart
    ) {
      previous += 1;
    }
  }

  if (datedItems === 0) {
    return {
      current: items.length,
      previous: 0,
      difference: items.length,
    };
  }

  return {
    current,
    previous,
    difference: current - previous,
  };
}

function getWeekdayDistribution(
  items: unknown[],
  dateKeys: string[],
) {
  const values = Array.from({ length: 7 }, () => 0);

  for (const item of items) {
    const date = getDate(item, dateKeys);

    if (!date) {
      continue;
    }

    values[date.getDay()] += 1;
  }

  return values;
}

function getMonthlySeries(
  items: unknown[],
  dateKeys: string[],
): MonthlyPoint[] {
  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (5 - index),
      1,
    );

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      label: date.toLocaleDateString("en", {
        month: "short",
      }),
      value: 0,
    };
  });

  for (const item of items) {
    const date = getDate(item, dateKeys);

    if (!date) {
      continue;
    }

    const target = months.find(
      (month) =>
        month.year === date.getFullYear() &&
        month.month === date.getMonth(),
    );

    if (target) {
      target.value += 1;
    }
  }

  return months.map(({ label, value }) => ({
    label,
    value,
  }));
}

function getPeakIndex(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce(
    (highestIndex, value, index, array) =>
      value > array[highestIndex]
        ? index
        : highestIndex,
    0,
  );
}

function OptionsButton() {
  return (
    <button
      type="button"
      aria-label="More options"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-white/5"
    >
      <MoreHorizontal className="h-4 w-4" />
    </button>
  );
}

function PaymentChart({
  metrics,
}: {
  metrics: DashboardMetric[];
}) {
  const width = 1000;
  const segmentWidth = width / metrics.length;
  const bottom = 220;
  const maximum = Math.max(
    ...metrics.map((metric) => metric.value),
    1,
  );

  const chartTop = 35;
  const chartHeight = bottom - chartTop;

  const yPositions = metrics.map((metric) => {
    const percentage = metric.value / maximum;
    const height = Math.max(38, percentage * chartHeight);

    return bottom - height;
  });

  const authorized = metrics[1]?.value ?? 0;
  const successful = metrics[2]?.value ?? 0;

  const conversion =
    authorized > 0
      ? Math.round((successful / authorized) * 100)
      : 0;

  const dropOff = Math.max(0, 100 - conversion);
  const tooltipY = Math.max(5, yPositions[2] - 45);

  return (
    <svg
      viewBox={`0 0 ${width} 250`}
      className="h-auto min-h-[220px] w-full"
      role="img"
      aria-label="Payment conversion statistics"
    >
      <defs>
        <pattern
          id="paymentStripes"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect
            width="8"
            height="8"
            fill="#60a5fa"
            fillOpacity="0.68"
          />
          <rect
            width="2"
            height="8"
            fill="#ffffff"
            fillOpacity="0.85"
          />
        </pattern>

        <linearGradient
          id="successfulPaymentGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop
            offset="100%"
            stopColor="#bfdbfe"
            stopOpacity="0.5"
          />
        </linearGradient>

        <linearGradient
          id="paymentBackgroundGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#dbeafe"
            stopOpacity="0.9"
          />
          <stop
            offset="100%"
            stopColor="#eff6ff"
            stopOpacity="0.3"
          />
        </linearGradient>

        <filter
          id="tooltipShadow"
          x="-20%"
          y="-30%"
          width="140%"
          height="170%"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="5"
            floodColor="#0f172a"
            floodOpacity="0.16"
          />
        </filter>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map(
        (percentage) => {
          const y = bottom - percentage * chartHeight;
          const value = Math.round(maximum * percentage);

          return (
            <g key={percentage}>
              <line
                x1="0"
                x2={width}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />

              <text
                x="7"
                y={y - 6}
                fill="#64748b"
                fontSize="10"
              >
                {formatCompact(value)}
              </text>
            </g>
          );
        },
      )}

      <rect
        x="0"
        y={chartTop}
        width={width}
        height={chartHeight}
        fill="url(#paymentBackgroundGradient)"
        opacity="0.28"
      />

      {metrics.map((metric, index) => {
        const x = index * segmentWidth;
        const endX = x + segmentWidth;
        const currentY = yPositions[index];
        const nextY =
          yPositions[index + 1] ?? currentY;

        const path = `
          M ${x} ${bottom}
          L ${x} ${currentY}
          L ${endX - 22} ${currentY}
          L ${endX} ${nextY}
          L ${endX} ${bottom}
          Z
        `;

        return (
          <g key={metric.label}>
            <path
              d={path}
              fill={
                index === 2
                  ? "url(#successfulPaymentGradient)"
                  : "url(#paymentStripes)"
              }
              opacity={index === 2 ? 1 : 0.92}
            />

            <line
              x1={x}
              x2={x}
              y1={chartTop}
              y2={bottom}
              stroke="#ffffff"
              strokeWidth="3"
              opacity="0.75"
            />

            <line
              x1={x + segmentWidth / 2 - 12}
              x2={x + segmentWidth / 2 + 12}
              y1={currentY - 7}
              y2={currentY - 7}
              stroke="#60a5fa"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      <line
        x1={width}
        x2={width}
        y1={chartTop}
        y2={bottom}
        stroke="#ffffff"
        strokeWidth="3"
      />

      <g
        transform={`translate(490 ${tooltipY})`}
        filter="url(#tooltipShadow)"
      >
        <rect
          x="-177"
          y="0"
          width="354"
          height="32"
          rx="16"
          fill="#f8fafc"
          stroke="#e2e8f0"
        />

        <text
          x="0"
          y="20"
          textAnchor="middle"
          fill="#334155"
          fontSize="11"
          fontWeight="500"
        >
          {formatCompact(successful)} transactions |
          Conversion: {conversion}% | Drop-off: -
          {dropOff}%
        </text>
      </g>

      <line
        x1="0"
        x2={width}
        y1={bottom}
        y2={bottom}
        stroke="#cbd5e1"
        strokeWidth="1"
      />
    </svg>
  );
}

function RetentionChart({
  series,
  percentage,
}: {
  series: MonthlyPoint[];
  percentage: number;
}) {
  const width = 300;
  const height = 265;
  const left = 20;
  const right = 15;
  const top = 35;
  const bottom = 225;

  const chartWidth = width - left - right;
  const chartHeight = bottom - top;
  const maximum = Math.max(
    ...series.map((point) => point.value),
    1,
  );

  const points = series.map((point, index) => {
    const x =
      left +
      (index / Math.max(series.length - 1, 1)) *
        chartWidth;

    const y =
      bottom -
      (point.value / maximum) * chartHeight * 0.82;

    return {
      ...point,
      x,
      y,
    };
  });

  let stepPath = "";

  points.forEach((point, index) => {
    if (index === 0) {
      stepPath = `M ${point.x} ${point.y}`;
      return;
    }

    stepPath += ` H ${point.x} V ${point.y}`;
  });

  const areaPath = `${stepPath} L ${
    points.at(-1)?.x ?? left
  } ${bottom} L ${points[0]?.x ?? left} ${bottom} Z`;

  const highestIndex = getPeakIndex(
    series.map((point) => point.value),
  );

  const highestPoint = points[highestIndex];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Rental retention chart"
    >
      <defs>
        <linearGradient
          id="retentionFade"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#ec4899"
            stopOpacity="0.2"
          />
          <stop
            offset="100%"
            stopColor="#ec4899"
            stopOpacity="0"
          />
        </linearGradient>

        <clipPath id="retentionAreaClip">
          <path d={areaPath} />
        </clipPath>

        <filter
          id="retentionBadgeShadow"
          x="-30%"
          y="-40%"
          width="160%"
          height="190%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="4"
            floodColor="#0f172a"
            floodOpacity="0.13"
          />
        </filter>
      </defs>

      <path d={areaPath} fill="url(#retentionFade)" />

      <g clipPath="url(#retentionAreaClip)">
        {Array.from({ length: 44 }, (_, index) => {
          const x = left + index * 6.2;

          return (
            <line
              key={x}
              x1={x}
              x2={x}
              y1={top}
              y2={bottom}
              stroke="#f9a8d4"
              strokeWidth="1.4"
              opacity="0.6"
            />
          );
        })}
      </g>

      <path
        d={stepPath}
        fill="none"
        stroke="#ec4899"
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />

      {highestPoint ? (
        <>
          <circle
            cx={highestPoint.x}
            cy={highestPoint.y}
            r="4"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="2"
          />

          <g
            transform={`translate(${Math.min(
              Math.max(highestPoint.x - 25, 4),
              width - 58,
            )} ${Math.max(highestPoint.y - 35, 4)})`}
            filter="url(#retentionBadgeShadow)"
          >
            <rect
              width="54"
              height="24"
              rx="12"
              fill="#ffffff"
              stroke="#f1f5f9"
            />

            <text
              x="27"
              y="16"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="10"
              fontWeight="700"
            >
              {percentage}%
            </text>
          </g>
        </>
      ) : null}

      <line
        x1={left}
        x2={width - right}
        y1={bottom}
        y2={bottom}
        stroke="#e2e8f0"
      />

      {points.map((point) => (
        <text
          key={point.label}
          x={point.x}
          y="249"
          textAnchor="middle"
          fill="#64748b"
          fontSize="10"
        >
          {point.label}
        </text>
      ))}
    </svg>
  );
}

function DotDistribution({
  values,
  tone,
  badgePrefix,
}: {
  values: number[];
  tone: "green" | "blue";
  badgePrefix: string;
}) {
  const labels = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const maximum = Math.max(...values, 1);
  const peakIndex = getPeakIndex(values);

  const circleClass =
    tone === "green"
      ? "text-emerald-500"
      : "text-blue-500";

  const secondaryCircleClass =
    tone === "green"
      ? "text-emerald-300"
      : "text-blue-300";

  const peakX = 25 + peakIndex * 43;

  return (
    <svg
      viewBox="0 0 310 105"
      className={`h-[88px] w-full ${circleClass}`}
      role="img"
      aria-label="Activity distribution by weekday"
    >
      <defs>
        <filter
          id={`dotBadgeShadow-${tone}`}
          x="-30%"
          y="-40%"
          width="160%"
          height="190%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="4"
            floodColor="#0f172a"
            floodOpacity="0.13"
          />
        </filter>
      </defs>

      {values.map((value, index) => {
        const normalizedHeight =
          value === 0
            ? 0
            : Math.max(
                1,
                Math.round((value / maximum) * 6),
              );

        const x = 25 + index * 43;

        return Array.from(
          { length: normalizedHeight },
          (_, row) => {
            const y = 88 - row * 13;

            return (
              <circle
                key={`${index}-${row}`}
                cx={x}
                cy={y}
                r={row >= normalizedHeight - 2 ? 5 : 4.5}
                fill="currentColor"
                className={
                  index === peakIndex
                    ? circleClass
                    : secondaryCircleClass
                }
              />
            );
          },
        );
      })}

      <g
        transform={`translate(${Math.min(
          Math.max(peakX - 38, 3),
          230,
        )} 2)`}
        filter={`url(#dotBadgeShadow-${tone})`}
      >
        <rect
          width="78"
          height="25"
          rx="12.5"
          fill="#ffffff"
          stroke="#e2e8f0"
        />

        <text
          x="39"
          y="16"
          textAnchor="middle"
          fill="#64748b"
          fontSize="9"
        >
          {badgePrefix}:{" "}
          <tspan
            fill="#0f172a"
            fontWeight="700"
          >
            {labels[peakIndex]}
          </tspan>
        </text>
      </g>
    </svg>
  );
}

function ActivityCard({
  title,
  value,
  comparison,
  distribution,
  tone,
  badgePrefix,
}: {
  title: string;
  value: number;
  comparison: number;
  distribution: number[];
  tone: "green" | "blue";
  badgePrefix: string;
}) {
  return (
    <article className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-slate-950 sm:p-5">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
          {title}
        </h3>

        <OptionsButton />
      </div>

      <div className="mt-1 grid items-end gap-4 sm:grid-cols-[150px_minmax(180px,1fr)_110px]">
        <p className="text-[44px] font-medium leading-none tracking-[-0.05em] text-slate-950 dark:text-white sm:text-[50px]">
          {formatCompact(value)}
        </p>

        <DotDistribution
          values={distribution}
          tone={tone}
          badgePrefix={badgePrefix}
        />

        <div className="pb-2 text-left sm:text-right">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            vs last period
          </p>

          <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
            {formatSigned(comparison)}
          </p>
        </div>
      </div>
    </article>
  );
}

function StatsSkeleton() {
  return (
    <section className="space-y-4">
      <div className="h-[350px] animate-pulse rounded-[24px] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950" />

      <div className="grid gap-4 lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)]">
        <div className="h-[410px] animate-pulse rounded-[24px] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950" />

        <div className="space-y-4">
          <div className="h-[195px] animate-pulse rounded-[24px] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950" />
          <div className="h-[195px] animate-pulse rounded-[24px] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>
    </section>
  );
}

export function CustomerStats({
  rentals,
  payments,
  isLoading = false,
}: CustomerStatsProps) {
  if (isLoading) {
    return <StatsSkeleton />;
  }

  const authorizedPayments = payments.filter((payment) =>
    AUTHORIZED_PAYMENT_STATUSES.has(
      getStatus(payment),
    ),
  );

  const successfulPayments = payments.filter((payment) =>
    SUCCESS_PAYMENT_STATUSES.has(getStatus(payment)),
  );

  const refundedPayments = payments.filter((payment) =>
    REFUNDED_PAYMENT_STATUSES.has(getStatus(payment)),
  );

  const completedRentals = rentals.filter((rental) =>
    COMPLETED_RENTAL_STATUSES.has(getStatus(rental)),
  );

  const paymentMetrics: DashboardMetric[] = [
    {
      label: "Initiated Payments",
      value: payments.length,
    },
    {
      label: "Authorized Payments",
      value: authorizedPayments.length,
    },
    {
      label: "Successful Payments",
      value: successfulPayments.length,
    },
    {
      label: "Refunded Payments",
      value: refundedPayments.length,
    },
    {
      label: "Completed Rentals",
      value: completedRentals.length,
    },
  ];

  const completionRate =
    rentals.length > 0
      ? Math.round(
          (completedRentals.length / rentals.length) * 100,
        )
      : 0;

  const rentalMonthlySeries = getMonthlySeries(
    rentals,
    RENTAL_DATE_KEYS,
  );

  const paymentComparison = getPeriodComparison(
    payments,
    PAYMENT_DATE_KEYS,
  );

  const rentalComparison = getPeriodComparison(
    rentals,
    RENTAL_DATE_KEYS,
  );

  const paymentWeekdays = getWeekdayDistribution(
    payments,
    PAYMENT_DATE_KEYS,
  );

  const rentalWeekdays = getWeekdayDistribution(
    rentals,
    RENTAL_DATE_KEYS,
  );

  return (
    <section className="space-y-4">
      <article className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Payments
          </h2>

          <OptionsButton />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[820px]">
            <div className="mt-2 grid grid-cols-5 px-3">
              {paymentMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`px-4 py-3 ${
                    index > 0
                      ? "border-l border-slate-100 dark:border-white/5"
                      : ""
                  }`}
                >
                  <p
                    className={`text-[10px] ${
                      index === 2
                        ? "font-semibold text-slate-800 dark:text-slate-200"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {metric.label}
                  </p>

                  <p
                    className={`mt-1 text-[22px] leading-none tracking-[-0.03em] ${
                      index === 2
                        ? "font-medium text-slate-950 dark:text-white"
                        : "font-normal text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {formatCompact(metric.value)}
                  </p>
                </div>
              ))}
            </div>

            <PaymentChart metrics={paymentMetrics} />
          </div>
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)]">
        <article className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-slate-950 sm:p-5">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">
              Retention
            </h3>

            <OptionsButton />
          </div>

          <div className="mt-5">
            <RetentionChart
              series={rentalMonthlySeries}
              percentage={completionRate}
            />
          </div>
        </article>

        <div className="space-y-4">
          <ActivityCard
            title="Transactions"
            value={payments.length}
            comparison={paymentComparison.difference}
            distribution={paymentWeekdays}
            tone="green"
            badgePrefix="Peak"
          />

          <ActivityCard
            title="Rentals"
            value={rentals.length}
            comparison={rentalComparison.difference}
            distribution={rentalWeekdays}
            tone="blue"
            badgePrefix="Highest"
          />
        </div>
      </div>
    </section>
  );
}