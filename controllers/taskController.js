import Project from "../models/Project.js";
import Task from "../models/Task.js";
export const createTask = async (req, res) => {
  try {
    const {title, description, dueDate} = req.body;
    const {projectId} = req.params;
    const userId = req.user._id;

    if (!title) {
      return res.status(400).json({message: "Title is required"});
    }

    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({message: "Project not found!"});
    }

    const task = await Task.create({
      title: title,
      description: description,
      dueDate: dueDate,
      project: projectId,
      user: userId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
