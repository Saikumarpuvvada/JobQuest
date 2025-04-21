import React, { useEffect, useState } from "react";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";

const ViewResults = () => {
  const compId = sessionStorage.getItem("compId");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axiosapi.get(`user/examresults/${compId}`);
        setResults(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch exam results");
      } finally {
        setLoading(false);
      }
    };
    if (compId) fetchResults();
  }, [compId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Exam Results</h2>

      {loading ? (
        <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg">
          No results available for your company.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-indigo-600 text-white text-left">
              <tr>
                <th className="px-6 py-3">Intern Title</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Job Type</th>
                <th className="px-6 py-3">Submitted At</th>
                <th className="px-6 py-3">Total Marks</th>
                <th className="px-6 py-3">User Name</th>
                <th className="px-6 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr
                  key={result._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-3">{result.internId.title}</td>
                  <td className="px-6 py-3">{result.internId.companyname}</td>
                  <td className="px-6 py-3">{result.internId.jobtype}</td>
                  <td className="px-6 py-3">
                    {new Date(result.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 font-semibold">{result.totalMarks}</td>
                  <td className="px-6 py-3">{result.userId.fullname}</td>
                  <td className="px-6 py-3">{result.userId.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewResults;
