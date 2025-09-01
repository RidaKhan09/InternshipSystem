import React, { useState } from "react";
import { Trash2, Edit, User } from "lucide-react";

const TrainingTable = ({ data, onEdit, onSoftDelete }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="w-full">
      {/* ✅ Table for medium+ screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200">
              <th className="p-2 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Contact</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Join Date</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">End Date</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Gender</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Domain</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Total Fees</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Paid</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Remaining</th>
              <th className="p-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((t) => {
              const total = t.payment?.total || 0;
              const paid = t.payment?.paid || 0;
              const remaining = total - paid;

              return (
                <tr key={t._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-2 flex items-center gap-2 text-gray-800">
                    <User size={16} className="text-gray-400" /> {t.name}
                  </td>
                  <td className="p-2 text-sm text-gray-600">{t.contact}</td>
                  <td className="p-2 text-sm text-gray-600">
                    {new Date(t.joinDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-sm text-gray-600">
                    {t.endDate ? new Date(t.endDate).toLocaleDateString() : "Continue"}
                  </td>
                  <td className="p-2">{t.gender}</td>
                  <td className="p-2">{t.domain}</td>
                  <td className="p-2 text-sm text-blue-600 font-semibold">{total}</td>
                  <td className="p-2 text-sm text-green-600 font-semibold">{paid}</td>
                  <td
                    className={`p-2 text-sm ${
                      remaining > 0 ? "text-red-600 font-bold" : "text-green-500"
                    }`}
                  >
                    {remaining > 0 ? remaining : "✔"}
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Card layout for mobile */}
      <div className="sm:hidden space-y-4">
        {currentItems.map((t) => {
          const total = t.payment?.total || 0;
          const paid = t.payment?.paid || 0;
          const remaining = total - paid;

          return (
            <div key={t._id} className="bg-white shadow-md rounded-lg p-4 border">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <User size={18} className="text-gray-400" /> {t.name}
              </div>
              <p className="text-sm text-gray-600">📞 {t.contact}</p>
              <p className="text-sm text-gray-600">
                📅 {new Date(t.joinDate).toLocaleDateString()} →{" "}
                {t.endDate ? new Date(t.endDate).toLocaleDateString() : "Continue"}
              </p>
              <p className="text-sm text-gray-600">🚻 {t.gender}</p>
              <p className="text-sm text-gray-600">💻 {t.domain}</p>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-blue-600 font-semibold">Total: {total}</span>
                <span className="text-green-600 font-semibold">Paid: {paid}</span>
                <span
                  className={`${
                    remaining > 0 ? "text-red-600 font-bold" : "text-green-500"
                  }`}
                >
                  {remaining > 0 ? `Due: ${remaining}` : "✔ Paid"}
                </span>
              </div>
              <div className="mt-3 flex gap-3">
                <button onClick={() => onEdit(t)} className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onSoftDelete(t._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium">
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
