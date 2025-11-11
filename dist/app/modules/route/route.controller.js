"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const route_service_1 = require("./route.service");
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const createRoute = (0, catchAsync_1.default)(async (req, res) => {
    const payload = req.body.body;
    const route = await route_service_1.RouteService.createRoute(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Route created successfully",
        data: route,
    });
});
const getAllRoutes = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await route_service_1.RouteService.getAllRoutes();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Routes retrieved successfully",
        data: result,
    });
});
const getSingleRoute = (0, catchAsync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const route = await route_service_1.RouteService.getSingleRoute(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Route retrieved successfully",
        data: route,
    });
});
const updateRoute = (0, catchAsync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    const updated = await route_service_1.RouteService.updateRoute(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Route updated successfully",
        data: updated,
    });
});
const deleteRoute = (0, catchAsync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await route_service_1.RouteService.deleteRoute(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Route deleted successfully",
        data: deleted,
    });
});
exports.RouteController = {
    createRoute,
    getAllRoutes,
    getSingleRoute,
    updateRoute,
    deleteRoute,
};
