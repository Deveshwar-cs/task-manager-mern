import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

/* ---------------------------------- */
/* ✅ CORS SETUP FOR VERCEL + LOCAL  */
/* ---------------------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-frontend-rho-eight.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

/* ---------------------------------- */
/* ✅ ROUTES                         */
/* ---------------------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* ---------------------------------- */
/* ✅ RENDER PORT (VERY IMPORTANT)   */
/* ---------------------------------- */

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
