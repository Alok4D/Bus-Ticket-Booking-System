import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import { createSessionSchema, verifyPaymentSchema, getPaymentByBookingSchema } from "./payment.validation";

const router = Router();

// Create Stripe Checkout Session
router.post("/create-session", checkAuth(Role.USER), validateRequest(createSessionSchema), PaymentController.createCheckoutSession);

// Verify Payment after Stripe success
router.post("/verify-payment", checkAuth(Role.USER), validateRequest(verifyPaymentSchema), PaymentController.verifyPayment);

// Get user payment history
router.get("/my-payments", checkAuth(Role.USER), PaymentController.getUserPayments);

// Get payment by booking ID
router.get("/booking/:bookingId", checkAuth(Role.USER), validateRequest(getPaymentByBookingSchema), PaymentController.getPaymentByBooking);

export const PaymentRoutes = router;
