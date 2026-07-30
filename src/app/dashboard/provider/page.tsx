"use client";

import { useQuery } from "@tanstack/react-query";
import { ProviderStats } from "@/components/provider/provider-stats";
import { ProviderOrderTable } from "@/components/provider/provider-order-table";
import { PageHeader } from "@/components/shared/page-header";
import { providerService } from "@/services/provider.service";
import { queryKeys } from "@/lib/query/query-keys";

export default function ProviderDashboardPage() {
  const gear = useQuery({ queryKey: queryKeys.providerGear, queryFn: providerService.gear });
  const orders = useQuery({ queryKey: [...queryKeys.providerOrders, { limit: 100 }], queryFn: () => providerService.orders(1, 100) });
  return <div className="space-y-8"><PageHeader title="Provider overview" description="Manage inventory and fulfill customer rentals." /><ProviderStats gear={gear.data ?? []} orders={orders.data?.items ?? []} /><section><h2 className="mb-4 text-xl font-semibold">Recent incoming orders</h2><ProviderOrderTable limit={5} /></section></div>;
}
