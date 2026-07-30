export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type Payment = {
  id: string;
  transactionId: string;
  amount: string;
  currency: string;
  provider: "SSLCOMMERZ" | "STRIPE";
  status: PaymentStatus;
  paidAt?: string | null;
  createdAt?: string;
  rentalOrder?: { id: string; orderNumber: string };
};

export type PaymentSession = {
  paymentId: string;
  transactionId: string;
  amount: string;
  currency: string;
  sessionKey: string;
  gatewayUrl: string;
};
