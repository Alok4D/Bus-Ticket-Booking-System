import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
export declare const BookingModel: mongoose.Model<TBooking, {}, {}, {}, mongoose.Document<unknown, {}, TBooking, {}, {}> & TBooking & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=booking.model.d.ts.map