import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { ForgotPasswordService } from "./forgotPassword.service";
import catchAsync from "../utlis/catchAsync";
import sendResponse from "../utlis/sendResponse";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.credentialsLogin(req.body);

  // Set refresh token as httpOnly cookie
  res.cookie('refreshToken', loginInfo.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully!",
    data: {
      accessToken: loginInfo.accessToken,
      user: loginInfo.user,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token refreshed successfully!",
    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();
  
  await AuthServices.logout(userId!);
  
  // Clear refresh token cookie
  res.clearCookie('refreshToken');
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged out successfully!",
    data: null,
  });
});

const logoutAll = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();
  
  await AuthServices.logoutAll(userId!);
  
  // Clear refresh token cookie
  res.clearCookie('refreshToken');
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logged out from all devices successfully!",
    data: null,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  
  const result = await ForgotPasswordService.forgotPassword(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  
  const result = await ForgotPasswordService.resetPassword(token, newPassword);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

const verifyResetToken = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params;
  
  const result = await ForgotPasswordService.verifyResetToken(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: { email: result.email },
  });
});

export const AuthControllers = {
  credentialsLogin,
  refreshToken,
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  verifyResetToken,
};