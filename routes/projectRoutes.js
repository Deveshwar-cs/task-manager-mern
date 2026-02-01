import express from "express";
import {
  createProject,
  getProjects,
  updateProjects,
} from "../controllers/projectController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/addProject", protect, createProject);
router.get("/getProjects", protect, getProjects);
router.put("/updateProject/:projectId", protect, updateProjects);

export default router;
