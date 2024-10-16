// controllers/workspaceController.js
import Workspace from "../models/workspace.js";
import WorkspaceUser from "../models/workspaceUser.js";

// Create a new workspace
const createWorkspace = async (req, res) => {
  const { workspaceName } = req.body;
  const adminId = req.user._id;

  try {
    const workspace = new Workspace({ workspaceName, adminId });
    await workspace.save();

    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add users to workspace
const addUsersToWorkspace = async (req, res) => {
    const { workspaceId, userIds } = req.body;  // Expecting userIds to be an array of user IDs
  
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of user IDs' });
    }
  
    try {
      // Create an array of objects to insert into the WorkspaceUser collection
      const workspaceUsers = userIds.map(userId => ({
        workspaceId,
        userId
      }));
  
      // Use insertMany to add multiple users at once
      await WorkspaceUser.insertMany(workspaceUsers);
  
      res.status(201).json({ message: 'Users successfully added to the workspace', workspaceUsers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// remove user from workspace
const removeUserFromWorkspace = async (req, res) => {
  const { workspaceId, userId } = req.body;
  try {
    await WorkspaceUser.deleteOne({ workspaceId, userId });
    res
      .status(201)
      .json({ message: "User removed from workspace", userId: userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all workspaces
const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find();
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete workspace
const deleteWorkspace = async (req, res) => {
  const { workspaceId } = req.body;
  try {
    await Workspace.deleteOne({ _id: workspaceId });
    await WorkspaceUser.deleteMany({ workspaceId });
    res
      .status(201)
      .json({ message: "Workspace deleted", workspaceId: workspaceId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all workspaces by workspaceId where userId is present
// Get all workspaces by userId
const getWorkspacesOfUser = async (req, res) => {
  const userId = req.user._id; // Assuming user is authenticated and their id is in req.user

  try {
    // Find all records in WorkspaceUser where the userId matches
    const workspaceUsers = await WorkspaceUser.find({ userId });

    // Extract all workspaceIds from the workspaceUser records
    const workspaceIds = workspaceUsers.map(
      (workspaceUser) => workspaceUser.workspaceId
    );

    // Find all workspaces that match the workspaceIds
    const workspaces = await Workspace.find({ _id: { $in: workspaceIds } });

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get all WorkspaceUser
const getWorkspaceUsers = async (req, res) => {
  try {
    const workspaceUsers = await WorkspaceUser.find();
    res.status(200).json(workspaceUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createWorkspace,
  addUsersToWorkspace,
  getWorkspaces,
  removeUserFromWorkspace,
  deleteWorkspace,
  getWorkspacesOfUser,
  getWorkspaceUsers,
};
