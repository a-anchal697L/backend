"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const mongoose_1 = require("mongoose");
const task_1 = require("../models/task");
const error_1 = require("../utils/error");
const task_status_1 = require("../utils/task-status");
class TaskService {
    // Create a new task
    async createTask(taskData, userId) {
        const { title, description, status, deadline } = taskData;
        if (!title || title.trim() === "") {
            throw new error_1.ErrorHandler("Task title is required", 400);
        }
        if (!deadline) {
            throw new error_1.ErrorHandler("Deadline is required", 400);
        }
        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate.getTime())) {
            throw new error_1.ErrorHandler("Invalid deadline format", 400);
        }
        // prevent past deadlines
        if (deadlineDate < new Date()) {
            throw new error_1.ErrorHandler("Deadline cannot be in the past", 400);
        }
        // Validate status (optional enum check)
        if (status && !Object.values(task_status_1.TASK_STATUS).includes(status)) {
            throw new error_1.ErrorHandler(`Invalid status value. Allowed: ${Object.values(task_status_1.TASK_STATUS).join(", ")}`, 400);
        }
        const newTask = await task_1.TaskModel.create({
            title: title.trim(),
            description: description?.trim(),
            status: status || task_status_1.TASK_STATUS.PENDING,
            deadline: deadlineDate,
            user: userId,
        });
        return newTask;
    }
    // Get all tasks for logged-in user
    async getUserTasks(userId, query) {
        if (!userId) {
            throw new error_1.ErrorHandler("User ID is required", 400);
        }
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            throw new error_1.ErrorHandler("Invalid User ID format", 400);
        }
        const tasks = await task_1.TaskModel.find({ user: userId });
        return {
            tasks
        };
    }
    // Update a task
    async updateTask(taskId, userId, updates) {
        if (!taskId || taskId.trim() === "") {
            throw new error_1.ErrorHandler("Task ID is required", 400);
        }
        if (!userId) {
            throw new error_1.ErrorHandler("User ID is required", 400);
        }
        if (!(0, mongoose_1.isValidObjectId)(taskId)) {
            throw new error_1.ErrorHandler("Invalid Task ID format", 400);
        }
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            throw new error_1.ErrorHandler("Invalid User ID format", 400);
        }
        const allowedUpdates = ["title", "description", "status", "deadline"];
        const updateKeys = Object.keys(updates);
        if (updateKeys.length === 0) {
            throw new error_1.ErrorHandler("No fields provided for update", 400);
        }
        const isValidOperation = updateKeys.every((key) => allowedUpdates.includes(key));
        if (!isValidOperation) {
            throw new error_1.ErrorHandler("Invalid field(s) in update", 400);
        }
        if (updates.title !== undefined && updates.title.trim() === "") {
            throw new error_1.ErrorHandler("Task title cannot be empty", 400);
        }
        if (updates.deadline && isNaN(new Date(updates.deadline).getTime())) {
            throw new error_1.ErrorHandler("Invalid deadline date", 400);
        }
        const task = await task_1.TaskModel.findOneAndUpdate({ _id: taskId, user: userId }, updates, { new: true, runValidators: true });
        if (!task) {
            throw new error_1.ErrorHandler("Task not found or access denied", 404);
        }
        return task;
    }
    // Delete a task
    async deleteTask(taskId, userId) {
        if (!taskId || taskId.trim() === "") {
            throw new error_1.ErrorHandler("Task ID is required", 400);
        }
        if (!userId) {
            throw new error_1.ErrorHandler("User ID is required", 400);
        }
        if (!(0, mongoose_1.isValidObjectId)(taskId)) {
            throw new error_1.ErrorHandler("Invalid Task ID format", 400);
        }
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            throw new error_1.ErrorHandler("Invalid User ID format", 400);
        }
        let task = await task_1.TaskModel.findById(taskId);
        if (!task) {
            throw new error_1.ErrorHandler("Task not found", 404);
        }
        // Verify task ownership
        if (task.user.toString() !== userId.toString()) {
            throw new error_1.ErrorHandler("Access denied — you can only delete your own tasks", 403);
        }
        task = await task_1.TaskModel.findOneAndDelete({ _id: taskId, user: userId });
        return {
            message: "Task deleted successfully",
            deletedTaskId: taskId,
        };
    }
}
exports.TaskService = TaskService;
