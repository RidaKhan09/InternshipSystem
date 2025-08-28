import React, { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user); // Redux se user data
  const [showMenu, setShowMenu] = useState(false);

  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex justify-between items-center mb-6 relative">
      {/* Left side */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome to Dashboard
      </h1>

      {/* Right side - User */}
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
                className="w-10 h-10 rounded-full mr-2"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold mr-2">
                {getInitial(user.name)}
              </div>
            )}
            <span className="font-medium text-gray-700">{user.name}</span>
          </div>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
