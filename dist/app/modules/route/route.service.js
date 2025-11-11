"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteService = void 0;
const route_model_1 = require("./route.model");
const mongoose_1 = require("mongoose");
const createRoute = async (payload) => {
    if (!payload.origin || !payload.destination) {
        throw new Error("Origin and Destination are required");
    }
    const origin = payload.origin.toLowerCase().trim();
    const destination = payload.destination.toLowerCase().trim();
    const existingRoute = await route_model_1.Route.findOne({ origin, destination });
    if (existingRoute) {
        throw new Error(`Route from ${payload.origin} to ${payload.destination} already exists`);
    }
    const route = await route_model_1.Route.create({
        origin,
        destination,
        distance: payload.distance,
    });
    return route;
};
const getAllRoutes = async () => {
    const routes = await route_model_1.Route.find({});
    const total = await route_model_1.Route.countDocuments();
    return {
        meta: { total },
        data: routes,
    };
};
const getSingleRoute = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid route id");
    const route = await route_model_1.Route.findById(id);
    if (!route)
        throw new Error("Route not found");
    return route;
};
const updateRoute = async (id, payload) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid route id");
    const updated = await route_model_1.Route.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updated)
        throw new Error("Route not found");
    return updated;
};
const deleteRoute = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid route id");
    const deleted = await route_model_1.Route.findByIdAndDelete(id);
    if (!deleted)
        throw new Error("Route not found");
    return deleted;
};
exports.RouteService = {
    createRoute,
    getAllRoutes,
    getSingleRoute,
    updateRoute,
    deleteRoute,
};
