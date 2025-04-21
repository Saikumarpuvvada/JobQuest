import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPlusSquare,
  FiBriefcase,
  FiUsers,
  FiAward,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronRight
} from "react-icons/fi";
import PostJobs from "./PostJobs";
import ViewPostedJobs from "./ViewPostedJobs";
import CompanyProfile from "./CompanyProfile";
import ViewResluts from "./ViewResluts";
import ViewApplicantsCompany from "./ViewApplicantsCompany";
import axiosapi from "../axiosapi";

const CompanyNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [postedJobData, setPostedJobData] = useState([]);
  const [message, setMessage] = useState("");
  const compId = sessionStorage.getItem("compId");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    navigate("/companyhome");
  };

  const fetchCompanyData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        axiosapi.get("/company/stats"),
        axiosapi.get("/company/activities")
      ]);
      setStats(statsRes.data);
      setRecentActivities(activityRes.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const getApplicants = async () => {
    try {
      const response = await axiosapi.get(`/company/application/${compId}`);
      setApplications(response.data.internship || []);
      setMessage(response.data.message || "");
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const getData = async () => {
    try {
      const res = await axiosapi.get(`/company/intern/${compId}`);
      setPostedJobData(res.data.job || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handlelogout = () => {
    sessionStorage.removeItem("compId");
    navigate("/");
  };

  useEffect(() => {
    getApplicants();
    getData();
  }, []);

  useEffect(() => {
    if (activeTab === "home") fetchCompanyData();
  }, [activeTab]);

  const NavItem = ({ icon: Icon, label, tab }) => (
    <button
      onClick={() => handleTabChange(tab)}
      className={`flex items-center px-4 py-3 rounded-lg transition-all w-full ${
        activeTab === tab
          ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 border-l-4 border-indigo-500"
          : "hover:bg-gray-50 text-gray-600 hover:text-indigo-600"
      }`}
    >
      <Icon className={`mr-3 text-lg ${activeTab === tab ? "text-indigo-600" : "text-gray-500"}`} />
      <span className="font-medium">{label}</span>
      {activeTab === tab && <FiChevronRight className="ml-auto text-indigo-400" />}
    </button>
  );

  const StatsCard = ({ icon: Icon, title, value, trend, color }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color.bg}`}>
          <Icon className={`text-xl ${color.text}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          <p className="text-sm text-gray-600">{title}</p>
          {trend && (
            <span className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
              trend > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}>
              {trend > 0 ? `↑ ${trend}%` : `↓ ${Math.abs(trend)}%`} from last month
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center">
              <span>JOBQUEST</span>
              <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">COMPANY</span>
            </Link>
          </div>
          <div className="flex flex-col flex-grow px-4 py-6 space-y-2">
            <NavItem icon={FiHome} label="Dashboard" tab="home" />
            <NavItem icon={FiPlusSquare} label="Post Jobs" tab="addjobs" />
            <NavItem icon={FiBriefcase} label="Posted Jobs" tab="viewjobs" />
            <NavItem icon={FiUsers} label="Applicants" tab="viewapps" />
            <NavItem icon={FiAward} label="Results" tab="viewresults" />
            <NavItem icon={FiUser} label="Company Profile" tab="profile" />
          </div>
          <div className="px-4 py-4 border-t border-gray-200">
            <button onClick={handlelogout} className="flex items-center w-full px-4 py-3 text-gray-600 hover:text-red-600 rounded-lg transition-colors">
              <FiLogOut className="mr-3 text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform md:hidden`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-indigo-600">JOBQUEST</Link>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-md text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col flex-grow px-4 py-6 space-y-2 overflow-y-auto">
          <NavItem icon={FiHome} label="Dashboard" tab="home" />
          <NavItem icon={FiPlusSquare} label="Post Jobs" tab="addjobs" />
          <NavItem icon={FiBriefcase} label="Posted Jobs" tab="viewjobs" />
          <NavItem icon={FiUsers} label="Applicants" tab="viewapps" />
          <NavItem icon={FiAward} label="Results" tab="viewresults" />
          <NavItem icon={FiUser} label="Company Profile" tab="profile" />
          <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:text-red-600 rounded-lg transition-colors" onClick={handlelogout}>
            <FiLogOut className="mr-3 text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 md:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-md text-gray-500 hover:text-gray-700">
              <FiMenu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-xl font-bold text-indigo-600">JOBQUEST</Link>
            <div className="w-6"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            {activeTab === "addjobs" && <PostJobs />}
            {activeTab === "viewjobs" && <ViewPostedJobs />}
            {activeTab === "profile" && <CompanyProfile />}
            {activeTab === "viewapps" && <ViewApplicantsCompany setActiveTab={setActiveTab} />}
            {activeTab === "viewresults" && <ViewResluts />}

            {activeTab === "home" && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">Company Dashboard</h2>
                      <p className="text-gray-600">Welcome back! Here's your recruitment overview for today.</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Post New Job
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                  <StatsCard
                    icon={FiBriefcase}
                    title="Total Jobs Posted"
                    value={(postedJobData && postedJobData.length) || 0}
                    trend={12}
                    color={{ bg: "bg-indigo-100", text: "text-indigo-600" }}
                  />
                  <StatsCard
                    icon={FiUsers}
                    title="Active Applications"
                    value={(applications && applications.length) || 0}
                    trend={-4}
                    color={{ bg: "bg-green-100", text: "text-green-600" }}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyNav;
