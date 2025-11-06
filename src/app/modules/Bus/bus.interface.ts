// src/modules/bus/bus.interface.ts
import { Types} from "mongoose";

export type TBus = {
  busName: string;
  busNumber: string;
  route: Types.ObjectId;
  totalSeats: number;       
  availableSeats: number;   // typo fixed
  fare: number;
  departureTime: string;    // use string for time like "10:00 AM"
  arrivalTime: string;      // same as above
};

