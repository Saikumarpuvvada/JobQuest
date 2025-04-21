import React, { useEffect, useState } from "react";
import axiosapi, { baseURL } from "../axiosapi";
import { useNavigate } from "react-router-dom";

const ViewApplicantsCompany = ({ setShowPostJobs }) => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState();
  const compId = sessionStorage.getItem("compId");
  const navigate = useNavigate();

  const getApplicants = async () => {
    try {
      const response = await axiosapi.get(`/company/application/${compId}`);
      setApplications(response.data.internship);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const downloadResume = (resume) => {
    const resumeUrl = `${baseURL}resume/${resume}`;
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = resumeUrl;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-16 space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Applicants List</h2>

      {applications && applications.length > 0 ? (
        applications.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <div className="space-y-2 text-gray-800">
              <p>
                <span className="font-medium">Name:</span> {item.fullname}
              </p>
              <p>
                <span className="font-medium">Email:</span> {item.email}
              </p>
              <p>
                <span className="font-medium">Qualification:</span> {item.qualification}
              </p>
              <p>
                <span className="font-medium">Percentage:</span> {item.percentage}%
              </p>
              <p>
                <button
                  onClick={() => downloadResume(item.resume)}
                  className="text-indigo-600 hover:underline"
                >
                  View Resume
                </button>
              </p>
              <p>
                <span className="font-medium">Address:</span> {item.Address}
              </p>
              <p>
                <span className="font-medium">Mobile:</span> {item.mobileno}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">{message || "No applications yet."}</div>
      )}

      {applications && applications.length > 0 && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => {
              navigate("/addquestions");
              setShowPostJobs("Home");
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewApplicantsCompany;
