import React from "react";
import "./css/Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      {/* Background spheres */}
      <div className="sphere sphere1"></div>
      <div className="sphere sphere2"></div>

      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 hero-content">
            <h1>
              Smart Farming <br />
              with <span>FarmLink</span>
            </h1>

            <p>
              Get real-time weather alerts, crop insights,
              and buy seeds or fertilizers directly from
              trusted vendors.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-light btn-lg me-3">
                Get Started
              </button>

              <button className="btn btn-outline-light btn-lg">
                View Weather
              </button>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="col-lg-6 hero-image">
  <img
    // src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
    src="https://images.unsplash.com/photo-1549024449-d6968d2a435f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    className="img-fluid"
    alt="Green crop field"
  />
</div>
        </div>
      </div>

    </section>
  );
};

export default Hero;