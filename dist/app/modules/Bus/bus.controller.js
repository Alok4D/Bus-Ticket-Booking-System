"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusController = void 0;
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const bus_service_1 = require("./bus.service");
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createBus = (0, catchAsync_1.default)(async (req, res, next) => {
    const bus = await bus_service_1.BusService.createBus(req.body.body);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, success: true, message: "Bus created successfully", data: bus });
});
const getAllBuses = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await bus_service_1.BusService.getAllBuses();
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, success: true, message: "Buses retrieved", data: result });
});
const getSingleBus = (0, catchAsync_1.default)(async (req, res, next) => {
    const bus = await bus_service_1.BusService.getSingleBus(req.params.id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, success: true, message: "Bus retrieved", data: bus });
});
const updateBus = (0, catchAsync_1.default)(async (req, res, next) => {
    const bus = await bus_service_1.BusService.updateBus(req.params.id, req.body.body || req.body);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, success: true, message: "Bus updated", data: bus });
});
const deleteBus = (0, catchAsync_1.default)(async (req, res, next) => {
    const bus = await bus_service_1.BusService.deleteBus(req.params.id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, success: true, message: "Bus deleted", data: bus });
});
exports.BusController = { createBus, getAllBuses, getSingleBus, updateBus, deleteBus };
