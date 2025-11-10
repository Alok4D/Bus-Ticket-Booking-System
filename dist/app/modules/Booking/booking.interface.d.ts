import { Types } from "mongoose";
export type TBooking = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    bus: Types.ObjectId;
    seats: number[];
    journeyDate: Date;
    totalFare: number;
    status?: "pending" | "confirmed" | "cancelled";
};
//# sourceMappingURL=booking.interface.d.ts.map