"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Review } from "@/types";
import { adminService } from "@/services/admin.service";
import { gearService } from "@/services/gear.service";
import { reviewService } from "@/services/review.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { formatDate } from "@/lib/utils/format-date";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

type ModerationReview = Review & {
  gearName: string;
};

async function getAllReviews(): Promise<ModerationReview[]> {
  const gearPage = await adminService.gear(1, 100);
  const results = await Promise.allSettled(
    gearPage.items.map(async (gear) => {
      const reviewData = await gearService.reviews(gear.id);
      const reviews = Array.isArray(reviewData) ? reviewData : reviewData.items;
      return reviews.map((review) => ({ ...review, gearName: gear.name }));
    }),
  );

  return results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : [],
  );
}

export function AdminReviewTable() {
  const client = useQueryClient();
  const queryKey = queryKeys.admin("reviews");
  const query = useQuery({ queryKey, queryFn: getAllReviews });
  const remove = useMutation({
    mutationFn: reviewService.remove,
    onSuccess: () => {
      toast.success("Review removed");
      client.invalidateQueries({ queryKey });
      client.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (query.isLoading) return <LoadingSpinner label="Loading reviews…" />;
  if (query.isError) return <ErrorMessage message={getErrorMessage(query.error)} />;
  if (!query.data?.length) {
    return <EmptyState title="No reviews found" description="Customer reviews will appear here after returned rentals are reviewed." />;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="p-4">Customer</th>
            <th className="p-4">Gear</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Comment</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {query.data.map((review) => (
            <tr key={review.id} className="border-t">
              <td className="p-4 font-medium">{review.customer?.name ?? "Customer"}</td>
              <td className="p-4">{review.gearName}</td>
              <td className="p-4" aria-label={`${review.rating} out of 5 stars`}>
                <span className="text-amber-500">{"★".repeat(review.rating)}</span>
                <span className="text-muted-foreground">{"★".repeat(5 - review.rating)}</span>
              </td>
              <td className="max-w-sm p-4 text-muted-foreground">{review.comment || "No comment"}</td>
              <td className="whitespace-nowrap p-4">{formatDate(review.createdAt)}</td>
              <td className="p-4 text-right">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={remove.isPending}
                  onClick={() => remove.mutate(review.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
