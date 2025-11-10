import { Types } from "mongoose";
export type TBus = {
    busName: string;
    busNumber: string;
    route: Types.ObjectId;
    totalSeats: number;
    availableSeats: number;
    fare: number;
    departureTime: string;
    arrivalTime: string;
};
//# sourceMappingURL=bus.interface.d.ts.map