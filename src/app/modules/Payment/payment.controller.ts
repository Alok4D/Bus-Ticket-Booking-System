import { Request, Response } from "express";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";
import { PaymentService } from "./payment.service";
import { StatusCodes } from "http-status-codes";

export const PaymentController = {
  createCheckoutSession: catchAsync(async (req: Request, res: Response) => {
    const { bookingId } = req.body;
    const userEmail = req.user?.email;
    if (!userEmail) throw new Error("User email not found");

    const session = await PaymentService.createStripeSession(bookingId, userEmail);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Stripe checkout session created successfully",
      data: { sessionId: session.id, url: session.url },
    });
  }),

  verifyPayment: catchAsync(async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    const payment = await PaymentService.verifyPayment(sessionId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Payment verified and booking confirmed",
      data: payment,
    });
  }),

  getUserPayments: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const payments = await PaymentService.getUserPayments(userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Payment history retrieved successfully",
      data: payments,
    });
  }),

  getPaymentByBooking: catchAsync(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const payment = await PaymentService.getPaymentByBooking(bookingId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: payment ? "Payment found" : "No payment found for this booking",
      data: payment,
    });
  }),
};
