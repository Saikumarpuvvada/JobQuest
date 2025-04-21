import React, { useEffect, useState } from "react";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdatePostedJobs from "./UpdatePostedJobs";

const ViewPostedJobs = () => {
  const [showDetails, setShowDetails] = useState("");
  const [postedJobData, setPostedJobData] = useState([]);
  const [showUpdatePostForm, setShowUpdatePostForm] = useState(true);
  const compId = sessionStorage.getItem("compId");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axiosapi.get(`company/intern/${compId}`);
      setPostedJobData(res.data.job);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axiosapi.delete(`company/intern/${compId}/${id}`);
      toast.success("Deleted successfully");
      getData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const updatePosting = (id) => {
    sessionStorage.setItem("updateId", id);
    setShowUpdatePostForm(false);
  };

  const viewDetails = (id) => {
    setShowDetails((prevId) => (prevId === id ? "" : id));
  };

  useEffect(() => {
    getData();
  }, []);

  if (!showUpdatePostForm) return <UpdatePostedJobs />;

  return (
    <div className="mt-24 px-4 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Posted Jobs</h1>

      {postedJobData.length === 0 ? (
        <p className="text-center text-gray-500">No jobs posted yet.</p>
      ) : (
        postedJobData.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-indigo-600">{job.title}</h2>
                <p className="text-gray-600">{job.companyname}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updatePosting(job._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            <button
              onClick={() => viewDetails(job._id)}
              className="text-sm text-indigo-500 hover:underline mt-3"
            >
              {showDetails === job._id ? "Hide Details" : "View Details"}
            </button>

            {showDetails === job._id && (
              <div className="mt-4 text-sm text-gray-700 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Job Details</h3>
                  <ul className="list-disc ml-6">
                    <li>Role: {job.role}</li>
                    <li>Vacancies: {job.opening}</li>
                    <li>Education: {job.Education}</li>
                    <li>Key Skills: {job.Key_Skills}</li>
                    <li>Experience: {job.experience} months</li>
                    <li>Salary: ₹{job.salary} /month</li>
                    <li>Description: {job.description}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Company Info</h3>
                  <ul className="list-disc ml-6">
                    <li>Industry: {job.Industry_Type}</li>
                    <li>Location: {job.location}</li>
                    <li>Shifts: {job.Shifts}</li>
                    <li>Department: {job.Department}</li>
                    <li>Employment Type: {job.Employment_Type}</li>
                    <li>Address: {job.Address}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Application Status</h3>
                  <p>
                    {job.status ? (
                      <span className="text-green-600 font-semibold">Accepted</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Processing</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewPostedJobs;
