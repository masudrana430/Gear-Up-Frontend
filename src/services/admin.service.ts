import { apiRequest, queryString } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type {
  Category,
  CategoryInput,
  GearItem,
  PaginatedData,
  Payment,
  RentalOrder,
  User,
  UserStatus,
} from "@/types";

const paged = (path: string, page = 1, limit = 10, search?: string) =>
  `${path}${queryString({ page, limit, search })}`;

export const adminService = {
  categories: () => apiRequest<Category[]>(endpoints.admin.categories),
  createCategory: (input: CategoryInput) =>
    apiRequest<Category>(endpoints.admin.categories, {
      method: "POST",
      body: input,
    }),
  updateCategory: (
    id: string,
    input: Partial<CategoryInput & { isActive: boolean }>,
  ) =>
    apiRequest<Category>(`${endpoints.admin.categories}/${id}`, {
      method: "PATCH",
      body: input,
    }),
  removeCategory: (id: string) =>
    apiRequest<Category>(`${endpoints.admin.categories}/${id}`, {
      method: "DELETE",
    }),
  users: (page = 1, limit = 10, search?: string) =>
    apiRequest<PaginatedData<User>>(
      paged(endpoints.admin.users, page, limit, search),
    ),
  setUserStatus: (id: string, status: UserStatus) =>
    apiRequest<User>(`${endpoints.admin.users}/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
  gear: (page = 1, limit = 10, search?: string) =>
    apiRequest<PaginatedData<GearItem>>(
      paged(endpoints.admin.gear, page, limit, search),
    ),
  setGearStatus: (id: string, isActive: boolean) =>
    apiRequest<GearItem>(`${endpoints.admin.gear}/${id}/status`, {
      method: "PATCH",
      body: { isActive },
    }),
  rentals: (page = 1, limit = 10) =>
    apiRequest<PaginatedData<RentalOrder>>(
      paged(endpoints.admin.rentals, page, limit),
    ),
  payments: (page = 1, limit = 10) =>
    apiRequest<PaginatedData<Payment>>(
      paged(endpoints.admin.payments, page, limit),
    ),
};
