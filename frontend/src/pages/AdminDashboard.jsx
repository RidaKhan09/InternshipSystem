import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;