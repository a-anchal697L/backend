import { Types } from "mongoose";
import { TASK_STATUS } from "../utils/task-status";


export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  status?: TASK_STATUS;
  deadline: Date;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
