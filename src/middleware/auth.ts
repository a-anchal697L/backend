import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error";
import { UserModel } from "../models/user";


interface AuthRequest extends Request {
  user?: any;
}

export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
     else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }
    req.user = user;

    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      next(new ErrorHandler("Invalid token", 401));
    } else if (error.name === "TokenExpiredError") {
      next(new ErrorHandler("Token expired, please login again", 401));
    } else {
      next(error);
    }
  }
};
