"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const sslcommerz_1 = require("../../config/sslcommerz");
const payment_model_1 = require("./payment.model");
const payment_interface_1 = require("./payment.interface");
const booking_model_1 = require("../Booking/booking.model");
const uuid_1 = require("uuid");
exports.PaymentService = {
    async createSSLSession(bookingId, userEmail, userPhone) {
        const booking = await booking_model_1.BookingModel.findById(bookingId).populate(["bus", "user"]);
        if (!booking)
            throw new Error("Booking not found");
        if (booking.status !== "pending")
            throw new Error("Booking already processed");
        const existingPayment = await payment_model_1.PaymentModel.findOne({
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
        const sslResponse = await sslcommerz_1.sslcommerz.init(data);
        if (sslResponse.status !== "SUCCESS")
            throw new Error("SSL payment init failed");
        await payment_model_1.PaymentModel.create({
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
    },
    async verifySSLPayment(tran_id, val_id) {
        const validation = await sslcommerz_1.sslcommerz.validate({ val_id });
        if (validation.status !== "VALID")
            throw new Error("Payment validation failed");
        const payment = await payment_model_1.PaymentModel.findOne({ sslSessionId: tran_id });
        if (!payment)
            throw new Error("Payment not found");
        payment.paymentStatus = payment_interface_1.PAYMENT_STATUS.SUCCESS;
        payment.transactionId = val_id;
        payment.gatewayData = validation;
        await payment.save();
        const booking = await booking_model_1.BookingModel.findById(payment.booking);
        if (booking) {
            booking.status = "confirmed";
            await booking.save();
        }
        return payment;
    },
    async handleSSLSuccess(tran_id) {
        const payment = await payment_model_1.PaymentModel.findOne({ sslSessionId: tran_id });
        if (!payment)
            throw new Error('Payment record not found');
        if (payment.paymentStatus === payment_interface_1.PAYMENT_STATUS.SUCCESS) {
            return await payment.populate(["user", "booking"]);
        }
        payment.paymentStatus = payment_interface_1.PAYMENT_STATUS.SUCCESS;
        payment.transactionId = tran_id;
        await payment.save();
        const booking = await booking_model_1.BookingModel.findById(payment.booking);
        if (booking) {
            booking.status = "confirmed";
            await booking.save();
        }
        return await payment.populate(["user", "booking"]);
    },
    async handleSSLFailure(tran_id) {
        const payment = await payment_model_1.PaymentModel.findOne({ sslSessionId: tran_id });
        if (payment) {
            payment.paymentStatus = payment_interface_1.PAYMENT_STATUS.FAILED;
            await payment.save();
        }
        return payment;
    },
    async getUserPayments(userId) {
        return await payment_model_1.PaymentModel.find({ user: userId }).populate(["user", "booking"]).sort({ createdAt: -1 });
    },
    async getAllPayments() {
        return await payment_model_1.PaymentModel.find().populate(["user", "booking"]).sort({ createdAt: -1 });
    },
};
