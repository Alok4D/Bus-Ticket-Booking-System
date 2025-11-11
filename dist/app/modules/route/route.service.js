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
exports.RouteService = void 0;
const route_model_1 = require("./route.model");
const mongoose_1 = require("mongoose");
const createRoute = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ Step 1: Basic validation check
    if (!payload.origin || !payload.destination) {
        throw new Error("Origin and Destination are required");
    }
    // ✅ Step 2: Convert to lowercase safely
    const origin = payload.origin.toLowerCase().trim();
    const destination = payload.destination.toLowerCase().trim();
    // ✅ Step 3: Check if route already exists
    const existingRoute = yield route_model_1.Route.findOne({ origin, destination });
    if (existingRoute) {
        throw new Error(`Route from ${payload.origin} to ${payload.destination} already exists`);
    }
    // ✅ Step 4: Create new route
    const route = yield route_model_1.Route.create({
        origin,
        destination,
        distance: payload.distance,
    });
    return route;
});
const getAllRoutes = () => __awaiter(void 0, void 0, void 0, function* () {
    const routes = yield route_model_1.Route.find({});
    const total = yield route_model_1.Route.countDocuments();
    return {
        meta: { total },
        data: routes,
    };
});
const getSingleRoute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid route id");
    const route = yield route_model_1.Route.findById(id);
    if (!route)
        throw new Error("Route not found");
    return route;
});
const updateRoute = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid route id");
    const updated = yield route_model_1.Route.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updated)
        throw new Error("Route not found");
    return updated;
});
const deleteRoute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new Error("Invalid route id");
    const deleted = yield route_model_1.Route.findByIdAndDelete(id);
    if (!deleted)
        throw new Error("Route not found");
    return deleted;
});
exports.RouteService = {
    createRoute,
    getAllRoutes,
    getSingleRoute,
    updateRoute,
    deleteRoute,
};
