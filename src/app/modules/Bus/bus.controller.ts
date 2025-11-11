import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utlis/catchAsync";
import { BusService } from "./bus.service";
import sendResponse from "../../utlis/sendResponse";
import { StatusCodes } from "http-status-codes";


const createBus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bus = await BusService.createBus(req.body.body);
  sendResponse(res, { statusCode: StatusCodes.CREATED, success: true, message: "Bus created successfully", data: bus });
});

const getAllBuses = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await BusService.getAllBuses();
  sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "Buses retrieved", data: result });
});

const getSingleBus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bus = await BusService.getSingleBus(req.params.id);
  sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "Bus retrieved", data: bus });
});

const updateBus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bus = await BusService.updateBus(req.params.id, req.body.body || req.body);
  sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "Bus updated", data: bus });
});

const deleteBus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bus = await BusService.deleteBus(req.params.id);
  sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "Bus deleted", data: bus });
});

export const BusController = { createBus, getAllBuses, getSingleBus, updateBus, deleteBus };
