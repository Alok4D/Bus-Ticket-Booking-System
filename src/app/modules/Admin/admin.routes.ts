import { Router } from "express";
import { AdminController } from "./admin.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import { adminLoginValidation, adminCreateValidation, userManagementValidation } from "./admin.validation";

const router = Router();

// Public routes
router.post("/login", validateRequest(adminLoginValidation), AdminController.login);

// Protected routes - Admin only
router.post("/create", 
  checkAuth(Role.ADMIN), 
  validateRequest(adminCreateValidation), 
  AdminController.createAdmin
);

router.get("/summary", 
  checkAuth(Role.ADMIN), 
  AdminController.getDashboardSummary
);

router.post("/manage-user", 
  checkAuth(Role.ADMIN), 
  validateRequest(userManagementValidation), 
  AdminController.manageUser
);

router.get("/users", 
  checkAuth(Role.ADMIN), 
  AdminController.getAllUsers
);

router.get("/bookings", 
  checkAuth(Role.ADMIN), 
  AdminController.getAllBookings
);

router.get("/payment-reports", 
  checkAuth(Role.ADMIN), 
  AdminController.getPaymentReports
);

export const AdminRoutes = router;