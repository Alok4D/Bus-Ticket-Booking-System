import { z } from "zod";

export const createBusSchema = z.object({
  
    busName: z.string().min(2),
    busNumber: z.string().min(2),
    route: z.string().min(1),
    totalSeats: z.number().int().positive(),
    availableSeats: z.number().int().nonnegative(),
    fare: z.number().positive(),
    departureTime: z.string().min(1),
    arrivalTime: z.string().min(1),
 
});

export const updateBusSchema = z.object({
 
    busName: z.string().min(2).optional(),
    busNumber: z.string().min(2).optional(),
    route: z.string().optional(),
    totalSeats: z.number().int().positive().optional(),
    availableSeats: z.number().int().nonnegative().optional(),
    fare: z.number().positive().optional(),
    departureTime: z.string().optional(),
    arrivalTime: z.string().optional(),

  params: z.object({
    id: z.string().min(1),
  }),
});

export const getBusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const deleteBusSchema = getBusSchema;
