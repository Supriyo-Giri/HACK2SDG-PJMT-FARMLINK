import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = ({ isLoggedIn, user, handleLogout }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (!isLoggedIn) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        withCredentials: true,
      });
      // Summing up quantities of all items in the cart
      const totalItems = res.data.cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Listen for custom event triggered by Add to Cart or Remove
    window.addEventListener("cartUpdated", fetchCartCount);
    return () => window.removeEventListener("cartUpdated", fetchCartCount);
  }, [isLoggedIn]);

  return (
    <nav className="navbar navbar-expand-lg farm-navbar shadow-sm">
      <div className="container">

        <Link className="navbar-brand brand-logo" title="FarmLink Home" to="/">
          <span className="logo-icon">🌱</span>
          <span className="brand-text">FarmLink</span>
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/cart">My Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-effect" to="/about">Our Story</Link>
            </li>
          </ul>

          {/* <Link to="/cart" className="nav-link cart-icon-wrapper me-3">
                  <span className="cart-icon">🛒</span>
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link> */}

          <div className="d-flex align-items-center auth-section">
            {isLoggedIn ? (
              <>

                <Link to="/cart" className="nav-link cart-icon-wrapper me-3">
                  <span className="cart-icon">🛒</span>
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>

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