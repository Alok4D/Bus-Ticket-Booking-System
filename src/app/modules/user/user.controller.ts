import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("User", req.body)
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};



const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    res.status(httpStatus.OK).json({
        success: true,
        message: "All Users Retrieved Successfully",
        data: result
    })

}


export const UserControllers = {
    createUser,
    getAllUsers
}
