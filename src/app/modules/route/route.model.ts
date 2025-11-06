import { Schema, model } from "mongoose";
import { IRoute } from "./route.interface";



const routeSchema = new Schema<IRoute>(
  {
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Route = model<IRoute>("Route", routeSchema);
