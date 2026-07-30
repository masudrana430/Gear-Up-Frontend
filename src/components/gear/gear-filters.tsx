"use client";

import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import type { GearQuery } from "@/types";
import { categoryService } from "@/services/category.service";
import { queryKeys } from "@/lib/query/query-keys";
import { Input } from "@/components/ui/input";

export function GearFilters({ value, onChange }: { value: GearQuery; onChange: (value: GearQuery) => void }) {
  const categories = useQuery({ queryKey: queryKeys.categories, queryFn: categoryService.list });
  const update = (key: keyof GearQuery, next: string) => onChange({ ...value, page: 1, [key]: next || undefined });
  return (
    <aside className="space-y-5 rounded-2xl border bg-card p-5">
      <div className="flex items-center gap-2 font-semibold"><SlidersHorizontal className="size-4" /> Filter gear</div>
      <label className="relative block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search name or brand" value={value.search ?? ""} onChange={(event) => update("search", event.target.value)} />
      </label>
      <select aria-label="Category" className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={value.category ?? ""} onChange={(event) => update("category", event.target.value)}>
        <option value="">All categories</option>
        {categories.data?.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
      </select>
      <div className="grid grid-cols-2 gap-3">
        <Input type="number" min="0" placeholder="Min BDT" value={value.minPrice ?? ""} onChange={(event) => update("minPrice", event.target.value)} />
        <Input type="number" min="0" placeholder="Max BDT" value={value.maxPrice ?? ""} onChange={(event) => update("maxPrice", event.target.value)} />
      </div>
      <Input placeholder="Brand" value={value.brand ?? ""} onChange={(event) => update("brand", event.target.value)} />
    </aside>
  );
}
