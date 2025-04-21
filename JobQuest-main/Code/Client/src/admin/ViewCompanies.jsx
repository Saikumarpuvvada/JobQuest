import React, { useEffect, useState } from "react";
import axiosapi from "../axiosapi";
import { Link } from "react-router-dom";
import { FiSearch, FiEdit2, FiTrash2, FiBriefcase, FiMail, FiClock } from "react-icons/fi";

const ViewCompanies = () => {
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

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.companyname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "active" && company.isActive) || 
                         (filter === "inactive" && !company.isActive);
    
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axiosapi.delete(`admin/company/${companyId}`);
        setCompanies(companies.filter(c => c._id !== companyId));
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Company Directory</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search companies..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Companies</option>
              <option value="inactive">Active</option>
              <option value="active">Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div key={company._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{company.companyname}</h2>
                      {!company.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </div>
                    <img
                      src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29ktigHTIZj4MyGEoIO3hXAgTRbmhciUO_w&s" || "./companyuser.jpg"}
                      alt={company.companyname}
                      className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "./companyuser.jpg";
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FiBriefcase className="mr-2 text-blue-500" />
                      <span>{company.role || "Not specified"}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiMail className="mr-2 text-blue-500" />
                      <span>{company.email}</span>
                    </div>
                    {company.createdAt && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <FiClock className="mr-2" />
                        <span>Joined {new Date(company.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Link
                      to={`/company/${company._id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiEdit2 className="mr-2" />
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FiTrash2 className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search query" : "No companies have registered yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCompanies;