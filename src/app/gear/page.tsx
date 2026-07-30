"use client";

import { useState } from "react";
import type { GearQuery } from "@/types";
import { GearFilters } from "@/components/gear/gear-filters";
import { GearGrid } from "@/components/gear/gear-grid";

export default function GearPage() {
  const [filters, setFilters] = useState<GearQuery>({ page: 1, limit: 12 });
  return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">
    <div className="mb-9"><p className="text-sm font-semibold text-primary">EQUIPMENT FOR EVERY ADVENTURE</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Browse rental gear</h1><p className="mt-3 max-w-2xl text-muted-foreground">Search trusted local inventory and reserve exactly what you need.</p></div>
    <div className="grid gap-7 lg:grid-cols-[260px_1fr]"><GearFilters value={filters} onChange={setFilters} /><GearGrid filters={filters} /></div>
  </main>;
}
