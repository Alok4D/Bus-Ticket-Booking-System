import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";

const credentialsLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginInfo = await AuthServices.credentialsLogin(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "User logged in successfully!",
      data: {
        accessToken: loginInfo.accessToken,
        user: loginInfo.user,
      },
    });
  } catch (error: any) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const AuthControllers = {
  credentialsLogin,
};
