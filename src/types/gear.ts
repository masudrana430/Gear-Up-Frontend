import type { ListQuery } from "./api";

export type GearItem = {
  id: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: string;
  stockQuantity: number;
  specifications: Record<string, string | number | boolean>;
  images: string[];
  isActive: boolean;
  providerId: string;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
  category?: { id: string; name: string; slug: string };
  provider?: { id: string; name: string };
  _count?: { reviews: number };
};

export type GearInput = {
  name: string;
  description: string;
  brand: string;
  pricePerDay: number;
  stockQuantity: number;
  categoryId: string;
  images?: string[];
  specifications?: Record<string, string | number | boolean>;
};

export type GearQuery = ListQuery & {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  sortBy?: "createdAt" | "name" | "pricePerDay";
  sortOrder?: "asc" | "desc";
  availableFrom?: string;
  availableTo?: string;
};