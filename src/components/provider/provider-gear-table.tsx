"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { providerService } from "@/services/provider.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { SimpleStatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

export function ProviderGearTable({ limit = 20 }: { limit?: number }) {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.providerGear,
    queryFn: providerService.gear,
  });
  const remove = useMutation({
    mutationFn: providerService.removeGear,
    onSuccess: () => {
      toast.success("Gear deactivated");
      client.invalidateQueries({ queryKey: queryKeys.providerGear });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  if (query.isLoading) return <LoadingSpinner label="Loading inventory…" />;
  if (query.isError)
    return <ErrorMessage message={getErrorMessage(query.error)} />;
  if (!query.data?.length)
    return (
      <EmptyState
        title="No gear listed"
        description="Add your first item to start receiving rental orders."
        action={
          <Link
            href="/dashboard/provider/gear/new"
            className="text-sm font-medium text-primary"
          >
            Add gear
          </Link>
        }
      />
    );
  const visibleGear = query.data.slice(0, limit);
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="p-4">Gear</th>
            <th className="p-4">Price/day</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleGear.map((gear) => (
            <tr key={gear.id} className="border-t">
              <td className="p-4">
                <p className="font-medium">{gear.name}</p>
                <p className="text-xs text-muted-foreground">{gear.brand}</p>
              </td>
              <td className="p-4">{formatCurrency(gear.pricePerDay)}</td>
              <td className="p-4">{gear.stockQuantity}</td>
              <td className="p-4">
                <SimpleStatusBadge
                  status={gear.isActive ? "ACTIVE" : "INACTIVE"}
                />
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/dashboard/provider/gear/${gear.id}/edit`}
                    className="rounded-md border px-3 py-1.5 font-medium"
                  >
                    Edit
                  </Link>
                  {gear.isActive && (
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={remove.isPending}
                      onClick={() => remove.mutate(gear.id)}
                    >
                      Deactivate
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
