// src/components/AdminPage.jsx
import React from 'react';
import useAuth from '../hooks/useAuth';

const AdminPage = () => {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    return <h1>Access Denied: You are not an admin.</h1>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {user.name}. Here you can manage users.</p>
    </div>
  );
};

export default AdminPage;
