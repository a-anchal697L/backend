import express, { Request, Response } from "express";
import { TaskController } from "../controllers/task.controller";
import { isAuthenticated } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();
const taskController = new TaskController();

router.post("/", isAuthenticated, asyncHandler((req: Request, res: Response) => taskController.createTask(req, res)));
router.get("/", isAuthenticated, asyncHandler((req: Request, res: Response) => taskController.getUserTasks(req, res)));
router.put("/:id", isAuthenticated, asyncHandler((req: Request, res: Response) => taskController.updateTask(req, res)));
router.delete("/:id", isAuthenticated, asyncHandler((req: Request, res: Response) => taskController.deleteTask(req, res)));

export default router;

