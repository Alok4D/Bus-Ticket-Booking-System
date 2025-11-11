"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const booking_model_1 = require("./booking.model");
const bus_model_1 = require("../Bus/bus.model");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
exports.BookingService = {
    async createBooking(payload) {
        const { user, bus, seats, journeyDate } = payload;
        if (!mongoose_1.default.Types.ObjectId.isValid(user))
            throw new Error("Invalid user ID format");
        if (!mongoose_1.default.Types.ObjectId.isValid(bus))
            throw new Error("Invalid bus ID format");
        const userExists = await user_model_1.User.findById(user);
        if (!userExists)
            throw new Error("User not found");
        const busExists = await bus_model_1.BusModel.findById(bus);
        if (!busExists)
            throw new Error("Bus not found");
        const invalidSeat = seats.find((seat) => seat < 1 || seat > busExists.totalSeats);
        if (invalidSeat)
            throw new Error(`Invalid seat number: ${invalidSeat}`);
        const existingBookings = await booking_model_1.BookingModel.find({
            bus,
            journeyDate,
            status: { $ne: "cancelled" },
        });
        const alreadyBookedSeats = existingBookings.flatMap((b) => b.seats);
        const conflictSeat = seats.find((seat) => alreadyBookedSeats.includes(seat));
        if (conflictSeat)
            throw new Error(`Seat ${conflictSeat} is already booked`);
        const totalFare = busExists.fare * seats.length;
        const booking = await booking_model_1.BookingModel.create({
            user,
            bus,
            seats,
            journeyDate,
            totalFare,
            status: "pending",
        });
        busExists.availableSeats -= seats.length;
        await busExists.save();
        return await booking.populate(["user", "bus"]);
    },
    async getAllBookings() {
        return booking_model_1.BookingModel.find().populate("user").populate("bus");
    },
    async getSingleBooking(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            throw new Error("Invalid Booking ID");
        const booking = await booking_model_1.BookingModel.findById(id)
            .populate("user")
            .populate("bus");
        if (!booking)
            throw new Error("Booking not found");
        return booking;
    },
    async updateBookingStatus(id, status) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            throw new Error("Invalid Booking ID");
        const booking = await booking_model_1.BookingModel.findById(id);
        if (!booking)
            throw new Error("Booking not found");
        booking.status = status;
        await booking.save();
        return booking.populate(["user", "bus"]);
    },
    async getUserBookings(userId) {
        const bookings = await booking_model_1.BookingModel.find({ user: new mongoose_1.default.Types.ObjectId(userId) })
            .populate("bus")
            .populate("user");
        return bookings;
    }
};
