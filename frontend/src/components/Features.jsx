import React from 'react';
import "./css/Features.css";

const Features = () => {
  const coreFeatures = [
    {
      icon: "🧪",
      title: "Precision NPK Blends",
      description: "Customized Nitrogen, Phosphorus, and Potassium ratios specifically for foliage, roots, or blooms."
    },
    {
      icon: "🦠",
      title: "Microbial Catalyst",
      description: "Our 60-70% organic matter formula activates soil bacteria to unlock locked-away nutrients."
    },
    {
      icon: "♻️",
      title: "Circular Sourcing",
      description: "100% natural ingredients sourced from sustainable composting, reducing carbon footprints."
    },
    {
      icon: "🛡️",
      title: "Chemical-Free Safety",
      description: "Zero synthetic fillers. Safe for pets, children, and the beneficial insects in your garden."
    }
  ];

  return (
    <section className="features-section-wrapper">
      <div className="features-header">
        <span className="features-badge">Our Natural Advantage</span>
        <h2 className="features-main-title">Better for Plants, Better for Earth</h2>
        <div className="title-underline"></div>
      </div>

      <div className="features-grid-container">
        {coreFeatures.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="card-inner">
              <div className="feature-icon-box">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="card-decoration"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="results-banner">
        <p><strong>Visible results in 2–6 weeks</strong> — verified by our growth stage testing.</p>
      </div>
    </section>
  );
};

export default Features;