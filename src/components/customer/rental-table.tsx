"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { rentalService } from "@/services/rental.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatDate } from "@/lib/utils/format-date";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

export function RentalTable({ limit = 20 }: { limit?: number }) {
  const client = useQueryClient();
  const query = useQuery({ queryKey: [...queryKeys.rentals, { limit }], queryFn: () => rentalService.list({ page: 1, limit }) });
  const cancel = useMutation({
    mutationFn: rentalService.cancel,
    onSuccess: () => { toast.success("Rental cancelled"); client.invalidateQueries({ queryKey: queryKeys.rentals }); },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  if (query.isLoading) return <LoadingSpinner label="Loading rentals…" />;
  if (query.isError) return <ErrorMessage message={getErrorMessage(query.error)} />;
  if (!query.data?.items.length) return <EmptyState title="No rentals yet" description="Browse gear and place your first rental." action={<Link href="/gear" className="text-sm font-medium text-primary">Browse gear</Link>} />;
  return <div className="overflow-x-auto rounded-2xl border bg-card">
    <table className="w-full text-sm">
      <thead className="bg-muted/60 text-left"><tr><th className="p-4">Order</th><th className="p-4">Dates</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr></thead>
      <tbody>{query.data.items.map((order) => <tr key={order.id} className="border-t">
        <td className="p-4"><p className="font-medium">{order.orderNumber}</p><p className="text-xs text-muted-foreground">{order.items?.[0]?.gearNameSnapshot ?? `${order.items?.length ?? 0} item(s)`}</p></td>
        <td className="whitespace-nowrap p-4">{formatDate(order.startDate)} – {formatDate(order.endDate)}</td>
        <td className="p-4 font-medium">{formatCurrency(order.totalAmount)}</td>
        <td className="p-4"><StatusBadge status={order.status} /></td>
        <td className="p-4"><div className="flex justify-end gap-2">
          <Link href={`/dashboard/customer/orders/${order.id}`} className="rounded-md border px-3 py-1.5 font-medium">View</Link>
          {order.status === "CONFIRMED" && <Link href={`/dashboard/customer/orders/${order.id}/pay`} className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground">Pay</Link>}
          {order.status === "RETURNED" && <Link href={`/dashboard/customer/orders/${order.id}/review`} className="rounded-md border px-3 py-1.5 font-medium">Review</Link>}
          {["PLACED", "CONFIRMED"].includes(order.status) && <Button size="sm" variant="ghost" disabled={cancel.isPending} onClick={() => cancel.mutate(order.id)}>Cancel</Button>}
        </div></td>
      </tr>)}</tbody>
    </table>
  </div>;
}
