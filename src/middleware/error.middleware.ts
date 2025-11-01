import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

   //  Handle Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e: any) => e.message);

    return res.status(statusCode).json({
      success: false,
      message: "Mongoose Validation Error",
      errors,
    });
  }

   // Handle Mongoose CastError (Invalid ObjectId, etc.)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle MongoDB Duplicate Key Error
  if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value: ${field} already exists`;
  }

  // Send default structured error
  res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack
  });
};

