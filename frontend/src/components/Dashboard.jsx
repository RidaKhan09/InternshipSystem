/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Charts from "../pages/charts/Charts";
import InternshipsSection from "../pages/InternshipTable/InternshipsSection";
import Header from "../components/Header"; // ✅ Reusable Header

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
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* ✅ Header */}
      <Header />

      {/* Charts Section */}
      <div className="mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-md w-full overflow-x-auto">
        <Charts interns={interns} />
      </div>
    </div>
  );
};

export default Dashboard;
