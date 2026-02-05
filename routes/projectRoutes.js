import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProjects,
} from "../controllers/projectController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/addProject", protect, createProject);
router.get("/getProjects", protect, getProjects);
router.put("/updateProject/:projectId", protect, updateProjects);
router.delete("/deleteProject/:projectId", protect, deleteProject);

export default router;
