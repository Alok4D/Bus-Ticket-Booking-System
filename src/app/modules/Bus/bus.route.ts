import { Router } from "express";
import { BusController } from "./bus.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import {
  createBusSchema,
  updateBusSchema,
  getBusSchema,
  deleteBusSchema,
} from "./bus.validation";

const router = Router();

// Admin-only
router.post(
  "/",
  //   checkAuth(Role.ADMIN),
  validateRequest(createBusSchema),
  BusController.createBus
);
router.put(
  "/:id",
  //   checkAuth(Role.ADMIN),
  validateRequest(updateBusSchema),
  BusController.updateBus
);
router.delete(
  "/:id",
  //   checkAuth(Role.ADMIN),
  validateRequest(deleteBusSchema),
  BusController.deleteBus
);

// Public
router.get("/", BusController.getAllBuses);
router.get(
  "/:id",
  // validateRequest(getBusSchema),
  BusController.getSingleBus
);

export const BusRoutes = router;
