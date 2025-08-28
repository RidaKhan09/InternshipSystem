/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Charts from "../pages/charts/Charts";
import InternshipsSection from "../pages/InternshipTable/InternshipsSection";
import Header from "../components/Header"; // 👈 import Header

const Dashboard = () => {
  const [interns, setInterns] = useState([]);
  const [showInternships, setShowInternships] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/interns");
        setInterns(res.data);
      } catch (err) {
        console.error("Error fetching interns:", err);
      }
    };
    fetchInterns();
  }, []);

  if (showInternships) {
    return <InternshipsSection />;
  }

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      {/* ✅ Header (now reusable across pages) */}
      <Header />

      {/* Charts */}
      <Charts interns={interns} />

      {/* Buttons */}
      <div className="mt-10 flex gap-4">
      <button
        onClick={() => navigate("/internships")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Internships
      </button>
        <button
          onClick={() => navigate("/training")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Training
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
