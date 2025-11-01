import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








// npm run build
// node dist/server.js

