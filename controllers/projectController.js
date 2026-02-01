import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const {title, description} = req.body;
    const userId = req.user._id;

    const project = await Project.create({
      title,
      description,
      user: userId,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const getProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    const projects = await Project.find({user: userId}).sort({createdAt: -1});

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const updateProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const {projectId} = req.params;
    const {title, description} = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({message: "project not found"});
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({message: "Unauthorized"});
    }
    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
