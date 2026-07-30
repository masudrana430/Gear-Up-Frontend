"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { SimpleStatusBadge } from "@/components/shared/status-badge";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

export function GearModerationTable() {
  const client = useQueryClient();
  const query = useQuery({ queryKey: [...queryKeys.admin("gear"), { limit: 50 }], queryFn: () => adminService.gear(1, 50) });
  const update = useMutation({ mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => adminService.setGearStatus(id, isActive), onSuccess: () => { toast.success("Gear status updated"); client.invalidateQueries({ queryKey: queryKeys.admin("gear") }); }, onError: (error) => toast.error(getErrorMessage(error)) });
  if (query.isLoading) return <LoadingSpinner label="Loading gear listings…" />;
  if (query.isError) return <ErrorMessage message={getErrorMessage(query.error)} />;
  return <div className="overflow-x-auto rounded-2xl border bg-card"><table className="w-full text-sm"><thead className="bg-muted/60 text-left"><tr><th className="p-4">Gear</th><th className="p-4">Provider</th><th className="p-4">Price</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr></thead><tbody>{query.data?.items.map((gear) => <tr key={gear.id} className="border-t"><td className="p-4"><p className="font-medium">{gear.name}</p><p className="text-xs text-muted-foreground">{gear.brand}</p></td><td className="p-4">{gear.provider?.name ?? gear.providerId}</td><td className="p-4">{formatCurrency(gear.pricePerDay)}</td><td className="p-4"><SimpleStatusBadge status={gear.isActive ? "ACTIVE" : "INACTIVE"} /></td><td className="p-4 text-right"><Button size="sm" variant={gear.isActive ? "outline" : "default"} disabled={update.isPending} onClick={() => update.mutate({ id: gear.id, isActive: !gear.isActive })}>{gear.isActive ? "Disable" : "Enable"}</Button></td></tr>)}</tbody></table></div>;
}
