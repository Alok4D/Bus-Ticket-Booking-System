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
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const booking_service_1 = require("./booking.service");
const http_status_codes_1 = require("http-status-codes");
exports.BookingController = {
    createBooking: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Logged-in user:", req.user);
        const result = yield booking_service_1.BookingService.createBooking(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "Booking created successfully",
            data: result,
        });
    })),
    getAllBookings: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield booking_service_1.BookingService.getAllBookings();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "All bookings retrieved successfully",
            data: result,
        });
    })),
    getSingleBooking: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield booking_service_1.BookingService.getSingleBooking(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Booking retrieved successfully",
            data: result,
        });
    })),
    updateBookingStatus: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = req.body;
        const result = yield booking_service_1.BookingService.updateBookingStatus(req.params.id, status);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Booking status updated successfully",
            data: result,
        });
    })),
    getUserBookings: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
        const bookings = yield booking_service_1.BookingService.getUserBookings(userId);
        if (bookings.length === 0) {
            return (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_codes_1.StatusCodes.OK,
                message: "No bookings found for this user",
                data: [],
            });
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "User bookings retrieved successfully",
            data: bookings,
        });
    }))
};
