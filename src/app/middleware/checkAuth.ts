import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/envVars";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      const verifiedToken = jwt.verify(
        token,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });
      if (!isUserExist) {
        return res
          .status(401)
          .json({ success: false, message: "User does not exist" });
      }

      if (!authRoles.includes(verifiedToken.role)) {
        return res
          .status(403)
          .json({
            success: false,
            message: "You are not permitted to view this route",
          });
      }

      req.user = verifiedToken;
      next();
    } catch (error: any) {
      console.error(error);
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
  };
