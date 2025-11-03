"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const auth_1 = require("../middleware/auth");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = express_1.default.Router();
const taskController = new task_controller_1.TaskController();
router.post("/", auth_1.isAuthenticated, (0, asyncHandler_1.asyncHandler)((req, res) => taskController.createTask(req, res)));
router.get("/", auth_1.isAuthenticated, (0, asyncHandler_1.asyncHandler)((req, res) => taskController.getUserTasks(req, res)));
router.put("/:id", auth_1.isAuthenticated, (0, asyncHandler_1.asyncHandler)((req, res) => taskController.updateTask(req, res)));
router.delete("/:id", auth_1.isAuthenticated, (0, asyncHandler_1.asyncHandler)((req, res) => taskController.deleteTask(req, res)));
exports.default = router;
