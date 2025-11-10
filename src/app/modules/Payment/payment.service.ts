import { sslcommerz } from "../../config/sslcommerz";
import { PaymentModel } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { BookingModel } from "../Booking/booking.model";
import { v4 as uuidv4 } from "uuid";

export const PaymentService = {
  async createSSLSession(bookingId: string, userEmail: string, userPhone: string) {
    const booking = await BookingModel.findById(bookingId).populate(["bus", "user"]);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "pending") throw new Error("Booking already processed");

    // Check existing payment
    const existingPayment = await PaymentModel.findOne({ 
      booking: bookingId, 
      paymentStatus: { $in: [PAYMENT_STATUS.SUCCESS, PAYMENT_STATUS.PENDING] }
    });
    if (existingPayment) {
      throw new Error("Payment already exists for this booking");
    }

    const tran_id = `BUS-${Date.now()}-${uuidv4().slice(0, 8)}`;

    const data = {
      total_amount: booking.totalFare,
      currency: "BDT",
      tran_id,
      success_url: `${process.env.SSL_SUCCESS_BACKEND_URL}?tran_id=${tran_id}`,
      fail_url: `${process.env.SSL_FAIL_BACKEND_URL}?tran_id=${tran_id}`,
      cancel_url: `${process.env.SSL_CANCEL_BACKEND_URL}?tran_id=${tran_id}`,
      ipn_url: process.env.SSL_IPN_URL,
      shipping_method: "NO",
      product_name: `Bus Ticket - ${(booking.bus as any).busName}`,
      product_category: "Transportation",
      product_profile: "general",
      cus_name: (booking.user as any).name || "Customer",
      cus_email: userEmail,
      cus_add1: (booking.user as any).address || "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: userPhone,
      ship_name: (booking.user as any).name || "Customer",
      ship_add1: (booking.user as any).address || "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
    };

    // ✅ এখানে instance এর init method call
    const sslResponse = await sslcommerz.init(data);

    if (sslResponse.status !== "SUCCESS") throw new Error("SSL payment init failed");

    await PaymentModel.create({
      user: booking.user,
      booking: bookingId,
      amount: booking.totalFare,
      transactionId: tran_id,
      paymentMethod: "sslcommerz",
      paymentStatus: PAYMENT_STATUS.PENDING,
      sslSessionId: tran_id,
      gatewayData: sslResponse,
    });

    return { paymentUrl: sslResponse.GatewayPageURL, sessionId: tran_id };
  },

  async verifySSLPayment(tran_id: string, val_id: string) {
    const validation = await sslcommerz.validate({ val_id });
    if (validation.status !== "VALID") throw new Error("Payment validation failed");

    const payment = await PaymentModel.findOne({ sslSessionId: tran_id });
    if (!payment) throw new Error("Payment not found");

    payment.paymentStatus = PAYMENT_STATUS.SUCCESS;
    payment.transactionId = val_id;
    payment.gatewayData = validation;
    await payment.save();

    const booking = await BookingModel.findById(payment.booking);
    if (booking) {
      booking.status = "confirmed";
      await booking.save();
    }

    return payment;
  },

  async handleSSLSuccess(tran_id: string) {
    const payment = await PaymentModel.findOne({ sslSessionId: tran_id });
    if (!payment) throw new Error('Payment record not found');
    
    // Prevent duplicate success processing
    if (payment.paymentStatus === PAYMENT_STATUS.SUCCESS) {
      return await payment.populate(["user", "booking"]);
    }

    // Update payment status to success
    payment.paymentStatus = PAYMENT_STATUS.SUCCESS;
    payment.transactionId = tran_id;
    await payment.save();

    // Update booking status
    const booking = await BookingModel.findById(payment.booking);
    if (booking) {
      booking.status = "confirmed";
      await booking.save();
    }

    return await payment.populate(["user", "booking"]);
  },

  async handleSSLFailure(tran_id: string) {
    const payment = await PaymentModel.findOne({ sslSessionId: tran_id });
    if (payment) {
      payment.paymentStatus = PAYMENT_STATUS.FAILED;
      await payment.save();
    }
    return payment;
  },

  async getUserPayments(userId: string) {
    return await PaymentModel.find({ user: userId }).populate(["user", "booking"]).sort({ createdAt: -1 });
  },

  async getAllPayments() {
    return await PaymentModel.find().populate(["user", "booking"]).sort({ createdAt: -1 });
  },
};
