"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const router = (0, express_1.Router)();
// Create Stripe Checkout Session
router.post("/create-session", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), (0, validateRequest_1.default)(payment_validation_1.createSessionSchema), payment_controller_1.PaymentController.createCheckoutSession);
// Verify Payment after Stripe success
router.post("/verify-payment", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), (0, validateRequest_1.default)(payment_validation_1.verifyPaymentSchema), payment_controller_1.PaymentController.verifyPayment);
// Get user payment history
router.get("/my-payments", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), payment_controller_1.PaymentController.getUserPayments);
// Get payment by booking ID
router.get("/booking/:bookingId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), (0, validateRequest_1.default)(payment_validation_1.getPaymentByBookingSchema), payment_controller_1.PaymentController.getPaymentByBooking);
exports.PaymentRoutes = router;
//# sourceMappingURL=payment.route.js.map