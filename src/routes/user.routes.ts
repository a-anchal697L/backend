import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();
const userController = new UserController();

// Create user (Sign up)
router.post("/signup", asyncHandler(async (req:Request, res:Response) => userController.createUser(req, res)));
// Login
router.post("/login", asyncHandler((req:Request, res:Response) => userController.loginUser(req, res)));

export default router;
