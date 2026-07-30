"use client";

import { useQuery } from "@tanstack/react-query";
import type { GearQuery } from "@/types";
import { gearService } from "@/services/gear.service";
import { queryKeys } from "@/lib/query/query-keys";
import { GearCard } from "./gear-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { getErrorMessage } from "@/lib/api/error-parser";
import { Skeleton } from "@/components/ui/skeleton";

export function GearGrid({ filters = {} }: { filters?: GearQuery }) {
  const query = useQuery({
    queryKey: queryKeys.gear(filters),
    queryFn: () => gearService.list(filters),
  });
  if (query.isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[4/5] rounded-2xl" />
        ))}
      </div>
    );
  }
  if (query.isError)
    return <ErrorMessage message={getErrorMessage(query.error)} />;
  if (!query.data?.items.length)
    return (
      <EmptyState
        title="No gear found"
        description="Try changing your search or filters."
      />
    );
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {query.data.items.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
