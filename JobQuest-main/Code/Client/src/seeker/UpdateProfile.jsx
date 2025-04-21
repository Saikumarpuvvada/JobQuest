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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={userLogout}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6 mr-1"
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
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {userProf && showUpdateForm ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden">
                    <img
                      src={`${baseURL}uploads/${userProf.image}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = "./companyuser.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold">
                    {userProf.firstname} {userProf.lastname}
                  </h1>
                  <p className="mt-1 text-blue-100">{userProf.email}</p>
                  <p className="mt-1">{userProf.mobileno}</p>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    <button
                      onClick={downloadResume}
                      className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
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
                      className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
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
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
              {/* Left Column */}
              <div className="md:col-span-1 space-y-6">
                {/* About Me */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    About Me
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {userProf.about || "No information provided"}
                  </p>
                </div>

                {/* Personal Info */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Personal Details
                  </h2>
                  <div className="space-y-3">
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
              </div>

              {/* Right Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Education */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Education
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {userProf.qualification}
                      </h3>
                      <p className="text-gray-600">{userProf.college}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Year of Passing: {userProf.year_of_passing}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Experience
                  </h2>
                  {userProf.organization ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {userProf.designation}
                        </h3>
                        <p className="text-gray-600">
                          {userProf.organization}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {userProf.totalexperience} months
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No experience added</p>
                  )}
                </div>

                {/* Skills */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Skills
                  </h2>
                  {userProf.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {userProf.skills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No skills added</p>
                  )}
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
                Complete Your Profile
              </h2>
              <p className="mt-2 text-gray-600">
                Build your profile to apply for internships and jobs
              </p>
              <div className="mt-6 space-y-4">
                <button
                  onClick={updateProfile}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-colors"
                >
                  Create Profile Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <UpdateProfile setShowForm={setShowForm} />
        )}
      </main>
    </div>
  );
};

export default Profile;