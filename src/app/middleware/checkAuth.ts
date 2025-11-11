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
      console.log("Received token:", token);

      const verifiedToken = jwt.verify(
        token,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
      console.log("Verified token:", verifiedToken);

      const isUserExist = await User.findById(verifiedToken.userId);
      console.log("User found:", isUserExist?.email, "Role:", isUserExist?.role);
      
      if (!isUserExist) {
        return res
          .status(401)
          .json({ success: false, message: "User does not exist" });
      }

      if (isUserExist.isBlocked) {
        return res
          .status(403)
          .json({ success: false, message: "Account is blocked" });
      }

      console.log("Required roles:", authRoles);
      console.log("User role:", verifiedToken.role);
      
      if (!authRoles.includes(verifiedToken.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not permitted to access this route",
        });
      }

      req.user = isUserExist;
      next();
    } catch (error: any) {
      console.error("Auth error:", error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: "Token has expired. Please login again" 
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid token format" 
        });
      }
      
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
  };
