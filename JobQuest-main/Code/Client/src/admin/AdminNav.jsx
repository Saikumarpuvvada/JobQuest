import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiUserCheck,
  FiLogOut,
  FiDollarSign,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";
import axiosapi from "../axiosapi";
import ViewCompanies from "./ViewCompanies";
import ViewUsers from "./ViewUsers";
import ViewJobsPosted from "./ViewJobsPosted";
import ViewApplicants from "./ViewApplicants";

const AdminNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const fetchStats = async () => {
    try {
      const response = await axiosapi.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  useEffect(() => {
    if (activeTab === "home") fetchStats();
  }, [activeTab]);

  const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className={`p-6 rounded-xl ${color} text-white transition-transform hover:scale-105`}>
      <div className="flex items-center gap-4">
        <Icon className="w-8 h-8" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  const NavButton = ({ label, icon: Icon, tab }) => (
    <button
      onClick={() => handleTabChange(tab)}
      className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
        activeTab === tab ? "bg-indigo-800" : "hover:bg-indigo-600"
      }`}
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </button>
  );


  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'inactive'

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axiosapi.get("admin/company");
      setCompanies(response.data.companys || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  console.log()

  const [userProf, setUserProf] = useState([]);
  
  const viewAllUsers = async () => {
    try {
      const viewresuls = await axiosapi.get("admin/users");
      setUserProf(viewresuls.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    viewAllUsers();
  }, []);

  const [postedJobData, setPostedJobData] = useState([]);


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

  const [applications, setApplications] = useState([]);
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



  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-indigo-700 text-white shadow-lg fixed w-full z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              <span className="text-white">JOBQUEST</span>
              <span className="text-indigo-200">: Admin Portal</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 items-center">
              <NavButton label="Dashboard" icon={FiHome} tab="home" />
              <NavButton label="Users" icon={FiUsers} tab="users" />
              <NavButton label="Companies" icon={FiBriefcase} tab="companies" />
              <NavButton label="Posted Jobs" icon={FiFileText} tab="jobs" />
              <NavButton label="Applicants" icon={FiUserCheck} tab="apps" />
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md flex items-center space-x-2 transition-colors hover:bg-red-600 text-red-100"
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-indigo-800 pb-4">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <NavButton label="Dashboard" icon={FiHome} tab="home" />
              <NavButton label="Users" icon={FiUsers} tab="users" />
              <NavButton label="Companies" icon={FiBriefcase} tab="companies" />
              <NavButton label="Posted Jobs" icon={FiFileText} tab="jobs" />
              <NavButton label="Applicants" icon={FiUserCheck} tab="apps" />
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-md flex items-center space-x-3 hover:bg-red-700 text-red-100"
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 pt-24 pb-10">
        <div className="container mx-auto px-4">
          {activeTab === "companies" && <ViewCompanies />}
          {activeTab === "users" && <ViewUsers />}
          {activeTab === "jobs" && <ViewJobsPosted />}
          {activeTab === "apps" && <ViewApplicants />}

          {activeTab === "home" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Admin Dashboard
                </h2>
                <p className="text-gray-600">
                  Welcome back! Here's an overview of platform activity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  icon={FiUsers}
                  title="Total Users"
                  value={userProf.length || 0}
                  color="bg-blue-500"
                />
                <StatsCard
                  icon={FiBriefcase}
                  title="Companies"
                  value={companies.length || 0}
                  color="bg-green-500"
                />
                <StatsCard
                  icon={FiFileText}
                  title="Active Jobs"
                  value={postedJobData.length|| 0}
                  color="bg-purple-500"
                />
                <StatsCard
                  icon={FiUserCheck}
                  title="Applications"
                  value={applications.length || 0}
                  color="bg-orange-500"
                />
              </div>

              {/* <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FiActivity className="text-indigo-600" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {stats.recentActivities?.length > 0 ? (
                    stats.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                        <div
                          className={`p-2 rounded-full ${
                            activity.type === "job" ? "bg-blue-100" : "bg-green-100"
                          }`}
                        >
                          {activity.type === "job" ? (
                            <FiBriefcase className="text-blue-600" />
                          ) : (
                            <FiUserCheck className="text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.description}</p>
                          <time className="text-xs text-gray-400">{activity.timestamp}</time>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No recent activities found
                    </p>
                  )}
                </div>
              </div> */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiTrendingUp className="text-green-600" />
                    Platform Growth
                  </h3>
                  {/* Insert chart or metric component here */}
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiDollarSign className="text-yellow-600" />
                    Job Statistics
                  </h3>
                  {/* Insert chart or metric component here */}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} JOBQUEST - Navigating Your Career Journey
          <div className="mt-1 text-xs">
            Admin Portal v1.0.0 | Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminNav;
