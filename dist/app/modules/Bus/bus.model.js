"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusModel = void 0;
// src/modules/bus/bus.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const busSchema = new mongoose_1.default.Schema({
    busName: { type: String, required: true },
    busNumber: { type: String, required: true, unique: true },
    route: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Route",
        required: true,
    },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    fare: { type: Number, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
}, { timestamps: true, versionKey: false });
exports.BusModel = mongoose_1.default.model("Bus", busSchema);
