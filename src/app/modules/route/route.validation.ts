import { z } from "zod";

export const createRouteSchema = z.object({
  body: z.object({
    origin: z.string().min(2, "Origin must be at least 2 characters").trim(),
    destination: z.string().min(2, "Destination must be at least 2 characters").trim(),
    distance: z.number().positive("Distance must be positive"),
  })
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
