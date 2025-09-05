/* eslint-disable no-unused-vars */
import { Bell, Check, Circle, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../redux/slices/notificationSlice";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const NotificationsBell = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    socket.on("newNotification", () => {
      dispatch(fetchNotifications());
    });
    return () => socket.off("newNotification");
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
      dispatch(fetchNotifications());
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAsUnread = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/unread`);
      dispatch(fetchNotifications());
    } catch (error) {
      console.error("Error marking as unread:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);
      dispatch(fetchNotifications());
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const unreadCount = Array.isArray(items) ? items.filter((n) => !n.isRead).length : 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer relative text-gray hover:text-gray-800 transition-colors"
        aria-label="Toggle notifications dropdown"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(!open);
        }}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 select-none">Notifications</h3>
            {items.length > 0 && (
              <span className="text-sm text-gray-500 select-none">{`${unreadCount} unread`}</span>
            )}
          </div>
          <ul
            className="divide-y divide-gray-100 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            {status === "loading" ? (
              <li className="p-4 text-center text-gray-500 select-none">Loading...</li>
            ) : items.length > 0 ? (
              items.map((n) => (
                <li
                  key={n._id}
                  className={`group p-4 flex items-start gap-3 transition-colors cursor-pointer select-none ${
                    n.isRead
                      ? "bg-gray-50 text-gray-500"
                      : "bg-white text-gray-800 font-medium hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (!n.isRead) markAsRead(n._id);
                  }}
                  title={n.message}
                >
                  <div className="flex-shrink-0 mt-1">
                    {n.isRead ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle
                        fill="currentColor"
                        className="w-2 h-2 text-blue-500 mt-1.5"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm ${n.isRead ? "" : "font-semibold"}`}>
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Delete */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(n._id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200"
                      title="Delete"
                      aria-label="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {/* Mark as unread (optional) */}
                    {!n.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsUnread(n._id);
                        }}
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-gray-200"
                        title="Mark as unread"
                        aria-label="Mark as unread"
                      >
                        <Circle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 select-none">
                You're all caught up!
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;
