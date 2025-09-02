/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import InternshipTable from "./InternshipTable";
import axios from "axios";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialFormState = {
  name: "",
  contact: "",
  joinDate: "",
  endDate: "",
  isContinuing: false,
  gender: "",
  domain: "",
  type: "",
  payment: "",
  stipend: "", // 💰 Added stipend
};

const InternshipsSection = () => {
  const [internships, setInternships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInternships, setFilteredInternships] = useState([]);
  // 👇 user role le lo redux se
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Fetch all interns
  useEffect(() => {
    const fetchInterns = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/interns");
        setInternships(res.data);
      } catch (err) {
        setError("Failed to fetch internships. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterns();
  }, []);

  // Filter interns by search term
  useEffect(() => {
    const results = internships.filter(
      (intern) =>
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.domain?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInternships(results);
  }, [searchTerm, internships]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => {
      if (name === "isContinuing") {
        return {
          ...prev,
          isContinuing: checked,
          endDate: checked ? "" : prev.endDate, // ✅ empty string for input
        };
      }
      return { ...prev, [name]: value };
    });
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { ...formData };
    if (formData.isContinuing) payload.endDate = null;

    // If unpaid, stipend should be 0
    if (formData.payment === "unpaid") {
      payload.stipend = 0;
    }

    try {
      if (isEditing) {
        const res = await axios.put(
          `http://localhost:5000/api/interns/${formData._id}`,
          payload
        );
        setInternships((prev) =>
          prev.map((intern) =>
            intern._id === res.data._id ? res.data : intern
          )
        );
      } else {
        const res = await axios.post("http://localhost:5000/api/interns", payload);
        setInternships((prev) => [res.data, ...prev]);
      }
      setFormData(initialFormState);
      setIsEditing(false);
      setShowForm(false);
    } catch (err) {
      setError("Failed to save internship. Please check your inputs.");
      console.error("Error saving data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Soft delete intern
  const handleSoftDelete = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/interns/soft-delete/${id}`);
      setInternships((prev) =>
        prev.map((intern) =>
          intern._id === res.data._id ? { ...intern, deleted: true } : intern
        )
      );
    } catch (err) {
      console.log("Failed to soft delete:", err);
    }
  };

  // Edit intern
  const handleEdit = (intern) => {
    setFormData({
      ...intern,
      joinDate: new Date(intern.joinDate).toISOString().split("T")[0],
      endDate: intern.endDate
        ? new Date(intern.endDate).toISOString().split("T")[0]
        : "",
      isContinuing: intern.endDate === null,
      stipend: intern.stipend || "", // ✅ pre-fill stipend
    });

    setIsEditing(true);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-100 min-h-screen">
      <Header />

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mt-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-medium text-gray-800">
              All Internships
            </h2>
            <p className="text-gray-500 text-sm">
              Monitor interns, their contracts and reports.
            </p>
          </div>
          {!showForm && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search intern"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
                onClick={() => setShowForm(true)}
              >
                Register intern
              </button>
            </div>
          )}
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-base md:text-lg font-semibold mb-4">
              {isEditing ? "Edit Intern" : "Register Intern"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                className="p-2 border rounded"
              />
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />

              {!formData.isContinuing && (
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              )}
              <label className="flex items-center gap-2 text-sm col-span-1 md:col-span-2">
                <input
                  type="checkbox"
                  name="isContinuing"
                  checked={formData.isContinuing}
                  onChange={handleChange}
                />
                Still Continuing
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="Domain"
                className="p-2 border rounded"
                required
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="internship">Internship</option>
              </select>

              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              >
                <option value="">Select Payment</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>

              {formData.payment === "paid" && (
                <input
                  type="number"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  placeholder="Enter monthly stipend"
                  className="p-2 border rounded"
                  required
                />
              )}

              <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full sm:w-auto"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        {!loading && !error && !showForm && (
          <div className="overflow-x-auto">
            <InternshipTable
              data={filteredInternships}
              onEdit={handleEdit}
              onSoftDelete={handleSoftDelete}
            />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {error}
          </div>
        )}
        {loading && <div className="text-center text-gray-500 mt-4">Loading...</div>}
      </div>

      <div className="mt-4">
        <button
          onClick={() =>
            user?.role === "superadmin"
              ? navigate("/superadmin-dashboard")
              : navigate("/admin-dashboard")
          }
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default InternshipsSection;
