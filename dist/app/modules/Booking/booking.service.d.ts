import { TBooking } from "./booking.interface";
import mongoose from "mongoose";
export declare const BookingService: {
    createBooking(payload: TBooking): Promise<Omit<mongoose.Document<unknown, {}, TBooking, {}, {}> & TBooking & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    getAllBookings(): Promise<(mongoose.Document<unknown, {}, TBooking, {}, {}> & TBooking & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getSingleBooking(id: string): Promise<mongoose.Document<unknown, {}, TBooking, {}, {}> & TBooking & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateBookingStatus(id: string, status: string): Promise<Omit<mongoose.Document<unknown, {}, TBooking, {}, {}> & TBooking & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    getUserBookings(userId: string): Promise<(mongoose.Document<unknown, {}, TBooking, {}, {}> & TBooking & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=booking.service.d.ts.map