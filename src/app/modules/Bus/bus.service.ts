import { Types } from "mongoose";
import { BusModel } from "./bus.model";
import { Route } from "../route/route.model";
import { TBus } from "./bus.interface";

const createBus = async (payload: TBus) => {
  // Check if route field is provided
  if (!payload.route) {
    throw new Error('Route ID is required');
  }
  
  // Check if route exists in database
  const routeExists = await Route.findOne({ _id: payload.route });
  if (!routeExists) {
    throw new Error(`Route with ID ${payload.route} not found in database`);
  }

  // Check if bus number already exists
  const existingBus = await BusModel.findOne({ busNumber: payload.busNumber });
  if (existingBus) {
    throw new Error(`Bus with number ${payload.busNumber} already exists`);
  }

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

const updateBus = async (id: string, payload: Partial<TBus>) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid bus id");
  
  // If route is being updated, validate it
  if (payload.route) {
    const routeExists = await Route.findOne({ _id: payload.route });
    if (!routeExists) {
      throw new Error(`Route with ID ${payload.route} not found in database`);
    }
  }
  
  // If bus number is being updated, check for duplicates
  if (payload.busNumber) {
    const existingBus = await BusModel.findOne({ 
      busNumber: payload.busNumber,
      _id: { $ne: id } // Exclude current bus
    });
    if (existingBus) {
      throw new Error(`Bus with number ${payload.busNumber} already exists`);
    }
  }
  
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
