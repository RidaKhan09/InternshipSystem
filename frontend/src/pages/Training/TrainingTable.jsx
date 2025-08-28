import React, { useState } from "react";
import { Trash2, Edit, User } from "lucide-react";

const TrainingTable = ({ data, onEdit, onSoftDelete }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="overflow-x-auto">
   <table className="w-full border-collapse">
  <thead className="bg-gray-100">
    <tr className="border-b border-gray-200">
      <th className="p-2 text-left text-sm font-medium text-gray-500">Name</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">Contact</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">Join Date</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">End Date</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">University</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">Domain</th>
      {/* 🔥 Split Fees into 3 columns */}
      <th className="p-2 text-left text-sm font-medium text-gray-500">Total Fees</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">Paid</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">Remaining</th>
      <th className="p-2 text-left text-sm font-medium text-gray-500">Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentItems.map((t) => (
      <tr key={t._id} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="p-2 flex items-center gap-2 text-gray-800">
          <User size={16} className="text-gray-400" /> {t.name}
        </td>
        <td className="p-2 text-sm text-gray-600">{t.contact}</td>
        <td className="p-2 text-sm text-gray-600">{new Date(t.joinDate).toLocaleDateString()}</td>
        <td className="p-2 text-sm text-gray-600">
          {t.endDate ? new Date(t.endDate).toLocaleDateString() : "Continue"}
        </td>
        <td className="p-2">{t.university}</td>
        <td className="p-2">{t.domain}</td>
        {/* 🔥 Separate fees columns */}
        <td className="p-2 text-sm text-blue-600">{t.payment?.total}</td>
        <td className="p-2 text-sm text-green-600">{t.payment?.paid}</td>
        <td className="p-2 text-sm text-red-600">
          {t.payment?.total - t.payment?.paid}
        </td>
        <td className="p-2 flex justify-center gap-2 items-center">
          <button onClick={() => onEdit(t)} className="text-blue-500 hover:text-blue-700">
            <Edit size={18} />
          </button>
          <button
            onClick={() => onSoftDelete(t._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TrainingTable;