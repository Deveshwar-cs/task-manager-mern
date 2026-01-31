import express from "express";
import {createTask} from "../controllers/taskController.js";
import protect from "../middleware/protect.js";

const router = express.Router();
router.post("/createTask/:projectId", protect, createTask);

export default router;
