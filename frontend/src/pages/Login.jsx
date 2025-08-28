/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../assets/IIFALOGO.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      dispatch(
        setUser({
          user: response.data.user,
          token: response.data.token,
        })
      );

      localStorage.setItem("token", response.data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-100 font-sans">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-6 sm:p-10 md:p-12">
        <div className="flex flex-col items-center sm:items-start w-full max-w-md mb-8">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2 mb-6">
            <img src={logo} alt="Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
            <span className="text-gray-800 text-xl sm:text-2xl font-semibold text-center sm:text-left">
              Internship Management System
            </span>
          </div>

          {/* Headings */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 tracking-wide mb-2 text-center sm:text-left">
            Sign In
          </h1>
          <p className="text-md sm:text-lg text-gray-600 text-center sm:text-left">
            Your Account
          </p>
        </div>

        {/* Form */}
        <form
          className="w-full max-w-md space-y-5 sm:space-y-6"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full pl-10 pr-4 py-3 bg-gray-200 text-gray-800 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none transition-colors duration-200"
              placeholder="Enter E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
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
              className="w-full pl-10 pr-10 py-3 bg-gray-200 text-gray-800 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none transition-colors duration-200"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a href="#" className="text-blue-500 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex w-1/2 p-6 md:p-8 bg-gray-200 items-center justify-center">
        <img src={logo} alt="IIFA Tech Logo" className="h-48 sm:h-64 md:h-72 lg:h-80 object-contain" />
      </div>
    </div>
  );
};

export default Login;
