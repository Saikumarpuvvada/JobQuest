import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Using react-hot-toast for toasts

// Seeker Components
import RegistrationForm from "./seeker/RegistrationForm";
import Practice from "./seeker/Practice";
import SignIn from "./seeker/SignIn";
import SignUp from "./seeker/SignUp";
import Profile from "./seeker/Profile";
import UserHome from "./seeker/UserHome";
import ApplyJob from "./seeker/ApplyJob";
import UpdateProfile from "./seeker/UpdateProfile";
import Exam from "./seeker/Exam";
import Footer from "./seeker/Footer";

// Company Components
import CompanySignIn from "./company/CompanySignIn";
import CompanySignUp from "./company/CompanySignUp";
import CompanyHome from "./company/CompanyHome";
import CompanyUpdate from "./company/CompanyUpdate";
import UpdatePostedJobs from "./company/UpdatePostedJobs";
import AddQuestions from "./company/AddQuestions";

// Admin Component
import AdminHome from "./admin/AdminHome";

// Common Components
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import ErrorBoundary from "./ErrorBoundary";
import AdminSignIn from "./admin/AdminSignIn";
import JobMatcher from "./JobMatcher";

function App() {
  return (
    <>
      <div className="pic main-content">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />


            {/* Seeker Routes */}
            <Route path="/userregister" element={<SignUp />} />
            <Route path="/userlogin" element={<SignIn />} />
            <Route path="/profile" element={<Profile  />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/userhome" element={<UserHome />} />
            <Route path="/reg" element={<RegistrationForm />} />
            <Route path="/applyform/:jobid" element={<ApplyJob />} />
            <Route path="/exam/:id" element={<Exam />} />

            {/* Company Routes */}
            <Route  path="/companylogin" element={<CompanySignIn/>}/>
            <Route path="/companyregister" element={<CompanySignUp />} />
            <Route path="/companyhome" element={<CompanyHome />} />
            <Route path="/companyupdate" element={<CompanyUpdate />} />
            <Route path="/updatepostedjob" element={<UpdatePostedJobs />} />
            <Route path="/addQuestions" element={<AddQuestions />} />

            {/* Admin Route */}
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/admin" element={<AdminSignIn />} />

            {/* Catch-all Route for 404 */}
            <Route path="*" element={<ErrorPage />} />

            <Route path="/job" element={<JobMatcher />} />
          </Routes>

          {/* Global Toaster */}
          <Toaster />

          {/* Footer should be inside the router layout for consistency */}
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </>
  );
}

// Wrap the App in an Error Boundary to catch runtime errors
export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
