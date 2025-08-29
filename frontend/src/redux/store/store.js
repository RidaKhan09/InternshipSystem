// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import notificationReducer from "../slices/notificationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationReducer, // ✅ add here
  },
});

export default store;
