import { z } from "zod";
export declare const createBookingSchema: z.ZodObject<{
    user: z.ZodString;
    bus: z.ZodString;
    seats: z.ZodArray<z.ZodNumber>;
    journeyDate: z.ZodString;
}, z.core.$strip>;
export declare const updateBookingStatusSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            pending: "pending";
            confirmed: "confirmed";
            cancelled: "cancelled";
        }>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getBookingSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=booking.validation.d.ts.map