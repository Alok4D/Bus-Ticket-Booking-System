import { z } from "zod";

export const createBusSchema = z.object({
  body: z.object({
    busName: z.string().min(2, "Bus name must be at least 2 characters").trim(),
    busNumber: z.string().min(2, "Bus number must be at least 2 characters").trim(),
    route: z.string().min(1, "Route ID is required"),
    totalSeats: z.number().int().positive("Total seats must be positive"),
    availableSeats: z.number().int().nonnegative("Available seats cannot be negative"),
    fare: z.number().positive("Fare must be positive"),
    departureTime: z.string().min(1, "Departure time is required"),
    arrivalTime: z.string().min(1, "Arrival time is required"),
  })
});

export const updateBusSchema = z.object({
  body: z.object({
    busName: z.string().min(2).trim().optional(),
    busNumber: z.string().min(2).trim().optional(),
    route: z.string().optional(),
    totalSeats: z.number().int().positive().optional(),
    availableSeats: z.number().int().nonnegative().optional(),
    fare: z.number().positive().optional(),
    departureTime: z.string().optional(),
    arrivalTime: z.string().optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
});

export const getBusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const deleteBusSchema = getBusSchema;
