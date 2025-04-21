import React, { useEffect, useState } from "react";
import axiosapi, { baseURL } from "../axiosapi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const [userProf, setUserProf] = useState(null);
  const [showUpdateForm, setShowForm] = useState(true);
  const navigate = useNavigate();
  const Userid = sessionStorage.getItem("user");
  const id = JSON.parse(Userid)._id;

  const viewUser = async () => {
    try {
      const response = await axiosapi.get(`/user/profile/${id}`);
      setUserProf(response.data.userdata.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    }
  };

  const updateProfile = () => {
    setShowForm(false);
  };

  const userLogout = () => {
    toast.success("Logged out successfully");
    sessionStorage.removeItem("id");
    navigate("/");
  };

  const downloadResume = () => {
    if (!userProf?.resume) {
      toast.error("No resume available");
      return;
    }

    const resumeUrl = `${baseURL}uploads/${userProf.resume}`;
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = resumeUrl;
    a.download = `${userProf.firstname}_${userProf.lastname}_resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    viewUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {userProf && showUpdateForm ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                    <img
                      src={`${baseURL}uploads/${userProf.image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "./companyuser.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {userProf.firstname} {userProf.lastname}
                    </h1>
                    <p className="text-blue-100">{userProf.email}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    onClick={downloadResume}
                    className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 flex items-center"
                    disabled={!userProf.resume}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Resume
                  </button>
                  <button
                    onClick={updateProfile}
                    className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
              {/* Left Column - Personal Info */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                    Personal Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="font-medium">{userProf.mobileno}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">
                        {new Date(userProf.date_of_birth).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">{userProf.gender}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                    Education
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Qualification</p>
                      <p className="font-medium">{userProf.qualification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">College</p>
                      <p className="font-medium">{userProf.college}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year of Passing</p>
                      <p className="font-medium">{userProf.year_of_passing}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - About and Experience */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                    About Me
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {userProf.about || "No information provided"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                    Experience
                  </h2>
                  {userProf.organization ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p className="font-medium">{userProf.organization}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Designation</p>
                        <p className="font-medium">{userProf.designation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">
                          {userProf.totalexperience} months
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No experience added</p>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={userLogout}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : showUpdateForm ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src="./companyuser.jpg"
                  alt="Default profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                Profile Not Complete
              </h2>
              <p className="mt-2 text-gray-600">
                You haven't created your profile yet.
              </p>
              <div className="mt-6 space-y-4">
                <button
                  onClick={updateProfile}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Profile
                </button>
                <button
                  onClick={userLogout}
                  className="w-full px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <UpdateProfile setShowForm={setShowForm} />
        )}
      </div>
    </div>
  );
};

export default Profile;