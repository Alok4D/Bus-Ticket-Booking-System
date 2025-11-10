"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const mongoose_1 = require("mongoose");
const routeSchema = new mongoose_1.Schema({
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true, min: 0 },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Route = (0, mongoose_1.model)("Route", routeSchema);
//# sourceMappingURL=route.model.js.map