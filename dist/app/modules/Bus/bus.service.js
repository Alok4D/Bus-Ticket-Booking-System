"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusService = void 0;
const mongoose_1 = require("mongoose");
const bus_model_1 = require("./bus.model");
const route_model_1 = require("../route/route.model");
const createBus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if route field is provided
    if (!payload.route) {
        throw new Error('Route ID is required');
    }
    // Check if route exists in database
    const routeExists = yield route_model_1.Route.findOne({ _id: payload.route });
    if (!routeExists) {
        throw new Error(`Route with ID ${payload.route} not found in database`);
    }
    // Check if bus number already exists
    const existingBus = yield bus_model_1.BusModel.findOne({ busNumber: payload.busNumber });
    if (existingBus) {
        throw new Error(`Bus with number ${payload.busNumber} already exists`);
    }
    const bus = yield bus_model_1.BusModel.create(payload);
    return bus;
});
const getAllBuses = () => __awaiter(void 0, void 0, void 0, function* () {
    const buses = yield bus_model_1.BusModel.find().populate("route");
    const total = yield bus_model_1.BusModel.countDocuments();
    return { meta: { total }, data: buses };
});
const getSingleBus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid bus id");
    const bus = yield bus_model_1.BusModel.findById(id).populate("route");
    if (!bus)
        throw new Error("Bus not found");
    return bus;
});
const updateBus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid bus id");
    // If route is being updated, validate it
    if (payload.route) {
        const routeExists = yield route_model_1.Route.findOne({ _id: payload.route });
        if (!routeExists) {
            throw new Error(`Route with ID ${payload.route} not found in database`);
        }
    }
    // If bus number is being updated, check for duplicates
    if (payload.busNumber) {
        const existingBus = yield bus_model_1.BusModel.findOne({
            busNumber: payload.busNumber,
            _id: { $ne: id } // Exclude current bus
        });
        if (existingBus) {
            throw new Error(`Bus with number ${payload.busNumber} already exists`);
        }
    }
    const updated = yield bus_model_1.BusModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updated)
        throw new Error("Bus not found");
    return updated;
});
const deleteBus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid bus id");
    const deleted = yield bus_model_1.BusModel.findByIdAndDelete(id);
    if (!deleted)
        throw new Error("Bus not found");
    return deleted;
});
exports.BusService = {
    createBus,
    getAllBuses,
    getSingleBus,
    updateBus,
    deleteBus,
};
