import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CompanyNav from "./CompanyNav";

const UpdatePostedJobs = () => {
  const updatePostform = useForm();
  const compId = sessionStorage.getItem("compId");
  const updateId = sessionStorage.getItem("updateId");
  const navigationTo = useNavigate();
  const { setValue } = updatePostform;

  const updatepostjobfunc = async (data) => {
    try {
      const res = await axiosapi.put(
        `company/intern/${compId}/${updateId}`,
        data
      );
      toast.success(
        "Job Post Updated Successfully. It will be posted once it is approved"
      );
      navigationTo("/companyhome");
    } catch (error) {
      console.error(error);
      error.response?.data?.errors?.forEach((item) => toast.error(item.msg));
    }
  };

  const getPostedJobs = async () => {
    try {
      const upres = await axiosapi.get(`company/intern/${compId}/${updateId}`);
      for (let [key, value] of Object.entries(upres.data.interns)) {
        setValue(key, value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={updatePostform.handleSubmit(updatepostjobfunc)}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Company Details */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                  Company Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      {...updatePostform.register("companyname")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry Type
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      {...updatePostform.register("Industry_Type")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch Name/Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Provide google map link"
                      {...updatePostform.register("location")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shift Timing
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      {...updatePostform.register("Shifts")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Office Timing
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      {...updatePostform.register("time")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hired to be in Department
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      {...updatePostform.register("Department")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      {...updatePostform.register("Employment_Type")}
                    >
                      <option value="">Choose</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Work-From-Home">Work-From-Home</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Branch Address
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      rows="3"
                      {...updatePostform.register("Address")}
                    />
                  </div>
                </div>
              </div>

              {/* Internship Details */}
              <div className="bg-indigo-600 p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Internship Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      {...updatePostform.register("title")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      {...updatePostform.register("role")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Total Vacancies
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      {...updatePostform.register("opening")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Education Required
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      {...updatePostform.register("Education")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Key Skills
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      {...updatePostform.register("Key_Skills")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Experience
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      {...updatePostform.register("experience")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Salary/Stipend
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      {...updatePostform.register("salary")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Job Description{" "}
                      <span className="text-indigo-200 text-xs">
                        (Explain in detail)
                      </span>
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 text-gray-800"
                      rows="4"
                      {...updatePostform.register("description")}
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-center mt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-800 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition duration-150 ease-in-out"
                    >
                      Update Internship
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

export default UpdatePostedJobs;