import { AdminRentalTable } from "@/components/admin/rental-table";
import { PageHeader } from "@/components/shared/page-header";
export default function AdminRentalsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Platform rentals"
        description="Inspect rental activity across customers and providers."
      />
      <AdminRentalTable />
    </div>
  );
}
