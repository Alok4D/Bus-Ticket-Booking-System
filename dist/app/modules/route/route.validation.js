"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouteSchema = exports.getRouteSchema = exports.updateRouteSchema = exports.createRouteSchema = void 0;
const zod_1 = require("zod");
exports.createRouteSchema = zod_1.z.object({
    origin: zod_1.z.string().min(2, "Origin must be at least 2 characters"),
    destination: zod_1.z.string().min(2, "Destination must be at least 2 characters"),
    distance: zod_1.z.number().nonnegative("Distance must be non-negative"),
});
exports.updateRouteSchema = zod_1.z.object({
    body: zod_1.z.object({
        origin: zod_1.z.string().min(2).optional(),
        destination: zod_1.z.string().min(2).optional(),
        distance: zod_1.z.number().nonnegative().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
});
exports.getRouteSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
});
exports.deleteRouteSchema = exports.getRouteSchema;
//# sourceMappingURL=route.validation.js.map