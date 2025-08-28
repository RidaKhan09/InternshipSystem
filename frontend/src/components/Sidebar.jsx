import React, { useState } from "react";
import logo from "../assets/IIFALOGO.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ current route pakadne ke liye
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ ek helper fn bana le style handle karne ke liye
  const linkClasses = (path) =>
    `flex items-center p-3 rounded-lg font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-blue-100 text-blue-600" // active
        : "text-gray-700 hover:bg-gray-100" // inactive
    }`;

  return (
    <>
      {/* 🔹 Top bar for mobile */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white pt-10 pb-6 px-4 shadow-md flex flex-col transform transition-transform duration-300 z-50
       ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="Logo" className="mb-4 w-[60px] h-[60px]" />
          <span className="font-semibold text-xl text-gray-800 text-center">
            IIFA TECH Mangement
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 w-full px-2">
          <ul>
            <li className="mb-4">
              <Link to="/admin-dashboard" className={linkClasses("/admin-dashboard")}>
                <span className="mr-3">📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/internships" className={linkClasses("/internships")}>
                <span className="mr-3">📄</span>
                <span>Internships</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/training" className={linkClasses("/training")}>
                <span className="mr-3">🎓</span>
                <span>Trainings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout button */}
        <div className="mt-auto w-full px-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
          >
            <span className="mr-3">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
