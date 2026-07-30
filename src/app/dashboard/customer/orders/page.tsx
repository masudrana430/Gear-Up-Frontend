import { RentalTable } from "@/components/customer/rental-table";
import { PageHeader } from "@/components/shared/page-header";

export default function CustomerOrdersPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="My rentals"
        description="Follow every order from placement through return."
      />
      <RentalTable />
    </div>
  );
}
