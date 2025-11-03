"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// use routes
app.use("/api/auth", user_routes_1.default);
app.use("/api/tasks", task_routes_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
