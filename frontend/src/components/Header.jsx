import React from "react";
import { useSelector } from "react-redux";
import NotificationsBell from "./NotificationsBell";
import UserMenu from "./UserMenu"; // ✅ Import UserMenu

const Header = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 relative gap-3 md:gap-0">
      {/* Left side */}
      <h1 className="text-lg md:text-2xl font-semibold text-gray-800 text-center md:text-left">
        Welcome to Dashboard
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <NotificationsBell />

        {user && <UserMenu user={user} />} {/* ✅ Call UserMenu here */}
      </div>
    </div>
  );
};

export default Header;
