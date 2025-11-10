import { Types } from "mongoose";

export type TBooking = {
  _id?: Types.ObjectId;
  user: Types.ObjectId; // user reference
  bus: Types.ObjectId; // bus reference
  seats: number[]; // array of seat numbers
  journeyDate: Date; // journey date
  totalFare: number; // calculated fare
  status?: "pending" | "confirmed" | "cancelled";
};
