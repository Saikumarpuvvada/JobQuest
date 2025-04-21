import React, { useState } from "react";
import "../css/signin.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosapi from "../axiosapi";
import axios from "axios";

const AdminSignIn = () => {
  const adminForm = useForm();
  const navigateTo = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // OTP state initialized

  const signIn = async (data) => {
    try {
      const resp = await axiosapi.post("/admin/login", data);
      if (resp.data.success) {
        toast.success("Login successful. OTP sent to your email.");
        setEmail(data.email);
        setIsOtpSent(true);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const verifyOtp = async () => { // No parameters needed
    try {
      const resp = await axiosapi.post("/admin/verify-otp", {
        email: email,
        otp: otp, // Using state value
      });
      if (resp.data.success) {
        toast.success("OTP verified successfully. You are logged in.");
        navigateTo("/adminhome");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during OTP verification");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 p-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Admin Portal</h1>
            <p className="text-blue-100 text-lg">
              Secure access to administrative controls and settings
            </p>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4vA1TLSu_praJ7KwtJu0nAf-HX-FnCtChoQ&s"
            alt="Admin Illustration"
            className="mt-8 w-64 h-64 object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {isOtpSent ? "OTP Verification" : "Admin Sign In"}
              </h2>
              <p className="text-gray-500 mt-2">
                {isOtpSent
                  ? "Enter the OTP sent to your registered email"
                  : "Please enter your credentials to continue"}
              </p>
            </div>

            {!isOtpSent ? (
              <form onSubmit={adminForm.handleSubmit(signIn)} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    {...adminForm.register("email")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    {...adminForm.register("password")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-center text-xl font-mono"
                    placeholder="XXXXXX"
                    maxLength="6"
                  />
                </div>

                <button
                  onClick={verifyOtp}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Verify OTP
                </button>

                <div className="text-center text-sm text-gray-500">
                  Didn't receive OTP?{" "}
                  <button
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => {/* Add resend OTP logic here */}}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;