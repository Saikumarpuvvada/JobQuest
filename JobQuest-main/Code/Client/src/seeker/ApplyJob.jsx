import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "./UserNav";

const qualificationsTypes = ["U G", "P G"];

const qualifications = [
  {
    type: "U G",
    qualification: ["B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "B.B.A", "B.C.A"],
  },
  {
    type: "P G",
    qualification: ["M.Tech", "M.E", "M.Sc", "M.Com", "M.A", "M.B.A", "M.C.A"],
  },
];

const ApplyJob = () => {
  const { jobid } = useParams();
  const Userid = sessionStorage.getItem("user");
  const id = JSON.parse(Userid)._id;
  const [selectedImage, setSelectedImage] = useState();
  const navigateTo = useNavigate();
  const setImage = (e) => setSelectedImage(e.target.files[0]);

  const [selectedType, setSelectedType] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const applyfunc = async (data) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      formData.append("resume", selectedImage);
      const result = await axiosapi.post(
        `/user/apply/${id}/${jobid}`,
        formData
      );
      console.log(result, "apply");
      toast.success("Applied Successfully");
      navigateTo("/userhome");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="pt-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl my-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit(applyfunc)} encType="multipart/form-data">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  Apply for a Job
                </h1>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Full Name</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("fullname", { required: "Full name is required" })}
                      />
                      {errors.fullname && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Email</label>
                    <div className="flex-1">
                      <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("email", { required: "Email is required" })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Mobile Number</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("mobileno", { required: "Mobile number is required" })}
                      />
                      {errors.mobileno && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobileno.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Qualification Type */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Qualification Type</label>
                    <div className="flex-1">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        <option value="">Select Qualification Type</option>
                        {qualificationsTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Qualification</label>
                    <div className="flex-1">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("qualification", { required: "Qualification is required" })}
                      >
                        <option value="">Select Qualification</option>
                        {qualifications
                          .find((q) => q.type === selectedType)
                          ?.qualification.map((qualification) => (
                            <option key={qualification} value={qualification}>
                              {qualification}
                            </option>
                          ))}
                      </select>
                      {errors.qualification && (
                        <p className="text-red-500 text-sm mt-1">{errors.qualification.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Percentage */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Percentage</label>
                    <div className="flex-1">
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={0}
                        max={100}
                        {...register("percentage", {
                          required: "Percentage is required",
                          max: { value: 100, message: "Percentage should be less than 100" },
                          min: { value: 0, message: "Percentage should be greater than 0" },
                        })}
                      />
                      {errors.percentage && (
                        <p className="text-red-500 text-sm mt-1">{errors.percentage.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Address</label>
                    <div className="flex-1">
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        {...register("Address", { required: "Address is required" })}
                      />
                      {errors.Address && (
                        <p className="text-red-500 text-sm mt-1">{errors.Address.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Upload Resume */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-32 text-gray-700 font-medium">Upload Resume</label>
                    <div className="flex-1">
                      <input
                        type="file"
                        className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={setImage}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                      <p className="text-gray-500 text-sm mt-1">
                        Upload your CV/Resume. Max file size 50 MB
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      Send Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;