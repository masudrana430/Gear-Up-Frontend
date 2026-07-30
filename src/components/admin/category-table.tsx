"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query/query-keys";
import { categorySchema } from "@/lib/validations/category.schema";
import { getErrorMessage } from "@/lib/api/error-parser";
import { SimpleStatusBadge } from "@/components/shared/status-badge";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Values = z.infer<typeof categorySchema>;

export function CategoryTable() {
  const client = useQueryClient();
  const query = useQuery({ queryKey: queryKeys.admin("categories"), queryFn: adminService.categories });
  const form = useForm<Values>({ resolver: zodResolver(categorySchema), defaultValues: { name: "", description: "" } });
  const refresh = () => client.invalidateQueries({ queryKey: queryKeys.admin("categories") });
  const create = useMutation({ mutationFn: adminService.createCategory, onSuccess: () => { toast.success("Category created"); form.reset(); refresh(); }, onError: (error) => toast.error(getErrorMessage(error)) });
  const remove = useMutation({ mutationFn: adminService.removeCategory, onSuccess: () => { toast.success("Category deactivated"); refresh(); }, onError: (error) => toast.error(getErrorMessage(error)) });
  if (query.isLoading) return <LoadingSpinner label="Loading categories…" />;
  if (query.isError) return <ErrorMessage message={getErrorMessage(query.error)} />;
  return <div className="grid gap-6 xl:grid-cols-[360px_1fr]"><form onSubmit={form.handleSubmit((values) => create.mutate(values))} className="h-fit space-y-4 rounded-2xl border bg-card p-5"><h2 className="font-semibold">Create category</h2><div><Input placeholder="Category name" {...form.register("name")} />{form.formState.errors.name && <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>}</div><div><Input placeholder="Description (optional)" {...form.register("description")} />{form.formState.errors.description && <p className="mt-1 text-xs text-destructive">{form.formState.errors.description.message}</p>}</div><Button type="submit" disabled={create.isPending}>{create.isPending ? "Creating…" : "Add category"}</Button></form><div className="overflow-x-auto rounded-2xl border bg-card"><table className="w-full text-sm"><thead className="bg-muted/60 text-left"><tr><th className="p-4">Category</th><th className="p-4">Listings</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr></thead><tbody>{query.data?.map((category) => <tr key={category.id} className="border-t"><td className="p-4"><p className="font-medium">{category.name}</p><p className="text-xs text-muted-foreground">{category.description}</p></td><td className="p-4">{category._count?.gearItems ?? 0}</td><td className="p-4"><SimpleStatusBadge status={category.isActive ? "ACTIVE" : "INACTIVE"} /></td><td className="p-4 text-right">{category.isActive && <Button type="button" size="sm" variant="ghost" disabled={remove.isPending} onClick={() => remove.mutate(category.id)}>Deactivate</Button>}</td></tr>)}</tbody></table></div></div>;
}
