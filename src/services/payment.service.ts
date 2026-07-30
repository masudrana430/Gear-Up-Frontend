import { apiRequest, queryString } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginatedData, Payment, PaymentSession } from "@/types";

export const paymentService = {
  initiate: (rentalId: string) =>
    apiRequest<PaymentSession>(`${endpoints.payments}/${rentalId}/initiate`, {
      method: "POST",
    }),
  list: (page = 1, limit = 10) =>
    apiRequest<PaginatedData<Payment>>(
      `${endpoints.payments}${queryString({ page, limit })}`,
    ),
  detail: (id: string) => apiRequest<Payment>(`${endpoints.payments}/${id}`),
};
