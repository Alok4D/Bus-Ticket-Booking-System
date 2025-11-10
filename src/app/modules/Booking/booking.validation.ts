import { z } from "zod";

export const createBookingSchema = z.object({
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),
  bus: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Bus ID"),
  seats: z.array(z.number().int().positive()).min(1, "At least one seat is required"),
  journeyDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
});

export const updateBookingStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "confirmed", "cancelled"]),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
  }),
});

export const getBookingSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
  }),
});
