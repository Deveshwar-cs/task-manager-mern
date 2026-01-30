import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: ["http://locahost:5173", "http://your-frontend.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
