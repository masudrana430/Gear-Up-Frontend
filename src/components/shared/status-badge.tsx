import type { RentalStatus } from "@/types";
import {
  RENTAL_STATUS_LABELS,
  RENTAL_STATUS_STYLES,
} from "@/lib/constants/rental-status";

export function StatusBadge({ status }: { status: RentalStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${RENTAL_STATUS_STYLES[status]}`}
    >
      {RENTAL_STATUS_LABELS[status]}
    </span>
  );
}

export function SimpleStatusBadge({ status }: { status: string }) {
  const positive = ["ACTIVE", "COMPLETED", "PAID", "TRUE"].includes(
    status.toUpperCase(),
  );
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${positive ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
