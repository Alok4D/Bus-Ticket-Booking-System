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
router.get("/", route_controller_1.RouteController.getAllRoutes);
router.get("/:id", route_controller_1.RouteController.getSingleRoute);
router.post("/create-route", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(route_validation_1.createRouteSchema), route_controller_1.RouteController.createRoute);
router.put("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(route_validation_1.updateRouteSchema), route_controller_1.RouteController.updateRoute);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), route_controller_1.RouteController.deleteRoute);
exports.RouteRoutes = router;
