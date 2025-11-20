import { Router } from "express";
import { RouteController } from "./route.controller";

import {
  createRouteSchema,
  updateRouteSchema,
} from "./route.validation";

import { Role } from "../user/user.interface";
import { checkAuth } from "../../middleware/checkAuth";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

/**
 * Public:
 *   GET /api/v1/routes
 *   GET /api/v1/routes/:id
 *
 * Admin-only:
 *   POST /api/v1/routes
 *   PUT /api/v1/routes/:id
 *   DELETE /api/v1/routes/:id
 */

// Public routes
router.get("/", RouteController.getAllRoutes);
router.get("/:id",  RouteController.getSingleRoute);

// Admin only routes
router.post(
  "/create-route",
  checkAuth(Role.ADMIN),
  validateRequest(createRouteSchema),
  RouteController.createRoute
);

router.put(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateRouteSchema),
  RouteController.updateRoute
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  RouteController.deleteRoute
);

export const RouteRoutes = router;
