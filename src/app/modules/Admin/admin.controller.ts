import { Request, Response } from "express";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";
import { AdminService } from "./admin.service";
import { StatusCodes } from "http-status-codes";

/**
 * Admin Login
 * POST /api/admin/login
 */
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const adminData = await AdminService.login({ email, password });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Admin logged in successfully",
    data: adminData,
  });
});

/**
 * Create Admin
 * POST /api/admin/create
 */
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  const adminData = await AdminService.createAdmin({ name, email, password, phone });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Admin created successfully",
    data: adminData,
  });
});

/**
 * Dashboard Summary
 * GET /api/admin/summary
 */
const getDashboardSummary = catchAsync(async (req: Request, res: Response) => {
  const summary = await AdminService.getDashboardSummary();
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Dashboard summary retrieved successfully",
    data: summary,
  });
});

/**
 * User Management
 * POST /api/admin/manage-user
 */
const manageUser = catchAsync(async (req: Request, res: Response) => {
  const { userId, action } = req.body;

  const result = await AdminService.manageUser({ userId, action });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result.message,
    data: result,
  });
});

/**
 * Get All Users
 * GET /api/admin/users
 */
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await AdminService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users retrieved successfully",
    data: users,
  });
});

/**
 * Get All Bookings
 * GET /api/admin/bookings
 */
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await AdminService.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

/**
 * Payment Reports
 * GET /api/admin/payment-reports
 */
const getPaymentReports = catchAsync(async (req: Request, res: Response) => {
  const reports = await AdminService.getPaymentReports();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Payment reports retrieved successfully",
    data: reports,
  });
});

export const AdminController = {
  login,
  createAdmin,
  getDashboardSummary,
  manageUser,
  getAllUsers,
  getAllBookings,
  getPaymentReports,
};