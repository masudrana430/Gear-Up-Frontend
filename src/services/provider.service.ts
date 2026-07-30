import { apiRequest, queryString } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type {
  GearInput,
  GearItem,
  PaginatedData,
  RentalOrder,
  RentalStatus,
} from "@/types";

export const providerService = {
  gear: () => apiRequest<GearItem[]>(endpoints.provider.gear),
  createGear: (input: GearInput) =>
    apiRequest<GearItem>(endpoints.provider.gear, {
      method: "POST",
      body: input,
    }),
  updateGear: (id: string, input: Partial<GearInput>) =>
    apiRequest<GearItem>(`${endpoints.provider.gear}/${id}`, {
      method: "PATCH",
      body: input,
    }),
  removeGear: (id: string) =>
    apiRequest<GearItem>(`${endpoints.provider.gear}/${id}`, {
      method: "DELETE",
    }),
  orders: (page = 1, limit = 10, status?: RentalStatus) =>
    apiRequest<PaginatedData<RentalOrder>>(
      `${endpoints.provider.orders}${queryString({ page, limit, status })}`,
    ),
  order: (id: string) =>
    apiRequest<RentalOrder>(`${endpoints.provider.orders}/${id}`),
  updateOrderStatus: (id: string, status: RentalStatus) =>
    apiRequest<RentalOrder>(`${endpoints.provider.orders}/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};
