import { apiRequest } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { Category } from "@/types";

export const categoryService = {
  list: () => apiRequest<Category[]>(endpoints.categories),
};
