import { CalendarClock, CheckCircle2, CircleDollarSign } from "lucide-react";
import type { Payment, RentalOrder } from "@/types";
import { formatCurrency } from "@/lib/utils/format-currency";

export function CustomerStats({
  rentals,
  payments,
}: {
  rentals: RentalOrder[];
  payments: Payment[];
}) {
  const active = rentals.filter(
    (order) => !["RETURNED", "CANCELLED"].includes(order.status),
  ).length;
  const completed = rentals.filter(
    (order) => order.status === "RETURNED",
  ).length;
  const paid = payments
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((total, payment) => total + Number(payment.amount), 0);
  const stats = [
    [CalendarClock, "Active rentals", String(active)],
    [CheckCircle2, "Completed", String(completed)],
    [CircleDollarSign, "Total paid", formatCurrency(paid)],
  ] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(([Icon, label, value]) => (
        <div key={label} className="rounded-2xl border bg-card p-5">
          <Icon className="size-5 text-primary" />
          <p className="mt-4 text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}
