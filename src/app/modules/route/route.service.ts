import { Route } from "./route.model";
import { Types } from "mongoose";

const createRoute = async (payload: { origin?: string; destination?: string; distance?: number }) => {
  // ✅ Step 1: Basic validation check
  if (!payload.origin || !payload.destination) {
    throw new Error("Origin and Destination are required");
  }

  // ✅ Step 2: Convert to lowercase safely
  const origin = payload.origin.toLowerCase().trim();
  const destination = payload.destination.toLowerCase().trim();

  // ✅ Step 3: Check if route already exists
  const existingRoute = await Route.findOne({ origin, destination });

  if (existingRoute) {
    throw new Error(`Route from ${payload.origin} to ${payload.destination} already exists`);
  }

  // ✅ Step 4: Create new route
  const route = await Route.create({
    origin,
    destination,
    distance: payload.distance,
  });

  return route;
};


const getAllRoutes = async () => {
  const routes = await Route.find({});
  const total = await Route.countDocuments();
  return {
    meta: { total },
    data: routes,
  };
};

const getSingleRoute = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid route id");
  const route = await Route.findById(id);
  if (!route) throw new Error("Route not found");
  return route;
};

const updateRoute = async (id: string, payload: Partial<{ origin: string; destination: string; distance: number }>) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid route id");
  const updated = await Route.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!updated) throw new Error("Route not found");
  return updated;
};

const deleteRoute = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid route id");
  const deleted = await Route.findByIdAndDelete(id);
  if (!deleted) throw new Error("Route not found");
  return deleted;
};

export const RouteService = {
  createRoute,
  getAllRoutes,
  getSingleRoute,
  updateRoute,
  deleteRoute,
};
