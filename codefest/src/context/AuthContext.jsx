import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STRINGS } from "../utils/strings";

// Create AuthContext
export const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminWorkspaces, setAdminWorkspaces] = useState([]);
  const [adminProjects, setAdminProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        return data;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Register function
  const register = async (username, email, password, role) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        return data;
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Fetch admin workspaces
  const fetchAdminWorkspaces = async () => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/workspaces/getworkspaces`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setAdminWorkspaces(data);
      } else {
        throw new Error(data.message || "Failed to fetch workspaces");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create workspace
  const createWorkspace = async (workspaceName) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/workspaces/createworkspace`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ workspaceName }),
      });
      const data = await response.json();

      if (response.ok) {
        await fetchAdminWorkspaces(); // Refresh workspace list
      } else {
        throw new Error(data.message || "Workspace creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      return []; // Return empty array on error
    }
  };

  // Add users to workspace
  const addUsersToWorkspace = async (workspaceId, userIds) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/workspaces/addUsersToWorkspace`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ workspaceId, userIds }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to add users to workspace");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get workspace by ID
  const getWorkspaceById = async (workspaceId) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/workspaces/getworkspacebyid?workspaceId=${workspaceId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || "Failed to fetch workspace");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  // Create project
  const createProject = async (projectName, workspaceId, teamLeadId) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/projects/createproject`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ projectName, workspaceId, teamLeadId }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Project creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all projects by admin
  const fetchProjects = async (workspaceId) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/projects/getallprojectsbyadmin`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ workspaceId }),
      });
      const data = await response.json();

      if (response.ok) {
        setAdminProjects(data);
      } else {
        throw new Error(data.message || "Failed to fetch projects");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch workspace users of specific workspace
  const fetchWorkspaceUsersOfSpecificWorkSpace = async (workspaceId) => {
    try {
      const response = await fetch(`${STRINGS.BASE_URL}/workspaces/getworkspaceusersofspecificworkspace`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ workspaceId }),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || "Failed to fetch workspace users");
      }
    } catch (error) {
      console.error(error);
      return []; // Return empty array on error
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Check user role function
  const checkUserRole = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser).role;
    }
    return null;
  };

  // Provide user, login, logout, register, checkUserRole functions to the children components
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        checkUserRole,
        adminWorkspaces,
        setAdminWorkspaces,
        fetchAdminWorkspaces,
        createWorkspace,
        fetchUsers,
        addUsersToWorkspace,
        getWorkspaceById,
        createProject,
        fetchProjects,
        fetchWorkspaceUsersOfSpecificWorkSpace,
        adminProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
