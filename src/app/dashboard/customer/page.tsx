"use client";

import { useQuery } from "@tanstack/react-query";
import { CustomerStats } from "@/components/customer/customer-stats";
import { RentalTable } from "@/components/customer/rental-table";
import { PageHeader } from "@/components/shared/page-header";
import { rentalService } from "@/services/rental.service";
import { paymentService } from "@/services/payment.service";
import { queryKeys } from "@/lib/query/query-keys";

export default function CustomerDashboardPage() {
  const rentalsQuery = useQuery({
    queryKey: [...queryKeys.rentals, { page: 1, limit: 50 }],
    queryFn: () => rentalService.list({ page: 1, limit: 50 }),
  });

  const paymentsQuery = useQuery({
    queryKey: [...queryKeys.payments, { page: 1, limit: 50 }],
    queryFn: () => paymentService.list(1, 50),
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Customer overview"
        description="Track rentals, payments, and upcoming adventures."
      />

      <CustomerStats
        rentals={rentalsQuery.data?.items ?? []}
        payments={paymentsQuery.data?.items ?? []}
        isLoading={
          rentalsQuery.isPending || paymentsQuery.isPending
        }
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
            Recent rentals
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review your latest bookings and rental activity.
          </p>
        </div>

        <RentalTable limit={5} />
      </section>
    </div>
  );
}