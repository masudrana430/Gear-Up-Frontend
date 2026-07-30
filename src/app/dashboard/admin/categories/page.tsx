import { CategoryTable } from "@/components/admin/category-table";
import { PageHeader } from "@/components/shared/page-header";
export default function AdminCategoriesPage() { return <div className="space-y-7"><PageHeader title="Categories" description="Organize the public gear catalogue." /><CategoryTable /></div>; }
