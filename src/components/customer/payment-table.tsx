"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatDate } from "@/lib/utils/format-date";
import { SimpleStatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export function PaymentTable({ limit = 20 }: { limit?: number }) {
  const query = useQuery({
    queryKey: [...queryKeys.payments, { limit }],
    queryFn: () => paymentService.list(1, limit),
  });
  if (query.isLoading) return <LoadingSpinner label="Loading payments…" />;
  if (query.isError)
    return <ErrorMessage message={getErrorMessage(query.error)} />;
  if (!query.data?.items.length)
    return (
      <EmptyState
        title="No payments yet"
        description="Completed and pending transactions will appear here."
      />
    );
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="p-4">Transaction</th>
            <th className="p-4">Date</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Gateway</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {query.data.items.map((payment) => (
            <tr key={payment.id} className="border-t">
              <td className="p-4 font-mono text-xs">{payment.transactionId}</td>
              <td className="p-4">
                {formatDate(payment.paidAt ?? payment.createdAt ?? new Date())}
              </td>
              <td className="p-4 font-medium">
                {formatCurrency(payment.amount, payment.currency)}
              </td>
              <td className="p-4">{payment.provider}</td>
              <td className="p-4">
                <SimpleStatusBadge status={payment.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
