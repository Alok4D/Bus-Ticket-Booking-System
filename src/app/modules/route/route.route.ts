import { Router } from "express";
import { RouteController } from "./route.controller";

import { createRouteSchema, updateRouteSchema, getRouteSchema, deleteRouteSchema } from "./route.validation";

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

// create route (admin)
router.post(
  "/create-route",
  // checkAuth(Role.ADMIN),
   validateRequest(createRouteSchema),
 // cast if your validateRequest expects ZodObject<any, any>
  RouteController.createRoute
);

// get all routes (public)
router.get("/", RouteController.getAllRoutes);

// get single route (public)
router.get("/routes/:id",  RouteController.getSingleRoute);

// update route (admin)
router.put(
  "/routes/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateRouteSchema as any),
  RouteController.updateRoute
);

// delete route (admin)
router.delete(
  "/routes/:id",
  checkAuth(Role.ADMIN),
  validateRequest(deleteRouteSchema as any),
  RouteController.deleteRoute
);

export const RouteRoutes = router;
