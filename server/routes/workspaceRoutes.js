import express from "express";
import {
  createWorkspace,
  addUserToWorkspace,
  getWorkspaces,
  removeUserFromWorkspace,
  deleteWorkspace,
  getWorkspacesOfUser,
  getWorkspaceUsers,
  getWorkspaceUsers,
} from "../controllers/workspaceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
// admin can make a workspace
router.post("/createworkspace", protect, admin, createWorkspace);
// admin can add user to workspace
router.post("/addusertoworkspace", protect, admin, addUserToWorkspace);
// get all workspaces
router.get("/getworkspaces", protect, admin, getWorkspaces);
// admin can remove user from workspace
router.delete(
  "/removeuserfromworkspace",
  protect,
  admin,
  removeUserFromWorkspace
);
// admin can delete workspace
router.delete("/deleteworkspace", protect, admin, deleteWorkspace);
// get all workspaces of user
router.get("/getworkspacesofuser", protect, getWorkspacesOfUser);
// get all workspace users
router.get("/getworkspaceusers", protect, getWorkspaceUsers);

export default router;
