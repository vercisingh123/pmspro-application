

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/dashboard-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setEmail(data.email || data.user?.email || "");
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        navigate("/login");
      });
  }, [navigate, setIsAuthenticated]);

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setIsAuthenticated(false);
        navigate("/");
      })
      .catch(() => {
        setIsAuthenticated(false);
        navigate("/");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2>Welcome to your PMS Pro Dashboard!</h2>
      <p>Email: {email}</p>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
