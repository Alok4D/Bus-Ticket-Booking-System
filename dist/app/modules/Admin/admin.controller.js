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
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const admin_service_1 = require("./admin.service");
const http_status_codes_1 = require("http-status-codes");
/**
 * Admin Login
 * POST /api/admin/login
 */
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const adminData = yield admin_service_1.AdminService.login({ email, password });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Admin logged in successfully",
        data: adminData,
    });
}));
/**
 * Create Admin
 * POST /api/admin/create
 */
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone } = req.body;
    const adminData = yield admin_service_1.AdminService.createAdmin({ name, email, password, phone });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Admin created successfully",
        data: adminData,
    });
}));
/**
 * Dashboard Summary
 * GET /api/admin/summary
 */
const getDashboardSummary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield admin_service_1.AdminService.getDashboardSummary();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Dashboard summary retrieved successfully",
        data: summary,
    });
}));
/**
 * User Management
 * POST /api/admin/manage-user
 */
const manageUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, action } = req.body;
    const result = yield admin_service_1.AdminService.manageUser({ userId, action });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: result.message,
        data: result,
    });
}));
/**
 * Get All Users
 * GET /api/admin/users
 */
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield admin_service_1.AdminService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Users retrieved successfully",
        data: users,
    });
}));
/**
 * Get All Bookings
 * GET /api/admin/bookings
 */
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield admin_service_1.AdminService.getAllBookings();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Bookings retrieved successfully",
        data: bookings,
    });
}));
/**
 * Payment Reports
 * GET /api/admin/payment-reports
 */
const getPaymentReports = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield admin_service_1.AdminService.getPaymentReports();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Payment reports retrieved successfully",
        data: reports,
    });
}));
exports.AdminController = {
    login,
    createAdmin,
    getDashboardSummary,
    manageUser,
    getAllUsers,
    getAllBookings,
    getPaymentReports,
};
