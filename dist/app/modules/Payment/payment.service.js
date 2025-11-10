"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = require("../../config/stripe");
const booking_model_1 = require("../Booking/booking.model");
const payment_model_1 = require("./payment.model");
exports.PaymentService = {
    async createStripeSession(bookingId, userEmail) {
        const booking = await booking_model_1.BookingModel.findById(bookingId).populate("bus");
        if (!booking)
            throw new Error("Booking not found");
        if (booking.status !== "pending")
            throw new Error("Booking already processed");
        const bus = booking.bus;
        const session = await stripe_1.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: userEmail,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Bus Ticket - ${bus.busName}`,
                            description: `Seats: ${booking.seats.join(", ")} | Date: ${booking.journeyDate.toDateString()}`,
                        },
                        unit_amount: Math.round(booking.totalFare * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                bookingId: bookingId,
                userId: booking.user.toString(),
            },
            success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/payment-cancel?bookingId=${bookingId}`,
        });
        // Store session ID for tracking
        await payment_model_1.PaymentModel.create({
            user: booking.user,
            booking: bookingId,
            amount: booking.totalFare,
            transactionId: session.id,
            paymentMethod: "stripe",
            paymentStatus: "pending",
            stripeSessionId: session.id,
        });
        return session;
    },
    async verifyPayment(sessionId) {
        const session = await stripe_1.stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== "paid") {
            throw new Error("Payment not completed");
        }
        const payment = await payment_model_1.PaymentModel.findOne({ stripeSessionId: sessionId });
        if (!payment)
            throw new Error("Payment record not found");
        // Update payment status
        payment.paymentStatus = "success";
        payment.transactionId = session.payment_intent;
        await payment.save();
        // Update booking status
        const booking = await booking_model_1.BookingModel.findById(payment.booking);
        if (booking) {
            booking.status = "confirmed";
            await booking.save();
        }
        return await payment.populate(["user", "booking"]);
    },
    async getUserPayments(userId) {
        return await payment_model_1.PaymentModel.find({ user: userId })
            .populate("booking")
            .populate("user")
            .sort({ createdAt: -1 });
    },
    async getPaymentByBooking(bookingId) {
        return await payment_model_1.PaymentModel.findOne({ booking: bookingId })
            .populate(["user", "booking"]);
    },
};
//# sourceMappingURL=payment.service.js.map