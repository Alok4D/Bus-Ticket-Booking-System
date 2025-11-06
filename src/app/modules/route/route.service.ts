import { Route } from "./route.model";
import { Types } from "mongoose";

const createRoute = async (payload: { origin: string; destination: string; distance: number }) => {
  const route = await Route.create(payload);
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
