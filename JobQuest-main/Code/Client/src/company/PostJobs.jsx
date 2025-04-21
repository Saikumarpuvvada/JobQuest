import React, { useState } from "react";
import "../css/register.css";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
import "../App.css";

const PostJobs = () => {
  const postform = useForm();
  const compId = sessionStorage.getItem("compId");
  const [isInternship, setIsInternship] = useState(true);

  const postjobfunc = async (data) => {
    console.log(data);

    try {
      const res = await axiosapi.post(`company/intern/${compId}`, data);
      console.log(res, "company post");
      toast.success(
        "Job Post created Successfully. It will be posted once it is approved"
      );
      postform.reset();
    } catch (error) {
      toast.error(error.response.data.errors[0]?.msg);
      console.log(error.response.data.errors[0]?.msg, "error");
    }
  };

  const toggleJobType = () => {
    setIsInternship(!isInternship);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleJobType}
              className={`px-6 py-3 rounded-t-lg font-medium text-sm transition-colors ${
                isInternship
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Add Internship Details
            </button>
            <button
              onClick={toggleJobType}
              className={`px-6 py-3 rounded-t-lg font-medium text-sm transition-colors ${
                !isInternship
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Add Job Details
            </button>
          </div>

          <form onSubmit={postform.handleSubmit(postjobfunc)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Company Details Section */}
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">
                  Company Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("companyname", { required: true })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry Type
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("Industry_Type", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Branch Name/Location
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Provide google map link"
                        {...postform.register("location", { required: true })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shift Timing
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("Shifts", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Office Timing
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("time", { required: true })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hired to be in Department
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("Department", { required: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      {...postform.register("Employment_Type", { required: true })}
                    >
                      <option value="">Choose</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Work-From-Home">Work-From-Home</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Branch Address
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      {...postform.register("Address", { required: true })}
                    />
                  </div>
                </div>
              </div>

              {/* Job/Internship Details Section */}
              <div className={`p-8 ${isInternship ? "bg-indigo-600" : "bg-blue-600"}`}>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {isInternship ? "Internship Details" : "Job Details"}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("title", { required: true })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("role", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Total Vacancies
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("opening", { required: true })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Education Required
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...postform.register("Education", { required: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Key Skills
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Separate skills with commas"
                      {...postform.register("Key_Skills", { required: true })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Experience
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. 0-2 years"
                        {...postform.register("experience", { required: true })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Salary/Stipend
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. ₹10,000 - ₹15,000/month"
                        {...postform.register("salary", { required: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Job Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      {...postform.register("jobtype", { required: true })}
                      defaultValue={isInternship ? "intern" : "job"}
                    >
                      <option value="">Select Job Type</option>
                      <option value="intern">Intern</option>
                      <option value="job">Job</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Job Description{" "}
                      <span className="text-white text-opacity-70">
                        (Explain in detail)
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      {...postform.register("description", { required: true })}
                    />
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;