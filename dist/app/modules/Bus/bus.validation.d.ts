import { z } from "zod";
export declare const createBusSchema: z.ZodObject<{
    body: z.ZodObject<{
        busName: z.ZodString;
        busNumber: z.ZodString;
        route: z.ZodString;
        totalSeats: z.ZodNumber;
        availableSeats: z.ZodNumber;
        fare: z.ZodNumber;
        departureTime: z.ZodString;
        arrivalTime: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateBusSchema: z.ZodObject<{
    body: z.ZodObject<{
        busName: z.ZodOptional<z.ZodString>;
        busNumber: z.ZodOptional<z.ZodString>;
        route: z.ZodOptional<z.ZodString>;
        totalSeats: z.ZodOptional<z.ZodNumber>;
        availableSeats: z.ZodOptional<z.ZodNumber>;
        fare: z.ZodOptional<z.ZodNumber>;
        departureTime: z.ZodOptional<z.ZodString>;
        arrivalTime: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getBusSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteBusSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=bus.validation.d.ts.map