import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";

const ViewJobs = () => {
  const [showDetails, setShowDetails] = useState("");
  const [postedJobData, setPostedJobData] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const applyJob = (id) => {
    sessionStorage.setItem("jobid", id);
    navigate(`/applyform/${id}`);
  };

  const Userid = sessionStorage.getItem("user");
  const id = JSON.parse(Userid)._id;

  const getData = async () => {
    try {
      let url = `user/intern/${id}`;
      if (filter === "intern") {
        url = `user/jobs/${id}?jobtype=intern`;
      } else if (filter === "job") {
        url = `user/jobs/${id}?jobtype=job`;
      }
      const res = await axiosapi.get(url);
      setPostedJobData(res.data.jobs || res.data.internships);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);

  const viewDetails = (id) => {
    setShowDetails(showDetails === id ? "" : id);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <select
          className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Opportunities</option>
          <option value="intern">Internships</option>
          <option value="job">Full-time Jobs</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postedJobData?.length > 0 ? (
          postedJobData
            .filter((item) => filter === "" || item.jobtype === filter)
            .map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                    alt={`${item.companyname} logo`}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-600">{item.companyname}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <i className="fa fa-briefcase" /> {item.role}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fa fa-map-marker" /> {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fa fa-money" /> ₹{item.salary}/month
                    </span>
                  </div>

                  {showDetails === item._id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          Job Details
                        </h3>
                        <p className="text-gray-700">
                          <strong>Vacancies:</strong> {item.opening}
                        </p>
                        <p className="text-gray-700">
                          <strong>Education:</strong> {item.Education}
                        </p>
                        <p className="text-gray-700">
                          <strong>Skills:</strong> {item.Key_Skills}
                        </p>
                        <p className="text-gray-700">
                          <strong>Experience:</strong> {item.experience} months
                        </p>
                        <p className="text-gray-700">
                          <strong>Description:</strong> {item.description}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          Company Details
                        </h3>
                        <p className="text-gray-700">
                          <strong>Industry:</strong> {item.Industry_Type}
                        </p>
                        <p className="text-gray-700">
                          <strong>Department:</strong> {item.Department}
                        </p>
                        <p className="text-gray-700">
                          <strong>Shift:</strong> {item.Shifts}
                        </p>
                        <p className="text-gray-700">
                          <strong>Type:</strong> {item.Employment_Type}
                        </p>
                        <p className="text-gray-700">
                          <strong>Address:</strong> {item.Address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between gap-2">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => viewDetails(item._id)}
                  >
                    {showDetails === item._id ? "Hide Details" : "View Details"}
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    onClick={() => applyJob(item._id)}
                  >
                    Apply Now <i className="fa fa-arrow-right" />
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="col-span-full text-center text-gray-600 py-10">
            No opportunities found
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewJobs;