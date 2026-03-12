import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust path as needed
import "./css/Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      // Direct navigation if already logged in
      navigate("/products");
    } else {
      // Optional: You could set a 'loading' state here to show a spinner on the button

      console.log("Redirecting to login in 1.5 seconds...");

      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1500ms = 1.5 seconds
    }
  };

  return (
    <section className="hero-wrapper">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="container">
        <div className="hero-card row align-items-center g-0">
          <div className="col-lg-6 hero-text-section">
            <div className="badge-new mb-3">NEW: Organic Growth Formulas</div>
            <h1 className="hero-title">
              Cultivate Success <br />
              with <span>FarmLink</span>
            </h1>

            <p className="hero-subtitle">
              Bridging the gap between traditional wisdom and modern technology.
              Access premium fertilizers and expert advice to help your garden
              thrive.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn-farm-primary btn-lg me-3 shadow"
                onClick={handleGetStarted}
              >
                Get Started
              </button>

              <button
                className="btn btn-farm-outline-dark btn-lg"
                onClick={() =>
                  user ? navigate("/about") : navigate("/signup")
                }
              >
                {user ? "About Us" : "Signup"}
              </button>
            </div>
          </div>

          <div className="col-lg-6 hero-image-container">
            <div className="image-overlay-card">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000"
                className="hero-main-img"
                alt="Green crop field"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
