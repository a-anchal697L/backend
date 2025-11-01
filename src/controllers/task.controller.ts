import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export class TaskController {
  // Create Task
  async createTask(req: Request, res: Response) {
    const userId = (req as any).user._id; // from auth middleware
    const task = await taskService.createTask(req.body, userId);
    res.status(201).json({ success: true, task });
  }

  // Get User Tasks
  async getUserTasks(req: Request, res: Response) {
    const userId = req.user!._id as string ; // from auth middleware
    const result = await taskService.getUserTasks(userId, req.query);
    res.status(200).json(result);
  }


  // ✏️ Update Task
  async updateTask(req: Request, res: Response) {
    const userId = (req as any).user._id;
    const { id } = req.params;
    const task = await taskService.updateTask(id, userId, req.body);
    res.status(200).json({ success: true, task });
  }

  // Delete Task
  async deleteTask(req: Request, res: Response) {
    const userId = (req as any).user._id;
    const { id } = req.params;
    const result = await taskService.deleteTask(id, userId);
    res.status(200).json({ success: true, ...result });
  }
}
