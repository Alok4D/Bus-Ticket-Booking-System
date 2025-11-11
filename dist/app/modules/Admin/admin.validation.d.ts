import { z } from 'zod';
export declare const adminLoginValidation: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const adminCreateValidation: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const userManagementValidation: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodString;
        action: z.ZodEnum<{
            block: "block";
            unblock: "unblock";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const systemSettingsValidation: z.ZodObject<{
    body: z.ZodObject<{
        siteName: z.ZodOptional<z.ZodString>;
        supportEmail: z.ZodOptional<z.ZodString>;
        supportPhone: z.ZodOptional<z.ZodString>;
        maintenanceMode: z.ZodOptional<z.ZodBoolean>;
        bookingEnabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=admin.validation.d.ts.map