import express from "express";
import {createTask, getTaskByProject} from "../controllers/taskController.js";
import protect from "../middleware/protect.js";

const router = express.Router();
router.post("/createTask/:projectId", protect, createTask);
router.get("/getTasks/:projectId", protect, getTaskByProject);

export default router;
