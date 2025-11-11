import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: "validation failed",
        error: err.error || err.message,
      });
    }
  };
};
export default validateRequest;
