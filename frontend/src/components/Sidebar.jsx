import React from "react";
import logo from "../assets/IIFALOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redux state se user hata do
    dispatch(logoutUser());

    // LocalStorage/Token clear karna ho toh yahan karo
    localStorage.removeItem("token");

    // Login page pe bhej do
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white pt-10 pb-6 px-4 shadow-md flex flex-col items-center">
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="Logo" className="mb-4 w-[60px] h-[60px]" />
        <span className="font-semibold text-xl text-gray-800">
          IIFA TECH Mangement
        </span>
      </div>
      <nav className="flex-1 w-full px-2">
        <ul>
          <li className="mb-4">
            <Link
              to="/admin-dashboard"
              className="flex items-center p-3 rounded-lg bg-blue-100 text-blue-600 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/internships"
              className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4m0 4a2 2 0 110-4m-4-4h8m-8 4h8"
                />
              </svg>
              <span>Internships</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/training"
              className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a48.514 48.514 0 00-6.16-2.58m6.16 2.58l-6.16 2.58m0-2.58L5.84 10.578a48.514 48.514 0 016.16 2.58" />
                <path d="M12 14V11a3 3 0 00-3-3m3 3h3a3 3 0 003 3v3m0 0l-3 3v-3" />
              </svg>
              <span>Trainings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto w-full px-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
