import React, { useState } from "react";
import { useSelector } from "react-redux";
import NotificationsBell from "./NotificationsBell"; // 🔔 Import bell

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 relative gap-3 md:gap-0">
      {/* Left side */}
      <h1 className="text-lg md:text-2xl font-semibold text-gray-800 text-center md:text-left">
        Welcome to Dashboard
      </h1>

      {/* Right side - Notifications + User */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notifications */}
        <NotificationsBell />

        {/* 👤 User */}
        {user && (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="User"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2"
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold mr-2">
                  {getInitial(user.name)}
                </div>
              )}
              {/* <span className="hidden sm:inline font-medium text-gray-700">
                {user.name}
              </span> */}
            </div>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white shadow-lg rounded-lg p-4 z-50">
                <p className="font-medium text-gray-800 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
