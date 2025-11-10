"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusService = void 0;
const mongoose_1 = require("mongoose");
const bus_model_1 = require("./bus.model");
const createBus = async (payload) => {
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
//# sourceMappingURL=bus.service.js.map