"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { reviewSchema } from "@/lib/validations/review.schema";
import { reviewService } from "@/services/review.service";
import { getErrorMessage } from "@/lib/api/error-parser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ReviewValues = z.infer<typeof reviewSchema>;

export function ReviewForm({ rentalOrderId, gearItemId }: { rentalOrderId: string; gearItemId: string }) {
  const router = useRouter();
  const form = useForm<ReviewValues>({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 5, comment: "" } });
  const submit = form.handleSubmit(async (values) => {
    try {
      await reviewService.create({ rentalOrderId, gearItemId, ...values });
      toast.success("Thanks for sharing your review");
      router.replace(`/dashboard/customer/orders/${rentalOrderId}`);
    } catch (error) { toast.error(getErrorMessage(error)); }
  });
  return <form onSubmit={submit} className="max-w-xl space-y-5 rounded-2xl border bg-card p-6">
    <div className="space-y-2"><Label htmlFor="rating">Rating</Label><select id="rating" className="h-10 w-full rounded-md border bg-background px-3" {...form.register("rating")}><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Poor</option></select>{form.formState.errors.rating && <p className="text-sm text-destructive">{form.formState.errors.rating.message}</p>}</div>
    <div className="space-y-2"><Label htmlFor="comment">Comment</Label><Textarea id="comment" rows={5} placeholder="How was the equipment and service?" {...form.register("comment")} />{form.formState.errors.comment && <p className="text-sm text-destructive">{form.formState.errors.comment.message}</p>}</div>
    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Submitting…" : "Submit review"}</Button>
  </form>;
}
