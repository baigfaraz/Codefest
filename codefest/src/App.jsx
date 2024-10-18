import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./screens/AdminDashboard";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import ProjectPage from "./screens/ProjectPage";
import RegisterPage from "./screens/RegisterPage";
import TaskPage from "./screens/TaskPage";
import WorkspacePage from "./screens/WorkspacePage";
import AdminProjectsDashboard from "./screens/AdminProjectsDashboard/";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-projects-dashboard/:workspaceId" element={<AdminProjectsDashboard />}/>
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/workspace" element={<WorkspacePage />} />
            <Route path="/home/workspace/project" element={<ProjectPage />} />
            <Route path="/home/workspace/project/task" element={<TaskPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </FluentProvider>
  );
}

export default App;
