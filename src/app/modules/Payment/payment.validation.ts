import { z } from "zod";

export const createSessionSchema = z.object({
  body: z.object({
    bookingId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    sessionId: z.string().min(1, "Session ID is required"),
  }),
});

export const getPaymentByBookingSchema = z.object({
  params: z.object({
    bookingId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
  }),
});