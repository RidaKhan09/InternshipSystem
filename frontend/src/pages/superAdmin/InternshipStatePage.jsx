import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import {
  FaMoneyBillWave,
  FaChartPie,
  FaUserGraduate,
  FaArrowLeft,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InternshipStatePage = () => {
  const [interns, setInterns] = useState([]);
  const [summary, setSummary] = useState({
    totalPaidInterns: 0,
    totalUnpaidInterns: 0,
    totalStipend: 0,
  });
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/interns/paid");
        const data = res.data?.interns || [];

        const paid = data.filter((i) => i.payment === "paid");
        const unpaid = data.filter((i) => i.payment === "unpaid");

        let totalStipend = 0;
        paid.forEach((i) => {
          totalStipend += i.stipend || 0;
        });

        setInterns(paid); // sirf paid interns list me
        setSummary({
          totalPaidInterns: paid.length,
          totalUnpaidInterns: unpaid.length,
          totalStipend,
        });
      } catch (error) {
        console.error("Error fetching interns:", error);
        setInterns([]);
        setSummary({ totalPaidInterns: 0, totalUnpaidInterns: 0, totalStipend: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  const chartData = [
    { name: "Paid Interns", value: summary.totalPaidInterns, color: "#22c55e" },
    { name: "Unpaid Interns", value: summary.totalUnpaidInterns, color: "#ef4444" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
        <Header />
        <div className="p-4 md:p-6 flex-1 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <FaMoneyBillWave className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              Internship Stipend Report
            </h2>
          </div>

          {!loading && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                      Total Paid Interns
                    </h3>
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <FaUserGraduate />
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-gray-900">
                    {summary.totalPaidInterns}
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                      Total Unpaid Interns
                    </h3>
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                      <FaUserGraduate />
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-gray-900">
                    {summary.totalUnpaidInterns}
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                      Total Monthly Stipend
                    </h3>
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <FaMoneyBillWave />
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-gray-900">
                    {summary.totalStipend} PKR
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaChartPie className="text-gray-600 h-5 w-5" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Paid vs Unpaid Interns
                  </h3>
                </div>
                <div className="w-full h-64 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Paid Interns Table */}
              {interns.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8 overflow-x-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <FaUserGraduate className="text-gray-600 h-5 w-5" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                      Paid Interns List
                    </h3>
                  </div>
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 font-semibold text-gray-600">#</th>
                        <th className="p-3 font-semibold text-gray-600">Name</th>
                        <th className="p-3 font-semibold text-gray-600">Email</th>
                        <th className="p-3 font-semibold text-gray-600">Stipend (PKR)</th>
                        <th className="p-3 font-semibold text-gray-600">Join Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interns.map((intern, index) => (
                        <tr
                          key={intern._id || index}
                          className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-3 text-gray-700">{index + 1}</td>
                          <td className="p-3 text-gray-700 font-medium">{intern.name}</td>
                          <td className="p-3 text-gray-600">{intern.email}</td>
                          <td className="p-3 font-bold text-green-600">{intern.stipend}</td>
                          <td className="p-3 text-gray-600">
                            {intern.joinDate
                              ? new Date(intern.joinDate).toLocaleDateString()
                              : "N/A"}
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

export default InternshipStatePage;
