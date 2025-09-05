/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import axios from "axios";
import logo from "../assets/IIFALOGO.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Simple email regex
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    let valid = true;

    // Email check
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    }

    // Password check
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { user, token } = response.data;

      dispatch(setUser({ user, token }));
      localStorage.setItem("token", token);

      if (user.role === "superadmin") {
        navigate("/superadmin-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen font-sans overflow-hidden">
      {/* Left Section */}
      <div className="relative hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#4563e5] to-[#3dcdfd] text-white px-8 overflow-hidden">
        {/* Bubbles */}
        {[...Array(12)].map((_, i) => {
          const size = Math.floor(Math.random() * 40) + 15;
          const left = Math.floor(Math.random() * 100);
          const delay = Math.random() * 10;
          return (
            <div
              key={i}
              className="absolute bottom-0 bg-white/20 rounded-full bubble-anim"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
              }}
            ></div>
          );
        })}

        <div className="h-28 w-28 mb-6 rounded-full bg-white flex items-center justify-center shadow-lg relative z-10">
          <img src={logo} alt="IIFA Logo" className="h-20 w-20 object-contain" />
        </div>

        <h1 className="text-3xl font-bold mb-4 relative z-10">
          Welcome to Internship System
        </h1>
        <p className="text-center text-white/90 max-w-md relative z-10">
          Manage internships, training, and notifications all in one place. Sign
          in to access your personalized dashboard.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-6 sm:p-10 md:p-12">
        <div className="w-full max-w-md">
          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
            <p className="text-sm text-gray-500">
              Please enter your email and password to login
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <p className="flex items-center gap-2 text-red-600 text-sm bg-red-100 p-2 rounded-md border border-red-200">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm bg-gray-50 transition-all duration-300 focus:border-[#4563e5] focus:ring-4 focus:ring-[#3dcdfd]/40 focus:outline-none hover:shadow-md ${
                  emailError ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-4 w-4" />
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                className={`w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm bg-gray-50 transition-all duration-300 focus:border-[#4563e5] focus:ring-4 focus:ring-[#3dcdfd]/40 focus:outline-none hover:shadow-md ${
                  passwordError ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </div>
              {passwordError && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-4 w-4" />
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4563e5] to-[#3dcdfd] text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
