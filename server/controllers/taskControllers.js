import Task from "../models/task.js";

const assignTask = async (req, res) => {
  const { taskName, description, projectId, assignedTo } =
    req.body;

  try {
    // Create a new task and assign it to a project member
    const task = new Task({
      taskName,
      description,
      projectId,
      assignedTo,
    });

    await task.save();
    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all tasks in a project by team lead
const getAllTasksInProject = async (req, res) => {
  const { projectId } = req.body;

  try {
    const tasks = await Task.find({ projectId }).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all tasks assigned to a user forspecific project
const getTasksByUser = async (req, res) => {
  const { projectId, userId } = req.body;

  try {
    const tasks = await Task.find({ projectId, assignedTo: userId }).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get task by id
const getTaskById = async (req, res) => {
  const { taskId } = req.body;

  try {
    const task = await Task.findById(taskId).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update task status
const updateTaskStatus = async (req, res) => {
  const { taskId, taskStatus } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { taskStatus },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update task estimated time
const updateTaskEstimatedTime = async (req, res) => {
  const { taskId, estimatedTime } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { estimatedTime },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
  assignTask,
  getAllTasksInProject,
  getTasksByUser,
  getTaskById,
  updateTaskStatus,
  updateTaskEstimatedTime,
};