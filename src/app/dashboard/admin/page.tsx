"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminRentalTable } from "@/components/admin/rental-table";
import { PageHeader } from "@/components/shared/page-header";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query/query-keys";

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
  const revenue =
    payments.data?.items
      .filter((payment) => payment.status === "COMPLETED")
      .reduce((sum, payment) => sum + Number(payment.amount), 0) ?? 0;
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin overview"
        description="Monitor platform health and moderate GearUp activity."
      />
      <AdminStats
        users={users.data?.meta.total ?? 0}
        gear={gear.data?.meta.total ?? 0}
        rentals={rentals.data?.meta.total ?? 0}
        revenue={revenue}
      />
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent rentals</h2>
        <AdminRentalTable />
      </section>
    </div>
  );
}
