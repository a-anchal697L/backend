import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong. Please try again later.";

  // --- Handle Mongoose Validation Error ---
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e: any) => e.message);

    return res.status(statusCode).json({
      success: false,
      errorType: "ValidationError",
      message: "One or more fields are invalid.",
      errors,
    });
  }

  // --- Handle Mongoose CastError (e.g., invalid ObjectId) ---
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid value for '${err.path}': '${err.value}'.`;
  }

  // --- Handle MongoDB Duplicate Key Error ---
  if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `The ${field} '${err.keyValue[field]}' is already in use. Please use another one.`;
  }

  // --- JWT / Auth Related Errors (optional) ---
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid or expired authentication token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your session has expired. Please log in again.";
  }

  // --- Custom Application Errors ---
  if (err.isCustomError) {
    statusCode = err.statusCode || 400;
    message = err.message;
  }

  // --- Log full error details in dev mode ---
  if (process.env.NODE_ENV !== "production") {
    console.error("Error:", err);
  }

  // --- Final structured response ---
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
