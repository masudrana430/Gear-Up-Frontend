"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { gearSchema } from "@/lib/validations/gear.schema";
import { providerService } from "@/services/provider.service";
import { categoryService } from "@/services/category.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

type GearValues = z.infer<typeof gearSchema>;

export function GearForm({ gearId }: { gearId?: string }) {
  const router = useRouter();
  const client = useQueryClient();
  const categories = useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoryService.list,
  });
  const inventory = useQuery({
    queryKey: queryKeys.providerGear,
    queryFn: providerService.gear,
    enabled: Boolean(gearId),
  });
  const gear = inventory.data?.find((item) => item.id === gearId);
  const form = useForm<GearValues>({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      pricePerDay: 1,
      stockQuantity: 1,
      categoryId: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (gear)
      form.reset({
        name: gear.name,
        description: gear.description,
        brand: gear.brand,
        pricePerDay: Number(gear.pricePerDay),
        stockQuantity: gear.stockQuantity,
        categoryId: gear.categoryId,
        imageUrl: gear.images?.[0] ?? "",
      });
  }, [form, gear]);

  const mutation = useMutation({
    mutationFn: (values: GearValues) => {
      const input = {
        name: values.name,
        description: values.description,
        brand: values.brand,
        pricePerDay: values.pricePerDay,
        stockQuantity: values.stockQuantity,
        categoryId: values.categoryId,
        images: values.imageUrl ? [values.imageUrl] : [],
      };
      return gearId
        ? providerService.updateGear(gearId, input)
        : providerService.createGear(input);
    },
    onSuccess: () => {
      toast.success(gearId ? "Gear updated" : "Gear added to inventory");
      client.invalidateQueries({ queryKey: queryKeys.providerGear });
      router.push("/dashboard/provider/gear");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (gearId && inventory.isLoading)
    return <LoadingSpinner label="Loading gear…" />;
  return (
    <form
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      className="max-w-2xl space-y-5 rounded-2xl border bg-card p-6"
      noValidate
    >
      <Field label="Gear name" error={form.formState.errors.name?.message}>
        <Input
          {...form.register("name")}
          placeholder="Coleman Sundome Camping Tent"
        />
      </Field>
      <Field
        label="Description"
        error={form.formState.errors.description?.message}
      >
        <Textarea
          rows={5}
          {...form.register("description")}
          placeholder="Condition, capacity, and ideal use…"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Brand" error={form.formState.errors.brand?.message}>
          <Input {...form.register("brand")} />
        </Field>
        <Field
          label="Category"
          error={form.formState.errors.categoryId?.message}
        >
          <select
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            {...form.register("categoryId")}
          >
            <option value="">Select category</option>
            {categories.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Price per day (BDT)"
          error={form.formState.errors.pricePerDay?.message}
        >
          <Input type="number" min="1" {...form.register("pricePerDay")} />
        </Field>
        <Field
          label="Stock quantity"
          error={form.formState.errors.stockQuantity?.message}
        >
          <Input type="number" min="1" {...form.register("stockQuantity")} />
        </Field>
      </div>
      <Field
        label="Image URL (optional)"
        error={form.formState.errors.imageUrl?.message}
      >
        <Input
          type="url"
          {...form.register("imageUrl")}
          placeholder="https://…"
        />
      </Field>
      <div className="flex gap-3">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? "Saving…"
            : gearId
              ? "Save changes"
              : "Add gear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
