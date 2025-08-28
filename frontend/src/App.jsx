import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "./redux/slices/userSlice";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Internships from "./pages/InternshipTable/MainIntern";
import Training from "./pages/Training/MainTraningPage";




function App() {
  const dispatch = useDispatch();

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
          localStorage.removeItem("token"); // token galat hoga to hata do
        });
    }
  }, [dispatch]);
 

  return (
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />}/>
      <Route path="/internships" element={<Internships />} />
      <Route path="/training" element={<Training />} />
     </Routes>
     </BrowserRouter>
  )
}

export default App
