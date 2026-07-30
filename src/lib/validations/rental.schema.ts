import { z } from "zod";

export const rentalSchema = z
  .object({
    startDate: z.string().min(1, "Choose a start date"),
    endDate: z.string().min(1, "Choose an end date"),
    quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
    notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  })
  .refine(({ startDate }) => new Date(`${startDate}T00:00:00`) >= new Date(new Date().toDateString()), {
    path: ["startDate"],
    message: "Start date cannot be in the past",
  })
  .refine(({ startDate, endDate }) => new Date(endDate) >= new Date(startDate), {
    path: ["endDate"],
    message: "End date must be on or after the start date",
  });
