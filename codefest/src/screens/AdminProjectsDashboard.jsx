import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CommandBar,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  Text,
  Modal,
  TextField,
  Checkbox,
} from "@fluentui/react";
import { useAuth } from "../context/AuthContext";

const AdminProjectsDashboard = () => {
  const { workspaceId } = useParams();
  const { getWorkspaceById, adminProjects, fetchProjects, createProject } = useAuth();
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const workspace = await getWorkspaceById(workspaceId);
        setWorkspaceName(workspace.workspaceName);
        await fetchProjects(workspaceId);
      } catch (error) {
        setErrorMessage("Error fetching workspace or projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [getWorkspaceById, workspaceId, fetchProjects]);

  const handleCreateProject = async () => {
    if (newProjectName) {
      try {
        await createProject(newProjectName, workspaceId, isChecked ? "teamLeadId" : null);
        await fetchProjects(workspaceId);
        setNewProjectName("");
        setIsModalOpen(false);
      } catch (error) {
        setErrorMessage("Error creating project. Please try again.");
      }
    }
  };

  const commandBarItems = [
    {
      key: 'newProject',
      text: 'Create Project',
      iconProps: { iconName: 'Add' },
      onClick: () => setIsModalOpen(true),
    },
  ];

  return (
    <div>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Text variant="xxLarge">Admin Projects Dashboard</Text>
        <CommandBar items={commandBarItems} />
      </Stack>

      {errorMessage && (
        <MessageBar
          messageBarType={MessageBarType.error}
          onDismiss={() => setErrorMessage(null)}
        >
          {errorMessage}
        </MessageBar>
      )}

      <Text variant="large">{workspaceName}</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : adminProjects.length > 0 ? (
        <div>
          <h2>Projects</h2>
          <Stack tokens={{ childrenGap: 10 }}>
            {adminProjects.map((project) => (
              <Stack
                key={project._id}
                styles={{
                  root: {
                    border: "1px solid #ddd",
                    padding: "10px",
                    borderRadius: "4px",
                  },
                }}
              >
                <Text variant="large">{project.projectName}</Text>
                <Text variant="small">
                  Created on: {new Date(project.dateCreated).toLocaleDateString()}
                </Text>
              </Stack>
            ))}
          </Stack>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <MessageBar messageBarType={MessageBarType.info}>
            No projects available for this workspace.
          </MessageBar>
          <PrimaryButton text="Create Your First Project" onClick={() => setIsModalOpen(true)} />
        </div>
      )}

      {/* Modal for Creating a Project */}
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
      >
        <div style={{ padding: "20px" }}>
          <Text variant="xLarge">Create a New Project</Text>
          <TextField
            label="Project Name"
            value={newProjectName}
            onChange={(e, newValue) => setNewProjectName(newValue || "")}
          />
          <Checkbox
            label="Assign a Team Lead"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }} style={{ marginTop: "20px" }}>
            <PrimaryButton text="Create Project" onClick={handleCreateProject} />
            <PrimaryButton text="Cancel" onClick={() => setIsModalOpen(false)} />
          </Stack>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProjectsDashboard;
