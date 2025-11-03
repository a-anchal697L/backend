"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const mongoose_1 = require("mongoose");
const task_status_1 = require("../utils/task-status");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
        type: String,
        enum: {
            values: Object.values(task_status_1.TASK_STATUS),
            message: "Status must be one of: Pending, In Progress, or Done",
        },
        default: task_status_1.TASK_STATUS.PENDING,
    },
    deadline: {
        type: Date,
        required: [true, "Deadline is required"],
        validate: {
            validator: function (value) {
                // Ensure deadline is in the future
                return value.getTime() > Date.now();
            },
            message: "Deadline must be a future date",
        },
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"],
    },
}, { timestamps: true });
exports.TaskModel = (0, mongoose_1.model)("Task", taskSchema);
