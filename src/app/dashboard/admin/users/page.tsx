import { UserTable } from "@/components/admin/user-table";
import { PageHeader } from "@/components/shared/page-header";
export default function AdminUsersPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="User management"
        description="Review roles and suspend or activate accounts."
      />
      <UserTable />
    </div>
  );
}
