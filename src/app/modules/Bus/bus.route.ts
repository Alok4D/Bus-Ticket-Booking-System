import { Router } from "express";
import { BusController } from "./bus.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createBusSchema,
  updateBusSchema,
  getBusSchema,
  deleteBusSchema,
} from "./bus.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

// Public routes
router.get("/", BusController.getAllBuses);
router.get("/:id", BusController.getSingleBus);

// Admin-only routes
router.post(
  "/",
  checkAuth(Role.ADMIN),
  validateRequest(createBusSchema),
  BusController.createBus
);

router.put(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateBusSchema),
  BusController.updateBus
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  BusController.deleteBus
);

export const BusRoutes = router;
