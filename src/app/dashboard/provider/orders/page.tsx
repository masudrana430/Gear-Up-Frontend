import { ProviderOrderTable } from "@/components/provider/provider-order-table";
import { PageHeader } from "@/components/shared/page-header";
export default function ProviderOrdersPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Incoming orders"
        description="Confirm requests and update pickup and return progress."
      />
      <ProviderOrderTable />
    </div>
  );
}
