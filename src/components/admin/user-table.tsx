"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatDate } from "@/lib/utils/format-date";
import { SimpleStatusBadge } from "@/components/shared/status-badge";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

export function UserTable() {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: [...queryKeys.admin("users"), { limit: 50 }],
    queryFn: () => adminService.users(1, 50),
  });
  const update = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "ACTIVE" | "SUSPENDED";
    }) => adminService.setUserStatus(id, status),
    onSuccess: () => {
      toast.success("User status updated");
      client.invalidateQueries({ queryKey: queryKeys.admin("users") });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  if (query.isLoading) return <LoadingSpinner label="Loading users…" />;
  if (query.isError)
    return <ErrorMessage message={getErrorMessage(query.error)} />;
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="p-4">User</th>
            <th className="p-4">Role</th>
            <th className="p-4">Joined</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {query.data?.items.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-4">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">{formatDate(user.createdAt)}</td>
              <td className="p-4">
                <SimpleStatusBadge status={user.status} />
              </td>
              <td className="p-4 text-right">
                {user.role !== "ADMIN" && (
                  <Button
                    size="sm"
                    variant={user.status === "ACTIVE" ? "outline" : "default"}
                    disabled={update.isPending}
                    onClick={() =>
                      update.mutate({
                        id: user.id,
                        status:
                          user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
                      })
                    }
                  >
                    {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
