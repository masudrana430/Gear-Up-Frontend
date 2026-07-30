import type { RentalStatus } from "@/types";

export const RENTAL_STATUS_LABELS: Record<RentalStatus, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PAID: "Paid",
  PICKED_UP: "Picked up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

export const RENTAL_STATUS_STYLES: Record<RentalStatus, string> = {
  PLACED: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  PAID: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  PICKED_UP: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  RETURNED: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
};
