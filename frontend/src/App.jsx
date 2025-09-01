import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "./redux/slices/userSlice";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Internships from "./pages/InternshipTable/MainIntern";
import Training from "./pages/Training/MainTraningPage";
import InternshipStatePage from "./pages/SuperAdmin/InternshipStatePage";
import TrainingStatePage from "./pages/superAdmin/TrainingStatePage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(
            setUser({
              user: res.data.user,
              token,
            })
          );
        })
        .catch((err) => {
          console.error("Auth check failed:", err);
          localStorage.removeItem("token");
        });
    }
  }, [dispatch]);

  // 👑 Protected Route
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Superadmin Dashboard */}
        <Route
          path="/superadmin-dashboard"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Internship & Training - both roles */}
        <Route
          path="/internships"
          element={
            <ProtectedRoute roles={["admin", "superadmin"]}>
              <Internships />
            </ProtectedRoute>
          }
        />
        <Route
          path="/training"
          element={
            <ProtectedRoute roles={["admin", "superadmin"]}>
              <Training />
            </ProtectedRoute>
          }
        />

        {/* 👑 SuperAdmin Only Pages */}
        <Route
          path="/superadmin-internship-stats"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <InternshipStatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin-training-stats"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <TrainingStatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
