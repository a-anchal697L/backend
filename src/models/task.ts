import { Schema, model } from "mongoose";
import { ITask } from "../types/task";
import { TASK_STATUS } from "../utils/task-status";


const taskSchema = new Schema<ITask>(
  {
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
        values: Object.values(TASK_STATUS),
        message: "Status must be one of: Pending, In Progress, or Done",
      },
      default: TASK_STATUS.PENDING,
    },

    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
      validate: {
        validator: function (value: Date) {
          // Ensure deadline is in the future
          return value.getTime() > Date.now();
        },
        message: "Deadline must be a future date",
      },
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
  },
  { timestamps: true }
);

export const TaskModel = model<ITask>("Task", taskSchema);
