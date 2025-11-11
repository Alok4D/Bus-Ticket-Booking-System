"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const router = (0, express_1.Router)();
// Public routes
router.post("/login", (0, validateRequest_1.default)(admin_validation_1.adminLoginValidation), admin_controller_1.AdminController.login);
// Protected routes - Admin only
router.post("/create", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(admin_validation_1.adminCreateValidation), admin_controller_1.AdminController.createAdmin);
router.get("/summary", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), admin_controller_1.AdminController.getDashboardSummary);
router.post("/manage-user", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.default)(admin_validation_1.userManagementValidation), admin_controller_1.AdminController.manageUser);
router.get("/users", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), admin_controller_1.AdminController.getAllUsers);
router.get("/bookings", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), admin_controller_1.AdminController.getAllBookings);
router.get("/payment-reports", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), admin_controller_1.AdminController.getPaymentReports);
exports.AdminRoutes = router;
