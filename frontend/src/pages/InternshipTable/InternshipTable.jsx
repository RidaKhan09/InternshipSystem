import React, { useState } from "react";
import { Trash2, Edit, CheckCircle, XCircle, User } from "lucide-react";

const InternshipTable = ({ data, onEdit, onSoftDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // items per page

  const renderPaymentInfo = (intern) => {
    const { type, payment } = intern;

    if (type === "internship") {
      const isPaid = payment === "paid";
      const statusClass = isPaid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";
      const statusText = isPaid ? "Paid" : "Unpaid";
      const statusIcon = isPaid ? <CheckCircle size={16} /> : <XCircle size={16} />;
      return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
          {statusIcon} {statusText}
        </span>
      );
    }

    if (type === "training" && typeof payment === "object" && payment) {
      return (
        <span className="flex flex-col text-blue-600 text-sm">
          <span>Paid: {payment.paid}</span>
          <span>Remaining: {payment.total - payment.paid}</span>
        </span>
      );
    }

    return <span className="text-gray-500 text-sm">No info</span>;
  };

  // Filter only undeleted interns
  const activeData = data.filter((intern) => !intern.deleted);

  // Pagination
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = activeData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr className="border-b border-gray-200">
            <th className="p-2 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">Contact</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">Join Date</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">End Date</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">Gender</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">University</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">Domain</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">Type</th>
            <th className="p-2 text-left text-sm font-medium text-gray-500">Payment</th>
            <th className="p-2 text-center text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((intern) => (
            <tr key={intern._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 flex items-center gap-2 text-gray-800">
                <User size={16} className="text-gray-400" /> {intern.name}
              </td>
              <td className="p-2 text-sm text-gray-600">{intern.contact}</td>
              <td className="p-2 text-sm text-gray-600">{new Date(intern.joinDate).toLocaleDateString()}</td>
              <td className="p-2 text-sm text-gray-600">{intern.endDate ? new Date(intern.endDate).toLocaleDateString() : "Continue"}</td>
              <td className="p-2 text-sm text-gray-600">{intern.gender}</td>
              <td className="p-2 text-sm text-gray-600">{intern.university}</td>
              <td className="p-2 text-sm text-gray-600">{intern.domain}</td>
              <td className="p-2 text-sm text-gray-600 capitalize">{intern.type}</td>
              <td className="p-2">{renderPaymentInfo(intern)}</td>
              <td className="p-2 flex justify-center gap-2 items-center">
                <button onClick={() => onEdit(intern)} className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button onClick={() => onSoftDelete(intern._id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InternshipTable;
