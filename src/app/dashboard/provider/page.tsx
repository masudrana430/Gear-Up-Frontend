"use client";

import { useQuery } from "@tanstack/react-query";
import { ProviderStats } from "@/components/provider/provider-stats";
import { ProviderOrderTable } from "@/components/provider/provider-order-table";
import { PageHeader } from "@/components/shared/page-header";
import { providerService } from "@/services/provider.service";
import { queryKeys } from "@/lib/query/query-keys";

export default function ProviderDashboardPage() {
  const gearQuery = useQuery({
    queryKey: queryKeys.providerGear,
    queryFn: providerService.gear,
  });

  const ordersQuery = useQuery({
    queryKey: [...queryKeys.providerOrders, { page: 1, limit: 100 }],
    queryFn: () => providerService.orders(1, 100),
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Provider overview"
        description="Manage inventory and fulfill customer rentals."
      />

      <ProviderStats
        gear={gearQuery.data ?? []}
        orders={ordersQuery.data?.items ?? []}
        isLoading={gearQuery.isPending || ordersQuery.isPending}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
            Recent incoming orders
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review and manage the latest rental requests.
          </p>
        </div>

        <ProviderOrderTable limit={5} />
      </section>
    </div>
  );
}