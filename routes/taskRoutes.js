import express from "express";
import {
  createTask,
  getTaskByProject,
  updateTaskStatus,
} from "../controllers/taskController.js";
import protect from "../middleware/protect.js";

const router = express.Router();
router.post("/createTask/:projectId", protect, createTask);
router.get("/getTasks/:projectId", protect, getTaskByProject);
router.put("/updateStatus/:taskId", protect, updateTaskStatus);

export default router;
