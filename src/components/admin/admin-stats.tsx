import {
  CircleDollarSign,
  ClipboardList,
  PackageSearch,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/format-currency";

export function AdminStats({
  users,
  gear,
  rentals,
  revenue,
}: {
  users: number;
  gear: number;
  rentals: number;
  revenue: number;
}) {
  const stats = [
    [Users, "Users", users],
    [PackageSearch, "Gear listings", gear],
    [ClipboardList, "Rentals", rentals],
    [CircleDollarSign, "Completed revenue", formatCurrency(revenue)],
  ] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([Icon, label, value]) => (
        <div key={label} className="rounded-2xl border bg-card p-5">
          <Icon className="size-5 text-primary" />
          <p className="mt-4 text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}
