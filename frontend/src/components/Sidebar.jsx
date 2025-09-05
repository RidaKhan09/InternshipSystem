import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/IIFALOGO.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef(null); // 👈 ref for sidebar

  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClasses = (path) =>
    `flex items-center p-3 rounded-lg font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-blue-100 text-blue-600"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const dashboardPath =
    user?.role === "superadmin" ? "/superadmin-dashboard" : "/admin-dashboard";

  // ✅ Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("button") // ignore clicks on the hamburger button
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:static top-0 left-0 bottom-0 h-screen md:h-full w-64 bg-white pt-10 pb-6 px-4 shadow-md flex flex-col transform transition-transform duration-300 z-50 overflow-y-auto
       ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="Logo" className="mb-4 w-[60px] h-[60px]" />
          <span className="font-semibold text-xl text-gray-800 text-center">
            IIFA TECH Management
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 w-full px-2">
          <ul>
            <li className="mb-4">
              <Link to={dashboardPath} className={linkClasses(dashboardPath)}>
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

            {/* SuperAdmin Only */}
            {user?.role === "superadmin" && (
              <>
                <li className="mb-4">
                  <Link
                    to="/superadmin-internship-stats"
                    className={linkClasses("/superadmin-internship-stats")}
                  >
                    <span className="mr-3">💼</span>
                    <span>Internship Stats</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/superadmin-training-stats"
                    className={linkClasses("/superadmin-training-stats")}
                  >
                    <span className="mr-3">📈</span>
                    <span>Training Stats</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/manage-admins"
                    className={linkClasses("/manage-admins")}
                  >
                    <span className="mr-3">👤</span>
                    <span>Manage Admins</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Logout */}
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
