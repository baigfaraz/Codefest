import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjectsByAdmin,
  getAllProjectsByTeamLead,
  assignUsersToProject,
  getProjectsByUser,
  getProjectMembers,
} from "../controllers/projectController.js";
import getWorkspaceUsers from "../controllers/workspaceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
// create a project by admin
router.post("/createproject", protect, admin, createProject);
// delete a project by admin
router.delete("/deleteproject", protect, admin, deleteProject);
// get all projects by admin
router.get("/getallprojectsbyadmin", protect, admin, getAllProjectsByAdmin);
// get all projects by team lead
router.get("/getallprojectsbyteamlead", protect, getAllProjectsByTeamLead);
// assign users to project
router.post("/assignuserstoproject", protect, assignUsersToProject);
// get all projects by user
router.get("/getprojectsbyuser", protect, getProjectsByUser);
// get all project members
router.get("/getprojectmembers", protect, getProjectMembers);

export default router;
