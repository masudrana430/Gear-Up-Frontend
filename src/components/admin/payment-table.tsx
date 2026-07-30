"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatDate } from "@/lib/utils/format-date";
import { SimpleStatusBadge } from "@/components/shared/status-badge";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export function AdminPaymentTable() {
  const query = useQuery({ queryKey: [...queryKeys.admin("payments"), { limit: 50 }], queryFn: () => adminService.payments(1, 50) });
  if (query.isLoading) return <LoadingSpinner label="Loading platform payments…" />;
  if (query.isError) return <ErrorMessage message={getErrorMessage(query.error)} />;
  return <div className="overflow-x-auto rounded-2xl border bg-card"><table className="w-full text-sm"><thead className="bg-muted/60 text-left"><tr><th className="p-4">Transaction</th><th className="p-4">Date</th><th className="p-4">Amount</th><th className="p-4">Provider</th><th className="p-4">Status</th></tr></thead><tbody>{query.data?.items.map((payment) => <tr key={payment.id} className="border-t"><td className="p-4 font-mono text-xs">{payment.transactionId}</td><td className="p-4">{formatDate(payment.paidAt ?? payment.createdAt ?? new Date())}</td><td className="p-4">{formatCurrency(payment.amount, payment.currency)}</td><td className="p-4">{payment.provider}</td><td className="p-4"><SimpleStatusBadge status={payment.status} /></td></tr>)}</tbody></table></div>;
}
