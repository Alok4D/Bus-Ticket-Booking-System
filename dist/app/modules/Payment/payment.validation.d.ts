import { z } from "zod";
export declare const createSessionSchema: z.ZodObject<{
    body: z.ZodObject<{
        bookingId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const verifyPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        sessionId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getPaymentByBookingSchema: z.ZodObject<{
    params: z.ZodObject<{
        bookingId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=payment.validation.d.ts.map