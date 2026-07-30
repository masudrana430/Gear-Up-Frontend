import { Boxes, ClipboardCheck, Clock3 } from "lucide-react";
import type { GearItem, RentalOrder } from "@/types";

export function ProviderStats({
  gear,
  orders,
}: {
  gear: GearItem[];
  orders: RentalOrder[];
}) {
  const stats = [
    [Boxes, "Active gear", gear.filter((item) => item.isActive).length],
    [
      Clock3,
      "Pending orders",
      orders.filter((order) => order.status === "PLACED").length,
    ],
    [
      ClipboardCheck,
      "Active rentals",
      orders.filter((order) =>
        ["CONFIRMED", "PAID", "PICKED_UP"].includes(order.status),
      ).length,
    ],
  ] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-3">
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
