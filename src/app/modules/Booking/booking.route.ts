import { Router } from "express";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middleware/validateRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import {
  createBookingSchema,
  getBookingSchema,
  updateBookingStatusSchema,
} from "./booking.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.USER),
  validateRequest(createBookingSchema),
  BookingController.createBooking
);

router.get(
  "/my-booking",
  checkAuth(Role.USER),
  BookingController.getUserBookings
);

router.get(
  "/",
  checkAuth(Role.ADMIN),
  BookingController.getAllBookings
);

router.get(
  "/:id",
  validateRequest(getBookingSchema),
  BookingController.getSingleBooking
);

router.put(
  "/:id/status",
  checkAuth(Role.ADMIN),
  validateRequest(updateBookingStatusSchema),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;
