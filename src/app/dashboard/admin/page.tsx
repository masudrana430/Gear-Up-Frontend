"use client";

import { useQuery } from "@tanstack/react-query";
// import { AdminDashboardOverview } from "@/components/admin/admin-dashboard-overview";
import { AdminRentalTable } from "@/components/admin/rental-table";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query/query-keys";
import { AdminDashboardOverview } from "@/components/admin/admin-dashboard-overview";

export default function AdminDashboardPage() {
  const users = useQuery({
    queryKey: [...queryKeys.admin("users"), { limit: 1 }],
    queryFn: () => adminService.users(1, 1),
  });

  const gear = useQuery({
    queryKey: [...queryKeys.admin("gear"), { limit: 1 }],
    queryFn: () => adminService.gear(1, 1),
  });

  const rentals = useQuery({
    queryKey: [...queryKeys.admin("rentals"), { limit: 10 }],
    queryFn: () => adminService.rentals(1, 10),
  });

  const payments = useQuery({
    queryKey: [...queryKeys.admin("payments"), { limit: 100 }],
    queryFn: () => adminService.payments(1, 100),
  });

  const paymentItems = payments.data?.items ?? [];
  const rentalItems = rentals.data?.items ?? [];

  const revenue = paymentItems
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);

  const paymentStatus = paymentItems.reduce(
    (summary, payment) => {
      if (payment.status === "COMPLETED") summary.completed += 1;
      if (payment.status === "PENDING") summary.pending += 1;
      if (payment.status === "FAILED") summary.failed += 1;
      if (payment.status === "CANCELLED") summary.cancelled += 1;

      return summary;
    },
    {
      completed: 0,
      pending: 0,
      failed: 0,
      cancelled: 0,
    },
  );

  const rentalStatus = rentalItems.reduce(
    (summary, rental) => {
      if (rental.status === "PLACED") summary.placed += 1;
      if (rental.status === "CONFIRMED") summary.confirmed += 1;
      if (rental.status === "PAID") summary.paid += 1;
      if (rental.status === "PICKED_UP") summary.pickedUp += 1;
      if (rental.status === "RETURNED") summary.returned += 1;
      if (rental.status === "CANCELLED") summary.cancelled += 1;

      return summary;
    },
    {
      placed: 0,
      confirmed: 0,
      paid: 0,
      pickedUp: 0,
      returned: 0,
      cancelled: 0,
    },
  );

  const isLoading =
    users.isLoading ||
    gear.isLoading ||
    rentals.isLoading ||
    payments.isLoading;

  const isRefreshing =
    users.isFetching ||
    gear.isFetching ||
    rentals.isFetching ||
    payments.isFetching;

  const refreshDashboard = () => {
    void Promise.all([
      users.refetch(),
      gear.refetch(),
      rentals.refetch(),
      payments.refetch(),
    ]);
  };

  return (
    <div className="space-y-8">
      <AdminDashboardOverview
        users={users.data?.meta.total ?? 0}
        gear={gear.data?.meta.total ?? 0}
        rentals={rentals.data?.meta.total ?? 0}
        revenue={revenue}
        rentalStatus={rentalStatus}
        paymentStatus={paymentStatus}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={refreshDashboard}
      />

      <section className="overflow-hidden rounded-[24px] border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-primary">
              LATEST ORDERS
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">
              Recent rentals
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            Review the newest rental requests and their current status.
          </p>
        </div>

        <AdminRentalTable />
      </section>
    </div>
  );
}