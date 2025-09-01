/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import TrainingTable from "./TrainingTable";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  name: "",
  contact: "",
  joinDate: "",
  endDate: "",
  isContinuing: false,
  gender: "",
  domain: "",
  type: "training",
  payment: { total: "", paid: "" },
};

const TrainingsSection = () => {
  const [trainings, setTrainings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainings = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/trainings");
        setTrainings(res.data);
      } catch (err) {
        setError("Failed to fetch trainings");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isContinuing") {
      setFormData((prev) => ({
        ...prev,
        isContinuing: checked,
        endDate: checked ? "" : prev.endDate,
      }));
    } else if (["total", "paid"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        payment: { ...prev.payment, [name]: Number(value) },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const res = await axios.put(
          `http://localhost:5000/api/trainings/${formData._id}`,
          formData
        );
        setTrainings((prev) =>
          prev.map((t) => (t._id === res.data._id ? res.data : t))
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/trainings",
          formData
        );
        setTrainings((prev) => [res.data, ...prev]);
      }
      setFormData(initialFormState);
      setShowForm(false);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save training");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (training) => {
    setFormData({
      ...training,
      joinDate: new Date(training.joinDate).toISOString().split("T")[0],
      endDate: training.endDate
        ? new Date(training.endDate).toISOString().split("T")[0]
        : "",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSoftDelete = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/trainings/soft-delete/${id}`
      );
      setTrainings((prev) =>
        prev.map((t) => (t._id === res.data._id ? res.data : t))
      );
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const filteredTrainings = trainings.filter(
    (t) =>
      !t.deleted &&
      (t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.domain.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <Header />

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">All Trainings</h2>
            <p className="text-gray-500 text-sm">
              Track students training progress & fees
            </p>
          </div>
          {!showForm && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search student"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Register Training
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            {!formData.isContinuing && (
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            )}
            <label className="flex items-center gap-2 col-span-1 md:col-span-2">
              <input
                type="checkbox"
                name="isContinuing"
                checked={formData.isContinuing}
                onChange={handleChange}
              />{" "}
              Still Continuing
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="text"
              name="domain"
              placeholder="Domain"
              value={formData.domain}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="number"
              name="total"
              placeholder="Total Fees"
              value={formData.payment.total}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="paid"
              placeholder="Paid Fees"
              value={formData.payment.paid}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            {/* Buttons */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </form>
        )}

        {/* Table */}
        {!loading && !error && !showForm && (
          <TrainingTable
            data={filteredTrainings}
            onEdit={handleEdit}
            onSoftDelete={handleSoftDelete}
          />
        )}
      </div>

      {/* Back button */}
      <div className="mt-4">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TrainingsSection;
