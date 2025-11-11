"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBusSchema = exports.getBusSchema = exports.updateBusSchema = exports.createBusSchema = void 0;
const zod_1 = require("zod");
exports.createBusSchema = zod_1.z.object({
    body: zod_1.z.object({
        busName: zod_1.z.string().min(2, "Bus name must be at least 2 characters").trim(),
        busNumber: zod_1.z.string().min(2, "Bus number must be at least 2 characters").trim(),
        route: zod_1.z.string().min(1, "Route ID is required"),
        totalSeats: zod_1.z.number().int().positive("Total seats must be positive"),
        availableSeats: zod_1.z.number().int().nonnegative("Available seats cannot be negative"),
        fare: zod_1.z.number().positive("Fare must be positive"),
        departureTime: zod_1.z.string().min(1, "Departure time is required"),
        arrivalTime: zod_1.z.string().min(1, "Arrival time is required"),
    })
});
exports.updateBusSchema = zod_1.z.object({
    body: zod_1.z.object({
        busName: zod_1.z.string().min(2).trim().optional(),
        busNumber: zod_1.z.string().min(2).trim().optional(),
        route: zod_1.z.string().optional(),
        totalSeats: zod_1.z.number().int().positive().optional(),
        availableSeats: zod_1.z.number().int().nonnegative().optional(),
        fare: zod_1.z.number().positive().optional(),
        departureTime: zod_1.z.string().optional(),
        arrivalTime: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
});
exports.getBusSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string().min(1) }),
});
exports.deleteBusSchema = exports.getBusSchema;
