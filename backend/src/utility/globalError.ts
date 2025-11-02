import { Request, Response, NextFunction } from "express";
import apiError from "./error";
const globalErrorHandler = (err: unknown, req: Request, res: Response , next:NextFunction) => {
  if (err instanceof apiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
   
  res.status(500).json({
    success: false,
    message: (err as any).message || "Something went wrong",
  });
};

export default globalErrorHandler;