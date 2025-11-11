import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { RouteService } from "./route.service";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";


/**
 * POST /api/v1/routes
 * Admin only
 */
const createRoute = catchAsync(async (req, res) => {
  // ✅ Fix: যদি validateRequest middleware এ schema তে "body" আছে
  // তাহলে req.body.body থেকে data নিতে হবে
  const payload = req.body.body;

  const route = await RouteService.createRoute(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Route created successfully",
    data: route,
  });
});


/**
 * GET /api/v1/routes
 */
const getAllRoutes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await RouteService.getAllRoutes();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Routes retrieved successfully",
    data: result,
  });
});

/**
 * GET /api/v1/routes/:id
 */
const getSingleRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const route = await RouteService.getSingleRoute(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Route retrieved successfully",
    data: route,
  });
});

/**
 * PUT /api/v1/routes/:id
 * Admin only
 */
const updateRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const payload = req.body;
  const updated = await RouteService.updateRoute(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Route updated successfully",
    data: updated,
  });
});

/**
 * DELETE /api/v1/routes/:id
 * Admin only
 */
const deleteRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const deleted = await RouteService.deleteRoute(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Route deleted successfully",
    data: deleted,
  });
});

export const RouteController = {
  createRoute,
  getAllRoutes,
  getSingleRoute,
  updateRoute,
  deleteRoute,
};
