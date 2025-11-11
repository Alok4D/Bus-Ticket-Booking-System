"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = require("../middleware/checkAuth");
const user_interface_1 = require("../modules/user/user.interface");
const router = (0, express_1.Router)();
// Public routes
router.post("/login", auth_controller_1.AuthControllers.credentialsLogin);
router.post("/refresh-token", auth_controller_1.AuthControllers.refreshToken);
router.post("/forgot-password", auth_controller_1.AuthControllers.forgotPassword);
router.post("/reset-password", auth_controller_1.AuthControllers.resetPassword);
router.get("/verify-reset-token/:token", auth_controller_1.AuthControllers.verifyResetToken);
// Protected routes
router.post("/logout", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), auth_controller_1.AuthControllers.logout);
router.post("/logout-all", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), auth_controller_1.AuthControllers.logoutAll);
exports.AuthRoutes = router;
