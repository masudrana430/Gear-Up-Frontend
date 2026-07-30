export const queryKeys = {
  me: ["auth", "me"] as const,
  categories: ["categories"] as const,
  gear: (filters?: object) => ["gear", filters ?? {}] as const,
  gearDetail: (id: string) => ["gear", id] as const,
  rentals: ["rentals"] as const,
  rental: (id: string) => ["rentals", id] as const,
  payments: ["payments"] as const,
  providerGear: ["provider", "gear"] as const,
  providerOrders: ["provider", "orders"] as const,
  admin: (resource: string) => ["admin", resource] as const,
  reviews: (gearId: string) => ["reviews", gearId] as const,
};
