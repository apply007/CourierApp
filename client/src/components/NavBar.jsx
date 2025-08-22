import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Navbar = ({ user, onLogout,token }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>
          CourierPro
        </div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user?.role === "customer" && (
            <>
              <li>
                <Link to="/book">Book Parcel</Link>
              </li>
              <li>
                <Link to="/myparcels">My Parcels</Link>
              </li>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </>
          )}
          {token ? (
            <li>
              <span className="logout-btn" onClick={onLogout}>
                Logout
              </span>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        <div
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
