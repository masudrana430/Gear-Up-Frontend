"use client";

import { useQuery } from "@tanstack/react-query";
import { CustomerStats } from "@/components/customer/customer-stats";
import { RentalTable } from "@/components/customer/rental-table";
import { PageHeader } from "@/components/shared/page-header";
import { rentalService } from "@/services/rental.service";
import { paymentService } from "@/services/payment.service";
import { queryKeys } from "@/lib/query/query-keys";

export default function CustomerDashboardPage() {
  const rentals = useQuery({ queryKey: [...queryKeys.rentals, { limit: 50 }], queryFn: () => rentalService.list({ page: 1, limit: 50 }) });
  const payments = useQuery({ queryKey: [...queryKeys.payments, { limit: 50 }], queryFn: () => paymentService.list(1, 50) });
  return <div className="space-y-8"><PageHeader title="Customer overview" description="Track rentals, payments, and upcoming adventures." /><CustomerStats rentals={rentals.data?.items ?? []} payments={payments.data?.items ?? []} /><section><h2 className="mb-4 text-xl font-semibold">Recent rentals</h2><RentalTable limit={5} /></section></div>;
}
