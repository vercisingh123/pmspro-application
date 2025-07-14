

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setIsAuthenticated(false);
      navigate("/");
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        PMS Pro
      </div>
      <div className="navbar-links">
        {!isAuthenticated ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <>
            {/* <button className="login-btn" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button> */}
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
