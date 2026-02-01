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

export const getTaskByProject = async (req, res) => {
  try {
    const {projectId} = req.params;

    const tasks = await Task.find({
      project: projectId,
      user: req.user._id,
    }).sort({createdAt: -1});

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const {taskId} = req.params;
    const {status} = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({message: "Task not found"});
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({message: "Unauthorized"});
    }
    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const deleteTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({message: "Task not found"});
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({message: "unauthorized"});
    }

    await task.deleteOne();
    res.json({message: "Task deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const updateTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const {title, description, dueDate} = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({message: "Task not found"});
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({message: "Unauthorized"});
    }
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = description;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
