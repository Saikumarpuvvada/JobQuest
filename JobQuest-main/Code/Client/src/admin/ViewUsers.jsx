import React, { useEffect, useState } from "react";
import axiosapi, { baseURL } from "../axiosapi";

const ViewUsers = () => {
  const [userProf, setUserProf] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

  return (
    <div className="view-users-container" style={{ padding: "2rem" }}>
      <h2 className="text-center mb-4">Registered Users</h2>
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : userProf.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {userProf.map((user) => (
            <div className="col" key={user._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    {user.firstname} {user.lastname}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="text-center mb-3">
                    <img
                      src={`${baseURL}uploads/${user.image}`}
                      className="rounded-circle border"
                      alt="Profile"
                      width="120"
                      height="120"
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/120";
                      }}
                    />
                  </div>
                  
                  <div className="user-details">
                    <div className="mb-2">
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div className="mb-2">
                      <strong>Phone:</strong> {user.mobileno}
                    </div>
                    <div className="mb-2">
                      <strong>College:</strong> {user.college}
                    </div>
                    <div className="mb-2">
                      <strong>Gender:</strong> {user.gender}
                    </div>
                    <div className="mb-2">
                      <strong>Qualification:</strong> {user.qualification}
                    </div>
                    <div className="mb-2">
                      <strong>Percentage:</strong> {user.percentage}%
                    </div>
                    <div className="mb-2">
                      <strong>Year of Passing:</strong> {user.year_of_passing}
                    </div>
                    <div className="mb-2">
                      <strong>Date of Birth:</strong> {user.date_of_birth}
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <small className="text-muted">User ID: {user._id}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center">
          No users registered yet.
        </div>
      )}
    </div>
  );
};

export default ViewUsers;