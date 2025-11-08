import { Types } from "mongoose";
import { BusModel } from "./bus.model";

const createBus = async (payload: any) => {
  const bus = await BusModel.create(payload);
  return bus;
};

const getAllBuses = async () => {
  const buses = await BusModel.find().populate("route");
  const total = await BusModel.countDocuments();
  return { meta: { total }, data: buses };
};

const getSingleBus = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid bus id");
  const bus = await BusModel.findById(id).populate("route");
  if (!bus) throw new Error("Bus not found");
  return bus;
};

const updateBus = async (id: string, payload: Partial<any>) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid bus id");
  const updated = await BusModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Bus not found");
  return updated;
};

const deleteBus = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid bus id");
  const deleted = await BusModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Bus not found");
  return deleted;
};

export const BusService = {
  createBus,
  getAllBuses,
  getSingleBus,
  updateBus,
  deleteBus,
};
