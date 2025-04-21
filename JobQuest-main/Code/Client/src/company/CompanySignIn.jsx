import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
import { FiMail, FiLock, FiArrowLeft, FiBriefcase } from "react-icons/fi";

const CompanySignIn = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const companysignin = async (data) => {
    try {
      const res = await axiosapi.post("company/login", data);
      const compId = res.data.checkUser._id;
      sessionStorage.setItem("compId", compId);
      if (res.status === 200) {
        toast.success(res.data.message);
        setEmail(data.email);
        setIsOtpSent(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const resp = await axiosapi.post("company/verify-otp", { email, otp });
      if (resp.data.success) {
        toast.success("OTP verified successfully");
        navigate("/companyhome");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image */}
          <div className="md:w-1/2 bg-indigo-600 p-8 flex flex-col justify-center items-center text-white">
            <div className="text-center mb-8">
              <FiBriefcase className="text-5xl mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Company Portal</h2>
              <p className="opacity-90">Find the best talent for your organization</p>
            </div>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/520eab84e4b02d5660581bbb/1560950545124-RA8X0JEJ1322MT58RTBV/matt-anderson-illustration-ecosystems-animation-keyframes-abc-company.png" 
              alt="Company Illustration" 
              className="w-full max-w-xs rounded-lg shadow-md"
            />
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 p-8">
            {!isOtpSent ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Sign In</h1>
                  <p className="text-gray-500">Access your company dashboard</p>
                </div>

                <form onSubmit={handleSubmit(companysignin)} className="space-y-6">
                  <div>
                    <div className="relative">
                      <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("email", { required: "Company email is required" })}
                        type="email"
                        placeholder="Company Email"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <FiLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        placeholder="Password"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* <div className="flex justify-between items-center">
                    <Link
                      to="/company-forgot-password"
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot Password?
                    </Link>
                  </div> */}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    Sign In
                  </button>

                  <div className="text-center text-gray-500 text-sm">
                    New to our platform?{" "}
                    <Link
                      to="/companyregister"
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Create Company Account
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h1>
                  <p className="text-gray-500">
                    We've sent a verification code to <span className="font-medium">{email}</span>
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <FiLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                    />
                  </div>

                  <button
                    onClick={() => verifyOtp(otp)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    Verify & Continue
                  </button>

                  <button
                    onClick={() => setIsOtpSent(false)}
                    className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-indigo-700 transition"
                  >
                    <FiArrowLeft className="inline-block" />
                    Back to Sign In
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

export default CompanySignIn;