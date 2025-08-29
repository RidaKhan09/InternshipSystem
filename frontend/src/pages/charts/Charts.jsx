import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";

const Charts = () => {
  const [stats, setStats] = useState({
    trainingCount: 0,
    internshipCount: 0,
    totalInterns: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats");
        console.log("Fetched stats:", res.data);
  
        setStats({
          internshipCount: res.data.internshipCount,
          trainingCount: res.data.trainingCount,
          totalInterns: res.data.totalInterns,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);
  
  

  const barData = [
    { name: "Training", value: stats.trainingCount },
    { name: "Internship", value: stats.internshipCount },
  ];
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Stats cards */}
      <div className="bg-white shadow p-6 rounded-lg text-center">
        <h2 className="font-semibold text-lg mb-2">Total Interns</h2>
        <p className="text-4xl font-bold text-indigo-600">{stats.internshipCount}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-lg text-center">
        <h2 className="font-semibold text-lg mb-2">Total Training</h2>
        <p className="text-4xl font-bold text-green-600">{stats.trainingCount}</p>
      </div>

      {/* Training vs Internship Bar Chart */}
      <div className="bg-white shadow p-6 rounded-lg md:col-span-2">
        <h2 className="font-semibold text-lg mb-2">Training vs Internship</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2b7fff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

  
      </div>

   
  );
};

export default Charts;
