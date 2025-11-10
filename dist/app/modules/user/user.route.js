"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_interface_1 = require("./user.interface");
const checkAuth_1 = require("../../middleware/checkAuth");
const router = (0, express_1.Router)();
// /api/v1
router.post("/register", user_controller_1.UserControllers.createUser);
router.get("/all-users", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.getAllUsers);
exports.UserRoutes = router;
//# sourceMappingURL=user.route.js.map