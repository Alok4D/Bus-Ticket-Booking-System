import { stripe } from "../../config/stripe";
import { BookingModel } from "../Booking/booking.model";
import { PaymentModel } from "./payment.model";

export const PaymentService = {
  async createStripeSession(bookingId: string, userEmail: string) {
    const booking = await BookingModel.findById(bookingId).populate("bus");
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "pending") throw new Error("Booking already processed");

    const bus = booking.bus as any;
    const session = await stripe.checkout.sessions.create({
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
    await PaymentModel.create({
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

  async verifyPayment(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    const payment = await PaymentModel.findOne({ stripeSessionId: sessionId });
    if (!payment) throw new Error("Payment record not found");

    // Update payment status
    payment.paymentStatus = "success";
    payment.transactionId = session.payment_intent as string;
    await payment.save();

    // Update booking status
    const booking = await BookingModel.findById(payment.booking);
    if (booking) {
      booking.status = "confirmed";
      await booking.save();
    }

    return await payment.populate(["user", "booking"]);
  },

  async getUserPayments(userId: string) {
    return await PaymentModel.find({ user: userId })
      .populate("booking")
      .populate("user")
      .sort({ createdAt: -1 });
  },

  async getPaymentByBooking(bookingId: string) {
    return await PaymentModel.findOne({ booking: bookingId })
      .populate(["user", "booking"]);
  },
};
