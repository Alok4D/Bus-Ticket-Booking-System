import { z } from "zod";

export const createRouteSchema = z.object({
     origin: z.string().min(2, "Origin must be at least 2 characters"),
    destination: z.string().min(2, "Destination must be at least 2 characters"),
    distance: z.number().nonnegative("Distance must be non-negative"),
});

export const updateRouteSchema = z.object({
  body: z.object({
    origin: z.string().min(2).optional(),
    destination: z.string().min(2).optional(),
    distance: z.number().nonnegative().optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
});

export const getRouteSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const deleteRouteSchema = getRouteSchema;
