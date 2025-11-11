"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoutes = void 0;
const express_1 = require("express");
const bus_controller_1 = require("./bus.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const bus_validation_1 = require("./bus.validation");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.get("/", bus_controller_1.BusController.getAllBuses);
router.get("/:id", bus_controller_1.BusController.getSingleBus);
router.post("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(bus_validation_1.createBusSchema), bus_controller_1.BusController.createBus);
router.put("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(bus_validation_1.updateBusSchema), bus_controller_1.BusController.updateBus);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), bus_controller_1.BusController.deleteBus);
exports.BusRoutes = router;
