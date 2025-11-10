import { Types } from "mongoose";

export type TPayment = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  booking: Types.ObjectId;
  amount: number;
  transactionId: string;
  paymentMethod: "stripe" | "cash";
  paymentStatus: "pending" | "success" | "failed" | "refunded";
  paymentDate?: Date;
  stripeSessionId?: string;
};
