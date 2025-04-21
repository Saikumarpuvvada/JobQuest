import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiChevronDown, FiChevronUp, FiCheck, FiX, FiClock, FiDollarSign, FiMapPin, FiBriefcase, FiBook } from "react-icons/fi";

const ViewJobsPosted = () => {
  const [expandedJob, setExpandedJob] = useState(null);
  const [postedJobData, setPostedJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const approvePosting = async (id) => {
    try {
      await axiosapi.post(`admin/admin/${id}`, { status: true });
      toast.success("Job approved successfully!");
      setPostedJobData(prev => 
        prev.map(job => job._id === id ? {...job, status: true} : job)
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve job");
    }
  };

  const rejectJob = async (id) => {
    try {
      await axiosapi.post(`admin/admin/${id}`, { status: false });
      toast.success("Job rejected successfully!");
      setPostedJobData(prev => 
        prev.map(job => job._id === id ? {...job, status: false} : job)
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject job");
    }
  };

  const getData = async () => {
    try {
      const res = await axiosapi.get("admin/intern");
      setPostedJobData(res.data.interns || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleDetails = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Posted Jobs Management</h1>
          <p className="mt-2 text-lg text-gray-600">
            Review and manage all job postings
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : postedJobData.length > 0 ? (
          <div className="space-y-6">
            {postedJobData.map((job) => (
              <div key={job._id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiBriefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.companyname}</p>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        job.status 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {job.status ? "Approved" : "Pending Approval"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <FiDollarSign className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">
                        {job.salary} ₹/month
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">{job.experience} months exp</span>
                    </div>
                    <div className="flex items-center">
                      <FiBook className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">{job.Education}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDetails(job._id)}
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
                  >
                    {expandedJob === job._id ? (
                      <>
                        <span>Hide Details</span>
                        <FiChevronUp className="ml-1 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <FiChevronDown className="ml-1 h-5 w-5" />
                      </>
                    )}
                  </button>

                  {expandedJob === job._id && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Job Details</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-gray-600 w-32">Role:</span>
                            <span className="text-gray-800">{job.role}</span>
                          </li>
                          <li className="flex">
                            <span className="text-gray-600 w-32">Vacancies:</span>
                            <span className="text-gray-800">{job.opening}</span>
                          </li>
                          <li className="flex">
                            <span className="text-gray-600 w-32">Key Skills:</span>
                            <span className="text-gray-800">{job.Key_Skills}</span>
                          </li>
                          <li className="flex">
                            <span className="text-gray-600 w-32">Description:</span>
                            <span className="text-gray-800">{job.description}</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Company Details</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-gray-600 w-32">Industry:</span>
                            <span className="text-gray-800">{job.Industry_Type}</span>
                          </li>
                          <li className="flex">
                            <span className="text-gray-600 w-32">Department:</span>
                            <span className="text-gray-800">{job.Department}</span>
                          </li>
                          <li className="flex">
                            <span className="text-gray-600 w-32">Employment Type:</span>
                            <span className="text-gray-800">{job.Employment_Type}</span>
                          </li>
                          <li className="flex">
                            <span className="text-gray-600 w-32">Address:</span>
                            <span className="text-gray-800">{job.Address}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                  {job.status ? (
                    <button
                      onClick={() => rejectJob(job._id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FiX className="mr-2 h-4 w-4" />
                      Reject
                    </button>
                  ) : (
                    <button
                      onClick={() => approvePosting(job._id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiCheck className="mr-2 h-4 w-4" />
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-500">
              There are currently no job postings to review
            </p>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ViewJobsPosted;