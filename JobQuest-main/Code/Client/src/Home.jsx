import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSignIn from "./admin/AdminSignIn";
import SignIn from "./seeker/SignIn";
import CompanySignIn from "./company/CompanySignIn";
import {
  FaBriefcase,
  FaUsers,
  FaUserTie,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaStar,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [stats, setStats] = useState({
    jobsPosted: 1,
    candidatesHired: 2,
    companiesRegistered: 1,
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        jobsPosted: prev.jobsPosted + Math.floor(Math.random() * 3),
        candidatesHired: prev.candidatesHired + Math.floor(Math.random() * 2),
        companiesRegistered:
          prev.companiesRegistered + Math.floor(Math.random()),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handlePost= () => {
    toast.error("First register as a company to post a job");
    }

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer at TechCorp",
      text: "Found my dream job within a week of using JobQuest! The personalized recommendations were spot on.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "HR Manager at Innovate Inc.",
      text: "We've hired over 50 top-tier candidates through JobQuest. The platform saves us countless hours in recruitment.",
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Recent Graduate",
      text: "As a new grad, I was overwhelmed by job hunting. JobQuest's career guidance helped me land my first role!",
    },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechSolutions Inc.",
      location: "Remote",
      salary: "$85,000 - $110,000",
      type: "Full-time",
      posted: "2 hours ago",
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "New York, NY",
      salary: "$95,000 - $130,000",
      type: "Full-time",
      posted: "1 day ago",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Creative Minds",
      location: "San Francisco, CA",
      salary: "$90,000 - $120,000",
      type: "Contract",
      posted: "3 days ago",
    },
  ];

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-indigo-600">
                JobQuest
              </span>
              <span className="text-xs text-gray-500">by MERN</span>
            </Link>
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Browse Jobs
              </Link>
              <Link
                to="/"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Companies
              </Link>
              <Link
                to="/"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Career Advice
              </Link>

              <div className="relative group">
                <button className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200">
                  Sign In
                  <FaChevronDown className="ml-2 h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="py-1">
                    <Link
                      to="/userregister"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Job Seeker
                    </Link>
                    <Link
                   to="/companylogin"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Employer
                    </Link>
                    <Link
                      to="/admin"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Admin
                    </Link>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePost}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
              >
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-indigo-700 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Find Your Dream</span>
                <span className="block text-indigo-200">Job Today</span>
              </h1>
              <p className="mt-3 text-base text-indigo-200 sm:mt-5 sm:text-lg md:mt-5 md:text-xl max-w-xl mx-auto lg:mx-0">
                Join thousands of companies and job seekers using our platform
                to connect talent with opportunity.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  to="/"
                  className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200 shadow-md"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/userregister"
                  className="px-8 py-3 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition-colors duration-200 shadow-md"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                value: stats.jobsPosted,
                label: "Jobs Posted",
                subtext: "Updated in real-time",
              },
              {
                value: stats.candidatesHired,
                label: "Candidates Hired",
                subtext: "Changing lives daily",
              },
              {
                value: stats.companiesRegistered,
                label: "Companies Registered",
                subtext: "From startups to Fortune 500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-indigo-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl font-bold text-indigo-600">
                  {stat.value.toLocaleString()}+
                </div>
                <div className="mt-2 text-lg font-medium text-gray-900">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How JobQuest Works
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
              Whether you're looking for talent or your next opportunity, we
              make the process simple.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200">
              <FaUsers className="h-20 w-20 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                For Job Seekers
              </h3>
              <ol className="mt-4 text-left text-gray-500 space-y-3 list-decimal list-inside">
                <li>Create your profile in minutes</li>
                <li>Get matched with relevant jobs</li>
                <li>Apply with one click</li>
                <li>Track your applications</li>
              </ol>
              <button
                onClick={() => handleButtonClick("user")}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Sign In as Job Seeker
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200">
              <FaBriefcase className="h-20 w-20 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                For Employers
              </h3>
              <ol className="mt-4 text-left text-gray-500 space-y-3 list-decimal list-inside">
                <li>Post your job openings</li>
                <li>Receive qualified applicants</li>
                <li>Manage candidates in one place</li>
                <li>Hire the best talent</li>
              </ol>
              <button
                onClick={() => handleButtonClick("company")}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Sign In as Employer
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200">
              <FaUserTie className="h-20 w-20 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                For Administrators
              </h3>
              <ol className="mt-4 text-left text-gray-500 space-y-3 list-decimal list-inside">
                <li>Manage platform content</li>
                <li>Monitor user activity</li>
                <li>Generate reports</li>
                <li>Ensure platform quality</li>
              </ol>
              <button
                onClick={() => handleButtonClick("admin")}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Job Opportunities
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
              Recently posted positions that match our users' skills
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-500 p-3 rounded-md">
                      <FaBriefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="mr-2 h-5 w-5 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaDollarSign className="mr-2 h-5 w-5 text-gray-400" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2 h-5 w-5 text-gray-400" />
                      {job.type} • Posted {job.posted}
                    </div>
                  </div>
                  <Link
                    to={`/`}
                    className="mt-6 block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              View All Jobs
              <FaArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose JobQuest?
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
              Our platform is designed to make job searching and hiring seamless
              and efficient.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <FaBriefcase className="h-20 w-20 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
                AI-Powered Matching
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Our advanced algorithm matches your profile with the most
                relevant job opportunities based on your skills, experience, and
                preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <FaCalendarAlt className="h-20 w-20 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
                Real-time Updates
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Get instant notifications when new jobs are posted, when
                employers view your profile, or when your application status
                changes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <FaUsers className="h-20 w-20 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
                Career Development Tools
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Access resume builders, interview preparation resources, and
                career coaching to help you stand out in the job market.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
              Hear from people who found their dream jobs through JobQuest
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FaUserTie className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 italic">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 flex space-x-1">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-700 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to transform your career?</span>
            <span className="block">Start using JobQuest today.</span>
          </h2>
          <p className="mt-4 text-lg text-indigo-200">
            Join thousands of professionals and companies who've already found
            success with our platform.
          </p>
          <Link
            to="/userregister"
            className="mt-8 inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors duration-200 shadow-md"
          >
            Sign up for free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "For Job Seekers",
                links: [
                  { to: "/jobs", label: "Browse Jobs" },
                  { to: "/resume-builder", label: "Resume Builder" },
                  { to: "/career-advice", label: "Career Advice" },
                  { to: "/salary-tools", label: "Salary Tools" },
                ],
              },
              {
                title: "For Employers",
                links: [
                  { to: "/post-job", label: "Post a Job" },
                  { to: "/pricing", label: "Pricing" },
                  {
                    to: "/recruiting-solutions",
                    label: "Recruiting Solutions",
                  },
                  { to: "/employer-resources", label: "Resources" },
                ],
              },
              {
                title: "Company",
                links: [
                  { to: "/about", label: "About Us" },
                  { to: "/careers", label: "Careers" },
                  { to: "/blog", label: "Blog" },
                  { to: "/press", label: "Press" },
                ],
              },
              {
                title: "Support",
                links: [
                  { to: "/help-center", label: "Help Center" },
                  { to: "/contact", label: "Contact Us" },
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms of Service" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.to}
                        className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link
                to="#"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                <FaFacebookF className="h-6 w-6" />
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                <FaTwitter className="h-6 w-6" />
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                <FaLinkedinIn className="h-6 w-6" />
              </Link>
            </div>
            <p className="mt-8 md:mt-0 text-base text-white">
              © {new Date().getFullYear()} JobQuest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

   
    </div>
  );
};

export default Home;
