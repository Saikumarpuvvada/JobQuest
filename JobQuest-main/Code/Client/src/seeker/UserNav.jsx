import React, { useState, useEffect } from "react";
import { FiHome, FiEdit, FiFileText, FiUser, FiLogOut, FiChevronRight, FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import RegistrationForm from "./RegistrationForm";
import ViewJobs from "./ViewJobs";
import ViewAppliedJobs from "./ViewAppliedJobs";
import axiosapi from "../axiosapi";

const UserNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchResults, setSearchResults] = useState([]);
  const [showDetails, setShowDetails] = useState("");
  const [resumeText, setResumeText] = useState('');
  const [jobMatches, setJobMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchError, setMatchError] = useState('');
  const Userid = sessionStorage.getItem("user");
  const id = JSON.parse(Userid)._id;
  const searchForm = useForm();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = async (data) => {
    try {
      const res = await axiosapi.get(`/user/internship/${id}/?title=${data.title}`);
      setSearchResults(res.data.internships);
      setActiveTab("search");
    } catch (err) {
      console.error("Search error:", err);
      setActiveTab("home");
    }
  };

  const applyJob = (jobId) => {
    sessionStorage.setItem("jobid", jobId);
    navigate(`/applyform/${jobId}`);
  };

  const toggleDetails = (jobId) => {
    setShowDetails((prev) => (prev === jobId ? "" : jobId));
  };

  const handleJobMatchSubmit = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setMatchError('Please enter your skills/experience');
      return;
    }

    setLoadingMatches(true);
    setMatchError('');
    setJobMatches([]);

    try {
      const response = await fetch(`http://localhost:5000/api/get_jobs?resume=${encodeURIComponent(resumeText)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setJobMatches(data || []);
      setActiveTab("jobMatches");
    } catch (err) {
      setMatchError('Failed to fetch job recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoadingMatches(false);
    }
  };

  const NavItem = ({ icon: Icon, label, tab }) => (
    <button
      onClick={() => handleTabChange(tab)}
      className={`flex items-center px-4 py-3 rounded-lg transition-all w-full ${
        activeTab === tab
          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500"
          : "hover:bg-gray-50 text-gray-600 hover:text-blue-600"
      }`}
    >
      <Icon className={`mr-3 text-lg ${activeTab === tab ? "text-blue-600" : "text-gray-500"}`} />
      <span className="font-medium">{label}</span>
      {activeTab === tab && <FiChevronRight className="ml-auto text-blue-400" />}
    </button>
  );

  const handlelogout = () => {
    sessionStorage.removeItem("jobid");
    sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-blue-600">JOBQUEST</span>
          </div>
          <div className="flex flex-col flex-grow px-4 py-6 space-y-2">
            <NavItem icon={FiHome} label="Home" tab="home" />
            <NavItem icon={FiEdit} label="Build Profile" tab="UpdateForm" />
            <NavItem icon={FiFileText} label="Applications" tab="applied" />
            <NavItem icon={FiUser} label="Profile" tab="profile" />
            <NavItem icon={FiSearch} label="Job Matcher" tab="jobMatcher" />
          </div>
          <div className="px-4 py-4 border-t border-gray-200">
            <button onClick={handlelogout} className="flex items-center w-full px-4 py-3 text-gray-600 hover:text-red-600 rounded-lg transition-colors">
              <FiLogOut className="mr-3 text-lg" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 md:hidden px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">JOBQUEST</span>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          {/* Search Bar (only in Home tab) */}
          {activeTab === "home" && (
            <form onSubmit={searchForm.handleSubmit(handleSearch)} className="mb-6 max-w-xl">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  {...searchForm.register("title")}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          )}

          {/* Tab Content */}
          {activeTab === "home" && <ViewJobs />}
          {activeTab === "UpdateForm" && <RegistrationForm />}
          {activeTab === "profile" && <Profile />}
          {activeTab === "applied" && <ViewAppliedJobs />}

          {activeTab === "search" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">
                {searchResults.length} result{searchResults.length !== 1 && "s"} found
              </h2>
              {searchResults.length === 0 ? (
                <p className="text-gray-500 text-center">No matching internships found.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-500">{item.companyname}</p>
                      <p className="text-sm text-gray-600 mt-2">{item.role}</p>
                      <p className="text-sm text-gray-600">₹{item.salary}/month</p>
                      <div className="flex justify-between mt-4">
                        <button
                          className="text-blue-600 hover:text-blue-800 text-sm"
                          onClick={() => toggleDetails(item._id)}
                        >
                          {showDetails === item._id ? "Hide Details" : "View Details"}
                        </button>
                        <button
                          onClick={() => applyJob(item._id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                          Apply
                        </button>
                      </div>
                      {showDetails === item._id && (
                        <div className="mt-4 text-sm text-gray-600">
                          <p><strong>Experience:</strong> {item.experience} months</p>
                          <p><strong>Education:</strong> {item.Education}</p>
                          <p><strong>Skills:</strong> {item.Key_Skills}</p>
                          <p><strong>Openings:</strong> {item.opening}</p>
                          <p><strong>Description:</strong> {item.description}</p>
                        </div>
                      )}
                    </div>
                  )
                  )}
                </div>
              )}
            </>
          )}


          {/* Job Matcher Tab */}
          {activeTab === "jobMatcher" && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                  Job Recommendation System
                </h1>
                <p className="text-lg text-gray-600">
                  Get personalized job matches based on your skills
                </p>
              </div>

              {matchError && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                  <p>{matchError}</p>
                </div>
              )}

              <form onSubmit={handleJobMatchSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="mb-6">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                    Paste your skills/experience:
                  </label>
                  <textarea
                    id="resume"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Example: Python, React, Machine Learning, 5 years experience..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingMatches}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loadingMatches ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loadingMatches ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Find Matching Jobs'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Job Matches Results */}
          {activeTab === "jobMatches" && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Recommended Jobs ({jobMatches.length})
              </h2>
              {jobMatches.length === 0 ? (
                <p className="text-gray-500 text-center">No job matches found. Try adjusting your skills.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobMatches.map((job, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {job.Position}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        {job.Company}
                      </p>
                      <p className="text-sm text-gray-500">{job.Location}</p>
                      <div className="mt-3">
                        <button
                          onClick={() => {
                            searchForm.setValue("title", job.Position);
                            handleSearch({ title: job.Position });
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Similar Jobs
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserNav;