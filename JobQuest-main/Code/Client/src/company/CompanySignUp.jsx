import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosapi from '../axiosapi';
import { toast } from 'react-hot-toast';
import { FiBriefcase, FiUser, FiMail, FiLock, FiChevronDown } from 'react-icons/fi';

const CompanySignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const companysignup = async (data) => {
    try {
      const res = await axiosapi.post("company/register", data);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Registration</h1>
              <p className="text-gray-500">Create your company account to get started</p>
            </div>

            <form onSubmit={handleSubmit(companysignup)} className="space-y-5">
              <div>
                <div className="relative">
                  <FiBriefcase className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("companyname", { required: "Company name is required" })}
                    type="text"
                    placeholder="Company Name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                  />
                </div>
                {errors.companyname && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyname.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <FiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                  <div className="flex items-center">
                    <select
                      {...register("role", { required: "Please select your role" })}
                      className="w-full pl-12 pr-10 py-3 appearance-none rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-white"
                    >
                      <option value="">Select Your Role</option>
                      <option value="Manager">Manager</option>
                      <option value="HR">HR</option>
                      <option value="CEO">CEO</option>
                      <option value="Owner">Owner</option>
                    </select>
                    <FiChevronDown className="absolute right-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                        message: "Must contain at least one uppercase and one special character"
                      }
                    })}
                    type="password"
                    placeholder="Create Password"
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
                Create Company Account
              </button>

              <div className="text-center text-gray-500 text-sm pt-4">
                Already have an account?{' '}
                <Link
                  to="/companylogin"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 bg-indigo-600 p-8 flex flex-col justify-center items-center text-white">
            <div className="text-center mb-8">
              <FiBriefcase className="text-5xl mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Join Our Network</h2>
              <p className="opacity-90">Connect with top talent and grow your business</p>
            </div>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/520eab84e4b02d5660581bbb/1560950545124-RA8X0JEJ1322MT58RTBV/matt-anderson-illustration-ecosystems-animation-keyframes-abc-company.png" 
              alt="Company Illustration" 
              className="w-full max-w-xs rounded-lg shadow-md"
            />
            <div className="mt-6 text-center">
              <p className="text-indigo-100">Trusted by 1000+ companies worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySignUp;