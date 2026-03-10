import React from "react";
import "./css/Navbar.css";

const Navbar = ({ isLoggedIn, user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg farm-navbar">
      <div className="container-fluid">

        <a className="navbar-brand brand-logo" href="/">
          🌱 FarmLink
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/products">Products</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/market">Seeds & Fertilizers</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/about">About us</a>
            </li>

          </ul>

          <div className="d-flex align-items-center">

            {isLoggedIn && (
              <span className="user-name me-3">
                {user?.name}
              </span>
            )}

            {isLoggedIn ? (
              <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <a href="/login">
                <button className="btn login-btn">
                  Login
                </button>
              </a>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;