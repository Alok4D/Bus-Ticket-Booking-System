"use strict";
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
    createBooking: (0, catchAsync_1.default)(async (req, res) => {
        console.log("Logged-in user:", req.user);
        const result = await booking_service_1.BookingService.createBooking(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "Booking created successfully",
            data: result,
        });
    }),
    getAllBookings: (0, catchAsync_1.default)(async (req, res) => {
        const result = await booking_service_1.BookingService.getAllBookings();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "All bookings retrieved successfully",
            data: result,
        });
    }),
    getSingleBooking: (0, catchAsync_1.default)(async (req, res) => {
        const result = await booking_service_1.BookingService.getSingleBooking(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Booking retrieved successfully",
            data: result,
        });
    }),
    updateBookingStatus: (0, catchAsync_1.default)(async (req, res) => {
        const { status } = req.body;
        const result = await booking_service_1.BookingService.updateBookingStatus(req.params.id, status);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Booking status updated successfully",
            data: result,
        });
    }),
    getUserBookings: (0, catchAsync_1.default)(async (req, res) => {
        const userId = req.user?._id?.toString();
        const bookings = await booking_service_1.BookingService.getUserBookings(userId);
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
    })
};
