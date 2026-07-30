"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { rentalService } from "@/services/rental.service";
import { queryKeys } from "@/lib/query/query-keys";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatDate } from "@/lib/utils/format-date";
import { getErrorMessage } from "@/lib/api/error-parser";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { StatusBadge } from "@/components/shared/status-badge";
import { ReviewForm } from "@/components/customer/review-form";

export function RentalDetails({
  id,
  mode = "details",
}: {
  id: string;
  mode?: "details" | "review";
}) {
  const query = useQuery({
    queryKey: queryKeys.rental(id),
    queryFn: () => rentalService.detail(id),
  });
  if (query.isLoading) return <LoadingSpinner label="Loading rental…" />;
  if (query.isError || !query.data)
    return <ErrorMessage message={getErrorMessage(query.error)} />;
  const order = query.data;
  if (mode === "review") {
    if (order.status !== "RETURNED" || !order.items?.[0])
      return (
        <ErrorMessage message="A review can only be submitted after this rental is returned." />
      );
    return (
      <ReviewForm
        rentalOrderId={order.id}
        gearItemId={order.items[0].gearItemId}
      />
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-6">
        <div>
          <p className="text-sm text-muted-foreground">Order number</p>
          <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6">
          <h3 className="font-semibold">Rental period</h3>
          <p className="mt-3 text-muted-foreground">
            {formatDate(order.startDate)} – {formatDate(order.endDate)} ·{" "}
            {order.rentalDays} day(s)
          </p>
          {order.notes && <p className="mt-3 text-sm">Notes: {order.notes}</p>}
        </section>
        <section className="rounded-2xl border bg-card p-6">
          <h3 className="font-semibold">Payment summary</h3>
          <p className="mt-3 text-3xl font-bold">
            {formatCurrency(order.totalAmount)}
          </p>
          <p className="text-sm text-muted-foreground">Total rental amount</p>
        </section>
      </div>
      <section className="rounded-2xl border bg-card p-6">
        <h3 className="font-semibold">Items</h3>
        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-3">
              <div>
                <p className="font-medium">{item.gearNameSnapshot}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {formatCurrency(item.pricePerDay)} ×{" "}
                  {item.rentalDays} days
                </p>
              </div>
              <p className="font-semibold">{formatCurrency(item.lineTotal)}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="flex gap-3">
        {order.status === "CONFIRMED" && (
          <Link
            href={`/dashboard/customer/orders/${order.id}/pay`}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Pay securely
          </Link>
        )}
        {order.status === "RETURNED" && (
          <Link
            href={`/dashboard/customer/orders/${order.id}/review`}
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Leave a review
          </Link>
        )}
      </div>
    </div>
  );
}
