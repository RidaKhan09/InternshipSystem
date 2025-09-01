import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header"; // top header
import Sidebar from "../../components/Sidebar"; // sidebar
import { useSelector } from "react-redux";

const InternshipStatepage = () => {
  const [interns, setInterns] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.user); // role check ke liye

  useEffect(() => {
    const fetchPaidInterns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/interns/paid");
        setInterns(res.data?.interns || []);
        setTotal(res.data?.totalPayout || 0);
      } catch (error) {
        console.error("Error fetching paid interns:", error);
        setInterns([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPaidInterns();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 min-h-screen">
        {/* Header */}
        <Header />

        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4">Paid Internships Report</h2>

          {loading ? (
            <p className="text-gray-500">Loading Paid Internships...</p>
          ) : (
            <>
              <div className="mb-6 p-4 bg-green-100 rounded-lg shadow">
                <p className="text-lg font-semibold">
                  💰 Total Monthly Payout:{" "}
                  <span className="text-green-700 font-bold">{total} PKR</span>
                </p>
              </div>

              {interns.length === 0 ? (
                <p className="text-gray-500">No paid interns found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 shadow">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">#</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Stipend (PKR)</th>
                        <th className="border p-2">Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interns.map((intern, index) => (
                        <tr key={intern._id || index} className="hover:bg-gray-50">
                          <td className="border p-2">{index + 1}</td>
                          <td className="border p-2">{intern.name}</td>
                          <td className="border p-2">{intern.email}</td>
                          <td className="border p-2">{intern.stipend}</td>
                          <td className="border p-2">
                            {intern.startDate
                              ? new Date(intern.startDate).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={() =>
                    user?.role === "superadmin"
                      ? window.location.assign("/superadmin-dashboard")
                      : window.location.assign("/admin-dashboard")
                  }
                  className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipStatepage;
