import type { ListQuery } from "./api";

export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export type RentalOrderItem = {
  id: string;
  gearItemId: string;
  gearNameSnapshot: string;
  pricePerDay: string;
  quantity: number;
  rentalDays: number;
  lineTotal: string;
  gearItem?: { id: string; name: string; images?: string[] };
};

export type RentalOrder = {
  id: string;
  orderNumber: string;
  status: RentalStatus;
  startDate: string;
  endDate: string;
  rentalDays: number;
  subtotal: string;
  totalAmount: string;
  notes?: string | null;
  items: RentalOrderItem[];
  customer?: { id: string; name: string; email: string };
  payment?: { id: string; status: string } | null;
  createdAt?: string;
};

export type CreateRentalInput = {
  startDate: string;
  endDate: string;
  notes?: string;
  items: { gearItemId: string; quantity: number }[];
};

export type RentalQuery = ListQuery & { status?: RentalStatus };
