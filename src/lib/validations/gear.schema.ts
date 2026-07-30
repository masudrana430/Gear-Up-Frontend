import { z } from "zod";

export const gearSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  description: z.string().trim().min(20, "Add at least 20 characters"),
  brand: z.string().trim().min(2, "Brand is required"),
  pricePerDay: z.coerce.number().positive("Price must be greater than zero"),
  stockQuantity: z.coerce.number().int().min(1, "Stock must be at least 1"),
  categoryId: z.string().uuid("Select a category"),
  imageUrl: z.union([z.literal(""), z.string().url("Enter a valid image URL")]),
});
