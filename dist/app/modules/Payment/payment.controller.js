"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const payment_service_1 = require("./payment.service");
const http_status_codes_1 = require("http-status-codes");
exports.PaymentController = {
    createCheckoutSession: (0, catchAsync_1.default)(async (req, res) => {
        const { bookingId } = req.body;
        const userEmail = req.user?.email;
        if (!userEmail)
            throw new Error("User email not found");
        const session = await payment_service_1.PaymentService.createStripeSession(bookingId, userEmail);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Stripe checkout session created successfully",
            data: { sessionId: session.id, url: session.url },
        });
    }),
    verifyPayment: (0, catchAsync_1.default)(async (req, res) => {
        const { sessionId } = req.body;
        const payment = await payment_service_1.PaymentService.verifyPayment(sessionId);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Payment verified and booking confirmed",
            data: payment,
        });
    }),
    getUserPayments: (0, catchAsync_1.default)(async (req, res) => {
        const userId = req.user?._id;
        const payments = await payment_service_1.PaymentService.getUserPayments(userId);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Payment history retrieved successfully",
            data: payments,
        });
    }),
    getPaymentByBooking: (0, catchAsync_1.default)(async (req, res) => {
        const { bookingId } = req.params;
        const payment = await payment_service_1.PaymentService.getPaymentByBooking(bookingId);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: payment ? "Payment found" : "No payment found for this booking",
            data: payment,
        });
    }),
};
//# sourceMappingURL=payment.controller.js.map