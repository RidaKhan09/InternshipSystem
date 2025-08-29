/* eslint-disable no-unused-vars */
import { Bell, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../redux/slices/notificationSlice";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const NotificationsBell = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    socket.on("newNotification", (notif) => {
      dispatch(fetchNotifications());
    });
    return () => socket.off("newNotification");
  }, [dispatch]);

  const markAsRead = async (id) => {
    await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
    dispatch(fetchNotifications());
  };

  const markAsUnread = async (id) => {
    await axios.put(`http://localhost:5000/api/notifications/${id}/unread`);
    dispatch(fetchNotifications());
  };

  const deleteNotification = async (id) => {
    await axios.delete(`http://localhost:5000/api/notifications/${id}`);
    dispatch(fetchNotifications());
  };

  const unreadCount = Array.isArray(items) ? items.filter(n => !n.isRead).length : 0;

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)} className="cursor-pointer relative">
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg z-50">
          <ul>
            {items.length > 0 ? (
              items.map((n) => (
                <li
                  key={n._id}
                  className={`p-2 border-b text-sm flex justify-between items-center ${
                    n.isRead ? "text-gray-400" : "font-semibold"
                  }`}
                >
                  <div onClick={() => (n.isRead ? markAsUnread(n._id) : markAsRead(n._id))} className="cursor-pointer">
                    {n.message}
                  </div>
                  <X onClick={() => deleteNotification(n._id)} className="w-4 h-4 text-red-500 cursor-pointer ml-2" />
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 text-sm">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;
