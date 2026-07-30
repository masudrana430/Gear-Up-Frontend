"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatDate } from "@/lib/utils/format-date";
import { StatusBadge } from "@/components/shared/status-badge";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export function AdminRentalTable() {
  const query = useQuery({ queryKey: [...queryKeys.admin("rentals"), { limit: 50 }], queryFn: () => adminService.rentals(1, 50) });
  if (query.isLoading) return <LoadingSpinner label="Loading platform rentals…" />;
  if (query.isError) return <ErrorMessage message={getErrorMessage(query.error)} />;
  return <div className="overflow-x-auto rounded-2xl border bg-card"><table className="w-full text-sm"><thead className="bg-muted/60 text-left"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Dates</th><th className="p-4">Amount</th><th className="p-4">Status</th></tr></thead><tbody>{query.data?.items.map((order) => <tr key={order.id} className="border-t"><td className="p-4 font-medium">{order.orderNumber}</td><td className="p-4">{order.customer?.name ?? "Customer"}</td><td className="p-4">{formatDate(order.startDate)} – {formatDate(order.endDate)}</td><td className="p-4">{formatCurrency(order.totalAmount)}</td><td className="p-4"><StatusBadge status={order.status} /></td></tr>)}</tbody></table></div>;
}
