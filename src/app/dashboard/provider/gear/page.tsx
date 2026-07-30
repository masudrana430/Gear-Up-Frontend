import Link from "next/link";
import { Plus } from "lucide-react";
import { ProviderGearTable } from "@/components/provider/provider-gear-table";
import { PageHeader } from "@/components/shared/page-header";

export default function ProviderGearPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Inventory"
        description="Create, update, and deactivate your gear listings."
        action={
          <Link
            href="/dashboard/provider/gear/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="size-4" /> Add gear
          </Link>
        }
      />
      <ProviderGearTable />
    </div>
  );
}
