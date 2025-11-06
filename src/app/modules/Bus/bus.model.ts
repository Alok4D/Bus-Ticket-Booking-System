// src/modules/bus/bus.model.ts
import mongoose from "mongoose";
import { TBus } from "./bus.interface";


const busSchema = new mongoose.Schema<TBus>(
  {
    busName: { type: String, required: true },
    busNumber: { type: String, required: true, unique: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    fare: { type: Number, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const BusModel = mongoose.model<TBus>("Bus", busSchema)


