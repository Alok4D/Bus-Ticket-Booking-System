"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// /api/v1
router.post("/register", user_controller_1.UserControllers.createUser);
router.get("/all-users", 
// checkAuth(Role.ADMIN),
user_controller_1.UserControllers.getAllUsers);
exports.UserRoutes = router;
