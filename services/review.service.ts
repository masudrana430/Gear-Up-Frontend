import { apiRequest } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { Review, ReviewInput } from "@/types";

export const reviewService = {
  create: (input: ReviewInput) =>
    apiRequest<Review>(endpoints.reviews, { method: "POST", body: input }),
  update: (id: string, input: Pick<ReviewInput, "rating" | "comment">) =>
    apiRequest<Review>(`${endpoints.reviews}/${id}`, {
      method: "PATCH",
      body: input,
    }),
  remove: (id: string) =>
    apiRequest<null>(`${endpoints.reviews}/${id}`, { method: "DELETE" }),
};
