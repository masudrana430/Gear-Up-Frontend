"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { RentalOrder, RentalStatus } from "@/types";
import { providerService } from "@/services/provider.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatDate } from "@/lib/utils/format-date";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

const nextActions: Partial<
  Record<RentalStatus, { label: string; status: RentalStatus }[]>
> = {
  PLACED: [
    { label: "Confirm", status: "CONFIRMED" },
    { label: "Cancel", status: "CANCELLED" },
  ],
  PAID: [{ label: "Mark picked up", status: "PICKED_UP" }],
  PICKED_UP: [{ label: "Mark returned", status: "RETURNED" }],
};

export function ProviderOrderTable({ limit = 20 }: { limit?: number }) {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: [...queryKeys.providerOrders, { limit }],
    queryFn: () => providerService.orders(1, limit),
  });
  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: RentalStatus }) =>
      providerService.updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success("Order status updated");
      client.invalidateQueries({ queryKey: queryKeys.providerOrders });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  if (query.isLoading)
    return <LoadingSpinner label="Loading provider orders…" />;
  if (query.isError)
    return <ErrorMessage message={getErrorMessage(query.error)} />;
  if (!query.data?.items.length)
    return (
      <EmptyState
        title="No incoming orders"
        description="Customer rental requests will appear here."
      />
    );
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="p-4">Order</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Dates</th>
            <th className="p-4">Total</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {query.data.items.map((order: RentalOrder) => (
            <tr key={order.id} className="border-t">
              <td className="p-4 font-medium">{order.orderNumber}</td>
              <td className="p-4">{order.customer?.name ?? "Customer"}</td>
              <td className="whitespace-nowrap p-4">
                {formatDate(order.startDate)} – {formatDate(order.endDate)}
              </td>
              <td className="p-4">{formatCurrency(order.totalAmount)}</td>
              <td className="p-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/dashboard/provider/orders/${order.id}`}
                    className="rounded-md border px-3 py-1.5 font-medium"
                  >
                    View
                  </Link>
                  {nextActions[order.status]?.map((action) => (
                    <Button
                      key={action.status}
                      size="sm"
                      variant={
                        action.status === "CANCELLED" ? "ghost" : "default"
                      }
                      disabled={update.isPending}
                      onClick={() =>
                        update.mutate({ id: order.id, status: action.status })
                      }
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
