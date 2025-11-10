import {  Router } from "express";
import { UserControllers } from "./user.controller";

import { Role } from "./user.interface";
import { checkAuth } from "../../middleware/checkAuth";


const router = Router();

// /api/v1

router.post("/register", UserControllers.createUser);
router.get("/all-users", 
    // checkAuth(Role.ADMIN),
     UserControllers.getAllUsers);

export const UserRoutes = router;
