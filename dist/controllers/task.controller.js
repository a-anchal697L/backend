"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const taskService = new task_service_1.TaskService();
class TaskController {
    // Create Task
    async createTask(req, res) {
        const userId = req.user._id; // from auth middleware
        const task = await taskService.createTask(req.body, userId);
        res.status(201).json({ success: true, task });
    }
    // Get User Tasks
    async getUserTasks(req, res) {
        const userId = req.user._id; // from auth middleware
        const result = await taskService.getUserTasks(userId, req.query);
        res.status(200).json(result);
    }
    // ✏️ Update Task
    async updateTask(req, res) {
        const userId = req.user._id;
        const { id } = req.params;
        const task = await taskService.updateTask(id, userId, req.body);
        res.status(200).json({ success: true, task });
    }
    // Delete Task
    async deleteTask(req, res) {
        const userId = req.user._id;
        const { id } = req.params;
        const result = await taskService.deleteTask(id, userId);
        res.status(200).json({ success: true, ...result });
    }
}
exports.TaskController = TaskController;
