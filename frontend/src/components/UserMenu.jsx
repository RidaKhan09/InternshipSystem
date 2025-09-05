import React, { useState, useRef, useEffect } from "react";

const UserMenu = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="User menu"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setShowMenu(!showMenu);
        }}
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="User profile"
            className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-md"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white font-bold mr-3 shadow-md select-none text-lg">
            {getInitial(user.name)}
          </div>
        )}
        <span className="hidden sm:inline font-semibold text-black drop-shadow-md select-none">
          {user.name}
        </span>
        <svg
          className={`ml-2 w-4 h-4 text-white transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {showMenu && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl p-4 z-50 ring-1 ring-black ring-opacity-5">
          <p className="font-semibold text-gray-900 truncate">{user.name}</p>
          <p className="text-sm text-gray-500 truncate mb-3">{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
