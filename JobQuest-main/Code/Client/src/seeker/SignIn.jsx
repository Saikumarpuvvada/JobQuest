import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

const SignIn = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const signinFunc = async (data) => {
    try {
      const res = await axiosapi.post("user/login", data);
      if (res.status === 200) {
        setEmail(data.email);
        setIsOtpSent(true);
        toast.success("OTP sent to your email");
        sessionStorage.setItem("user", JSON.stringify(res.data.checkUser));
        console.log(res.data.checkUser);
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const resp = await axiosapi.post("user/verify-otp", { email, otp });
      if (resp.data.success) {
        toast.success("OTP verified successfully");
        navigate("/userhome");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          {isOtpSent ? (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h1>
              <p className="text-gray-500">We sent a code to {email}</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-500">Sign in to continue your journey</p>
            </>
          )}
        </div>

        {!isOtpSent ? (
          <form onSubmit={handleSubmit(signinFunc)} className="space-y-6">
            <div>
              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email Address"
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

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
            >
              Sign In
            </button>

            {/* <div className="text-center text-gray-500 text-sm">
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div> */}

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-400 text-sm">Or continue with</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
                <span className="text-gray-600 text-sm">Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition"
              >
                <img src="https://avatars1.githubusercontent.com/u/9919?v=4" alt="GitHub" className="w-5 h-5" />
                <span className="text-gray-600 text-sm">GitHub</span>
              </button>
            </div>

            <div className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/userregister"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Register
              </Link>
            </div>
          </form>
        ) : (
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
              Verify OTP
            </button>

            <button
              onClick={() => setIsOtpSent(false)}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-indigo-700 transition"
            >
              <FiArrowLeft className="inline-block" />
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;