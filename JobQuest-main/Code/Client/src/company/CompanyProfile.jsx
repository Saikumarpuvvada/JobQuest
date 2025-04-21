import React, { useEffect, useState } from "react";
import axiosapi from "../axiosapi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorPage from "../ErrorPage";

const CompanyProfile = () => {
  const [companyProf, setCompanyProf] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const compId = sessionStorage.getItem("compId");
  const navigate = useNavigate();

  const profileData = async () => {
    try {
      const res = await axiosapi.get(`company/profile/${compId}`);
      console.log("Profile data fetched:", res.data.company); // Debug log
      setCompanyProf(res.data.company);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching company profile:", error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const companyLogout = () => {
    sessionStorage.removeItem("compId");
    toast.success("Logged out");
    navigate("/");
  };

  useEffect(() => {
    if (compId) {
      profileData();
    } else {
      setHasError(true); // If no compId, show error
      setIsLoading(false);
    }
  }, [compId]); // Added compId as dependency to handle edge cases

  // Handle error state
  if (hasError) {
    return <ErrorPage />;
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  // Ensure companyProf is not null before rendering
  if (!companyProf) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-gray-500 text-lg">
        No profile data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhsND3b26M2noUqQ6-cycb-tcSgzL_Q9bSg&s"
          alt={`${companyProf.companyname} banner`}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            {companyProf.companyname}
          </h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>
              <span className="font-medium">Role:</span> {companyProf.role || "Not specified"}
            </li>
            <li>
              <span className="font-medium">Email:</span> {companyProf.email}
            </li>
          </ul>
          <div className="flex justify-between gap-4">
            <Link
              to="/companyupdate"
              className="flex-1 text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Update
            </Link>
            <button
              onClick={companyLogout}
              className="flex-1 text-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;