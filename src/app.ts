import express from "express";
import userRoutes from "./routes/user.routes"
import taskRoutes from "./routes/task.routes"
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());


// use routes
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);


export default app; 
