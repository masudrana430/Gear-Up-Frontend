import { apiRequest, queryString } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type {
  CreateRentalInput,
  PaginatedData,
  RentalOrder,
  RentalQuery,
} from "@/types";

export const rentalService = {
  create: (input: CreateRentalInput) =>
    apiRequest<RentalOrder>(endpoints.rentals, { method: "POST", body: input }),
  list: (filters: RentalQuery = {}) =>
    apiRequest<PaginatedData<RentalOrder>>(
      `${endpoints.rentals}${queryString(filters)}`,
    ),
  detail: (id: string) => apiRequest<RentalOrder>(`${endpoints.rentals}/${id}`),
  cancel: (id: string) =>
    apiRequest<RentalOrder>(`${endpoints.rentals}/${id}/cancel`, {
      method: "PATCH",
    }),
};
