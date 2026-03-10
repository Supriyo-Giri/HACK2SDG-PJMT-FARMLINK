import React from "react";
import "./css/Features.css";

const Features = () => {
  return (
    <section className="features-section py-5">
      <div className="container text-center">

        <h2 className="mb-4">Why Choose FarmLink</h2>

        <p className="mb-5 text-muted">
          A modern farming platform connecting farmers with eco-friendly
          fertilizers, real-time insights, and smart agriculture tools.
        </p>

        <div className="row g-4">

          {/* Natural Fertilizers */}
          <div className="col-md-3">
            <div className="card feature-card h-100">
              <div className="card-body">
                <div className="feature-icon">🌿</div>
                <h5 className="card-title mt-3">Natural Fertilizers</h5>
                <p className="card-text">
                  Buy eco-friendly fertilizers that improve soil health and
                  increase crop productivity naturally.
                </p>
              </div>
            </div>
          </div>

          {/* Marketplace */}
          <div className="col-md-3">
            <div className="card feature-card h-100">
              <div className="card-body">
                <div className="feature-icon">🛒</div>
                <h5 className="card-title mt-3">Farmer Marketplace</h5>
                <p className="card-text">
                  Connect directly with trusted vendors to buy seeds,
                  fertilizers, and farming essentials.
                </p>
              </div>
            </div>
          </div>

          {/* Weather */}
          <div className="col-md-3">
            <div className="card feature-card h-100">
              <div className="card-body">
                <div className="feature-icon">🌦</div>
                <h5 className="card-title mt-3">Weather Intelligence</h5>
                <p className="card-text">
                  Get accurate weather forecasts to plan irrigation,
                  harvesting, and crop protection.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Alerts */}
          <div className="col-md-3">
            <div className="card feature-card h-100">
              <div className="card-body">
                <div className="feature-icon">🚨</div>
                <h5 className="card-title mt-3">Smart Alerts</h5>
                <p className="card-text">
                  Receive instant alerts about rainfall, pests,
                  and changing climate conditions.
                </p>
              </div>
            </div>
          </div>

        </div>

        

      </div>
    </section>
  );
};

export default Features;