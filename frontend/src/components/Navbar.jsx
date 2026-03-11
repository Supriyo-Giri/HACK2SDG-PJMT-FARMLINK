// import React from "react";
// import "./css/Navbar.css";

// const Navbar = ({ isLoggedIn, user, handleLogout }) => {
//   return (
//     <nav className="navbar navbar-expand-lg farm-navbar">
//       <div className="container-fluid">

//         <a className="navbar-brand brand-logo" href="/">
//           🌱 FarmLink
//         </a>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">

//           <ul className="navbar-nav me-auto">

//             <li className="nav-item">
//               <a className="nav-link" href="/">Home</a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" href="/products">Products</a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" href="/market">Seeds & Fertilizers</a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" href="/about">About us</a>
//             </li>

//           </ul>

//           <div className="d-flex align-items-center">

//             {isLoggedIn && (
//               <span className="user-name me-3">
//                 {user?.name}
//               </span>
//             )}

//             {isLoggedIn ? (
//               <button className="btn logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             ) : (
//               <a href="/login">
//                 <button className="btn login-btn">
//                   Login
//                 </button>
//               </a>
//             )}

//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom"; // Better for React SPA performance
import "./css/Navbar.css";

const Navbar = ({ isLoggedIn, user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg farm-navbar shadow-sm">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand brand-logo" title="FarmLink Home" to="/">
          <span className="logo-icon">🌱</span>
          <span className="brand-text">FarmLink</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links & Actions */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/market">Marketplace</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/about">Our Story</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center auth-section">
            {isLoggedIn ? (
              <>
                <div className="user-profile me-3">
                  <span className="user-welcome">Hello, </span>
                  <span className="user-name">{user?.name || "Farmer"}</span>
                </div>
                <button className="btn btn-farm-outline" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-farm-primary">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;