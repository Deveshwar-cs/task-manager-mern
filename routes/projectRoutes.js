import express from "express";
import {createProject, getProjects} from "../controllers/projectController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/addProject", protect, createProject);
router.get("/getProjects", protect, getProjects);

export default router;
