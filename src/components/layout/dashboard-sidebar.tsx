"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  CircleDollarSign,
  ClipboardList,
  FolderTree,
  Gauge,
  PackageSearch,
  Star,
  Users,
} from "lucide-react";
import type { UserRole } from "@/types";

const links = {
  CUSTOMER: [
    [Gauge, "Overview", "/dashboard/customer"],
    [ClipboardList, "My rentals", "/dashboard/customer/orders"],
    [CircleDollarSign, "Payments", "/dashboard/customer/payments"],
  ],
  PROVIDER: [
    [Gauge, "Overview", "/dashboard/provider"],
    [Boxes, "Inventory", "/dashboard/provider/gear"],
    [ClipboardList, "Orders", "/dashboard/provider/orders"],
  ],
  ADMIN: [
    [Gauge, "Overview", "/dashboard/admin"],
    [Users, "Users", "/dashboard/admin/users"],
    [FolderTree, "Categories", "/dashboard/admin/categories"],
    [PackageSearch, "Gear", "/dashboard/admin/gear"],
    [ClipboardList, "Rentals", "/dashboard/admin/rentals"],
    [CircleDollarSign, "Payments", "/dashboard/admin/payments"],
    [Star, "Reviews", "/dashboard/admin/reviews"],
  ],
} satisfies Record<UserRole, [React.ElementType, string, string][]>;

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  return (
    <aside className="border-b bg-card lg:min-h-[calc(100vh-4rem)] lg:w-64 lg:border-b-0 lg:border-r">
      <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:p-5">
        {links[role].map(([Icon, label, href]) => {
          const active = pathname === href || (href.split("/").length > 3 && pathname.startsWith(`${href}/`));
          return <Link key={href} href={href} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><Icon className="size-4" />{label}</Link>;
        })}
      </nav>
    </aside>
  );
}
