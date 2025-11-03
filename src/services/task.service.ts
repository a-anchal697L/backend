import { isValidObjectId } from "mongoose";
import { TaskModel } from "../models/task";
import { ITask } from "../types/task";
import { ErrorHandler } from "../utils/error";
import { TASK_STATUS } from "../utils/task-status";

export class TaskService {
    
  // Create a new task
 async createTask(taskData: ITask, userId: string) {
    const { title, description, status, deadline } = taskData;

    if (!title || title.trim() === "") {
      throw new ErrorHandler("Task title is required", 400);
    }
    if (!deadline) {
      throw new ErrorHandler("Deadline is required", 400);
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      throw new ErrorHandler("Invalid deadline format", 400);
    }

    // prevent past deadlines
    if (deadlineDate < new Date()) {
      throw new ErrorHandler("Deadline cannot be in the past", 400);
    }

    // Validate status (optional enum check)
    if (status && !Object.values(TASK_STATUS).includes(status)) {
      throw new ErrorHandler(`Invalid status value. Allowed: ${Object.values(TASK_STATUS).join(", ")}`, 400);
    }

    const newTask = await TaskModel.create({
      title: title.trim(),
      description: description?.trim(),
      status: status || TASK_STATUS.PENDING,
      deadline: deadlineDate,
      user: userId,
    });

    return newTask;
  }


  // Get all tasks for logged-in user
  async getUserTasks(userId: string, query: any) {
    if (!userId) {
      throw new ErrorHandler("User ID is required", 400);
    }
    if (!isValidObjectId(userId)) {
      throw new ErrorHandler("Invalid User ID format", 400);
    }
     const tasks = await TaskModel.find({ user: userId })
    return {
      tasks
    };
   
  }


  // Update a task
   async updateTask(taskId: string, userId: string, updates: Partial<ITask>) {

    if (!taskId || taskId.trim() === "") {
      throw new ErrorHandler("Task ID is required", 400);
    }
    if (!userId) {
      throw new ErrorHandler("User ID is required", 400);
    }
    if (!isValidObjectId(taskId)) {
      throw new ErrorHandler("Invalid Task ID format", 400);
    }
    if (!isValidObjectId(userId)) {
      throw new ErrorHandler("Invalid User ID format", 400);
    }

    const allowedUpdates = ["title", "description", "status", "deadline"];
    const updateKeys = Object.keys(updates);

    if (updateKeys.length === 0) {
      throw new ErrorHandler("No fields provided for update", 400);
    }

    const isValidOperation = updateKeys.every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isValidOperation) {
      throw new ErrorHandler("Invalid field(s) in update", 400);
    }

    if (updates.title !== undefined && updates.title.trim() === "") {
      throw new ErrorHandler("Task title cannot be empty", 400);
    }

    if (updates.deadline && isNaN(new Date(updates.deadline).getTime())) {
      throw new ErrorHandler("Invalid deadline date", 400);
    }
    const task = await TaskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new ErrorHandler("Task not found or access denied", 404);
    }

    return task;
  }


  // Delete a task
 async deleteTask(taskId: string, userId: string) {

    if (!taskId || taskId.trim() === "") {
      throw new ErrorHandler("Task ID is required", 400);
    }
    if (!userId) {
      throw new ErrorHandler("User ID is required", 400);
    }

    if (!isValidObjectId(taskId)) {
      throw new ErrorHandler("Invalid Task ID format", 400);
    }
    if (!isValidObjectId(userId)) {
      throw new ErrorHandler("Invalid User ID format", 400);
    }
    let task = await TaskModel.findById(taskId);

    if (!task) {
      throw new ErrorHandler("Task not found", 404);
    }

    // Verify task ownership
    if (task.user.toString() !== userId.toString()) {
      throw new ErrorHandler("Access denied — you can only delete your own tasks", 403);
    }
    task = await TaskModel.findOneAndDelete({ _id: taskId, user: userId });

    return {
      message: "Task deleted successfully",
      deletedTaskId: taskId,
    };
  }
}
