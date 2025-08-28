import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Charts = ({ interns }) => {
  if (!interns.length) return <p>No data available</p>;

  // 🔹 This Month Interns
  const currentMonth = new Date().getMonth();
  const monthlyInterns = interns.filter(
    (i) => new Date(i.startDate).getMonth() === currentMonth
  ).length;

  // 🔹 Training vs Internship
  const trainingCount = interns.filter((i) => i.type === "training").length;
  const internshipCount = interns.filter((i) => i.type === "internship").length;

  // 🔹 Tech Distribution
  const techGroups = interns.reduce((acc, intern) => {
    acc[intern.technology] = (acc[intern.technology] || 0) + 1;
    return acc;
  }, {});

  const techData = Object.entries(techGroups).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* This Month Count */}
      <div className="bg-white shadow p-4 rounded-lg text-center">
        <h2 className="font-semibold mb-2">Interns Joined This Month</h2>
        <p className="text-3xl font-bold">{monthlyInterns}</p>
      </div>

      {/* Training vs Internship */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Training vs Internship</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: "Training", value: trainingCount },
              { name: "Internship", value: internshipCount },
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Technology Distribution */}
      <div className="bg-white shadow p-4 rounded-lg col-span-1 md:col-span-2">
        <h2 className="font-semibold mb-2">Technology Distribution</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={techData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {techData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"][index % 4]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
