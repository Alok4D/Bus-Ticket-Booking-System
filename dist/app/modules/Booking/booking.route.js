"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.post("/create", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), (0, validateRequest_1.default)(booking_validation_1.createBookingSchema), booking_controller_1.BookingController.createBooking);
router.get("/my-booking", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), booking_controller_1.BookingController.getUserBookings);
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), booking_controller_1.BookingController.getAllBookings);
router.get("/:id", (0, validateRequest_1.default)(booking_validation_1.getBookingSchema), booking_controller_1.BookingController.getSingleBooking);
router.put("/:id/status", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(booking_validation_1.updateBookingStatusSchema), booking_controller_1.BookingController.updateBookingStatus);
exports.BookingRoutes = router;
//# sourceMappingURL=booking.route.js.map