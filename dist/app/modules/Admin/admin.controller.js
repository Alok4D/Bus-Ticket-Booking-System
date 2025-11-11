"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const admin_service_1 = require("./admin.service");
const http_status_codes_1 = require("http-status-codes");
const login = (0, catchAsync_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const adminData = await admin_service_1.AdminService.login({ email, password });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Admin logged in successfully",
        data: adminData,
    });
});
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { name, email, password, phone } = req.body;
    const adminData = await admin_service_1.AdminService.createAdmin({ name, email, password, phone });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Admin created successfully",
        data: adminData,
    });
});
const getDashboardSummary = (0, catchAsync_1.default)(async (req, res) => {
    const summary = await admin_service_1.AdminService.getDashboardSummary();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Dashboard summary retrieved successfully",
        data: summary,
    });
});
const manageUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId, action } = req.body;
    const result = await admin_service_1.AdminService.manageUser({ userId, action });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: result.message,
        data: result,
    });
});
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const users = await admin_service_1.AdminService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Users retrieved successfully",
        data: users,
    });
});
const getAllBookings = (0, catchAsync_1.default)(async (req, res) => {
    const bookings = await admin_service_1.AdminService.getAllBookings();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Bookings retrieved successfully",
        data: bookings,
    });
});
const getPaymentReports = (0, catchAsync_1.default)(async (req, res) => {
    const reports = await admin_service_1.AdminService.getPaymentReports();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Payment reports retrieved successfully",
        data: reports,
    });
});
exports.AdminController = {
    login,
    createAdmin,
    getDashboardSummary,
    manageUser,
    getAllUsers,
    getAllBookings,
    getPaymentReports,
};
