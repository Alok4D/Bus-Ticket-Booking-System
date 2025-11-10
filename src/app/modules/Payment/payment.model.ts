import mongoose from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new mongoose.Schema<TPayment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true, min: 0 },
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, enum: ["stripe", "cash"], default: "stripe" },
    paymentStatus: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
    paymentDate: { type: Date, default: Date.now },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.model<TPayment>("Payment", paymentSchema);
