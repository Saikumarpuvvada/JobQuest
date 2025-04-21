import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosapi.post("/user/register", data);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">Join our community and start your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="relative">
              <FiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("fullname", { required: "Full name is required" })}
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
            )}
          </div>

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
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=<>?])[a-zA-Z0-9!@#$%^&*()-_+=<>?]{8,}$/,
                    message: `Password must contain at least 8 characters, one uppercase letter, and one special character`
                  }
                })}
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
            Create Account
          </button>

          <div className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/userlogin"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Sign In
            </Link>
          </div>

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

        </form>
      </div>
    </div>
  );
};

export default SignUp;