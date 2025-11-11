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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const sslcommerz_1 = require("../../config/sslcommerz");
const payment_model_1 = require("./payment.model");
const payment_interface_1 = require("./payment.interface");
const booking_model_1 = require("../Booking/booking.model");
const uuid_1 = require("uuid");
exports.PaymentService = {
    createSSLSession(bookingId, userEmail, userPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_model_1.BookingModel.findById(bookingId).populate(["bus", "user"]);
            if (!booking)
                throw new Error("Booking not found");
            if (booking.status !== "pending")
                throw new Error("Booking already processed");
            // Check existing payment
            const existingPayment = yield payment_model_1.PaymentModel.findOne({
                booking: bookingId,
                paymentStatus: { $in: [payment_interface_1.PAYMENT_STATUS.SUCCESS, payment_interface_1.PAYMENT_STATUS.PENDING] }
            });
            if (existingPayment) {
                throw new Error("Payment already exists for this booking");
            }
            const tran_id = `BUS-${Date.now()}-${(0, uuid_1.v4)().slice(0, 8)}`;
            const data = {
                total_amount: booking.totalFare,
                currency: "BDT",
                tran_id,
                success_url: `${process.env.SSL_SUCCESS_BACKEND_URL}?tran_id=${tran_id}`,
                fail_url: `${process.env.SSL_FAIL_BACKEND_URL}?tran_id=${tran_id}`,
                cancel_url: `${process.env.SSL_CANCEL_BACKEND_URL}?tran_id=${tran_id}`,
                ipn_url: process.env.SSL_IPN_URL,
                shipping_method: "NO",
                product_name: `Bus Ticket - ${booking.bus.busName}`,
                product_category: "Transportation",
                product_profile: "general",
                cus_name: booking.user.name || "Customer",
                cus_email: userEmail,
                cus_add1: booking.user.address || "Dhaka",
                cus_city: "Dhaka",
                cus_state: "Dhaka",
                cus_postcode: "1000",
                cus_country: "Bangladesh",
                cus_phone: userPhone,
                ship_name: booking.user.name || "Customer",
                ship_add1: booking.user.address || "Dhaka",
                ship_city: "Dhaka",
                ship_state: "Dhaka",
                ship_postcode: "1000",
                ship_country: "Bangladesh",
            };
            // ✅ এখানে instance এর init method call
            const sslResponse = yield sslcommerz_1.sslcommerz.init(data);
            if (sslResponse.status !== "SUCCESS")
                throw new Error("SSL payment init failed");
            yield payment_model_1.PaymentModel.create({
                user: booking.user,
                booking: bookingId,
                amount: booking.totalFare,
                transactionId: tran_id,
                paymentMethod: "sslcommerz",
                paymentStatus: payment_interface_1.PAYMENT_STATUS.PENDING,
                sslSessionId: tran_id,
                gatewayData: sslResponse,
            });
            return { paymentUrl: sslResponse.GatewayPageURL, sessionId: tran_id };
        });
    },
    verifySSLPayment(tran_id, val_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield sslcommerz_1.sslcommerz.validate({ val_id });
            if (validation.status !== "VALID")
                throw new Error("Payment validation failed");
            const payment = yield payment_model_1.PaymentModel.findOne({ sslSessionId: tran_id });
            if (!payment)
                throw new Error("Payment not found");
            payment.paymentStatus = payment_interface_1.PAYMENT_STATUS.SUCCESS;
            payment.transactionId = val_id;
            payment.gatewayData = validation;
            yield payment.save();
            const booking = yield booking_model_1.BookingModel.findById(payment.booking);
            if (booking) {
                booking.status = "confirmed";
                yield booking.save();
            }
            return payment;
        });
    },
    handleSSLSuccess(tran_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield payment_model_1.PaymentModel.findOne({ sslSessionId: tran_id });
            if (!payment)
                throw new Error('Payment record not found');
            // Prevent duplicate success processing
            if (payment.paymentStatus === payment_interface_1.PAYMENT_STATUS.SUCCESS) {
                return yield payment.populate(["user", "booking"]);
            }
            // Update payment status to success
            payment.paymentStatus = payment_interface_1.PAYMENT_STATUS.SUCCESS;
            payment.transactionId = tran_id;
            yield payment.save();
            // Update booking status
            const booking = yield booking_model_1.BookingModel.findById(payment.booking);
            if (booking) {
                booking.status = "confirmed";
                yield booking.save();
            }
            return yield payment.populate(["user", "booking"]);
        });
    },
    handleSSLFailure(tran_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield payment_model_1.PaymentModel.findOne({ sslSessionId: tran_id });
            if (payment) {
                payment.paymentStatus = payment_interface_1.PAYMENT_STATUS.FAILED;
                yield payment.save();
            }
            return payment;
        });
    },
    getUserPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.PaymentModel.find({ user: userId }).populate(["user", "booking"]).sort({ createdAt: -1 });
        });
    },
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.PaymentModel.find().populate(["user", "booking"]).sort({ createdAt: -1 });
        });
    },
};
