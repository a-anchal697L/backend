import express from "express";
import userRoutes from "./routes/user.routes"
import taskRoutes from "./routes/task.routes"
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(express.json());


// use routes
app.use("/api/auth", userRoutes);
app.use("/api", taskRoutes);
app.use(errorHandler);


export default app; 
