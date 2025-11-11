"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusService = void 0;
const mongoose_1 = require("mongoose");
const bus_model_1 = require("./bus.model");
const route_model_1 = require("../route/route.model");
const createBus = async (payload) => {
    if (!payload.route) {
        throw new Error('Route ID is required');
    }
    const routeExists = await route_model_1.Route.findOne({ _id: payload.route });
    if (!routeExists) {
        throw new Error(`Route with ID ${payload.route} not found in database`);
    }
    const existingBus = await bus_model_1.BusModel.findOne({ busNumber: payload.busNumber });
    if (existingBus) {
        throw new Error(`Bus with number ${payload.busNumber} already exists`);
    }
    const bus = await bus_model_1.BusModel.create(payload);
    return bus;
};
const getAllBuses = async () => {
    const buses = await bus_model_1.BusModel.find().populate("route");
    const total = await bus_model_1.BusModel.countDocuments();
    return { meta: { total }, data: buses };
};
const getSingleBus = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid bus id");
    const bus = await bus_model_1.BusModel.findById(id).populate("route");
    if (!bus)
        throw new Error("Bus not found");
    return bus;
};
const updateBus = async (id, payload) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid bus id");
    if (payload.route) {
        const routeExists = await route_model_1.Route.findOne({ _id: payload.route });
        if (!routeExists) {
            throw new Error(`Route with ID ${payload.route} not found in database`);
        }
    }
    if (payload.busNumber) {
        const existingBus = await bus_model_1.BusModel.findOne({
            busNumber: payload.busNumber,
            _id: { $ne: id }
        });
        if (existingBus) {
            throw new Error(`Bus with number ${payload.busNumber} already exists`);
        }
    }
    const updated = await bus_model_1.BusModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updated)
        throw new Error("Bus not found");
    return updated;
};
const deleteBus = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid bus id");
    const deleted = await bus_model_1.BusModel.findByIdAndDelete(id);
    if (!deleted)
        throw new Error("Bus not found");
    return deleted;
};
exports.BusService = {
    createBus,
    getAllBuses,
    getSingleBus,
    updateBus,
    deleteBus,
};
