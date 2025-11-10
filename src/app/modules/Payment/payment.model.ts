import { model, Schema } from "mongoose";
import { IPayment, PAYMENT_STATUS } from "./payment.interface";

const paymentSchema = new Schema<IPayment>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["sslcommerz", "cash"], default: "sslcommerz" },
  paymentStatus: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.PENDING },
  sslSessionId: { type: String },
  gatewayData: { type: Schema.Types.Mixed },
  paymentDate: { type: Date, default: Date.now },
}, { timestamps: true, versionKey: false });

export const PaymentModel = model<IPayment>("Payment", paymentSchema);
