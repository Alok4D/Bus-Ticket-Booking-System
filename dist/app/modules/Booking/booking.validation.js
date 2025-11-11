"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingSchema = exports.updateBookingStatusSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    user: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),
    bus: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Bus ID"),
    seats: zod_1.z.array(zod_1.z.number().int().positive()).min(1, "At least one seat is required"),
    journeyDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
});
exports.updateBookingStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "confirmed", "cancelled"]),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
    }),
});
exports.getBookingSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
    }),
});
