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
    // ✅ Create booking
    createBooking(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, bus, seats, journeyDate } = payload;
            if (!mongoose_1.default.Types.ObjectId.isValid(user))
                throw new Error("Invalid user ID format");
            if (!mongoose_1.default.Types.ObjectId.isValid(bus))
                throw new Error("Invalid bus ID format");
            const userExists = yield user_model_1.User.findById(user);
            if (!userExists)
                throw new Error("User not found");
            const busExists = yield bus_model_1.BusModel.findById(bus);
            if (!busExists)
                throw new Error("Bus not found");
            const invalidSeat = seats.find((seat) => seat < 1 || seat > busExists.totalSeats);
            if (invalidSeat)
                throw new Error(`Invalid seat number: ${invalidSeat}`);
            const existingBookings = yield booking_model_1.BookingModel.find({
                bus,
                journeyDate,
                status: { $ne: "cancelled" },
            });
            const alreadyBookedSeats = existingBookings.flatMap((b) => b.seats);
            const conflictSeat = seats.find((seat) => alreadyBookedSeats.includes(seat));
            if (conflictSeat)
                throw new Error(`Seat ${conflictSeat} is already booked`);
            const totalFare = busExists.fare * seats.length;
            const booking = yield booking_model_1.BookingModel.create({
                user,
                bus,
                seats,
                journeyDate,
                totalFare,
                status: "pending",
            });
            busExists.availableSeats -= seats.length;
            yield busExists.save();
            return yield booking.populate(["user", "bus"]);
        });
    },
    // ✅ Get all bookings (Admin)
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            return booking_model_1.BookingModel.find().populate("user").populate("bus");
        });
    },
    // ✅ Get single booking
    getSingleBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id))
                throw new Error("Invalid Booking ID");
            const booking = yield booking_model_1.BookingModel.findById(id)
                .populate("user")
                .populate("bus");
            if (!booking)
                throw new Error("Booking not found");
            return booking;
        });
    },
    // ✅ Update booking status (Admin)
    updateBookingStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id))
                throw new Error("Invalid Booking ID");
            const booking = yield booking_model_1.BookingModel.findById(id);
            if (!booking)
                throw new Error("Booking not found");
            booking.status = status;
            yield booking.save();
            return booking.populate(["user", "bus"]);
        });
    },
    // 🔥 Get bookings for logged-in user
    getUserBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield booking_model_1.BookingModel.find({ user: new mongoose_1.default.Types.ObjectId(userId) })
                .populate("bus")
                .populate("user");
            return bookings;
        });
    }
};
