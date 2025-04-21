import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosapi from "../axiosapi";
import { useNavigate } from "react-router-dom";
import UserNav from "./UserNav";
import { FiUpload, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiAward, FiBook, FiBriefcase, FiFileText } from "react-icons/fi";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadResume, setUploadResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isExperienced, setIsExperienced] = useState(false);
  const Userid = sessionStorage.getItem("user");
  const id = JSON.parse(Userid)._id;
  const navigate = useNavigate();

  const setImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const setResume = (e) => {
    setUploadResume(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      
      if (selectedImage) formData.append("image", selectedImage);
      if (uploadResume) formData.append("resume", uploadResume);
      
      const res = await axiosapi.post(`/user/profile/${id}`, formData);
      toast.success("Profile updated successfully!");
      navigate("/userhome");
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosapi.get(`/user/profile/${id}`);
      const profile = response.data.userdata.profile;
      
      // Set form values
      const fields = [
        'firstname', 'lastname', 'email', 'mobileno', 'address', 'gender',
        'date_of_birth', 'qualification', 'college', 'state', 'year_of_passing',
        'totalexperience', 'percentage', 'about', 'organization', 'designation',
        'from_date', 'to_date'
      ];
      
      fields.forEach(field => {
        if (profile[field]) setValue(field, profile[field]);
      });
      
      if (profile.totalexperience && profile.totalexperience > 0) {
        setIsExperienced(true);
      }
      
      if (profile.image) {
        setImagePreview(`${axiosapi.defaults.baseURL}/${profile.image}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Update Your Profile</h1>
            <p className="text-gray-600">Complete your profile to improve your job opportunities</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Left Column - Personal Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <FiUser className="mr-2" /> Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        {...register("firstname", { required: "First name is required" })}
                      />
                      {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        {...register("lastname", { required: "Last name is required" })}
                      />
                      {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.mobileno ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        {...register("mobileno", { 
                          required: "Mobile number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid mobile number"
                          }
                        })}
                      />
                    </div>
                    {errors.mobileno && <p className="mt-1 text-sm text-red-600">{errors.mobileno.message}</p>}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400" />
                      </div>
                      <textarea
                        className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        rows={3}
                        {...register("address", { required: "Address is required" })}
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Gender*</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          value="male"
                          {...register("gender", { required: "Gender is required" })}
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          value="female"
                          {...register("gender")}
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          value="other"
                          {...register("gender")}
                        />
                        <span className="ml-2 text-gray-700">Other</span>
                      </label>
                    </div>
                    {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.date_of_birth ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        {...register("date_of_birth", { required: "Date of birth is required" })}
                      />
                    </div>
                    {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth.message}</p>}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Profile preview" className="w-16 h-16 rounded-full object-cover" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="text-gray-400 text-xl" />
                          </div>
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center">
                          <FiUpload className="mr-2" />
                          Upload Photo
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={setImage}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Education & Experience */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <FiAward className="mr-2" /> Education Details
                  </h2>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBook className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.qualification ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="e.g. B.Tech Computer Science"
                        {...register("qualification", { required: "Qualification is required" })}
                      />
                    </div>
                    {errors.qualification && <p className="mt-1 text-sm text-red-600">{errors.qualification.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College/University*</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.college ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        {...register("college", { required: "College is required" })}
                      />
                      {errors.college && <p className="mt-1 text-sm text-red-600">{errors.college.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        {...register("state", { required: "State is required" })}
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing*</label>
                      <input
                        type="number"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.year_of_passing ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        min="1900"
                        max={new Date().getFullYear()}
                        {...register("year_of_passing", { 
                          required: "Year is required",
                          min: {
                            value: 1900,
                            message: "Invalid year"
                          },
                          max: {
                            value: new Date().getFullYear(),
                            message: "Year cannot be in the future"
                          }
                        })}
                      />
                      {errors.year_of_passing && <p className="mt-1 text-sm text-red-600">{errors.year_of_passing.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Percentage/GPA*</label>
                      <input
                        type="number"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.percentage ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        step="0.01"
                        min="0"
                        max="100"
                        {...register("percentage", { 
                          required: "Percentage is required",
                          min: {
                            value: 0,
                            message: "Percentage should be greater than 0"
                          },
                          max: {
                            value: 100,
                            message: "Percentage should be less than 100"
                          }
                        })}
                      />
                      {errors.percentage && <p className="mt-1 text-sm text-red-600">{errors.percentage.message}</p>}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <FiBriefcase className="mr-2" /> Work Experience
                  </h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Do you have work experience?*</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          name="hasExperience"
                          checked={isExperienced}
                          onChange={() => setIsExperienced(true)}
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          name="hasExperience"
                          checked={!isExperienced}
                          onChange={() => setIsExperienced(false)}
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  
                  {isExperienced && (
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Organization*</label>
                          <input
                            type="text"
                            className={`w-full px-4 py-2 rounded-lg border ${errors.organization ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("organization", { 
                              required: isExperienced && "Organization is required"
                            })}
                          />
                          {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Designation*</label>
                          <input
                            type="text"
                            className={`w-full px-4 py-2 rounded-lg border ${errors.designation ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("designation", { 
                              required: isExperienced && "Designation is required"
                            })}
                          />
                          {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation.message}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">From Date*</label>
                          <input
                            type="date"
                            className={`w-full px-4 py-2 rounded-lg border ${errors.from_date ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("from_date", { 
                              required: isExperienced && "From date is required"
                            })}
                          />
                          {errors.from_date && <p className="mt-1 text-sm text-red-600">{errors.from_date.message}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">To Date*</label>
                          <input
                            type="date"
                            className={`w-full px-4 py-2 rounded-lg border ${errors.to_date ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("to_date", { 
                              required: isExperienced && "To date is required"
                            })}
                          />
                          {errors.to_date && <p className="mt-1 text-sm text-red-600">{errors.to_date.message}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Experience (in months)*</label>
                        <input
                          type="number"
                          className={`w-full px-4 py-2 rounded-lg border ${errors.totalexperience ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          min="0"
                          {...register("totalexperience", { 
                            required: isExperienced && "Experience is required",
                            min: {
                              value: 0,
                              message: "Experience cannot be negative"
                            }
                          })}
                        />
                        {errors.totalexperience && <p className="mt-1 text-sm text-red-600">{errors.totalexperience.message}</p>}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV*</label>
                  <label className="cursor-pointer">
                    <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center w-full">
                      <FiFileText className="mr-2" />
                      {uploadResume ? uploadResume.name : "Upload Resume (PDF/DOC)"}
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={setResume}
                      />
                    </div>
                  </label>
                  {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About You*</label>
                  <textarea
                    className={`w-full px-4 py-2 rounded-lg border ${errors.about ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    rows={4}
                    placeholder="Tell employers about your skills, experience, and career goals..."
                    {...register("about", { 
                      required: "About section is required",
                      minLength: {
                        value: 50,
                        message: "Please write at least 50 characters"
                      }
                    })}
                  />
                  {errors.about && <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;