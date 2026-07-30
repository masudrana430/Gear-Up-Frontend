export type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  customerId: string;
  gearItemId: string;
  rentalOrderId: string;
  createdAt: string;
  customer?: { id: string; name: string; profileImage?: string | null };
};

export type ReviewInput = {
  rentalOrderId: string;
  gearItemId: string;
  rating: number;
  comment?: string;
};
