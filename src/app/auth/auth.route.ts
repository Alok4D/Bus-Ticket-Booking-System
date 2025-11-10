import express, { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../middleware/checkAuth";
import { Role } from "../modules/user/user.interface";

const router = Router();

// Public routes
router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.refreshToken);
router.post("/forgot-password", AuthControllers.forgotPassword);
router.post("/reset-password", AuthControllers.resetPassword);
router.get("/verify-reset-token/:token", AuthControllers.verifyResetToken);

// Protected routes
router.post("/logout", checkAuth(Role.USER, Role.ADMIN), AuthControllers.logout);
router.post("/logout-all", checkAuth(Role.USER, Role.ADMIN), AuthControllers.logoutAll);

export const AuthRoutes = router;