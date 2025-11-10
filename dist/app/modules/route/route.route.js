"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRoutes = void 0;
const express_1 = require("express");
const route_controller_1 = require("./route.controller");
const route_validation_1 = require("./route.validation");
const user_interface_1 = require("../user/user.interface");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = (0, express_1.Router)();
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
router.post("/create-route", 
// checkAuth(Role.ADMIN),
(0, validateRequest_1.default)(route_validation_1.createRouteSchema), 
// cast if your validateRequest expects ZodObject<any, any>
route_controller_1.RouteController.createRoute);
// get all routes (public)
router.get("/", route_controller_1.RouteController.getAllRoutes);
// get single route (public)
router.get("/routes/:id", route_controller_1.RouteController.getSingleRoute);
// update route (admin)
router.put("/routes/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(route_validation_1.updateRouteSchema), route_controller_1.RouteController.updateRoute);
// delete route (admin)
router.delete("/routes/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(route_validation_1.deleteRouteSchema), route_controller_1.RouteController.deleteRoute);
exports.RouteRoutes = router;
//# sourceMappingURL=route.route.js.map