import express from "express";
import {
  assignTask,
  getAllTasksInProject,
  getTasksByUser,
  getTaskById,
  updateTaskStatus,
  updateTaskEstimatedTime,
} from "../controllers/taskControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// assign task
router.post("/assigntask", protect, assignTask);
// get all tasks in project
router.get("/getalltasksinproject", protect, getAllTasksInProject);
// get tasks by user
router.get("/gettasksbyuser", protect, getTasksByUser);
// get task by id
router.get("/gettaskbyid", protect, getTaskById);
// update task status
router.put("/updatetaskstatus", protect, updateTaskStatus);
// update task estimated time
router.put("/updatetaskestimatedtime", protect, updateTaskEstimatedTime);

export default router;
