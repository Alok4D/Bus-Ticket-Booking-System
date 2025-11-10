import { BookingModel } from "./booking.model";
import { BusModel } from "../Bus/bus.model";
import { TBooking } from "./booking.interface";
import mongoose from "mongoose";
import { User } from "../user/user.model";

export const BookingService = {
  // ✅ Create booking
  async createBooking(payload: TBooking) {
    const { user, bus, seats, journeyDate } = payload;

    if (!mongoose.Types.ObjectId.isValid(user))
      throw new Error("Invalid user ID format");
    if (!mongoose.Types.ObjectId.isValid(bus))
      throw new Error("Invalid bus ID format");

    const userExists = await User.findById(user);
    if (!userExists) throw new Error("User not found");

    const busExists = await BusModel.findById(bus);
    if (!busExists) throw new Error("Bus not found");

    const invalidSeat = seats.find(
      (seat) => seat < 1 || seat > busExists.totalSeats
    );
    if (invalidSeat) throw new Error(`Invalid seat number: ${invalidSeat}`);

    const existingBookings = await BookingModel.find({
      bus,
      journeyDate,
      status: { $ne: "cancelled" },
    });

    const alreadyBookedSeats = existingBookings.flatMap((b) => b.seats);
    const conflictSeat = seats.find((seat) =>
      alreadyBookedSeats.includes(seat)
    );
    if (conflictSeat) throw new Error(`Seat ${conflictSeat} is already booked`);

    const totalFare = busExists.fare * seats.length;

    const booking = await BookingModel.create({
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

  // ✅ Get all bookings (Admin)
  async getAllBookings() {
    return BookingModel.find().populate("user").populate("bus");
  },

  // ✅ Get single booking
  async getSingleBooking(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Invalid Booking ID");
    const booking = await BookingModel.findById(id)
      .populate("user")
      .populate("bus");
    if (!booking) throw new Error("Booking not found");
    return booking;
  },

  // ✅ Update booking status (Admin)
  async updateBookingStatus(id: string, status: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Invalid Booking ID");
    const booking = await BookingModel.findById(id);
    if (!booking) throw new Error("Booking not found");
    booking.status = status as TBooking["status"];
    await booking.save();
    return booking.populate(["user", "bus"]);
  },

  // 🔥 Get bookings for logged-in user
async getUserBookings(userId: string) {
  const bookings = await BookingModel.find({ user: new mongoose.Types.ObjectId(userId) })
    .populate("bus")
    .populate("user");
  return bookings;
}
};
