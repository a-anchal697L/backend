import { Request, Response, NextFunction } from "express";

// Wrap async route handlers to avoid repetitive try/catch
export const asyncHandler = (fn: any) =>(req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
