/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaMoneyBillWave,
  FaChartBar,
  FaUserGraduate,
  FaArrowLeft,
} from "react-icons/fa";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const TrainingStatePage = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  const [summary, setSummary] = useState({
    totalExpected: 0,
    totalPaid: 0,
    totalRemaining: 0,
  });

  useEffect(() => {
    const fetchPaidTrainings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trainings/paid");
        const data = res.data.trainings || [];
        setTrainings(data);

        let totalExpected = 0;
        let totalPaid = 0;
        data.forEach((t) => {
          totalExpected += t.payment?.total || 0;
          totalPaid += t.payment?.paid || 0;
        });

        setSummary({
          totalExpected,
          totalPaid,
          totalRemaining: totalExpected - totalPaid,
        });
      } catch (err) {
        console.error("Error fetching paid trainings:", err);
      } finally {
        setLoading(false);
      }
      window.scrollTo(0, 0);
    };

    fetchPaidTrainings();
  }, []);

  const chartData = [
    { name: "Expected", amount: summary.totalExpected, fill: "#3b82f6" },
    { name: "Paid", amount: summary.totalPaid, fill: "#22c55e" },
    { name: "Remaining", amount: summary.totalRemaining, fill: "#ef4444" },
  ];

  const traineesWithRemaining = trainings
    .filter((t) => (t.payment?.total || 0) - (t.payment?.paid || 0) > 0)
    .map((t) => ({
      name: t.name,
      remaining: (t.payment?.total || 0) - (t.payment?.paid || 0),
    }));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
        <Header />
        <div className="p-4 md:p-6 flex-1 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaMoneyBillWave className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              Paid Trainings Report
            </h2>
          </div>

          {!loading && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                      Total Expected
                    </h3>
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <FaMoneyBillWave />
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-gray-900">
                    {summary.totalExpected} PKR
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                      Total Paid
                    </h3>
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <FaMoneyBillWave />
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-gray-900">
                    {summary.totalPaid} PKR
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                      Total Remaining
                    </h3>
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                      <FaMoneyBillWave />
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-gray-900">
                    {summary.totalRemaining} PKR
                  </div>
                </div>
              </div>

              {/* Graph */}
              {/* Graph */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaChartBar className="text-gray-600 h-5 w-5" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Payment Summary
                  </h3>
                </div>
                <div className="w-full h-48 sm:h-60 md:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                      <Bar dataKey="amount" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Trainees with remaining */}
              {traineesWithRemaining.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8 overflow-x-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <FaUserGraduate className="text-gray-600 h-5 w-5" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                      Trainees with Remaining Payments
                    </h3>
                  </div>
                  <table className="w-full text-left border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 font-semibold text-gray-600">#</th>
                        <th className="p-3 font-semibold text-gray-600">
                          Name
                        </th>
                        <th className="p-3 font-semibold text-gray-600">
                          Remaining (PKR)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {traineesWithRemaining.map((t, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-3 text-gray-700">{index + 1}</td>
                          <td className="p-3 text-gray-700 font-medium">
                            {t.name}
                          </td>
                          <td className="p-3 font-bold text-red-500">
                            {t.remaining} PKR
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Back button */}
              <div className="mt-4">
                <button
                  onClick={() =>
                    user?.role === "superadmin"
                      ? window.location.assign("/superadmin-dashboard")
                      : window.location.assign("/admin-dashboard")
                  }
                  className="inline-flex items-center justify-center gap-2 bg-gray-800 text-white font-medium px-4 sm:px-6 py-2 rounded-xl hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
                >
                  <FaArrowLeft />
                  Back to Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingStatePage;
