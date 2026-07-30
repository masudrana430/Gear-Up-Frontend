"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import { rentalService } from "@/services/rental.service";
import { paymentService } from "@/services/payment.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatCurrency } from "@/lib/utils/format-currency";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

export function PaymentInitiation({ rentalId }: { rentalId: string }) {
  const order = useQuery({ queryKey: queryKeys.rental(rentalId), queryFn: () => rentalService.detail(rentalId) });
  const initiate = useMutation({
    mutationFn: () => paymentService.initiate(rentalId),
    onSuccess: (session) => window.location.assign(session.gatewayUrl),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  if (order.isLoading) return <LoadingSpinner label="Preparing checkout…" />;
  if (order.isError || !order.data) return <ErrorMessage message={getErrorMessage(order.error)} />;
  if (order.data.status !== "CONFIRMED") return <ErrorMessage message="Payment is available only after the provider confirms this rental." />;
  return <div className="max-w-lg rounded-2xl border bg-card p-6"><LockKeyhole className="size-9 text-primary" /><h2 className="mt-5 text-2xl font-bold">Secure SSLCommerz checkout</h2><p className="mt-2 text-muted-foreground">You will be redirected to the payment gateway to complete this transaction.</p><div className="my-6 flex justify-between border-y py-4"><span>Total due</span><span className="text-xl font-bold">{formatCurrency(order.data.totalAmount)}</span></div><Button className="w-full" size="lg" disabled={initiate.isPending} onClick={() => initiate.mutate()}>{initiate.isPending ? "Opening gateway…" : "Continue to payment"}</Button></div>;
}
