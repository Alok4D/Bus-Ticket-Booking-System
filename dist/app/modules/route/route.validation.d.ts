import { z } from "zod";
export declare const createRouteSchema: z.ZodObject<{
    body: z.ZodObject<{
        origin: z.ZodString;
        destination: z.ZodString;
        distance: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateRouteSchema: z.ZodObject<{
    body: z.ZodObject<{
        origin: z.ZodOptional<z.ZodString>;
        destination: z.ZodOptional<z.ZodString>;
        distance: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getRouteSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteRouteSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=route.validation.d.ts.map