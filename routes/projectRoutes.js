import express from "express";
import {createProject} from "../controllers/projectController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/addProject", protect, createProject);

export default router;
