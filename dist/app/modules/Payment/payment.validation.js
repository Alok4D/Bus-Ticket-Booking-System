"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentByBookingSchema = exports.verifyPaymentSchema = exports.createSessionSchema = void 0;
const zod_1 = require("zod");
exports.createSessionSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
    }),
});
exports.verifyPaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        sessionId: zod_1.z.string().min(1, "Session ID is required"),
    }),
});
exports.getPaymentByBookingSchema = zod_1.z.object({
    params: zod_1.z.object({
        bookingId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Booking ID"),
    }),
});
//# sourceMappingURL=payment.validation.js.map