import React, { useEffect, useState } from "react";
import axiosapi, { baseURL } from "../axiosapi";
import { toast } from "react-toastify";
import { FiDownload, FiUser, FiMail, FiAward, FiPercent, FiMapPin, FiPhone, FiCheckCircle, FiXCircle } from "react-icons/fi";

const ViewApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getApplicants = async () => {
    try {
      const response = await axiosapi.get("/admin/applications");
      setApplications(response.data.applications || []);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicants();
  }, []);

  const downloadResume = (resume) => {
    const resumeUrl = `${baseURL}resume/${resume}`;
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleApplication = async (status, userId, internId) => {
    try {
      await axiosapi.post(`admin/applications/${userId}/${internId}`, { status });
      setApplications(prev => prev.filter(app => !(app.user === userId && app.intern === internId)));
      toast.success(`Application ${status ? "accepted" : "rejected"} successfully`);
    } catch (error) {
      console.error("Application error:", error);
      toast.error(`Failed to ${status ? "accept" : "reject"} application`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applicant Management</h1>
          <p className="text-gray-600">Review and manage internship applications</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FiUser className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800">{item.fullname}</h2>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FiAward className="mr-2 text-green-500" />
                      <span>{item.qualification}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiPercent className="mr-2 text-purple-500" />
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-2 text-red-500" />
                      <span>{item.Address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiPhone className="mr-2 text-yellow-500" />
                      <span>{item.mobileno}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => downloadResume(item.resume)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FiDownload className="mr-2" />
                      Resume
                    </button>

                    <div className="space-x-2">
                      {item.status ? (
                        <button
                          onClick={() => handleApplication(false, item.user, item.intern)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center"
                        >
                          <FiXCircle className="mr-2" />
                          Reject
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApplication(true, item.user, item.intern)}
                          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center"
                        >
                          <FiCheckCircle className="mr-2" />
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-500">{message || "There are currently no applications to review"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplicants;