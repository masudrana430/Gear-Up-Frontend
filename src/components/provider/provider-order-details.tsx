"use client";

import { useQuery } from "@tanstack/react-query";
import { providerService } from "@/services/provider.service";
import { queryKeys } from "@/lib/query/query-keys";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatDate } from "@/lib/utils/format-date";
import { getErrorMessage } from "@/lib/api/error-parser";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { StatusBadge } from "@/components/shared/status-badge";

export function ProviderOrderDetails({ id }: { id: string }) {
  const query = useQuery({ queryKey: [...queryKeys.providerOrders, id], queryFn: () => providerService.order(id) });
  if (query.isLoading) return <LoadingSpinner label="Loading order…" />;
  if (query.isError || !query.data) return <ErrorMessage message={getErrorMessage(query.error)} />;
  const order = query.data;
  return <div className="space-y-5"><div className="flex items-center justify-between rounded-2xl border bg-card p-6"><div><p className="text-sm text-muted-foreground">Order</p><h2 className="text-2xl font-bold">{order.orderNumber}</h2></div><StatusBadge status={order.status} /></div><div className="grid gap-5 sm:grid-cols-3"><div className="rounded-2xl border bg-card p-5"><p className="text-sm text-muted-foreground">Customer</p><p className="mt-2 font-semibold">{order.customer?.name ?? "Customer"}</p><p className="text-sm">{order.customer?.email}</p></div><div className="rounded-2xl border bg-card p-5"><p className="text-sm text-muted-foreground">Rental dates</p><p className="mt-2 font-semibold">{formatDate(order.startDate)} – {formatDate(order.endDate)}</p></div><div className="rounded-2xl border bg-card p-5"><p className="text-sm text-muted-foreground">Total</p><p className="mt-2 text-2xl font-bold">{formatCurrency(order.totalAmount)}</p></div></div><div className="rounded-2xl border bg-card p-6"><h3 className="font-semibold">Items</h3>{order.items.map((item) => <div key={item.id} className="mt-4 flex justify-between border-t pt-4"><span>{item.gearNameSnapshot} × {item.quantity}</span><strong>{formatCurrency(item.lineTotal)}</strong></div>)}</div></div>;
}
