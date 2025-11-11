"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemSettingsValidation = exports.userManagementValidation = exports.adminCreateValidation = exports.adminLoginValidation = void 0;
const zod_1 = require("zod");
exports.adminLoginValidation = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.adminCreateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase and number'),
        phone: zod_1.z.string().optional(),
    }),
});
exports.userManagementValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, 'User ID is required'),
        action: zod_1.z.enum(['block', 'unblock']),
    }),
});
exports.systemSettingsValidation = zod_1.z.object({
    body: zod_1.z.object({
        siteName: zod_1.z.string().optional(),
        supportEmail: zod_1.z.string().email().optional(),
        supportPhone: zod_1.z.string().optional(),
        maintenanceMode: zod_1.z.boolean().optional(),
        bookingEnabled: zod_1.z.boolean().optional(),
    }),
});
