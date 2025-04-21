import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";

const ViewAppliedJobs = ({ setShowResume }) => {
  const [showDetails, setShowDetails] = useState(null); // Changed to null for modal
  const [postedJobData, setPostedJobData] = useState([]);
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();
  const Userid = sessionStorage.getItem("user");
  const id = JSON.parse(Userid)._id;

  const getData = async () => {
    try {
      const res = await axiosapi.get(`user/apply/${id}`);
      console.log(res, "backend response");
      setPostedJobData(res.data.interns);
      setStatus(res.data.internship);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const viewDetails = (id) => {
    setShowDetails(id);
  };

  const closeModal = () => {
    setShowDetails(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postedJobData?.length > 0 ? (
          postedJobData.map((item) => (
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

              <div className="flex justify-between items-center">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => viewDetails(item._id)}
                >
                  View Details
                </button>
                <div>
                  {status.map((element) =>
                    element.intern === item._id ? (
                      element.status ? (
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                          onClick={() => {
                            navigate(`/exam/${item._id}`);
                            setShowResume("exam");
                          }}
                        >
                          Exam
                        </button>
                      ) : (
                        <span className="text-gray-500">Processing</span>
                      )
                    ) : null
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 py-10">
            No applied jobs found
          </p>
        )}
      </div>

      {/* Modal Dialog */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {postedJobData
              .filter((item) => item._id === showDetails)
              .map((item) => (
                <div key={item._id}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.title}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{item.companyname}</p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Job Details
                      </h3>
                      <p className="text-gray-700">
                        <strong>Role:</strong> {item.role}
                      </p>
                      <p className="text-gray-700">
                        <strong>Vacancies:</strong> {item.opening}
                      </p>
                      <p class Name="text-gray-700">
                        <strong>Education:</strong> {item.Education}
                      </p>
                      <p className="text-gray-700">
                        <strong>Skills:</strong> {item.Key_Skills}
                      </p>
                      <p className="text-gray-700">
                        <strong>Experience:</strong> {item.experience} months
                      </p>
                      <p className="text-gray-700">
                        <strong>Salary/Stipend:</strong> ₹{item.salary}/month
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
                        <strong>Location:</strong> {item.location}
                      </p>
                      <p className="text-gray-700">
                        <strong>Shift:</strong> {item.Shifts}
                      </p>
                      <p className="text-gray-700">
                        <strong>Department:</strong> {item.Department}
                      </p>
                      <p className="text-gray-700">
                        <strong>Type:</strong> {item.Employment_Type}
                      </p>
                      <p className="text-gray-700">
                        <strong>Address:</strong> {item.Address}
                      </p>
                    </div>

                    <div>
                      <h3
                        className="text-lg font-medium text-gray-800"
                        title="If status is Accepted you can expect a call"
                      >
                        Application Status:
                        <span className="ml-2">
                          {status.map((element) =>
                            element.intern === item._id
                              ? element.status
                                ? "Accepted"
                                : "Processing"
                              : ""
                          )}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAppliedJobs;
