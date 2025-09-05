import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaUserPlus, FaTrashAlt, FaSpinner } from "react-icons/fa";

export default function ManageAdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/auth/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (err) {
      setError("Failed to fetch admins. Please try again.");
      console.error("❌ Error fetching admins:", err.response?.data || err);
    } finally {
      setIsLoading(false);
    }
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      setError("Please fill out all fields.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post("http://localhost:5000/api/auth/create-admin", newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewAdmin({ name: "", email: "", password: "" });
      setSuccess("Admin added successfully!");
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add admin.");
      console.error("❌ Error adding admin:", err.response?.data || err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`http://localhost:5000/api/auth/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Admin deleted successfully!");
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete admin.");
      console.error("❌ Error deleting admin:", err.response?.data || err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-6">
        <Header />
        <div className="max-w-5xl mx-auto mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
            Manage Admins
          </h1>

          {/* User Feedback */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 text-sm sm:text-base" role="alert">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 text-sm sm:text-base" role="alert">
              <p>{success}</p>
            </div>
          )}

          {/* Add Admin Form */}
          <form
            onSubmit={addAdmin}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 p-4 sm:p-6 border border-gray-200 rounded-lg"
          >
            <input
              type="text"
              placeholder="Name"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
            <input
              type="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <FaUserPlus />
                  <span>Add Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Admins List Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr key={admin._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{admin.name}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500">{admin.email}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => deleteAdmin(admin._id)}
                          disabled={isLoading}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-medium disabled:opacity-50 text-sm sm:text-base"
                        >
                          <FaTrashAlt />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500 text-sm sm:text-base">
                      No admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
