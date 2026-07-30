import { apiRequest, queryString } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { GearItem, GearQuery, PaginatedData, Review } from "@/types";

export const gearService = {
  list: (filters: GearQuery = {}) =>
    apiRequest<PaginatedData<GearItem>>(
      `${endpoints.gear}${queryString(filters)}`,
    ),
  detail: (id: string) => apiRequest<GearItem>(`${endpoints.gear}/${id}`),
  reviews: (id: string) =>
    apiRequest<PaginatedData<Review> | Review[]>(
      `${endpoints.reviews}/gear/${id}`,
    ),
};
