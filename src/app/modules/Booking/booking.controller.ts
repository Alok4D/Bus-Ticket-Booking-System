import { Request, Response } from "express";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";
import { BookingService } from "./booking.service";
import { StatusCodes } from "http-status-codes";

export const BookingController = {
  createBooking: catchAsync(async (req: Request, res: Response) => {
    console.log("Logged-in user:", req.user);

    const result = await BookingService.createBooking(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Booking created successfully",
      data: result,
    });
  }),

  getAllBookings: catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.getAllBookings();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All bookings retrieved successfully",
      data: result,
    });
  }),

  getSingleBooking: catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.getSingleBooking(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Booking retrieved successfully",
      data: result,
    });
  }),

  updateBookingStatus: catchAsync(async (req: Request, res: Response) => {
    const { status } = req.body;
    const result = await BookingService.updateBookingStatus(req.params.id, status);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Booking status updated successfully",
      data: result,
    });
  }),

 getUserBookings: catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const bookings = await BookingService.getUserBookings(userId);

  if (bookings.length === 0) {
    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "No bookings found for this user",
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User bookings retrieved successfully",
    data: bookings,
  });
})

};
