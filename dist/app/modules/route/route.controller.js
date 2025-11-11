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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const route_service_1 = require("./route.service");
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
/**
 * POST /api/v1/routes
 * Admin only
 */
const createRoute = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ Fix: যদি validateRequest middleware এ schema তে "body" আছে
    // তাহলে req.body.body থেকে data নিতে হবে
    const payload = req.body.body;
    const route = yield route_service_1.RouteService.createRoute(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Route created successfully",
        data: route,
    });
}));
/**
 * GET /api/v1/routes
 */
const getAllRoutes = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield route_service_1.RouteService.getAllRoutes();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Routes retrieved successfully",
        data: result,
    });
}));
/**
 * GET /api/v1/routes/:id
 */
const getSingleRoute = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const route = yield route_service_1.RouteService.getSingleRoute(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Route retrieved successfully",
        data: route,
    });
}));
/**
 * PUT /api/v1/routes/:id
 * Admin only
 */
const updateRoute = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const updated = yield route_service_1.RouteService.updateRoute(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Route updated successfully",
        data: updated,
    });
}));
/**
 * DELETE /api/v1/routes/:id
 * Admin only
 */
const deleteRoute = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleted = yield route_service_1.RouteService.deleteRoute(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Route deleted successfully",
        data: deleted,
    });
}));
exports.RouteController = {
    createRoute,
    getAllRoutes,
    getSingleRoute,
    updateRoute,
    deleteRoute,
};
