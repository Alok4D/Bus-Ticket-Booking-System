"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBusSchema = exports.getBusSchema = exports.updateBusSchema = exports.createBusSchema = void 0;
const zod_1 = require("zod");
exports.createBusSchema = zod_1.z.object({
    busName: zod_1.z.string().min(2),
    busNumber: zod_1.z.string().min(2),
    route: zod_1.z.string().min(1),
    totalSeats: zod_1.z.number().int().positive(),
    availableSeats: zod_1.z.number().int().nonnegative(),
    fare: zod_1.z.number().positive(),
    departureTime: zod_1.z.string().min(1),
    arrivalTime: zod_1.z.string().min(1),
});
exports.updateBusSchema = zod_1.z.object({
    busName: zod_1.z.string().min(2).optional(),
    busNumber: zod_1.z.string().min(2).optional(),
    route: zod_1.z.string().optional(),
    totalSeats: zod_1.z.number().int().positive().optional(),
    availableSeats: zod_1.z.number().int().nonnegative().optional(),
    fare: zod_1.z.number().positive().optional(),
    departureTime: zod_1.z.string().optional(),
    arrivalTime: zod_1.z.string().optional(),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
});
exports.getBusSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string().min(1) }),
});
exports.deleteBusSchema = exports.getBusSchema;
//# sourceMappingURL=bus.validation.js.map