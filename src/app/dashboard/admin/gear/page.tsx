import { GearModerationTable } from "@/components/admin/gear-moderation-table";
import { PageHeader } from "@/components/shared/page-header";
export default function AdminGearPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Gear moderation"
        description="Enable or disable listings across all providers."
      />
      <GearModerationTable />
    </div>
  );
}
