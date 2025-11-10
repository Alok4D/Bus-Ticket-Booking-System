import { z } from 'zod';

export const adminLoginValidation = z.object({
 
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
 
});

export const adminCreateValidation = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase and number'),
    phone: z.string().optional(),
  }),
});

export const userManagementValidation = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    action: z.enum(['block', 'unblock']),
  }),
});

export const systemSettingsValidation = z.object({
  body: z.object({
    siteName: z.string().optional(),
    supportEmail: z.string().email().optional(),
    supportPhone: z.string().optional(),
    maintenanceMode: z.boolean().optional(),
    bookingEnabled: z.boolean().optional(),
  }),
});