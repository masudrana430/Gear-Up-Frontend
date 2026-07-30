"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { GearItem } from "@/types";
import { rentalSchema } from "@/lib/validations/rental.schema";
import { rentalService } from "@/services/rental.service";
import { getErrorMessage } from "@/lib/api/error-parser";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/lib/utils/format-currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RentalValues = z.infer<typeof rentalSchema>;

export function RentalForm({ gear }: { gear: GearItem }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [tomorrow] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  });
  const form = useForm<RentalValues>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      startDate: tomorrow,
      endDate: tomorrow,
      quantity: 1,
      notes: "",
    },
  });
  const submit = form.handleSubmit(async (values) => {
    if (!user) {
      toast.info("Sign in as a customer to rent this item");
      router.push("/auth/login");
      return;
    }
    if (user.role !== "CUSTOMER") {
      toast.error("Only customer accounts can place rentals");
      return;
    }
    try {
      const order = await rentalService.create({
        startDate: values.startDate,
        endDate: values.endDate,
        notes: values.notes,
        items: [{ gearItemId: gear.id, quantity: values.quantity }],
      });
      toast.success(`Rental ${order.orderNumber} placed`);
      router.push(`/dashboard/customer/orders/${order.id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });
  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm"
      noValidate
    >
      <div>
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="text-2xl font-bold">
          {formatCurrency(gear.pricePerDay)}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            / day
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Start date"
          error={form.formState.errors.startDate?.message}
        >
          <Input type="date" min={tomorrow} {...form.register("startDate")} />
        </Field>
        <Field label="End date" error={form.formState.errors.endDate?.message}>
          <Input type="date" min={tomorrow} {...form.register("endDate")} />
        </Field>
      </div>
      <Field label="Quantity" error={form.formState.errors.quantity?.message}>
        <Input
          type="number"
          min={1}
          max={gear.stockQuantity}
          {...form.register("quantity")}
        />
      </Field>
      <Field
        label="Notes (optional)"
        error={form.formState.errors.notes?.message}
      >
        <Textarea
          placeholder="Pickup details or special requests"
          {...form.register("notes")}
        />
      </Field>
      <Button
        className="w-full"
        type="submit"
        disabled={!gear.stockQuantity || form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Placing rental…" : "Rent now"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Payment becomes available after provider confirmation.
      </p>
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
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
